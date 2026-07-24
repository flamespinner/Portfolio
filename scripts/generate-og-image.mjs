import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const headshotBase64 = readFileSync(path.join(root, 'src/assets/headshot.jpg')).toString('base64');

const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 25% 25%, #292524 0%, #1c1917 60%, #0c0a09 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .card {
    display: flex;
    align-items: center;
    gap: 56px;
    padding: 0 80px;
  }
  .headshot {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(251, 146, 60, 0.6);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
  }
  .text h1 {
    font-size: 64px;
    color: #fff;
    margin-bottom: 16px;
    letter-spacing: -1px;
  }
  .text h2 {
    font-size: 28px;
    font-weight: 500;
    background: linear-gradient(135deg, #fdba74, #ea580c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
  }
  .text p {
    font-size: 22px;
    color: #a8a29e;
  }
  .badge {
    display: inline-block;
    margin-top: 24px;
    font-size: 20px;
    color: #78716c;
  }
</style>
</head>
<body>
  <div class="card">
    <img class="headshot" src="data:image/jpeg;base64,${headshotBase64}" />
    <div class="text">
      <h1>Michael Wilke</h1>
      <h2>Full-stack developer &bull; Data &amp; automation &bull; tinkerer</h2>
      <p>SQL Server ETL &bull; React &amp; Vue &bull; Azure &amp; Windows Server</p>
      <div class="badge">michaelwilke.com</div>
    </div>
  </div>
</body>
</html>
`;

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle0' });
const buffer = await page.screenshot({ type: 'jpeg', quality: 92 });
writeFileSync(path.join(root, 'public/og-image.jpg'), buffer);
await browser.close();

console.log('Generated public/og-image.jpg');
