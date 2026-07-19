# AiCoOpAI Legal Terms and Production Cutover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the owner-approved, counsel-ready Florida operator and dispute terms, merge the verified replacement, move `aicoopai.com` from Durable to Vercel without disturbing email or verification records, and verify the production result with a tested rollback path.

**Architecture:** Keep the dependency-free static architecture unchanged: policy content remains in `src/content/pages.js`, release metadata remains in `src/config/site.js`, and Node's built-in test runner enforces the legal-content contract. Release the exact tested build through the existing `aicoopai-rebuild` Vercel project, attach both public domains, then change only Namecheap web-routing records while retaining the Durable workspace and captured rollback baseline.

**Tech Stack:** Node.js 22+, ECMAScript modules, Node built-in tests, deterministic static build, Vercel CLI/project `aicoopai-rebuild`, GitHub CLI/repository `PerpetualRoyalty/aicoop-website`, authenticated Chrome for Namecheap, `curl`, and `dig`.

## Global Constraints

- The public operator is **Good Samaritan Institute, Inc.**, 900 North County Highway 393, Santa Rosa Beach, Florida 32459.
- The Privacy and Terms effective date is **July 18, 2026**; `siteConfig.releaseDate` is `2026-07-18`.
- The aggregate direct-liability cap is the greater of direct site-use fees paid to the operator in the preceding 12 months or **$100 USD**.
- Preserve liability for fraud, willful misconduct, gross negligence, and rights or liabilities that applicable law does not allow the parties to limit or waive.
- Florida law governs; exclusive venue is a state court in Walton County or the federal district court with jurisdiction over Walton County.
- Require a 30-day good-faith written-notice process, with exceptions for urgent or injunctive relief and actions needed to preserve a deadline.
- Do not add mandatory arbitration, a class-action waiver, a representative-action waiver, or a jury-trial waiver.
- Describe the public language as an owner-approved, counsel-ready draft; never represent that a lawyer approved it without actual attorney approval evidence.
- Do not add dependencies, analytics, advertising cookies, accounts, payments, databases, or first-party submissions.
- Do not republish or mass-redirect unsupported legacy claims or blog pages.
- Preserve the Durable workspace and local 197-response rollback baseline.
- In Namecheap, do not modify email forwarding, SPF, Google verification, Durable verification, or unrelated DNS records.
- Read the exact Vercel DNS targets after domain attachment; do not assume generic A or CNAME values.
- The apex `https://aicoopai.com/` is canonical; `www.aicoopai.com` permanently redirects to it.

## File Structure

- Modify `test/policy.test.mjs` — enforce the operator, legal terms, carveouts, dispute path, effective date, and absence of draft/forced-arbitration language.
- Modify `src/content/pages.js` — publish the final Privacy operator disclosure and Terms sections.
- Modify `src/config/site.js` — update the release date used by the sitemap.
- Modify `README.md` — record the confirmed operator, restore owner, cutover authority, and current release stage.
- Modify `docs/deployment-handoff.md` — replace unresolved owner gates with an explicit decision record and retain the counsel-status boundary.
- Modify `docs/qa/2026-07-16-browser-verification.md` — append the July 18 authorization and legal-design follow-up without rewriting the historical July 16 evidence.
- Create `docs/qa/2026-07-18-production-cutover.md` — record final test, Git, Vercel, DNS, browser, and rollback evidence after production verification.
- Do not modify `vercel.json` — it already provides the required `www` host redirect and security headers.

---

### Task 1: Enforce and publish the legal-content contract

**Files:**
- Modify: `test/policy.test.mjs:8-34`
- Modify: `src/content/pages.js:270-357`
- Modify: `src/config/site.js:5`

**Interfaces:**
- Consumes: `pages: Array<Page>` from `src/content/pages.js`, where each policy page exposes `path`, `eyebrow`, `heading`, `lede`, and `body` strings.
- Produces: final `/privacy/` and `/terms/` page definitions plus `siteConfig.releaseDate === '2026-07-18'` for sitemap generation.

- [ ] **Step 1: Replace the first two policy tests with the failing legal contract**

Use this exact test structure in `test/policy.test.mjs` while leaving the accessibility and editorial-policy tests unchanged:

```js
import { siteConfig } from '../src/config/site.js';

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
```

- [ ] **Step 2: Run the focused tests and confirm the expected failure**

Run:

```bash
node --test test/policy.test.mjs
```

Expected: the Privacy test fails first because it still contains `Effective July 16, 2026` and lacks the confirmed operator; the Terms test also fails if the runner reports all subtests. Accessibility and editorial-policy tests remain passing.

- [ ] **Step 3: Update the release date**

Change `src/config/site.js` to:

```js
releaseDate: '2026-07-18',
```

- [ ] **Step 4: Replace the Privacy prelaunch copy**

In the `privacy` object in `src/content/pages.js`, use:

```js
eyebrow: 'Effective July 18, 2026',
heading: 'Privacy should be understandable.',
lede: 'This notice explains how the AiCoOpAI website handles information, which third-party services it uses, and the choices available to visitors.',
```

Replace the paragraph immediately under `Who operates this site` with:

```html
<p>AiCoOpAI is operated by Good Samaritan Institute, Inc., a Florida not-for-profit corporation. Its contact address is 900 North County Highway 393, Santa Rosa Beach, Florida 32459. Use the <a href="/connect/">Connect page</a> for privacy questions or requests.</p>
```

Leave the remaining Privacy sections unchanged.

- [ ] **Step 5: Replace the Terms prelaunch copy and placeholder section**

In the `terms` object, use:

```js
eyebrow: 'Effective July 18, 2026',
heading: 'Use the site thoughtfully.',
lede: 'These terms govern use of aicoopai.com and the information, links, and ways to request a conversation provided through the site.',
```

Insert this section immediately after the opening `<section>` and `.prose` container:

```html
<h2>Operator and acceptance</h2>
<p>aicoopai.com is operated by Good Samaritan Institute, Inc., 900 North County Highway 393, Santa Rosa Beach, Florida 32459. By accessing or using this site, you agree to these Terms. If you do not agree, do not use the site.</p>
```

Keep the current sections from `Informational purpose` through `Availability and warranties`. Replace `Responsibility and disputes` with these exact sections:

```html
<h2>Limitation of liability</h2>
<p>You remain responsible for decisions made using site content or external services. To the maximum extent permitted by law, Good Samaritan Institute, Inc. and its directors, officers, employees, volunteers, agents, and affiliates will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, revenue, opportunity, or goodwill, arising from or relating to the site, site content, external services, or any conversation, resource, or introduction resulting from use of the site, even if advised that such damages were possible.</p>
<p>To the maximum extent permitted by law, their aggregate direct liability for all claims arising from or relating to the site will not exceed the greater of the amount you paid directly to Good Samaritan Institute, Inc. for use of the site during the 12 months before the event giving rise to the claim or $100 USD.</p>
<p>Nothing in these Terms limits or excludes liability for fraud, willful misconduct, gross negligence, or any liability or right that cannot lawfully be limited or waived. If applicable law does not allow a particular exclusion or limitation, that exclusion or limitation applies only to the maximum extent permitted by that law.</p>

<h2>Governing law and venue</h2>
<p>Florida law governs these Terms and any dispute arising from or relating to the site, without regard to conflict-of-law rules. Subject to rights that cannot lawfully be waived, exclusive venue lies in a state court located in Walton County, Florida, or the United States District Court with jurisdiction over Walton County, Florida. Each party consents to the personal jurisdiction of those courts.</p>

<h2>Informal dispute resolution</h2>
<p>Before filing a lawsuit, you and Good Samaritan Institute, Inc. must make a good-faith effort to resolve the dispute for 30 days. A written notice must identify the claimant, describe the facts and requested resolution, and be mailed to the operator address above with “Legal Notice” identified on the correspondence.</p>
<p>This 30-day process does not prevent either side from seeking urgent or injunctive relief or taking action needed to preserve a claim before a statutory or court deadline expires. These Terms do not require arbitration and do not waive class, representative, or jury rights.</p>
```

Replace the existing `Changes` paragraph with:

```html
<p>These Terms may change when the site’s services or operator change. A material revision will receive a new effective date. The Terms published when you use the site apply to that use.</p>
```

- [ ] **Step 6: Run the focused policy tests**

Run:

```bash
node --test test/policy.test.mjs
```

Expected: 4 tests pass, 0 fail.

- [ ] **Step 7: Run the SEO tests that consume the updated release date**

Run:

```bash
node --test test/seo.test.mjs
```

Expected: 3 tests pass, 0 fail, including sitemap entries using `2026-07-18`.

- [ ] **Step 8: Review the legal-content diff and commit**

Run:

```bash
git diff --check
git diff -- test/policy.test.mjs src/content/pages.js src/config/site.js
git add test/policy.test.mjs src/content/pages.js src/config/site.js
git commit -m "Publish AiCoOpAI operator and Florida terms"
```

Expected: only the three listed files are committed; no draft or false counsel-approval language remains in the public policy objects.

---

### Task 2: Close the owner-controlled release gates in documentation

**Files:**
- Modify: `README.md:3-5,46-56`
- Modify: `docs/deployment-handoff.md:3-51`
- Modify: `docs/qa/2026-07-16-browser-verification.md:67-83`

**Interfaces:**
- Consumes: Doug Liles's operator, restore-ownership, and cutover authorization recorded in the approved design specification.
- Produces: an accurate pre-cutover handoff that distinguishes owner approval from external attorney approval.

- [ ] **Step 1: Update the README release state**

Replace the second introductory paragraph with:

```markdown
The original Durable website remains live while the verified replacement proceeds through its authorized production cutover. The replacement is published on `agent/trust-first-rebuild` in the existing public `PerpetualRoyalty/aicoop-website` repository and is under review in [pull request #1](https://github.com/PerpetualRoyalty/aicoop-website/pull/1). Good Samaritan Institute, Inc. is the confirmed operator. Doug Liles confirmed ownership of the Durable restore procedure and authorized the AiCoOpAI production cutover. The published legal language is an owner-approved, counsel-ready draft and must not be represented as attorney approved without actual attorney review.
```

Replace the deployment checklist at the end with:

```markdown
The build is compatible with Vercel static hosting through `vercel.json`. The authorized cutover sequence is:

1. Publish and verify the confirmed operator and Florida legal language on staging.
2. Review and merge pull request #1.
3. Preserve the authenticated Durable workspace and verified rollback baseline under Doug Liles's restore procedure.
4. Attach the apex and `www` domains to the verified Vercel project, then change only the Namecheap web-routing records Vercel requires.
5. Preserve email forwarding, SPF, Google verification, Durable verification, and unrelated DNS records.
6. Verify every canonical route, 404 behavior, headers, forms, embeds, sitemap, and external links on production.
7. Submit `/sitemap.xml` in Google Search Console when authenticated access is available.
8. Restore the recorded Durable routing immediately if a critical release gate fails.
```

- [ ] **Step 2: Replace unresolved handoff decisions with a decision record**

In `docs/deployment-handoff.md`, keep `What is complete`, rename `Required production decisions` to `Production decision record`, and replace its introductory paragraph and numbered list with:

```markdown
## Production decision record

The owner-controlled decisions are closed as follows:

1. **Production operator:** Good Samaritan Institute, Inc., 900 North County Highway 393, Santa Rosa Beach, Florida 32459.
2. **Legal language:** Doug Liles approved the court-based Florida design on July 18, 2026. The published language is counsel-ready and must not be labeled attorney approved without actual attorney review.
3. **Platform rollback authority:** Doug Liles confirmed that he owns the Durable restore procedure. The authenticated Durable workspace, 197-response baseline, DNS evidence, and verified archive remain preserved.
4. **Cutover authority:** Doug Liles explicitly authorized the AiCoOpAI production cutover. Scope is limited to the Vercel attachment and necessary Namecheap web-routing records.
5. **DNS preservation:** email forwarding, SPF, Google verification, Durable verification, and unrelated DNS records remain unchanged.
6. **Pull-request approval:** pull request #1 may be marked ready and merged after the updated policy tests and staging verification pass.
```

Change safe cutover step 1 to:

```markdown
1. Publish the confirmed operator and owner-approved, counsel-ready language, then rerun `npm run check` and the browser checks.
```

- [ ] **Step 3: Append the July 18 authorization follow-up to the historical QA file**

Append:

```markdown

## July 18 authorization follow-up

- Good Samaritan Institute, Inc., 900 North County Highway 393, Santa Rosa Beach, Florida 32459, was confirmed as the production operator.
- Doug Liles approved the court-based Florida legal design, confirmed ownership of the Durable restore procedure, and authorized the AiCoOpAI production cutover.
- The legal copy remains accurately described as counsel-ready rather than attorney approved.
- Production execution remains conditioned on the updated automated suite, staging browser verification, pull-request merge, exact Vercel DNS instructions, and the public acceptance gates.
```

- [ ] **Step 4: Verify the documentation contains the decisions and no obsolete blocking language**

Run:

```bash
rg -n "Good Samaritan Institute, Inc.|Doug Liles|counsel-ready|authorized|DNS preservation" README.md docs/deployment-handoff.md docs/qa/2026-07-16-browser-verification.md
rg -n "must be confirmed|no DNS mutation is authorized|requires explicit cutover and legal approval|counsel-approved language" README.md docs/deployment-handoff.md
```

Expected: the first command finds all decision records; the second command returns no matches.

- [ ] **Step 5: Review and commit the documentation**

Run:

```bash
git diff --check
git diff -- README.md docs/deployment-handoff.md docs/qa/2026-07-16-browser-verification.md
git add README.md docs/deployment-handoff.md docs/qa/2026-07-16-browser-verification.md
git commit -m "Record AiCoOpAI production authorization"
```

Expected: only the three documentation files are committed.

---

### Task 3: Prove the exact release candidate locally and on staging

**Files:**
- Verify: `dist/`
- Verify: `vercel.json`
- Verify: all `test/*.test.mjs`
- Verify: `https://aicoopai-rebuild.vercel.app/`

**Interfaces:**
- Consumes: the committed policy content and documentation from Tasks 1-2.
- Produces: a clean full test result and a Vercel `Ready` deployment URL for the exact branch head.

- [ ] **Step 1: Confirm a clean tracked worktree and inspect the release commits**

Run:

```bash
git status --short --branch
git log -5 --oneline --decorate
```

Expected: no tracked modifications; ignored `.vercel/`, `dist/`, `rollback/`, and `WORK TO EARN AGREEMENT.docx` do not appear as staged changes.

- [ ] **Step 2: Run the complete release gate**

Run:

```bash
npm run check
```

Expected: build succeeds for 10 canonical routes, all Node tests pass, and the final line reports `Site check passed: 11 HTML pages, 190 internal links, 11 external links.` If counts change, stop and explain the exact intentional source of the difference before proceeding.

- [ ] **Step 3: Scan the generated policies and deployment bundle**

Run:

```bash
rg -n "Good Samaritan Institute, Inc.|900 North County Highway 393|Limitation of liability|Florida law|Walton County|30 days|do not require arbitration" dist/privacy/index.html dist/terms/index.html
rg -n "operational draft|must be confirmed|must be reviewed|counsel approved|attorney approved" dist/privacy/index.html dist/terms/index.html
```

Expected: the first command finds every required phrase; the second returns no matches.

- [ ] **Step 4: Serve and inspect the local release in a browser**

Run `npm run serve` in a persistent terminal, then verify:

```text
http://127.0.0.1:4173/privacy/
http://127.0.0.1:4173/terms/
http://127.0.0.1:4173/connect/
http://127.0.0.1:4173/not-a-real-page/
```

Expected: desktop 1440x1000 and mobile 390x844 views have no horizontal overflow; Privacy and Terms have one H1 and logical H2s; mobile navigation opens, closes with Escape, and returns focus; the unknown path returns the real 404 page.

- [ ] **Step 5: Deploy the branch head to the isolated Vercel project**

Run:

```bash
vercel --prod --yes
```

Expected: the linked project is `team-good-sam/aicoopai-rebuild`, the build completes, and Vercel returns a unique deployment URL plus the `https://aicoopai-rebuild.vercel.app` production alias. Do not attach the public domains in this step.

- [ ] **Step 6: Inspect the deployment and edge behavior**

Run with the unique deployment hostname returned in Step 5:

```bash
vercel inspect UNIQUE_DEPLOYMENT_HOSTNAME --wait --timeout 180s
curl -sSIL https://aicoopai-rebuild.vercel.app/
curl -sSIL https://aicoopai-rebuild.vercel.app/privacy/
curl -sSIL https://aicoopai-rebuild.vercel.app/terms/
curl -sSIL https://aicoopai-rebuild.vercel.app/not-a-real-page/
```

`UNIQUE_DEPLOYMENT_HOSTNAME` means the exact hostname emitted by Step 5, copied without `https://`. Expected: deployment state `Ready`; canonical pages return 200 after any trailing-slash redirect; the unknown route resolves to HTTP 404; headers include HSTS, strict CSP, `nosniff`, DENY framing, strict referrer policy, and the configured permissions policy.

- [ ] **Step 7: Verify staging in a real browser**

Inspect the staging Privacy, Terms, Connect, home, and unknown route at desktop and mobile widths. Expected: the public operator and legal sections are readable; no console or page errors occur; the mobile menu and keyboard focus work; Calendly loads or exposes its direct fallback; the Google Form alternative opens; canonical tags still point to `https://aicoopai.com`.

---

### Task 4: Merge GitHub and deploy the merged main branch

**Files:**
- Publish: branch `agent/trust-first-rebuild`
- Merge: `PerpetualRoyalty/aicoop-website` pull request #1 into `main`
- Deploy: merged `main` tree to Vercel project `aicoopai-rebuild`

**Interfaces:**
- Consumes: the staging-verified branch head from Task 3.
- Produces: a merged Git commit on `origin/main` and a `Ready` Vercel deployment built from that merged tree.

- [ ] **Step 1: Push the tested branch**

Run:

```bash
git push origin agent/trust-first-rebuild
```

Expected: the remote branch advances to the exact locally tested head.

- [ ] **Step 2: Review pull-request state, diff, and checks**

Run:

```bash
gh pr view 1 --repo PerpetualRoyalty/aicoop-website --json number,title,url,isDraft,mergeable,headRefOid,baseRefName,statusCheckRollup
gh pr diff 1 --repo PerpetualRoyalty/aicoop-website --name-only
gh pr checks 1 --repo PerpetualRoyalty/aicoop-website
```

Expected: PR #1 targets `main`, is mergeable, points to the tested head, and contains only the intended trust-first rebuild, legal, test, and documentation files. Required checks are passing or the repository reports no required checks.

- [ ] **Step 3: Mark the pull request ready and merge it**

Run:

```bash
gh pr ready 1 --repo PerpetualRoyalty/aicoop-website
gh pr merge 1 --repo PerpetualRoyalty/aicoop-website --merge
```

Expected: PR #1 becomes merged. Do not delete the remote feature branch until production verification is complete.

- [ ] **Step 4: Update the local main branch to the merged commit**

Run:

```bash
git fetch origin main
git switch main
git pull --ff-only origin main
git status --short --branch
```

Expected: local `main` matches `origin/main` and the tracked worktree is clean.

- [ ] **Step 5: Re-run the release gate on merged main**

Run:

```bash
npm run check
```

Expected: the same passing test and site-audit results as Task 3.

- [ ] **Step 6: Deploy merged main and capture the production-candidate hostname**

Run:

```bash
vercel --prod --yes
```

Expected: Vercel returns a unique deployment hostname for a `Ready` deployment whose file tree is the merged `main` tree. Save that exact hostname for Tasks 5-6.

- [ ] **Step 7: Prove Git and deployment traceability**

Run:

```bash
git rev-parse HEAD
git show --stat --oneline HEAD
vercel inspect UNIQUE_DEPLOYMENT_HOSTNAME --wait --timeout 180s
```

Expected: Git reports the merged `main` commit and Vercel reports `Ready`. Record both identifiers in the production QA evidence.

---

### Task 5: Attach Vercel domains and perform the authorized Namecheap cutover

**Files and external state:**
- Attach: `aicoopai.com` and `www.aicoopai.com` to Vercel project `aicoopai-rebuild`
- Modify: Namecheap web-routing records for `aicoopai.com`
- Preserve: Durable workspace, TXT verification records, email forwarding, SPF, and unrelated DNS

**Interfaces:**
- Consumes: the unique `Ready` Vercel deployment hostname from Task 4 and the authenticated Namecheap Chrome session.
- Produces: public DNS routing to Vercel with apex canonicalization and a retained rollback route.

- [ ] **Step 1: Reconfirm the rollback artifacts and current public routing immediately before mutation**

Run:

```bash
shasum -a 256 rollback/aicoopai-durable-public-2026-07-16.tar.gz
dig @8.8.8.8 aicoopai.com A +short
dig @8.8.8.8 www.aicoopai.com CNAME +short
curl -sSIL https://aicoopai.com/
curl -sSIL https://www.aicoopai.com/
```

Expected: archive SHA-256 is `e3c726721a1af0efdf53c530d6f50abe68132454cd20b976cb74fc713a0cf144`; apex A includes `172.66.0.42`; `www` CNAME is `websites.mydurable.com`; the site still resolves to the Durable version.

- [ ] **Step 2: Reconfirm the visible Namecheap record set in authenticated Chrome**

Open `https://ap.www.namecheap.com/domains/domaincontrolpanel/aicoopai.com/advancedns` and confirm these web records before editing:

```text
A Record      @      172.66.0.42
CNAME Record  www    websites.mydurable.com.
URL Redirect  @      http://www.aicoopai.com/    Unmasked
```

Also confirm without changing or exposing their values: Google verification TXT, Durable verification TXT, email-forwarding SPF, and any unrelated records. Stop before mutation if the web records no longer match the rollback record.

- [ ] **Step 3: Register both domains on the Vercel project**

Run:

```bash
vercel domains add aicoopai.com aicoopai-rebuild
vercel domains add www.aicoopai.com aicoopai-rebuild
vercel alias set UNIQUE_DEPLOYMENT_HOSTNAME aicoopai.com
vercel alias set UNIQUE_DEPLOYMENT_HOSTNAME www.aicoopai.com
```

Expected: both domains are associated with `aicoopai-rebuild`. If Vercel reports that a domain is already registered to the same project, continue to inspection. If it belongs to another Vercel project or team, stop rather than using `--force`.

- [ ] **Step 4: Read and record Vercel's exact external-DNS requirements**

Run:

```bash
vercel domains inspect aicoopai.com
vercel domains inspect www.aicoopai.com
```

Expected: Vercel reports the required apex and `www` DNS targets or exposes them in the project Domains screen. Record those observed values as `VERCEL_APEX_TARGET` and `VERCEL_WWW_TARGET`. Do not substitute generic targets.

- [ ] **Step 5: Change only the three authorized Namecheap web-routing records**

In the authenticated Advanced DNS page:

1. Edit the apex A/ALIAS record so host `@` uses `VERCEL_APEX_TARGET` and retain the existing 60-minute TTL unless Vercel explicitly requires another record type.
2. Edit the `www` CNAME so host `www` uses `VERCEL_WWW_TARGET` and retain the existing 60-minute TTL.
3. Remove the conflicting unmasked apex URL Redirect record to `http://www.aicoopai.com/`.
4. Save each change and confirm the resulting table.

Do not edit or delete the Google verification TXT, Durable verification TXT, email-forwarding SPF, or any unrelated record. Do not modify or delete the Durable workspace.

- [ ] **Step 6: Wait for authoritative and public DNS convergence**

Run periodically for up to the configured TTL:

```bash
dig +short aicoopai.com A
dig +short www.aicoopai.com CNAME
dig @8.8.8.8 aicoopai.com A +short
dig @8.8.8.8 www.aicoopai.com CNAME +short
vercel domains inspect aicoopai.com
vercel domains inspect www.aicoopai.com
```

Expected: public resolvers return the exact Vercel targets and both Vercel domain inspections report valid configuration. A temporarily pending certificate during propagation is not success; continue until HTTPS is ready or the rollback threshold is reached.

- [ ] **Step 7: Apply the rollback rule if the cutover cannot reach a safe state**

Rollback immediately if DNS has converged but either domain cannot obtain valid HTTPS, canonical pages are unavailable, the wrong Vercel project is served, or critical scheduling/security gates fail and cannot be corrected promptly.

Restore exactly:

```text
A Record      @      172.66.0.42
CNAME Record  www    websites.mydurable.com.
URL Redirect  @      http://www.aicoopai.com/    Unmasked
```

Then repeat the `dig` and `curl` commands from Step 1 until the Durable site is restored. Leave all unrelated DNS records untouched.

---

### Task 6: Verify production, record evidence, and close the release

**Files:**
- Create: `docs/qa/2026-07-18-production-cutover.md`
- Modify: `README.md:3-5,46-56`
- Modify: `docs/deployment-handoff.md:3-51`

**Interfaces:**
- Consumes: converged Vercel DNS, merged Git SHA, unique Vercel deployment hostname, and production acceptance results.
- Produces: evidence-backed release documentation and a final documentation commit on `main`.

- [ ] **Step 1: Verify transport, canonical host, routes, assets, and headers from the public edge**

Run:

```bash
curl -sSIL http://aicoopai.com/
curl -sSIL https://aicoopai.com/
curl -sSIL https://www.aicoopai.com/
curl -sSIL https://aicoopai.com/privacy/
curl -sSIL https://aicoopai.com/terms/
curl -sSIL https://aicoopai.com/connect/
curl -sSIL https://aicoopai.com/sitemap.xml
curl -sSIL https://aicoopai.com/favicon.png
curl -sSIL https://aicoopai.com/social-card.png
curl -sSIL https://aicoopai.com/not-a-real-page/
```

Expected: HTTP redirects to HTTPS; the apex returns 200; `www` permanently redirects to the same apex path; canonical pages and assets return 200; the unknown route returns 404 after any trailing-slash redirect; responses include the configured Vercel security headers.

- [ ] **Step 2: Verify every canonical route**

Run:

```bash
for route in / /community/ /resources/ /events/ /about/ /connect/ /privacy/ /terms/ /accessibility/ /editorial-policy/; do curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" "https://aicoopai.com${route}"; done
```

Expected: all 10 routes return HTTP 200 at `https://aicoopai.com`.

- [ ] **Step 3: Verify metadata and legal content from production**

Run:

```bash
curl -sS https://aicoopai.com/privacy/
curl -sS https://aicoopai.com/terms/
curl -sS https://aicoopai.com/sitemap.xml
```

Inspect the outputs for the full operator/address, July 18 effective date, limitation and carveouts, Florida/Walton County terms, 30-day dispute process, no forced arbitration, apex canonicals, and exactly 10 sitemap URLs. Confirm no prelaunch placeholder or false attorney-approval claim appears.

- [ ] **Step 4: Perform production desktop, mobile, keyboard, and third-party browser checks**

In a real browser, verify home, Privacy, Terms, Connect, Accessibility, Editorial Policy, and a missing path at 1440x1000 and 390x844. Confirm:

```text
no page or console errors
no horizontal overflow
one H1 and logical headings per page
visible focus and working skip link
mobile menu opens, Escape closes it, and focus returns
Calendly embed or direct fallback works
Google Form alternative opens
Privacy and Terms show the confirmed operator and legal sections
unknown path shows the noindexed 404 page
```

- [ ] **Step 5: Confirm deployment and DNS traceability**

Run:

```bash
git rev-parse HEAD
gh pr view 1 --repo PerpetualRoyalty/aicoop-website --json state,mergedAt,mergeCommit,url
vercel inspect aicoopai.com
vercel domains inspect aicoopai.com
vercel domains inspect www.aicoopai.com
dig @8.8.8.8 aicoopai.com A +short
dig @8.8.8.8 www.aicoopai.com CNAME +short
```

Expected: PR #1 is merged; `main` contains the merged work; the apex alias points to the verified Vercel deployment; both domains are valid; DNS matches the exact targets recorded in Task 5.

- [ ] **Step 6: Submit the sitemap when authenticated Search Console access is available**

In Google Search Console for the verified `aicoopai.com` property, submit:

```text
https://aicoopai.com/sitemap.xml
```

Expected: Search Console accepts the sitemap. If the property or authentication is unavailable, do not create a new account or property without authority; record the exact access blocker as the only remaining indexing action.

- [ ] **Step 7: Create the production evidence document from observed results**

Create `docs/qa/2026-07-18-production-cutover.md` with these headings and fill each section only with observed command/browser evidence—never estimates or placeholders:

```markdown
# AiCoOpAI production cutover verification — July 18, 2026

## Release identity

Record the merged pull request URL, merged Git commit, unique Vercel deployment hostname, project name, and verification time in America/Chicago.

## Automated gates

Record the exact `npm run check` result from merged `main`.

## DNS cutover

Record the preserved Durable values, exact Vercel apex and `www` targets, final public resolver answers, and confirmation that email/SPF/verification records were unchanged.

## Route and header verification

Record the status result for all 10 canonical routes, the 404, HTTP-to-HTTPS behavior, `www` redirect, assets, sitemap, and security headers.

## Browser and interaction verification

Record desktop/mobile, keyboard navigation, policy rendering, Calendly, Google Form, accessibility, and console results.

## Legal publication boundary

Record that Good Samaritan Institute, Inc. is the published operator, Doug Liles approved the design and cutover, and the language is counsel-ready rather than represented as attorney approved.

## Rollback readiness

Record the archive path and SHA-256, retained Durable workspace, former DNS values, rollback owner, and whether rollback was or was not invoked.

## Search indexing

Record the sitemap-submission result or the exact authenticated-access blocker.

## Release decision

State `PASS` only if every critical production acceptance gate passed; otherwise state `ROLLED BACK` and identify the failed gate.
```

- [ ] **Step 8: Update current-state documentation after verified success**

In `README.md` and `docs/deployment-handoff.md`, change only the live-state statements to say that `https://aicoopai.com/` is served by the verified Vercel deployment, PR #1 is merged, and the Durable workspace plus rollback evidence remain preserved. Do not mark Search Console complete unless Step 6 actually succeeded.

- [ ] **Step 9: Run the final repository review and commit evidence**

Run:

```bash
npm run check
git diff --check
git status --short
git diff -- README.md docs/deployment-handoff.md docs/qa/2026-07-18-production-cutover.md
git add README.md docs/deployment-handoff.md docs/qa/2026-07-18-production-cutover.md
git commit -m "Record AiCoOpAI production cutover"
git push origin main
```

Expected: the final test gate passes; the evidence contains actual results; only the three listed documentation files are committed and pushed.

- [ ] **Step 10: Perform the final public recheck after the evidence push**

Because `docs/` is excluded by `.vercelignore`, the evidence-only push must not change the public artifact. Re-run:

```bash
curl -sSIL https://aicoopai.com/
curl -sSIL https://www.aicoopai.com/
curl -sSIL https://aicoopai.com/privacy/
curl -sSIL https://aicoopai.com/terms/
curl -sSIL https://aicoopai.com/not-a-real-page/
```

Expected: production remains healthy, `www` still redirects to apex, policies return 200, and the missing path returns 404.

---

## Completion Criteria

- The public Privacy and Terms pages contain the approved operator and legal design with no unresolved draft language.
- All automated, built-site, staging-browser, and production-browser gates pass.
- PR #1 is merged and the production deployment is traceable to merged `main`.
- Apex and `www` use valid HTTPS; `www` permanently redirects to the apex.
- Namecheap email, SPF, verification, and unrelated records are unchanged.
- The Durable workspace, baseline, archive, and exact rollback DNS values remain available.
- Production evidence is committed on `main` and the public site passes the post-evidence recheck.
