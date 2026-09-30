/* Job Discovery - search builders, saved jobs, and deep job analysis. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc, d } = WP;
  const S = WP.shared; const C = WP.charts;
  const view = { tab: 'saved', q: '', status: 'active', sort: 'match', search: null };

  function highlightJD(text, a) {
    const terms = new Map();
    a.skills.forEach((s) => { const info = WP.engine.skillInfo(s.name); [s.name].concat(info && info.a ? info.a : []).forEach((t) => { if (t && t.length > 1) terms.set(t.toLowerCase(), s.have); }); });
    const safe = esc(text);
    if (!terms.size) return safe;
    const list = Array.from(terms.keys()).sort((x, y) => y.length - x.length).map((t) => esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp('(?<![A-Za-z0-9+#])(' + list.join('|') + ')(?![A-Za-z0-9+#])', 'gi');
    return safe.replace(re, (m) => '<mark class="' + (terms.get(m.toLowerCase()) ? 'hl-have' : 'hl-miss') + '">' + m + '</mark>');
  }

  function detail(root, id) {
    const st = WP.store.state; const job = WP.store.get('jobs', id);
    if (!job) { WP.add(root, ui.empty('search', 'Job not found', 'It may have been deleted.', [h('button', { class: 'btn', onclick: () => S.go('jobs') }, 'Back to jobs')])); return; }
    const a = WP.engine.analyzeJob(job, st.profile);
    const co = job.companyId ? WP.store.get('companies', job.companyId) : null;
    WP.add(root, h('div', { class: 'row mb' }, h('a', { href: '#/jobs', class: 'small row', style: { gap: '4px' } }, icon('chevronLeft', 14), 'All jobs')));
    WP.add(root, S.pageHead({ eyebrow: job.company + (job.location ? ' | ' + job.location : ''), title: job.title,
      desc: [a.workMode ? a.workMode : null, a.seniority ? a.seniority.label : null, a.family ? a.family.name : null, job.source ? 'via ' + job.source : null, 'saved ' + d.rel(job.createdAt)].filter(Boolean).join(' · '),
      actions: [S.statusChip(job.status), job.url ? h('a', { class: 'btn', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 14), 'Posting') : null,
        h('button', { class: 'btn', onclick: () => S.jobForm(job) }, icon('edit', 14), 'Edit'), h('button', { class: 'btn primary', onclick: () => S.go('apply/' + id) }, icon('send', 14), 'Apply Wizard')] }));
    const assist = S.assist('analyze-job', () => ({ job }), { ccArg: job.id });
    if (assist) WP.add(root, h('div', { class: 'mb' }, assist));
    WP.add(root, h('div', { class: 'grid g3' },
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, 'Match score'), h('span', { class: 'sub' }, 'Offline estimate')), C.gauge(a.score),
        h('p', { class: 'small text-2 center' }, a.score >= 75 ? 'Strong fit - prioritize and tailor.' : a.score >= 55 ? 'Worth applying with a well-tailored resume.' : 'A stretch. Apply if you can address the gaps - or find a referral.')),
      h('div', { class: 'card span-2' }, h('div', { class: 'card-h' }, h('h3', null, 'Why this score'), h('span', { class: 'sub' }, 'Hover for details')),
        h('div', { class: 'stack', style: { gap: '9px' } }, a.breakdown.map((b) => C.meter(b.label + ' (' + Math.round(b.weight * 100) + '%)', b.value, 1, { tip: esc(b.tip), color: b.value >= 0.75 ? '#0ca30c' : b.value >= 0.5 ? '#fab219' : '#d03b3b' }))),
        h('div', { class: 'grid g4 mt' }, [['Years asked', a.years != null ? a.years + '+' : '-'], ['You have', '~' + a.profileYears], ['Degree', a.education || '-'], ['Salary', a.salary ? WP.money(a.salary.min, a.salary.currency) + '-' + WP.money(a.salary.max, a.salary.currency) : 'not listed']].map(([k, v]) => h('div', { class: 'card flat tight' }, h('div', { class: 'small muted' }, k), h('b', null, v)))))));
    if (job.aiAnalysis) {
      const x = job.aiAnalysis;
      WP.add(root, h('div', { class: 'card claude mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('sparkles', 16), 'Claude\'s analysis'), h('span', { class: 'sub' }, 'Saved ' + d.rel(x.at) + ' | estimate ' + (x.score || '-') + '%')),
        x.summary ? h('p', null, x.summary) : null,
        h('div', { class: 'grid g2' }, (x.gaps || []).length ? h('div', null, h('h4', null, 'Gaps & mitigation'), h('ul', { class: 'small' }, x.gaps.map((g) => h('li', null, h('b', null, g.skill + ': '), g.mitigation)))) : null,
          (x.interviewFocus || []).length ? h('div', null, h('h4', null, 'They will probe'), h('ul', { class: 'small' }, x.interviewFocus.map((g) => h('li', null, g)))) : null)));
    }
    const skillCell = (s) => h('span', { class: 'chip ' + (s.have ? 'match' : s.must ? 'miss' : 'warn'), 'data-tip': '<b>' + esc(s.name) + '</b><br>' + (s.must ? 'Must-have' : s.nice ? 'Nice-to-have' : 'Mentioned') + ' | weight ' + s.weight + '<br>' + (s.have ? (s.listed ? 'In your skills list' : 'Evidenced in your experience') : 'Not in your profile') }, s.have ? icon('check', 11) : icon('x', 11), s.name);
    WP.add(root, h('div', { class: 'grid g2 mt' },
      h('div', { class: 'card' }, h('h3', null, 'Must-have skills (' + a.must.filter((s) => s.have).length + '/' + a.must.length + ')'), h('div', { class: 'chips mt-sm' }, a.must.map(skillCell), a.must.length ? null : h('span', { class: 'muted small' }, 'No explicit requirements section found - all skills weighted by frequency.')),
        h('h3', { class: 'mt' }, 'Nice-to-have & other skills'), h('div', { class: 'chips mt-sm' }, a.skills.filter((s) => !s.must).map(skillCell))),
      h('div', { class: 'card' }, h('h3', null, 'Recommendations'), a.tips.length ? h('ul', { class: 'small', style: { paddingLeft: '18px' } }, a.tips.map((t) => h('li', { style: { margin: '6px 0' } }, t))) : h('p', { class: 'small muted' }, 'Looks great - tailor your resume and apply.'),
        a.redFlags.length ? h('div', { class: 'mt' }, h('h4', null, 'Questions to ask / watch-outs'), a.redFlags.map((r) => h('div', { class: 'check-item' }, h('span', { class: 'ci warn' }, icon('alert', 12)), h('div', { class: 'small' }, r)))) : null,
        a.greenFlags.length ? h('div', { class: 'mt' }, h('h4', null, 'Positive signals'), h('div', { class: 'chips mt-sm' }, a.greenFlags.map((g) => h('span', { class: 'chip match' }, g)))) : null,
        a.keywords.length ? h('div', { class: 'mt' }, h('h4', null, 'Frequent phrases in this posting'), h('div', { class: 'chips mt-sm' }, a.keywords.slice(0, 14).map((k) => h('span', { class: 'chip ' + (k.have ? 'accent' : ''), 'data-tip': 'Used ' + k.count + 'x' + (k.have ? ' - already in your profile' : '') }, k.term)))) : null)));
    WP.add(root, h('div', { class: 'split-21 mt' },
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('file', 16), 'Job description'), h('div', { class: 'legend', style: { marginTop: 0 } }, h('span', null, h('i', { style: { background: 'var(--good-soft)', border: '1px solid var(--good)' } }), 'you have'), h('span', null, h('i', { style: { background: 'var(--critical-soft)', border: '1px solid var(--critical)' } }), 'gap'))),
        job.description ? h('div', { class: 'jd-text', html: highlightJD(job.description, a) }) : ui.empty('file', 'No description saved', 'Paste the full job description to unlock matching, tailoring and highlights.', [h('button', { class: 'btn primary', onclick: () => S.jobForm(job) }, 'Add description')])),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, 'Next steps'), h('div', { class: 'stack mt-sm' },
          h('button', { class: 'btn primary', onclick: () => S.go('resume/' + id) }, icon('file', 14), job.resumeId ? 'Open tailored resume' : 'Tailor resume'),
          h('button', { class: 'btn', onclick: () => S.go('resume/' + id + '?tab=letter') }, icon('mail', 14), job.coverLetterId ? 'Open cover letter' : 'Write cover letter'),
          h('button', { class: 'btn', onclick: () => S.go('network?tab=find&company=' + job.companyId) }, icon('users', 14), 'Find people at ' + job.company),
          co ? h('button', { class: 'btn', onclick: () => S.go('market?tab=research&company=' + co.id) }, icon('building', 14), 'Research ' + co.name) : null,
          h('button', { class: 'btn', onclick: () => S.jobDrawer(id) }, icon('clock', 14), 'Timeline & status'))),
        h('div', { class: 'card' }, h('h3', null, 'Stage'), h('div', { class: 'chips mt-sm' }, S.JOB_STATUSES.map((s) => h('span', { class: 'chip clickable' + (job.status === s.id ? ' accent' : ''), onclick: () => { S.setJobStatus(job, s.id); WP.app.refresh(); } }, h('span', { class: 'status-dot', style: { background: s.color } }), s.label)))))));
  }

  function saved(box, st) {
    let jobs = st.jobs.slice();
    const q = view.q.toLowerCase();
    if (q) jobs = jobs.filter((j) => (j.title + ' ' + j.company + ' ' + j.location).toLowerCase().includes(q));
    if (view.status === 'active') jobs = jobs.filter((j) => !['rejected', 'withdrawn'].includes(j.status));
    else if (view.status !== 'all') jobs = jobs.filter((j) => j.status === view.status);
    const sorters = { match: (a, b) => (b.match || 0) - (a.match || 0), recent: (a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''), company: (a, b) => a.company.localeCompare(b.company), priority: (a, b) => (a.priority || 2) - (b.priority || 2) || (b.match || 0) - (a.match || 0) };
    jobs.sort(sorters[view.sort]);
    const bins = [['< 40%', 0, 40, 'var(--seq-2)'], ['40-54%', 40, 55, 'var(--seq-3)'], ['55-74%', 55, 75, 'var(--seq-5)'], ['75%+', 75, 101, 'var(--seq-6)']].map(([l, a, b, c]) => ({ label: l, value: st.jobs.filter((j) => (j.match || 0) >= a && (j.match || 0) < b && j.status === 'saved').length, color: c }));
    const search = h('input', { type: 'search', placeholder: 'Search title, company, location...', value: view.q });
    search.addEventListener('input', WP.debounce(() => { view.q = search.value; WP.app.refresh(); setTimeout(() => { const el = WP.$('input[type=search]'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 0); }, 250));
    WP.add(box, h('div', { class: 'split' },
      h('div', null,
        h('div', { class: 'card tight row between mb' }, h('div', { class: 'row grow' }, h('div', { style: { minWidth: '200px', flex: 1 } }, search),
          ui.select(view.status, [{ value: 'active', label: 'Active' }, { value: 'all', label: 'All statuses' }].concat(S.JOB_STATUSES.map((s) => ({ value: s.id, label: s.label }))), (v) => { view.status = v; WP.app.refresh(); }),
          ui.select(view.sort, [{ value: 'match', label: 'Sort: best match' }, { value: 'priority', label: 'Sort: priority' }, { value: 'recent', label: 'Sort: newest' }, { value: 'company', label: 'Sort: company' }], (v) => { view.sort = v; WP.app.refresh(); }))),
        jobs.length ? h('div', { class: 'table-wrap' }, h('table', { class: 'table' },
          h('thead', null, h('tr', null, h('th', null, 'Match'), h('th', null, 'Role'), h('th', null, 'Location'), h('th', null, 'Salary'), h('th', null, 'Stage'), h('th', null, 'Saved'), h('th', null, ''))),
          h('tbody', null, jobs.map((j) => h('tr', { class: 'clickable', onclick: () => S.go('jobs/' + j.id) },
            h('td', null, ui.scoreBadge(j.match, 'Match score - click for analysis')),
            h('td', null, h('div', { style: { fontWeight: 620 } }, j.priority === 1 ? h('span', { style: { color: 'var(--s2)' }, 'data-tip': 'High priority' }, '★ ') : null, j.title), h('div', { class: 'small muted' }, j.company)),
            h('td', { class: 'small' }, (j.location || '-') + (j.workMode ? ' · ' + j.workMode : '')),
            h('td', { class: 'small nowrap' }, j.salaryMin || j.salaryMax ? WP.money(j.salaryMin, j.currency) + '-' + WP.money(j.salaryMax, j.currency) : '-'),
            h('td', null, S.statusChip(j.status)), h('td', { class: 'small muted nowrap' }, d.rel(j.createdAt)),
            h('td', null, h('div', { class: 'row', style: { gap: '4px', flexWrap: 'nowrap' } },
              h('button', { class: 'btn sm', onclick: (e) => { e.stopPropagation(); S.jobDrawer(j.id); } }, 'Quick view'),
              j.status === 'saved' ? h('button', { class: 'btn primary sm', onclick: (e) => { e.stopPropagation(); S.go('apply/' + j.id); } }, 'Apply') : null))))))) :
          h('div', { class: 'card' }, ui.empty('briefcase', st.jobs.length ? 'No jobs match these filters' : 'No saved jobs yet', 'Use the Discover tab to search boards, then save jobs here with their full description to get instant match scores.', [h('button', { class: 'btn primary', onclick: () => S.jobForm(null) }, icon('plus', 14), 'Add a job'), h('button', { class: 'btn', onclick: () => { view.tab = 'discover'; WP.app.refresh(); } }, 'Discover jobs')]))),
      h('div', { class: 'stack-lg sticky-side' },
        h('div', { class: 'card' }, h('h3', null, 'Saved jobs by match'), h('div', { class: 'mt-sm' }, C.barH(bins, { labelWidth: 64, valueWidth: 30, empty: 'No saved jobs' })), h('p', { class: 'small muted mt-sm', style: { marginBottom: 0 } }, 'Threshold for planner proposals: ' + st.settings.matchThreshold + '% (change in settings).')),
        h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'Quick add'), h('p', { class: 'small text-2' }, 'Found a job? Paste its full description - Waypoint extracts skills, years, salary and red flags.'), h('button', { class: 'btn primary block', onclick: () => S.jobForm(null) }, icon('plus', 14), 'Add job')))));
  }

  function discover(box, st, route) {
    const p = st.profile;
    const co = route.query.company ? WP.store.get('companies', route.query.company) : null;
    const s = view.search || (view.search = { q: (p.targetTitles || [])[0] || p.currentTitle || '', loc: (p.targetLocations || []).find((l) => !/remote/i.test(l)) || p.location.split(',')[0] || '', posted: '7', remote: (p.workModes || []).includes('remote') && (p.workModes || []).length === 1, region: st.settings.region });
    const assist = S.assist('find-jobs', () => ({}));
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    const upd = () => WP.app.refresh();
    const qIn = h('input', { type: 'text', value: s.q, placeholder: 'Job title or keywords' }); qIn.addEventListener('change', () => { s.q = qIn.value; upd(); });
    const lIn = h('input', { type: 'text', value: s.loc, placeholder: 'City (leave empty for anywhere)' }); lIn.addEventListener('change', () => { s.loc = lIn.value; upd(); });
    WP.add(box, h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('search', 16), 'Search builder'), h('span', { class: 'sub' }, 'One setup, every board')),
      h('div', { class: 'form-grid' }, ui.field('Keywords / title', qIn), ui.field('Location', lIn),
        ui.field('Posted within', ui.select(s.posted, [{ value: '1', label: '24 hours' }, { value: '3', label: '3 days' }, { value: '7', label: '7 days' }, { value: '30', label: '30 days' }], (v) => { s.posted = v; upd(); })),
        ui.field('Region boards', ui.select(s.region, [['global', 'Global'], ['india', 'India'], ['us', 'United States'], ['uk', 'United Kingdom'], ['eu', 'Europe'], ['canada', 'Canada'], ['australia', 'Australia'], ['mena', 'Middle East'], ['sea', 'Southeast Asia']].map(([v, l]) => ({ value: v, label: l })), (v) => { s.region = v; st.settings.region = v; WP.store.save(); upd(); })),
        h('div', { class: 'field' }, h('label', null, 'Remote only'), ui.switch(!!s.remote, (v) => { s.remote = v; upd(); }))),
      (p.targetTitles || []).length > 1 ? h('div', { class: 'chips mt' }, h('span', { class: 'small muted' }, 'Your targets: '), p.targetTitles.map((t) => h('span', { class: 'chip clickable' + (t === s.q ? ' accent' : ''), onclick: () => { s.q = t; upd(); } }, t))) : null));
    const boards = WP.engine.jobBoards(s.region, s.q, s.remote ? '' : s.loc, { posted: s.posted, remote: s.remote });
    const tiles = (arr) => h('div', { class: 'grid g-auto' }, arr.map((b) => ui.linkTile(b.name, b.url, b.sub, b.icon)));
    WP.add(box, h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('globe', 16), 'Job boards'), h('span', { class: 'sub' }, '"' + s.q + '"' + (s.loc && !s.remote ? ' in ' + s.loc : '') + (s.remote ? ' (remote)' : ''))),
      tiles(boards.base), boards.regional.length ? h('div', null, h('h4', { class: 'mt' }, 'Regional'), h('div', { class: 'mt-sm' }, tiles(boards.regional))) : null,
      h('h4', { class: 'mt' }, 'Remote-first & startups'), h('div', { class: 'mt-sm' }, tiles(boards.remote))));
    const x = WP.engine.atsXray(s.q, s.remote ? 'remote' : s.loc);
    WP.add(box, h('div', { class: 'card mt accent' }, h('div', { class: 'card-h' }, h('h3', null, icon('eye', 16), 'Hidden jobs: search company hiring systems directly'), h('a', { class: 'btn primary sm', href: x.all, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 13), 'Search all at once')),
      h('p', { class: 'small text-2' }, 'Most companies post first on their own applicant-tracking system (ATS). These Google searches surface fresh postings on Greenhouse, Lever, Ashby, Workday and others - often before they reach the big boards, with less competition.'),
      h('div', { class: 'grid g-auto-sm' }, x.each.map((e) => ui.linkTile(e.name, e.url, e.sub, 'search'))),
      h('div', { class: 'mt' }, h('h4', null, 'The query (copy it to tweak)'), h('div', { class: 'mt-sm' }, ui.codeblock(x.allQuery, 'Query')))));
    const targets = co ? [co] : st.companies.filter((c) => c.tier !== 'C').slice(0, 12);
    if (targets.length) WP.add(box, h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('building', 16), co ? 'Open roles at ' + co.name : 'Your target companies\' careers pages'), co ? h('a', { href: '#/jobs?tab=discover', class: 'small' }, 'Show all targets') : null),
      h('div', { class: 'grid g-auto' }, targets.map((c) => ui.linkTile(c.name, WP.engine.google('"' + c.name + '" careers "' + WP.engine.coreTitle(s.q) + '"'), 'Tier ' + c.tier + ' - search careers page', 'building')))));
    WP.add(box, h('div', { class: 'grid g2 mt' },
      h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'Search like a recruiter'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
        h('li', null, 'Use quotes for exact titles: "data analyst".'), h('li', null, 'Combine alternatives: ("analytics engineer" OR "BI engineer").'), h('li', null, 'Exclude noise: -senior -intern -contract.'),
        h('li', null, 'Search the last 24-72 hours: early applicants get more callbacks.'), h('li', null, 'Look for your target titles plus your top 2 skills to find better matches.'))),
      h('div', { class: 'card' }, h('h3', null, icon('clock', 16), 'Set up alerts once'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
        h('li', null, 'LinkedIn: open the LinkedIn search above and switch on "Set alert".'), h('li', null, 'Indeed/Naukri/Reed: save the search and choose daily email.'), h('li', null, 'Google Alerts: create one for your ATS query above.'),
        h('li', null, 'When an alert arrives, paste the job into Waypoint to score it in seconds.')))));
  }

  WP.views.jobs = {
    title: 'Job Discovery',
    render(root, route) {
      if (route.parts[0]) { detail(root, route.parts[0]); return; }
      const st = WP.store.state;
      if (route.query.tab) view.tab = route.query.tab;
      WP.add(root, S.pageHead({ eyebrow: 'Phase 3 - Discover', title: 'Job discovery', desc: 'Search every major board in one click, find hidden postings on company hiring systems, and score each job against your profile the moment you save it.',
        actions: [h('button', { class: 'btn primary', onclick: () => S.jobForm(null) }, icon('plus', 15), 'Add job')] }));
      WP.add(root, ui.tabs([{ id: 'saved', label: 'Saved jobs', icon: 'briefcase', count: st.jobs.length }, { id: 'discover', label: 'Discover', icon: 'search' }], view.tab, (t) => { view.tab = t; S.go('jobs?tab=' + t); }));
      const box = h('div'); WP.add(root, box);
      if (view.tab === 'discover') discover(box, st, route); else saved(box, st);
    },
  };
})();
