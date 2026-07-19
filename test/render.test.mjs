import assert from 'node:assert/strict';
import test from 'node:test';

import { siteConfig } from '../src/config/site.js';
import { escapeHtml } from '../src/render/escape.js';
import { renderFooter, renderHeader, renderLink } from '../src/render/components.js';
import { renderPage } from '../src/render/layout.js';

test('escapeHtml protects text and attribute contexts', () => {
  assert.equal(
    escapeHtml('<script src="x">Tom & Jane\'s</script>'),
    '&lt;script src=&quot;x&quot;&gt;Tom &amp; Jane&#39;s&lt;/script&gt;',
  );
});

test('external links are labeled and opened safely', () => {
  const html = renderLink({ href: 'https://example.com', label: 'Example', external: true });
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /aria-label="Example \(opens in a new tab\)"/);
});

test('header and footer expose named navigation and the mobile menu state', () => {
  const header = renderHeader('/community/');
  const footer = renderFooter();
  assert.match(header, /<nav[^>]+aria-label="Primary"/);
  assert.match(header, /aria-expanded="false"/);
  assert.match(header, /aria-current="page"/);
  assert.match(footer, /<nav[^>]+aria-label="Policies"/);
});

test('renderPage emits one H1, semantic landmarks, canonical metadata, and structured data', () => {
  const html = renderPage(
    {
      path: '/sample/',
      title: 'Sample',
      description: 'A complete sample page description.',
      eyebrow: 'Example',
      heading: 'A single useful heading',
      body: '<p>Useful content.</p>',
      schemaType: 'WebPage',
    },
    siteConfig,
  );

  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<a class="skip-link" href="#main-content">Skip to content<\/a>/);
  assert.match(html, /<header/);
  assert.match(html, /<main id="main-content"/);
  assert.match(html, /<footer/);
  assert.match(html, /<link rel="canonical" href="https:\/\/aicoopai\.com\/sample\/">/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.doesNotMatch(html, /<h1[^>]*>.*<h1/s);
});
