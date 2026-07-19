# AiCoOpAI Trust-First Website Rebuild

## Decision

Replace the current marketing site with a focused AI community and resource hub. The site must describe only services that are publicly available today and must not represent AiCoOpAI as a member software platform until accounts, forums, uploads, messaging, moderation, privacy controls, and support operations exist.

## Audience and outcome

The primary audience is Florida founders, developers, researchers, educators, civic leaders, and community partners exploring practical AI collaboration. The primary conversion is a qualified introduction request or a scheduled conversation. Secondary conversions are launching one of the AiCoOpAI assistants and exploring the related Good Combinator ecosystem.

## Public routes

- `/` — clear promise, current benefits, participation steps, featured resources, trust commitments, and primary CTA.
- `/community/` — who the community is for, participation paths, operating principles, and expectations.
- `/resources/` — curated assistants, ecosystem tools, podcast, and resource-submission route.
- `/events/` — current event status, on-demand media, and proposal/contact CTA without invented events.
- `/about/` — mission, current operating model, relationship to Good Combinator, and transparent stage statement.
- `/connect/` — explanatory copy, Calendly scheduling embed, Google Form alternative, and third-party privacy notice.
- `/privacy/` — replacement-site data practices and third-party services.
- `/terms/` — acceptable use, external services, intellectual property, disclaimers, and governing-use baseline.
- `/accessibility/` — accessibility commitment and contact route.
- `/editorial-policy/` — sourcing, AI assistance, corrections, testimonials, affiliate disclosure, and article standards.
- `/404.html` — useful missing-page recovery.

The Bonus page and unsupported blog claims are not part of the replacement launch. A legacy-content inventory will classify all current blog URLs for substantiation, consolidation, event verification, local-claim verification, or removal before redirects are approved.

## Content rules

- Do not claim user accounts, forums, messaging, file uploads, shared datasets, member totals, mentorship programs, partnerships, projects, outcomes, or events without current public evidence.
- Do not publish testimonials without identity, consent, and an authentic record.
- Do not publish affiliate earnings language or a calculator until counsel-approved terms define qualifying referrals, commission base, payout rules, eligibility, reversals, taxes, fraud, termination, and disputes.
- Use one brand form: `AiCoOpAI` in prose and `aicoopai.com` for the domain.
- Clearly label external destinations and the need for third-party accounts.
- Treat AI-generated copy as a draft that requires human factual review.

## Visual system

Use a dark ink foundation, warm off-white surfaces, electric lime as a restrained action accent, and sky blue as an informational accent. Use an accessible sans-serif system stack. The visual personality should feel like an optimistic civic technology workshop: precise, open, local, and practical. Avoid generic stock photography. Use lightweight CSS geometry, diagrams, and typographic composition so the site remains fast and distinctive.

The hero must appear before any podcast embed. The header uses a compact text-and-mark logo, a five-link navigation, and one prominent Connect CTA. Layouts must work at 360, 390, 768, 1024, and 1440 pixel widths.

## Architecture

Build a dependency-free static generator using Node.js built-in modules. Page definitions and shared components live in focused JavaScript modules. The build writes production HTML, CSS, JavaScript, robots, sitemap, manifest, icons, and security/deployment configuration to `dist/`.

Automated tests use `node:test` and verify routes, internal links, metadata, canonicals, structured data, heading hierarchy, accessible names, iframe titles, security headers, and absence of disallowed claims. A local server script supports browser verification.

## SEO and status behavior

- Every indexable page has one H1, unique title and description, canonical URL, Open Graph metadata, and accurate organization or webpage structured data.
- `/sitemap.xml` includes only retained canonical pages and accurate modification dates.
- `robots.txt` references `/sitemap.xml`.
- HTTP redirects to HTTPS at the hosting layer.
- Missing routes return 404.
- `www.aicoopai.com` redirects to `aicoopai.com`.
- Legacy article redirects are added only after URL-level review.

## Accessibility and performance

Use semantic landmarks, a skip link, visible focus, named navigation and controls, logical headings, descriptive external-link cues, titled iframes, reduced-motion support, responsive typography, and high-contrast states. Avoid client-side rendering for core content. Defer the Calendly and Spotify frames until the relevant page and lazy-load them.

## Legal and operational boundary

The privacy, terms, accessibility, and editorial pages are operational drafts, not legal advice. Counsel must review referral, equity, contractor, compensation, and earnings programs before publication. The local `WORK TO EARN AGREEMENT.docx` is excluded from the site because it is a MyFL.ai template with unresolved placeholders.

## Launch gates

- Build, tests, metadata audit, internal-link audit, and browser QA pass.
- No unsupported platform, testimonial, partnership, event, or earnings claims remain.
- Connect and all external destinations work.
- Mobile navigation is keyboard accessible and announces its state.
- Production source, hosting project, domain, and rollback owner are confirmed before replacing the Durable site.
