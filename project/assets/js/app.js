/* Waypoint app shell: router, navigation, mode tabs, theme. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, $, clear } = WP;
  WP.views = WP.views || {};

  const NAV = [
    { group: null, items: [
      { id: 'start', label: 'Start Here', icon: 'compass' },
      { id: 'dashboard', label: 'Command Center', icon: 'grid' },
      { id: 'queue', label: 'Approval Queue', icon: 'inbox', count: (st) => st.actions.filter((a) => a.status === 'pending').length, hot: true },
    ] },
    { group: 'Prepare', items: [
      { id: 'profile', label: 'Profile & Resume', icon: 'user' },
      { id: 'market', label: 'Market & Targets', icon: 'target' },
    ] },
    { group: 'Find', items: [
      { id: 'jobs', label: 'Job Discovery', icon: 'search', count: (st) => st.jobs.filter((j) => j.status === 'saved').length },
      { id: 'network', label: 'People & Network', icon: 'users', count: (st) => st.contacts.filter((c) => c.status === 'to-contact').length },
    ] },
    { group: 'Apply', items: [
      { id: 'resume', label: 'Resume Studio', icon: 'file' },
      { id: 'outreach', label: 'Outreach', icon: 'chat' },
      { id: 'tracker', label: 'Applications', icon: 'kanban', count: (st) => st.jobs.filter((j) => ['applied', 'screening', 'interview'].includes(j.status)).length },
      { id: 'autofill', label: 'Autofill Kit', icon: 'zap' },
    ] },
    { group: 'Win', items: [
      { id: 'interview', label: 'Interview Prep', icon: 'mic' },
      { id: 'offers', label: 'Offers & Negotiation', icon: 'dollar' },
    ] },
    { group: 'System', items: [
      { id: 'claude', label: 'Claude Hub', icon: 'sparkles', claudeOnly: true },
      { id: 'settings', label: 'Data & Settings', icon: 'sliders' },
    ] },
  ];

  const app = (WP.app = { route: null });
  function parse() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    const parts = (path || '').split('/').filter(Boolean).map(decodeURIComponent);
    const query = {}; new URLSearchParams(qs || '').forEach((v, k) => { query[k] = v; });
    const st = WP.store.state;
    const def = st.meta.onboarded || st.jobs.length || st.profile.name ? 'dashboard' : 'start';
    return { name: parts[0] || def, parts: parts.slice(1), query, raw };
  }

  function applyTheme() {
    const t = WP.store.state.settings.theme;
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    const btn = $('#theme-btn'); if (btn) { clear(btn); btn.appendChild(icon(document.documentElement.getAttribute('data-theme') === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'sun' : 'moon', 18)); }
  }
  function applyMode() {
    const m = WP.store.state.settings.mode;
    document.body.classList.toggle('mode-claude', m === 'claude');
    WP.$$('.mode-tab').forEach((b) => { b.classList.toggle('active', b.dataset.mode === m); b.setAttribute('aria-selected', b.dataset.mode === m ? 'true' : 'false'); });
  }
  app.setMode = function (m) {
    WP.store.state.settings.mode = m; WP.store.save(); applyMode(); renderNav();
    if (app.route && (app.route.name === 'start' || app.route.name === 'claude')) app.refresh();
    else app.refresh();
    WP.ui.toast(m === 'claude' ? 'With Claude mode: Claude actions appear on every page' : 'Standalone mode: everything runs offline in your browser', 'info');
  };

  function renderHeader() {
    const hdr = $('#app-header'); clear(hdr);
    const st = WP.store.state;
    WP.add(hdr, 
      h('button', { class: 'btn ghost icon menu-btn', 'aria-label': 'Menu', onclick: () => document.body.classList.toggle('nav-open') }, icon('menu', 20)),
      h('a', { class: 'brand', href: '#/start' }, h('span', { class: 'brand-mark' }, icon('compass', 18)), h('span', null, 'Waypoint', h('small', null, 'Job search copilot'))),
      h('div', { class: 'mode-tabs', role: 'tablist', 'aria-label': 'How do you want to use Waypoint?' },
        h('button', { class: 'mode-tab', role: 'tab', 'data-mode': 'standalone', onclick: () => app.setMode('standalone'), 'data-tip': 'Everything runs offline in your browser - no account or AI needed' }, icon('compass', 16), 'Standalone', h('span', { class: 'sub' }, 'no Claude needed')),
        h('button', { class: 'mode-tab', role: 'tab', 'data-mode': 'claude', onclick: () => app.setMode('claude'), 'data-tip': 'Adds Claude-powered research, writing and planning on every page' }, icon('sparkles', 16), 'With Claude', h('span', { class: 'sub' }, 'AI-powered'))),
      h('div', { class: 'header-spacer' }),
      st.meta.demo ? h('span', { class: 'chip warn', 'data-tip': 'You are exploring sample data. Clear it in Data & Settings when you are ready.' }, 'Demo data') : null,
      !WP.store.storageOK ? h('span', { class: 'chip miss', 'data-tip': 'This browser is blocking storage - export your data regularly.' }, icon('alert', 12), 'Not saving') : null,
      h('button', { id: 'theme-btn', class: 'btn ghost icon', 'aria-label': 'Toggle theme', onclick: () => {
        const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        WP.store.state.settings.theme = cur === 'dark' ? 'light' : 'dark'; WP.store.save(); applyTheme();
      } }));
    applyTheme(); applyMode();
  }

  function renderNav() {
    const nav = $('#sidebar'); clear(nav);
    const st = WP.store.state; const mode = st.settings.mode; const cur = app.route ? app.route.name : '';
    NAV.forEach((g) => {
      const items = g.items.filter((it) => !it.claudeOnly || mode === 'claude');
      if (!items.length) return;
      nav.appendChild(h('div', { class: 'nav-group' }, g.group ? h('div', { class: 'nav-group-title' }, g.group) : null,
        items.map((it) => {
          const n = it.count ? it.count(st) : 0;
          const active = cur === it.id || (it.id === 'jobs' && cur === 'apply');
          return h('a', { class: 'nav-item' + (active ? ' active' : ''), href: '#/' + it.id, 'aria-current': active ? 'page' : null, onclick: () => document.body.classList.remove('nav-open') },
            icon(it.icon, 17), it.label, n ? h('span', { class: 'count' + (it.hot ? ' hot' : '') }, n) : null);
        })));
    });
    nav.appendChild(h('div', { class: 'card flat tight', style: { margin: '14px 4px 0', fontSize: '12px' } },
      h('div', { class: 'row', style: { gap: '6px', fontWeight: 650 } }, icon('shieldCheck', 14), 'Private by design'),
      h('div', { class: 'muted', style: { marginTop: '4px' } }, 'Your data stays in this browser. Nothing is sent or submitted without your approval.')));
  }
  app.renderNav = renderNav;

  function render(keepScroll) {
    const route = parse();
    const changed = !app.route || app.route.raw !== route.raw;
    app.route = route;
    const meta = WP.store.state.meta; meta.visited = meta.visited || {};
    if (!meta.visited[route.name]) { meta.visited[route.name] = WP.d.today(); WP.store.save(); }
    const main = $('#main'); const y = window.scrollY;
    clear(main);
    const view = WP.views[route.name] || WP.views.start;
    const page = h('div', { class: 'page' });
    main.appendChild(page);
    try { view.render(page, route); }
    catch (err) {
      console.error(err);
      page.appendChild(WP.ui.callout('critical', 'alert', [h('b', null, 'Something went wrong rendering this page. '), String(err && err.message || err), h('div', { class: 'small mt-sm' }, 'Your data is safe. Try another page, or export your data from Data & Settings.')]));
    }
    renderNav();
    document.title = (view.title ? view.title + ' - ' : '') + 'Waypoint';
    if (changed && !keepScroll) window.scrollTo(0, 0); else window.scrollTo(0, y);
  }
  app.refresh = () => render(true);
  app.go = (path) => { location.hash = '#/' + path; };

  function init() {
    WP.store.init();
    const st = WP.store.state;
    WP.engine.refreshMatches(st);
    renderHeader();
    window.addEventListener('hashchange', () => render(false));
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    WP.store.on(() => renderNav());
    render(false);
    if (!WP.K || !WP.K.skills || !WP.K.skills.length) WP.ui.toast('Knowledge base did not load - matching will be limited', 'bad');
  }
  app.renderHeader = renderHeader;
  document.addEventListener('DOMContentLoaded', init);
})();
