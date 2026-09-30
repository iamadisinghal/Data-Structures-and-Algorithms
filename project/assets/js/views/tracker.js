/* Applications tracker - kanban & table. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, d } = WP;
  const S = WP.shared;
  const view = { mode: 'board', sort: 'updated', dir: -1 };

  function card(j, st) {
    const contacts = st.contacts.filter((c) => j.companyId && c.companyId === j.companyId).length;
    const age = j.appliedAt ? d.diff(j.appliedAt) : d.diff(j.createdAt);
    const overdue = j.nextActionDate && j.nextActionDate < d.today();
    const stale = j.status === 'applied' && j.appliedAt && d.diff(j.appliedAt) > 21;
    const el = h('div', { class: 'kcard', draggable: 'true', onclick: () => S.jobDrawer(j.id), 'data-id': j.id },
      h('div', { class: 'row between', style: { flexWrap: 'nowrap', alignItems: 'flex-start' } }, h('div', { style: { minWidth: 0 } }, h('div', { class: 't' }, j.title), h('div', { class: 'c' }, j.company)), ui.scoreBadge(j.match)),
      h('div', { class: 'm' },
        h('span', { 'data-tip': j.appliedAt ? 'Applied ' + d.fmtLong(j.appliedAt) : 'Saved ' + d.fmtLong(j.createdAt) }, icon('clock', 11), ' ' + (age != null ? age + 'd' : '-')),
        j.resumeId ? h('span', { 'data-tip': 'Tailored resume saved' }, icon('file', 11), ' resume') : null,
        j.coverLetterId ? h('span', { 'data-tip': 'Cover letter saved' }, icon('mail', 11)) : null,
        contacts ? h('span', { 'data-tip': contacts + ' contact(s) at this company' }, icon('users', 11), ' ' + contacts) : null,
        j.nextActionDate ? h('span', { class: 'chip ' + (overdue ? 'miss' : ''), style: { padding: '0 6px', fontSize: '11px' }, 'data-tip': WP.esc(j.nextAction || 'Next step') }, d.rel(j.nextActionDate)) : null,
        stale ? h('span', { class: 'chip warn', style: { padding: '0 6px', fontSize: '11px' }, 'data-tip': 'No update in 3+ weeks - follow up once more, then move on' }, 'stale') : null));
    el.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', j.id); el.classList.add('dragging'); });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
    return el;
  }

  function board(box, st) {
    const cols = S.JOB_STATUSES;
    WP.add(box, h('div', { class: 'kanban' }, cols.map((s) => {
      const jobs = st.jobs.filter((j) => j.status === s.id).sort((a, b) => (b.match || 0) - (a.match || 0));
      const col = h('div', { class: 'kanban-col', 'data-status': s.id },
        h('div', { class: 'kanban-col-h' }, h('span', { class: 'status-dot', style: { background: s.color } }), s.label, h('span', { class: 'count' }, jobs.length)),
        jobs.map((j) => card(j, st)),
        !jobs.length ? h('div', { class: 'small muted center', style: { padding: '18px 6px' } }, s.id === 'saved' ? 'Save jobs from Job Discovery' : 'Drag cards here') : null);
      col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drop-target'); });
      col.addEventListener('dragleave', () => col.classList.remove('drop-target'));
      col.addEventListener('drop', (e) => {
        e.preventDefault(); col.classList.remove('drop-target');
        const id = e.dataTransfer.getData('text/plain'); const j = WP.store.get('jobs', id);
        if (j && j.status !== s.id) { S.setJobStatus(j, s.id); WP.app.refresh(); }
      });
      return col;
    })));
    WP.add(box, h('p', { class: 'small muted mt-sm' }, 'Drag a card to change its stage (on touch devices, tap a card and use "Move to stage"). Moving to Applied schedules a follow-up in 7 days.'));
  }

  function table(box, st) {
    const cols = [['title', 'Role'], ['company', 'Company'], ['status', 'Stage'], ['match', 'Match'], ['appliedAt', 'Applied'], ['nextActionDate', 'Next step'], ['updated', 'Updated']];
    const val = (j, k) => (k === 'updated' ? j.updatedAt : k === 'status' ? S.JOB_STATUSES.findIndex((s) => s.id === j.status) : j[k] || '');
    const jobs = st.jobs.slice().sort((a, b) => { const x = val(a, view.sort), y = val(b, view.sort); return (x > y ? 1 : x < y ? -1 : 0) * view.dir; });
    WP.add(box, h('div', { class: 'row between mb' }, h('span', { class: 'small muted' }, WP.plural(jobs.length, 'job')), h('button', { class: 'btn sm', onclick: () => {
      const rows = [['Title', 'Company', 'Location', 'Stage', 'Match', 'Applied', 'Next step', 'Next date', 'URL']].concat(jobs.map((j) => [j.title, j.company, j.location, j.status, j.match, j.appliedAt, j.nextAction, j.nextActionDate, j.url]));
      ui.download('waypoint-applications.csv', rows.map((r) => r.map((c) => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(',')).join('\n'), 'text/csv');
    } }, icon('download', 13), 'Export CSV')));
    if (!jobs.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('kanban', 'No applications yet', 'Save jobs and move them through the stages here.'))); return; }
    WP.add(box, h('div', { class: 'table-wrap' }, h('table', { class: 'table' },
      h('thead', null, h('tr', null, cols.map(([k, l]) => h('th', { class: 'sortable', onclick: () => { if (view.sort === k) view.dir *= -1; else { view.sort = k; view.dir = k === 'match' || k === 'updated' ? -1 : 1; } WP.app.refresh(); } }, l, view.sort === k ? (view.dir > 0 ? ' ▲' : ' ▼') : '')))),
      h('tbody', null, jobs.map((j) => h('tr', { class: 'clickable', onclick: () => S.jobDrawer(j.id) },
        h('td', { style: { fontWeight: 600 } }, j.title), h('td', null, j.company), h('td', null, S.statusChip(j.status)), h('td', null, ui.scoreBadge(j.match)),
        h('td', { class: 'small nowrap' }, j.appliedAt ? d.fmt(j.appliedAt) : '-'), h('td', { class: 'small' }, j.nextAction ? j.nextAction + (j.nextActionDate ? ' (' + d.rel(j.nextActionDate) + ')' : '') : '-'),
        h('td', { class: 'small muted nowrap' }, d.rel(j.updatedAt))))))));
  }

  WP.views.tracker = {
    title: 'Applications',
    render(root) {
      const st = WP.store.state; const E = WP.engine;
      const applied = st.jobs.filter((j) => j.appliedAt);
      const firstResp = applied.map((j) => { const ev = (j.events || []).filter((e) => ['screening', 'interview', 'rejected', 'offer'].includes(e.type)).map((e) => e.date).sort()[0]; return ev ? d.diff(j.appliedAt, ev) : null; }).filter((x) => x != null && x >= 0);
      const avgResp = firstResp.length ? Math.round(firstResp.reduce((a, b) => a + b, 0) / firstResp.length) : null;
      const due = st.jobs.filter((j) => j.nextActionDate && j.nextActionDate <= d.today() && !['rejected', 'withdrawn', 'offer'].includes(j.status)).length;
      const rr = E.responseRate(st);
      WP.add(root, S.pageHead({ eyebrow: 'Phase 5 - Apply', title: 'Applications', desc: 'Every opportunity from saved to offer. Move cards as things happen; Waypoint schedules follow-ups and feeds your Command Center.',
        actions: [h('div', { class: 'btn-group' }, h('button', { class: 'btn' + (view.mode === 'board' ? ' active' : ''), onclick: () => { view.mode = 'board'; WP.app.refresh(); } }, icon('kanban', 14), 'Board'), h('button', { class: 'btn' + (view.mode === 'table' ? ' active' : ''), onclick: () => { view.mode = 'table'; WP.app.refresh(); } }, icon('list', 14), 'Table')),
          h('button', { class: 'btn primary', onclick: () => S.jobForm(null) }, icon('plus', 15), 'Add job')] }));
      WP.add(root, h('div', { class: 'grid g4 mb' },
        stat('Applied', applied.length, 'send', 'Jobs you have applied to'), stat('Response rate', rr.appRate + '%', 'trending', rr.responded + ' of ' + rr.applied + ' got a response'),
        stat('Avg. days to response', avgResp != null ? avgResp : '-', 'clock', 'From applying to first screening/decision'), stat('Next steps due', due, 'flag', 'Next actions due today or overdue')));
      const box = h('div'); WP.add(root, box);
      if (view.mode === 'board') board(box, st); else table(box, st);
    },
  };
  function stat(l, v, ic, tip) { return h('div', { class: 'card kpi', 'data-tip': tip }, h('div', { class: 'label' }, icon(ic, 14), l), h('div', { class: 'value' }, v)); }
})();
