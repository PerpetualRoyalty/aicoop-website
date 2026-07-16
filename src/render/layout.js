import { renderFooter, renderHeader } from './components.js';
import { escapeHtml } from './escape.js';

function renderStructuredData(page, config) {
  const data = {
    '@context': 'https://schema.org',
    '@type': page.schemaType || 'WebPage',
    name: page.title,
    description: page.description,
    url: `${config.origin}${page.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: config.brand,
      url: `${config.origin}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: config.brand,
      url: `${config.origin}/`,
    },
  };
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export function renderPage(page, config) {
  const canonical = `${config.origin}${page.path}`;
  const fullTitle = page.path === '/' ? page.title : `${page.title} | ${config.brand}`;
  const bodyClass = `page-${page.path === '/' ? 'home' : page.path.split('/').filter(Boolean)[0]}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="theme-color" content="#101612">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="manifest" href="/site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${config.brand}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${config.origin}/social-card.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${config.origin}/social-card.png">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${renderStructuredData(page, config)}</script>
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main-content">Skip to content</a>
  ${renderHeader(page.path)}
  <main id="main-content">
    <section class="page-intro shell">
      ${page.eyebrow ? `<p class="eyebrow">${escapeHtml(page.eyebrow)}</p>` : ''}
      <h1>${escapeHtml(page.heading)}</h1>
      ${page.lede ? `<p class="lede">${escapeHtml(page.lede)}</p>` : ''}
    </section>
    ${page.body}
  </main>
  ${renderFooter()}
  <script src="/app.js" defer></script>
</body>
</html>`;
}
