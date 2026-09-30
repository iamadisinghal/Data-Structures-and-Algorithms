/* Command Center - the visual overview of the whole search. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, d } = WP;
  const S = WP.shared; const C = WP.charts;

  function kpi(label, value, sub, ic, extra) {
    return h('div', { class: 'card kpi' }, h('div', { class: 'row between', style: { flexWrap: 'nowrap', alignItems: 'flex-start' } },
      h('div', { class: 'stack', style: { gap: '4px' } }, h('div', { class: 'label' }, icon(ic, 14), label), h('div', { class: 'value' }, value), sub ? h('div', { class: 'delta ' + (sub.cls || '') }, sub.text) : null), extra || null));
  }

  WP.views.dashboard = {
    title: 'Command Center',
    render(root) {
      const st = WP.store.state; const E = WP.engine; const p = st.profile;
      const goals = st.settings.weeklyGoals; const week = E.weekCounts(st); const lastWeek = E.weekCounts(st, d.addDays(d.weekStart(), -7));
      const rr = E.responseRate(st);
      const ins = E.insights(st);
      const hour = new Date().getHours();
      const greet = (hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening') + (p.name ? ', ' + E.firstName(p.name) : '');
      const pending = st.actions.filter((a) => a.status === 'pending');
      const ready = st.actions.filter((a) => a.status === 'approved');

      WP.add(root, S.pageHead({
        eyebrow: d.fmt(d.today(), { weekday: 'long', month: 'long', day: 'numeric' }), title: greet,
        desc: pending.length ? 'You have ' + WP.plural(pending.length, 'proposal') + ' waiting for approval' + (ready.length ? ' and ' + ready.length + ' approved step' + (ready.length === 1 ? '' : 's') + ' ready to do.' : '.') : 'Your pipeline at a glance. Run the planner to get today\'s proposals.',
        actions: [
          h('button', { class: 'btn', onclick: () => { const n = E.planner.run(st); WP.ui.toast(n ? n + ' new proposal' + (n === 1 ? '' : 's') + ' added' : 'Nothing new to propose right now', n ? 'good' : 'info'); WP.app.refresh(); } }, icon('wand', 15), 'Run planner'),
          h('button', { class: 'btn primary', onclick: () => S.go('queue') }, icon('inbox', 15), 'Approval Queue' + (pending.length ? ' (' + pending.length + ')' : '')),
        ],
      }));
      const assist = S.assist('weekly-plan', () => ({}), { compact: true }); if (assist) WP.add(root, h('div', { class: 'mb' }, assist));

      if (!st.jobs.length && !st.contacts.length) {
        WP.add(root, h('div', { class: 'card' }, ui.empty('grid', 'Your Command Center is empty', 'Add a few jobs and contacts (or load the sample data from Start Here) and this page fills with your funnel, goals, activity and insights.', [
          h('button', { class: 'btn primary', onclick: () => S.go('start') }, 'Go to Start Here'), h('button', { class: 'btn', onclick: () => S.go('jobs') }, 'Add a job')])));
        return;
      }

      const trend = (a, b) => (a > b ? { text: '▲ ' + (a - b) + ' vs last week', cls: 'up' } : a < b ? { text: '▼ ' + (b - a) + ' vs last week', cls: 'down' } : { text: 'Same as last week' });
      const interviews = st.jobs.filter((j) => j.status === 'interview').length;
      WP.add(root, h('div', { class: 'grid g4' },
        kpi('Applications this week', week.applied, trend(week.applied, lastWeek.applied), 'send', C.ring(week.applied, goals.applications, { center: week.applied + '/' + goals.applications, size: 58, label: 'Applications goal' })),
        kpi('Response rate', rr.appRate + '%', { text: rr.responded + ' of ' + rr.applied + ' applications got a reply' }, 'trending', h('span', { 'data-tip': 'Applications per week, last 8 weeks' }, C.sparkline(E.weeklySeries(st, 8).applied))),
        kpi('Active interviews', interviews, { text: st.jobs.filter((j) => j.status === 'screening').length + ' in screening' }, 'mic'),
        kpi('Network', st.contacts.length, { text: rr.outRate + '% reply rate on ' + rr.sent + ' messages' }, 'users', C.ring(week.outreach, goals.outreach, { center: week.outreach + '/' + goals.outreach, size: 58, label: 'Outreach goal' }))));

      const series = E.weeklySeries(st, 10);
      WP.add(root, h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('filter', 16), 'Pipeline funnel'), h('span', { class: 'sub' }, 'Conversion between stages')),
          C.funnel(E.funnel(st), { onClick: () => S.go('tracker') })),
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('flag', 16), 'This week\'s goals'), h('a', { href: '#/settings', class: 'small' }, 'Edit goals')),
          h('div', { class: 'grid g2', style: { gap: '14px' } }, [
            ['Applications', week.applied, goals.applications, 'send'], ['Outreach messages', week.outreach, goals.outreach, 'chat'],
            ['Follow-ups', week.followup, goals.followups, 'refresh'], ['Learning sessions', week.learning, goals.learningHours, 'book'],
          ].map(([l, v, g, ic]) => h('div', { class: 'row', style: { flexWrap: 'nowrap' } }, C.ring(v, g, { size: 62, label: l }), h('div', null, h('div', { class: 'row small text-2', style: { gap: '5px' } }, icon(ic, 13), l), h('b', { style: { fontSize: '18px' } }, v + ' / ' + g), h('div', { class: 'small muted' }, v >= g ? 'Goal met' : (g - v) + ' to go')))))),
        h('div', { class: 'card span-2' }, h('div', { class: 'card-h' }, h('h3', null, icon('chart', 16), 'Weekly activity'), h('span', { class: 'sub' }, 'Last 10 weeks - hover a week for details')),
          C.stackedBars(series.labels.map((w) => d.fmt(w)), [
            { key: 'applied', label: 'Applications', color: 'var(--s1)', values: series.applied },
            { key: 'outreach', label: 'Outreach', color: 'var(--s2)', values: series.outreach },
            { key: 'followup', label: 'Follow-ups', color: 'var(--s3)', values: series.followup },
          ], { tipLabel: (l) => 'Week of ' + l, aria: 'Weekly applications, outreach and follow-ups' }))));

      const counts = {}; st.activity.forEach((a) => { counts[a.date] = (counts[a.date] || 0) + 1; });
      WP.add(root, h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('calendar', 16), 'Consistency'), h('span', { class: 'sub' }, 'Every logged action, last 16 weeks')), C.heatmap(counts, { weeks: 16 })),
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('inbox', 16), 'Waiting for you'), h('a', { href: '#/queue', class: 'small' }, 'Open queue')),
          pending.length || ready.length ? h('div', { class: 'list' }, pending.concat(ready).slice(0, 5).map((a) => {
            const meta = E.ACTION_META[a.type] || E.ACTION_META.custom;
            return h('div', { class: 'list-item clickable', onclick: () => S.go('queue') }, h('div', { class: 'icon-box ' + (a.status === 'approved' ? 'good' : a.source.startsWith('claude') ? 'claude' : '') }, icon(meta.icon, 16)),
              h('div', { class: 'grow', style: { minWidth: 0 } }, h('div', { class: 'title ellipsis' }, a.title), h('div', { class: 'meta' }, (a.status === 'approved' ? 'Approved - ready to do' : 'Needs approval') + ' | ' + meta.label)), icon('chevronRight', 16));
          })) : ui.empty('check', 'All clear', 'No pending proposals. Run the planner for fresh ideas.'))));

      const top = st.jobs.filter((j) => ['saved', 'applying'].includes(j.status)).sort((a, b) => (b.match || 0) - (a.match || 0)).slice(0, 6);
      const upcoming = [];
      st.jobs.forEach((j) => { if (j.nextActionDate && !['rejected', 'withdrawn', 'offer'].includes(j.status)) upcoming.push({ date: j.nextActionDate, title: j.nextAction || 'Next step', sub: j.company + ' - ' + j.title, onclick: () => S.jobDrawer(j.id), ic: j.status === 'interview' ? 'mic' : 'clock' }); });
      st.contacts.forEach((c) => { if (c.nextFollowUp && !['referred', 'meeting'].includes(c.status)) upcoming.push({ date: c.nextFollowUp, title: 'Follow up with ' + c.name, sub: (c.title || '') + ' @ ' + (c.company || ''), onclick: () => S.contactDrawer(c.id), ic: 'chat' }); });
      upcoming.sort((a, b) => a.date.localeCompare(b.date));
      WP.add(root, h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('star', 16), 'Best matches to act on'), h('a', { href: '#/jobs', class: 'small' }, 'All jobs')),
          top.length ? h('div', { class: 'list' }, top.map((j) => h('div', { class: 'list-item clickable', onclick: () => S.jobDrawer(j.id) }, ui.scoreBadge(j.match, 'Match score'),
            h('div', { class: 'grow', style: { minWidth: 0 } }, h('div', { class: 'title ellipsis' }, j.title), h('div', { class: 'meta' }, j.company + (j.location ? ' | ' + j.location : ''))),
            h('button', { class: 'btn sm', onclick: (e) => { e.stopPropagation(); S.go('apply/' + j.id); } }, 'Apply', icon('arrowRight', 12))))) : ui.empty('search', 'No saved jobs', 'Save jobs from Job Discovery to see your best matches here.')),
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('clock', 16), 'Coming up'), h('span', { class: 'sub' }, 'Interviews, next steps, follow-ups')),
          upcoming.length ? h('div', { class: 'list' }, upcoming.slice(0, 7).map((u) => h('div', { class: 'list-item clickable', onclick: u.onclick },
            h('div', { class: 'icon-box ' + (u.date < d.today() ? 'critical' : u.date === d.today() ? 'warn' : 'neutral') }, icon(u.ic, 16)),
            h('div', { class: 'grow', style: { minWidth: 0 } }, h('div', { class: 'title ellipsis' }, u.title), h('div', { class: 'meta ellipsis' }, u.sub)),
            h('span', { class: 'chip ' + (u.date < d.today() ? 'miss' : u.date === d.today() ? 'warn' : '') }, u.date < d.today() ? 'overdue ' + d.rel(u.date) : d.rel(u.date))))) : ui.empty('calendar', 'Nothing scheduled', 'Next steps and follow-up dates show up here.'))));

      const status = E.statusCounts(st);
      WP.add(root, h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('layers', 16), 'Skills the market wants'), h('span', { class: 'sub' }, 'Across your ' + WP.plural(st.jobs.length, 'saved job'))),
          C.barH(ins.skillDemand.slice(0, 10).map((s) => ({ label: s.name, value: s.count, color: s.have ? 'var(--s1)' : 'var(--s2)', tip: '<b>' + WP.esc(s.name) + '</b><br>In ' + s.count + ' job' + (s.count === 1 ? '' : 's') + (s.must ? ' (' + s.must + ' as must-have)' : '') + '<br>' + (s.have ? 'You have this' : 'Gap - consider learning it') })), { format: (v) => v + ' jobs', valueWidth: 56 }),
          h('div', { class: 'legend' }, h('span', null, h('i', { style: { background: 'var(--s1)' } }), 'You have it'), h('span', null, h('i', { style: { background: 'var(--s2)' } }), 'Gap'))),
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('kanban', 16), 'Where your applications are'), h('a', { href: '#/tracker', class: 'small' }, 'Open tracker')),
          C.donut(S.JOB_STATUSES.map((s) => ({ label: s.label, value: status[s.id] || 0, color: s.color })), { centerLabel: 'jobs', aria: 'Jobs by status' }),
          h('div', { class: 'grid g2 mt', style: { gap: '10px' } },
            h('div', { class: 'card flat tight kpi' }, h('div', { class: 'label' }, 'Average match'), h('div', { class: 'value', style: { fontSize: '22px' } }, ins.avgMatch + '%')),
            h('div', { class: 'card flat tight kpi' }, h('div', { class: 'label' }, 'Profile strength'), h('div', { class: 'value', style: { fontSize: '22px' } }, E.profileStrength(p, st).score + '%'))))));
    },
  };
})();
