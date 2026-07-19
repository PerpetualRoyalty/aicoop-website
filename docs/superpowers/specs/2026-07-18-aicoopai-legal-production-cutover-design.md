# AiCoOpAI Legal Terms and Production Cutover Design

**Date:** July 18, 2026

**Status:** Approved design; implementation pending written-spec review

**Approved approach:** Court-based Florida terms without mandatory arbitration

## Purpose

Complete the remaining legal-operator and release gates for the trust-first AiCoOpAI website, then replace the current Durable-hosted public site with the already-tested Vercel build.

This design records Doug Liles's statements that:

- Good Samaritan Institute is the legal operator at 900 North County Highway 393, Santa Rosa Beach, Florida 32459.
- Doug Liles owns the Durable restore procedure.
- Doug Liles authorizes the AiCoOpAI production cutover.

Florida corporate records identify the operator's full legal name as **Good Samaritan Institute, Inc.**, an active Florida not-for-profit corporation, document number N03000000031. The website will use that full legal name and the address supplied by Doug Liles.

## Legal-status boundary

The website copy created from this design is a **counsel-ready draft**. It must not be described as "counsel approved," "attorney approved," or equivalent unless a qualified attorney actually reviews and approves the published language. The site will not claim legal compliance or guaranteed enforceability.

## Scope

### Included

- Replace draft operator language on the Privacy page with the confirmed operator and address.
- Replace the placeholder dispute section on the Terms page with the approved limitation-of-liability, Florida governing-law, venue, and informal-dispute language.
- Update the Privacy and Terms effective dates to July 18, 2026.
- Preserve nonwaivable legal and consumer rights.
- Update automated policy tests and deployment documentation.
- Rebuild and verify the site locally and on the isolated Vercel staging project.
- Update, review, and merge the existing GitHub pull request.
- Attach the apex and `www` domains to the verified Vercel project, make the apex domain canonical, update only the necessary Namecheap web-routing records, and verify production.
- Preserve the Durable workspace, verified public snapshot, archive, and unrelated DNS records for rollback.

### Excluded

- Mandatory arbitration.
- Class-action or representative-action waiver.
- Jury-trial waiver.
- New analytics, accounts, payments, submissions, databases, or first-party data collection.
- Reinstatement or redirection of unverified legacy claims and blog content.
- Changes to email forwarding, SPF, Google verification, or unrelated Namecheap records.
- A representation that a lawyer has approved the terms.

## Public operator disclosure

The Privacy and Terms pages will identify the operator as:

> Good Samaritan Institute, Inc.<br>
> 900 North County Highway 393<br>
> Santa Rosa Beach, Florida 32459

The Privacy page will state that the operator runs AiCoOpAI and will direct privacy questions and requests to the existing Connect page. It will remove all prelaunch statements such as "must be confirmed" and "will be reviewed before production cutover."

## Terms design

### Operator and acceptance

The Terms will state that they govern use of `aicoopai.com`, which is operated by Good Samaritan Institute, Inc. Accessing or using the site constitutes agreement to the current published Terms; a person who does not agree should not use the site.

The Terms link will remain available in the site footer on every page. Because the site has no account creation, checkout, or first-party submission flow, this release will not add a click-through checkbox. The published page will remain printable and retainable as an ordinary web document.

### Existing protections retained

The current sections covering informational purpose, absence of guaranteed results or relationship formation, third-party services, acceptable use, intellectual property, submitted material, and availability will remain. They may receive narrow wording edits only when required for consistency with the confirmed operator and final legal sections.

### Limitation of liability

The limitation will use clear, conspicuous language and apply only to the maximum extent permitted by law. It will cover Good Samaritan Institute, Inc. and its directors, officers, employees, volunteers, agents, and affiliates.

It will exclude liability for indirect, incidental, special, consequential, exemplary, or punitive damages and for loss of data, profits, revenue, opportunity, or goodwill arising from or relating to:

- the website;
- website content;
- third-party or external services; and
- conversations, resources, or introductions resulting from use of the site.

The aggregate direct-liability cap for all claims relating to the site will be the greater of:

1. the amount the claimant paid directly to Good Samaritan Institute, Inc. for use of the site during the 12 months preceding the event giving rise to the claim; or
2. USD $100.

The limitation will expressly preserve liability for fraud, willful misconduct, gross negligence, and any liability or right that applicable law does not permit the parties to limit or waive. It will also explain that jurisdiction-specific restrictions apply to the extent required by law.

### Governing law and venue

Florida law will govern the Terms and disputes arising from or relating to the site, without applying conflict-of-law rules.

The exclusive venue will be:

- a state court located in Walton County, Florida; or
- the United States District Court with jurisdiction over Walton County, Florida.

The clause will preserve any nonwaivable right a consumer or other claimant has under applicable law.

### Informal dispute resolution

Before filing a lawsuit, a claimant and the operator must make a good-faith attempt to resolve the dispute for 30 days. A notice must be written, identify the claimant, describe the facts and requested resolution, and be mailed to the operator address with `Legal Notice` identified on the correspondence.

The 30-day requirement will not prevent either side from seeking urgent or injunctive relief or taking action needed to preserve a claim before a statutory or court deadline expires.

The Terms will not require arbitration and will not waive class, representative, or jury rights.

### Changes

The existing changes section will remain. A material revision will receive a new effective date. The current Terms will apply to use occurring after publication, without representing that a newly published term retroactively changes completed conduct.

## Privacy design

The Privacy page will:

- use the confirmed operator name and address;
- retain the existing description of routine hosting data and third-party services;
- retain the site's data-minimization commitments;
- retain the existing choices, security, retention, children, and change-notice sections; and
- remove every sentence describing the notice as a prelaunch intention or unresolved operator draft.

This release does not introduce analytics, advertising cookies, accounts, first-party form storage, or new data processors.

## Testing and review

Implementation will begin by adding failing policy tests for:

- the operator's full legal name;
- the supplied street address;
- the July 18, 2026 effective date;
- limitation-of-liability language and the USD $100 floor;
- the 12-month fee lookback;
- fraud, willful-misconduct, gross-negligence, and nonwaivable-right carveouts;
- Florida governing law;
- Walton County venue;
- the 30-day written-notice process;
- urgent-relief and deadline exceptions;
- the absence of mandatory arbitration; and
- removal of draft placeholders and false counsel-approval claims.

After the tests fail for the expected reasons, the Privacy and Terms content will be updated. The focused policy tests will run first, followed by the complete `npm run check` suite and a production build.

Browser verification will cover desktop and mobile layouts, footer policy links, keyboard access, legal-page headings and text, third-party links, the Connect flow, canonical metadata, the 404 page, and security headers. The Terms must remain readable without horizontal scrolling or clipped content.

## Release sequence

1. Implement and test the approved legal copy locally.
2. Update the deployment handoff so the operator, restore-owner, and cutover-authority gates are recorded as closed while the external counsel-status boundary remains accurate.
3. Deploy the exact tested artifact to the isolated `aicoopai-rebuild` Vercel staging project.
4. Verify staging routes, interactions, canonical metadata, and security headers.
5. Commit and push the scoped changes to `agent/trust-first-rebuild`, update draft pull request #1, review the final diff and checks, mark it ready, and merge it into `main`.
6. Confirm the production Vercel deployment corresponds to the merged Git commit.
7. Add `aicoopai.com` and `www.aicoopai.com` to the verified Vercel project before changing DNS, and read the exact DNS targets Vercel requires rather than assuming generic values.
8. Configure `https://aicoopai.com/` as the canonical production domain and `www.aicoopai.com` as a permanent redirect to the apex domain.
9. In the authenticated Namecheap account, change only the web-routing records required for Vercel. The expected changes are the apex A/ALIAS target, the `www` CNAME, and removal of the conflicting apex URL redirect. Preserve email forwarding, SPF, Google verification, Durable verification, and all unrelated records.
10. Wait for DNS and certificate readiness, then verify the real public domains.
11. Submit the production sitemap to Google Search Console only if authenticated access is available; otherwise record it as the remaining owner action without weakening the release verification.

## Production acceptance gates

The cutover succeeds only if all of the following are verified on the public domain:

- HTTPS is valid for the apex and `www` names.
- HTTP redirects to HTTPS.
- `www` permanently redirects to the apex domain.
- Every canonical route returns the expected page.
- Unknown routes return the intended 404 response.
- Canonical URLs, sitemap URLs, and social metadata use `https://aicoopai.com`.
- Privacy and Terms show the approved operator and legal design with no draft placeholders.
- Security headers match the verified Vercel configuration.
- Styles, scripts, favicon, manifest, and social image load successfully.
- Desktop and mobile navigation work with keyboard and touch interaction.
- Calendly provides both the embed and direct-link fallback.
- The Google Form alternative opens successfully.
- No unsupported legacy claim has been republished or misleadingly redirected.
- The merged Git commit and production deployment are traceable to each other.

## Rollback

The existing Durable workspace will not be deleted or modified during cutover. The verified 197-response public baseline, per-file hashes, and archive remain the rollback evidence.

Before DNS mutation, the current Namecheap web-routing values will be rechecked against the recorded snapshot. If a critical acceptance gate fails and cannot be corrected promptly, rollback will restore the former apex A record, `www` Durable CNAME, and apex URL redirect exactly as recorded. Unrelated DNS and email records will remain untouched throughout.

After restoration, HTTPS, apex/`www` behavior, and representative Durable routes will be verified. The failed release condition and any corrective work will be documented before another cutover attempt.

## References

- [Florida Division of Corporations: Good Samaritan Institute, Inc.](https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults/EntityName/Good%20Samaritan%20Institute%2C%20Inc./Page1)
- [Florida Statutes section 501.204](https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599%2F0501%2FSections%2F0501.204.html)
- [Florida Statutes section 668.50](https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699%2F0668%2FSections%2F0668.50.html)
- [Sanislo v. Give Kids the World, Inc., Supreme Court of Florida](https://supremecourt.flcourts.gov/pre_opinion_content_download/322499)
