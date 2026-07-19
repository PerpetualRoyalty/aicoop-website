import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const projectRoot = path.resolve(import.meta.dirname, '..');

test('deployment bundle excludes the unfinished agreement and local-only review artifacts', async () => {
  const ignore = await readFile(path.join(projectRoot, '.vercelignore'), 'utf8');
  assert.match(ignore, /^WORK TO EARN AGREEMENT\.docx$/m);
  assert.match(ignore, /^content-audit\/$/m);
  assert.match(ignore, /^docs\/$/m);
  assert.match(ignore, /^test\/$/m);
  assert.match(ignore, /^rollback\/$/m);
});
