/* Profile & master resume. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, d } = WP;
  const S = WP.shared;
  const view = { tab: 'import', parsed: null };

  async function pdfText(file) {
    if (!window.pdfjsLib) {
      await new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'; s.onload = res; s.onerror = () => rej(new Error('Could not load the PDF reader (needs internet). Paste your resume text instead.')); document.head.appendChild(s); });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    const buf = await ui.readBuffer(file);
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    let out = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i); const tc = await page.getTextContent();
      let lastY = null, line = '';
      tc.items.forEach((it) => { const y = Math.round(it.transform[5]); if (lastY !== null && Math.abs(y - lastY) > 2) { out += line.trim() + '\n'; line = ''; } line += (line && !line.endsWith(' ') ? ' ' : '') + it.str; lastY = y; });
      out += line.trim() + '\n\n';
    }
    return out.replace(/[ \t]+\n/g, '\n');
  }

  function strengthCard(st) {
    const ps = WP.engine.profileStrength(st.profile, st);
    const tabFor = { basics: 'basics', targets: 'basics', skills: 'skills', experience: 'experience', education: 'education', stories: null };
    return h('div', { class: 'card' },
      h('div', { class: 'row', style: { flexWrap: 'nowrap', marginBottom: '8px' } }, WP.charts.ring(ps.score, 100, { size: 76, color: ps.score >= 70 ? '#0ca30c' : ps.score >= 40 ? '#fab219' : '#d03b3b', center: ps.score + '%', label: 'Profile strength' }),
        h('div', null, h('h3', null, 'Profile strength'), h('div', { class: 'small muted' }, ps.score >= 85 ? 'Excellent - ready to tailor.' : ps.score >= 70 ? 'Good. A few quick wins left.' : 'Complete the items below for better matches.'))),
      h('div', null, ps.items.map((i) => h('div', { class: 'check-item', style: { cursor: tabFor[i.where] ? 'pointer' : 'default' }, onclick: () => { if (tabFor[i.where]) { view.tab = tabFor[i.where]; WP.app.refresh(); } else if (i.where === 'stories') S.go('interview'); } },
        h('span', { class: 'ci ' + (i.done ? 'pass' : 'todo') }, icon(i.done ? 'check' : 'circle', 12)), h('div', { class: 'small' }, i.label, i.detail && !i.done ? h('span', { class: 'muted' }, ' (' + i.detail + ')') : null)))));
  }

  function importTab(box, st) {
    const p = st.profile;
    const ta = h('textarea', { rows: 16, placeholder: 'Paste your full resume text here (from Word, Google Docs, a PDF or your LinkedIn profile)...' });
    ta.value = p.rawResume || '';
    ta.addEventListener('input', () => { p.rawResume = ta.value; WP.store.save(); });
    const parse = () => {
      if (!ta.value.trim()) { ui.toast('Paste your resume first', 'bad'); return; }
      p.rawResume = ta.value; view.parsed = WP.engine.parseResume(ta.value); WP.store.save(); WP.app.refresh();
    };
    WP.add(box, h('div', { class: 'card' },
      h('div', { class: 'card-h' }, h('h3', null, icon('upload', 16), 'Import your current resume'), h('div', { class: 'row' },
        h('button', { class: 'btn sm', onclick: async () => {
          const f = await ui.pickFile('.txt,.md,.pdf,.text'); if (!f) return;
          try { ta.value = /\.pdf$/i.test(f.name) ? await pdfText(f) : await ui.readText(f); p.rawResume = ta.value; WP.store.save(); ui.toast('Loaded ' + f.name); }
          catch (e) { ui.toast(e.message || 'Could not read that file', 'bad'); }
        } }, icon('upload', 14), 'Upload .pdf / .txt / .md'))),
      h('p', { class: 'small text-2' }, 'Word file? Save it as PDF or copy-paste the text. Waypoint detects sections (summary, experience, education, skills...), roles with dates, bullets and 600+ skills.'),
      ta,
      h('div', { class: 'row mt' }, h('button', { class: 'btn primary', onclick: parse }, icon('wand', 15), 'Parse resume'), h('span', { class: 'small muted' }, 'You will review everything before it is saved.'))));
    const assist = S.assist('parse-resume', () => ({ text: ta.value }));
    if (assist) WP.add(box, h('div', { class: 'mt' }, assist));
    if (view.parsed) {
      const x = view.parsed;
      WP.add(box, h('div', { class: 'card mt accent' },
        h('div', { class: 'card-h' }, h('h3', null, icon('shieldCheck', 16), 'Review what was found'), h('button', { class: 'btn ghost sm', onclick: () => { view.parsed = null; WP.app.refresh(); } }, icon('x', 13), 'Discard')),
        h('div', { class: 'grid g4' }, [['Roles', x.experience.length], ['Bullets', x.experience.reduce((a, e) => a + e.bullets.length, 0)], ['Skills', x.skills.length], ['Education', x.education.length]].map(([l, v]) => h('div', { class: 'card flat tight kpi' }, h('div', { class: 'label' }, l), h('div', { class: 'value', style: { fontSize: '22px' } }, v)))),
        h('dl', { class: 'kv mt' }, [['Name', x.name], ['Headline', x.headline], ['Email', x.email], ['Phone', x.phone], ['LinkedIn', x.linkedin], ['Location', x.location], ['Years (est.)', x.yearsExperience]].filter((r) => r[1]).map(([k, v]) => [h('dt', null, k), h('dd', null, String(v))])),
        h('h4', { class: 'mt' }, 'Skills'), h('div', { class: 'chips mt-sm' }, x.skills.slice(0, 40).map((s) => h('span', { class: 'chip accent' }, s))),
        h('h4', { class: 'mt' }, 'Experience'), h('div', { class: 'pre mt-sm' }, x.experience.map((e) => (e.title || '?') + ' - ' + (e.company || '?') + ' (' + (e.start || '?') + ' to ' + (e.current ? 'present' : e.end || '?') + ')\n' + e.bullets.map((b) => '  - ' + b).join('\n')).join('\n\n') || 'No roles detected - check that your experience section has a heading like "Experience".'),
        h('div', { class: 'row mt' },
          h('button', { class: 'btn primary', onclick: () => { S.applyProfile(x, 'replace'); if (x.email) p.email = x.email; if (x.phone) p.phone = x.phone; view.parsed = null; view.tab = 'basics'; WP.store.touchProfile(); WP.engine.refreshMatches(st); ui.toast('Profile updated - now review your basics & targets'); WP.app.refresh(); } }, icon('check', 14), 'Use this as my profile'),
          h('button', { class: 'btn', onclick: () => { S.applyProfile(x, 'merge'); if (!p.email && x.email) p.email = x.email; if (!p.phone && x.phone) p.phone = x.phone; view.parsed = null; WP.store.touchProfile(); ui.toast('Merged into your existing profile'); WP.app.refresh(); } }, 'Merge (only fill empty fields)'))));
    }
  }

  function basicsTab(box, st, refreshSide) {
    const p = st.profile; const save = () => { WP.store.touchProfile(); };
    const f = (label, key, attrs, hint) => ui.field(label, ui.input(p[key], (v) => { p[key] = v; save(); }, Object.assign({ onchange: refreshSide }, attrs || {})), hint);
    const fams = (WP.K && WP.K.roleFamilies) || [];
    const sumTa = ui.textarea(p.summary, (v) => { p.summary = v; save(); wc.textContent = v.split(/\s+/).filter(Boolean).length + ' words (aim for 40-80)'; }, { rows: 4, onchange: refreshSide });
    const wc = h('span', { class: 'hint' }, String(p.summary || '').split(/\s+/).filter(Boolean).length + ' words (aim for 40-80)');
    const cs = p.careerSwitch;
    WP.add(box, 
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('user', 16), 'About you')),
        h('div', { class: 'form-grid' }, f('Full name', 'name'), f('Headline', 'headline', { placeholder: 'e.g. Data Analyst | SQL, Python, Power BI' }), f('Email', 'email', { type: 'email' }), f('Phone', 'phone', { type: 'tel' }),
          f('Location', 'location', { placeholder: 'City, Country' }), f('LinkedIn URL', 'linkedin'), f('GitHub', 'github'), f('Website / portfolio', 'website'),
          f('Current title', 'currentTitle'), f('Current company', 'currentCompany'), f('Years of experience', 'yearsExperience', { type: 'number', min: 0, step: 0.5 }, 'Computed from your roles: ' + WP.engine.years(p))),
        h('div', { class: 'field mt' }, h('label', null, 'Professional summary'), sumTa, wc)),
      h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('target', 16), 'What you are looking for')),
        h('div', { class: 'form-grid' },
          h('div', { class: 'field full' }, h('label', null, 'Target job titles'), ui.tagInput({ values: p.targetTitles, onChange: (v) => { p.targetTitles = v; save(); WP.engine.refreshMatches(st); }, placeholder: 'e.g. Senior Data Analyst, then Enter', getSuggestions: (q) => WP.uniq([].concat(...fams.map((fm) => fm.titles || []))).filter((t) => t.toLowerCase().includes(q.toLowerCase())).slice(0, 8).map((t) => ({ label: t })) })),
          h('div', { class: 'field full' }, h('label', null, 'Target locations'), ui.tagInput({ values: p.targetLocations, onChange: (v) => { p.targetLocations = v; save(); }, placeholder: 'e.g. Bengaluru, Remote' })),
          h('div', { class: 'field' }, h('label', null, 'Work modes'), h('div', { class: 'row' }, ['remote', 'hybrid', 'onsite'].map((m) => h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: p.workModes.includes(m), onchange: (e) => { p.workModes = e.target.checked ? WP.uniq(p.workModes.concat(m)) : p.workModes.filter((x) => x !== m); save(); } }), m)))),
          ui.field('Salary currency', ui.select(p.salary.currency || st.settings.currency, ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'AUD', 'SGD', 'AED', 'JPY'], (v) => { p.salary.currency = v; st.settings.currency = v; save(); })),
          ui.field('Current salary (annual)', ui.input(p.salary.current, (v) => { p.salary.current = +v || 0; save(); }, { type: 'number', min: 0 })),
          ui.field('Expected salary (annual)', ui.input(p.salary.expected, (v) => { p.salary.expected = +v || 0; save(); }, { type: 'number', min: 0, onchange: refreshSide })),
          ui.field('Walk-away minimum', ui.input(p.salary.minimum, (v) => { p.salary.minimum = +v || 0; save(); }, { type: 'number', min: 0 })),
          f('Notice period', 'noticePeriod', { placeholder: 'e.g. 30 days' }), f('Work authorization', 'workAuth', { placeholder: 'e.g. Citizen, needs visa sponsorship...' }),
          h('div', { class: 'field' }, h('label', null, 'Open to relocation'), ui.switch(!!p.relocate, (v) => { p.relocate = v; save(); }, p.relocate ? 'Yes' : 'No')))),
      h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('route', 16), 'Switching careers?'), ui.switch(!!cs.active, (v) => { cs.active = v; save(); WP.engine.refreshMatches(st); WP.app.refresh(); }, cs.active ? 'Career switch mode on' : 'Off')),
        h('p', { class: 'small text-2' }, 'Turn this on to get switch-aware summaries and cover letters, match scoring that credits your target field, and a transition roadmap in Market & Targets.'),
        cs.active ? h('div', { class: 'form-grid' },
          ui.field('From (current field)', ui.select(cs.fromFamily, [{ value: '', label: 'Choose...' }].concat(fams.map((fm) => ({ value: fm.id, label: fm.name }))), (v) => { cs.fromFamily = v; save(); })),
          ui.field('To (target field)', ui.select(cs.toFamily, [{ value: '', label: 'Choose...' }].concat(fams.map((fm) => ({ value: fm.id, label: fm.name }))), (v) => { cs.toFamily = v; save(); WP.engine.refreshMatches(st); })),
          ui.field('Why you are switching (for your story)', ui.textarea(cs.motivation, (v) => { cs.motivation = v; save(); }, { rows: 2 }), null, 'full'),
          h('div', { class: 'full' }, h('button', { class: 'btn sm', onclick: () => S.go('market?tab=switch') }, icon('route', 13), 'Open the Career Switch planner'))) : null));
  }

  function skillsTab(box, st) {
    const p = st.profile; const E = WP.engine;
    const ps = E.profileSkills(p);
    const mentioned = Array.from(ps.mentioned).filter((s) => !ps.listed.has(s));
    const ins = E.insights(st);
    const byCat = {}; (p.skills || []).forEach((s) => { const c = (E.skillInfo(s) || {}).c || 'Other'; byCat[c] = (byCat[c] || 0) + 1; });
    WP.add(box, 
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('layers', 16), 'Your skills (' + p.skills.length + ')'), h('span', { class: 'sub' }, 'Type to search 600+ skills, or add your own')),
        ui.tagInput({ values: p.skills, onChange: (v) => { p.skills = WP.uniq(v.map(E.canonSkill)); WP.store.touchProfile(); E.refreshMatches(st); }, getSuggestions: E.suggestSkills, placeholder: 'Add a skill...' }),
        h('p', { class: 'small muted mt-sm' }, 'Tip: list the tools and methods you would be comfortable being interviewed on. Waypoint never adds skills to your resume that are not here.')),
      h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('h3', null, 'Found in your experience, not listed'), h('p', { class: 'small text-2' }, 'Click to add - they are already evidenced by your bullets.'),
          mentioned.length ? h('div', { class: 'chips' }, mentioned.map((s) => h('span', { class: 'chip clickable accent', onclick: () => { p.skills = WP.uniq(p.skills.concat(s)); WP.store.touchProfile(); WP.app.refresh(); } }, icon('plus', 11), s))) : h('div', { class: 'muted small' }, 'Nothing extra found.')),
        h('div', { class: 'card' }, h('h3', null, 'Wanted by your saved jobs, missing here'), h('p', { class: 'small text-2' }, 'Add only if you truly have it; otherwise add it to your learning plan.'),
          ins.gaps.length ? h('div', { class: 'chips' }, ins.gaps.slice(0, 16).map((g) => h('span', { class: 'chip ' + (g.must ? 'miss' : 'warn') + ' clickable', 'data-tip': 'In ' + g.count + ' saved job(s). Click: I have this skill', onclick: () => { p.skills = WP.uniq(p.skills.concat(g.name)); WP.store.touchProfile(); E.refreshMatches(st); WP.app.refresh(); } }, g.name, ' · ' + g.count))) : h('div', { class: 'muted small' }, 'Save some jobs to see what the market wants.'))),
      h('div', { class: 'card mt' }, h('h3', null, 'Skill mix by category'), h('div', { class: 'mt' }, WP.charts.barH(Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([c, n]) => ({ label: c, value: n })), { labelWidth: 180, empty: 'Add skills to see your mix' }))));
  }

  function bulletRow(e, i, rerender) {
    const b = e.bullets[i]; const bi = WP.engine.bullet(b);
    const ta = h('textarea', { rows: 2, style: { minHeight: '44px' } }); ta.value = b;
    const chip = h('span', { class: 'chip ' + (bi.quality === 'strong' ? 'match' : bi.quality === 'ok' ? 'warn' : 'miss'), 'data-tip': bi.tips.length ? bi.tips.map(WP.esc).join('<br>') : 'Strong bullet: action verb + measurable result.' }, bi.quality);
    ta.addEventListener('input', () => { e.bullets[i] = ta.value; WP.store.touchProfile(); });
    ta.addEventListener('change', rerender);
    return h('div', { class: 'row top', style: { flexWrap: 'nowrap', gap: '8px', marginBottom: '6px' } },
      h('div', { style: { paddingTop: '10px', color: 'var(--muted)' } }, '•'), h('div', { class: 'grow' }, ta, bi.tips.length ? h('div', { class: 'small muted', style: { marginTop: '2px' } }, bi.tips[0]) : null),
      h('div', { class: 'stack', style: { gap: '4px', alignItems: 'flex-end' } }, chip,
        h('div', { class: 'row', style: { gap: '2px', flexWrap: 'nowrap' } },
          bi.quality !== 'strong' ? h('button', { class: 'btn ghost icon sm', 'data-tip': 'Quick fix: stronger verb + a placeholder for the result', onclick: () => { e.bullets[i] = WP.engine.improveBullet(b); WP.store.touchProfile(); rerender(); } }, icon('wand', 14)) : null,
          i > 0 ? h('button', { class: 'btn ghost icon sm', 'aria-label': 'Move up', onclick: () => { e.bullets.splice(i - 1, 0, e.bullets.splice(i, 1)[0]); WP.store.touchProfile(); rerender(); } }, icon('chevronUp', 14)) : null,
          h('button', { class: 'btn ghost icon sm', 'aria-label': 'Delete bullet', onclick: () => { e.bullets.splice(i, 1); WP.store.touchProfile(); rerender(); } }, icon('trash', 14)))));
  }

  function experienceTab(box, st) {
    const p = st.profile;
    const all = [].concat(...p.experience.map((e) => e.bullets));
    const q = { strong: 0, ok: 0, weak: 0 }; all.forEach((b) => { q[WP.engine.bullet(b).quality]++; });
    WP.add(box, h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('award', 16), 'Bullet coach'), h('span', { class: 'sub' }, all.length + ' bullets')),
      h('div', { style: { display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', gap: '2px', background: 'var(--surface-3)' } },
        [['strong', 'var(--good)'], ['ok', 'var(--warn)'], ['weak', 'var(--critical)']].filter(([k]) => q[k]).map(([k, c]) => h('div', { style: { width: (q[k] / (all.length || 1)) * 100 + '%', background: c }, 'data-tip': k + ': ' + q[k] }))),
      h('div', { class: 'legend' }, h('span', null, h('i', { style: { background: 'var(--good)' } }), 'Strong ' + q.strong), h('span', null, h('i', { style: { background: 'var(--warn)' } }), 'OK ' + q.ok), h('span', null, h('i', { style: { background: 'var(--critical)' } }), 'Weak ' + q.weak)),
      h('p', { class: 'small text-2 mt-sm', style: { marginBottom: 0 } }, 'Formula: strong action verb + what you did + measurable result (number, %, time or money saved). Hover a quality chip for specific tips.')));
    const assist = S.assist('improve-bullets', () => ({}));
    if (assist) WP.add(box, h('div', { class: 'mt' }, assist));
    p.experience.forEach((e, idx) => {
      const slot = h('div');
      const draw = () => { WP.clear(slot); slot.appendChild(buildCard()); };
      const buildCard = () => {
        const c = h('div', { class: 'card mt' });
        const set = (k) => (v) => { e[k] = v; WP.store.touchProfile(); };
        WP.add(c, h('div', { class: 'card-h' }, h('h3', null, icon('briefcase', 16), (e.title || 'Role') + (e.company ? ' - ' + e.company : '')),
          h('div', { class: 'row' },
            idx > 0 ? h('button', { class: 'btn ghost sm', onclick: () => { p.experience.splice(idx - 1, 0, p.experience.splice(idx, 1)[0]); WP.store.touchProfile(); WP.app.refresh(); } }, icon('chevronUp', 13), 'Move up') : null,
            h('button', { class: 'btn ghost sm danger', 'aria-label': 'Remove role', onclick: async () => { if (await ui.confirm({ title: 'Remove this role?', okText: 'Remove', danger: true })) { p.experience.splice(idx, 1); WP.store.touchProfile(); WP.app.refresh(); } } }, icon('trash', 13)))),
          h('div', { class: 'form-grid' }, ui.field('Title', ui.input(e.title, set('title'))), ui.field('Company', ui.input(e.company, set('company'))), ui.field('Location', ui.input(e.location, set('location'))),
            ui.field('Start', ui.input(e.start, set('start'), { type: 'month' })), ui.field('End', ui.input(e.end, set('end'), { type: 'month', disabled: e.current })),
            h('div', { class: 'field' }, h('label', null, 'Current role'), ui.switch(!!e.current, (v) => { e.current = v; if (v) e.end = ''; WP.store.touchProfile(); draw(); }))),
          h('h4', { class: 'mt' }, 'Bullets'), h('div', { class: 'mt-sm' }, e.bullets.map((_, i) => bulletRow(e, i, draw))),
          h('button', { class: 'btn sm', onclick: () => { e.bullets.push(''); WP.store.touchProfile(); draw(); } }, icon('plus', 13), 'Add bullet'));
        return c;
      };
      draw();
      box.appendChild(slot);
    });
    WP.add(box, h('button', { class: 'btn mt', onclick: () => { p.experience.unshift({ id: WP.uid('exp'), title: '', company: '', location: '', start: '', end: '', current: false, bullets: [''] }); WP.store.touchProfile(); WP.app.refresh(); } }, icon('plus', 14), 'Add a role'));
  }

  function educationTab(box, st) {
    const p = st.profile; const save = () => WP.store.touchProfile();
    WP.add(box, h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('grad', 16), 'Education'), h('button', { class: 'btn sm', onclick: () => { p.education.push({ id: WP.uid('edu'), degree: '', school: '', year: '', details: '' }); save(); WP.app.refresh(); } }, icon('plus', 13), 'Add')),
      p.education.length ? p.education.map((e, i) => h('div', { class: 'form-grid', style: { paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border)' } },
        ui.field('Degree', ui.input(e.degree, (v) => { e.degree = v; save(); })), ui.field('School', ui.input(e.school, (v) => { e.school = v; save(); })),
        ui.field('Year', ui.input(e.year, (v) => { e.year = v; save(); })), ui.field('Details', ui.input(e.details, (v) => { e.details = v; save(); }, { placeholder: 'GPA, honors, minor...' })),
        h('div', { class: 'field', style: { justifyContent: 'flex-end' } }, h('button', { class: 'btn ghost sm danger', onclick: () => { p.education.splice(i, 1); save(); WP.app.refresh(); } }, icon('trash', 13), 'Remove')))) : h('div', { class: 'muted small' }, 'No education added.')),
      h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('rocket', 16), 'Projects'), h('button', { class: 'btn sm', onclick: () => { p.projects.push({ id: WP.uid('prj'), name: '', link: '', description: '', bullets: [] }); save(); WP.app.refresh(); } }, icon('plus', 13), 'Add')),
        p.projects.length ? p.projects.map((x, i) => h('div', { class: 'form-grid', style: { paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border)' } },
          ui.field('Name', ui.input(x.name, (v) => { x.name = v; save(); })), ui.field('Link', ui.input(x.link, (v) => { x.link = v; save(); })),
          ui.field('Description', ui.input(x.description, (v) => { x.description = v; save(); }), null, 'full'),
          ui.field('Highlights (one per line)', ui.textarea((x.bullets || []).join('\n'), (v) => { x.bullets = v.split('\n').map((s) => s.trim()).filter(Boolean); save(); }, { rows: 2 }), null, 'full'),
          h('div', null, h('button', { class: 'btn ghost sm danger', onclick: () => { p.projects.splice(i, 1); save(); WP.app.refresh(); } }, icon('trash', 13), 'Remove')))) : h('div', { class: 'muted small' }, 'Projects are great proof for career switchers and early-career candidates.')),
      h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('h3', null, 'Certifications'), h('div', { class: 'mt-sm' }, ui.tagInput({ values: p.certifications, onChange: (v) => { p.certifications = v; save(); }, placeholder: 'Add a certification...' }))),
        h('div', { class: 'card' }, h('h3', null, 'Languages'), h('div', { class: 'mt-sm' }, ui.tagInput({ values: p.languages, onChange: (v) => { p.languages = v; save(); }, placeholder: 'e.g. English (fluent)' })))),
      h('div', { class: 'card mt' }, h('h3', null, 'Awards & achievements'), h('div', { class: 'mt-sm' }, ui.textarea((p.achievements || []).join('\n'), (v) => { p.achievements = v.split('\n').map((s) => s.trim()).filter(Boolean); save(); }, { rows: 3, placeholder: 'One per line' }))));
  }

  WP.views.profile = {
    title: 'Profile & Resume',
    render(root, route) {
      const st = WP.store.state;
      if (route.query.tab) view.tab = route.query.tab;
      if (!st.profile.rawResume && !st.profile.experience.length && view.tab !== 'import' && !route.query.tab) view.tab = 'import';
      WP.add(root, S.pageHead({ eyebrow: 'Phase 1 - Prepare', title: 'Profile & master resume', desc: 'The single source of truth for everything Waypoint writes. Tailored resumes only ever select, reorder and rephrase what is here - so keep it complete and honest.',
        actions: [h('button', { class: 'btn', onclick: () => S.go('resume') }, icon('file', 15), 'Open Resume Studio')] }));
      WP.add(root, ui.tabs([
        { id: 'import', label: 'Import resume', icon: 'upload' }, { id: 'basics', label: 'Basics & targets', icon: 'user' }, { id: 'skills', label: 'Skills', icon: 'layers', count: st.profile.skills.length },
        { id: 'experience', label: 'Experience', icon: 'briefcase', count: st.profile.experience.length }, { id: 'education', label: 'Education & more', icon: 'grad' },
      ], view.tab, (t) => { view.tab = t; WP.app.refresh(); }));
      const main = h('div'); const side = h('div', { class: 'stack-lg sticky-side' });
      const refreshSide = () => { WP.clear(side); WP.add(side, strengthCard(st)); };
      WP.add(root, h('div', { class: 'split' }, main, side));
      refreshSide();
      WP.add(side, h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'Tips'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
        h('li', null, 'Keep ALL your experience here - tailoring picks the most relevant parts per job.'), h('li', null, 'Numbers make bullets 2-3x more convincing. Estimate honestly if you must ("~10 hours/week").'),
        h('li', null, 'Target titles drive job search links, match scores and people searches.'))));
      ({ import: importTab, basics: basicsTab, skills: skillsTab, experience: experienceTab, education: educationTab }[view.tab] || importTab)(main, st, refreshSide);
    },
  };
})();
