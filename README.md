# AiCoOpAI website

This workspace contains a dependency-free static replacement for `aicoopai.com`. It implements the approved trust-first direction: a practical Florida AI community and resource hub that describes only services available today.

The original Durable website remains live while the verified replacement proceeds through its authorized production cutover. The replacement is published on `agent/trust-first-rebuild` in the existing public `PerpetualRoyalty/aicoop-website` repository and is under review in [pull request #1](https://github.com/PerpetualRoyalty/aicoop-website/pull/1). Good Samaritan Institute, Inc. is the confirmed operator. Doug Liles confirmed ownership of the Durable restore procedure and authorized the AiCoOpAI production cutover. The published legal language is an owner-approved, counsel-ready draft and must not be represented as attorney approved without actual attorney review.

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

The build is compatible with Vercel static hosting through `vercel.json`. The authorized cutover sequence is:

1. Publish and verify the confirmed operator and Florida legal language on staging.
2. Review and merge pull request #1.
3. Preserve the authenticated Durable workspace and verified rollback baseline under Doug Liles's restore procedure.
4. Attach the apex and `www` domains to the verified Vercel project, then change only the Namecheap web-routing records Vercel requires.
5. Preserve email forwarding, SPF, Google verification, Durable verification, and unrelated DNS records.
6. Verify every canonical route, 404 behavior, headers, forms, embeds, sitemap, and external links on production.
7. Submit `/sitemap.xml` in Google Search Console when authenticated access is available.
8. Restore the recorded Durable routing immediately if a critical release gate fails.
