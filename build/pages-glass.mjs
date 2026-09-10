import { specimen, section, table, guidance } from './site-lib.mjs';

export function glassPage(m) {
  const toc = [], S = (id, t, inner) => { toc.push({ id, label: t }); return section(id, t, inner); };

  let body = `<div class="prose">
    <p>Apple's glass is <strong>thick</strong>: 50–80px of blur, a saturation lift, layered specular highlights, a lens that bends what sits behind it. Torob glass is <strong>thin</strong>: a translucent sheet of the surface colour, one hairline edge, and a shadow small enough to read as a lifted edge rather than a drop shadow.</p>
    <p>That restraint is the point. Glass here is a <em>structural</em> material: it marks a surface that floats above content: a bar, a sheet, a filter rail, a control over the map. It is never decoration.</p>
  </div>

  ${specimen({ label: 'The material, over a map', canvas: 'map', stageClass: 'spec__stage--center', html: `<div style="display:flex;flex-direction:column;gap:12px;align-items:center">
  <div class="t-glass" style="padding:14px 18px;min-inline-size:250px"><span class="t-body-md-strong">۳۰٪ — سطح شناور</span><div class="t-body-sm t-tone-secondary">bars, sheets, filter rails</div></div>
  <div class="t-glass t-glass--list" style="padding:14px 18px;min-inline-size:250px"><span class="t-body-md-strong">۵۰٪ — پس‌زمینه فهرست</span><div class="t-body-sm t-tone-secondary">content scrolls inside it</div></div>
  <div class="t-glass t-glass--selected" style="padding:14px 18px;min-inline-size:250px"><span class="t-body-md-strong">۶۰٪ — انتخاب‌شده</span><div class="t-body-sm t-tone-secondary">no elevation, blue ring</div></div>
</div>` })}`;

  body += S('recipe', 'The recipe', `<div class="prose"><p>Extracted verbatim from the twelve unique glass layer styles in <code>Torob Tokens.sketch</code>.</p></div>
    ${table(['', 'Light', 'Dark'], [
      ['<strong>Tint</strong>', '<code>rgba(255,255,255,0.30)</code>', '<code>rgba(33,43,54,0.30)</code>'],
      ['<strong>Hairline</strong>', '<code>1px #FFFFFF</code>', '<code>1px #212B36</code>'],
      ['<strong>Micro-shadow</strong>', '<code>-0.5px 0.5px 1px #CBD5E1</code>', '<code>-0.5px 0.5px 1px #475569</code>'],
      ['<strong>Selection ring</strong>', '<code>0.5px #3468CC</code>', '<code>0.5px #60A5FA</code>'],
      ['<strong>Backdrop blur</strong>', '<code>16px</code> <span class="status-pill status-pill--new">added</span>', '<code>16px</code>'],
      ['<strong>Saturation</strong>', '<code>1</code> (no vibrancy lift)', '<code>1</code>'],
    ])}
    <div class="note note--new"><strong>The blur is the one addition.</strong> The Sketch source has no background blur anywhere. Not one layer. The glass was translucency alone. Over a map or a dense product grid that reads muddy rather than glassy, because there is nothing to separate figure from ground. 16px is a quarter of Apple's and enough to do that job. Set <code>--t-glass-blur: 0px</code> to render exactly as designed in Sketch.</div>`);

  body += S('ladder', 'The opacity ladder', `<div class="prose">
      <p>Opacity is the only lever that changes. There are three steps and they mean different things. This is the part teams get wrong, so it is worth saying plainly:</p>
    </div>
    ${table(['Level', 'Class', 'Opacity', 'Edge', 'Shadow', 'Means'], [
      ['Surface', '<code>.t-glass</code>', '30%', 'Hairline', 'Yes', 'A surface floating <em>above</em> content'],
      ['List', '<code>.t-glass--list</code>', '50%', 'None', 'None', 'A sheet content scrolls <em>inside</em>'],
      ['Solid', '<code>.t-glass--solid</code>', '60%', 'None', 'None', 'Resting, at the same level as its surroundings'],
      ['Selected', '<code>.t-glass--selected</code>', '60%', '0.5px blue', 'None', 'Chosen'],
      ['Filters', '<code>.t-glass--filters</code>', '30%', 'Outside hairline', 'Top highlight + edge', 'A rail sitting above a scrolling list'],
    ])}
    <div class="prose"><p><strong>Elevation on glass is binary.</strong> A glass surface either has the hairline micro-shadow or it does not. There is no shadow ramp; that belongs to <a href="./elevation.html">opaque surfaces</a>. Depth beyond the hairline is expressed by opacity and by the selection ring.</p></div>`);

  body += S('budget', 'The performance budget', `<div class="prose">
      <p><code>backdrop-filter</code> forces the compositor to re-sample everything behind the element, every frame it moves. On the mid-range Android hardware that carries most of Torob's traffic, that is the difference between a 60fps scroll and a visibly stuttering one.</p>
      <p>So the budget is a hard number, not a suggestion:</p>
    </div>
    <div class="note note--warn"><strong>At most three backdrop-filtered surfaces per viewport.</strong> Token: <code>--t-glass-max-layers: 3</code>. A sticky header, a filter rail and a bottom sheet is the whole allowance. A grid of glass cards is not glass. It is a frame-rate bug.</div>
    <div class="prose"><ul>
      <li>Never put glass on a list item, a table row, or anything that repeats.</li>
      <li>Never nest glass inside glass. The inner layer samples the outer one's output and both re-composite.</li>
      <li>Animate <strong>opacity and blur together</strong>, never blur alone. Blur-only reads as lag rather than motion.</li>
      <li>Prefer a <code>::before</code> with the tint over blurring a container that also holds text; blurring a scroll container blurs on every frame of the scroll.</li>
    </ul></div>`);

  body += S('degradation', 'Degradation', `<div class="prose">
      <p>Two independent reasons to drop the translucency. Both land on the same fallback: an opaque surface in the same hue, with the same geometry, so nothing reflows.</p>
      <ul>
        <li><code>@supports not (backdrop-filter: blur(1px))</code>: the browser cannot do it.</li>
        <li><code>@media (prefers-reduced-transparency: reduce)</code>: the user has asked it not to. This is a real accessibility setting for people with vestibular sensitivity and for low-vision users who need maximum text contrast.</li>
      </ul>
      <p>The fallback is <code>#F8FAFC</code> light, <code>#212B36</code> dark. Layout, spacing and radii are untouched; only the transparency goes.</p>
    </div>
    ${specimen({ label: 'Glass and its opaque fallback, side by side', canvas: 'map', stageClass: 'spec__stage--center', html: `<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
  <div class="t-glass" style="padding:16px 20px"><span class="t-body-md-strong">شیشه</span><div class="t-body-sm t-tone-secondary">backdrop-filter: blur(16px)</div></div>
  <div class="t-glass" style="padding:16px 20px;backdrop-filter:none;-webkit-backdrop-filter:none;background:var(--t-glass-fallback)"><span class="t-body-md-strong">جایگزین مات</span><div class="t-body-sm t-tone-secondary">reduced-transparency</div></div>
</div>` })}`);

  body += S('usage', 'Usage', guidance([
    'Bars, sheets, filter rails, and controls that sit over the map or a photograph.',
    'Keep to three glass layers per viewport.',
    'Let the hairline carry the edge. It is what makes the surface read as a sheet rather than a wash.',
    'Test on a real mid-range Android before shipping a new glass surface.',
  ], [
    'Glass on repeating elements: cards, rows, cells. That is where the frame budget dies.',
    'Glass over a flat single-colour background. With nothing behind it, translucency reads as a slightly wrong grey.',
    'Nested glass.',
    'Raising the blur to "make it look more like glass". Past ~20px it stops being Torob and starts being iOS.',
    'A shadow ramp on glass. Elevation here is binary.',
  ]));

  body += S('code', 'Code', `${specimen({
    label: 'The class', canvas: 'plain', dir: 'ltr',
    html: `<pre class="code" style="inline-size:100%;background:var(--t-bg-sunken);border-radius:10px"><code>&lt;div class="t-glass"&gt;…&lt;/div&gt;
&lt;div class="t-glass t-glass--list"&gt;…&lt;/div&gt;
&lt;div class="t-glass t-glass--selected"&gt;…&lt;/div&gt;</code></pre>`
  })}
  <div class="spec" data-spec>
    <div class="spec__bar"><span class="spec__label">glass.css — the full rule</span>
      <div class="spec__tools"><button class="site-tool copy-btn" data-copy="glass-src">Copy</button></div></div>
    <pre class="code" id="glass-src"><code>.t-glass {
  background-color: var(--t-glass-fill);
  border: var(--t-border-thin) solid var(--t-glass-border);
  box-shadow: var(--t-glass-shadow);
  border-radius: var(--t-radius-md);
  backdrop-filter: blur(var(--t-glass-blur)) saturate(var(--t-glass-saturate));
  -webkit-backdrop-filter: blur(var(--t-glass-blur)) saturate(var(--t-glass-saturate));
}

/* Two independent reasons to go opaque. Same hue, same geometry. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .t-glass { background-color: var(--t-glass-fallback); }
}
@media (prefers-reduced-transparency: reduce) {
  .t-glass { background-color: var(--t-glass-fallback); backdrop-filter: none; }
}</code></pre>
  </div>`);

  return { body, toc, title: 'Glass', description: "Torob glass is thin, not thick. Tint, hairline, micro-shadow, and a blur a quarter the size of Apple's.", eyebrow: 'Foundations' };
}
