/* Approval Queue - every proposed step waits here for the user's decision. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, d } = WP;
  const S = WP.shared;
  const state = { tab: 'pending', type: 'all', source: 'all', selected: new Set() };

  WP.views.queue = {
    title: 'Approval Queue',
    render(root, route) {
      const st = WP.store.state; const E = WP.engine;
      if (route.query.tab) state.tab = route.query.tab;
      const byStatus = (s) => st.actions.filter((a) => (s === 'history' ? a.status === 'done' || a.status === 'rejected' : a.status === s));
      const pending = byStatus('pending'), ready = byStatus('approved'), hist = byStatus('history');
      const weekStart = d.weekStart();
      const doneWeek = st.actions.filter((a) => a.status === 'done' && (a.doneAt || '').slice(0, 10) >= weekStart).length;

      WP.add(root, S.pageHead({
        eyebrow: 'You decide', title: 'Approval Queue',
        desc: 'Everything the planner' + (S.isClaude() ? ', Claude' : '') + ' or Claude Code wants to do lands here first. Approve, edit or dismiss. Approved items move to "Ready to do" with a one-click guided flow.',
        actions: [h('button', { class: 'btn', onclick: () => { const n = E.planner.run(st); ui.toast(n ? n + ' new proposal' + (n === 1 ? '' : 's') : 'No new proposals right now', n ? 'good' : 'info'); WP.app.refresh(); } }, icon('wand', 15), 'Run planner')],
      }));
      const assist = S.assist('weekly-plan', () => ({}), { compact: true }); if (assist) WP.add(root, h('div', { class: 'mb' }, assist));

      const typeCounts = {}; pending.forEach((a) => { typeCounts[a.type] = (typeCounts[a.type] || 0) + 1; });
      const tier = (a) => (E.ACTION_META[a.type] || E.ACTION_META.custom).tier;
      WP.add(root, h('div', { class: 'grid g4' },
        tile('Needs approval', pending.length, 'inbox', 'Proposals waiting for your decision'),
        tile('Ready to do', ready.length, 'play', 'Approved - click "Do it now"'),
        tile('Done this week', doneWeek, 'check', 'Completed actions since Monday'),
        h('div', { class: 'card kpi' }, h('div', { class: 'label' }, icon('shield', 14), 'Pending by risk'),
          C3([['Safe', pending.filter((a) => tier(a) === 1).length, 'var(--good)'], ['Records', pending.filter((a) => tier(a) === 2).length, 'var(--warn)'], ['Leaves PC', pending.filter((a) => tier(a) === 3).length, 'var(--critical)']]))));

      WP.add(root, h('div', { class: 'mt' }, ui.tabs([
        { id: 'pending', label: 'Needs approval', count: pending.length, icon: 'inbox' },
        { id: 'approved', label: 'Ready to do', count: ready.length, icon: 'play' },
        { id: 'history', label: 'History', count: hist.length, icon: 'clock' },
      ], state.tab, (t) => { state.tab = t; state.selected.clear(); WP.app.refresh(); })));

      let list = state.tab === 'pending' ? pending : state.tab === 'approved' ? ready : hist.slice().sort((a, b) => (b.decidedAt || '').localeCompare(a.decidedAt || ''));
      const types = WP.uniq(list.map((a) => a.type));
      const sources = WP.uniq(list.map((a) => a.source));
      if (state.type !== 'all' && !types.includes(state.type)) state.type = 'all';
      if (state.source !== 'all' && !sources.includes(state.source)) state.source = 'all';
      list = list.filter((a) => (state.type === 'all' || a.type === state.type) && (state.source === 'all' || a.source === state.source));

      if (types.length > 1 || sources.length > 1) {
        WP.add(root, h('div', { class: 'row mb' },
          h('div', { class: 'pill-nav' }, h('span', { class: 'chip' + (state.type === 'all' ? ' active' : ''), onclick: () => { state.type = 'all'; WP.app.refresh(); } }, 'All types'),
            types.map((t) => h('span', { class: 'chip' + (state.type === t ? ' active' : ''), onclick: () => { state.type = t; WP.app.refresh(); } }, icon((E.ACTION_META[t] || E.ACTION_META.custom).icon, 12), (E.ACTION_META[t] || E.ACTION_META.custom).label))),
          sources.length > 1 ? h('div', { class: 'pill-nav' }, h('span', { class: 'chip' + (state.source === 'all' ? ' active' : ''), onclick: () => { state.source = 'all'; WP.app.refresh(); } }, 'All sources'),
            sources.map((s) => h('span', { class: 'chip' + (state.source === s ? ' active' : ''), onclick: () => { state.source = s; WP.app.refresh(); } }, s === 'claude-code' ? 'Claude Code' : s === 'claude' ? 'Claude' : s === 'user' ? 'You' : 'Planner'))) : null));
      }

      const layout = h('div', { class: 'split' });
      const colMain = h('div'); const colSide = h('div', { class: 'stack-lg' });
      WP.add(layout, colMain, colSide); WP.add(root, layout);

      if (state.tab === 'pending' && list.length) {
        const selCount = list.filter((a) => state.selected.has(a.id)).length;
        WP.add(colMain, h('div', { class: 'card tight row between mb', style: { position: 'sticky', top: 'calc(var(--header-h) + 8px)', zIndex: 5 } },
          h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: selCount === list.length, onchange: (e) => { list.forEach((a) => (e.target.checked ? state.selected.add(a.id) : state.selected.delete(a.id))); WP.app.refresh(); } }), selCount ? selCount + ' selected' : 'Select all'),
          h('div', { class: 'row' },
            h('button', { class: 'btn sm', onclick: () => { const safe = list.filter((a) => tier(a) === 1); safe.forEach((a) => S.approve(a, { silent: true })); WP.store.save(); ui.toast(safe.length + ' safe actions approved'); WP.app.refresh(); }, 'data-tip': 'Approves only Tier-1 actions: research, drafts, prep. Nothing leaves your computer.' }, icon('shield', 13), 'Approve all safe'),
            h('button', { class: 'btn good sm', disabled: !selCount, onclick: () => { list.filter((a) => state.selected.has(a.id)).forEach((a) => S.approve(a, { silent: true })); state.selected.clear(); WP.store.save(); ui.toast('Approved ' + selCount); WP.app.refresh(); } }, icon('check', 13), 'Approve selected'),
            h('button', { class: 'btn sm', disabled: !selCount, onclick: () => { list.filter((a) => state.selected.has(a.id)).forEach((a) => S.reject(a, { silent: true })); state.selected.clear(); WP.store.save(); ui.toast('Dismissed ' + selCount, 'info'); WP.app.refresh(); } }, icon('x', 13), 'Dismiss selected'))));
      }
      if (!list.length) {
        WP.add(colMain, h('div', { class: 'card' }, state.tab === 'pending'
          ? ui.empty('check', 'Nothing waiting for approval', 'Run the planner to turn your goals and pipeline into concrete next steps' + (S.isClaude() ? ', or ask Claude to plan your week.' : '.'), [h('button', { class: 'btn primary', onclick: () => { const n = E.planner.run(st); ui.toast(n ? n + ' new proposals' : 'No new proposals right now', n ? 'good' : 'info'); WP.app.refresh(); } }, icon('wand', 14), 'Run planner')])
          : state.tab === 'approved' ? ui.empty('play', 'Nothing ready', 'Approved actions appear here with a guided "Do it now" flow.') : ui.empty('clock', 'No history yet', 'Completed and dismissed actions are kept here.')));
      } else {
        list.slice(0, 80).forEach((a) => WP.add(colMain, S.actionCard(a, { selectable: state.tab === 'pending', selected: state.selected.has(a.id), onToggle: (on) => { if (on) state.selected.add(a.id); else state.selected.delete(a.id); WP.app.refresh(); } })));
        if (list.length > 80) WP.add(colMain, h('p', { class: 'muted small center mt' }, 'Showing 80 of ' + list.length));
      }

      const au = st.settings.autonomy;
      const row = (label, val, locked) => h('div', { class: 'row between small', style: { padding: '6px 0', borderBottom: '1px solid var(--border)' } }, h('span', null, label),
        h('span', { class: 'chip ' + (val === 'auto' ? 'match' : locked ? 'miss' : 'warn') }, locked ? icon('lock', 11) : null, val === 'auto' ? 'Automatic' : locked ? 'You do final step' : 'Asks first'));
      WP.add(colSide, 
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('shieldCheck', 16), 'Your permissions'), h('a', { href: '#/settings', class: 'small' }, 'Change')),
          row('Research', au.research), row('Drafts (resume, letters)', au.drafts), row('Save found jobs/people', au.saveItems), row('Send messages', 'ask', true), row('Submit applications', 'ask', true), row('Follow-ups', au.followups, true)),
        h('div', { class: 'card' }, h('h3', null, 'Where proposals come from'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
          h('li', null, h('b', null, 'Planner: '), 'rules based on your goals, match scores, contacts and dates.'),
          h('li', null, h('b', null, 'Claude: '), 'results you import or run in With Claude mode.'),
          h('li', null, h('b', null, 'Claude Code: '), 'imported from claude-workspace/data.'))),
        typeCounts && Object.keys(typeCounts).length ? h('div', { class: 'card' }, h('h3', null, 'Pending by type'), h('div', { class: 'mt-sm' }, WP.charts.barH(Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([t, n], i) => ({ label: (E.ACTION_META[t] || E.ACTION_META.custom).label, value: n, color: WP.charts.SERIES[0] })), { labelWidth: 110, valueWidth: 30 }))) : null);
    },
  };
  function tile(label, v, ic, tip) { return h('div', { class: 'card kpi', 'data-tip': tip }, h('div', { class: 'label' }, icon(ic, 14), label), h('div', { class: 'value' }, v)); }
  function C3(parts) {
    const total = parts.reduce((a, p) => a + p[1], 0) || 1;
    return h('div', null, h('div', { style: { display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', gap: '2px', margin: '10px 0 8px', background: 'var(--surface-3)' } },
      parts.filter((p) => p[1]).map((p) => h('div', { style: { width: (p[1] / total) * 100 + '%', background: p[2] }, 'data-tip': p[0] + ': ' + p[1] }))),
      h('div', { class: 'legend', style: { marginTop: 0 } }, parts.map((p) => h('span', null, h('i', { style: { background: p[2] } }), p[0] + ' ' + p[1]))));
  }
})();
