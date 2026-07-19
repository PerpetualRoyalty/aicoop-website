import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildSite } from '../scripts/build.mjs';
import { siteConfig } from '../src/config/site.js';

const projectRoot = path.resolve(import.meta.dirname, '..');

async function builtSite() {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'aicoopai-seo-'));
  const outDir = path.join(temporaryRoot, 'dist');
  await buildSite({ rootDir: projectRoot, outDir });
  return outDir;
}

test('every public route has unique canonical, title, description, and valid structured data', async () => {
  const outDir = await builtSite();
  const titles = new Set();
  const descriptions = new Set();

  for (const route of siteConfig.routes) {
    const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
    const html = await readFile(path.join(outDir, file), 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
    assert.ok(title, `${route} should have a title`);
    assert.ok(description, `${route} should have a description`);
    assert.match(html, new RegExp(`<link rel="canonical" href="${siteConfig.origin}${route.replaceAll('/', '\\/')}">`));
    const json = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
    assert.doesNotThrow(() => JSON.parse(json));
    titles.add(title);
    descriptions.add(description);
  }

  assert.equal(titles.size, siteConfig.routes.length);
  assert.equal(descriptions.size, siteConfig.routes.length);
});

test('sitemap and robots expose only canonical launch pages with release dates', async () => {
  const outDir = await builtSite();
  const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8');
  const robots = await readFile(path.join(outDir, 'robots.txt'), 'utf8');

  assert.equal((sitemap.match(/<url>/g) ?? []).length, siteConfig.routes.length);
  for (const route of siteConfig.routes) {
    assert.match(sitemap, new RegExp(`<loc>${siteConfig.origin}${route.replaceAll('/', '\\/')}</loc><lastmod>${siteConfig.releaseDate}</lastmod>`));
  }
  assert.doesNotMatch(sitemap, /\/blog\/|\/bonus\//);
  assert.match(robots, new RegExp(`Sitemap: ${siteConfig.origin}/sitemap\\.xml`));
});

test('manifest is branded and the 404 page is noindexed', async () => {
  const outDir = await builtSite();
  const manifest = JSON.parse(await readFile(path.join(outDir, 'site.webmanifest'), 'utf8'));
  const notFound = await readFile(path.join(outDir, '404.html'), 'utf8');
  assert.equal(manifest.name, 'AiCoOpAI');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.theme_color, '#101612');
  assert.equal(manifest.background_color, '#f4f2e9');
  assert.match(notFound, /<meta name="robots" content="noindex">/);
  assert.match(notFound, /That path does not lead anywhere/);
});
