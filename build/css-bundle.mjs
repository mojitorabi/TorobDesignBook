#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
const src = join(ROOT, 'packages', 'css', 'src');
const out = join(ROOT, 'packages', 'css', 'dist');
mkdirSync(out, { recursive: true });
const files = readdirSync(src).filter(f => f.endsWith('.css')).sort();
let body = '';
for (const f of files) body += `\n/* ═══ ${f} ═══ */\n` + readFileSync(join(src, f), 'utf8');
writeFileSync(join(out, 'torob.css'), '@import "./tokens.css";\n' + body);
writeFileSync(join(out, 'fonts.css'), readFileSync(join(ROOT, 'packages/css/src-site/fonts.css'), 'utf8'));
console.log(`✓ torob.css — ${files.length} parts, ${(body.length / 1024).toFixed(1)}KB`);
