/* A stand-in map for glass specimens. Glass must be demonstrated over content
   with real high-frequency detail or the material's job is invisible. */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const P = {
  light: { land:'#EDF1F5', block:'#E2E8EF', blockAlt:'#DCE4EC', road:'#FFFFFF', roadMinor:'#F7F9FB', park:'#CFE3C4', water:'#B6D4E8', label:'#93A2B4' },
  dark:  { land:'#1A2530', block:'#212D3A', blockAlt:'#26333F', road:'#37485A', roadMinor:'#2A3846', park:'#22392C', water:'#1D3345', label:'#4A5C70' },
};

function map(c) {
  const W = 900, H = 420;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  s += `<rect width="${W}" height="${H}" fill="${c.land}"/>`;
  // water: a river running across the lower third
  s += `<path d="M-20 372 C 140 340 220 400 360 366 S 640 300 780 336 L 940 322 L 940 440 L -20 440 Z" fill="${c.water}"/>`;
  // park
  s += `<path d="M596 44 h206 a14 14 0 0 1 14 14 v122 a14 14 0 0 1 -14 14 h-206 a14 14 0 0 1 -14 -14 v-122 a14 14 0 0 1 14 -14 z" fill="${c.park}"/>`;
  // city blocks on an irregular grid
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const cols = [0, 96, 210, 300, 418, 516, 596, 700, 812, 900];
  const rows = [0, 74, 148, 210, 292, 352];
  for (let r = 0; r < rows.length - 1; r++) {
    for (let cI = 0; cI < cols.length - 1; cI++) {
      const x = cols[cI] + 7, y = rows[r] + 7;
      const w = cols[cI + 1] - cols[cI] - 14, h = rows[r + 1] - rows[r] - 14;
      if (w < 12 || h < 12) continue;
      if (x > 582 && x < 820 && y < 200) continue;      // park
      if (y + h > 330) continue;                         // river
      const n = 1 + Math.floor(rnd() * 3);
      let ox = x;
      for (let i = 0; i < n; i++) {
        const bw = (w - (n - 1) * 5) / n;
        const bh = h * (0.62 + rnd() * 0.38);
        s += `<rect x="${ox.toFixed(0)}" y="${(y + (h - bh)).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" rx="2" fill="${rnd() > 0.5 ? c.block : c.blockAlt}"/>`;
        ox += bw + 5;
      }
    }
  }
  // roads follow the block gutters
  const road = (d, w, col) => `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  for (const x of cols.slice(1, -1)) s += road(`M${x} -10 L${x} 430`, x % 3 === 0 ? 9 : 5, x % 3 === 0 ? c.road : c.roadMinor);
  for (const y of rows.slice(1)) s += road(`M-10 ${y} L910 ${y}`, y === 210 ? 11 : 6, y === 210 ? c.road : c.roadMinor);
  // one diagonal boulevard — a pure grid never reads as a real city
  s += road('M-20 300 L420 -20', 10, c.road);
  s += `</svg>`;
  return s;
}
// On a clean checkout site/ does not exist yet — it is generated output.
mkdirSync(join(ROOT, 'site', 'assets'), { recursive: true });

for (const [k, c] of Object.entries(P)) {
  writeFileSync(join(ROOT, 'site', 'assets', `map-${k}.svg`), map(c));
  console.log(`✓ map-${k}.svg`);
}
