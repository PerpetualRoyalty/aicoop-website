import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildSite } from '../scripts/build.mjs';

const projectRoot = path.resolve(import.meta.dirname, '..');

test('build emits the complete static site foundation', async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'aicoopai-build-'));
  const outDir = path.join(temporaryRoot, 'dist');

  await buildSite({ rootDir: projectRoot, outDir });

  const expectedFiles = [
    'index.html',
    'styles.css',
    'app.js',
    'favicon.png',
    'social-card.png',
    'robots.txt',
    'sitemap.xml',
    'site.webmanifest',
    '404.html',
  ];

  for (const file of expectedFiles) {
    assert.equal((await stat(path.join(outDir, file))).isFile(), true, `${file} should exist`);
  }
});

test('build output is deterministic and contains the canonical origin', async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'aicoopai-build-'));
  const first = path.join(temporaryRoot, 'first');
  const second = path.join(temporaryRoot, 'second');

  await buildSite({ rootDir: projectRoot, outDir: first });
  await buildSite({ rootDir: projectRoot, outDir: second });

  const firstHome = await readFile(path.join(first, 'index.html'), 'utf8');
  const secondHome = await readFile(path.join(second, 'index.html'), 'utf8');
  assert.equal(firstHome, secondHome);
  assert.match(firstHome, /https:\/\/aicoopai\.com\//);
});

test('build renders approved page definitions and copies the visual system', async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'aicoopai-build-'));
  const outDir = path.join(temporaryRoot, 'dist');
  await buildSite({ rootDir: projectRoot, outDir });

  const home = await readFile(path.join(outDir, 'index.html'), 'utf8');
  const resources = await readFile(path.join(outDir, 'resources', 'index.html'), 'utf8');
  const css = await readFile(path.join(outDir, 'styles.css'), 'utf8');
  const sourceCss = await readFile(path.join(projectRoot, 'src', 'assets', 'styles.css'), 'utf8');

  assert.match(home, /Build useful AI relationships—not more noise\./);
  assert.match(home, /Three useful ways in/);
  assert.match(resources, /AiCoOpAI Assistant/);
  assert.equal(css, sourceCss);
});
