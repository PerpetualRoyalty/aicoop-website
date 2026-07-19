import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const categories = Object.freeze({
  REMOVE_UNLESS_PROVEN: Object.freeze({
    category: 'REMOVE_UNLESS_PROVEN',
    risk: 'critical',
    proposed_action: 'Remove or retain only after substantiation and permission review',
    evidence_required: 'Named participant; authentic record; measured outcome; AiCoOpAI role; publication consent',
    redirect_target: '',
  }),
  VERIFY_EVENT: Object.freeze({
    category: 'VERIFY_EVENT',
    risk: 'high',
    proposed_action: 'Verify the event details and usefulness or remove the page',
    evidence_required: 'Official organizer; date; venue or access method; registration URL; status; accessibility details',
    redirect_target: '/events/',
  }),
  VERIFY_LOCAL: Object.freeze({
    category: 'VERIFY_LOCAL',
    risk: 'high',
    proposed_action: 'Verify local claims and sources or consolidate into an evidence-based Florida guide',
    evidence_required: 'Primary local source; organization; location; time period; link; permission when people are identified',
    redirect_target: '/resources/',
  }),
  SUBSTANTIATE: Object.freeze({
    category: 'SUBSTANTIATE',
    risk: 'high',
    proposed_action: 'Substantiate current AiCoOpAI claims or rewrite as an explicitly aspirational concept',
    evidence_required: 'Current public feature; responsible owner; date; supporting link; outcome evidence where claimed',
    redirect_target: '/about/',
  }),
  CONSOLIDATE: Object.freeze({
    category: 'CONSOLIDATE',
    risk: 'medium',
    proposed_action: 'Merge useful material into a sourced evergreen resource and redirect after review',
    evidence_required: 'Reader need; current sources; differentiated guidance; factual review; canonical destination',
    redirect_target: '/resources/',
  }),
});

const criticalPattern = /case-study|success-stor|game-changer|transform(?:ed|ing)|our-members|member-success|empowers-tech|revolutioniz|leading-the-charge|thriving-on/;
const eventPattern = /conference|bootcamp|event|workshop|seminar|meetup|hackathon/;
const localPattern = /walton-county|in-florida|florida-|local-tech|local-entrepreneur|northwest-florida/;
const platformPattern = /aicoop-ai|aicoopai-com|aicoopai\.com|joining-aicoop|on-aicoop|aicoop-s/;

export function classifyLegacyUrl(url) {
  const slug = new URL(url).pathname.toLowerCase();
  if (criticalPattern.test(slug)) return { ...categories.REMOVE_UNLESS_PROVEN };
  if (eventPattern.test(slug)) return { ...categories.VERIFY_EVENT };
  if (localPattern.test(slug)) return { ...categories.VERIFY_LOCAL };
  if (platformPattern.test(slug)) return { ...categories.SUBSTANTIATE };
  return { ...categories.CONSOLIDATE };
}

export function titleFromUrl(url) {
  const slug = new URL(url).pathname.split('/').filter(Boolean).at(-1) ?? '';
  return slug
    .replaceAll('--', ': ')
    .replaceAll('-', ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function extractBlogUrls(xml) {
  return [...xml.matchAll(/<loc>(https:\/\/aicoopai\.com\/blog\/[^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url, index, all) => all.indexOf(url) === index);
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function inventoryCsv(urls) {
  const header = 'url,title,category,risk,proposed_action,evidence_required,redirect_target';
  const rows = urls.sort().map((url) => {
    const classification = classifyLegacyUrl(url);
    return [
      url,
      titleFromUrl(url),
      classification.category,
      classification.risk,
      classification.proposed_action,
      classification.evidence_required,
      classification.redirect_target,
    ].map(csvCell).join(',');
  });
  return `${header}\n${rows.join('\n')}\n`;
}

async function run() {
  const inputIndex = process.argv.indexOf('--input');
  const outputIndex = process.argv.indexOf('--output');
  const inputPath = inputIndex >= 0 ? process.argv[inputIndex + 1] : '';
  const outputPath = outputIndex >= 0
    ? process.argv[outputIndex + 1]
    : path.join(projectRoot, 'content-audit', 'legacy-blog-inventory.csv');

  const xml = inputPath
    ? await readFile(path.resolve(inputPath), 'utf8')
    : await fetch('https://aicoopai.com/sitemap').then((response) => {
      if (!response.ok) throw new Error(`Sitemap request failed with ${response.status}`);
      return response.text();
    });
  const urls = extractBlogUrls(xml);
  if (urls.length === 0) throw new Error('No legacy blog URLs were found in the sitemap');
  await writeFile(path.resolve(outputPath), inventoryCsv(urls), 'utf8');
  console.log(`Inventoried ${urls.length} legacy blog URLs in ${path.resolve(outputPath)}`);
}

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  await run();
}
