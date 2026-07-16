# AiCoOpAI release verification — July 16, 2026

## Release candidate

- Staging URL: `https://aicoopai-rebuild.vercel.app/`
- Canonical production origin in metadata: `https://aicoopai.com`
- Live-domain state during verification: the existing Durable site remained unchanged
- Replacement build: 10 canonical routes plus a real 404 response

## Automated gates

The following release command completed successfully after the final content and scheduler-fallback changes:

```text
npm run check
32 tests passed, 0 failed
Site check passed: 11 HTML pages, 190 internal links, 11 external links.
```

The suite covers deterministic output, metadata uniqueness, canonicals, JSON-LD, sitemap and robots coverage, manifest and 404 behavior, semantic structure, named controls, safe external links, iframe titles, unsupported-claim exclusions, policy content, responsive and reduced-motion CSS, security configuration, the 189-URL legacy inventory, and deployment-bundle exclusions.

## Route verification

Every canonical route loaded in a real browser with meaningful content and no horizontal overflow at the desktop viewport:

| Route | Verified page purpose |
|---|---|
| `/` | clear positioning, three entry paths, operating model, current resources, trust commitments |
| `/community/` | practical participation paths and explicit boundaries |
| `/resources/` | labeled first- and third-party resources |
| `/events/` | honest no-event state without invented registration claims |
| `/about/` | current operating model and ecosystem relationship |
| `/connect/` | Calendly embed, direct scheduler fallback, and Google Form alternative |
| `/privacy/` | data practices and third-party services |
| `/terms/` | informational-use and acceptable-use baseline |
| `/accessibility/` | commitments, testing approach, limitations, feedback path |
| `/editorial-policy/` | evidence, AI review, testimonial, disclosure, correction, and removal rules |

`/not-a-real-page/` returned HTTP 404, rendered a useful recovery page, and remained noindexed.

## Browser and interaction checks

- Desktop: verified at 1440 × 1000; no blank page, framework overlay, console error, page error, or horizontal overflow.
- Mobile: verified at 390 × 844; the page reflowed to one column with no horizontal overflow.
- Mobile navigation: announced `aria-expanded=false`, opened to `true`, closed with Escape, and returned keyboard focus to the menu button.
- Skip link, named navigation regions, one H1 per page, logical lower-level headings, accessible link names, and titled iframe were present in the accessibility tree.
- Calendly: direct URL returned HTTP 200; the deployed iframe document and initialization requests returned HTTP 200 under the production CSP.
- Embed resilience: a visible `Open Calendly directly` link remains available above the iframe; a Google Form alternative is separately labeled.
- External resources: ChatGPT assistants, Spotify, Good Combinator, Calendly, and Google Forms all resolved to HTTP 200 destinations during the release check.

## Deployment and header checks

The isolated Vercel staging project reached `Ready`. The deployed home, Connect page, sitemap, favicon, social card, stylesheet, and 404 were fetched from the public edge. Verified behavior includes:

- HTTPS and HSTS
- strict Content Security Policy with only the Calendly frame origin permitted
- `frame-ancestors 'none'` and `X-Frame-Options: DENY`
- `nosniff`, strict referrer policy, limited permissions policy, COOP, and CORP
- one-year immutable caching for CSS, JavaScript, favicon, and social card
- HTTP 404 after Vercel's canonical trailing-slash redirect
- sitemap served as XML and limited to the 10 approved canonical routes

The production domain still returned the existing Durable site, including HTTP 200 on the insecure `http://` origin. No DNS, domain alias, or live-site mutation was made during staging verification.

A pre-cutover public rollback baseline captured 197 Durable responses with HTTP 200 status, per-file SHA-256 checksums, response-header evidence, Durable public identifiers, and current DNS targets. The compressed archive checksum was independently verified. The archive is intentionally excluded from Git and Vercel; it does not replace a platform-native Durable account export.

## Owner-access audit

- The shared Chrome session was authenticated to Durable and the AiCoOpAI workspace was present.
- Durable showed the website as published and `https://aicoopai.com` as the connected public domain.
- The available Namecheap session redirected the domain-control URL to login, so authoritative DNS access and cutover authority remain unverified.
- GitHub CLI authentication for `PerpetualRoyalty` remained invalid; device authorization was initiated but not completed during this audit.
- No DNS, domain, Durable, GitHub, or production-site setting was changed.

## Visual evidence

- `screenshots/staging-home-desktop.png` — deployed desktop home page
- `screenshots/local-home-mobile.png` — full mobile home page
- `screenshots/local-connect-mobile.png` — mobile scheduler fallback and loaded Calendly surface

## Release decision

The replacement artifact passes the technical release gates. Production cutover remains intentionally gated on the confirmed legal operator and mailing contact, counsel review of the operator/liability/governing-law terms, confirmation of the native Durable restore procedure, completed GitHub authorization, authenticated Namecheap access, and explicit domain-cutover authority. Unsupported legacy blog pages remain unpublished; their 189 URL-level evidence requirements are preserved in `content-audit/legacy-blog-inventory.csv`.
