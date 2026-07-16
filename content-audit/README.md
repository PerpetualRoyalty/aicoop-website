# Legacy blog content review

The committed inventory covers every `/blog/` URL present in the live AiCoOpAI sitemap on July 16, 2026. Automated classification creates a review queue; it is not proof that an article is accurate or that a redirect is appropriate.

## Categories

- `REMOVE_UNLESS_PROVEN` — case studies, success claims, transformation claims, or member outcomes that require named evidence and publication permission.
- `VERIFY_EVENT` — conferences, bootcamps, workshops, and other time-specific claims requiring an official organizer, date, access details, status, and registration source.
- `VERIFY_LOCAL` — Florida, Walton County, and other local claims requiring a primary local source and time period.
- `SUBSTANTIATE` — claims about AiCoOpAI features, differentiation, support, or impact requiring current public evidence.
- `CONSOLIDATE` — generic guidance that may be merged into a smaller set of sourced evergreen resources.

## Approval workflow

1. Open the current page and record its factual claims and sources.
2. Confirm whether the reader need is distinct from the retained resource set.
3. Gather the evidence named in the CSV and obtain permission where people or organizations are identified.
4. Approve one action: retain and rewrite, merge and redirect, remove with a 410 response, or noindex temporarily during evidence review.
5. Add a redirect only when the destination answers substantially the same reader need. Do not redirect every retired page to the homepage.
6. Rebuild the sitemap and test every approved redirect before production cutover.

Regenerate the inventory from a downloaded sitemap with:

```bash
node scripts/audit-legacy-content.mjs --input /path/to/sitemap.xml
```
