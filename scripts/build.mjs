import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { siteConfig } from '../src/config/site.js';
import { pages } from '../src/content/pages.js';
import { renderPage } from '../src/render/layout.js';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(moduleDir, '..');

const outputPathForRoute = (outDir, route) =>
  route === '/' ? path.join(outDir, 'index.html') : path.join(outDir, route.slice(1), 'index.html');

export async function buildSite({ rootDir = defaultRoot, outDir = path.join(rootDir, 'dist') } = {}) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const pagesByPath = new Map(pages.map((page) => [page.path, page]));
  for (const route of siteConfig.routes) {
    const page = pagesByPath.get(route);
    if (!page) throw new Error(`Missing page definition for ${route}`);
    const target = outputPathForRoute(outDir, route);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, renderPage(page, siteConfig), 'utf8');
  }

  await copyFile(path.join(rootDir, 'src', 'assets', 'styles.css'), path.join(outDir, 'styles.css'));
  await copyFile(path.join(rootDir, 'src', 'assets', 'app.js'), path.join(outDir, 'app.js'));
  await copyFile(path.join(rootDir, 'src', 'assets', 'favicon.png'), path.join(outDir, 'favicon.png'));
  await copyFile(path.join(rootDir, 'src', 'assets', 'social-card.png'), path.join(outDir, 'social-card.png'));
  await writeFile(
    path.join(outDir, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${siteConfig.origin}/sitemap.xml\n`,
    'utf8',
  );
  await writeFile(
    path.join(outDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteConfig.routes.map((route) => `<url><loc>${siteConfig.origin}${route}</loc><lastmod>${siteConfig.releaseDate}</lastmod></url>`).join('')}</urlset>\n`,
    'utf8',
  );
  await writeFile(
    path.join(outDir, 'site.webmanifest'),
    JSON.stringify({
      name: siteConfig.brand,
      short_name: siteConfig.brand,
      description: 'Practical AI collaboration in Florida.',
      start_url: '/',
      display: 'standalone',
      theme_color: '#101612',
      background_color: '#f4f2e9',
      icons: [{ src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
    }, null, 2),
    'utf8',
  );
  await writeFile(
    path.join(outDir, '404.html'),
    renderPage({
      path: '/404.html',
      title: 'Page not found',
      description: 'The requested page is not available. Use the AiCoOpAI navigation to continue.',
      eyebrow: '404 · page not found',
      heading: 'That path does not lead anywhere.',
      lede: 'The page may have moved, been retired after review, or never existed.',
      body: '<section class="section"><div class="shell"><div class="cta-row"><a class="button" href="/">Return home</a><a class="button button-secondary" href="/resources/">Explore resources</a></div></div></section>',
      schemaType: 'WebPage',
    }, siteConfig).replace('<meta name="description"', '<meta name="robots" content="noindex">\n  <meta name="description"'),
    'utf8',
  );

  return { outDir, routes: [...siteConfig.routes] };
}

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const result = await buildSite();
  console.log(`Built ${result.routes.length} routes in ${result.outDir}`);
}
