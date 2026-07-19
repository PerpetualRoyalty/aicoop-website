import assert from 'node:assert/strict';
import test from 'node:test';

import { pages } from '../src/content/pages.js';
import { siteConfig } from '../src/config/site.js';

const getPage = (path) => pages.find((page) => page.path === path);

test('privacy page identifies the operator, practices, providers, choices, and contact route', () => {
  const privacy = getPage('/privacy/');
  assert.ok(privacy);
  assert.equal(siteConfig.releaseDate, '2026-07-18');
  const copy = `${privacy.eyebrow} ${privacy.heading} ${privacy.lede} ${privacy.body}`;
  for (const required of [
    'Effective July 18, 2026',
    'Good Samaritan Institute, Inc.',
    '900 North County Highway 393',
    'Santa Rosa Beach, Florida 32459',
    'Calendly',
    'Google Forms',
    'Spotify',
    'OpenAI',
    'Vercel',
    'retention',
    'security',
    '/connect/',
  ]) {
    assert.match(copy, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `Privacy should include ${required}`);
  }
  assert.doesNotMatch(copy, /must be confirmed|before launch|before production cutover|intended for this replacement/i);
});

test('terms page publishes the approved Florida liability and dispute design', () => {
  const terms = getPage('/terms/');
  assert.ok(terms);
  const copy = `${terms.eyebrow} ${terms.heading} ${terms.lede} ${terms.body}`;
  for (const required of [
    'Effective July 18, 2026',
    'Good Samaritan Institute, Inc.',
    '900 North County Highway 393',
    'Santa Rosa Beach, Florida 32459',
    'informational',
    'external services',
    'professional advice',
    'acceptable use',
    'intellectual property',
    'availability',
    'Limitation of liability',
    '$100 USD',
    '12 months',
    'fraud',
    'willful misconduct',
    'gross negligence',
    'Florida law',
    'Walton County',
    '30 days',
    'injunctive relief',
    'Legal Notice',
    'do not require arbitration',
    'Changes',
  ]) {
    assert.match(copy, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `Terms should include ${required}`);
  }
  assert.match(copy, /cannot lawfully be limited or waived/i);
  assert.doesNotMatch(copy, /operational draft|final review|must be reviewed|counsel approved|attorney approved/i);
  assert.doesNotMatch(copy, /binding arbitration|require you to arbitrate|you waive (?:a |your )?(?:class|representative|jury)|waiver of (?:class|representative|jury)/i);
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
