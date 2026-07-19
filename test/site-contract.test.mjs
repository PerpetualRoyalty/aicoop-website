import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildSite } from '../scripts/build.mjs';
import { auditBuiltSite } from '../scripts/check-site.mjs';

const projectRoot = path.resolve(import.meta.dirname, '..');

test('release build satisfies the complete site contract', async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'aicoopai-contract-'));
  const outDir = path.join(temporaryRoot, 'dist');
  await buildSite({ rootDir: projectRoot, outDir });
  const report = await auditBuiltSite(outDir);
  assert.deepEqual(report.errors, []);
  assert.equal(report.pages, 11);
  assert.ok(report.internalLinks >= 40);
});

test('site contract reports broken structure, controls, and links', async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'aicoopai-broken-'));
  await mkdir(path.join(temporaryRoot, 'broken'), { recursive: true });
  await writeFile(path.join(temporaryRoot, 'index.html'), '<h1 id="same">One</h1><h1 id="same">Two</h1><a href="/missing/"></a><iframe src="https://example.com"></iframe>', 'utf8');
  await writeFile(path.join(temporaryRoot, 'sitemap.xml'), '<urlset></urlset>', 'utf8');
  const report = await auditBuiltSite(temporaryRoot);
  assert.ok(report.errors.some((error) => error.includes('expected exactly one H1')));
  assert.ok(report.errors.some((error) => error.includes('duplicate id')));
  assert.ok(report.errors.some((error) => error.includes('empty link')));
  assert.ok(report.errors.some((error) => error.includes('iframe without a title')));
  assert.ok(report.errors.some((error) => error.includes('missing internal target')));
});
