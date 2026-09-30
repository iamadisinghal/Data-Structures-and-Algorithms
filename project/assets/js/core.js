/* Waypoint core: DOM helpers, icons, UI primitives, dates, markdown. */
(function () {
  'use strict';
  const WP = (window.WP = window.WP || {});
  WP.views = WP.views || {};

  /* ------------------------------------------------------------------ DOM */
  function h(tag, props, ...kids) {
    const el = tag === 'svg' || tag.startsWith('svg:')
      ? document.createElementNS('http://www.w3.org/2000/svg', tag.replace('svg:', ''))
      : document.createElement(tag);
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === 'class') el.setAttribute('class', Array.isArray(v) ? v.filter(Boolean).join(' ') : v);
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'value' && (tag === 'input' || tag === 'textarea' || tag === 'select')) el.value = v;
        else if (k === 'checked' || k === 'disabled' || k === 'selected' || k === 'readOnly' || k === 'multiple') el[k] = !!v;
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      }
    }
    append(el, kids);
    return el;
  }
  function append(el, kids) {
    for (const c of kids) {
      if (c == null || c === false || c === true) continue;
      if (Array.isArray(c)) append(el, c);
      else if (c instanceof Node) el.appendChild(c);
      else el.appendChild(document.createTextNode(String(c)));
    }
    return el;
  }
  function svgEl(tag, attrs, ...kids) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs || {}) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    append(el, kids);
    return el;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  function debounce(fn, ms) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); }; }
  function uid(prefix) { return (prefix ? prefix + '_' : '') + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function initials(name) { return String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?'; }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }
  function pct(n) { return Math.round(n) + '%'; }
  function uniq(arr) { return Array.from(new Set(arr)); }
  function money(v, cur) {
    if (v == null || v === '' || isNaN(v)) return '-';
    cur = cur || (WP.store && WP.store.state.settings.currency) || 'USD';
    const n = Number(v);
    if (cur === 'INR') {
      if (n >= 1e7) return '₹' + (n / 1e7).toFixed(n % 1e7 ? 2 : 0) + ' Cr';
      if (n >= 1e5) return '₹' + (n / 1e5).toFixed(n % 1e5 ? 1 : 0) + ' L';
      return '₹' + n.toLocaleString('en-IN');
    }
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0, notation: n >= 1e6 ? 'compact' : 'standard' }).format(n); }
    catch (e) { return cur + ' ' + n.toLocaleString(); }
  }

  /* ---------------------------------------------------------------- dates */
  const d = {
    now: () => new Date().toISOString(),
    today: () => d.iso(new Date()),
    iso(dt) { const x = new Date(dt); if (isNaN(x)) return ''; const z = new Date(x.getTime() - x.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); },
    parse(s) { if (!s) return null; const x = new Date(s.length === 10 ? s + 'T00:00:00' : s); return isNaN(x) ? null : x; },
    addDays(s, n) { const x = d.parse(s) || new Date(); x.setDate(x.getDate() + n); return d.iso(x); },
    diff(a, b) { const norm = (x) => (x && String(x).length > 10 ? d.iso(x) : x); const A = d.parse(norm(a)), B = d.parse(norm(b) || d.today()); if (!A || !B) return null; return Math.round((B - A) / 86400000); },
    since(s) { const n = d.diff(s); return n == null ? null : n; },
    fmt(s, opts) { const x = d.parse(s); if (!x) return '-'; return x.toLocaleDateString(undefined, opts || { month: 'short', day: 'numeric' }); },
    fmtLong(s) { return d.fmt(s, { month: 'short', day: 'numeric', year: 'numeric' }); },
    rel(s) {
      const n = d.diff(s); if (n == null) return '-';
      if (n === 0) return 'today'; if (n === 1) return 'yesterday'; if (n === -1) return 'tomorrow';
      if (n > 0) return n < 14 ? n + 'd ago' : n < 60 ? Math.round(n / 7) + 'w ago' : Math.round(n / 30) + 'mo ago';
      return 'in ' + (-n < 14 ? -n + 'd' : Math.round(-n / 7) + 'w');
    },
    weekStart(s) { const x = d.parse(s || d.today()); const day = (x.getDay() + 6) % 7; x.setDate(x.getDate() - day); return d.iso(x); },
    monthName(ym) { if (!ym) return ''; const [y, m] = ym.split('-'); if (!m) return y; return new Date(+y, +m - 1, 1).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }); },
  };

  /* ---------------------------------------------------------------- icons */
  const ICONS = {
    compass: ['c:12,12,10', 'p:16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9'],
    grid: ['r:3,3,7,7,1.5', 'r:14,3,7,7,1.5', 'r:14,14,7,7,1.5', 'r:3,14,7,7,1.5'],
    inbox: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
    user: ['c:12,8,4', 'M4 21c0-4 3.6-6 8-6s8 2 8 6'],
    target: ['c:12,12,10', 'c:12,12,6', 'c:12,12,2'],
    search: ['c:11,11,7', 'M21 21l-4.3-4.3'],
    briefcase: ['r:2,7,20,14,2', 'M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2', 'M2 13h20'],
    file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
    mail: ['r:2,4,20,16,2', 'M22 6l-10 7L2 6'],
    users: ['c:9,7,4', 'M1 21c0-4 3.6-6 8-6s8 2 8 6', 'M16 3.1a4 4 0 0 1 0 7.8', 'M23 21c0-3-2-5.2-5-5.8'],
    send: ['M22 2L11 13', 'M22 2l-7 20-4-9-9-4z'],
    kanban: ['r:3,3,18,18,2', 'M9 3v18', 'M15 3v18'],
    zap: ['M13 2L3 14h9l-1 8 10-12h-9z'],
    mic: ['r:9,2,6,12,3', 'M19 10a7 7 0 0 1-14 0', 'M12 17v5'],
    dollar: ['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
    sliders: ['M4 21v-7', 'M4 10V3', 'M12 21v-9', 'M12 8V3', 'M20 21v-5', 'M20 12V3', 'M1 14h6', 'M9 8h6', 'M17 16h6'],
    sparkles: ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 2v4', 'M17 4h4', 'M5 17v4', 'M3 19h4'],
    link: ['M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7', 'M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'],
    copy: ['r:9,9,13,13,2', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
    upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
    plus: ['M12 5v14', 'M5 12h14'],
    trash: ['M3 6h18', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M10 11v6', 'M14 11v6', 'M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'],
    edit: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
    x: ['M18 6L6 18', 'M6 6l12 12'],
    check: ['M20 6L9 17l-5-5'],
    chevronRight: ['M9 18l6-6-6-6'],
    chevronLeft: ['M15 18l-6-6 6-6'],
    chevronDown: ['M6 9l6 6 6-6'],
    chevronUp: ['M18 15l-6-6-6 6'],
    external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
    clock: ['c:12,12,10', 'M12 6v6l4 2'],
    flag: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
    shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
    shieldCheck: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
    lock: ['r:3,11,18,11,2', 'M7 11V7a5 5 0 0 1 10 0v4'],
    book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'],
    star: ['M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'],
    map: ['M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z', 'M8 2v16', 'M16 6v16'],
    building: ['r:4,2,16,20,2', 'M9 22v-4h6v4', 'M8 6h.01', 'M12 6h.01', 'M16 6h.01', 'M8 10h.01', 'M12 10h.01', 'M16 10h.01', 'M8 14h.01', 'M12 14h.01', 'M16 14h.01'],
    chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
    trending: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
    alert: ['M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z', 'M12 9v4', 'M12 17h.01'],
    info: ['c:12,12,10', 'M12 16v-4', 'M12 8h.01'],
    sun: ['c:12,12,4', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
    moon: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'],
    menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
    refresh: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.5 9a9 9 0 0 1 14.8-3.4L23 10', 'M1 14l4.7 4.4A9 9 0 0 0 20.5 15'],
    play: ['M6 3l14 9-14 9z'],
    pause: ['r:6,4,4,16,1', 'r:14,4,4,16,1'],
    grad: ['M22 10L12 5 2 10l10 5 10-5z', 'M6 12v5c3 3 9 3 12 0v-5'],
    globe: ['c:12,12,10', 'M2 12h20', 'M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z'],
    terminal: ['M4 17l6-6-6-6', 'M12 19h8'],
    key: ['c:7.5,15.5,5.5', 'M21 2l-9.6 9.6', 'M15.5 7.5l3 3L22 7l-3-3'],
    chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
    layers: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
    route: ['c:6,19,3', 'c:18,5,3', 'M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12'],
    award: ['c:12,8,6', 'M15.5 12.9L17 22l-5-3-5 3 1.5-9.1'],
    calendar: ['r:3,4,18,18,2', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
    eye: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'c:12,12,3'],
    printer: ['M6 9V2h12v7', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'r:6,14,12,8,1'],
    bulb: ['M9 18h6', 'M10 22h4', 'M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z'],
    filter: ['M22 3H2l8 9.5V19l4 2v-8.5z'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    database: ['M3 5c0-1.7 4-3 9-3s9 1.3 9 3-4 3-9 3-9-1.3-9-3z', 'M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5', 'M3 12c0 1.7 4 3 9 3s9-1.3 9-3'],
    wand: ['M15 4V2', 'M15 16v-2', 'M8 9h2', 'M20 9h2', 'M17.8 11.8L19 13', 'M17.8 6.2L19 5', 'M3 21l9-9', 'M12.2 6.2L11 5'],
    rocket: ['M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z', 'M12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z', 'M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0', 'M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5'],
    handshake: ['M11 17l2 2a1 1 0 1 0 3-3', 'M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5 5 0 0 1 6.1-.8l.5.3a2 2 0 0 0 1.4.3L21 4', 'M21 3l1 11h-2', 'M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3', 'M3 4h8'],
    pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'c:12,10,3'],
    thumbUp: ['M7 10v12', 'M15 5.9L14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 7A2 2 0 0 1 17.5 21H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z'],
    ban: ['c:12,12,10', 'M4.9 4.9l14.2 14.2'],
    circle: ['c:12,12,9'],
    dot: ['c:12,12,3'],
    arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  };
  function icon(name, size, cls) {
    const spec = ICONS[name] || ICONS.circle;
    const s = svgEl('svg', {
      width: size || 16, height: size || 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', class: cls || null,
    });
    for (const p of spec) {
      if (p.startsWith('c:')) { const [cx, cy, r] = p.slice(2).split(','); s.appendChild(svgEl('circle', { cx, cy, r })); }
      else if (p.startsWith('r:')) { const [x, y, w, hh, rx] = p.slice(2).split(','); s.appendChild(svgEl('rect', { x, y, width: w, height: hh, rx: rx || 0 })); }
      else if (p.startsWith('p:')) s.appendChild(svgEl('polygon', { points: p.slice(2) }));
      else s.appendChild(svgEl('path', { d: p }));
    }
    return s;
  }

  /* ------------------------------------------------------------ UI layer */
  const ui = {};
  let toastHost;
  ui.toast = function (msg, kind) {
    if (!toastHost) { toastHost = h('div', { class: 'toast-host', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(toastHost); }
    const t = h('div', { class: 'toast ' + (kind || 'good') }, icon(kind === 'bad' ? 'alert' : kind === 'info' ? 'info' : 'check', 16), msg);
    toastHost.appendChild(t);
    setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, kind === 'bad' ? 4200 : 2600);
  };

  const stack = [];
  function openLayer(cls, opts) {
    const overlay = h('div', { class: 'overlay' });
    const box = h('div', { class: cls + (opts.wide ? ' wide' : ''), role: 'dialog', 'aria-modal': 'true', 'aria-label': typeof opts.title === 'string' ? opts.title : 'Dialog' });
    const closeBtn = h('button', { class: 'btn ghost icon', 'aria-label': 'Close', onclick: () => api.close() }, icon('x', 18));
    const head = h('div', { class: 'drawer-h' }, opts.icon ? h('div', { class: 'icon-box ' + (opts.iconClass || '') }, icon(opts.icon, 18)) : null,
      h('h2', null, opts.title || ''), opts.headerExtra || null, closeBtn);
    const body = h('div', { class: 'drawer-b' });
    append(body, [opts.body]);
    const foot = opts.footer ? h('div', { class: 'drawer-f' }, opts.footer) : null;
    append(box, [head, body, foot]);
    document.body.append(overlay, box);
    document.body.style.overflow = 'hidden';
    const api = {
      el: box, body, foot,
      close() {
        overlay.remove(); box.remove();
        const i = stack.indexOf(api); if (i > -1) stack.splice(i, 1);
        if (!stack.length) document.body.style.overflow = '';
        if (opts.onClose) opts.onClose();
      },
      setFooter(nodes) { if (api.foot) { clear(api.foot); append(api.foot, [nodes]); } },
    };
    overlay.addEventListener('click', () => { if (!opts.sticky) api.close(); });
    stack.push(api);
    setTimeout(() => { const f = box.querySelector('input,textarea,select,button.primary'); if (f && opts.autofocus !== false) f.focus(); }, 40);
    return api;
  }
  ui.drawer = (opts) => openLayer('drawer', opts);
  ui.modal = (opts) => openLayer('modal', opts);
  ui.closeTop = () => { if (stack.length) stack[stack.length - 1].close(); };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && stack.length) ui.closeTop(); });

  ui.confirm = function ({ title, message, okText, danger, cancelText }) {
    return new Promise((resolve) => {
      let done = false;
      const m = ui.modal({
        title: title || 'Are you sure?', body: h('p', { class: 'text-2' }, message || ''),
        footer: [
          h('button', { class: 'btn ghost', onclick: () => { done = true; m.close(); resolve(false); } }, cancelText || 'Cancel'),
          h('button', { class: 'btn ' + (danger ? 'danger' : 'primary'), onclick: () => { done = true; m.close(); resolve(true); } }, okText || 'Confirm'),
        ],
        onClose: () => { if (!done) resolve(false); },
      });
    });
  };

  ui.copy = async function (text, label) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else throw new Error('no clipboard');
    } catch (e) {
      const ta = h('textarea', { style: { position: 'fixed', left: '-9999px', top: '0' } }); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e2) { ui.toast('Copy failed - select the text and press Ctrl+C', 'bad'); ta.remove(); return; }
      ta.remove();
    }
    ui.toast((label || 'Copied') + ' to clipboard');
  };
  ui.copyBtn = (getText, label, cls) => h('button', { class: 'btn ' + (cls || 'sm'), onclick: (e) => { e.stopPropagation(); ui.copy(typeof getText === 'function' ? getText() : getText, label); } }, icon('copy', 14), label ? 'Copy' : 'Copy');

  ui.download = function (filename, content, mime) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const a = h('a', { href: URL.createObjectURL(blob), download: filename });
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
    ui.toast('Downloaded ' + filename);
  };

  ui.pickFile = function (accept) {
    return new Promise((resolve) => {
      const inp = h('input', { type: 'file', accept: accept || '*/*', style: { display: 'none' } });
      inp.addEventListener('change', () => { resolve(inp.files[0] || null); inp.remove(); });
      document.body.appendChild(inp); inp.click();
    });
  };
  ui.readText = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsText(file); });
  ui.readBuffer = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsArrayBuffer(file); });

  /* tooltip: any element with data-tip (HTML allowed - callers must escape) */
  let tipEl;
  function showTip(target, x, y) {
    if (!tipEl) { tipEl = h('div', { class: 'tooltip', role: 'tooltip' }); document.body.appendChild(tipEl); }
    tipEl.innerHTML = target.getAttribute('data-tip');
    tipEl.hidden = false;
    const r = tipEl.getBoundingClientRect();
    let left = x + 14, top = y + 14;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top + r.height > window.innerHeight - 8) top = y - r.height - 14;
    tipEl.style.left = Math.max(8, left) + 'px'; tipEl.style.top = Math.max(8, top) + 'px';
  }
  document.addEventListener('mousemove', (e) => {
    const t = e.target.closest && e.target.closest('[data-tip]');
    if (t) showTip(t, e.clientX, e.clientY); else if (tipEl) tipEl.hidden = true;
  });
  document.addEventListener('focusin', (e) => {
    const t = e.target.closest && e.target.closest('[data-tip]');
    if (t) { const r = t.getBoundingClientRect(); showTip(t, r.left + r.width / 2, r.bottom); }
  });
  document.addEventListener('focusout', () => { if (tipEl) tipEl.hidden = true; });

  /* form helpers */
  ui.field = function (label, input, hint, cls) {
    return h('div', { class: 'field ' + (cls || '') }, label ? h('label', null, label) : null, input, hint ? h('div', { class: 'hint' }, hint) : null);
  };
  ui.input = function (value, onChange, attrs) {
    const el = h('input', Object.assign({ type: 'text', value: value == null ? '' : value }, attrs || {}));
    el.addEventListener('input', () => onChange(el.type === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value));
    return el;
  };
  ui.textarea = function (value, onChange, attrs) {
    const el = h('textarea', Object.assign({}, attrs || {}));
    el.value = value || '';
    el.addEventListener('input', () => onChange(el.value));
    return el;
  };
  ui.select = function (value, options, onChange, attrs) {
    const el = h('select', attrs || {}, options.map((o) => {
      const v = typeof o === 'object' ? o.value : o, l = typeof o === 'object' ? o.label : o;
      return h('option', { value: v, selected: String(v) === String(value) }, l);
    }));
    el.addEventListener('change', () => onChange(el.value));
    return el;
  };
  ui.switch = function (checked, onChange, label) {
    const inp = h('input', { type: 'checkbox', checked });
    inp.addEventListener('change', () => onChange(inp.checked));
    const sw = h('label', { class: 'switch' }, inp, h('span', { class: 'track' }));
    return label ? h('label', { class: 'check' }, sw, label) : sw;
  };

  /* Tag input with suggestions. getSuggestions(q) -> [{label, sub}] */
  ui.tagInput = function ({ values, onChange, getSuggestions, placeholder, chipClass }) {
    let vals = (values || []).slice();
    const wrap = h('div', { class: 'tag-input' });
    const input = h('input', { type: 'text', placeholder: placeholder || 'Type and press Enter' });
    let box = null, active = -1, items = [];
    function render() {
      clear(wrap);
      vals.forEach((v, i) => wrap.appendChild(h('span', { class: 'chip ' + (chipClass ? chipClass(v) : 'accent') }, v,
        h('span', { class: 'x', role: 'button', 'aria-label': 'Remove ' + v, onclick: () => { vals.splice(i, 1); onChange(vals.slice()); render(); input.focus(); } }, '×'))));
      wrap.appendChild(input);
    }
    function add(v) {
      v = String(v || '').trim(); if (!v) return;
      if (!vals.some((x) => x.toLowerCase() === v.toLowerCase())) { vals.push(v); onChange(vals.slice()); }
      input.value = ''; closeBox(); render(); input.focus();
    }
    function closeBox() { if (box) { box.remove(); box = null; } active = -1; }
    function openBox() {
      closeBox();
      const q = input.value.trim(); if (!q || !getSuggestions) return;
      items = getSuggestions(q).filter((s) => !vals.includes(s.label)).slice(0, 8);
      if (!items.length) return;
      box = h('div', { class: 'suggest' }, items.map((s, i) => h('div', { class: i === active ? 'active' : '', onmousedown: (e) => { e.preventDefault(); add(s.label); } }, s.label, s.sub ? h('small', null, s.sub) : null)));
      wrap.appendChild(box);
    }
    input.addEventListener('input', () => { active = -1; openBox(); });
    input.addEventListener('blur', () => setTimeout(closeBox, 120));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); active = (active + 1) % items.length; openBox(); }
      else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); active = (active - 1 + items.length) % items.length; openBox(); }
      else if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
        if (input.value.trim()) { e.preventDefault(); add(active > -1 && items[active] ? items[active].label : input.value.replace(/,$/, '')); }
      } else if (e.key === 'Backspace' && !input.value && vals.length) { vals.pop(); onChange(vals.slice()); render(); input.focus(); }
    });
    wrap.addEventListener('click', (e) => { if (e.target === wrap) input.focus(); });
    render();
    return wrap;
  };

  ui.empty = function (iconName, title, text, actions) {
    return h('div', { class: 'empty' }, h('div', { class: 'icon-box' }, icon(iconName, 22)), h('h3', null, title), text ? h('p', null, text) : null,
      actions ? h('div', { class: 'row', style: { justifyContent: 'center' } }, actions) : null);
  };
  ui.callout = function (kind, iconName, content) {
    return h('div', { class: 'callout ' + (kind || '') }, icon(iconName || 'info', 18), h('div', { class: 'grow' }, content));
  };
  ui.tabs = function (tabs, active, onPick) {
    return h('div', { class: 'tabs', role: 'tablist' }, tabs.map((t) => h('button', {
      class: 'tab' + (t.id === active ? ' active' : ''), role: 'tab', 'aria-selected': t.id === active ? 'true' : 'false', onclick: () => onPick(t.id),
    }, t.icon ? icon(t.icon, 15) : null, t.label, t.count != null ? h('span', { class: 'count' }, t.count) : null)));
  };
  ui.scoreBadge = function (score, tip) {
    if (score == null || score === '' || isNaN(score)) return h('span', { class: 'score na' }, '--');
    const cls = score >= 75 ? 'hi' : score >= 55 ? 'mid' : 'lo';
    return h('span', { class: 'score ' + cls, 'data-tip': tip ? esc(tip) : null }, Math.round(score) + '%');
  };
  ui.pips = function (n, max, cls) {
    return h('span', { class: 'pips ' + (cls || '') }, Array.from({ length: max || 3 }, (_, i) => h('i', { class: i < n ? 'on' : '' })));
  };
  ui.linkTile = function (name, url, sub, iconName) {
    return h('a', { class: 'link-tile', href: url, target: '_blank', rel: 'noopener noreferrer' },
      h('div', { class: 'icon-box neutral', style: { width: '30px', height: '30px', borderRadius: '8px' } }, icon(iconName || 'globe', 15)),
      h('div', { class: 'grow' }, h('div', { class: 'ellipsis' }, name), sub ? h('small', { class: 'ellipsis' }, sub) : null), icon('external', 14));
  };
  ui.codeblock = function (text, label) {
    return h('div', { class: 'codeblock' }, h('pre', null, text), h('button', { class: 'btn sm', onclick: () => ui.copy(text, label || 'Copied') }, icon('copy', 13), 'Copy'));
  };
  ui.avatar = function (name, seed) {
    const colors = ['var(--s1)', 'var(--s7)', 'var(--s3)', 'var(--s2)', 'var(--s5)', 'var(--s6)', 'var(--s8)', 'var(--s4)'];
    let hsh = 0; for (const c of String(seed || name || '')) hsh = (hsh * 31 + c.charCodeAt(0)) >>> 0;
    return h('div', { class: 'avatar', style: { background: colors[hsh % colors.length] } }, initials(name));
  };

  /* ------------------------------------------------------- tiny markdown */
  function md(src) {
    const lines = String(src || '').replace(/\r/g, '').split('\n');
    let out = '', inList = null, inTable = false, para = [];
    const inline = (s) => esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
    const flushPara = () => { if (para.length) { out += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };
    const closeList = () => { if (inList) { out += '</' + inList + '>'; inList = null; } };
    const closeTable = () => { if (inTable) { out += '</tbody></table></div>'; inTable = false; } };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^```/.test(line)) {
        flushPara(); closeList(); closeTable();
        let code = ''; i++;
        while (i < lines.length && !/^```/.test(lines[i])) { code += lines[i] + '\n'; i++; }
        out += '<pre class="pre mono">' + esc(code) + '</pre>'; continue;
      }
      const hm = line.match(/^(#{1,4})\s+(.*)$/);
      if (hm) { flushPara(); closeList(); closeTable(); const lvl = Math.min(hm[1].length, 3); out += '<h' + lvl + '>' + inline(hm[2]) + '</h' + lvl + '>'; continue; }
      if (/^\s*\|.*\|\s*$/.test(line)) {
        flushPara(); closeList();
        const cells = line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue;
        if (!inTable) { out += '<div class="table-wrap" style="margin:8px 0"><table class="table"><thead><tr>' + cells.map((c) => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>'; inTable = true; continue; }
        out += '<tr>' + cells.map((c) => '<td>' + inline(c) + '</td>').join('') + '</tr>'; continue;
      } else if (inTable) { out += '</tbody></table></div>'; inTable = false; }
      const li = line.match(/^\s*([-*+]|\d+[.)])\s+(.*)$/);
      if (li) {
        flushPara(); const type = /\d/.test(li[1]) ? 'ol' : 'ul';
        if (inList !== type) { closeList(); out += '<' + type + '>'; inList = type; }
        out += '<li>' + inline(li[2]) + '</li>'; continue;
      }
      if (/^\s*$/.test(line)) { flushPara(); closeList(); continue; }
      if (/^---+$/.test(line.trim())) { flushPara(); closeList(); out += '<hr>'; continue; }
      if (inList) closeList();
      para.push(line.trim());
    }
    flushPara(); closeList(); if (inTable) out += '</tbody></table></div>';
    return out;
  }

  /* Extract the last JSON object/array from text (fenced or bare). */
  function extractJSON(text) {
    if (!text) return null;
    const fences = [...String(text).matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)].map((m) => m[1]);
    const candidates = fences.length ? fences.reverse() : [];
    for (const c of candidates) { try { return JSON.parse(c.trim()); } catch (e) { /* try next */ } }
    const s = String(text).trim();
    try { return JSON.parse(s); } catch (e) { /* fall through */ }
    const first = Math.min(...['{', '['].map((ch) => { const i = s.indexOf(ch); return i < 0 ? Infinity : i; }));
    if (first === Infinity) return null;
    for (let end = s.length; end > first; end--) {
      const ch = s[end - 1]; if (ch !== '}' && ch !== ']') continue;
      try { return JSON.parse(s.slice(first, end)); } catch (e) { /* keep shrinking */ }
    }
    return null;
  }

  const add = (el, ...kids) => append(el, kids);
  Object.assign(WP, { h, svgEl, append, add, clear, esc, $, $$, debounce, uid, clamp, slug, initials, plural, pct, uniq, money, d, icon, ui, md, extractJSON, ICONS });
})();
