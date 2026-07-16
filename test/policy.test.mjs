import assert from 'node:assert/strict';
import test from 'node:test';

import { pages } from '../src/content/pages.js';

const getPage = (path) => pages.find((page) => page.path === path);

test('privacy page identifies practices, service providers, choices, and contact route', () => {
  const privacy = getPage('/privacy/');
  assert.ok(privacy);
  const copy = `${privacy.eyebrow} ${privacy.heading} ${privacy.lede} ${privacy.body}`;
  for (const required of [
    'Effective July 16, 2026',
    'Calendly',
    'Google Forms',
    'Spotify',
    'OpenAI',
    'Vercel',
    'retention',
    'security',
    '/connect/',
  ]) {
    assert.match(copy, new RegExp(required, 'i'), `Privacy should include ${required}`);
  }
});

test('terms page covers informational use, external services, acceptable use, and changes', () => {
  const terms = getPage('/terms/');
  assert.ok(terms);
  const copy = terms.body;
  for (const required of ['informational', 'external services', 'professional advice', 'acceptable use', 'intellectual property', 'availability', 'changes']) {
    assert.match(copy, new RegExp(required, 'i'), `Terms should include ${required}`);
  }
});

test('accessibility page provides a feedback path and discloses third-party limitations', () => {
  const accessibility = getPage('/accessibility/');
  assert.ok(accessibility);
  assert.match(accessibility.body, /keyboard/i);
  assert.match(accessibility.body, /screen reader/i);
  assert.match(accessibility.body, /third-party/i);
  assert.match(accessibility.body, /href="\/connect\/"/);
});

test('editorial policy defines sourcing, AI review, corrections, testimonials, and affiliate standards', () => {
  const editorial = getPage('/editorial-policy/');
  assert.ok(editorial);
  const copy = editorial.body;
  for (const required of ['primary source', 'AI-assisted', 'human review', 'correction', 'testimonial', 'affiliate', 'case stud']) {
    assert.match(copy, new RegExp(required, 'i'), `Editorial policy should include ${required}`);
  }
});
