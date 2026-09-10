import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const DIR = join(ROOT, 'site');
const PORT = Number(process.env.PORT || 4321);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp' };

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = join(DIR, normalize(p).replace(/^(\.\.[/\\])+/, ''));
    let target = file;
    try { if ((await stat(file)).isDirectory()) target = join(file, 'index.html'); } catch { }
    const body = await readFile(target);
    res.writeHead(200, { 'content-type': TYPES[extname(target)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1>');
  }
}).listen(PORT, () => console.log(`Rahnamā docs → http://localhost:${PORT}`));
