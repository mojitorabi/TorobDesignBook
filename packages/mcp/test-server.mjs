/* Smoke test for the Torob MCP server. Run: node packages/mcp/test-server.mjs */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const t = new StdioClientTransport({ command: process.execPath, args: [join(HERE, 'server.mjs')] });
const c = new Client({ name: 'smoke', version: '1' }, { capabilities: {} });
await c.connect(t);

const call = async (n, a) => (await c.callTool({ name: n, arguments: a })).content[0].text;
const show = (t, s, n = 400) => console.log(`\n${'═'.repeat(70)}\n${t}\n${'═'.repeat(70)}\n${s.slice(0, n)}`);

const tools = await c.listTools();
console.log('TOOLS (%d): %s', tools.tools.length, tools.tools.map(x => x.name).join(', '));
console.log('RESOURCES (%d)', (await c.listResources()).resources.length);

show('search_components("Button / Red / Default")  — legacy name lookup', await call('search_components', { query: 'Button / Red / Default' }));
show('get_tokens(filter="glass.light.surface")', await call('get_tokens', { filter: 'glass.light.surface', format: 'css' }));
show('resolve_token("--t-fg-default")', await call('resolve_token', { token: '--t-fg-default' }));
show('search_icons("filter")', await call('search_icons', { query: 'filter', limit: 5 }));
show('get_icon("filter", 20)', await call('get_icon', { name: 'filter', size: 20 }), 330);
show('get_migration("POI")', await call('get_migration', { name: 'POI' }));
show('get_component("BottomSheet", format="props")', await call('get_component', { name: 'BottomSheet', format: 'props' }));

const bad = `.card {
  background: #FFFFFF;
  margin-left: 14px;
  border-radius: 10px;
  text-align: right;
  letter-spacing: -0.02em;
  transition: opacity 250ms ease;
  outline: none;
}
<button><svg viewBox="0 0 16 16"></svg></button>
<div class="Button / Red / Default">buy</div>`;
show('validate_code(deliberately bad CSS)', await call('validate_code', { code: bad }), 2200);

show('validate_code(correct CSS)', await call('validate_code', {
  code: `.t-card {
  background: var(--t-bg-fog);
  margin-inline-start: var(--t-space-4);
  border-radius: var(--t-radius-md);
  text-align: start;
  transition: opacity var(--t-duration-micro) var(--t-easing-out);
}` }), 400);

await c.close();
