/* Market & Targets - companies, market insights, research, career switch, learning. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc } = WP;
  const S = WP.shared; const C = WP.charts;
  const view = { tab: 'targets', company: '' };
  const TIER_COLOR = { A: 'var(--s1)', B: 'var(--s2)', C: 'var(--s3)' };

  function targets(box, st) {
    const cos = st.companies.slice().sort((a, b) => a.tier.localeCompare(b.tier) || (b.interest + b.fit) - (a.interest + a.fit));
    const contactsAt = (c) => st.contacts.filter((x) => x.companyId === c.id || (x.company || '').toLowerCase() === c.name.toLowerCase()).length;
    const jobsAt = (c) => st.jobs.filter((j) => j.companyId === c.id).length;
    WP.add(box, h('div', { class: 'grid g3' },
      ['A', 'B', 'C'].map((t) => h('div', { class: 'card kpi' }, h('div', { class: 'label' }, h('span', { class: 'status-dot', style: { background: TIER_COLOR[t] } }), 'Tier ' + t + ' - ' + { A: 'dream', B: 'strong fit', C: 'backup' }[t]), h('div', { class: 'value' }, cos.filter((c) => c.tier === t).length)))));
    WP.add(box, h('div', { class: 'split-11 mt' },
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('target', 16), 'Where to focus'), h('span', { class: 'sub' }, 'Your interest vs. your fit (1-5)')),
        C.scatter(cos.map((c) => ({ x: c.fit || 3, y: c.interest || 3, label: c.name, color: TIER_COLOR[c.tier] || 'var(--s1)', tip: '<b>' + esc(c.name) + '</b><br>Tier ' + c.tier + ' | fit ' + c.fit + ' | interest ' + c.interest + '<br>' + WP.plural(contactsAt(c), 'contact') + ', ' + WP.plural(jobsAt(c), 'job'), id: c.id })),
          { xLabel: 'Fit (how well you match)', yLabel: 'Interest', quadrantLabel: 'Prioritize', legend: [{ label: 'Tier A', color: TIER_COLOR.A }, { label: 'Tier B', color: TIER_COLOR.B }, { label: 'Tier C', color: TIER_COLOR.C }], onClick: (pt) => { view.tab = 'research'; view.company = pt.id; WP.app.refresh(); }, height: 320 })),
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('building', 16), 'Target companies'), h('button', { class: 'btn primary sm', onclick: () => S.companyForm(null) }, icon('plus', 13), 'Add company')),
        cos.length ? h('div', { class: 'list' }, cos.map((c) => h('div', { class: 'list-item clickable', onclick: () => { view.tab = 'research'; view.company = c.id; WP.app.refresh(); } },
          h('div', { class: 'icon-box neutral', style: { fontWeight: 700, color: TIER_COLOR[c.tier] } }, c.tier),
          h('div', { class: 'grow', style: { minWidth: 0 } }, h('div', { class: 'title ellipsis' }, c.name), h('div', { class: 'meta ellipsis' }, [c.industry, c.status, WP.plural(contactsAt(c), 'contact'), WP.plural(jobsAt(c), 'job')].filter(Boolean).join(' | '))),
          (c.research && (c.research.mission || c.research.news)) ? h('span', { class: 'chip match', 'data-tip': 'Research notes saved' }, icon('check', 11), 'researched') : h('span', { class: 'chip' }, 'to research'),
          h('button', { class: 'btn ghost icon sm', 'aria-label': 'Edit', onclick: (e) => { e.stopPropagation(); S.companyForm(c); } }, icon('edit', 14))))) : ui.empty('building', 'No target companies yet', 'Add 5-15 companies you would love to work for. Tier them so the planner knows where to focus networking.', [h('button', { class: 'btn primary', onclick: () => S.companyForm(null) }, 'Add a company')]))));
    WP.add(box, h('div', { class: 'card mt' }, h('h3', null, icon('bulb', 16), 'How to build a strong target list'), h('div', { class: 'grid g3 mt-sm small text-2' },
      h('div', null, h('b', null, 'Start from what you want: '), 'industry, mission, size, location, remote policy, growth stage. Aim for 5 tier A, 10 tier B, 10 tier C.'),
      h('div', null, h('b', null, 'Mine your network: '), 'where do ex-colleagues and alumni work now? Warm paths make a company worth moving up a tier.'),
      h('div', null, h('b', null, 'Follow the money: '), 'recently funded, expanding into your city, or hiring several similar roles = higher odds.'))));
  }

  function insights(box, st) {
    const ins = WP.engine.insights(st);
    const assist = S.assist('market-scan', () => ({}));
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    if (!st.jobs.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('chart', 'No market data yet', 'Market insights are built from the jobs you save. Save 5+ job descriptions to see which skills, seniority levels, work modes and salaries dominate your target market.', [h('button', { class: 'btn primary', onclick: () => S.go('jobs') }, 'Find jobs')]))); return; }
    const p = st.profile;
    WP.add(box, ui.callout('', 'info', ['Built from your ', h('b', null, WP.plural(ins.jobs, 'saved job')), '. The more descriptions you save, the more accurate this picture of your market becomes.' + (S.isClaude() ? ' Run a market scan above for live, web-wide data.' : '')]));
    WP.add(box, h('div', { class: 'grid g2 mt' },
      h('div', { class: 'card span-2' }, h('div', { class: 'card-h' }, h('h3', null, icon('layers', 16), 'Skill demand vs. your profile'), h('span', { class: 'sub' }, 'How many saved jobs ask for each skill')),
        C.barH(ins.skillDemand.slice(0, 16).map((s) => ({ label: s.name, value: s.count, color: s.have ? 'var(--s1)' : 'var(--s2)', tip: '<b>' + esc(s.name) + '</b><br>' + s.count + ' job(s), ' + s.must + ' as must-have<br>' + (s.have ? 'In your profile' : 'Gap') })), { labelWidth: 170, format: (v) => v, valueWidth: 30 }),
        h('div', { class: 'legend' }, h('span', null, h('i', { style: { background: 'var(--s1)' } }), 'You have it'), h('span', null, h('i', { style: { background: 'var(--s2)' } }), 'Gap'))),
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('globe', 16), 'Work mode')), C.donut([
        { label: 'Remote', value: ins.modes.remote, color: 'var(--s1)' }, { label: 'Hybrid', value: ins.modes.hybrid, color: 'var(--s2)' }, { label: 'On-site', value: ins.modes.onsite, color: 'var(--s3)' }, { label: 'Not stated', value: ins.modes.unknown, color: 'var(--muted)' }], { centerLabel: 'jobs' })),
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('award', 16), 'Seniority asked for')), C.barH(Object.entries(ins.seniority).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ label: k, value: v })), { labelWidth: 170, valueWidth: 30 })),
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('pin', 16), 'Locations')), C.barH(Object.entries(ins.locations).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => ({ label: k, value: v, color: 'var(--s7)' })), { labelWidth: 140, valueWidth: 30 })),
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('briefcase', 16), 'Role families')), C.barH(Object.entries(ins.families).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ label: k, value: v, color: 'var(--s3)' })), { labelWidth: 170, valueWidth: 30, empty: 'Not enough data' })),
      h('div', { class: 'card span-2' }, h('div', { class: 'card-h' }, h('h3', null, icon('dollar', 16), 'Posted salary ranges'), h('span', { class: 'sub' }, 'Black line = your expected salary')),
        C.rangeBars(ins.salaries.map((s) => ({ label: s.label, min: s.min, max: s.max })), { target: p.salary.expected || 0, format: (v) => WP.money(v, p.salary.currency || st.settings.currency), labelWidth: 220 }))));
    learning(box, st, ins);
  }

  function learning(box, st, ins) {
    const L = st.learning;
    const add = h('input', { type: 'text', placeholder: 'Add a skill to learn...' });
    WP.add(box, h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('book', 16), 'Learning plan'), h('span', { class: 'sub' }, 'Close the gaps that keep showing up')),
      ins && ins.gaps.length ? h('div', { class: 'chips mb' }, h('span', { class: 'small muted' }, 'Suggested: '), ins.gaps.slice(0, 8).filter((g) => !L.some((l) => l.skill.toLowerCase() === g.name.toLowerCase())).map((g) => h('span', { class: 'chip clickable warn', onclick: () => { L.push({ skill: g.name, resource: '', status: 'todo', hours: 0 }); WP.store.save(); WP.app.refresh(); } }, icon('plus', 11), g.name))) : null,
      L.length ? h('div', { class: 'table-wrap' }, h('table', { class: 'table' }, h('thead', null, h('tr', null, h('th', null, 'Skill'), h('th', null, 'Status'), h('th', { class: 'num' }, 'Hours'), h('th', null, 'Resources'), h('th', null, ''))),
        h('tbody', null, L.map((l, i) => h('tr', null, h('td', null, h('b', null, l.skill)),
          h('td', null, ui.select(l.status, [{ value: 'todo', label: 'To do' }, { value: 'doing', label: 'In progress' }, { value: 'done', label: 'Done' }], (v) => { l.status = v; if (v === 'done' && !st.profile.skills.includes(l.skill)) ui.toast('Nice! Add ' + l.skill + ' to your profile skills when you are confident.', 'info'); WP.store.save(); WP.app.refresh(); })),
          h('td', { class: 'num' }, h('input', { type: 'number', min: 0, value: l.hours || 0, style: { width: '70px' }, onchange: (e) => { const add2 = (+e.target.value || 0) - (l.hours || 0); l.hours = +e.target.value || 0; if (add2 > 0) WP.store.log('learning', '', l.skill + ' +' + add2 + 'h'); WP.store.save(); } })),
          h('td', null, h('div', { class: 'row', style: { gap: '4px' } }, WP.engine.learningLinks(l.skill).slice(0, 4).map((x) => h('a', { class: 'chip clickable', href: x.url, target: '_blank', rel: 'noopener noreferrer' }, x.name)))),
          h('td', null, h('button', { class: 'btn ghost icon sm', 'aria-label': 'Remove', onclick: () => { L.splice(i, 1); WP.store.save(); WP.app.refresh(); } }, icon('trash', 14)))))))) : h('div', { class: 'muted small' }, 'Nothing on your learning plan yet.'),
      h('div', { class: 'input-group mt' }, add, h('button', { class: 'btn', onclick: () => { if (!add.value.trim()) return; L.push({ skill: WP.engine.canonSkill(add.value.trim()), resource: '', status: 'todo', hours: 0 }); WP.store.save(); WP.app.refresh(); } }, icon('plus', 13), 'Add'))));
  }

  function research(box, st) {
    if (!st.companies.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('building', 'Add a target company first', 'Then research it here with one-click links and structured notes.', [h('button', { class: 'btn primary', onclick: () => S.companyForm(null, (c) => { view.company = c.id; WP.app.refresh(); }) }, 'Add company')]))); return; }
    if (!view.company || !WP.store.get('companies', view.company)) view.company = st.companies[0].id;
    const c = WP.store.get('companies', view.company);
    c.research = c.research || {};
    const r = c.research;
    const fields = [['mission', 'Mission & what they do'], ['products', 'Products / services'], ['news', 'Recent news (last 6-12 months)'], ['culture', 'Culture signals'], ['interviewProcess', 'Interview process'], ['salaryRange', 'Salary signals'], ['keyPeople', 'Key people'], ['painPoints', 'Their likely pain points - and how you help']];
    const filled = fields.filter(([k]) => r[k]).length;
    WP.add(box, h('div', { class: 'card tight row between mb' },
      h('div', { class: 'row' }, h('b', null, 'Company:'), ui.select(view.company, st.companies.map((x) => ({ value: x.id, label: x.name + ' (tier ' + x.tier + ')' })), (v) => { view.company = v; WP.app.refresh(); })),
      h('div', { class: 'row' }, h('span', { class: 'small muted' }, filled + '/' + fields.length + ' research fields'), h('div', { class: 'progress', style: { width: '120px' } }, h('span', { style: { width: (filled / fields.length) * 100 + '%' } })),
        h('button', { class: 'btn sm', onclick: () => S.companyForm(c) }, icon('edit', 13), 'Edit company'))));
    const assist = S.assist('research-company', () => ({ company: c }), { ccArg: '"' + c.name + '"' });
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    WP.add(box, h('div', { class: 'split-12' },
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('search', 16), 'Research links'), h('span', { class: 'sub' }, 'Open in new tabs')), h('div', { class: 'stack', style: { gap: '8px' } }, WP.engine.companyLinks(c, st.settings.region).map((l) => ui.linkTile(l.name, l.url, l.sub, l.icon)))),
        h('div', { class: 'card' }, h('h3', null, 'Next steps'), h('div', { class: 'stack mt-sm' },
          h('button', { class: 'btn', onclick: () => S.go('network?tab=find&company=' + c.id) }, icon('users', 14), 'Find people at ' + c.name),
          h('button', { class: 'btn', onclick: () => S.go('jobs?tab=discover&company=' + c.id) }, icon('search', 14), 'Search their open roles')))),
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('book', 16), 'Research notes - ' + c.name), h('span', { class: 'sub' }, 'Used in cover letters, outreach and interview prep')),
        h('div', { class: 'stack' }, fields.map(([k, label]) => ui.field(label, ui.textarea(r[k] || '', (v) => { r[k] = v; c.updatedAt = WP.d.now(); WP.store.save(); }, { rows: k === 'news' || k === 'painPoints' ? 3 : 2 })))),
        (r.sources || []).length ? h('div', { class: 'mt' }, h('h4', null, 'Sources'), h('ul', { class: 'small' }, r.sources.map((s) => h('li', null, /^https?:/.test(s) ? h('a', { href: s, target: '_blank', rel: 'noopener noreferrer' }, s) : s)))) : null,
        h('div', { class: 'row mt' }, h('button', { class: 'btn primary', onclick: () => { WP.store.log('research', c.id, 'Researched ' + c.name); S.markActions('research-company', 'companyId', c.id); WP.store.save(); ui.toast('Research saved'); WP.app.refresh(); } }, icon('check', 14), 'Mark research done')))));
  }

  function careerSwitch(box, st) {
    const p = st.profile; const fams = (WP.K && WP.K.roleFamilies) || [];
    const cs = p.careerSwitch;
    if (!cs.fromFamily) { const f = WP.engine.detectFamily(p.currentTitle || '', p.skills); if (f) cs.fromFamily = f.id; }
    const assist = S.assist('switch-plan', () => ({}));
    WP.add(box, h('div', { class: 'card tight row mb' }, h('b', null, 'From'), ui.select(cs.fromFamily, [{ value: '', label: 'Current field...' }].concat(fams.map((f) => ({ value: f.id, label: f.name }))), (v) => { cs.fromFamily = v; WP.store.touchProfile(); WP.app.refresh(); }),
      icon('arrowRight', 16), h('b', null, 'To'), ui.select(cs.toFamily, [{ value: '', label: 'Target field...' }].concat(fams.map((f) => ({ value: f.id, label: f.name }))), (v) => { cs.toFamily = v; cs.active = !!v; WP.store.touchProfile(); WP.engine.refreshMatches(st); WP.app.refresh(); }),
      h('span', { class: 'small muted' }, cs.active ? 'Career switch mode is ON (summaries & letters adapt)' : '')));
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    const plan = WP.engine.switchPlan(p, cs.fromFamily, cs.toFamily);
    if (!plan) {
      WP.add(box, h('div', { class: 'card' }, ui.empty('route', 'Plan a career switch', 'Pick your current and target fields. Waypoint maps your transferable skills, the gaps to close, realistic bridge roles and a 12-week roadmap.'),
        h('div', { class: 'grid g-auto-sm mt' }, fams.slice(0, 12).map((f) => h('div', { class: 'card flat tight hoverable', onclick: () => { cs.toFamily = f.id; cs.active = true; WP.store.touchProfile(); WP.app.refresh(); } }, h('b', null, f.name), h('div', { class: 'small muted ellipsis' }, (f.titles || []).slice(0, 2).join(', ')))))));
      return;
    }
    WP.add(box, h('div', { class: 'grid g3' },
      h('div', { class: 'card', style: { display: 'grid', placeItems: 'center' } }, C.gauge(plan.overlap, { caption: 'skills overlap with ' + plan.to.name, size: 190 })),
      h('div', { class: 'card' }, h('h3', null, icon('check', 16), 'Transferable (' + plan.transferable.length + ')'), h('p', { class: 'small text-2' }, 'Core ' + plan.to.name + ' skills you already have - lead with these.'), h('div', { class: 'chips' }, plan.transferable.map((s) => h('span', { class: 'chip match' }, s)), plan.transferable.length ? null : h('span', { class: 'muted small' }, 'None yet - your projects will be key.'))),
      h('div', { class: 'card' }, h('h3', null, icon('book', 16), 'Gaps to close (' + plan.gaps.length + ')'), h('p', { class: 'small text-2' }, 'Click to add to your learning plan.'), h('div', { class: 'chips' }, plan.gaps.map((s) => h('span', { class: 'chip miss clickable', onclick: () => { if (!st.learning.some((l) => l.skill === s)) { st.learning.push({ skill: s, resource: '', status: 'todo', hours: 0 }); WP.store.save(); ui.toast(s + ' added to learning plan'); } } }, icon('plus', 11), s))))));
    WP.add(box, h('div', { class: 'split-21 mt' },
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('calendar', 16), '12-week switch roadmap')),
        h('div', { class: 'steps' }, plan.roadmap.map((r) => h('div', { class: 'step' }, h('div', { class: 'dot' }), h('div', null, h('div', { class: 'row between' }, h('h3', null, r.title), h('span', { class: 'chip' }, r.weeks)), h('ul', null, r.items.map((i) => h('li', null, i)))))))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon('route', 16), 'Bridge roles'), h('p', { class: 'small text-2' }, 'Stepping-stone titles that value your current background.'), h('div', { class: 'chips' }, plan.bridgeRoles.map((b) => h('span', { class: 'chip accent clickable', onclick: () => { if (!p.targetTitles.includes(b)) { p.targetTitles.push(b); WP.store.touchProfile(); ui.toast('Added "' + b + '" to target titles'); } } }, icon('plus', 11), b)))),
        h('div', { class: 'card' }, h('h3', null, icon('mic', 16), 'Your switch story'), h('p', { class: 'small text-2' }, 'A 60-second answer to "Why the change?" - past, pivot, future.'),
          h('div', { class: 'pre small' }, 'Past: In ' + ((plan.from || {}).name || 'my current field') + ', I ' + ((WP.engine.bestBullets(p, { skills: [], keywords: [] }, 1)[0] || {}).text || '[your proudest achievement]').replace(/^\w/, (c) => c.toLowerCase()) + '\n\nPivot: I kept gravitating to ' + (plan.transferable.slice(0, 2).join(' and ') || '[the part of the work you loved]') + '. ' + (cs.motivation || '[Why this field, in one sentence.]') + '\n\nFuture: I have been building ' + (plan.gaps.slice(0, 2).join(' and ') || '[new skills]') + ' through [course/project], and I am excited to bring ' + ((plan.transferable[0]) || '[my strongest skill]') + ' to a ' + (plan.bridgeRoles[0] || plan.to.name) + ' role.')))));
  }

  WP.views.market = {
    title: 'Market & Targets',
    render(root, route) {
      const st = WP.store.state;
      if (route.query.tab) view.tab = route.query.tab;
      if (route.query.company) view.company = route.query.company;
      WP.add(root, S.pageHead({ eyebrow: 'Phase 2 - Target', title: 'Market & targets', desc: 'Decide where to aim: which companies, which roles, what the market wants and what it pays - and if you are switching fields, how to bridge the gap.' }));
      WP.add(root, ui.tabs([
        { id: 'targets', label: 'Target companies', icon: 'building', count: st.companies.length }, { id: 'insights', label: 'Market insights', icon: 'chart' },
        { id: 'research', label: 'Company research', icon: 'search' }, { id: 'switch', label: 'Career switch', icon: 'route' },
      ], view.tab, (t) => { view.tab = t; WP.app.refresh(); }));
      const box = h('div'); WP.add(root, box);
      ({ targets, insights, research, switch: careerSwitch }[view.tab] || targets)(box, st);
    },
  };
})();
