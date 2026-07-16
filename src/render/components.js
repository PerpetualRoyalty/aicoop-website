import { escapeHtml } from './escape.js';

const primaryNavigation = Object.freeze([
  { href: '/community/', label: 'Community' },
  { href: '/resources/', label: 'Resources' },
  { href: '/events/', label: 'Events' },
  { href: '/about/', label: 'About' },
]);

export function renderLink({ href, label, external = false, className = '' }) {
  const attributes = [
    `href="${escapeHtml(href)}"`,
    className ? `class="${escapeHtml(className)}"` : '',
    external ? 'target="_blank"' : '',
    external ? 'rel="noopener noreferrer"' : '',
    external ? `aria-label="${escapeHtml(label)} (opens in a new tab)"` : '',
  ].filter(Boolean).join(' ');
  const cue = external ? '<span class="external-cue" aria-hidden="true">↗</span>' : '';
  return `<a ${attributes}>${escapeHtml(label)}${cue}</a>`;
}

function currentAttribute(href, activePath) {
  return href === activePath ? ' aria-current="page"' : '';
}

export function renderBrand() {
  return `<a class="brand" href="/" aria-label="AiCoOpAI home">
    <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="brand-name">AiCoOp<span>AI</span></span>
  </a>`;
}

export function renderHeader(activePath) {
  const links = primaryNavigation.map(({ href, label }) =>
    `<a href="${href}"${currentAttribute(href, activePath)}>${label}</a>`,
  ).join('');

  return `<header class="site-header" data-site-header>
    <div class="shell header-inner">
      ${renderBrand()}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
        <span class="sr-only">Open navigation</span>
        <span class="menu-lines" aria-hidden="true"><i></i><i></i></span>
      </button>
      <nav id="primary-navigation" class="primary-nav" aria-label="Primary">
        <div class="primary-links">${links}</div>
        <a class="button button-small" href="/connect/"${currentAttribute('/connect/', activePath)}>Connect</a>
      </nav>
    </div>
  </header>`;
}

export function renderFooter() {
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        ${renderBrand()}
        <p class="footer-summary">A practical meeting place for people exploring responsible AI collaboration in Florida.</p>
      </div>
      <nav class="footer-nav" aria-label="Explore">
        <strong>Explore</strong>
        <a href="/community/">Community</a>
        <a href="/resources/">Resources</a>
        <a href="/events/">Events</a>
        <a href="/connect/">Connect</a>
      </nav>
      <nav class="footer-nav" aria-label="Policies">
        <strong>Policies</strong>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/accessibility/">Accessibility</a>
        <a href="/editorial-policy/">Editorial policy</a>
      </nav>
    </div>
    <div class="shell footer-base">
      <p>© 2026 AiCoOpAI. Built for useful collaboration.</p>
      <p>Walton County, Florida</p>
    </div>
  </footer>`;
}

export function renderCard({ eyebrow, title, body, href, label, external = false, className = '' }) {
  return `<article class="card ${escapeHtml(className)}">
    ${eyebrow ? `<p class="card-eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
    ${href && label ? renderLink({ href, label, external, className: 'text-link' }) : ''}
  </article>`;
}

export function renderNotice({ label, title, body }) {
  return `<aside class="notice" aria-label="${escapeHtml(label)}">
    <span>${escapeHtml(label)}</span>
    <div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></div>
  </aside>`;
}
