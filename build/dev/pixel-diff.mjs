#!/usr/bin/env node
/* Pixel diff: every Sketch symbol against its coded specimen.

   The Sketch side is an exact-frame @2x export of each master
   (source/sketch/ref/<id>.png, made with a slice so shadows and overflowing
   glyph boxes cannot shift the origin). The code side is the specimen HTML
   from source/sketch/specimens.mjs, rendered in Chromium at the master's own
   size and DPR 2, over the same ground.

   Score = share of "content" pixels (non-transparent in either image) whose
   colour matches within a tolerance, allowing a one-device-pixel shift so
   antialiasing differences between CoreText and Skia do not count as errors.
   Text never matches 100%: two rasterisers never agree on every glyph edge.

   Dev tool, not part of the site build. Needs Playwright:
     npm i -D playwright   (or set PLAYWRIGHT_MODULE to an installed copy)
   Run after `node build/all.mjs`:
     node build/dev/pixel-diff.mjs            all symbols
     node build/dev/pixel-diff.mjs Button     names containing "Button"
   Writes source/sketch/match.json and, for inspection, .pixel-diff/*.png */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { ROOT } from '../tokens-lib.mjs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { SPECIMENS, GROUND } = await import(join(ROOT, 'source/sketch/specimens.mjs'));
const symbols = JSON.parse(readFileSync(join(ROOT, 'source/sketch/symbols.json'), 'utf8')).symbols;
const filter = process.argv[2] ?? '';
const OUT = join(ROOT, '.pixel-diff');
mkdirSync(OUT, { recursive: true });
const MATCH = join(ROOT, 'source/sketch/match.json');
const prev = existsSync(MATCH) ? JSON.parse(readFileSync(MATCH, 'utf8')) : {};

const TYPES = { '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.js': 'text/javascript' };
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 900, height: 900 } });
await ctx.route('http://ds.test/**', async route => {
  const p = decodeURIComponent(new URL(route.request().url()).pathname);
  const file = p.startsWith('/ref/') ? join(ROOT, 'source/sketch', p) : join(ROOT, 'site', p);
  try { await route.fulfill({ body: readFileSync(file), contentType: TYPES[extname(file)] ?? 'application/octet-stream' }); }
  catch { await route.fulfill({ status: 404, body: '' }); }
});
const page = await ctx.newPage();

const results = {};
const rows = [];
for (const sym of symbols) {
  if (filter && !sym.label.includes(filter)) continue;
  const spec = SPECIMENS[sym.id];
  if (!spec) continue;
  const theme = spec.theme ?? 'light';
  const W = sym.width, H = sym.height;
  const html = `<!doctype html><html dir="ltr" lang="fa" data-theme="${theme}"><head>
<link rel="stylesheet" href="http://ds.test/assets/fonts.css"><link rel="stylesheet" href="http://ds.test/assets/torob.css">
<style>html,body{margin:0;background:transparent;overflow:hidden}*{text-rendering:geometricPrecision!important;animation:none!important;transition:none!important}#stage{position:absolute;top:0;left:0;width:${W}px;height:${H}px;display:flex;align-items:flex-start;justify-content:flex-start}#stage>div{display:contents}</style>
</head><body><div id="stage" dir="rtl"><div>${spec.html.replaceAll('%ASSETS%', 'http://ds.test/assets')}</div></div></body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.mouse.move(899, 899);   /* nothing may be hovered by accident */
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(30);
  const box = await page.evaluate(() => {
    const el = document.querySelector('#stage > div > *');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return [Math.round(r.width * 100) / 100, Math.round(r.height * 100) / 100];
  });
  /* The document is LTR and only the stage is RTL: in an RTL document,
     anything that overflows to the left (a 44px hit area on an edge button)
     extends the scrollable area leftwards and shifts page coordinates. */
  const shot = await page.locator('#stage').screenshot({ omitBackground: true });
  const ref = readFileSync(join(ROOT, 'source/sketch/ref', sym.id + '.png'));
  const ground = GROUND[theme];
  const res = await page.evaluate(async ({ a, b, ground }) => {
    const load = async b64 => {
      const bmp = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
      const c = new OffscreenCanvas(bmp.width, bmp.height);
      const g = c.getContext('2d');
      g.fillStyle = ground; g.fillRect(0, 0, c.width, c.height);
      g.drawImage(bmp, 0, 0);
      const raw = new OffscreenCanvas(bmp.width, bmp.height).getContext('2d');
      raw.drawImage(bmp, 0, 0);
      return { w: bmp.width, h: bmp.height, px: g.getImageData(0, 0, c.width, c.height).data, alpha: raw.getImageData(0, 0, c.width, c.height).data };
    };
    const A = await load(a), B = await load(b);
    const w = Math.min(A.w, B.w), h = Math.min(A.h, B.h);
    const T = 20;
    const at = (I, x, y) => (y * I.w + x) * 4;
    const near = (I, x, y, J, jx, jy) => {
      const i = at(I, x, y), j = at(J, jx, jy);
      return Math.abs(I.px[i] - J.px[j]) <= T && Math.abs(I.px[i + 1] - J.px[j + 1]) <= T && Math.abs(I.px[i + 2] - J.px[j + 2]) <= T;
    };
    const anyNear = (I, x, y, J) => {
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const X = x + dx, Y = y + dy;
        if (X < 0 || Y < 0 || X >= w || Y >= h) continue;
        if (near(I, x, y, J, X, Y)) return true;
      }
      return false;
    };
    let mask = 0, strict = 0, tol = 0;
    const diff = new OffscreenCanvas(w, h), dg = diff.getContext('2d');
    const dd = dg.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = at(A, x, y), j = at(B, x, y), k = (y * w + x) * 4;
      const content = A.alpha[i + 3] > 8 || B.alpha[j + 3] > 8;
      const s = near(A, x, y, B, x, y);
      const t = s || (anyNear(A, x, y, B) && anyNear(B, x, y, A));
      const lum = (A.px[i] * 0.3 + A.px[i + 1] * 0.59 + A.px[i + 2] * 0.11) | 0;
      if (content) { mask++; if (s) strict++; if (t) tol++; }
      if (!content) { dd.data[k] = dd.data[k + 1] = dd.data[k + 2] = 255; dd.data[k + 3] = 255; }
      else if (t) { const g = 200 + (lum >> 3); dd.data[k] = dd.data[k + 1] = dd.data[k + 2] = g; dd.data[k + 3] = 255; }
      else { dd.data[k] = 230; dd.data[k + 1] = 20; dd.data[k + 2] = 60; dd.data[k + 3] = 255; }
    }
    dg.putImageData(dd, 0, 0);
    /* side by side: sketch · code · diff */
    const sheet = new OffscreenCanvas(w * 3 + 16, h), sg = sheet.getContext('2d');
    sg.fillStyle = '#fff'; sg.fillRect(0, 0, sheet.width, h);
    const put = (I, ox) => { const c = new OffscreenCanvas(I.w, I.h); c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(I.px), I.w, I.h), 0, 0); sg.drawImage(c, ox, 0); };
    put(A, 0); put(B, w + 8); sg.drawImage(diff, w * 2 + 16, 0);
    const blob = await sheet.convertToBlob({ type: 'image/png' });
    const buf = new Uint8Array(await blob.arrayBuffer());
    let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
    return { score: mask ? tol / mask : 1, strict: mask ? strict / mask : 1, sizeA: [A.w, A.h], sizeB: [B.w, B.h], sheet: btoa(bin) };
  }, { a: ref.toString('base64'), b: shot.toString('base64'), ground });
  const slug = sym.label.replace(/[^\w؀-ۿ]+/g, '-').replace(/^-|-$/g, '');
  writeFileSync(join(OUT, slug + '.png'), Buffer.from(res.sheet, 'base64'));
  if (process.env.KEEP_RAW) writeFileSync(join(OUT, slug + '.code.png'), shot);
  const sizeOk = box && Math.abs(box[0] - W) < 0.6 && Math.abs(box[1] - H) < 0.6;
  results[sym.id] = { label: sym.label, score: Math.round(res.score * 1000) / 10, strict: Math.round(res.strict * 1000) / 10, sketch: [W, H], code: box, sizeOk: !!sizeOk };
  rows.push([sym.label, results[sym.id].score, results[sym.id].strict, box ? box.join('×') : '—', `${W}×${H}`, sizeOk ? '' : '  SIZE']);
}
await browser.close();

const merged = { ...prev, ...results };
writeFileSync(MATCH, JSON.stringify(Object.fromEntries(Object.entries(merged).sort((a, b) => a[1].label.localeCompare(b[1].label, 'en'))), null, 1) + '\n');
const pad = (s, n) => String(s).padEnd(n);
for (const r of rows.sort((a, b) => a[1] - b[1])) console.log(pad(r[1] + '%', 7) + pad('(' + r[2] + '%)', 9) + pad(r[3], 14) + pad(r[4], 12) + r[0] + r[5]);
const all = Object.values(merged);
console.log(`\n${rows.length} compared · mean ${Math.round(all.reduce((s, r) => s + r.score, 0) / all.length * 10) / 10}% over ${all.length} specimens · sheets in .pixel-diff/`);
