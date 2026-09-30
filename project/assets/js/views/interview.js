/* Interview Prep - STAR story bank, practice, company prep, 30-60-90. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc, d } = WP;
  const S = WP.shared; const C = WP.charts;
  const view = { tab: 'stories', family: '', comp: 'all', qi: 0, timer: 120, running: false, handle: null, job: '' };
  const IV = () => (WP.K && WP.K.interview) || { competencies: [], behavioral: [], byFamily: {}, closers: [] };

  function storyForm(story) {
    const isNew = !story; const s = Object.assign({ title: '', situation: '', task: '', action: '', result: '', competencies: [] }, story || {});
    const comps = IV().competencies;
    const set = (k) => (v) => { s[k] = v; };
    const bullets = [].concat(...(WP.store.state.profile.experience || []).map((e) => (e.bullets || []).map((b) => ({ b, co: e.company }))));
    const m = ui.modal({ title: isNew ? 'New STAR story' : 'Edit story', wide: true, icon: 'star',
      body: h('div', { class: 'stack' },
        isNew && bullets.length ? h('div', { class: 'field' }, h('label', null, 'Start from a resume bullet (optional)'), ui.select('', [{ value: '', label: 'Choose a bullet to pre-fill...' }].concat(bullets.map((x, i) => ({ value: i, label: WP.engine.trunc(x.co + ': ' + x.b, 110) }))), (v) => { if (v === '') return; const x = bullets[+v]; s.title = WP.engine.trunc(x.b, 60); s.action = x.b; s.situation = 'At ' + x.co + ', '; m.close(); storyForm(s); })) : null,
        ui.field('Title (a memorable name)', ui.input(s.title, set('title'), { placeholder: 'e.g. Rescued the Q3 launch' })),
        h('div', { class: 'form-grid' },
          ui.field('S - Situation', ui.textarea(s.situation, set('situation'), { rows: 3, placeholder: 'Context: where, when, what was at stake?' })),
          ui.field('T - Task', ui.textarea(s.task, set('task'), { rows: 3, placeholder: 'Your responsibility or goal' })),
          ui.field('A - Action', ui.textarea(s.action, set('action'), { rows: 3, placeholder: 'What YOU did (use "I", 2-4 steps)' })),
          ui.field('R - Result', ui.textarea(s.result, set('result'), { rows: 3, placeholder: 'Measurable outcome + what you learned' }))),
        h('div', { class: 'field' }, h('label', null, 'Competencies this story proves'), h('div', { class: 'chips' }, comps.map((c) => h('label', { class: 'chip clickable' + (s.competencies.includes(c.id) ? ' accent' : ''), 'data-tip': esc(c.desc || '') },
          h('input', { type: 'checkbox', checked: s.competencies.includes(c.id), style: { width: '13px', height: '13px' }, onchange: (e) => { s.competencies = e.target.checked ? WP.uniq(s.competencies.concat(c.id)) : s.competencies.filter((x) => x !== c.id); e.target.parentElement.classList.toggle('accent', e.target.checked); } }), c.label))))),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn primary', onclick: () => {
        if (!s.title.trim()) { ui.toast('Give it a title', 'bad'); return; }
        if (isNew || !s.id) WP.store.add('stories', s); else WP.store.update('stories', s.id, s);
        m.close(); ui.toast('Story saved'); WP.app.refresh();
      } }, icon('check', 14), 'Save story')] });
  }

  function storiesTab(box, st) {
    const comps = IV().competencies;
    const cov = comps.map((c) => ({ c, n: st.stories.filter((s) => (s.competencies || []).includes(c.id)).length }));
    const missing = cov.filter((x) => !x.n);
    WP.add(box, h('div', { class: 'split-21' },
      h('div', null,
        h('div', { class: 'row between mb' }, h('span', { class: 'small muted' }, WP.plural(st.stories.length, 'story', 'stories') + ' - aim for 6-8 that cover most competencies'), h('button', { class: 'btn primary', onclick: () => storyForm(null) }, icon('plus', 14), 'New story')),
        st.stories.length ? h('div', { class: 'grid g2' }, st.stories.map((s) => h('div', { class: 'card story-card' },
          h('div', { class: 'row between', style: { flexWrap: 'nowrap', alignItems: 'flex-start' } }, h('b', null, s.title), h('div', { class: 'row', style: { gap: '2px', flexWrap: 'nowrap' } }, h('button', { class: 'btn ghost icon sm', 'aria-label': 'Edit', onclick: () => storyForm(s) }, icon('edit', 14)), h('button', { class: 'btn ghost icon sm', 'aria-label': 'Delete', onclick: async () => { if (await ui.confirm({ title: 'Delete this story?', okText: 'Delete', danger: true })) { WP.store.remove('stories', s.id); WP.app.refresh(); } } }, icon('trash', 14)))),
          h('div', { class: 'chips mt-sm' }, (s.competencies || []).map((c) => h('span', { class: 'chip accent' }, (comps.find((x) => x.id === c) || { label: c }).label))),
          h('div', { class: 'star' }, h('b', null, 'S'), h('span', null, s.situation), h('b', null, 'T'), h('span', null, s.task), h('b', null, 'A'), h('span', null, s.action), h('b', null, 'R'), h('span', null, s.result))))) :
          h('div', { class: 'card' }, ui.empty('star', 'Build your story bank', 'Behavioral questions ("Tell me about a time...") are predictable. Six to eight well-rehearsed STAR stories can answer almost all of them.', [h('button', { class: 'btn primary', onclick: () => storyForm(null) }, 'Write my first story')]))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon('chart', 16), 'Competency coverage'), h('div', { class: 'mt-sm' }, C.barH(cov.map((x) => ({ label: x.c.label, value: x.n, color: x.n ? 'var(--s1)' : 'var(--s8)', tip: '<b>' + esc(x.c.label) + '</b><br>' + esc(x.c.desc || '') + '<br>' + x.n + ' stor' + (x.n === 1 ? 'y' : 'ies') })), { max: Math.max(2, ...cov.map((x) => x.n)), labelWidth: 110, valueWidth: 24, barH: 10, gap: 5 }))),
        missing.length ? h('div', { class: 'card warn' }, h('h3', null, 'Stories to write next'), h('ul', { class: 'small', style: { paddingLeft: '18px', marginBottom: 0 } }, missing.slice(0, 6).map((x) => { const q = IV().behavioral.find((b) => b.comp === x.c.id); return h('li', { style: { margin: '5px 0' } }, h('b', null, x.c.label + ': '), q ? q.q : x.c.desc); }))) : null,
        h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'STAR in 90 seconds'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, h('li', null, 'Situation + Task: 15-20 seconds of context.'), h('li', null, 'Action: 45 seconds - what YOU did, step by step.'), h('li', null, 'Result: numbers, plus what you learned.'), h('li', null, 'Practice out loud; don\'t memorize word for word.'))))));
  }

  function practiceTab(box, st) {
    const iv = IV(); const fams = (WP.K && WP.K.roleFamilies) || [];
    if (!view.family) { const f = WP.engine.detectFamily((st.profile.targetTitles || [])[0] || st.profile.currentTitle || '', st.profile.skills); view.family = f ? f.id : (fams[0] || {}).id || ''; }
    let pool = [];
    if (view.comp === 'all' || view.comp === 'behavioral') pool = pool.concat(iv.behavioral.map((q) => Object.assign({ kind: 'Behavioral' }, q)));
    if (view.comp === 'all' || view.comp === 'role') pool = pool.concat((iv.byFamily[view.family] || []).map((q) => Object.assign({ kind: 'Role-specific' }, q)));
    if (!['all', 'behavioral', 'role'].includes(view.comp)) pool = iv.behavioral.filter((q) => q.comp === view.comp).map((q) => Object.assign({ kind: 'Behavioral' }, q));
    if (!pool.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('mic', 'No questions for this filter', 'Try another role family or category.'))); }
    const q = pool.length ? pool[view.qi % pool.length] : null;
    const story = q && q.comp ? st.stories.find((s) => (s.competencies || []).includes(q.comp)) : null;
    const practice = st.meta.practice || (st.meta.practice = []);
    const timerEl = h('div', { class: 'timer' }, fmt(view.timer));
    function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
    const tick = () => { view.timer = Math.max(0, view.timer - 1); timerEl.textContent = fmt(view.timer); timerEl.style.color = view.timer <= 15 ? 'var(--critical-ink)' : ''; if (!view.timer) stop(); };
    const stop = () => { clearInterval(view.handle); view.handle = null; view.running = false; };
    if (view.running && !view.handle) view.handle = setInterval(tick, 1000);
    WP.add(box, h('div', { class: 'card tight row mb' }, h('b', null, 'Role family'), ui.select(view.family, fams.map((f) => ({ value: f.id, label: f.name })), (v) => { view.family = v; view.qi = 0; WP.app.refresh(); }),
      h('b', null, 'Questions'), ui.select(view.comp, [{ value: 'all', label: 'Mixed' }, { value: 'behavioral', label: 'Behavioral only' }, { value: 'role', label: 'Role-specific only' }].concat(iv.competencies.map((c) => ({ value: c.id, label: 'Competency: ' + c.label }))), (v) => { view.comp = v; view.qi = 0; WP.app.refresh(); }),
      h('span', { class: 'small muted' }, pool.length + ' questions | ' + practice.length + ' practiced so far')));
    if (!q) return;
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'card', style: { padding: '26px' } },
        h('div', { class: 'row between' }, h('span', { class: 'chip ' + (q.kind === 'Behavioral' ? 'accent' : 'claude') }, q.kind + (q.comp ? ' - ' + ((iv.competencies.find((c) => c.id === q.comp) || {}).label || q.comp) : '')), h('span', { class: 'small muted' }, 'Question ' + ((view.qi % pool.length) + 1) + ' of ' + pool.length)),
        h('h2', { style: { fontSize: '22px', margin: '18px 0 14px', lineHeight: 1.35 } }, q.q),
        q.tip ? h('details', null, h('summary', { class: 'small', style: { cursor: 'pointer', color: 'var(--accent-ink)' } }, 'What a strong answer shows'), h('p', { class: 'small text-2 mt-sm' }, q.tip)) : null,
        story ? h('div', { class: 'callout mt' }, icon('star', 16), h('div', { class: 'small' }, h('b', null, 'Use your story: '), story.title, ' - ', h('span', { class: 'muted' }, WP.engine.trunc(story.result, 120)))) : q.comp ? h('div', { class: 'callout warn mt' }, icon('info', 16), h('div', { class: 'small' }, 'No story tagged "' + q.comp + '" yet. ', h('a', { href: '#', onclick: (e) => { e.preventDefault(); storyForm(null); } }, 'Write one'))) : null,
        h('div', { class: 'row mt-lg' }, h('span', { class: 'small muted' }, 'How did that go?'), [1, 2, 3, 4, 5].map((r) => h('button', { class: 'btn sm', onclick: () => { practice.push({ date: d.today(), q: q.q, rating: r }); WP.store.log('learning', '', 'Practiced: ' + WP.engine.trunc(q.q, 50)); stop(); view.timer = 120; view.qi++; WP.store.save(); WP.app.refresh(); } }, r, r === 1 ? ' - rough' : r === 5 ? ' - nailed it' : ''))),
        h('div', { class: 'row mt' }, h('button', { class: 'btn', onclick: () => { stop(); view.timer = 120; view.qi = Math.floor(Math.random() * pool.length); WP.app.refresh(); } }, icon('refresh', 14), 'Random question'), h('button', { class: 'btn', onclick: () => { stop(); view.timer = 120; view.qi++; WP.app.refresh(); } }, 'Skip', icon('chevronRight', 14)))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card center' }, h('h3', null, 'Answer timer'), timerEl, h('div', { class: 'small muted' }, 'Aim for 60-120 seconds'),
          h('div', { class: 'row mt', style: { justifyContent: 'center' } }, h('button', { class: 'btn primary', onclick: () => { if (view.running) { stop(); } else { view.running = true; view.handle = setInterval(tick, 1000); } WP.app.refresh(); } }, icon(view.running ? 'pause' : 'play', 14), view.running ? 'Pause' : 'Start'), h('button', { class: 'btn', onclick: () => { stop(); view.timer = 120; WP.app.refresh(); } }, 'Reset'))),
        practice.length ? h('div', { class: 'card' }, h('h3', null, 'Your recent practice'), h('div', { class: 'list mt-sm' }, practice.slice(-6).reverse().map((p) => h('div', { class: 'list-item' }, ui.pips(p.rating, 5), h('div', { class: 'grow small ellipsis' }, p.q), h('span', { class: 'small muted' }, d.rel(p.date)))))) : null)));
  }

  function prepTab(box, st, route) {
    if (route.query.job) view.job = route.query.job;
    const jobs = st.jobs.filter((j) => !['rejected', 'withdrawn'].includes(j.status)).sort((a, b) => ['interview', 'screening', 'offer'].indexOf(b.status) - ['interview', 'screening', 'offer'].indexOf(a.status));
    if (!jobs.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('mic', 'No jobs to prepare for', 'Prep sheets are built per job.'))); return; }
    if (!view.job || !WP.store.get('jobs', view.job)) view.job = jobs[0].id;
    const job = WP.store.get('jobs', view.job); const a = WP.engine.analyzeJob(job, st.profile);
    const co = job.companyId ? WP.store.get('companies', job.companyId) : null; const r = (co && co.research) || {};
    const iv = IV(); const fam = a.family ? a.family.id : view.family;
    const likely = [].concat(
      [{ q: 'Tell me about yourself.', kind: 'Opener' }, { q: 'Why do you want to work at ' + job.company + '?', kind: 'Motivation' }, { q: 'Why this role, and why now?', kind: 'Motivation' }],
      a.must.slice(0, 4).map((s) => ({ q: 'Walk me through a project where you used ' + s.name + '. What was the impact?', kind: 'Skill: ' + s.name, gap: !s.have })),
      (iv.byFamily[fam] || []).slice(0, 4).map((x) => ({ q: x.q, kind: 'Role-specific', tip: x.tip })),
      iv.behavioral.filter((b) => ['conflict', 'failure', 'influence', 'ownership', 'prioritization'].includes(b.comp)).slice(0, 4).map((b) => ({ q: b.q, kind: 'Behavioral', comp: b.comp })));
    const assist = S.assist('interview-prep', () => ({ job }), { ccArg: job.id });
    const checklist = job.prepChecklist || (job.prepChecklist = {});
    const CL = ['Re-read the job description and my tailored resume', 'Research notes done (mission, news, products)', 'Picked 4-6 STAR stories to use', 'Prepared answers for my gaps', 'Prepared 3-5 questions to ask', 'Logistics: time zone, link/address, who I am meeting', 'Tested camera/mic or planned the route', 'Thank-you note ready to send within 24h'];
    WP.add(box, h('div', { class: 'card tight row between mb' }, h('div', { class: 'row' }, h('b', null, 'Preparing for:'), ui.select(view.job, jobs.map((j) => ({ value: j.id, label: j.company + ' - ' + j.title + ' (' + j.status + ')' })), (v) => { view.job = v; WP.app.refresh(); })),
      h('span', { class: 'small muted' }, CL.filter((x) => checklist[x]).length + '/' + CL.length + ' ready')));
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    if (job.prep) WP.add(box, h('div', { class: 'card claude mb' }, h('div', { class: 'card-h' }, h('h3', null, icon('sparkles', 16), 'Saved prep sheet'), h('button', { class: 'btn ghost sm', onclick: () => { WP.store.update('jobs', job.id, { prep: '' }); WP.app.refresh(); } }, 'Remove')), h('div', { class: 'md', html: WP.md(job.prep) })));
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon('building', 16), 'Company briefing - ' + job.company),
          r.mission || r.news || r.products ? h('dl', { class: 'kv mt-sm' }, [['Mission', r.mission], ['Products', r.products], ['Recent news', r.news], ['Culture', r.culture], ['Process', r.interviewProcess]].filter((x) => x[1]).map(([k, v]) => [h('dt', null, k), h('dd', null, v)])) :
            h('div', { class: 'callout warn mt-sm' }, icon('info', 16), h('div', { class: 'small' }, 'No research yet. ', co ? h('a', { href: '#/market?tab=research&company=' + co.id }, 'Research ' + co.name + ' now') : 'Add the company to research it.', ' - interviewers notice.'))),
        h('div', { class: 'card' }, h('h3', null, icon('mic', 16), 'Likely questions & your stories'), h('div', { class: 'list mt-sm' }, likely.map((x) => {
          const s = x.comp ? st.stories.find((y) => (y.competencies || []).includes(x.comp)) : null;
          return h('div', { class: 'list-item', style: { alignItems: 'flex-start' } }, h('span', { class: 'chip ' + (x.gap ? 'miss' : '') , style: { flex: '0 0 auto' } }, x.kind), h('div', { class: 'grow' }, h('div', { style: { fontWeight: 560 } }, x.q), x.gap ? h('div', { class: 'small', style: { color: 'var(--critical-ink)' } }, 'Gap - prepare an honest answer: related experience + how you are learning it.') : null, s ? h('div', { class: 'small muted' }, 'Story: ' + s.title) : null, x.tip ? h('div', { class: 'small muted' }, x.tip) : null));
        })))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon('check', 16), 'Readiness checklist'), h('div', { class: 'mt-sm' }, CL.map((x) => h('label', { class: 'check small', style: { display: 'flex', padding: '5px 0' } }, h('input', { type: 'checkbox', checked: !!checklist[x], onchange: (e) => { checklist[x] = e.target.checked; WP.store.update('jobs', job.id, { prepChecklist: checklist }); } }), x)))),
        h('div', { class: 'card' }, h('h3', null, icon('chat', 16), 'Questions to ask them'), h('ol', { class: 'small', style: { paddingLeft: '18px', marginBottom: 0 } },
          [r.news ? 'I read about ' + r.news.split(/[.;]/)[0].toLowerCase() + ' - how does that affect this team\'s priorities?' : null, 'What would success look like in the first 90 days for this role?'].filter(Boolean).concat(iv.closers.slice(0, 5)).map((x) => h('li', { style: { margin: '5px 0' } }, x)))),
        h('div', { class: 'card' }, h('h3', null, icon('mail', 16), 'After the interview'), h('p', { class: 'small text-2' }, 'Send a specific thank-you within 24 hours.'), h('button', { class: 'btn sm', onclick: () => { const c = st.contacts.find((x) => x.companyId === job.companyId && (x.relationship === 'hiring-manager' || x.relationship === 'recruiter')); if (c) { S.go('outreach?contact=' + c.id); } else ui.toast('Add your interviewer as a contact first (People & Network)', 'info'); } }, 'Draft thank-you note')))));
  }

  function plan306090(box, st) {
    const jobs = st.jobs.filter((j) => ['interview', 'screening', 'offer', 'applied'].includes(j.status));
    if (!view.job || !WP.store.get('jobs', view.job)) view.job = (jobs[0] || st.jobs[0] || {}).id || '';
    const job = view.job ? WP.store.get('jobs', view.job) : null;
    if (!job) { WP.add(box, h('div', { class: 'card' }, ui.empty('calendar', 'Pick a job first', 'A 30-60-90 day plan is a powerful final-round differentiator.'))); return; }
    const a = WP.engine.analyzeJob(job, st.profile);
    const skills = a.matched.slice(0, 3).map((s) => s.name);
    const resp = (job.description || '').split('\n').map((l) => l.trim()).filter((l) => /^[-•*]/.test(l)).map((l) => l.replace(/^[-•*]\s*/, '')).slice(0, 4);
    const txt = job.plan306090 || ['30-60-90 DAY PLAN - ' + job.title + ', ' + job.company, '',
      'FIRST 30 DAYS - Learn', '- Meet my manager, team and key stakeholders; understand how success is measured.', '- Get access to systems, data and documentation; map current processes.', '- Learn the product/customers and the team\'s top 3 priorities.', '- Deliver one small, visible win' + (skills[0] ? ' using ' + skills[0] : '') + '.', '',
      'DAYS 31-60 - Contribute', resp[0] ? '- Take ownership of: ' + resp[0] : '- Take ownership of a core workstream.', resp[1] ? '- Improve: ' + resp[1] : '- Identify and fix one process bottleneck.', '- Share early findings and a proposed roadmap with my manager.', skills[1] ? '- Apply ' + skills[1] + ' to a priority problem.' : '', '',
      'DAYS 61-90 - Lead', resp[2] ? '- Lead: ' + resp[2] : '- Lead a project end-to-end.', '- Deliver measurable impact: [metric that matters to this team].', '- Document what I built and mentor others on it.', '- Agree on goals for the next two quarters.'].filter((x) => x !== null).join('\n');
    const ta = h('textarea', { rows: 22, class: 'code' }); ta.value = txt;
    ta.addEventListener('input', WP.debounce(() => WP.store.update('jobs', job.id, { plan306090: ta.value }), 400));
    WP.add(box, h('div', { class: 'card tight row between mb' }, h('div', { class: 'row' }, h('b', null, 'Job:'), ui.select(view.job, st.jobs.map((j) => ({ value: j.id, label: j.company + ' - ' + j.title })), (v) => { view.job = v; WP.app.refresh(); })),
      h('div', { class: 'row' }, ui.copyBtn(() => ta.value, 'Plan', ''), h('button', { class: 'btn', onclick: () => { WP.store.update('jobs', job.id, { plan306090: '' }); WP.app.refresh(); } }, icon('refresh', 14), 'Regenerate'))),
      h('div', { class: 'split-21' }, ta, h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'How to use it'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, h('li', null, 'Bring it to final rounds - as a one-pager or when asked "How would you approach the first months?"'), h('li', null, 'Replace generic lines with what you learned in earlier interviews.'), h('li', null, 'Keep it humble: "Here is my starting hypothesis - I\'d refine it after listening."')))));
  }

  WP.views.interview = {
    title: 'Interview Prep',
    render(root, route) {
      const st = WP.store.state;
      if (route.query.tab) view.tab = route.query.tab;
      if (view.tab !== 'practice' && view.handle) { clearInterval(view.handle); view.handle = null; view.running = false; }
      WP.add(root, S.pageHead({ eyebrow: 'Phase 6 - Win', title: 'Interview prep', desc: 'Stories that prove your skills, practice that builds confidence, and a prep sheet for every interview.' }));
      WP.add(root, ui.tabs([{ id: 'stories', label: 'Story bank', icon: 'star', count: st.stories.length }, { id: 'practice', label: 'Practice', icon: 'play' }, { id: 'prep', label: 'Company prep', icon: 'building' }, { id: 'plan', label: '30-60-90 plan', icon: 'calendar' }], view.tab, (t) => { view.tab = t; S.go('interview?tab=' + t); }));
      const box = h('div'); WP.add(root, box);
      ({ stories: storiesTab, practice: practiceTab, prep: prepTab, plan: plan306090 }[view.tab] || storiesTab)(box, st, route);
    },
  };
})();
