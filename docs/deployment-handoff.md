# AiCoOpAI deployment handoff

## Current state

The replacement is built, tested, and deployed to the isolated Vercel staging project at:

`https://aicoopai-rebuild.vercel.app/`

The existing site at `https://aicoopai.com/` has not been changed. The staging artifact uses production canonicals so the exact same build can be promoted after the remaining owner-controlled gates are closed.

## What is complete

- dependency-free static build with repeatable `npm run check`
- focused positioning and a complete six-page public information architecture
- Privacy, Terms, Accessibility, and Editorial Policy pages
- responsive editorial visual system, mobile navigation, focus states, and reduced-motion support
- favicon, social preview, manifest, canonical metadata, JSON-LD, sitemap, robots, and real 404
- strict Vercel security headers and immutable asset caching
- Calendly scheduling, direct-scheduler fallback, and Google Form alternative
- external-link availability review
- inventory and risk classification of all 189 legacy blog URLs
- isolated staging deployment and deployed browser/header verification
- upload exclusions for the unfinished agreement and local audit artifacts
- history-preserving local feature branch connected to the existing public `PerpetualRoyalty/aicoop-website` repository
- existing MIT license retained from the prior repository

## Required production decisions

These are ownership decisions rather than code defects. Do not attach `aicoopai.com` until all are confirmed:

1. **Production operator:** provide the exact legal or individual operator name and a mailing or registered contact appropriate for the Privacy and Terms pages.
2. **Legal approval:** have qualified counsel approve the operator, limitation-of-liability, governing-law, and dispute language. The public draft intentionally does not invent those provisions.
3. **Rollback:** export or otherwise preserve the current Durable site and confirm who can restore it. Record the last known-good live state before changing DNS or aliases.
4. **Cutover authority:** confirm the person authorized to change the live domain and whether DNS, Cloudflare, or Durable settings must be removed or retained.
5. **GitHub authentication:** refresh the invalid `PerpetualRoyalty` GitHub CLI credential so `agent/trust-first-rebuild` can be pushed and opened as a draft pull request against the existing public repository.

## Safe cutover sequence

1. Insert the confirmed operator and counsel-approved language, then rerun `npm run check` and the browser checks.
2. Push `agent/trust-first-rebuild` to `PerpetualRoyalty/aicoop-website` and review the draft pull request before merging to `main`.
3. Capture the current Durable rollback reference and live DNS/alias state.
4. Attach `aicoopai.com` and `www.aicoopai.com` to the verified Vercel project without changing the build artifact.
5. Confirm HTTPS, apex and `www` canonicalization, security headers, every canonical route, 404, sitemap, social image, favicon, Calendly, and Google Form on the real domain.
6. Confirm `http://aicoopai.com/` redirects to HTTPS; the existing Durable site currently returns HTTP 200 and does not meet this gate.
7. Submit `https://aicoopai.com/sitemap.xml` in Google Search Console and monitor coverage, removed blog URLs, and crawl errors.
8. Roll back immediately if any critical route, security, scheduling, or canonical-domain gate fails.

## Legacy URL policy

The release intentionally does not republish or mass-redirect unsupported material. The inventory classifies 58 URLs for possible consolidation, 54 platform-claim URLs for substantiation, 40 local-claim URLs for verification, 25 outcome/testimonial URLs for removal unless proven, and 12 event URLs for current-status verification. Until an item passes its evidence gate, the honest launch behavior is removal rather than redirecting a misleading claim to an unrelated page.
