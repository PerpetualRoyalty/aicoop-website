# AiCoOpAI Trust-First Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a production-ready, dependency-free replacement for aicoopai.com that is credible, accessible, fast, searchable, and honest about the services available today.

**Architecture:** A Node.js static generator composes focused page definitions through shared layout and component modules, then emits an immutable `dist/` site. Node's built-in test runner validates content, routes, metadata, links, accessibility contracts, status behavior, and security configuration without adding packages.

**Tech Stack:** HTML5, modern CSS, small progressive-enhancement JavaScript, Node.js built-in modules, `node:test`, Vercel static hosting configuration.

## Global Constraints

- Add no third-party production or development dependencies.
- Preserve `WORK TO EARN AGREEMENT.docx`; do not publish, modify, or rely on it.
- Use `AiCoOpAI` in prose and `aicoopai.com` for the domain.
- Publish no unsupported member, partnership, platform-feature, event, testimonial, earnings, or outcome claims.
- Keep the Bonus program and legacy blog posts out of the replacement navigation and sitemap.
- External services must be labeled and opened safely.
- Every page must be useful without JavaScript.
- Use one H1, one canonical URL, unique metadata, semantic landmarks, and visible focus on every route.
- Never commit credentials, tokens, analytics identifiers, private URLs, or customer data.

---

### Task 1: Project foundation and test harness

**Files:**
- Create: `package.json`
- Create: `src/config/site.js`
- Create: `scripts/build.mjs`
- Create: `scripts/serve.mjs`
- Create: `test/build.test.mjs`
- Create: `.gitignore`

**Interfaces:**
- Produces: `siteConfig`, `buildSite({ rootDir, outDir })`, and a deterministic `dist/` tree.
- Consumes: only Node.js built-in modules.

- [ ] Write `test/build.test.mjs` with a failing test that imports `buildSite`, builds into a temporary directory, and asserts that `index.html`, `styles.css`, `app.js`, `robots.txt`, `sitemap.xml`, and `404.html` exist.
- [ ] Run `npm test -- --test-name-pattern="build emits"`; expect failure because `scripts/build.mjs` does not exist.
- [ ] Add `package.json` scripts: `build`, `test`, `check`, and `serve`, all implemented with Node built-ins.
- [ ] Implement `siteConfig` with canonical origin `https://aicoopai.com`, brand `AiCoOpAI`, and the approved route list.
- [ ] Implement `buildSite` to empty and recreate `dist/`, render routes, and copy static assets deterministically.
- [ ] Implement a local static server that serves `404.html` with status 404 for missing paths.
- [ ] Run `npm test`; expect all Task 1 tests to pass.
- [ ] If Git exists, commit with `chore: establish static site build`; otherwise record the no-Git limitation in `README.md`.

### Task 2: Content model and shared rendering

**Files:**
- Create: `src/content/pages.js`
- Create: `src/render/layout.js`
- Create: `src/render/components.js`
- Create: `src/render/escape.js`
- Create: `test/render.test.mjs`

**Interfaces:**
- Produces: `pages: PageDefinition[]`, `renderPage(page, config)`, `escapeHtml(value)`, `renderLink(link)`, `renderHeader(activePath)`, and `renderFooter()`.
- `PageDefinition` fields: `path`, `title`, `description`, `eyebrow`, `heading`, `body`, and `schemaType`.

- [ ] Write failing tests for HTML escaping, one H1 per page, semantic landmarks, canonical metadata, safe external-link attributes, and a skip link.
- [ ] Run `npm test -- --test-name-pattern="render"`; expect missing-module failures.
- [ ] Implement strict escaping for content and attribute values.
- [ ] Implement a shared header with Community, Resources, Events, About, Connect, and a named mobile-menu button using `aria-expanded="false"`.
- [ ] Implement a footer with privacy, terms, accessibility, editorial policy, and copyright navigation.
- [ ] Implement layout metadata, Open Graph tags, canonical links, JSON-LD, icons, manifest link, theme color, and a no-JavaScript-safe body.
- [ ] Run the render tests and confirm they pass.

### Task 3: Visual system and progressive enhancement

**Files:**
- Create: `src/assets/styles.css`
- Create: `src/assets/app.js`
- Create: `src/assets/icon.svg`
- Create: `src/assets/social-card.svg`
- Create: `test/assets.test.mjs`

**Interfaces:**
- Produces: CSS custom properties, responsive layout primitives, component styles, and mobile-navigation behavior.

- [ ] Write failing tests that require a visible `:focus-visible` rule, `prefers-reduced-motion`, responsive breakpoints, and a mobile-menu script that toggles `aria-expanded` and closes on Escape.
- [ ] Run the asset tests; expect failure because the files do not exist.
- [ ] Implement the approved ink, paper, lime, and sky palette with contrast-safe text states.
- [ ] Implement fluid type, container, grid, stack, card, button, notice, hero, timeline, and footer primitives.
- [ ] Implement CSS-only workshop geometry so no stock imagery is required.
- [ ] Implement mobile navigation with focus return, outside-click closing, and no-JavaScript desktop fallback.
- [ ] Implement the SVG icon and 1200×630 social card using only brand text and geometry.
- [ ] Run the asset tests and confirm they pass.

### Task 4: Core public pages

**Files:**
- Modify: `src/content/pages.js`
- Create: `test/content.test.mjs`

**Interfaces:**
- Produces: complete definitions for `/`, `/community/`, `/resources/`, `/events/`, `/about/`, and `/connect/`.

- [ ] Write failing tests that assert all six routes exist, have unique titles and descriptions, use exactly one H1, contain a primary Connect CTA, and exclude the disallowed-claim dictionary.
- [ ] Run the content tests; expect route failures.
- [ ] Implement the homepage with promise, current benefits, participation steps, curated resources, trust principles, and CTA before media.
- [ ] Implement Community with audience paths, collaboration principles, and an explicit early-stage operating-model disclosure.
- [ ] Implement Resources with the two current ChatGPT assistants, Good Combinator marketplace and GPT store, the AiCoOpAI podcast, and a resource-submission link.
- [ ] Implement Events without invented dates; show the current announcement status and on-demand media.
- [ ] Implement About with mission, stage, Walton County context, and relationship to Good Combinator without unsupported leadership or scale claims.
- [ ] Implement Connect with explanatory content, a titled lazy Calendly iframe, a Google Form alternative, and third-party privacy disclosure.
- [ ] Run the content tests and confirm they pass.

### Task 5: Trust, policy, and editorial pages

**Files:**
- Modify: `src/content/pages.js`
- Create: `test/policy.test.mjs`

**Interfaces:**
- Produces: `/privacy/`, `/terms/`, `/accessibility/`, and `/editorial-policy/`.

- [ ] Write failing tests requiring an effective date, operator contact route, named third-party services, correction process, AI-assistance disclosure, testimonial standard, affiliate disclosure standard, and external-service disclaimer.
- [ ] Run the policy tests; expect missing-route failures.
- [ ] Implement Privacy covering server logs, Cloudflare/Vercel hosting, Calendly, Google Forms, Spotify, ChatGPT/OpenAI, external links, retention, security, choices, and contact.
- [ ] Implement Terms covering informational use, external services, no professional advice, acceptable use, intellectual property, availability, and changes.
- [ ] Implement Accessibility with standards commitment, tested interaction modes, known third-party limitations, and feedback route.
- [ ] Implement Editorial Policy with sourcing, AI drafting, human review, corrections, case studies, testimonials, affiliate disclosures, and removal standards.
- [ ] Run the policy tests and confirm they pass.

### Task 6: SEO, status, and security artifacts

**Files:**
- Modify: `scripts/build.mjs`
- Create: `src/config/headers.js`
- Create: `vercel.json`
- Create: `test/seo.test.mjs`
- Create: `test/security.test.mjs`

**Interfaces:**
- Produces: `robots.txt`, `sitemap.xml`, `site.webmanifest`, `404.html`, strict static response headers, HTTPS and `www` redirects.

- [ ] Write failing tests for sitemap canonical URLs, robots sitemap reference, unique canonicals, valid JSON-LD, a real manifest, a useful 404 page, HTTPS redirect intent, canonical-host redirect, CSP, HSTS, Referrer-Policy, Permissions-Policy, `nosniff`, and frame protection.
- [ ] Run SEO and security tests; expect missing-artifact failures.
- [ ] Generate the sitemap from page definitions only, with `lastmod` equal to the release date and no Bonus or blog URLs.
- [ ] Generate robots allowing the public site and referencing `/sitemap.xml`.
- [ ] Generate a manifest with the approved name, theme colors, start URL, and SVG icon.
- [ ] Configure Vercel redirects from `www` to apex and response headers with a source-specific CSP that permits self, Calendly, Spotify, Google Forms, and required images only.
- [ ] Add `X-Robots-Tag: noindex` to `404.html` through route configuration.
- [ ] Run SEO and security tests and confirm they pass.

### Task 7: Legacy content inventory

**Files:**
- Create: `scripts/audit-legacy-content.mjs`
- Create: `content-audit/legacy-blog-inventory.csv`
- Create: `content-audit/README.md`
- Create: `test/legacy-audit.test.mjs`

**Interfaces:**
- Produces: deterministic CSV columns `url,title,category,risk,proposed_action,evidence_required,redirect_target`.
- Categories: `SUBSTANTIATE`, `VERIFY_EVENT`, `VERIFY_LOCAL`, `CONSOLIDATE`, and `REMOVE_UNLESS_PROVEN`.

- [ ] Write failing classification tests for representative case-study, event, Walton County, duplicated-platform, and generic-guide slugs.
- [ ] Run the legacy-audit test; expect missing-module failure.
- [ ] Implement title extraction from slugs and deterministic keyword-based classification.
- [ ] Fetch the current XML sitemap, extract all `/blog/` URLs, and emit the inventory without storing private data.
- [ ] Document that redirects require human evidence review and must not all point to the homepage.
- [ ] Run the audit tests and confirm exactly 189 current blog URLs are inventoried when the live sitemap remains unchanged.

### Task 8: Full QA automation

**Files:**
- Create: `scripts/check-site.mjs`
- Create: `test/site-contract.test.mjs`
- Create: `README.md`

**Interfaces:**
- Produces: `npm run check` as the release gate.

- [ ] Write failing site-contract tests that crawl built HTML and fail on broken internal links, duplicate IDs, empty anchors, multiple H1s, missing labels, missing iframe titles, insecure HTTP resources, unsupported claims, or pages absent from the sitemap.
- [ ] Run the tests and confirm the expected failures.
- [ ] Implement the crawler using Node built-ins and conservative HTML token extraction.
- [ ] Add README instructions for build, test, check, serve, deploy, rollback, content review, and required external approvals.
- [ ] Run `npm run check`; expect a zero exit code and a summary of routes, links, metadata, and policies checked.

### Task 9: Browser verification and deployment handoff

**Files:**
- Create: `docs/qa/2026-07-16-browser-verification.md`
- Create: `docs/deployment-handoff.md`

**Interfaces:**
- Consumes: `dist/` and the local server from Task 1.
- Produces: visual QA evidence and an explicit production cutover checklist.

- [ ] Start the local server with `npm run serve` and verify the printed local URL.
- [ ] Use agent-browser at 390×844 and 1440×1000 to visit every route, capture home and Connect screenshots, inspect interactive snapshots, check browser errors, exercise mobile navigation, and confirm the missing-route 404.
- [ ] Record pass/fail evidence for navigation, responsiveness, keyboard behavior, external-link labels, Calendly title, and no console errors.
- [ ] Document the required Durable/Vercel credentials, source-of-truth decision, DNS/domain mapping, preview approval, production deploy, live route checks, Search Console sitemap submission, and rollback procedure.
- [ ] Run `npm run check` once more after browser QA.
- [ ] Do not replace the live Durable site until the production project and rollback owner are confirmed.

## Plan self-review

- Every approved public route, trust requirement, accessibility contract, SEO artifact, status behavior, and security header has an implementation task.
- The plan intentionally excludes unsupported testimonials, member features, Bonus claims, and legal use of the work-to-earn template.
- All modules and produced interfaces are named consistently across tasks.
- The plan adds no dependencies and contains no unresolved implementation placeholders.
