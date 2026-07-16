# AiCoOpAI website

This workspace contains a dependency-free static replacement for `aicoopai.com`. It implements the approved trust-first direction: a practical Florida AI community and resource hub that describes only services available today.

The original Durable website remains live. This workspace was not a Git repository when the replacement was created, so there is no inherited history, branch, remote, or deployment link. Establish source control before production cutover.

## Requirements

- Node.js 22 or newer
- No package installation is required

## Commands

```bash
npm run build
npm test
npm run check
npm run serve
```

`npm run build` writes the release to `dist/`. `npm run check` rebuilds, runs the automated tests, and audits the generated pages for broken links, metadata, heading structure, accessible controls, iframe titles, unsupported claims, and sitemap coverage. `npm run serve` exposes the built site at `http://127.0.0.1:4173` and returns a real 404 response for missing paths.

## Source structure

- `src/content/pages.js` — approved public copy and page definitions
- `src/render/` — escaping, shared layout, navigation, cards, and notices
- `src/assets/` — visual system and progressive enhancement
- `src/config/` — canonical site and security-header contracts
- `scripts/build.mjs` — deterministic static build
- `scripts/check-site.mjs` — release-site crawler and contract audit
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

1. Create or confirm the source repository and production owner.
2. Deploy a preview from this exact workspace and complete browser QA.
3. Confirm the current Durable configuration and export or rollback path.
4. Confirm DNS, domain attachment, canonical host, and HTTPS behavior.
5. Deploy production and verify every canonical route, 404 behavior, headers, forms, embeds, sitemap, and external links.
6. Submit `/sitemap.xml` in Google Search Console and monitor removals, redirects, and indexing.
7. Roll back to the prior verified deployment if any release gate fails.
