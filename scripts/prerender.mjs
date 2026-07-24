import puppeteer from 'puppeteer';
import http from 'http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
};

// Minimal static server with SPA fallback (mirrors nginx's try_files $uri $uri/ /index.html)
function createServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(distDir, urlPath);

    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
      return;
    }

    const indexPath = path.join(distDir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(indexPath));
  });
}

// Static tags in index.html aren't Helmet-managed, so Helmet's tags land as
// duplicates alongside them. Keep only the last occurrence of each singleton tag.
function dedupeHead() {
  const head = document.head;
  // Helmet prepends its <title> before the static one (opposite of meta/link,
  // which it appends after) — keep the first title, drop the rest.
  const titles = head.querySelectorAll('title');
  for (let i = 1; i < titles.length; i++) titles[i].remove();

  const dedupeByAttr = (selector, attr) => {
    const seen = new Map();
    for (const el of head.querySelectorAll(selector)) {
      const key = el.getAttribute(attr);
      if (!key) continue;
      if (seen.has(key)) seen.get(key).remove();
      seen.set(key, el);
    }
  };
  dedupeByAttr('meta[name]', 'name');
  dedupeByAttr('meta[property]', 'property');
  dedupeByAttr('link[rel="canonical"]', 'rel');
}

const ROUTES = [
  { urlPath: '/', outDir: distDir, waitForHero: true },
  { urlPath: '/aboutme', outDir: path.join(distDir, 'aboutme') },
  { urlPath: '/projects', outDir: path.join(distDir, 'projects') },
  { urlPath: '/contact', outDir: path.join(distDir, 'contact') },
];

async function main() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  // Capture every route into memory first, then write to disk once all routes
  // are rendered — writing mid-crawl let a partially-written route's static
  // file get served back by the fallback server for a route captured after it.
  const captured = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}${route.urlPath}`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.title.includes('|'), { timeout: 15000 });
    if (route.waitForHero) {
      await page.waitForFunction(() => document.body.innerText.includes('Nice to meet you'), { timeout: 15000 });
    }
    await page.evaluate(dedupeHead);
    const html = await page.content();
    captured.push({ outDir: route.outDir, html });
    await page.close();
    console.log(`Rendered ${route.urlPath}`);
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  for (const { outDir, html } of captured) {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, 'index.html'), html);
  }

  console.log(`Prerendered ${captured.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
