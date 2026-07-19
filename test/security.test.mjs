import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const projectRoot = path.resolve(import.meta.dirname, '..');

test('Vercel configuration canonicalizes www and sends strict site headers', async () => {
  const config = JSON.parse(await readFile(path.join(projectRoot, 'vercel.json'), 'utf8'));
  const redirect = config.redirects.find((item) => item.has?.some((condition) => condition.type === 'host' && condition.value === 'www.aicoopai.com'));
  assert.ok(redirect, 'www redirect should exist');
  assert.equal(redirect.destination, 'https://aicoopai.com/:path*');
  assert.equal(redirect.permanent, true);

  const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key.toLowerCase(), value]));
  for (const name of [
    'content-security-policy',
    'strict-transport-security',
    'referrer-policy',
    'permissions-policy',
    'x-content-type-options',
    'x-frame-options',
  ]) {
    assert.ok(headers[name], `${name} should be set`);
  }
  assert.match(headers['content-security-policy'], /default-src 'self'/);
  assert.match(headers['content-security-policy'], /frame-src https:\/\/calendly\.com/);
  assert.doesNotMatch(headers['content-security-policy'], /unsafe-eval|default-src \*/);
  assert.equal(headers['x-frame-options'], 'DENY');
  assert.equal(headers['x-content-type-options'], 'nosniff');
});

test('immutable assets receive a long-lived cache policy', async () => {
  const config = JSON.parse(await readFile(path.join(projectRoot, 'vercel.json'), 'utf8'));
  const assetRule = config.headers.find((entry) => entry.source.includes('styles'));
  assert.ok(assetRule);
  assert.match(assetRule.headers.find((header) => header.key === 'Cache-Control').value, /immutable/);
});
