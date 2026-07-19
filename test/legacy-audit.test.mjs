import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { classifyLegacyUrl, titleFromUrl } from '../scripts/audit-legacy-content.mjs';

const root = path.resolve(import.meta.dirname, '..');

test('legacy classifier prioritizes proof, event, local, platform, and consolidation risks', () => {
  const cases = [
    ['/blog/case-study--success-stories-from-aicoopai-com-members', 'REMOVE_UNLESS_PROVEN'],
    ['/blog/join-the-annual-tech-conference-in-florida--what-to-expect', 'VERIFY_EVENT'],
    ['/blog/why-walton-county-is-a-hub-for-tech-entrepreneurs', 'VERIFY_LOCAL'],
    ['/blog/how-aicoop-ai-supports-developer-success', 'SUBSTANTIATE'],
    ['/blog/5-essential-collaborative-tools-for-tech-entrepreneurs', 'CONSOLIDATE'],
  ];

  for (const [url, category] of cases) {
    assert.equal(classifyLegacyUrl(`https://aicoopai.com${url}`).category, category);
  }
});

test('legacy title extraction turns slugs into readable review labels', () => {
  assert.equal(
    titleFromUrl('https://aicoopai.com/blog/exploring-innovation-hubs-in-florida--a-guide'),
    'Exploring Innovation Hubs In Florida: A Guide',
  );
});

test('committed legacy inventory contains the current 189 blog URLs and required columns', async () => {
  const csv = await readFile(path.join(root, 'content-audit', 'legacy-blog-inventory.csv'), 'utf8');
  const lines = csv.trim().split('\n');
  assert.equal(lines[0], 'url,title,category,risk,proposed_action,evidence_required,redirect_target');
  assert.equal(lines.length - 1, 189);
  assert.equal(new Set(lines.slice(1).map((line) => line.split(',')[0])).size, 189);
});
