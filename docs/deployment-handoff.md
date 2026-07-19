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
- history-preserving feature branch pushed to the existing public `PerpetualRoyalty/aicoop-website` repository
- cleanly mergeable draft pull request #1 targeting `main`
- existing MIT license retained from the prior repository
- ignored 197-response Durable public baseline plus a verified SHA-256 archive in `rollback/`
- authenticated read-only access confirmed for the AiCoOpAI Durable workspace and its connected `aicoopai.com` domain
- authenticated read-only access confirmed for the authoritative Namecheap DNS controls
- current Namecheap records confirmed before cutover: apex A to `172.66.0.42`, `www` CNAME to `websites.mydurable.com`, apex HTTP redirect to `www`, Google and Durable verification TXT records, and email-forwarding SPF

## Production decision record

The owner-controlled decisions are closed as follows:

1. **Production operator:** Good Samaritan Institute, Inc., 900 North County Highway 393, Santa Rosa Beach, Florida 32459.
2. **Legal language:** Doug Liles approved the court-based Florida design on July 18, 2026. The published language is counsel-ready and must not be labeled attorney approved without actual attorney review.
3. **Platform rollback authority:** Doug Liles confirmed that he owns the Durable restore procedure. The authenticated Durable workspace, 197-response baseline, DNS evidence, and verified archive remain preserved.
4. **Cutover authority:** Doug Liles explicitly authorized the AiCoOpAI production cutover. Scope is limited to the Vercel attachment and necessary Namecheap web-routing records.
5. **DNS preservation:** email forwarding, SPF, Google verification, Durable verification, and unrelated DNS records remain unchanged.
6. **Pull-request approval:** pull request #1 may be marked ready and merged after the updated policy tests and staging verification pass.

## Safe cutover sequence

1. Publish the confirmed operator and owner-approved, counsel-ready language, then rerun `npm run check` and the browser checks.
2. Review and merge draft pull request #1 into `main`.
3. Recheck the verified rollback archive, confirm the Durable native restore procedure, and preserve the current Durable account plus live DNS/alias state.
4. After explicit cutover approval, use the authenticated Namecheap account to attach `aicoopai.com` and `www.aicoopai.com` to the verified Vercel project without changing the build artifact.
5. Confirm HTTPS, apex and `www` canonicalization, security headers, every canonical route, 404, sitemap, social image, favicon, Calendly, and Google Form on the real domain.
6. Confirm `http://aicoopai.com/` redirects to HTTPS; the existing Durable site currently returns HTTP 200 and does not meet this gate.
7. Submit `https://aicoopai.com/sitemap.xml` in Google Search Console and monitor coverage, removed blog URLs, and crawl errors.
8. Roll back immediately if any critical route, security, scheduling, or canonical-domain gate fails.

## Legacy URL policy

The release intentionally does not republish or mass-redirect unsupported material. The inventory classifies 58 URLs for possible consolidation, 54 platform-claim URLs for substantiation, 40 local-claim URLs for verification, 25 outcome/testimonial URLs for removal unless proven, and 12 event URLs for current-status verification. Until an item passes its evidence gate, the honest launch behavior is removal rather than redirecting a misleading claim to an unrelated page.
