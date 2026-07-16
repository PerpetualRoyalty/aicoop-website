import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonicalOrigin = 'https://aicoopai.com';
const unsupportedClaims = /leading platform|thriving community|our members|create an account|discussion forums|upload your resources|shared datasets|unlimited earning|game-changer/i;

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function stripMarkup(value) {
  return value.replace(/<[^>]*>/g, '').replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, ' ').trim();
}

function localTarget(distDir, value) {
  const parsed = new URL(value, canonicalOrigin);
  if (parsed.origin !== canonicalOrigin) return null;
  const pathname = decodeURIComponent(parsed.pathname);
  if (pathname === '/') return path.join(distDir, 'index.html');
  if (pathname.endsWith('/')) return path.join(distDir, pathname.slice(1), 'index.html');
  return path.join(distDir, pathname.slice(1));
}

async function targetExists(distDir, value) {
  const target = localTarget(distDir, value);
  if (!target) return true;
  try {
    return (await stat(target)).isFile();
  } catch {
    return false;
  }
}

export async function auditBuiltSite(distDir) {
  const absoluteDist = path.resolve(distDir);
  const allFiles = await walk(absoluteDist);
  const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
  const errors = [];
  let internalLinks = 0;
  let externalLinks = 0;
  let sitemapLocations = new Set();

  try {
    const sitemap = await readFile(path.join(absoluteDist, 'sitemap.xml'), 'utf8');
    sitemapLocations = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  } catch {
    errors.push('sitemap.xml is missing or unreadable');
  }

  for (const file of htmlFiles) {
    const relative = path.relative(absoluteDist, file);
    const html = await readFile(file, 'utf8');
    const h1Count = (html.match(/<h1\b/g) ?? []).length;
    if (h1Count !== 1) errors.push(`${relative}: expected exactly one H1, found ${h1Count}`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    for (const id of duplicateIds) errors.push(`${relative}: duplicate id "${id}"`);

    const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
    for (const [, attributes, content] of anchors) {
      const href = attributes.match(/href="([^"]+)"/)?.[1] ?? '';
      const name = stripMarkup(content) || attributes.match(/aria-label="([^"]+)"/)?.[1] || '';
      if (!name) errors.push(`${relative}: empty link has no accessible name`);
      if (!href) {
        errors.push(`${relative}: link has no href`);
        continue;
      }
      if (/^https?:\/\//.test(href)) {
        externalLinks += 1;
        if (href.startsWith('http://')) errors.push(`${relative}: insecure external link ${href}`);
        if (!/target="_blank"/.test(attributes) || !/rel="noopener noreferrer"/.test(attributes)) {
          errors.push(`${relative}: external link is not opened safely: ${href}`);
        }
      } else if (href.startsWith('/')) {
        internalLinks += 1;
        if (!await targetExists(absoluteDist, href)) errors.push(`${relative}: missing internal target ${href}`);
      } else if (href.startsWith('#')) {
        const id = href.slice(1);
        if (id && !ids.includes(id)) errors.push(`${relative}: missing fragment target ${href}`);
      }
    }

    for (const match of html.matchAll(/<(?:link|script)\b[^>]*(?:href|src)="([^"]+)"[^>]*>/g)) {
      const value = match[1];
      if (value.startsWith('/') && !await targetExists(absoluteDist, value)) {
        errors.push(`${relative}: missing internal target ${value}`);
      }
    }

    for (const match of html.matchAll(/<iframe\b([^>]*)>/g)) {
      if (!/\stitle="[^"]+"/.test(match[1])) errors.push(`${relative}: iframe without a title`);
    }

    for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
      const name = stripMarkup(match[2]) || match[1].match(/aria-label="([^"]+)"/)?.[1] || '';
      if (!name) errors.push(`${relative}: button has no accessible name`);
    }

    if (unsupportedClaims.test(stripMarkup(html))) errors.push(`${relative}: unsupported public claim detected`);

    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
    if (!canonical) errors.push(`${relative}: canonical URL is missing`);
    if (relative !== '404.html' && canonical && !sitemapLocations.has(canonical)) {
      errors.push(`${relative}: canonical URL is absent from sitemap: ${canonical}`);
    }
    if (relative === '404.html' && !/<meta name="robots" content="noindex">/.test(html)) {
      errors.push('404.html: noindex is missing');
    }

    const socialImage = html.match(/<meta property="og:image" content="([^"]+)">/)?.[1];
    if (socialImage && !await targetExists(absoluteDist, socialImage)) {
      errors.push(`${relative}: missing internal target ${new URL(socialImage).pathname}`);
    }
  }

  return {
    pages: htmlFiles.length,
    internalLinks,
    externalLinks,
    errors: [...new Set(errors)].sort(),
  };
}

async function run() {
  const distDir = path.resolve(process.argv[2] ?? path.join(projectRoot, 'dist'));
  const report = await auditBuiltSite(distDir);
  if (report.errors.length > 0) {
    console.error(`Site check failed with ${report.errors.length} issue(s):`);
    for (const error of report.errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Site check passed: ${report.pages} HTML pages, ${report.internalLinks} internal links, ${report.externalLinks} external links.`);
}

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  await run();
}
