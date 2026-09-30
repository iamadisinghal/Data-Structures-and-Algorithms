/* Resume Studio - tailored resumes & cover letters, ATS checks, exports. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc, d } = WP;
  const S = WP.shared; const C = WP.charts;

  /* ================================================== renderer / export */
  const R = (WP.resume = {});
  const TEMPLATES = [{ id: 'classic', label: 'Classic' }, { id: 'modern', label: 'Modern' }, { id: 'compact', label: 'Compact' }];
  R.TEMPLATES = TEMPLATES;
  function body(dt, mark) {
    mark = mark || esc;
    let s = '<h1>' + esc(dt.name || 'Your Name') + '</h1>';
    if (dt.headline) s += '<div class="d-headline">' + esc(dt.headline) + '</div>';
    if ((dt.contact || []).length) s += '<div class="d-contact">' + dt.contact.map(esc).join(' &nbsp;|&nbsp; ') + '</div>';
    if (dt.summary) s += '<h2>Summary</h2><p>' + mark(dt.summary) + '</p>';
    if ((dt.skills || []).length) s += '<h2>Skills</h2><p>' + dt.skills.map(mark).join(' &bull; ') + '</p>';
    if ((dt.experience || []).length) {
      s += '<h2>Experience</h2>';
      dt.experience.forEach((e, i) => {
        s += '<div class="d-role"><span>' + esc(e.title || '') + '</span><span>' + esc(e.dates || '') + '</span></div>';
        s += '<div class="d-sub"><span>' + esc(e.company || '') + '</span><span>' + esc(e.location || '') + '</span></div>';
        s += '<ul>' + (e.bullets || []).filter(Boolean).map((b, j) => '<li data-e="' + i + '" data-b="' + j + '">' + mark(b) + '</li>').join('') + '</ul>';
      });
    }
    if ((dt.projects || []).length) {
      s += '<h2>Projects</h2>';
      dt.projects.forEach((x) => { s += '<div class="d-role"><span>' + esc(x.name || '') + '</span><span>' + esc(x.link || '') + '</span></div>' + (x.description ? '<p>' + mark(x.description) + '</p>' : '') + ((x.bullets || []).length ? '<ul>' + x.bullets.map((b) => '<li>' + mark(b) + '</li>').join('') + '</ul>' : ''); });
    }
    if ((dt.education || []).length) {
      s += '<h2>Education</h2>';
      dt.education.forEach((e) => { s += '<div class="d-role"><span>' + esc(e.degree || '') + '</span><span>' + esc(e.year || '') + '</span></div><div class="d-sub"><span>' + esc(e.school || '') + '</span><span>' + esc(e.details || '') + '</span></div>'; });
    }
    if ((dt.certifications || []).length) s += '<h2>Certifications</h2><ul>' + dt.certifications.map((c) => '<li>' + mark(c) + '</li>').join('') + '</ul>';
    if ((dt.languages || []).length) s += '<h2>Languages</h2><p>' + dt.languages.map(esc).join(' &bull; ') + '</p>';
    return s;
  }
  R.render = function (dt, template, opts) {
    opts = opts || {};
    let mark = esc;
    if (opts.highlight && opts.highlight.length) {
      const terms = [];
      opts.highlight.forEach((n) => { const info = WP.engine.skillInfo(n); [n].concat(info && info.a ? info.a : []).forEach((t) => { if (t && t.length > 1) terms.push(esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); }); });
      terms.sort((a, b) => b.length - a.length);
      const re = new RegExp('(?<![A-Za-z0-9+#])(' + terms.join('|') + ')(?![A-Za-z0-9+#])', 'gi');
      mark = (t) => esc(t).replace(re, '<mark>$1</mark>');
    }
    const doc = h('div', { class: 'doc t-' + (template || 'classic') });
    doc.innerHTML = body(dt, mark);
    if (opts.editable && opts.onEdit) {
      doc.querySelectorAll('li[data-e]').forEach((li) => {
        li.contentEditable = 'true'; li.classList.add('editable-bullet'); li.spellcheck = true;
        li.title = 'Click to edit this bullet for this version';
        li.addEventListener('blur', () => opts.onEdit(+li.dataset.e, +li.dataset.b, li.textContent.trim()));
      });
    }
    return doc;
  };
  const DOC_CSS = 'body{font-family:Calibri,"Segoe UI",Arial,sans-serif;font-size:10.5pt;line-height:1.4;color:#111;max-width:780px;margin:24px auto;padding:0 24px}h1{font-size:20pt;margin:0}h2{font-size:11pt;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid #222;padding-bottom:2px;margin:14px 0 6px}.d-headline{font-size:11pt;color:#333}.d-contact{font-size:9.5pt;color:#333;margin-top:4px}.d-role{display:flex;justify-content:space-between;font-weight:bold;margin-top:8px}.d-sub{display:flex;justify-content:space-between;font-style:italic;color:#444}ul{margin:4px 0;padding-left:18px}li{margin:2px 0}p{margin:0 0 6px}@page{margin:14mm}';
  R.html = (dt, title) => '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(title || dt.name || 'Resume') + '</title><style>' + DOC_CSS + '</style></head><body>' + body(dt) + '</body></html>';
  R.word = (dt) => "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title><style>" + DOC_CSS.replace(/display:flex;justify-content:space-between;/g, '') + '</style></head><body>' + body(dt) + '</body></html>';
  R.text = function (dt) {
    const L = [];
    L.push((dt.name || '').toUpperCase()); if (dt.headline) L.push(dt.headline); if ((dt.contact || []).length) L.push(dt.contact.join(' | '));
    if (dt.summary) L.push('', 'SUMMARY', dt.summary);
    if ((dt.skills || []).length) L.push('', 'SKILLS', dt.skills.join(', '));
    if ((dt.experience || []).length) { L.push('', 'EXPERIENCE'); dt.experience.forEach((e) => { L.push('', e.title + ' - ' + e.company + (e.location ? ', ' + e.location : '') + (e.dates ? ' | ' + e.dates : '')); (e.bullets || []).filter(Boolean).forEach((b) => L.push('- ' + b)); }); }
    if ((dt.projects || []).length) { L.push('', 'PROJECTS'); dt.projects.forEach((x) => { L.push(x.name + (x.link ? ' (' + x.link + ')' : '') + (x.description ? ': ' + x.description : '')); (x.bullets || []).forEach((b) => L.push('- ' + b)); }); }
    if ((dt.education || []).length) { L.push('', 'EDUCATION'); dt.education.forEach((e) => L.push(e.degree + ' - ' + e.school + (e.year ? ' (' + e.year + ')' : ''))); }
    if ((dt.certifications || []).length) { L.push('', 'CERTIFICATIONS'); dt.certifications.forEach((c) => L.push('- ' + c)); }
    if ((dt.languages || []).length) L.push('', 'LANGUAGES', dt.languages.join(', '));
    return L.join('\n');
  };
  R.markdown = function (dt) {
    const L = ['# ' + (dt.name || '')]; if (dt.headline) L.push('**' + dt.headline + '**'); if ((dt.contact || []).length) L.push(dt.contact.join(' | '));
    if (dt.summary) L.push('', '## Summary', dt.summary);
    if ((dt.skills || []).length) L.push('', '## Skills', dt.skills.join(' · '));
    if ((dt.experience || []).length) { L.push('', '## Experience'); dt.experience.forEach((e) => { L.push('', '### ' + e.title + ' - ' + e.company, '_' + [e.location, e.dates].filter(Boolean).join(' | ') + '_'); (e.bullets || []).filter(Boolean).forEach((b) => L.push('- ' + b)); }); }
    if ((dt.education || []).length) { L.push('', '## Education'); dt.education.forEach((e) => L.push('- ' + e.degree + ', ' + e.school + (e.year ? ' (' + e.year + ')' : ''))); }
    if ((dt.certifications || []).length) { L.push('', '## Certifications'); dt.certifications.forEach((c) => L.push('- ' + c)); }
    return L.join('\n');
  };
  R.print = function (el, filename) {
    const root = document.getElementById('print-root'); WP.clear(root);
    const clone = el.cloneNode(true); clone.querySelectorAll('[contenteditable]').forEach((x) => x.removeAttribute('contenteditable'));
    root.appendChild(clone);
    const oldTitle = document.title; if (filename) document.title = filename;
    document.body.classList.add('printing');
    const done = () => { document.body.classList.remove('printing'); WP.clear(root); document.title = oldTitle; };
    window.addEventListener('afterprint', done, { once: true });
    window.print();
    setTimeout(() => { if (document.body.classList.contains('printing')) done(); }, 1000);
  };
  R.fileBase = (dt, job) => [dt.name || 'Resume', job ? job.company : '', job ? job.title : ''].filter(Boolean).join(' - ').replace(/[\\/:*?"<>|]+/g, '');
  R.exportMenu = function (getData, getEl, job, extraText) {
    const base = () => R.fileBase(getData(), job);
    return h('div', { class: 'row' },
      h('button', { class: 'btn primary', onclick: () => R.print(getEl(), base()), 'data-tip': 'Opens the print dialog - choose "Save as PDF". Only the resume is printed.' }, icon('printer', 14), 'PDF'),
      h('button', { class: 'btn', onclick: () => ui.download(base() + '.doc', R.word(getData()), 'application/msword'), 'data-tip': 'Opens in Microsoft Word / Google Docs' }, icon('download', 14), 'Word'),
      h('button', { class: 'btn', onclick: () => ui.download(base() + '.txt', extraText ? extraText() : R.text(getData())), 'data-tip': 'Plain text - best for pasting into application forms' }, 'Text'),
      h('button', { class: 'btn', onclick: () => ui.download(base() + '.html', R.html(getData(), base()), 'text/html') }, 'HTML'),
      h('button', { class: 'btn', onclick: () => ui.download(base() + '.md', R.markdown(getData()), 'text/markdown') }, 'Markdown'),
      h('button', { class: 'btn ghost', onclick: () => ui.copy(extraText ? extraText() : R.text(getData()), 'Resume text') }, icon('copy', 14), 'Copy'));
  };

  /* ================================================== studio view */
  const V = { tab: 'resume', jobId: null, template: 'classic', summaryIndex: 0, customSummary: '', headline: null, density: 'balanced', confirmed: new Set(), highlight: true, edits: {}, loaded: null, letter: { tone: 'professional', hm: '', referrer: '', text: '', forJob: null } };
  const DENSITY = { focused: [4, 3, 2, 2], balanced: [6, 4, 3, 2], full: [20, 20, 20, 20] };

  function currentJob(st) { return V.jobId ? WP.store.get('jobs', V.jobId) : null; }
  function masterJob(st) { const p = st.profile; return { id: 'master', title: (p.targetTitles || [])[0] || p.currentTitle || 'Professional', company: '', description: '' }; }

  function build(st) {
    const job = currentJob(st) || masterJob(st);
    const res = WP.engine.tailor(st.profile, job, { bulletsPerRole: DENSITY[V.density], confirmedSkills: Array.from(V.confirmed), summaryIndex: V.summaryIndex, summary: V.summaryIndex === -1 ? V.customSummary : (!currentJob(st) && st.profile.summary && V.summaryIndex === 0 ? st.profile.summary : undefined), headline: V.headline != null ? V.headline : (!currentJob(st) ? st.profile.headline || undefined : undefined) });
    const orig = res.data.experience.map((e) => e.bullets.slice());
    res.data.experience.forEach((e) => { e.bullets = e.bullets.map((b) => (V.edits[b] != null ? V.edits[b] : b)); });
    return { job, res, orig };
  }

  function resumeTab(box, st) {
    const realJob = currentJob(st);
    if (V.loaded) return savedView(box, st, V.loaded);
    const { res, orig } = build(st);
    const a = res.analysis;
    const ats = WP.engine.atsCheck(res.data, realJob ? a : null, realJob);
    const saved = realJob && realJob.resumeId ? WP.store.get('resumes', realJob.resumeId) : null;
    if (saved) WP.add(box, h('div', { class: 'callout good mb' }, icon('check', 16), h('div', { class: 'grow row between' }, h('span', null, 'You saved a version for this job ' + d.rel(saved.createdAt) + ' (ATS ' + saved.atsScore + '%).'), h('button', { class: 'btn sm', onclick: () => { V.loaded = saved.id; WP.app.refresh(); } }, 'Open saved version'))));
    if (!realJob) WP.add(box, ui.callout('', 'info', ['This is your ', h('b', null, 'master resume'), ' (not tailored). Choose a job above to tailor it - bullets and skills reorder to match, and the headline mirrors the job title.']));
    const assist = realJob ? S.assist('tailor-resume', () => ({ job: realJob }), { ccArg: realJob.id }) : null;
    if (assist) WP.add(box, h('div', { class: 'mt' }, assist));
    let docEl;
    const preview = h('div', { class: 'doc-frame' });
    const drawDoc = () => { WP.clear(preview); docEl = R.render(res.data, V.template, { highlight: V.highlight && realJob ? a.matched.map((s) => s.name).concat(Array.from(V.confirmed)) : null, editable: true, onEdit: (ei, bi, txt) => { const o = orig[ei] && orig[ei][bi]; if (o == null || !txt || txt === res.data.experience[ei].bullets[bi]) return; V.edits[o] = txt; res.data.experience[ei].bullets[bi] = txt; ui.toast('Edit kept for this version', 'info'); } }); preview.appendChild(docEl); };
    drawDoc();

    const variants = res.variants;
    const controls = h('div', { class: 'stack-lg' },
      h('div', { class: 'card' }, h('h3', null, icon('layers', 16), 'Design'),
        h('div', { class: 'btn-group mt-sm' }, TEMPLATES.map((t) => h('button', { class: 'btn sm' + (V.template === t.id ? ' active' : ''), onclick: () => { V.template = t.id; WP.app.refresh(); } }, t.label))),
        h('div', { class: 'field mt' }, h('label', null, 'Bullets per role'), h('div', { class: 'btn-group' }, [['focused', 'Focused'], ['balanced', 'Balanced'], ['full', 'Everything']].map(([k, l]) => h('button', { class: 'btn sm' + (V.density === k ? ' active' : ''), onclick: () => { V.density = k; WP.app.refresh(); } }, l)))),
        realJob ? h('div', { class: 'mt' }, ui.switch(V.highlight, (v) => { V.highlight = v; WP.app.refresh(); }, 'Highlight matched keywords (preview only)')) : null),
      h('div', { class: 'card' }, h('h3', null, icon('edit', 16), 'Headline & summary'),
        ui.field('Headline', ui.input(V.headline != null ? V.headline : res.data.headline, (v) => { V.headline = v; }, { onchange: () => WP.app.refresh() })),
        h('div', { class: 'stack mt', style: { gap: '8px' } }, variants.map((v, i) => h('label', { class: 'card flat tight row top', style: { flexWrap: 'nowrap', cursor: 'pointer', borderColor: V.summaryIndex === i ? 'var(--accent)' : null } },
          h('input', { type: 'radio', name: 'sumv', checked: V.summaryIndex === i, onchange: () => { V.summaryIndex = i; WP.app.refresh(); } }), h('span', { class: 'small' }, (!realJob && i === 0 && st.profile.summary) ? st.profile.summary : v))),
          h('label', { class: 'card flat tight row top', style: { flexWrap: 'nowrap', cursor: 'pointer', borderColor: V.summaryIndex === -1 ? 'var(--accent)' : null } }, h('input', { type: 'radio', name: 'sumv', checked: V.summaryIndex === -1, onchange: () => { V.summaryIndex = -1; if (!V.customSummary) V.customSummary = res.data.summary; WP.app.refresh(); } }),
            h('div', { class: 'grow' }, h('span', { class: 'small' }, 'Write my own'), V.summaryIndex === -1 ? ui.textarea(V.customSummary, (v) => { V.customSummary = v; }, { rows: 4, onchange: () => WP.app.refresh() }) : null)))),
      realJob && res.missing.length ? h('div', { class: 'card warn' }, h('h3', null, icon('shieldCheck', 16), 'Honesty check: missing skills'),
        h('p', { class: 'small text-2' }, 'This job asks for skills that are not in your profile. Tick only the ones you genuinely have - they will be added to this resume (and optionally your profile).'),
        h('div', { class: 'stack', style: { gap: '6px' } }, res.missing.slice(0, 12).map((s) => h('label', { class: 'check small' }, h('input', { type: 'checkbox', checked: V.confirmed.has(s.name), onchange: (e) => { if (e.target.checked) V.confirmed.add(s.name); else V.confirmed.delete(s.name); WP.app.refresh(); } }), s.name, s.must ? h('span', { class: 'chip miss', style: { padding: '0 6px' } }, 'must') : null))),
        V.confirmed.size ? h('button', { class: 'btn sm mt', onclick: () => { st.profile.skills = WP.uniq(st.profile.skills.concat(Array.from(V.confirmed))); WP.store.touchProfile(); WP.engine.refreshMatches(st); ui.toast('Added to your profile skills'); } }, 'Also add to my profile') : null) : null);

    const scoreCard = h('div', { class: 'card' },
      h('div', { class: 'row', style: { flexWrap: 'nowrap' } }, C.ring(ats.score, 100, { size: 76, color: ats.score >= 80 ? '#0ca30c' : ats.score >= 60 ? '#fab219' : '#d03b3b', center: ats.score, label: 'ATS score' }),
        h('div', { class: 'grow' }, h('h3', null, 'ATS & recruiter check'), h('div', { class: 'small muted' }, realJob ? 'Keyword coverage ' + Math.round(ats.coverage * 100) + '% | must-haves ' + Math.round(ats.mustCoverage * 100) + '%' : 'Pick a job for keyword checks'),
          h('div', { class: 'small muted' }, ats.words + ' words | ' + Math.round(ats.metric * 100) + '% bullets with numbers'))),
      h('div', { class: 'mt-sm' }, ats.checks.map((c) => h('div', { class: 'check-item', 'data-tip': c.tip ? esc(c.tip) : null }, h('span', { class: 'ci ' + c.status }, icon(c.status === 'pass' ? 'check' : c.status === 'warn' ? 'alert' : 'x', 11)), h('div', { class: 'small' }, c.label, c.tip && c.status !== 'pass' ? h('div', { class: 'muted' }, c.tip) : null)))));
    const changeCard = realJob ? h('div', { class: 'card' }, h('h3', null, icon('list', 16), 'What was tailored'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, res.changes.map((c) => h('li', { style: { margin: '4px 0' } }, c)))) : null;

    const actions = h('div', { class: 'card tight row between mb' },
      R.exportMenu(() => res.data, () => docEl, realJob),
      h('button', { class: 'btn good', onclick: () => {
        const v = WP.store.add('resumes', { name: realJob ? realJob.company + ' - ' + realJob.title : 'Master resume', jobId: realJob ? realJob.id : '', template: V.template, data: JSON.parse(JSON.stringify(res.data)), matchScore: Math.round(ats.coverage * 100), atsScore: ats.score });
        if (realJob) { WP.store.update('jobs', realJob.id, { resumeId: v.id }); S.markActions('tailor-resume', 'jobId', realJob.id); if (realJob.status === 'saved') S.setJobStatus(realJob, 'applying', 'Tailored resume ready'); }
        WP.store.log('resume', realJob ? realJob.id : '', 'Saved resume version'); WP.store.save(); ui.toast('Version saved'); WP.app.refresh();
      } }, icon('check', 14), 'Save this version'));
    WP.add(box, h('div', { class: 'mt' }, actions), h('div', { class: 'split-12' }, h('div', { class: 'stack-lg' }, scoreCard, controls, changeCard), h('div', null, h('p', { class: 'small muted', style: { margin: '0 0 8px' } }, 'Tip: click any bullet in the preview to edit it for this version.'), preview)));
  }

  function savedView(box, st, id) {
    const v = WP.store.get('resumes', id);
    if (!v) { V.loaded = null; return resumeTab(box, st); }
    const job = v.jobId ? WP.store.get('jobs', v.jobId) : null;
    let docEl = R.render(v.data, v.template || 'classic');
    WP.add(box, h('div', { class: 'card tight row between mb' }, h('div', { class: 'row' }, h('button', { class: 'btn sm', onclick: () => { V.loaded = null; WP.app.refresh(); } }, icon('chevronLeft', 13), 'Back to editor'), h('b', null, v.name), h('span', { class: 'chip' }, 'ATS ' + (v.atsScore || '-') + '%'), v.source === 'claude' ? h('span', { class: 'badge claude' }, 'Claude') : null, h('span', { class: 'small muted' }, 'saved ' + d.rel(v.createdAt))),
      h('div', { class: 'btn-group' }, TEMPLATES.map((t) => h('button', { class: 'btn sm' + ((v.template || 'classic') === t.id ? ' active' : ''), onclick: () => { WP.store.update('resumes', v.id, { template: t.id }); WP.app.refresh(); } }, t.label)))),
      h('div', { class: 'card tight mb' }, R.exportMenu(() => v.data, () => docEl, job)),
      h('div', { class: 'doc-frame' }, docEl));
  }

  function letterTab(box, st) {
    const job = currentJob(st);
    if (!job) { WP.add(box, h('div', { class: 'card' }, ui.empty('mail', 'Choose a job to write a cover letter', 'Cover letters are always specific to one job and company.'))); return; }
    const L = V.letter; const co = job.companyId ? WP.store.get('companies', job.companyId) : null;
    const savedL = job.coverLetterId ? WP.store.get('coverLetters', job.coverLetterId) : null;
    if (L.forJob !== job.id) { L.forJob = job.id; L.text = savedL ? savedL.body : WP.engine.coverLetter(st.profile, job, co, L.tone, { hiringManager: L.hm, referrer: L.referrer }); }
    const regen = () => { L.text = WP.engine.coverLetter(st.profile, job, co, L.tone, { hiringManager: L.hm, referrer: L.referrer }); WP.app.refresh(); };
    const ta = h('textarea', { rows: 22, style: { fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: '1.6' } }); ta.value = L.text;
    const wc = h('span', { class: 'char-count' }); const upd = () => { const n = ta.value.split(/\s+/).filter(Boolean).length; wc.textContent = n + ' words' + (n > 400 ? ' - consider trimming to 250-350' : n < 150 ? ' - a bit short' : ''); wc.classList.toggle('over', n > 400); };
    ta.addEventListener('input', () => { L.text = ta.value; upd(); }); upd();
    const colleagues = st.contacts.filter((c) => c.companyId === job.companyId && ['colleague', 'friend', 'employee', 'alumni'].includes(c.relationship));
    const assist = S.assist('cover-letter', () => ({ job, tone: L.tone }), { ccArg: job.id });
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    const docLetter = () => h('div', { class: 'doc letter' }, ta.value);
    WP.add(box, h('div', { class: 'split-12' },
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon('sliders', 16), 'Options'),
          ui.field('Tone', ui.select(L.tone, [['professional', 'Professional'], ['enthusiastic', 'Enthusiastic'], ['concise', 'Concise (short)'], ['career-change', 'Career changer'], ['referral', 'Referral']].map(([v, l]) => ({ value: v, label: l })), (v) => { L.tone = v; regen(); })),
          h('div', { class: 'mt' }, ui.field('Hiring manager name (if known)', ui.input(L.hm, (v) => { L.hm = v; }, { placeholder: 'e.g. Rahul Menon', onchange: regen }))),
          L.tone === 'referral' ? h('div', { class: 'mt' }, ui.field('Who referred you', colleagues.length ? ui.select(L.referrer, [{ value: '', label: 'Choose...' }].concat(colleagues.map((c) => ({ value: c.name, label: c.name + ' (' + c.relationship + ')' }))), (v) => { L.referrer = v; regen(); }) : ui.input(L.referrer, (v) => { L.referrer = v; }, { onchange: regen }))) : null,
          h('button', { class: 'btn mt block', onclick: regen }, icon('refresh', 14), 'Regenerate from profile')),
        h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'Make it great'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
          h('li', null, 'Replace any [placeholder] with specifics.'), h('li', null, co && co.research && (co.research.news || co.research.mission) ? 'Your research on ' + co.name + ' is already woven in.' : 'Add research on ' + job.company + ' (Market > Company research) for a stronger opening.'),
          h('li', null, 'Name one real problem the team has and how you would help.'), h('li', null, 'Keep it to 250-350 words.')))),
      h('div', { class: 'stack' },
        h('div', { class: 'card tight row between' }, wc, h('div', { class: 'row' },
          h('button', { class: 'btn primary', onclick: () => R.print(docLetter(), 'Cover Letter - ' + job.company) }, icon('printer', 14), 'PDF'),
          h('button', { class: 'btn', onclick: () => ui.download('Cover Letter - ' + job.company + '.doc', "<html><head><meta charset='utf-8'></head><body style=\"font-family:Georgia,serif;font-size:11pt;line-height:1.6;white-space:pre-wrap\">" + esc(ta.value) + '</body></html>', 'application/msword') }, 'Word'),
          h('button', { class: 'btn', onclick: () => ui.download('Cover Letter - ' + job.company + '.txt', ta.value) }, 'Text'),
          ui.copyBtn(() => ta.value, 'Letter', ''),
          h('button', { class: 'btn good', onclick: () => {
            if (savedL) WP.store.update('coverLetters', savedL.id, { body: ta.value, tone: L.tone });
            else { const cl = WP.store.add('coverLetters', { jobId: job.id, tone: L.tone, body: ta.value }); WP.store.update('jobs', job.id, { coverLetterId: cl.id }); }
            ui.toast('Cover letter saved');
          } }, icon('check', 14), savedL ? 'Update saved letter' : 'Save letter'))),
        ta)));
  }

  function versionsTab(box, st) {
    const list = st.resumes.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    if (!list.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('file', 'No saved versions yet', 'Tailor a resume for a job and click "Save this version". Every version stays linked to its job.'))); return; }
    WP.add(box, h('div', { class: 'table-wrap' }, h('table', { class: 'table' }, h('thead', null, h('tr', null, h('th', null, 'Version'), h('th', null, 'Job'), h('th', { class: 'num' }, 'ATS'), h('th', { class: 'num' }, 'Keywords'), h('th', null, 'Saved'), h('th', null, ''))),
      h('tbody', null, list.map((v) => { const job = v.jobId ? WP.store.get('jobs', v.jobId) : null; return h('tr', null,
        h('td', null, h('b', null, v.name), v.source === 'claude' ? h('span', { class: 'badge claude', style: { marginLeft: '6px' } }, 'Claude') : null),
        h('td', { class: 'small' }, job ? job.company + ' - ' + job.title : 'Master'), h('td', { class: 'num' }, ui.scoreBadge(v.atsScore)), h('td', { class: 'num' }, ui.scoreBadge(v.matchScore)),
        h('td', { class: 'small muted' }, d.rel(v.createdAt)),
        h('td', null, h('div', { class: 'row', style: { gap: '4px', flexWrap: 'nowrap' } }, h('button', { class: 'btn sm', onclick: () => { V.jobId = v.jobId || null; V.loaded = v.id; V.tab = 'resume'; WP.app.refresh(); } }, 'Open'),
          h('button', { class: 'btn ghost icon sm', 'aria-label': 'Delete version', onclick: async () => { if (await ui.confirm({ title: 'Delete this version?', okText: 'Delete', danger: true })) { if (job && job.resumeId === v.id) WP.store.update('jobs', job.id, { resumeId: '' }, { silent: true }); WP.store.remove('resumes', v.id); WP.app.refresh(); } } }, icon('trash', 14))))); })))));
  }

  WP.views.resume = {
    title: 'Resume Studio',
    render(root, route) {
      const st = WP.store.state;
      const jid = route.parts[0] || null;
      if (jid !== V.jobId && route.parts.length) { V.jobId = jid; V.edits = {}; V.confirmed = new Set(); V.headline = null; V.summaryIndex = 0; V.loaded = null; }
      if (route.query.tab) V.tab = route.query.tab; else if (route.parts.length) V.tab = 'resume';
      if (V.jobId && !WP.store.get('jobs', V.jobId)) V.jobId = null;
      WP.add(root, S.pageHead({ eyebrow: 'Phase 5 - Apply', title: 'Resume Studio', desc: 'Tailored, ATS-safe resumes and cover letters in seconds - built only from your real experience. Check the score, tweak, save a version and export.',
        actions: [h('div', { style: { minWidth: '260px' } }, ui.select(V.jobId || '', [{ value: '', label: 'Master resume (not tailored)' }].concat(st.jobs.filter((j) => !['rejected', 'withdrawn'].includes(j.status)).map((j) => ({ value: j.id, label: j.company + ' - ' + j.title + (j.match ? ' (' + j.match + '%)' : '') }))), (v) => { S.go('resume' + (v ? '/' + v : '') + '?tab=' + V.tab); if (!v) { V.jobId = null; V.loaded = null; WP.app.refresh(); } })),
          V.jobId ? h('button', { class: 'btn', onclick: () => S.go('apply/' + V.jobId) }, icon('send', 14), 'Apply Wizard') : null] }));
      WP.add(root, ui.tabs([{ id: 'resume', label: 'Resume', icon: 'file' }, { id: 'letter', label: 'Cover letter', icon: 'mail' }, { id: 'versions', label: 'Saved versions', icon: 'layers', count: st.resumes.length }], V.tab, (t) => { V.tab = t; WP.app.refresh(); }));
      const box = h('div'); WP.add(root, box);
      if (!st.profile.experience.length && V.tab !== 'versions') { WP.add(box, h('div', { class: 'card' }, ui.empty('user', 'Build your profile first', 'Resume Studio tailors from your master profile. Import your resume on the Profile page - it takes a minute.', [h('button', { class: 'btn primary', onclick: () => S.go('profile') }, 'Go to Profile')]))); return; }
      ({ resume: resumeTab, letter: letterTab, versions: versionsTab }[V.tab] || resumeTab)(box, st);
    },
  };
})();
