# AiCoOpAI website

This workspace contains a dependency-free static replacement for `aicoopai.com`. It implements the approved trust-first direction: a practical Florida AI community and resource hub that describes only services available today.

The original Durable website remains live. The verified replacement is published on `agent/trust-first-rebuild` in the existing public `PerpetualRoyalty/aicoop-website` repository and is under review in [draft pull request #1](https://github.com/PerpetualRoyalty/aicoop-website/pull/1). The branch preserves the earlier prototype history and its MIT license. Read-only browser verification confirmed authenticated access to both the AiCoOpAI Durable workspace and the authoritative Namecheap DNS controls. Production still requires explicit cutover and legal approval.

## Requirements

- Node.js 22 or newer
- No package installation is required

## Commands

```bash
npm run build
npm test
npm run check
npm run serve
npm run snapshot:live -- --out rollback/durable-public-YYYY-MM-DD
```

`npm run build` writes the release to `dist/`. `npm run check` rebuilds, runs the automated tests, and audits the generated pages for broken links, metadata, heading structure, accessible controls, iframe titles, unsupported claims, and sitemap coverage. `npm run serve` exposes the built site at `http://127.0.0.1:4173` and returns a real 404 response for missing paths. `npm run snapshot:live` captures the current public Durable routes, response headers, and checksums into an ignored local rollback directory; it is not a substitute for a Durable account export.

## Source structure

- `src/content/pages.js` — approved public copy and page definitions
- `src/render/` — escaping, shared layout, navigation, cards, and notices
- `src/assets/` — visual system and progressive enhancement
- `src/config/` — canonical site and security-header contracts
- `scripts/build.mjs` — deterministic static build
- `scripts/check-site.mjs` — release-site crawler and contract audit
- `scripts/capture-live-baseline.mjs` — public pre-cutover snapshot and checksum manifest
- `scripts/audit-legacy-content.mjs` — current blog sitemap inventory and risk classification
- `content-audit/` — URL-level review queue for the 189 legacy blog pages
- `test/` — Node built-in tests
- `docs/` — approved design, implementation plan, QA evidence, and deployment handoff

## Content rules

- Do not publish a platform feature, partnership, event, outcome, testimonial, referral, earnings, or member claim without current evidence and permission.
- Do not restore the Bonus page until the program, calculator, disclosure, and legal terms are complete and reviewed.
- Do not publish or rely on `WORK TO EARN AGREEMENT.docx`; it is an unfinished MyFL.ai template retained only as an existing workspace artifact.
- AI-assisted drafts require human factual review under the editorial policy.
- Review legacy URLs individually before adding redirects.

## Deployment and rollback

The build is compatible with Vercel static hosting through `vercel.json`. Before production cutover:

1. Review and merge draft pull request #1 after the operator and legal language are approved.
2. Reconfirm the verified Vercel staging artifact and browser QA after any review changes.
3. Preserve the authenticated Durable workspace and confirm its native export or restore procedure; the public snapshot alone is not a platform backup.
4. Confirm cutover authority, then use the authenticated Namecheap account to update DNS and verify domain attachment, canonical host, and HTTPS behavior.
5. Deploy production and verify every canonical route, 404 behavior, headers, forms, embeds, sitemap, and external links.
6. Submit `/sitemap.xml` in Google Search Console and monitor removals, redirects, and indexing.
7. Roll back to the prior verified deployment if any release gate fails.
