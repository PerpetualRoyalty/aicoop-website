import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');

test('stylesheet defines focus, reduced-motion, and responsive behavior', async () => {
  const css = await readFile(path.join(root, 'src/assets/styles.css'), 'utf8');
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(min-width:\s*48rem\)/);
  assert.match(css, /--color-ink:\s*#101612/);
});

test('mobile navigation script announces state and supports Escape', async () => {
  const script = await readFile(path.join(root, 'src/assets/app.js'), 'utf8');
  assert.match(script, /aria-expanded/);
  assert.match(script, /Escape/);
  assert.match(script, /focus\(\)/);
});

test('stylesheet supports hero signals, media, contact alternatives, and policy prose', async () => {
  const css = await readFile(path.join(root, 'src/assets/styles.css'), 'utf8');
  for (const selector of ['.hero-actions', '.signal-board', '.media-panel', '.alternative-contact', '.embed-shell', '.prose']) {
    assert.match(css, new RegExp(selector.replace('.', '\\.'), 'm'), `${selector} should be styled`);
  }
});
