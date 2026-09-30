/* Waypoint charts: dependency-free SVG/HTML charts with hover tooltips.
   Colors come from CSS tokens (validated reference palette), so light/dark themes just work. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, svgEl: s, esc } = WP;
  const C = {};
  const SERIES = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--s5)', 'var(--s6)', 'var(--s7)', 'var(--s8)'];
  C.SERIES = SERIES;
  C.ORD = ['var(--ord-1)', 'var(--ord-2)', 'var(--ord-3)', 'var(--ord-4)', 'var(--ord-5)'];
  C.SEQ = ['var(--seq-1)', 'var(--seq-2)', 'var(--seq-3)', 'var(--seq-4)', 'var(--seq-5)', 'var(--seq-6)', 'var(--seq-7)'];
  C.STATUS = { good: '#0ca30c', warning: '#fab219', serious: '#ec835a', critical: '#d03b3b' };
  const fmtN = (v) => (Math.round(v * 10) / 10).toLocaleString();

  /* Draw on attach and on resize, using the real pixel width (keeps text crisp). */
  function responsive(draw, minH) {
    const box = h('div', { class: 'chart-wrap', style: { minHeight: (minH || 120) + 'px' } });
    let lastW = 0;
    const render = () => {
      const w = Math.floor(box.clientWidth);
      if (!w || w === lastW) return;
      lastW = w; WP.clear(box); box.appendChild(draw(w));
    };
    if (window.ResizeObserver) { const ro = new ResizeObserver(render); ro.observe(box); }
    else window.addEventListener('resize', render);
    requestAnimationFrame(render);
    return box;
  }
  C.responsive = responsive;

  function legend(items) {
    return h('div', { class: 'legend' }, items.map((it) => h('span', null, h('i', { style: { background: it.color } }), it.label + (it.value != null ? ' (' + it.value + ')' : ''))));
  }
  C.legend = legend;
  const empty = (msg) => h('div', { class: 'chart-empty' }, msg || 'Not enough data yet');
  C.empty = empty;

  /* ----------------------------------------------------- horizontal bars */
  C.barH = function (items, opts) {
    opts = opts || {};
    if (!items.length) return empty(opts.empty);
    const max = opts.max || Math.max(...items.map((i) => i.value), 1);
    const labelW = opts.labelWidth || 140;
    return h('div', { class: 'stack', style: { gap: (opts.gap != null ? opts.gap : 7) + 'px' } }, items.map((it) => {
      const w = Math.max(0, Math.min(100, (it.value / max) * 100));
      const tip = it.tip || ('<b>' + esc(it.label) + '</b><br>' + esc(opts.format ? opts.format(it.value) : fmtN(it.value)));
      return h('div', { style: { display: 'grid', gridTemplateColumns: labelW + 'px 1fr ' + (opts.valueWidth || 48) + 'px', gap: '10px', alignItems: 'center', fontSize: '12.5px' }, 'data-tip': tip },
        h('div', { class: 'ellipsis text-2', title: it.label }, it.icon || null, it.label),
        h('div', { style: { position: 'relative', height: (opts.barH || 12) + 'px', background: opts.track === false ? 'transparent' : 'var(--surface-2)', borderRadius: '3px' } },
          h('div', { class: 'mark', style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: w + '%', background: it.color || opts.color || 'var(--s1)', borderRadius: '0 4px 4px 0', minWidth: it.value > 0 ? '3px' : '0' } }),
          it.marker != null ? h('div', { style: { position: 'absolute', top: '-3px', bottom: '-3px', left: Math.min(100, (it.marker / max) * 100) + '%', width: '2px', background: 'var(--text)' } }) : null),
        h('div', { class: 'right tabnum', style: { fontWeight: 600 } }, opts.format ? opts.format(it.value) : fmtN(it.value)));
    }));
  };

  /* --------------------------------------------------------------- funnel */
  C.funnel = function (stages, opts) {
    opts = opts || {};
    const max = Math.max(...stages.map((st) => st.value), 1);
    if (max === 0 || !stages.some((st) => st.value)) return empty('Add jobs to see your pipeline funnel');
    const ramp = ['var(--ord-5)', 'var(--ord-4)', 'var(--ord-3)', 'var(--ord-2)', 'var(--ord-1)', 'var(--ord-1)'];
    const rows = [];
    stages.forEach((st, i) => {
      const w = Math.max(st.value ? 4 : 0, (st.value / max) * 100);
      if (i > 0) {
        const prev = stages[i - 1].value;
        const conv = prev ? Math.round((st.value / prev) * 100) : 0;
        rows.push(h('div', { style: { fontSize: '11.5px', color: 'var(--muted)', paddingLeft: (opts.labelWidth || 96) + 10 + 'px', margin: '-2px 0' } }, '↓ ' + conv + '% reached ' + st.label.toLowerCase()));
      }
      rows.push(h('div', { style: { display: 'grid', gridTemplateColumns: (opts.labelWidth || 96) + 'px 1fr', gap: '10px', alignItems: 'center', cursor: opts.onClick ? 'pointer' : 'default' },
        'data-tip': '<b>' + esc(st.label) + '</b>: ' + st.value + (st.hint ? '<br>' + esc(st.hint) : ''), onclick: opts.onClick ? () => opts.onClick(st) : null },
        h('div', { class: 'text-2', style: { fontSize: '12.5px', fontWeight: 600 } }, st.label),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 } },
          h('div', { class: 'mark', style: { height: '26px', width: 'calc((100% - 48px) * ' + (w / 100).toFixed(4) + ')', flex: '0 0 auto', background: ramp[i] || 'var(--ord-1)', borderRadius: '0 5px 5px 0' } }),
          h('b', { class: 'tabnum', style: { fontSize: '13px' } }, st.value))));
    });
    return h('div', { class: 'stack', style: { gap: '6px' } }, rows);
  };

  /* ------------------------------------------------ stacked vertical bars */
  C.stackedBars = function (labels, series, opts) {
    opts = opts || {};
    const total = labels.map((_, i) => series.reduce((a, se) => a + (se.values[i] || 0), 0));
    if (!total.some(Boolean)) return empty(opts.empty || 'No activity logged yet');
    const H = opts.height || 210;
    const wrap = responsive((W) => {
      const pad = { l: 28, r: 6, t: 10, b: 24 };
      const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      const max = Math.max(...total, opts.goal || 0, 1);
      const nice = Math.ceil(max / 5) * 5 || 5;
      const svg = s('svg', { class: 'chart', width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || 'Stacked bar chart' });
      for (let g = 0; g <= 4; g++) {
        const v = (nice / 4) * g, y = pad.t + ih - (v / nice) * ih;
        svg.appendChild(s('line', { x1: pad.l, x2: W - pad.r, y1: y, y2: y, class: g === 0 ? 'baseline' : 'grid-line' }));
        svg.appendChild(s('text', { x: pad.l - 6, y: y + 4, 'text-anchor': 'end', class: 'axis-label' }, String(Math.round(v))));
      }
      if (opts.goal) {
        const gy = pad.t + ih - (opts.goal / nice) * ih;
        svg.appendChild(s('line', { x1: pad.l, x2: W - pad.r, y1: gy, y2: gy, stroke: 'var(--text-2)', 'stroke-dasharray': '4 4', 'stroke-width': 1.5 }));
        svg.appendChild(s('text', { x: W - pad.r, y: gy - 5, 'text-anchor': 'end', class: 'axis-label' }, 'goal ' + opts.goal));
      }
      const slot = iw / labels.length, bw = Math.max(4, Math.min(34, slot * 0.62));
      labels.forEach((lab, i) => {
        const x = pad.l + slot * i + (slot - bw) / 2;
        let y = pad.t + ih;
        const segs = series.map((se) => ({ se, v: se.values[i] || 0 })).filter((x2) => x2.v > 0);
        segs.forEach((sg, k) => {
          const hh = (sg.v / nice) * ih;
          const top = k === segs.length - 1;
          const gap = k > 0 ? 2 : 0;
          const rect = top
            ? s('path', { d: roundTop(x, y - hh, bw, hh - gap, Math.min(4, hh / 2)), fill: sg.se.color, class: 'mark' })
            : s('rect', { x, y: y - hh, width: bw, height: Math.max(0, hh - gap), fill: sg.se.color, class: 'mark' });
          svg.appendChild(rect);
          y -= hh;
        });
        const tip = '<b>' + esc(opts.tipLabel ? opts.tipLabel(lab, i) : lab) + '</b><br>' + series.map((se) => '<span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:' + se.color + ';margin-right:6px"></span>' + esc(se.label) + ': <b>' + (se.values[i] || 0) + '</b>').join('<br>') + '<br>Total: <b>' + total[i] + '</b>';
        svg.appendChild(s('rect', { x: pad.l + slot * i, y: pad.t, width: slot, height: ih, class: 'hit', 'data-tip': tip }));
        if (labels.length <= 16 || i % 2 === 0) svg.appendChild(s('text', { x: x + bw / 2, y: H - 6, 'text-anchor': 'middle', class: 'axis-label' }, lab));
      });
      return svg;
    }, H);
    return h('div', null, wrap, series.length > 1 ? legend(series) : null);
  };
  function roundTop(x, y, w, hh, r) {
    if (hh <= 0) return '';
    r = Math.max(0, Math.min(r, w / 2, hh));
    return 'M' + x + ',' + (y + hh) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y + 'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) + 'V' + (y + hh) + 'Z';
  }

  /* ---------------------------------------------------------------- donut */
  C.donut = function (parts, opts) {
    opts = opts || {};
    parts = parts.filter((p) => p.value > 0);
    const total = parts.reduce((a, p) => a + p.value, 0);
    if (!total) return empty(opts.empty);
    const size = opts.size || 150, r = size / 2 - 4, inner = r * 0.64, cx = size / 2, cy = size / 2;
    const svg = s('svg', { class: 'chart', width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, role: 'img', 'aria-label': opts.aria || 'Donut chart', style: 'flex:0 0 auto' });
    let a0 = -Math.PI / 2;
    parts.forEach((p) => {
      const frac = p.value / total, a1 = a0 + frac * Math.PI * 2;
      const path = frac >= 0.9999
        ? 'M' + (cx - r) + ',' + cy + 'a' + r + ',' + r + ' 0 1,0 ' + 2 * r + ',0a' + r + ',' + r + ' 0 1,0 ' + -2 * r + ',0M' + (cx - inner) + ',' + cy + 'a' + inner + ',' + inner + ' 0 1,1 ' + 2 * inner + ',0a' + inner + ',' + inner + ' 0 1,1 ' + -2 * inner + ',0'
        : arcPath(cx, cy, r, inner, a0, a1);
      svg.appendChild(s('path', { d: path, fill: p.color, stroke: 'var(--surface)', 'stroke-width': 2, class: 'mark', 'fill-rule': 'evenodd',
        'data-tip': '<b>' + esc(p.label) + '</b><br>' + p.value + ' (' + Math.round(frac * 100) + '%)' }));
      a0 = a1;
    });
    svg.appendChild(s('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', class: 'value-label', style: 'font-size:22px;font-weight:700;fill:var(--text)' }, String(opts.centerValue != null ? opts.centerValue : total)));
    svg.appendChild(s('text', { x: cx, y: cy + 16, 'text-anchor': 'middle', class: 'axis-label' }, opts.centerLabel || 'total'));
    const lg = h('div', { class: 'stack', style: { gap: '6px', fontSize: '12.5px', minWidth: '0', flex: '1 1 150px' } }, parts.map((p) => h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap' } },
      h('i', { style: { width: '10px', height: '10px', borderRadius: '3px', background: p.color, flex: '0 0 auto' } }),
      h('span', { class: 'text-2 ellipsis grow' }, p.label), h('b', { class: 'tabnum' }, p.value))));
    return h('div', { class: 'row', style: { gap: '18px', flexWrap: 'wrap', alignItems: 'center' } }, svg, lg);
  };
  function arcPath(cx, cy, r, ir, a0, a1) {
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const p = (rad, a) => (cx + rad * Math.cos(a)).toFixed(2) + ',' + (cy + rad * Math.sin(a)).toFixed(2);
    return 'M' + p(r, a0) + 'A' + r + ',' + r + ' 0 ' + large + ',1 ' + p(r, a1) + 'L' + p(ir, a1) + 'A' + ir + ',' + ir + ' 0 ' + large + ',0 ' + p(ir, a0) + 'Z';
  }

  /* ---------------------------------------------------------------- gauge */
  C.gauge = function (value, opts) {
    opts = opts || {};
    const size = opts.size || 180, sw = opts.stroke || 14, r = size / 2 - sw / 2 - 2, cx = size / 2, cy = size / 2 + 4;
    const H = size / 2 + 26;
    const v = Math.max(0, Math.min(100, value || 0));
    const band = v >= 75 ? { c: C.STATUS.good, t: 'Strong match' } : v >= 55 ? { c: C.STATUS.warning, t: 'Moderate match' } : { c: C.STATUS.critical, t: 'Stretch role' };
    const svg = s('svg', { class: 'chart', width: size, height: H, viewBox: '0 0 ' + size + ' ' + H, role: 'img', 'aria-label': (opts.label || 'Score') + ' ' + Math.round(v) + '%' });
    const arc = (from, to) => { const a0 = Math.PI + (from / 100) * Math.PI, a1 = Math.PI + (to / 100) * Math.PI; return 'M' + (cx + r * Math.cos(a0)) + ',' + (cy + r * Math.sin(a0)) + 'A' + r + ',' + r + ' 0 0,1 ' + (cx + r * Math.cos(a1)) + ',' + (cy + r * Math.sin(a1)); };
    svg.appendChild(s('path', { d: arc(0, 100), stroke: 'var(--surface-3)', 'stroke-width': sw, fill: 'none', 'stroke-linecap': 'round' }));
    if (v > 0) svg.appendChild(s('path', { d: arc(0, Math.max(v, 1)), stroke: band.c, 'stroke-width': sw, fill: 'none', 'stroke-linecap': 'round' }));
    svg.appendChild(s('text', { x: cx, y: cy - 10, 'text-anchor': 'middle', style: 'font-size:' + Math.round(size / 5.6) + 'px;font-weight:750;fill:var(--text)' }, Math.round(v) + '%'));
    svg.appendChild(s('text', { x: cx, y: cy + 12, 'text-anchor': 'middle', class: 'axis-label', style: 'font-size:12px;font-weight:600;fill:var(--text-2)' }, opts.caption || band.t));
    return h('div', { style: { display: 'flex', justifyContent: 'center' } }, svg);
  };

  /* ----------------------------------------------------------------- ring */
  C.ring = function (value, max, opts) {
    opts = opts || {};
    const size = opts.size || 64, sw = opts.stroke || 7, r = (size - sw) / 2, cx = size / 2;
    const frac = max ? Math.min(1, value / max) : 0;
    const circ = 2 * Math.PI * r;
    const svg = s('svg', { width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, role: 'img', 'aria-label': (opts.label || '') + ' ' + value + ' of ' + max });
    svg.appendChild(s('circle', { cx, cy: cx, r, fill: 'none', stroke: 'var(--surface-3)', 'stroke-width': sw }));
    svg.appendChild(s('circle', { cx, cy: cx, r, fill: 'none', stroke: opts.color || (frac >= 1 ? C.STATUS.good : 'var(--s1)'), 'stroke-width': sw, 'stroke-linecap': 'round',
      'stroke-dasharray': (circ * frac) + ' ' + circ, transform: 'rotate(-90 ' + cx + ' ' + cx + ')' }));
    svg.appendChild(s('text', { x: cx, y: cx + 4, 'text-anchor': 'middle', style: 'font-size:' + Math.round(size / 4.4) + 'px;font-weight:700;fill:var(--text);font-family:var(--font)' }, opts.center != null ? opts.center : Math.round(frac * 100) + '%'));
    return svg;
  };

  /* -------------------------------------------------------------- heatmap */
  C.heatmap = function (counts, opts) {
    opts = opts || {};
    const weeks = opts.weeks || 16;
    const end = WP.d.parse(WP.d.today());
    const start = WP.d.parse(WP.d.weekStart(WP.d.addDays(WP.d.today(), -7 * (weeks - 1))));
    const max = Math.max(1, ...Object.values(counts));
    const levels = [0, 0.25, 0.5, 0.75, 1];
    const color = (v) => { if (!v) return 'var(--surface-3)'; const f = v / max; return f <= 0.25 ? 'var(--seq-2)' : f <= 0.5 ? 'var(--seq-3)' : f <= 0.75 ? 'var(--seq-5)' : 'var(--seq-6)'; };
    const wrap = responsive((W) => {
      const labelW = 26, gap = 3;
      const cell = Math.max(8, Math.min(18, Math.floor((W - labelW) / weeks) - gap));
      const Hh = 7 * (cell + gap) + 18;
      const svg = s('svg', { class: 'chart', width: W, height: Hh, viewBox: '0 0 ' + W + ' ' + Hh, role: 'img', 'aria-label': 'Activity heatmap' });
      ['Mon', 'Wed', 'Fri'].forEach((dname, i) => svg.appendChild(s('text', { x: 0, y: 18 + (i * 2) * (cell + gap) + cell - 1, class: 'axis-label', style: 'font-size:10px' }, dname)));
      const dt = new Date(start);
      let col = 0, lastMonth = -1;
      while (dt <= end) {
        const row = (dt.getDay() + 6) % 7;
        const key = WP.d.iso(dt), v = counts[key] || 0;
        const x = labelW + col * (cell + gap), y = 16 + row * (cell + gap);
        if (row === 0 && dt.getMonth() !== lastMonth) { lastMonth = dt.getMonth(); svg.appendChild(s('text', { x, y: 10, class: 'axis-label', style: 'font-size:10px' }, dt.toLocaleDateString(undefined, { month: 'short' }))); }
        svg.appendChild(s('rect', { x, y, width: cell, height: cell, rx: 3, fill: color(v), class: 'mark', 'data-tip': '<b>' + esc(WP.d.fmtLong(key)) + '</b><br>' + v + ' action' + (v === 1 ? '' : 's') }));
        if (row === 6) col++;
        dt.setDate(dt.getDate() + 1);
      }
      return svg;
    }, 120);
    const lg = h('div', { class: 'legend', style: { justifyContent: 'flex-end' } }, 'Less', levels.map((l) => h('i', { style: { background: l === 0 ? 'var(--surface-3)' : color(l * max) } })), 'More');
    return h('div', null, wrap, lg);
  };

  /* ------------------------------------------------------------ sparkline */
  C.sparkline = function (values, opts) {
    opts = opts || {};
    const W = opts.width || 110, H = opts.height || 30, max = Math.max(...values, 1), min = 0;
    const pts = values.map((v, i) => [(i / Math.max(1, values.length - 1)) * (W - 4) + 2, H - 3 - ((v - min) / (max - min || 1)) * (H - 8)]);
    const svg = s('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' });
    svg.appendChild(s('polyline', { points: pts.map((p) => p.join(',')).join(' '), fill: 'none', stroke: opts.color || 'var(--s1)', 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    const last = pts[pts.length - 1];
    if (last) svg.appendChild(s('circle', { cx: last[0], cy: last[1], r: 3, fill: opts.color || 'var(--s1)', stroke: 'var(--surface)', 'stroke-width': 2 }));
    return svg;
  };

  /* -------------------------------------------------------------- scatter */
  C.scatter = function (points, opts) {
    opts = opts || {};
    if (!points.length) return empty(opts.empty || 'Add target companies to see this map');
    const H = opts.height || 300;
    const xMax = opts.xMax || 5, yMax = opts.yMax || 5, xMin = opts.xMin != null ? opts.xMin : 0.5, yMin = opts.yMin != null ? opts.yMin : 0.5;
    const wrap = responsive((W) => {
      const pad = { l: 40, r: 14, t: 14, b: 38 };
      const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      const X = (v) => pad.l + ((v - xMin) / (xMax + 0.5 - xMin)) * iw;
      const Y = (v) => pad.t + ih - ((v - yMin) / (yMax + 0.5 - yMin)) * ih;
      const svg = s('svg', { class: 'chart', width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || 'Scatter plot' });
      const midX = X((xMax + 1) / 2), midY = Y((yMax + 1) / 2);
      svg.appendChild(s('rect', { x: midX, y: pad.t, width: pad.l + iw - midX, height: midY - pad.t, fill: 'var(--good-soft)', opacity: 0.6 }));
      for (let i = 1; i <= xMax; i++) { svg.appendChild(s('line', { x1: X(i), x2: X(i), y1: pad.t, y2: pad.t + ih, class: 'grid-line' })); svg.appendChild(s('text', { x: X(i), y: pad.t + ih + 15, 'text-anchor': 'middle', class: 'axis-label' }, String(i))); }
      for (let i = 1; i <= yMax; i++) { svg.appendChild(s('line', { x1: pad.l, x2: pad.l + iw, y1: Y(i), y2: Y(i), class: 'grid-line' })); svg.appendChild(s('text', { x: pad.l - 8, y: Y(i) + 4, 'text-anchor': 'end', class: 'axis-label' }, String(i))); }
      svg.appendChild(s('line', { x1: pad.l, x2: pad.l + iw, y1: pad.t + ih, y2: pad.t + ih, class: 'baseline' }));
      svg.appendChild(s('text', { x: pad.l + iw / 2, y: H - 4, 'text-anchor': 'middle', class: 'axis-label', style: 'font-weight:600' }, opts.xLabel || 'x'));
      const yl = s('text', { x: 12, y: pad.t + ih / 2, 'text-anchor': 'middle', class: 'axis-label', style: 'font-weight:600', transform: 'rotate(-90 12 ' + (pad.t + ih / 2) + ')' }, opts.yLabel || 'y');
      svg.appendChild(yl);
      if (opts.quadrantLabel) svg.appendChild(s('text', { x: pad.l + iw - 6, y: pad.t + 14, 'text-anchor': 'end', style: 'font-size:11px;font-weight:700;fill:var(--good-ink)' }, opts.quadrantLabel));
      const jitter = {}; const boxes = [];
      const overlaps = (b) => boxes.some((o) => b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y);
      points.forEach((p) => {
        const k = p.x + ',' + p.y; jitter[k] = (jitter[k] || 0) + 1;
        const off = (jitter[k] - 1) * 9;
        const cx = X(p.x) + off, cy = Y(p.y) - off * 0.4;
        const g = s('g', { 'data-tip': p.tip || esc(p.label), style: opts.onClick ? 'cursor:pointer' : '' });
        g.appendChild(s('circle', { cx, cy, r: p.r || 7, fill: p.color || 'var(--s1)', stroke: 'var(--surface)', 'stroke-width': 2, class: 'mark' }));
        if (points.length <= 14) {
          const tw = p.label.length * 6.4, right = pad.l + iw;
          const cands = [[cx + 11, cy + 4, 'start'], [cx - 11, cy + 4, 'end'], [cx, cy - 12, 'middle'], [cx, cy + 20, 'middle']];
          let pick = null;
          for (const [lx, ly, an] of cands) {
            const bx = an === 'start' ? lx : an === 'end' ? lx - tw : lx - tw / 2;
            const b = { x: bx, y: ly - 11, w: tw, h: 14 };
            if (bx < pad.l - 30 || bx + tw > W - 2) continue;
            if (!overlaps(b)) { pick = [lx, ly, an, b]; break; }
            if (!pick) pick = [lx, ly, an, b, true];
          }
          if (!pick) pick = [cx + 11, cy + 4, 'start', { x: cx + 11, y: cy - 7, w: tw, h: 14 }];
          boxes.push(pick[3]); boxes.push({ x: cx - 8, y: cy - 8, w: 16, h: 16 });
          g.appendChild(s('text', { x: pick[0], y: pick[1], 'text-anchor': pick[2], style: 'font-size:11.5px;fill:var(--text)' }, p.label));
          void right;
        }
        if (opts.onClick) g.addEventListener('click', () => opts.onClick(p));
        svg.appendChild(g);
      });
      return svg;
    }, H);
    return h('div', null, wrap, opts.legend ? legend(opts.legend) : null);
  };

  /* ---------------------------------------------------- salary range bars */
  C.rangeBars = function (items, opts) {
    opts = opts || {};
    items = items.filter((i) => i.min || i.max);
    if (!items.length) return empty(opts.empty || 'Add salary ranges to saved jobs to compare them');
    const lo = Math.min(...items.map((i) => i.min || i.max), opts.target || Infinity) * 0.9;
    const hi = Math.max(...items.map((i) => i.max || i.min), opts.target || 0) * 1.05;
    const X = (v) => ((v - lo) / (hi - lo)) * 100;
    const f = opts.format || fmtN;
    return h('div', { class: 'stack', style: { gap: '9px' } },
      items.map((it) => {
        const a = X(it.min || it.max), b = X(it.max || it.min);
        return h('div', { style: { display: 'grid', gridTemplateColumns: (opts.labelWidth || 150) + 'px 1fr', gap: '10px', alignItems: 'center', fontSize: '12.5px' },
          'data-tip': '<b>' + esc(it.label) + '</b><br>' + esc(f(it.min)) + ' - ' + esc(f(it.max)) + (opts.target ? '<br>Your target: ' + esc(f(opts.target)) : '') },
          h('div', { class: 'ellipsis text-2', title: it.label }, it.label),
          h('div', { style: { position: 'relative', height: '16px', background: 'var(--surface-2)', borderRadius: '4px' } },
            h('div', { class: 'mark', style: { position: 'absolute', top: '3px', bottom: '3px', left: a + '%', width: Math.max(1.5, b - a) + '%', background: it.color || 'var(--s1)', borderRadius: '4px' } }),
            opts.target ? h('div', { style: { position: 'absolute', top: '-3px', bottom: '-3px', left: X(opts.target) + '%', width: '2px', background: 'var(--text)' } }) : null));
      }),
      opts.target ? h('div', { class: 'legend' }, h('span', null, h('i', { style: { background: 'var(--s1)' } }), 'Posted range'), h('span', null, h('i', { style: { background: 'var(--text)', width: '2px', borderRadius: 0 } }), 'Your target (' + f(opts.target) + ')')) : null);
  };

  /* -------------------------------------------------------- network graph */
  C.network = function (center, groups, opts) {
    opts = opts || {};
    if (!groups.length) return empty(opts.empty || 'Add contacts to see your network map');
    const H = opts.height || 420;
    const wrap = responsive((W) => {
      const cx = W / 2, cy = H / 2;
      const R1 = Math.min(W, H) * 0.24, R2 = Math.min(W, H) * 0.43;
      const svg = s('svg', { class: 'chart', width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Network map' });
      const edges = s('g'), nodes = s('g');
      WP.add(svg, edges, nodes);
      const totalContacts = groups.reduce((a, g) => a + g.nodes.length, 0) || 1;
      let angle = -Math.PI / 2;
      groups.forEach((g) => {
        const span = (Math.max(1, g.nodes.length) / Math.max(totalContacts, groups.length)) * Math.PI * 2;
        const ga = angle + span / 2;
        const gx = cx + R1 * Math.cos(ga), gy = cy + R1 * Math.sin(ga);
        edges.appendChild(s('line', { x1: cx, y1: cy, x2: gx, y2: gy, stroke: 'var(--border-strong)', 'stroke-width': 1.5 }));
        g.nodes.forEach((n, i) => {
          const a = g.nodes.length === 1 ? ga : angle + (span * (i + 0.5)) / g.nodes.length;
          const nx = cx + R2 * Math.cos(a), ny = cy + R2 * Math.sin(a);
          edges.appendChild(s('line', { x1: gx, y1: gy, x2: nx, y2: ny, stroke: 'var(--border)', 'stroke-width': 1 }));
          const node = s('g', { 'data-tip': n.tip || esc(n.label), style: opts.onNode ? 'cursor:pointer' : '' });
          node.appendChild(s('circle', { cx: nx, cy: ny, r: 7 + (n.warmth || 1), fill: C.ORD[Math.max(0, Math.min(4, (n.warmth || 1) - 1))], stroke: 'var(--surface)', 'stroke-width': 2, class: 'mark' }));
          if (totalContacts <= 30) {
            const right = Math.cos(a) >= 0;
            node.appendChild(s('text', { x: nx + (right ? 14 : -14), y: ny + 4, 'text-anchor': right ? 'start' : 'end', style: 'font-size:11px;fill:var(--text-2)' }, n.label));
          }
          if (opts.onNode) node.addEventListener('click', () => opts.onNode(n));
          nodes.appendChild(node);
        });
        const lbl = g.label.length > 18 ? g.label.slice(0, 17) + '…' : g.label;
        const tw = Math.max(54, lbl.length * 6.6 + 18);
        const gnode = s('g', { 'data-tip': '<b>' + esc(g.label) + '</b><br>' + g.nodes.length + ' contact' + (g.nodes.length === 1 ? '' : 's') + (g.tier ? '<br>Tier ' + esc(g.tier) : '') });
        gnode.appendChild(s('rect', { x: gx - tw / 2, y: gy - 12, width: tw, height: 24, rx: 12, fill: 'var(--surface)', stroke: g.tier === 'A' ? 'var(--s1)' : 'var(--border-strong)', 'stroke-width': g.tier === 'A' ? 2 : 1.2 }));
        gnode.appendChild(s('text', { x: gx, y: gy + 4, 'text-anchor': 'middle', style: 'font-size:11px;font-weight:650;fill:var(--text)' }, lbl));
        nodes.appendChild(gnode);
        angle += span;
      });
      const cg = s('g');
      cg.appendChild(s('circle', { cx, cy, r: 26, fill: 'var(--accent)', stroke: 'var(--surface)', 'stroke-width': 3 }));
      cg.appendChild(s('text', { x: cx, y: cy + 4, 'text-anchor': 'middle', style: 'font-size:12px;font-weight:700;fill:#fff' }, center || 'You'));
      nodes.appendChild(cg);
      return svg;
    }, H);
    return h('div', null, wrap, h('div', { class: 'legend' }, 'Relationship warmth:', [1, 2, 3, 4, 5].map((w) => h('span', null, h('i', { style: { background: C.ORD[w - 1], borderRadius: '50%' } }), ['Cold', 'Aware', 'Warm', 'Strong', 'Close'][w - 1]))));
  };

  /* ---------------------------------------------------------- mini meter */
  C.meter = function (label, value, max, opts) {
    opts = opts || {};
    const frac = max ? Math.min(1, value / max) : 0;
    return h('div', { class: 'meter-row', 'data-tip': opts.tip || null },
      h('div', { class: 'ellipsis text-2' }, label),
      h('div', { class: 'progress ' + (opts.cls || '') }, h('span', { style: { width: frac * 100 + '%', background: opts.color || null } })),
      h('div', { class: 'right tabnum', style: { fontWeight: 650 } }, opts.text != null ? opts.text : Math.round(frac * 100) + '%'));
  };

  WP.charts = C;
})();
