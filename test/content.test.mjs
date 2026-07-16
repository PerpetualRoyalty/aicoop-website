import assert from 'node:assert/strict';
import test from 'node:test';

import { pages } from '../src/content/pages.js';

const publicRoutes = ['/', '/community/', '/resources/', '/events/', '/about/', '/connect/'];
const disallowedClaims = [
  'leading platform',
  'thriving community',
  'our members',
  'create an account',
  'discussion forums',
  'upload your resources',
  'shared datasets',
  'unlimited earning',
  'game-changer',
];

test('core public routes have unique, complete metadata and one primary conversion', () => {
  const byPath = new Map(pages.map((page) => [page.path, page]));
  const titles = new Set();
  const descriptions = new Set();

  for (const route of publicRoutes) {
    const page = byPath.get(route);
    assert.ok(page, `${route} should exist`);
    assert.ok(page.title.length >= 12, `${route} title should be descriptive`);
    assert.ok(page.description.length >= 70, `${route} description should be useful`);
    assert.ok(page.heading.length >= 12, `${route} heading should be useful`);
    if (route === '/connect/') {
      assert.match(page.body, /calendly\.com\/aicoopai\/15min/);
    } else {
      assert.match(`${page.lede} ${page.body}`, /href="\/connect\/"/);
    }
    titles.add(page.title);
    descriptions.add(page.description);
  }

  assert.equal(titles.size, publicRoutes.length);
  assert.equal(descriptions.size, publicRoutes.length);
});

test('published copy excludes unsupported platform, testimonial, and earnings claims', () => {
  const publishedCopy = pages.map((page) => `${page.heading} ${page.lede} ${page.body}`).join(' ').toLowerCase();
  for (const claim of disallowedClaims) {
    assert.doesNotMatch(publishedCopy, new RegExp(claim.replaceAll(' ', '\\s+')));
  }
});

test('resources identify third-party destinations and connect explains scheduling choices', () => {
  const resources = pages.find((page) => page.path === '/resources/');
  const connect = pages.find((page) => page.path === '/connect/');
  assert.match(resources.body, /third-party/i);
  assert.match(resources.body, /ChatGPT account/i);
  assert.match(connect.body, /Calendly/i);
  assert.match(connect.body, /Google Form/i);
  assert.match(connect.body, /Open Calendly directly/);
  assert.match(connect.body, /href="https:\/\/calendly\.com\/aicoopai\/15min"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  assert.match(connect.body, /title="Select a date and time with AiCoOpAI"/);
  assert.match(connect.body, /loading="lazy"/);
});

test('events page does not invent an upcoming event', () => {
  const events = pages.find((page) => page.path === '/events/');
  assert.match(events.body, /No public event is currently scheduled/i);
  assert.doesNotMatch(events.body, /register now/i);
});
