import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const canonicalOrigin = 'https://aicoopai.com';
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(moduleDir, '..');
const rollbackRoot = path.join(projectRoot, 'rollback');
const legacyInventoryPath = path.join(projectRoot, 'content-audit', 'legacy-blog-inventory.csv');

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

export function extractSitemapUrls(xml) {
  const urls = [];
  const seen = new Set();

  for (const match of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
    try {
      const parsed = new URL(decodeXml(match[1]));
      if (parsed.origin !== canonicalOrigin) continue;
      parsed.hash = '';
      const normalized = parsed.toString();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        urls.push(normalized);
      }
    } catch {}
  }

  return urls;
}

export function extractInventoryUrls(csv) {
  const urls = [];
  const seen = new Set();

  for (const line of csv.split(/\r?\n/).slice(1)) {
    const value = line.match(/^"([^"]+)"/)?.[1];
    if (!value) continue;
    try {
      const parsed = new URL(value);
      if (parsed.origin !== canonicalOrigin) continue;
      parsed.hash = '';
      const normalized = parsed.toString();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        urls.push(normalized);
      }
    } catch {}
  }

  return urls;
}

export function outputPathForUrl(value) {
  const rawPath = value.match(/^https?:\/\/[^/]+([^?#]*)/i)?.[1] || '/';
  let decodedRawPath;
  try {
    decodedRawPath = decodeURIComponent(rawPath);
  } catch {
    throw new Error(`unsafe path encoding: ${value}`);
  }
  if (/%2f|%5c/i.test(rawPath) || decodedRawPath.split('/').some((segment) => segment === '..') || decodedRawPath.includes('\\')) {
    throw new Error(`unsafe path: ${value}`);
  }

  const parsed = new URL(value);
  if (parsed.origin !== canonicalOrigin) throw new Error(`URL is outside the canonical origin: ${value}`);
  if (parsed.search || parsed.hash) throw new Error(`snapshot URLs may not include query strings or fragments: ${value}`);

  const pathname = decodeURIComponent(parsed.pathname);
  const segments = pathname.split('/').filter(Boolean);
  if (segments.some((segment) => !/^[a-zA-Z0-9._~-]+$/.test(segment))) {
    throw new Error(`unsafe path: ${value}`);
  }

  if (segments.length === 0) return 'pages/index.html';
  if (path.extname(segments.at(-1))) return path.posix.join('pages', ...segments);
  return path.posix.join('pages', ...segments, 'index.html');
}

function digest(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function selectedHeaders(headers) {
  const result = {};
  for (const name of [
    'cache-control',
    'content-security-policy',
    'content-type',
    'etag',
    'last-modified',
    'server',
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
  ]) {
    const value = headers.get(name);
    if (value) result[name] = value;
  }
  return result;
}

async function fetchAndStore(sourceUrl, outDir) {
  const response = await fetch(sourceUrl, {
    redirect: 'follow',
    headers: { 'user-agent': 'AiCoOpAI-release-baseline/1.0' },
  });
  const body = Buffer.from(await response.arrayBuffer());
  const relativePath = outputPathForUrl(sourceUrl);
  const absolutePath = path.join(outDir, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, body);

  return {
    sourceUrl,
    finalUrl: response.url,
    status: response.status,
    contentType: response.headers.get('content-type') || 'application/octet-stream',
    bytes: body.byteLength,
    sha256: digest(body),
    file: relativePath,
    headers: selectedHeaders(response.headers),
  };
}

async function mapConcurrent(values, limit, mapper) {
  const results = new Array(values.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(values[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, () => worker()));
  return results;
}

async function assertNewSnapshotDirectory(outDir) {
  const absolute = path.resolve(outDir);
  if (!absolute.startsWith(`${rollbackRoot}${path.sep}`)) {
    throw new Error(`Snapshot output must be inside ${rollbackRoot}`);
  }
  try {
    await access(absolute);
    throw new Error(`Snapshot directory already exists: ${absolute}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await mkdir(absolute, { recursive: true });
  return absolute;
}

export async function captureLiveBaseline({
  outDir,
  generatedAt = new Date().toISOString(),
} = {}) {
  const target = await assertNewSnapshotDirectory(outDir);
  const sitemapResponse = await fetch(`${canonicalOrigin}/sitemap.xml`, {
    redirect: 'follow',
    headers: { 'user-agent': 'AiCoOpAI-release-baseline/1.0' },
  });
  if (!sitemapResponse.ok) throw new Error(`Live sitemap returned HTTP ${sitemapResponse.status}`);
  const sitemap = await sitemapResponse.text();
  const legacyInventory = await readFile(legacyInventoryPath, 'utf8');

  const required = [
    `${canonicalOrigin}/`,
    `${canonicalOrigin}/about`,
    `${canonicalOrigin}/connect`,
    `${canonicalOrigin}/faq`,
    `${canonicalOrigin}/privacy-policy`,
    `${canonicalOrigin}/blog`,
    `${canonicalOrigin}/sitemap`,
    `${canonicalOrigin}/sitemap.xml`,
  ];
  const urls = [...new Set([
    ...required,
    ...extractSitemapUrls(sitemap),
    ...extractInventoryUrls(legacyInventory),
  ])].sort();
  const entries = await mapConcurrent(urls, 6, (url) => fetchAndStore(url, target));
  const failures = entries.filter((entry) => entry.status < 200 || entry.status >= 400);

  const manifest = {
    schemaVersion: 1,
    generatedAt,
    sourceOrigin: canonicalOrigin,
    scope: 'Public HTML/XML responses only; this is not a Durable account export or DNS backup.',
    pageCount: entries.length,
    failureCount: failures.length,
    entries,
  };
  await writeFile(path.join(target, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await writeFile(
    path.join(target, 'README.txt'),
    `AiCoOpAI public live-site baseline\nCaptured: ${generatedAt}\nPages: ${entries.length}\nHTTP failures: ${failures.length}\n\nThis archive preserves public response bodies and checksums. It does not contain Durable account configuration, private submissions, DNS zone data, or a platform-native restore package.\n`,
    'utf8',
  );

  return { outDir: target, entries, failures };
}

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const date = new Date().toISOString().slice(0, 10);
  const outDir = path.resolve(argumentValue('--out') || path.join(rollbackRoot, `durable-public-${date}`));
  const result = await captureLiveBaseline({ outDir });
  console.log(`Captured ${result.entries.length} public responses in ${result.outDir}`);
  if (result.failures.length > 0) {
    console.error(`${result.failures.length} response(s) returned a failing status.`);
    process.exitCode = 1;
  }
}
