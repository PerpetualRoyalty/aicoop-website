import assert from 'node:assert/strict';
import test from 'node:test';

import { extractInventoryUrls, extractSitemapUrls, outputPathForUrl } from '../scripts/capture-live-baseline.mjs';

test('sitemap extraction keeps only canonical AiCoOpAI URLs and removes duplicates', () => {
  const xml = `<?xml version="1.0"?><urlset>
    <url><loc>https://aicoopai.com/</loc></url>
    <url><loc>https://aicoopai.com/blog/example</loc></url>
    <url><loc>https://aicoopai.com/blog/example</loc></url>
    <url><loc>https://outside.example/page</loc></url>
  </urlset>`;

  assert.deepEqual(extractSitemapUrls(xml), [
    'https://aicoopai.com/',
    'https://aicoopai.com/blog/example',
  ]);
});

test('legacy inventory extraction supplies canonical URLs when the live sitemap is not XML', () => {
  const csv = `url,title,category
"https://aicoopai.com/blog/one","One","CONSOLIDATE"
"https://outside.example/blog/two","Two","CONSOLIDATE"
"https://aicoopai.com/blog/one","One duplicate","CONSOLIDATE"`;

  assert.deepEqual(extractInventoryUrls(csv), ['https://aicoopai.com/blog/one']);
});

test('public URLs map to stable, traversal-safe snapshot paths', () => {
  assert.equal(outputPathForUrl('https://aicoopai.com/'), 'pages/index.html');
  assert.equal(outputPathForUrl('https://aicoopai.com/about'), 'pages/about/index.html');
  assert.equal(outputPathForUrl('https://aicoopai.com/sitemap.xml'), 'pages/sitemap.xml');
  assert.throws(() => outputPathForUrl('https://outside.example/page'), /canonical origin/);
  assert.throws(() => outputPathForUrl('https://aicoopai.com/%2e%2e/private'), /unsafe path/);
});
