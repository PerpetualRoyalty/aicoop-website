import { renderCard, renderLink, renderNotice } from '../render/components.js';

const connectButton = '<a class="button" href="/connect/">Start a conversation</a>';
const secondaryCommunityButton = '<a class="button button-secondary" href="/community/">See how to participate</a>';

function section({ className = '', eyebrow = '', title, introduction = '', content }) {
  return `<section class="section ${className}">
    <div class="shell">
      <div class="section-head">
        <div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2>${title}</h2></div>
        ${introduction ? `<p>${introduction}</p>` : ''}
      </div>
      ${content}
    </div>
  </section>`;
}

const home = {
  path: '/',
  title: 'AiCoOpAI — Practical AI collaboration in Florida',
  description: 'Meet people exploring responsible artificial intelligence in Florida, find practical resources, and start focused collaborations through AiCoOpAI.',
  eyebrow: 'Florida · people · practical AI',
  heading: 'Build useful AI relationships—not more noise.',
  lede: 'AiCoOpAI helps founders, developers, researchers, educators, civic leaders, and community partners find the right conversation, resource, or next collaborator.',
  schemaType: 'WebPage',
  body: `
    <section class="hero-actions shell" aria-label="Get started">
      <div class="cta-row">${connectButton}${secondaryCommunityButton}</div>
      <div class="signal-board" aria-label="AiCoOpAI focus areas">
        <span>Responsible experimentation</span><span>Florida connections</span><span>Practical resources</span><span>Clear next steps</span>
      </div>
    </section>
    ${section({
      className: 'section-dark',
      eyebrow: 'Start where you are',
      title: 'Three useful ways in',
      introduction: 'No vague membership promise. Choose the kind of help you need today, and we will make the next step explicit.',
      content: `<div class="grid grid-3">
        ${renderCard({ eyebrow: '01 · Connect', title: 'Meet a relevant person', body: 'Bring a focused question, project, or capability. Start with a short conversation to see whether an introduction makes sense.', href: '/connect/', label: 'Request a conversation', className: 'card-dark' })}
        ${renderCard({ eyebrow: '02 · Explore', title: 'Use a current resource', body: 'Try the AiCoOpAI assistants, listen to the introductory podcast, or explore the related Good Combinator ecosystem.', href: '/resources/', label: 'Browse resources', className: 'card-dark' })}
        ${renderCard({ eyebrow: '03 · Contribute', title: 'Bring something useful', body: 'Share a Florida opportunity, event, lesson, tool, or collaboration idea that can be reviewed before it is published.', href: '/community/', label: 'See participation paths', className: 'card-dark' })}
      </div>`,
    })}
    ${section({
      className: 'section-lime',
      eyebrow: 'A simple operating model',
      title: 'From broad interest to a useful next step',
      content: `<ol class="number-list">
        <li><div><strong>Name the real question.</strong><p>What are you trying to build, learn, improve, fund, teach, or connect?</p></div></li>
        <li><div><strong>Choose the smallest useful interaction.</strong><p>A resource, introduction, working session, or honest “not a fit” is better than an open-ended promise.</p></div></li>
        <li><div><strong>Document only what can be supported.</strong><p>Projects, outcomes, and stories become public only with evidence and permission.</p></div></li>
      </ol>`,
    })}
    ${section({
      className: 'section-sky',
      eyebrow: 'Use what exists now',
      title: 'A practical starting kit',
      introduction: 'These public resources are available today. Third-party account requirements are labeled before you leave this site.',
      content: `<div class="grid grid-3">
        ${renderCard({ eyebrow: 'Assistant', title: 'AiCoOpAI Assistant', body: 'Use a focused ChatGPT experience to explore collaboration questions and practical next steps.', href: 'https://chatgpt.com/g/g-Jyg0q8yEy-aicoop-assistant', label: 'Open in ChatGPT', external: true })}
        ${renderCard({ eyebrow: 'Audio', title: 'Introduction to AiCoOpAI', body: 'Hear the origin and intended role of the project before deciding whether to connect.', href: 'https://podcasters.spotify.com/pod/show/doug-liles/episodes/Podcast-Intro-to-AICoOpAi-com-e2p2kl7/a-abiah5i', label: 'Listen on Spotify', external: true })}
        ${renderCard({ eyebrow: 'Ecosystem', title: 'Good Combinator', body: 'Explore adjacent projects and tools in the broader ecosystem. This is an external destination.', href: 'https://goodcombinator.ai/', label: 'Visit Good Combinator', external: true })}
      </div>`,
    })}
    ${section({
      eyebrow: 'Trust before scale',
      title: 'What you should expect from us',
      content: `<div class="grid grid-2">
        ${renderNotice({ label: 'Evidence', title: 'Claims should be checkable.', body: 'Case studies, testimonials, partnerships, events, and outcomes require a named source, permission, and supporting evidence.' })}
        ${renderNotice({ label: 'Clarity', title: 'The site describes current reality.', body: 'AiCoOpAI is a connection and resource hub at this stage. It does not represent unavailable member software as a live service.' })}
        ${renderNotice({ label: 'Respect', title: 'Introductions are permission-based.', body: 'A request does not guarantee a match. Relevant context is shared only with the people needed to evaluate the introduction.' })}
        ${renderNotice({ label: 'Correction', title: 'Published errors should be fixed.', body: 'The editorial policy explains sourcing, AI assistance, corrections, disclosures, and content removal.' })}
      </div><div class="cta-row">${connectButton}<a class="text-link" href="/editorial-policy/">Read the editorial policy</a></div>`,
    })}
  `,
};

const community = {
  path: '/community/',
  title: 'Community paths for practical AI collaboration',
  description: 'See who AiCoOpAI is for, how participation works today, and the principles used to make focused introductions and share useful Florida AI resources.',
  eyebrow: 'Community without the theater',
  heading: 'Bring a real question, capability, or opportunity.',
  lede: 'AiCoOpAI is for people who want a useful next interaction—not another profile to maintain or an unmoderated feed to watch.',
  schemaType: 'WebPage',
  body: `
    ${section({
      className: 'section-dark',
      eyebrow: 'Participation paths',
      title: 'Find your starting point',
      content: `<div class="grid grid-3">
        ${renderCard({ eyebrow: 'Founders & teams', title: 'Pressure-test a practical need', body: 'Describe the customer, workflow, constraint, and decision you are facing. Ask for a resource, perspective, or relevant introduction.', href: '/connect/', label: 'Bring a focused question', className: 'card-dark' })}
        ${renderCard({ eyebrow: 'Builders & researchers', title: 'Share a capability with context', body: 'Explain what you can help with, what evidence supports it, and what kind of collaboration would be appropriate.', href: '/connect/', label: 'Introduce your work', className: 'card-dark' })}
        ${renderCard({ eyebrow: 'Educators & civic partners', title: 'Surface a Florida opportunity', body: 'Share a program, event, challenge, or learning need that could benefit from responsible technical collaboration.', href: '/connect/', label: 'Share an opportunity', className: 'card-dark' })}
      </div>`,
    })}
    ${section({
      className: 'section-lime',
      eyebrow: 'Available today',
      title: 'A human-scale connection layer',
      introduction: 'The current experience is intentionally small: public resources, scheduled conversations, and permission-based introductions.',
      content: `<div class="grid grid-2">
        ${renderNotice({ label: 'Current', title: 'Focused conversations', body: 'Use the Connect page to schedule a short conversation or submit context through the alternative form.' })}
        ${renderNotice({ label: 'Current', title: 'Curated public resources', body: 'Use the Resources page for assistants, audio, and clearly labeled ecosystem links.' })}
        ${renderNotice({ label: 'Current', title: 'Reviewed contributions', body: 'Suggest a useful resource or opportunity. Publication depends on factual review, relevance, and permission.' })}
        ${renderNotice({ label: 'Not offered', title: 'No public member software yet', body: 'Accounts, uploads, private messaging, forums, and searchable profiles are not presented as available services.' })}
      </div>`,
    })}
    ${section({
      eyebrow: 'Working principles',
      title: 'Useful, specific, and permission-based',
      content: `<ol class="number-list">
        <li><div><strong>Lead with context.</strong><p>Share enough of the problem to determine relevance without exposing confidential information.</p></div></li>
        <li><div><strong>Ask before connecting.</strong><p>Introductions happen only when the people involved understand the reason and agree to receive them.</p></div></li>
        <li><div><strong>Separate evidence from aspiration.</strong><p>Describe pilots, partnerships, results, and credentials precisely. Future ideas are labeled as future ideas.</p></div></li>
        <li><div><strong>Leave people with a next step.</strong><p>A useful resource, referral, decision, or clear boundary is a successful interaction.</p></div></li>
      </ol><div class="cta-row">${connectButton}<a class="button button-secondary" href="/resources/">Explore resources first</a></div>`,
    })}
  `,
};

const resources = {
  path: '/resources/',
  title: 'Current AiCoOpAI resources and ecosystem links',
  description: 'Use the public AiCoOpAI assistants, introductory podcast, and clearly labeled Good Combinator ecosystem links available today.',
  eyebrow: 'Available now',
  heading: 'Start with a resource that already exists.',
  lede: 'Each destination below is public, specific, and labeled when it is operated by a third party. ChatGPT assistants require a ChatGPT account.',
  schemaType: 'CollectionPage',
  body: `
    ${section({
      className: 'section-sky',
      eyebrow: 'AiCoOpAI tools',
      title: 'Use an assistant to sharpen the question',
      content: `<div class="grid grid-2">
        ${renderCard({ eyebrow: 'Third-party · ChatGPT', title: 'AiCoOpAI Assistant', body: 'Explore practical collaboration questions, potential next steps, and ways to describe a project more clearly.', href: 'https://chatgpt.com/g/g-Jyg0q8yEy-aicoop-assistant', label: 'Open the assistant', external: true })}
        ${renderCard({ eyebrow: 'Third-party · ChatGPT', title: 'AI Coop × Good Combinator', body: 'Explore AI and blockchain questions involving intellectual property, revenue sharing, and collaboration models.', href: 'https://chatgpt.com/g/g-o4iy3gpIL-ai-coop-goodcombinator', label: 'Open the ecosystem GPT', external: true })}
      </div>
      ${renderNotice({ label: 'Account', title: 'These assistants run on ChatGPT.', body: 'A ChatGPT account may be required. OpenAI operates the service; review its terms and privacy information before sharing any sensitive material.' })}`,
    })}
    ${section({
      className: 'section-dark',
      eyebrow: 'Listen first',
      title: 'Introduction to AiCoOpAI',
      introduction: 'The introductory episode explains the project’s intended role and is hosted by Spotify, a third-party service.',
      content: `<div class="media-panel">
        <div><p class="card-eyebrow">Podcast · 11 minutes</p><h3>Start with the origin story</h3><p>Listen before scheduling if you want context on the project and its relationship to the broader AI-for-good work.</p></div>
        ${renderLink({ href: 'https://podcasters.spotify.com/pod/show/doug-liles/episodes/Podcast-Intro-to-AICoOpAi-com-e2p2kl7/a-abiah5i', label: 'Listen on Spotify', external: true, className: 'button' })}
      </div>`,
    })}
    ${section({
      eyebrow: 'Related ecosystem',
      title: 'Explore adjacent projects',
      introduction: 'Good Combinator operates these external directories. AiCoOpAI does not control their content or availability.',
      content: `<div class="grid grid-2">
        ${renderCard({ eyebrow: 'Third-party · Good Combinator', title: 'Ecosystem directory', body: 'Browse related AI projects, tools, learning resources, and community initiatives across the ecosystem.', href: 'https://goodcombinator.ai/', label: 'Visit Good Combinator', external: true })}
        ${renderCard({ eyebrow: 'Third-party · Good Combinator', title: 'ChatGPT store', body: 'Browse custom GPT experiences assembled across the Good Combinator ecosystem.', href: 'https://goodcombinator.ai/chatgptstore', label: 'Visit the GPT store', external: true })}
      </div><div class="cta-row">${connectButton}</div>`,
    })}
  `,
};

const events = {
  path: '/events/',
  title: 'AiCoOpAI events and working sessions',
  description: 'Check the current AiCoOpAI event status, propose a focused Florida AI working session, or start with the on-demand introductory podcast.',
  eyebrow: 'Events with a reason',
  heading: 'Gather around a concrete question.',
  lede: 'Useful sessions have a defined audience, a real problem, a responsible facilitator, and a clear outcome. They are announced only after those details are confirmed.',
  schemaType: 'WebPage',
  body: `
    ${section({
      className: 'section-lime',
      eyebrow: 'Current status',
      title: 'No public event is currently scheduled.',
      introduction: 'When a date, venue, host, accessibility plan, and participation details are confirmed, they will appear here with a verifiable registration destination.',
      content: `<div class="cta-row">${connectButton}<a class="button button-secondary" href="/resources/">Use on-demand resources</a></div>`,
    })}
    ${section({
      className: 'section-dark',
      eyebrow: 'Propose a session',
      title: 'A good event brief answers five questions',
      content: `<ol class="number-list">
        <li><div><strong>Who needs to be in the room?</strong><p>Name the people, roles, or communities affected by the question.</p></div></li>
        <li><div><strong>What decision or output matters?</strong><p>Define what participants should understand, decide, design, or carry forward.</p></div></li>
        <li><div><strong>What evidence should guide the discussion?</strong><p>Bring sources, user context, technical constraints, and a way to separate fact from assumption.</p></div></li>
        <li><div><strong>How will participation stay responsible?</strong><p>Plan consent, accessibility, privacy, facilitation, and the handling of sensitive information.</p></div></li>
        <li><div><strong>What happens after the meeting?</strong><p>Assign an owner for notes, decisions, follow-up, and any public claims.</p></div></li>
      </ol><div class="cta-row">${connectButton}</div>`,
    })}
  `,
};

const about = {
  path: '/about/',
  title: 'About AiCoOpAI and its current operating model',
  description: 'Learn why AiCoOpAI exists, who it is intended to help in Florida, how it relates to Good Combinator, and what stage the project is in today.',
  eyebrow: 'Clear about the stage',
  heading: 'A connection layer for practical AI work.',
  lede: 'AiCoOpAI exists to help people move from broad interest in artificial intelligence to a useful conversation, resource, or responsible collaboration.',
  schemaType: 'AboutPage',
  body: `
    ${section({
      className: 'section-dark',
      eyebrow: 'Why it exists',
      title: 'AI work improves when the right context meets the right people',
      introduction: 'The project focuses on Florida and begins from Walton County, while welcoming relevant ideas and collaborators from elsewhere.',
      content: `<div class="grid grid-2">
        ${renderCard({ eyebrow: 'Need', title: 'Too many broad promises', body: 'AI communities often describe scale, access, and outcomes before the underlying programs exist. AiCoOpAI’s public site is designed to describe current reality.', className: 'card-dark' })}
        ${renderCard({ eyebrow: 'Response', title: 'Smaller, useful interactions', body: 'A relevant resource, a permission-based introduction, or a clearly scoped session can create more value than an unmoderated platform.', className: 'card-dark' })}
      </div>`,
    })}
    ${section({
      className: 'section-sky',
      eyebrow: 'Current model',
      title: 'A public hub—not member software',
      content: `<div class="grid grid-2">
        ${renderNotice({ label: 'Available', title: 'Resources and conversations', body: 'The site offers curated public links, a scheduling route, an alternative context form, and a framework for reviewing contributions.' })}
        ${renderNotice({ label: 'Future decision', title: 'Software only when operations justify it', body: 'Profiles, messaging, uploads, forums, and member workflows would require product validation, moderation, privacy, security, and support plans.' })}
      </div>`,
    })}
    ${section({
      eyebrow: 'Ecosystem relationship',
      title: 'Connected to Good Combinator, distinct in purpose',
      introduction: 'Good Combinator provides a broader ecosystem of AI projects and directories. AiCoOpAI focuses on practical collaboration and resource discovery. External Good Combinator destinations are labeled as such.',
      content: `<div class="cta-row">${connectButton}${renderLink({ href: 'https://goodcombinator.ai/', label: 'Explore Good Combinator', external: true, className: 'button button-secondary' })}</div>`,
    })}
  `,
};

const connect = {
  path: '/connect/',
  title: 'Connect with AiCoOpAI',
  description: 'Schedule a short AiCoOpAI conversation or use the alternative Google Form to share a focused Florida AI question, capability, resource, or opportunity.',
  eyebrow: 'A focused first conversation',
  heading: 'Tell us what useful next step you need.',
  lede: 'Choose a short scheduling conversation when the question is ready, or use the alternative form when you want to provide context first.',
  schemaType: 'ContactPage',
  body: `
    ${section({
      className: 'section-lime',
      eyebrow: 'Before you schedule',
      title: 'Bring enough context to evaluate fit',
      content: `<div class="grid grid-3">
        ${renderCard({ eyebrow: 'Question', title: 'What are you trying to do?', body: 'Name the decision, workflow, audience, problem, or opportunity in one or two clear sentences.' })}
        ${renderCard({ eyebrow: 'Constraint', title: 'What makes it difficult?', body: 'Share the timeline, evidence, technical limit, policy issue, or missing relationship that matters most.' })}
        ${renderCard({ eyebrow: 'Next step', title: 'What would help now?', body: 'Ask for a resource, perspective, introduction, or working session rather than an open-ended promise.' })}
      </div>`,
    })}
    ${section({
      eyebrow: 'Schedule',
      title: 'Choose a 15-minute time',
      introduction: 'Calendly operates the scheduling interface below and applies its own privacy practices. Do not place confidential information in the booking form.',
      content: `<div class="embed-shell"><div class="embed-fallback"><p><strong>Scheduler not appearing?</strong> Use the direct Calendly page instead.</p>${renderLink({ href: 'https://calendly.com/aicoopai/15min', label: 'Open Calendly directly', external: true, className: 'text-link' })}</div><iframe title="Select a date and time with AiCoOpAI" src="https://calendly.com/aicoopai/15min?embed_domain=aicoopai.com&amp;embed_type=Inline" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      <div class="alternative-contact"><div><p class="card-eyebrow">Prefer to write first?</p><h3>Use the alternative context form</h3><p>The Google Form is a third-party destination. Share only the information needed to evaluate the request.</p></div>${renderLink({ href: 'https://docs.google.com/forms/d/e/1FAIpQLSe-ge34nFiJhSwoFIyAALL7Eqh51sbX33yPirT7BZOJVAFeDA/viewform?usp=sf_link', label: 'Open the Google Form', external: true, className: 'button button-secondary' })}</div>`,
    })}
    ${section({
      className: 'section-dark',
      eyebrow: 'What happens next',
      title: 'A conversation is an evaluation, not a promise',
      content: `<ol class="number-list">
        <li><div><strong>Confirm the question.</strong><p>Use the first minutes to make sure the request and desired outcome are understood.</p></div></li>
        <li><div><strong>Identify the smallest useful response.</strong><p>That may be a resource, a follow-up, a permission-based introduction, or a clear boundary.</p></div></li>
        <li><div><strong>Agree on what can be shared.</strong><p>No project, quote, testimonial, partnership, or outcome becomes public without evidence and permission.</p></div></li>
      </ol><div class="cta-row"><a class="button" href="/privacy/">Review privacy practices</a></div>`,
    })}
  `,
};

const privacy = {
  path: '/privacy/',
  title: 'Privacy practices for aicoopai.com',
  description: 'Understand what information the replacement AiCoOpAI website handles, which third-party services are linked or embedded, and how to ask a privacy question.',
  eyebrow: 'Effective July 18, 2026',
  heading: 'Privacy should be understandable.',
  lede: 'This notice explains how the AiCoOpAI website handles information, which third-party services it uses, and the choices available to visitors.',
  schemaType: 'WebPage',
  body: `
    <section class="section"><div class="shell prose">
      <h2>Who operates this site</h2>
      <p>AiCoOpAI is operated by Good Samaritan Institute, Inc., a Florida not-for-profit corporation. Its contact address is 900 North County Highway 393, Santa Rosa Beach, Florida 32459. Use the <a href="/connect/">Connect page</a> for privacy questions or requests.</p>

      <h2>Information handled by the website</h2>
      <p>The static pages do not provide member accounts, uploads, private messaging, or a first-party contact database. Hosting infrastructure may process routine request information such as IP address, device and browser details, requested page, referring page, timestamps, and security events. This information is used to deliver the site, prevent abuse, investigate errors, and maintain security.</p>

      <h2>Third-party services</h2>
      <p>The site links to or embeds services operated by other organizations. Their terms and privacy practices apply when you use them:</p>
      <ul>
        <li><strong>Calendly</strong> provides the scheduling interface on the Connect page.</li>
        <li><strong>Google Forms</strong> provides the alternative context form.</li>
        <li><strong>Spotify</strong> hosts the introductory podcast.</li>
        <li><strong>OpenAI</strong> operates ChatGPT and the linked custom assistants.</li>
        <li><strong>Good Combinator</strong> operates the external marketplace and GPT directory.</li>
        <li><strong>Vercel</strong> provides hosting, delivery, security, and routine request logging for the replacement deployment.</li>
      </ul>
      <p>Do not send confidential, regulated, or sensitive personal information through a third-party form, scheduler, assistant, or link unless you have separately determined that the service is appropriate.</p>

      <h2>Cookies and local storage</h2>
      <p>The replacement pages do not set advertising cookies or store a local member profile. Third-party embeds and destinations may use cookies, local storage, or similar technologies under their own policies. If privacy-preserving analytics are added later, this notice and any required consent interface will be updated before collection begins.</p>

      <h2>Use, sharing, and retention</h2>
      <p>Information submitted through Calendly or Google Forms is used to evaluate and respond to the request, coordinate a conversation, maintain necessary operational records, and prevent misuse. It should be shared only with people needed to evaluate or complete the requested interaction. Retention should be limited to the period needed for those purposes, applicable recordkeeping, security, dispute handling, or legal obligations.</p>

      <h2>Security</h2>
      <p>Reasonable technical and organizational security practices should be used, but no website or third-party service can guarantee absolute security. The replacement site minimizes risk by avoiding first-party accounts, passwords, uploads, and public user submissions.</p>

      <h2>Your choices</h2>
      <p>You may browse the core pages without submitting a form. You may decline third-party embeds, open links directly, manage browser storage, or ask about access, correction, or deletion of information submitted for an AiCoOpAI interaction. Requests may require reasonable identity verification and may be limited by legal or operational recordkeeping requirements.</p>

      <h2>Children</h2>
      <p>The site is intended for adults and professional or community collaboration. It is not designed to collect personal information from children. Do not submit information about a child through the site or linked services.</p>

      <h2>Changes and questions</h2>
      <p>Material changes will be reflected by a revised effective date and updated explanation. Use the <a href="/connect/">Connect page</a> and identify the request as a privacy question.</p>
    </div></section>
  `,
};

const terms = {
  path: '/terms/',
  title: 'Terms of use for aicoopai.com',
  description: 'Review the baseline terms for using the AiCoOpAI informational website, external resources, scheduling links, and public collaboration materials.',
  eyebrow: 'Effective July 18, 2026',
  heading: 'Use the site thoughtfully.',
  lede: 'These terms govern use of aicoopai.com and the information, links, and ways to request a conversation provided through the site.',
  schemaType: 'WebPage',
  body: `
    <section class="section"><div class="shell prose">
      <h2>Operator and acceptance</h2>
      <p>aicoopai.com is operated by Good Samaritan Institute, Inc., 900 North County Highway 393, Santa Rosa Beach, Florida 32459. By accessing or using this site, you agree to these Terms. If you do not agree, do not use the site.</p>

      <h2>Informational purpose</h2>
      <p>AiCoOpAI provides general information, curated links, and ways to request a conversation. Site content is not legal, financial, investment, medical, engineering, employment, tax, or other professional advice. Obtain advice from an appropriately qualified professional for decisions that require it.</p>

      <h2>No membership or guaranteed result</h2>
      <p>Using the site, submitting context, or scheduling a conversation does not create membership, employment, partnership, agency, fiduciary duty, investment relationship, or a promise of an introduction, project, funding, compensation, or outcome.</p>

      <h2>External services</h2>
      <p>Calendly, Google Forms, Spotify, OpenAI, Good Combinator, and other linked destinations are operated by third parties. Their availability, content, security, accessibility, terms, and privacy practices are outside this site’s control. A link does not imply endorsement of every statement, product, or service at the destination.</p>

      <h2>Acceptable use</h2>
      <p>Do not misuse the site to break the law, harm another person, impersonate someone, send malicious code, probe security without authorization, collect personal data improperly, submit deceptive claims, infringe intellectual property, or interfere with service. Do not place confidential or regulated information in public or third-party fields unless you are authorized and the service is suitable.</p>

      <h2>Intellectual property</h2>
      <p>Original site copy, visual design, and branding are protected by applicable intellectual-property rules. Third-party marks and content belong to their respective owners. A public resource may be quoted or linked under applicable law, but the site does not grant rights to reuse logos, private submissions, or third-party material.</p>

      <h2>Submitted material</h2>
      <p>Do not submit material you lack the right to share. Submitting a resource or idea does not transfer ownership and does not guarantee publication. If publication is proposed, permission, attribution, evidence, confidentiality, and any license should be confirmed separately.</p>

      <h2>Availability and warranties</h2>
      <p>The site and its information are provided on an “as available” basis. Reasonable care is taken, but completeness, uninterrupted availability, fitness for a particular purpose, and error-free operation are not guaranteed. Report a factual or technical problem through the <a href="/connect/">Connect page</a>.</p>

      <h2>Limitation of liability</h2>
      <p>You remain responsible for decisions made using site content or external services. To the maximum extent permitted by law, Good Samaritan Institute, Inc. and its directors, officers, employees, volunteers, agents, and affiliates will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, revenue, opportunity, or goodwill, arising from or relating to the site, site content, external services, or any conversation, resource, or introduction resulting from use of the site, even if advised that such damages were possible.</p>
      <p>To the maximum extent permitted by law, their aggregate direct liability for all claims arising from or relating to the site will not exceed the greater of the amount you paid directly to Good Samaritan Institute, Inc. for use of the site during the 12 months before the event giving rise to the claim or $100 USD.</p>
      <p>Nothing in these Terms limits or excludes liability for fraud, willful misconduct, gross negligence, or any liability or right that cannot lawfully be limited or waived. If applicable law does not allow a particular exclusion or limitation, that exclusion or limitation applies only to the maximum extent permitted by that law.</p>

      <h2>Governing law and venue</h2>
      <p>Florida law governs these Terms and any dispute arising from or relating to the site, without regard to conflict-of-law rules. Subject to rights that cannot lawfully be waived, exclusive venue lies in a state court located in Walton County, Florida, or the United States District Court with jurisdiction over Walton County, Florida. Each party consents to the personal jurisdiction of those courts.</p>

      <h2>Informal dispute resolution</h2>
      <p>Before filing a lawsuit, you and Good Samaritan Institute, Inc. must make a good-faith effort to resolve the dispute for 30 days. A written notice must identify the claimant, describe the facts and requested resolution, and be mailed to the operator address above with “Legal Notice” identified on the correspondence.</p>
      <p>This 30-day process does not prevent either side from seeking urgent or injunctive relief or taking action needed to preserve a claim before a statutory or court deadline expires. These Terms do not require arbitration and do not waive class, representative, or jury rights.</p>

      <h2>Changes</h2>
      <p>These Terms may change when the site’s services or operator change. A material revision will receive a new effective date. The Terms published when you use the site apply to that use.</p>
    </div></section>
  `,
};

const accessibility = {
  path: '/accessibility/',
  title: 'Accessibility commitment for aicoopai.com',
  description: 'Read the AiCoOpAI accessibility commitment, the interaction and content standards applied to the replacement website, and how to report a barrier.',
  eyebrow: 'Access is part of usefulness',
  heading: 'A site people can actually use.',
  lede: 'The replacement is designed around semantic content, keyboard access, visible focus, readable contrast, responsive layouts, and reduced-motion preferences.',
  schemaType: 'WebPage',
  body: `
    ${section({
      className: 'section-sky',
      eyebrow: 'Design commitments',
      title: 'Built into the shared system',
      content: `<div class="grid grid-2">
        ${renderNotice({ label: 'Structure', title: 'Semantic landmarks and headings', body: 'Pages use a named header, navigation, main region, footer, one H1, and a logical heading sequence.' })}
        ${renderNotice({ label: 'Interaction', title: 'Keyboard-operable navigation', body: 'The menu announces its state, supports Escape, returns focus, and keeps visible focus indicators.' })}
        ${renderNotice({ label: 'Presentation', title: 'Readable, responsive content', body: 'Text, targets, spacing, contrast, and layouts are designed for phones, tablets, zoom, and desktop widths.' })}
        ${renderNotice({ label: 'Preference', title: 'Reduced motion supported', body: 'Nonessential transitions are suppressed when the operating system requests reduced motion.' })}
      </div>`,
    })}
    <section class="section"><div class="shell prose">
      <h2>Testing approach</h2>
      <p>The release process includes automated checks, keyboard navigation, mobile and desktop browser inspection, heading and link review, and checks for named controls and iframe titles. Screen reader testing should be repeated after any major navigation, content, form, or embed change.</p>

      <h2>Third-party limitations</h2>
      <p>Calendly, Google Forms, Spotify, ChatGPT, and Good Combinator are third-party services. AiCoOpAI does not control their accessibility. The site provides context before those destinations and offers more than one way to begin a conversation where practical.</p>

      <h2>Report a barrier</h2>
      <p>Use the <a href="/connect/">Connect page</a> and identify the issue as an accessibility barrier. Include the page, the task you were trying to complete, the assistive technology or browser if relevant, and a way to follow up. Do not include sensitive personal information.</p>

      <h2>Ongoing improvement</h2>
      <p>Accessibility is treated as an operating requirement rather than a one-time score. Confirmed barriers should be prioritized by impact, corrected, verified, and recorded in the release notes.</p>
    </div></section>
  `,
};

const editorial = {
  path: '/editorial-policy/',
  title: 'AiCoOpAI editorial and evidence policy',
  description: 'See how AiCoOpAI reviews sources, AI-assisted drafts, case studies, testimonials, affiliate relationships, corrections, and content removal.',
  eyebrow: 'Evidence before amplification',
  heading: 'Publish what can be supported.',
  lede: 'This policy governs public articles, resource descriptions, case studies, testimonials, project claims, event listings, and corrections on the replacement website.',
  schemaType: 'WebPage',
  body: `
    ${section({
      className: 'section-dark',
      eyebrow: 'Publication standard',
      title: 'Useful, specific, traceable',
      content: `<ol class="number-list">
        <li><div><strong>Start with a real reader need.</strong><p>Every item should help a defined audience understand, decide, act, or connect.</p></div></li>
        <li><div><strong>Prefer a primary source.</strong><p>Use official records, original research, direct participant evidence, or the responsible organization whenever available.</p></div></li>
        <li><div><strong>Separate fact, interpretation, and aspiration.</strong><p>Claims about what exists, what evidence suggests, and what may happen next must not be blended.</p></div></li>
        <li><div><strong>Give the reader a proportionate next step.</strong><p>Calls to action should match the evidence and the service that is actually available.</p></div></li>
      </ol>`,
    })}
    <section class="section"><div class="shell prose">
      <h2>AI-assisted drafting</h2>
      <p>AI-assisted research or drafting may be used, but it is not an authority. A human review is required before publication to confirm facts, sources, names, quotations, dates, links, permissions, risks, and whether the article adds value beyond existing material. AI-generated citations, people, projects, outcomes, events, and quotations must never be assumed accurate.</p>

      <h2>Case studies and project claims</h2>
      <p>A case study must identify the real participant or explain a legitimate confidentiality boundary, describe the starting situation, document AiCoOpAI’s actual role, state the evidence and time period, distinguish measured results from participant opinion, and obtain publication permission. Hypothetical examples must be labeled as hypothetical.</p>

      <h2>Testimonials</h2>
      <p>A testimonial requires an authentic record, the speaker’s identity, permission to publish, an accurate relationship disclosure, and context showing whether the experience is typical or limited. Anonymous first-name testimonials are not used as proof without a documented and defensible reason.</p>

      <h2>Affiliate and financial disclosures</h2>
      <p>An affiliate, referral, sponsorship, ownership, employment, family, investment, or other material relationship must be disclosed clearly near the relevant recommendation. A disclosure cannot be hidden only in a footer or policy page. Earnings language requires substantiation and counsel-approved program terms.</p>

      <h2>Events and local claims</h2>
      <p>An event is published only after the date, venue or access method, host, registration destination, accessibility information, and status are verified. Walton County and Florida claims should identify the relevant source, organization, location, and time period.</p>

      <h2>Corrections</h2>
      <p>Report a correction through the <a href="/connect/">Connect page</a>. Confirmed material errors should be corrected promptly with an updated date and a note explaining what changed. A broken or outdated item may be revised, redirected, noindexed, removed, or returned as gone depending on reader value and the availability of a better destination.</p>

      <h2>Legacy content review</h2>
      <p>Legacy blog URLs are reviewed individually for substantiation, event verification, local verification, consolidation, or removal. They are not automatically redirected to the homepage, and unsupported content is not republished merely to preserve URL count.</p>
    </div></section>
  `,
};

export const pages = [home, community, resources, events, about, connect, privacy, terms, accessibility, editorial];
