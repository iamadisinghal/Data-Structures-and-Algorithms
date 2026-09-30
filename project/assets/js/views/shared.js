/* Shared UI: page chrome, Claude assist + runner, forms, drawers, approvals & execution. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc, d } = WP;
  const S = (WP.shared = {});
  const st = () => WP.store.state;
  const E = () => WP.engine;

  S.JOB_STATUSES = [
    { id: 'saved', label: 'Saved', color: 'var(--s1)' }, { id: 'applying', label: 'Applying', color: 'var(--s7)' },
    { id: 'applied', label: 'Applied', color: 'var(--s3)' }, { id: 'screening', label: 'Screening', color: 'var(--s4)' },
    { id: 'interview', label: 'Interview', color: 'var(--s2)' }, { id: 'offer', label: 'Offer', color: 'var(--s6)' },
    { id: 'rejected', label: 'Rejected', color: 'var(--s8)' }, { id: 'withdrawn', label: 'Withdrawn', color: 'var(--muted)' },
  ];
  S.jobStatus = (id) => S.JOB_STATUSES.find((x) => x.id === id) || S.JOB_STATUSES[0];
  S.CONTACT_STATUSES = [
    { id: 'to-contact', label: 'To contact' }, { id: 'requested', label: 'Request sent' }, { id: 'connected', label: 'Connected' },
    { id: 'replied', label: 'Replied' }, { id: 'meeting', label: 'Meeting set' }, { id: 'referred', label: 'Referred me' }, { id: 'no-response', label: 'No response' },
  ];
  S.RELATIONSHIPS = [
    { id: 'recruiter', label: 'Recruiter' }, { id: 'hiring-manager', label: 'Hiring manager' }, { id: 'employee', label: 'Employee / peer' },
    { id: 'alumni', label: 'Alumni' }, { id: 'colleague', label: 'Former colleague' }, { id: 'friend', label: 'Friend' }, { id: 'mentor', label: 'Mentor' }, { id: 'other', label: 'Other' },
  ];
  S.isClaude = () => st().settings.mode === 'claude';
  S.go = (path) => { location.hash = '#/' + path; };

  S.pageHead = function (o) {
    return h('div', { class: 'page-head' },
      h('div', null, o.eyebrow ? h('div', { class: 'eyebrow' }, o.eyebrow) : null, h('h1', null, o.title), o.desc ? h('p', null, o.desc) : null),
      o.actions ? h('div', { class: 'page-actions' }, o.actions) : null);
  };
  S.section = (title, extra) => h('div', { class: 'section-title' }, h('h2', null, title), h('div', { class: 'line' }), extra || null);
  S.statusChip = (status) => { const m = S.jobStatus(status); return h('span', { class: 'chip' }, h('span', { class: 'status-dot', style: { background: m.color } }), m.label); };
  S.companyOptions = () => st().companies.map((c) => c.name);

  /* =============================================================== Claude */
  S.assist = function (taskId, getCtx, opts) {
    if (!S.isClaude()) return null;
    opts = opts || {};
    const t = WP.claude.TASKS[taskId]; if (!t) return null;
    const hasKey = WP.claude.hasKey();
    const ccArg = opts.ccArg || '';
    return h('div', { class: 'assist' + (opts.compact ? ' compact' : '') },
      h('div', { class: 'assist-h' }, icon('sparkles', 16), 'Do this with Claude: ' + t.label),
      opts.compact ? null : h('p', { class: 'text-2 small', style: { margin: '0 0 10px' } }, t.desc + (t.web ? ' Uses live web search.' : '')),
      h('div', { class: 'row' },
        hasKey
          ? h('button', { class: 'btn claude sm', onclick: () => S.runTask(taskId, getCtx()) }, icon('sparkles', 14), 'Run with Claude')
          : h('button', { class: 'btn claude-ghost sm', onclick: () => S.go('claude'), 'data-tip': 'Optional: paste your own Anthropic API key to run this inside Waypoint' }, icon('key', 14), 'Add API key to run here'),
        h('button', { class: 'btn sm', onclick: () => { WP.ui.copy(WP.claude.chatPrompt(taskId, getCtx()), 'Prompt'); }, 'data-tip': 'Paste into claude.ai (any plan). Your data is included in the prompt.' }, icon('copy', 14), 'Copy prompt for Claude.ai'),
        t.output === 'json' ? h('button', { class: 'btn sm', onclick: () => S.importReply(taskId, getCtx) }, icon('download', 14), 'Import Claude\'s reply') : null,
        t.output === 'text' ? h('button', { class: 'btn sm', onclick: () => S.importReply(taskId, getCtx) }, icon('download', 14), 'Paste Claude\'s reply') : null,
        h('span', { class: 'chip claude clickable', 'data-tip': 'Claude Code command (claude-workspace folder). Click to copy.', onclick: () => WP.ui.copy(t.cc + (ccArg ? ' ' + ccArg : ''), 'Command') }, icon('terminal', 12), t.cc + (ccArg ? ' ' + ccArg : ''))));
  };

  S.runTask = function (taskId, ctx) {
    const t = WP.claude.TASKS[taskId];
    const ctrl = new AbortController();
    const status = h('div', { class: 'row small text-2' }, h('span', { class: 'spin', style: { display: 'inline-flex' } }, icon('refresh', 14)), h('span', null, 'Connecting to Claude...'));
    const out = h('div', { class: 'stream-out' });
    const meta = h('div', { class: 'small muted mt-sm' });
    const resultBox = h('div', { class: 'mt' });
    const body = h('div', null, status, h('div', { class: 'mt-sm' }, out), meta, resultBox);
    const stopBtn = h('button', { class: 'btn danger', onclick: () => ctrl.abort() }, icon('pause', 14), 'Stop');
    const dr = ui.drawer({ title: t.label, icon: 'sparkles', iconClass: 'claude', wide: true, body, footer: [stopBtn, h('button', { class: 'btn', onclick: () => dr.close() }, 'Close')], sticky: true, onClose: () => ctrl.abort() });
    const setStatus = (txt, spin) => { WP.clear(status); WP.add(status, spin === false ? icon('check', 14) : h('span', { class: 'spin', style: { display: 'inline-flex' } }, icon('refresh', 14)), h('span', null, txt)); };
    let chars = 0;
    WP.claude.run(Object.assign({ web: t.web, effort: t.effort, schema: t.schema, expectJSON: t.expectJSON, maxSearches: t.maxSearches }, t.build(ctx)), {
      signal: ctrl.signal,
      onStatus: (s) => setStatus(s),
      onText: (delta, all) => {
        chars = all.length;
        if (t.schema && !t.web) { out.textContent = 'Building a structured result... ' + chars.toLocaleString() + ' characters'; }
        else { out.textContent = all.replace(/```json[\s\S]*$/, '\n[structured data follows...]'); out.scrollTop = out.scrollHeight; }
        if (!status.dataset.writing) { status.dataset.writing = '1'; setStatus('Claude is writing...'); }
      },
    }).then((res) => {
      setStatus('Done', false);
      stopBtn.remove();
      meta.textContent = 'Model: ' + res.model + ' | tokens in/out: ' + res.usage.input.toLocaleString() + ' / ' + res.usage.output.toLocaleString() + (res.searches ? ' | web searches: ' + res.searches : '') + ' | approx. cost: $' + res.costUSD.toFixed(3);
      if (t.schema && !t.web) out.hidden = true;
      else out.innerHTML = '<div class="md">' + WP.md(res.text.replace(/```json[\s\S]*?```\s*$/, '')) + '</div>';
      resultBox.appendChild(S.applyResult(taskId, res, ctx, dr));
      WP.store.log('research', '', 'claude:' + taskId); WP.store.save();
    }).catch((err) => {
      stopBtn.remove();
      setStatus('Stopped', false);
      resultBox.appendChild(ui.callout('critical', 'alert', [h('b', null, 'Claude could not finish. '), WP.claude.friendly(err)]));
    });
  };

  S.importReply = function (taskId, getCtx) {
    const t = WP.claude.TASKS[taskId];
    const ta = h('textarea', { rows: 14, class: 'code', placeholder: 'Paste Claude\'s full reply here (the JSON block at the end is what gets imported)...' });
    const m = ui.modal({
      title: 'Import Claude\'s reply: ' + t.label, wide: true,
      body: h('div', { class: 'stack' }, ui.callout('claude', 'info', 'Copy Claude\'s complete answer from claude.ai and paste it below. Nothing is saved until you approve it on the next screen.'), ta),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn claude', onclick: go }, icon('check', 14), 'Review import')],
    });
    function go() {
      const text = ta.value.trim(); if (!text) return;
      const json = t.output === 'json' ? WP.extractJSON(text) : null;
      if (t.output === 'json' && !json) { ui.toast('No JSON block found in that reply - ask Claude to "end with the JSON block"', 'bad'); return; }
      m.close();
      const res = { text, json, imported: true };
      const body = h('div', null, t.output === 'text' || t.web ? h('div', { class: 'md stream-out' , html: WP.md(text.replace(/```json[\s\S]*?```\s*$/, '')) }) : null, h('div', { class: 'mt' }));
      const dr = ui.drawer({ title: 'Review: ' + t.label, icon: 'sparkles', iconClass: 'claude', wide: true, body, footer: [h('button', { class: 'btn', onclick: () => dr.close() }, 'Close')] });
      body.lastChild.appendChild(S.applyResult(taskId, res, getCtx(), dr));
    }
  };

  function checkList(items, render) {
    const sel = new Set(items.map((_, i) => i));
    const list = h('div', { class: 'stack', style: { gap: '8px' } }, items.map((it, i) => h('label', { class: 'card tight flat row top', style: { flexWrap: 'nowrap', cursor: 'pointer' } },
      h('input', { type: 'checkbox', checked: true, onchange: (e) => { if (e.target.checked) sel.add(i); else sel.delete(i); } }), h('div', { class: 'grow' }, render(it, i)))));
    return { list, selected: () => items.filter((_, i) => sel.has(i)) };
  }
  const saveReport = (kind, title, markdown, ref) => { WP.store.add('reports', { kind, title, markdown, ref: ref || '' }); ui.toast('Saved to Reports (Data & Settings)'); };
  const stripJSON = (t) => String(t || '').replace(/```json[\s\S]*?```\s*$/, '').trim();

  /* Per-task approval screens for Claude results. */
  S.applyResult = function (taskId, res, ctx, drawer) {
    const j = res.json || {};
    const box = h('div', { class: 'stack-lg' });
    const heading = (txt) => h('h3', { class: 'row' }, icon('shieldCheck', 16), txt);
    const doneAnd = (msg, route) => { ui.toast(msg); if (drawer) drawer.close(); if (route) S.go(route); else WP.app.refresh(); };
    switch (taskId) {
      case 'parse-resume': {
        const roles = (j.experience || []).length, sk = (j.skills || []).length;
        WP.add(box, heading('Review before updating your profile'),
          h('div', { class: 'grid g3' }, kpiMini('Roles found', roles), kpiMini('Skills found', sk), kpiMini('Education', (j.education || []).length)),
          h('div', { class: 'pre' }, (j.experience || []).map((e) => e.title + ' - ' + e.company + ' (' + (e.start || '?') + ' to ' + (e.current ? 'present' : e.end || '?') + ')\n' + (e.bullets || []).map((b) => '  - ' + b).join('\n')).join('\n\n')),
          h('div', { class: 'row' },
            h('button', { class: 'btn primary', onclick: () => { applyProfile(j, 'replace'); doneAnd('Profile updated from Claude\'s parse', 'profile'); } }, icon('check', 14), 'Replace profile sections'),
            h('button', { class: 'btn', onclick: () => { applyProfile(j, 'merge'); doneAnd('Merged new information into your profile', 'profile'); } }, 'Merge (only fill gaps)')));
        break;
      }
      case 'improve-bullets': {
        const items = (j.bullets || []).filter((b) => b.original && b.improved);
        const cl = checkList(items, (b) => h('div', null, h('div', { class: 'small muted' }, b.role), h('div', { class: 'diff-del small' }, b.original), h('div', { class: 'diff-add', style: { marginTop: '4px' } }, b.improved), b.why ? h('div', { class: 'small text-2 mt-sm' }, b.why) : null));
        WP.add(box, heading('Choose which rewrites to keep'), cl.list, h('button', { class: 'btn primary', onclick: () => {
          let n = 0; const p = st().profile;
          cl.selected().forEach((b) => (p.experience || []).forEach((e) => { const i = (e.bullets || []).indexOf(b.original); if (i > -1) { e.bullets[i] = b.improved; n++; } }));
          WP.store.touchProfile(); doneAnd(n + ' bullet' + (n === 1 ? '' : 's') + ' updated', 'profile');
        } }, icon('check', 14), 'Apply selected rewrites'));
        break;
      }
      case 'market-scan': {
        const cos = (j.companies || []).filter((c) => c.name && !st().companies.some((x) => x.name.toLowerCase() === c.name.toLowerCase()));
        const cl = checkList(cos, (c) => h('div', null, h('b', null, c.name), h('span', { class: 'muted small' }, ' ' + [c.industry, c.location, c.size].filter(Boolean).join(' | ')), c.why ? h('div', { class: 'small text-2' }, c.why) : null));
        const ps = E().profileSkills(st().profile);
        WP.add(box, 
          (j.topSkills || []).length ? h('div', null, h('h4', null, 'Most requested skills'), h('div', { class: 'chips mt-sm' }, (j.topSkills || []).map((s) => h('span', { class: 'chip ' + (ps.has(E().canonSkill(s.name)) ? 'match' : 'miss'), 'data-tip': esc(s.demand || '') + ' demand' }, s.name)))) : null,
          j.salary && (j.salary.median || j.salary.low) ? ui.callout('', 'dollar', ['Salary signal: ', h('b', null, WP.money(j.salary.low, j.salary.currency) + ' - ' + WP.money(j.salary.high, j.salary.currency)), ' (median ' + WP.money(j.salary.median, j.salary.currency) + ') ', h('span', { class: 'muted small' }, j.salary.source || '')]) : null,
          cos.length ? heading('Add companies to your target list?') : null, cos.length ? cl.list : null,
          h('div', { class: 'row' },
            cos.length ? h('button', { class: 'btn primary', onclick: () => {
              cl.selected().forEach((c) => WP.store.add('companies', { name: c.name, domain: c.domain || '', industry: c.industry || '', size: c.size || '', location: c.location || '', tier: 'B', status: 'researching', interest: 3, fit: 3, notes: c.why || '', research: { mission: '', products: '', news: '', culture: '', interviewProcess: '', salaryRange: '', keyPeople: '', sources: [] } }, { silent: true }));
              WP.store.save(); ui.toast('Added ' + cl.selected().length + ' companies');
            } }, icon('plus', 14), 'Add selected companies') : null,
            (j.gaps || []).length ? h('button', { class: 'btn', onclick: () => { (j.gaps || []).forEach((g) => { if (!st().learning.some((l) => l.skill.toLowerCase() === String(g).toLowerCase())) st().learning.push({ skill: g, resource: '', status: 'todo', hours: 0 }); }); WP.store.save(); ui.toast('Gaps added to your learning plan'); } }, icon('book', 14), 'Add gaps to learning plan') : null,
            h('button', { class: 'btn', onclick: () => saveReport('market-scan', 'Market scan - ' + ((st().profile.targetTitles || [])[0] || ''), stripJSON(res.text)) }, icon('download', 14), 'Save report')));
        break;
      }
      case 'research-company': {
        const co = ctx.company;
        const fields = ['mission', 'products', 'news', 'culture', 'interviewProcess', 'salaryRange', 'keyPeople', 'painPoints'];
        WP.add(box, heading('Save this research to ' + co.name + '?'),
          h('dl', { class: 'kv' }, fields.filter((f) => j[f]).map((f) => [h('dt', null, f.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())), h('dd', null, j[f])])),
          h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => {
            const r = Object.assign({}, co.research || {});
            fields.forEach((f) => { if (j[f]) r[f] = j[f]; }); r.sources = WP.uniq([].concat(r.sources || [], j.sources || []));
            WP.store.update('companies', co.id, { research: r });
            markActions('research-company', 'companyId', co.id);
            WP.store.log('research', co.id, 'Researched ' + co.name);
            doneAnd('Research saved to ' + co.name);
          } }, icon('check', 14), 'Save to company'), h('button', { class: 'btn', onclick: () => saveReport('company', 'Company brief - ' + co.name, stripJSON(res.text), co.id) }, 'Save full brief as report')));
        break;
      }
      case 'find-jobs': {
        const jobs = (j.jobs || []).filter((x) => x.title && x.company && !st().jobs.some((y) => (x.url && y.url === x.url) || (y.title.toLowerCase() === x.title.toLowerCase() && y.company.toLowerCase() === x.company.toLowerCase())));
        const cl = checkList(jobs, (x) => h('div', null, h('div', { class: 'row between' }, h('b', null, x.title + ' - ' + x.company), x.fit ? ui.scoreBadge(x.fit, 'Claude\'s fit estimate') : null),
          h('div', { class: 'small muted' }, [x.location, x.workMode, x.source, x.postedAt].filter(Boolean).join(' | ')), x.why ? h('div', { class: 'small text-2' }, x.why) : null,
          x.url ? h('a', { href: x.url, target: '_blank', rel: 'noopener noreferrer', class: 'small' }, 'Open posting ', icon('external', 12)) : null));
        const toJob = (x) => ({ title: x.title, company: x.company, location: x.location || '', workMode: x.workMode || '', url: x.url || '', source: x.source || 'Claude search', salaryMin: +x.salaryMin || 0, salaryMax: +x.salaryMax || 0, currency: x.currency || st().settings.currency, description: x.description || '', status: 'saved', priority: 2, notes: x.why ? 'Why it fits (Claude): ' + x.why : '' });
        WP.add(box, heading(jobs.length ? 'Save the openings you like' : 'No new openings to add'), jobs.length ? cl.list : null,
          jobs.length ? h('div', { class: 'row' },
            h('button', { class: 'btn primary', onclick: () => { cl.selected().forEach((x) => S.saveJob(toJob(x), { silent: true })); WP.store.save(); doneAnd('Saved ' + cl.selected().length + ' jobs', 'jobs'); } }, icon('check', 14), 'Save selected now'),
            h('button', { class: 'btn', onclick: () => { cl.selected().forEach((x) => queue({ type: 'save-job', title: 'Save job: ' + x.title + ' - ' + x.company, detail: x.why || 'Found by Claude', payload: toJob(x), impact: 2, effort: 1, source: 'claude' })); doneAnd('Sent to your Approval Queue', 'queue'); } }, 'Send to Approval Queue instead')) : null);
        break;
      }
      case 'analyze-job': {
        const job = ctx.job;
        WP.add(box, h('div', { class: 'grid g2' }, h('div', { class: 'card tight' }, WP.charts.gauge(j.score || 0, { caption: 'Claude\'s match estimate' }), h('p', { class: 'small text-2' }, j.summary || '')),
          h('div', { class: 'card tight stack' }, listBlock('Gaps & how to address them', (j.gaps || []).map((g) => h('div', null, h('b', null, g.skill + ': '), g.mitigation))), listBlock('Red flags', j.redFlags || []), listBlock('Keywords to mirror (if true)', j.keywords || []), listBlock('They will probe', j.interviewFocus || []))),
          h('button', { class: 'btn primary', onclick: () => { WP.store.update('jobs', job.id, { aiAnalysis: Object.assign({ at: d.now() }, j) }); doneAnd('Analysis saved to the job'); } }, icon('check', 14), 'Save analysis to this job'));
        break;
      }
      case 'tailor-resume': {
        const job = ctx.job; const r = j.resume || j;
        const p = st().profile;
        const data = { name: p.name, headline: r.headline || job.title, contact: [p.email, p.phone, p.location, p.linkedin, p.github || p.website].filter(Boolean), summary: r.summary || '', skills: r.skills || [], experience: r.experience || [], projects: r.projects || [], education: (p.education || []).map((e) => ({ degree: e.degree, school: e.school, year: e.year, details: e.details })), certifications: r.certifications || p.certifications || [], languages: p.languages || [] };
        WP.add(box, heading('Preview - approve to save as a resume version'),
          (j.changes || []).length ? listBlock('What Claude changed', j.changes) : null,
          (j.missingKeywords || []).length ? h('div', null, h('h4', null, 'Genuine gaps (not added)'), h('div', { class: 'chips mt-sm' }, j.missingKeywords.map((k) => h('span', { class: 'chip miss' }, k)))) : null,
          h('div', { class: 'doc-frame' }, WP.resume.render(data, 'classic')),
          h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => {
            const a = E().analyzeJob(job, p); const ats = E().atsCheck(data, a, job);
            const v = WP.store.add('resumes', { name: job.company + ' - ' + job.title + ' (Claude)', jobId: job.id, template: 'classic', data, matchScore: Math.round(ats.coverage * 100), atsScore: ats.score, source: 'claude' });
            WP.store.update('jobs', job.id, { resumeId: v.id }); markActions('tailor-resume', 'jobId', job.id); WP.store.log('resume', job.id, 'Tailored resume (Claude)');
            doneAnd('Resume version saved', 'resume/' + job.id);
          } }, icon('check', 14), 'Save resume version')));
        break;
      }
      case 'cover-letter': {
        const job = ctx.job; const ta = h('textarea', { rows: 16 }); ta.value = stripJSON(res.text).replace(/^#+.*\n/, '').trim();
        WP.add(box, heading('Edit, then save'), ta, h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => {
          const cl = WP.store.add('coverLetters', { jobId: job.id, tone: 'claude', body: ta.value });
          WP.store.update('jobs', job.id, { coverLetterId: cl.id }); doneAnd('Cover letter saved', 'resume/' + job.id + '?tab=letter');
        } }, icon('check', 14), 'Save cover letter'), ui.copyBtn(() => ta.value, 'Letter', '')));
        break;
      }
      case 'find-people': {
        const co = ctx.company;
        const people = (j.contacts || []).filter((c) => c.name && !st().contacts.some((x) => x.name.toLowerCase() === c.name.toLowerCase() && (x.company || '').toLowerCase() === (c.company || co.name).toLowerCase()));
        const rel = (r) => (S.RELATIONSHIPS.some((x) => x.id === r) ? r : 'employee');
        const toContact = (c) => ({ name: c.name, title: c.title || '', company: c.company || co.name, companyId: co.id, relationship: rel(c.relationship), warmth: c.relationship === 'colleague' ? 3 : c.relationship === 'alumni' ? 2 : 1, linkedin: c.linkedin || '', source: c.source || 'Claude research', status: 'to-contact', notes: [c.why, c.approach ? 'Approach: ' + c.approach : ''].filter(Boolean).join('\n') });
        const cl = checkList(people, (c) => h('div', null, h('b', null, c.name), h('span', { class: 'muted small' }, ' - ' + (c.title || '') + ' (' + (c.relationship || '') + ')'), c.why ? h('div', { class: 'small text-2' }, c.why) : null, c.approach ? h('div', { class: 'small' }, h('b', null, 'Approach: '), c.approach) : null,
          c.linkedin ? h('a', { href: c.linkedin, target: '_blank', rel: 'noopener noreferrer', class: 'small' }, 'Public profile ', icon('external', 12)) : null));
        WP.add(box, heading(people.length ? 'Add people to your network?' : 'No new people found'), people.length ? cl.list : null,
          people.length ? h('div', { class: 'row' },
            h('button', { class: 'btn primary', onclick: () => { cl.selected().forEach((c) => WP.store.add('contacts', toContact(c), { silent: true })); markActions('find-people', 'companyId', co.id); WP.store.save(); doneAnd('Added ' + cl.selected().length + ' contacts', 'network'); } }, icon('check', 14), 'Add selected contacts'),
            h('button', { class: 'btn', onclick: () => { cl.selected().forEach((c) => queue({ type: 'add-contact', title: 'Add contact: ' + c.name + ' (' + (c.title || '') + ')', detail: c.why || '', payload: toContact(c), ref: { companyId: co.id }, impact: 2, effort: 1, source: 'claude' })); doneAnd('Sent to your Approval Queue', 'queue'); } }, 'Send to Approval Queue')) : null);
        break;
      }
      case 'outreach': {
        const c = ctx.contact;
        WP.add(box, heading('Pick a message - you send it yourself'), h('div', { class: 'stack' }, (j.messages || []).map((m) => {
          const ta = h('textarea', { rows: m.body.length > 320 ? 8 : 4 }); ta.value = m.body;
          const cnt = h('span', { class: 'char-count' }); const upd = () => { cnt.textContent = ta.value.length + ' chars'; cnt.classList.toggle('over', m.type === 'connection' && ta.value.length > 300); }; ta.addEventListener('input', upd); upd();
          return h('div', { class: 'card tight' }, h('div', { class: 'row between' }, h('b', null, (E().OUTREACH_TYPES.find((x) => x.id === m.type) || { label: m.type }).label), cnt), m.subject ? h('div', { class: 'small muted' }, 'Subject: ' + m.subject) : null, h('div', { class: 'mt-sm' }, ta),
            h('div', { class: 'row mt-sm' }, ui.copyBtn(() => ta.value, 'Message'),
              h('button', { class: 'btn sm', onclick: () => { WP.store.add('outreach', { contactId: c.id, jobId: ctx.job ? ctx.job.id : '', type: m.type, channel: m.channel, subject: m.subject || '', body: ta.value, status: 'draft' }); ui.toast('Saved as draft'); } }, 'Save draft'),
              h('button', { class: 'btn primary sm', onclick: () => { queue({ type: 'send-outreach', title: 'Message ' + c.name + ' (' + m.type + ')', detail: 'Drafted by Claude - review, then send it yourself.', ref: { contactId: c.id, companyId: c.companyId || '', jobId: ctx.job ? ctx.job.id : '' }, payload: { type: m.type, channel: m.channel, subject: m.subject || '', body: ta.value }, impact: 2, effort: 1, source: 'claude' }); ui.toast('Added to Approval Queue'); } }, 'Queue for approval')));
        })));
        break;
      }
      case 'interview-prep': {
        const job = ctx.job;
        WP.add(box, h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => { WP.store.update('jobs', job.id, { prep: stripJSON(res.text) }); markActions('interview-prep', 'jobId', job.id); doneAnd('Prep sheet saved to the job', 'interview?tab=prep&job=' + job.id); } }, icon('check', 14), 'Save prep sheet to this job'),
          h('button', { class: 'btn', onclick: () => saveReport('interview', 'Interview prep - ' + job.company, stripJSON(res.text), job.id) }, 'Save as report')));
        break;
      }
      case 'weekly-plan': {
        const acts = (j.actions || []).filter((a) => a.title);
        const cl = checkList(acts, (a) => h('div', null, h('div', { class: 'row' }, h('span', { class: 'badge claude' }, a.type), h('b', null, a.title)), h('div', { class: 'small text-2' }, a.detail || ''), h('div', { class: 'row small muted mt-sm' }, 'Impact ', ui.pips(a.impact || 2, 3), ' Effort ', ui.pips(a.effort || 2, 3, 'effort'))));
        WP.add(box, j.summary ? ui.callout('claude', 'sparkles', j.summary) : null, heading('Add these to your Approval Queue?'), cl.list, h('button', { class: 'btn primary', onclick: () => {
          cl.selected().forEach((a) => queue({ type: E().ACTION_META[a.type] ? a.type : 'custom', title: a.title, detail: a.detail || '', ref: { jobId: a.jobId || '', contactId: a.contactId || '', companyId: a.companyId || '' }, payload: a.payload && typeof a.payload === 'object' ? a.payload : a.type === 'learn-skill' ? { skill: a.skill || a.title.replace(/^.*?:\s*/, ''), resource: '' } : a.type === 'custom' ? { instructions: a.detail } : (a.body ? { type: a.type === 'follow-up' ? 'follow-up' : 'connection', channel: 'linkedin', subject: '', body: a.body } : {}), impact: a.impact || 2, effort: a.effort || 2, source: 'claude' }));
          doneAnd('Added ' + cl.selected().length + ' actions to your queue', 'queue');
        } }, icon('check', 14), 'Add selected to queue'));
        break;
      }
      default: {
        WP.add(box, h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => saveReport(taskId, WP.claude.TASKS[taskId].label, stripJSON(res.text)) }, icon('download', 14), 'Save as report'), ui.copyBtn(() => stripJSON(res.text), 'Text', '')));
      }
    }
    return box;
  };
  function kpiMini(label, v) { return h('div', { class: 'card tight kpi' }, h('div', { class: 'label' }, label), h('div', { class: 'value' }, v)); }
  function listBlock(title, items) { return items && items.length ? h('div', null, h('h4', null, title), h('ul', { style: { margin: '6px 0 0', paddingLeft: '18px' } }, items.map((x) => h('li', null, x)))) : null; }
  function applyProfile(j, mode) {
    const p = st().profile;
    const simple = ['name', 'headline', 'location', 'linkedin', 'github', 'website', 'currentTitle', 'currentCompany', 'summary'];
    simple.forEach((k) => { if (j[k] && (mode === 'replace' || !p[k])) p[k] = j[k]; });
    if (j.yearsExperience && (mode === 'replace' || !p.yearsExperience)) p.yearsExperience = j.yearsExperience;
    const lists = { skills: (x) => x, certifications: (x) => x, achievements: (x) => x, languages: (x) => x };
    Object.keys(lists).forEach((k) => { if ((j[k] || []).length) p[k] = mode === 'replace' ? j[k].slice() : WP.uniq((p[k] || []).concat(j[k])); });
    p.skills = WP.uniq(p.skills.map(E().canonSkill));
    const withIds = (arr, pre) => (arr || []).map((x) => Object.assign({ id: WP.uid(pre) }, x, { bullets: x.bullets || [] }));
    if ((j.experience || []).length && (mode === 'replace' || !p.experience.length)) p.experience = withIds(j.experience, 'exp');
    if ((j.education || []).length && (mode === 'replace' || !p.education.length)) p.education = (j.education || []).map((x) => Object.assign({ id: WP.uid('edu') }, x));
    if ((j.projects || []).length && (mode === 'replace' || !p.projects.length)) p.projects = withIds(j.projects, 'prj');
    WP.store.touchProfile();
  }
  S.applyProfile = applyProfile;

  /* =========================================================== actions */
  function queue(a) {
    const now = d.now();
    st().actions.unshift(Object.assign({ id: WP.uid('act'), status: 'pending', createdAt: now, updatedAt: now, decidedAt: '', doneAt: '', ref: {}, payload: {}, impact: 2, effort: 2, source: 'user' }, a));
    WP.store.save();
  }
  S.queue = queue;
  function markActions(type, refKey, refVal) {
    st().actions.forEach((a) => { if (a.type === type && a.ref && a.ref[refKey] === refVal && (a.status === 'approved' || a.status === 'pending')) { a.status = 'done'; a.doneAt = d.now(); a.updatedAt = d.now(); if (!a.decidedAt) a.decidedAt = d.now(); } });
  }
  S.markActions = markActions;

  S.approve = function (a, opts) {
    a.status = 'approved'; a.decidedAt = d.now(); a.updatedAt = d.now();
    if (a.type === 'save-job') { S.saveJob(Object.assign({}, a.payload), { silent: true }); a.status = 'done'; a.doneAt = d.now(); }
    else if (a.type === 'add-contact') { WP.store.add('contacts', Object.assign({}, a.payload), { silent: true }); a.status = 'done'; a.doneAt = d.now(); }
    else if (a.type === 'add-company') { WP.store.add('companies', Object.assign({ tier: 'B', status: 'researching', interest: 3, fit: 3, research: {} }, a.payload), { silent: true }); a.status = 'done'; a.doneAt = d.now(); }
    else if (a.type === 'learn-skill') { const sk = a.payload && a.payload.skill; if (sk && !st().learning.some((l) => l.skill.toLowerCase() === sk.toLowerCase())) st().learning.push({ skill: sk, resource: a.payload.resource || '', status: 'todo', hours: 0 }); }
    if (!opts || !opts.silent) { WP.store.save(); ui.toast(a.status === 'done' ? 'Approved and added' : 'Approved - ready to execute'); }
  };
  S.reject = function (a, opts) { a.status = 'rejected'; a.decidedAt = d.now(); a.updatedAt = d.now(); if (!opts || !opts.silent) { WP.store.save(); ui.toast('Dismissed', 'info'); } };
  S.done = function (a) { a.status = 'done'; a.doneAt = d.now(); a.updatedAt = d.now(); if (!a.decidedAt) a.decidedAt = d.now(); WP.store.save(); };

  S.actionCard = function (a, o) {
    o = o || {};
    const meta = E().ACTION_META[a.type] || E().ACTION_META.custom;
    const tierInfo = { 1: ['Safe: prepares things for you', 'good'], 2: ['Changes your records', 'warn'], 3: ['Leaves your computer - you do the final step', 'critical'] }[meta.tier];
    let preview = null;
    if (a.payload && a.payload.body && a.status === 'pending') {
      const ta = h('textarea', { rows: 5, style: { marginTop: '10px', fontSize: '12.5px' } }); ta.value = a.payload.body;
      ta.addEventListener('input', () => { a.payload.body = ta.value; a.updatedAt = d.now(); WP.store.save(); });
      preview = h('div', null, a.payload.subject ? h('div', { class: 'small muted mt-sm' }, 'Subject: ' + a.payload.subject) : null, ta, h('div', { class: 'small muted' }, 'Edit freely - your changes are kept.'));
    } else if (a.payload && a.payload.body) preview = h('div', { class: 'a-preview' }, a.payload.body);
    else if (a.type === 'save-job' && a.payload) preview = h('div', { class: 'a-preview' }, [a.payload.title + ' - ' + a.payload.company, [a.payload.location, a.payload.workMode, a.payload.url].filter(Boolean).join(' | ')].join('\n'));
    else if (a.type === 'add-contact' && a.payload) preview = h('div', { class: 'a-preview' }, [a.payload.name + ' - ' + (a.payload.title || '') + ' @ ' + (a.payload.company || ''), a.payload.linkedin || '', a.payload.notes || ''].filter(Boolean).join('\n'));
    const job = a.ref && a.ref.jobId ? WP.store.get('jobs', a.ref.jobId) : null;
    const btns = [];
    if (a.status === 'pending') {
      btns.push(h('button', { class: 'btn good sm', onclick: (e) => { e.stopPropagation(); S.approve(a); WP.app.refresh(); } }, icon('check', 14), 'Approve'));
      btns.push(h('button', { class: 'btn sm', onclick: (e) => { e.stopPropagation(); S.reject(a); WP.app.refresh(); } }, icon('x', 14), 'Dismiss'));
    } else if (a.status === 'approved') {
      btns.push(h('button', { class: 'btn primary sm', onclick: (e) => { e.stopPropagation(); S.execute(a); } }, icon('play', 13), 'Do it now'));
      btns.push(h('button', { class: 'btn sm', onclick: (e) => { e.stopPropagation(); S.done(a); WP.app.refresh(); }, 'data-tip': 'Already done it yourself' }, 'Mark done'));
    } else {
      btns.push(h('span', { class: 'chip ' + (a.status === 'done' ? 'match' : '') }, a.status === 'done' ? 'Done ' + d.rel(a.doneAt) : 'Dismissed'));
    }
    return h('div', { class: 'action-card' + (o.selected ? ' selected' : '') },
      o.selectable && a.status === 'pending' ? h('input', { type: 'checkbox', checked: !!o.selected, onchange: (e) => o.onToggle && o.onToggle(e.target.checked), 'aria-label': 'Select action', style: { marginTop: '10px' } }) : h('span'),
      h('div', { class: 'icon-box ' + (a.source === 'claude' || a.source === 'claude-code' ? 'claude' : meta.tier === 3 ? 'warn' : '') }, icon(meta.icon, 18)),
      h('div', { style: { minWidth: 0 } },
        h('div', { class: 'a-title' }, a.title),
        a.detail ? h('div', { class: 'a-detail' }, a.detail) : null,
        h('div', { class: 'a-meta' },
          h('span', { class: 'badge ' + a.source }, a.source === 'claude-code' ? 'Claude Code' : a.source === 'claude' ? 'Claude' : a.source === 'user' ? 'You' : 'Planner'),
          h('span', { class: 'chip ' + tierInfo[1], 'data-tip': esc(tierInfo[0]) }, meta.tier === 3 ? icon('lock', 11) : icon('shield', 11), meta.label),
          h('span', { class: 'small muted row', style: { gap: '4px' } }, 'Impact', ui.pips(a.impact || 2, 3)),
          h('span', { class: 'small muted row', style: { gap: '4px' } }, 'Effort', ui.pips(a.effort || 2, 3, 'effort')),
          job && job.match ? ui.scoreBadge(job.match, 'Match score') : null,
          a.autoApproved ? h('span', { class: 'chip', 'data-tip': 'Auto-approved by your permission settings' }, 'auto') : null,
          h('span', { class: 'small muted' }, d.rel(a.createdAt))),
        preview),
      h('div', { class: 'a-btns' }, btns));
  };

  /* Carry out an approved action (always with the human in the loop). */
  S.execute = function (a) {
    const ref = a.ref || {};
    switch (a.type) {
      case 'custom': if (a.payload && a.payload.route) S.go(a.payload.route); else { ui.modal({ title: a.title, body: h('p', null, (a.payload && a.payload.instructions) || a.detail || ''), footer: [h('button', { class: 'btn primary', onclick: () => { S.done(a); ui.closeTop(); WP.app.refresh(); } }, 'Mark done')] }); } break;
      case 'tailor-resume': S.go('resume/' + ref.jobId); break;
      case 'apply': S.go('apply/' + ref.jobId); break;
      case 'find-people': S.go('network?tab=find&company=' + (ref.companyId || '')); break;
      case 'research-company': S.go('market?tab=research&company=' + (ref.companyId || '')); break;
      case 'interview-prep': S.go('interview?tab=prep&job=' + (ref.jobId || '')); break;
      case 'learn-skill': {
        const sk = (a.payload && a.payload.skill) || '';
        ui.modal({ title: 'Learn ' + sk, body: h('div', { class: 'stack' }, h('p', { class: 'text-2' }, sk + ' is now on your learning plan (Market & Targets). Start with one of these:'), h('div', { class: 'grid g2' }, E().learningLinks(sk).map((l) => ui.linkTile(l.name, l.url, 'Search "' + sk + '"', 'book')))),
          footer: [h('button', { class: 'btn primary', onclick: () => { S.done(a); ui.closeTop(); WP.app.refresh(); } }, 'Mark done')] });
        break;
      }
      case 'send-outreach': case 'follow-up': S.sendFlow(a); break;
      default: S.done(a); WP.app.refresh();
    }
  };

  /* Human-in-the-loop "send" flow: copy -> open channel -> confirm sent. */
  S.sendFlow = function (a) {
    const ref = a.ref || {}; const c = ref.contactId ? WP.store.get('contacts', ref.contactId) : null; const job = ref.jobId ? WP.store.get('jobs', ref.jobId) : null;
    const pl = a.payload || {};
    const ta = h('textarea', { rows: 9 }); ta.value = pl.body || '';
    const cnt = h('span', { class: 'char-count' }); const upd = () => { cnt.textContent = ta.value.length + ' characters' + (pl.type === 'connection' || pl.type === 'alumni' ? ' (LinkedIn notes: 300 max, 200 on free accounts)' : ''); cnt.classList.toggle('over', (pl.type === 'connection' || pl.type === 'alumni') && ta.value.length > 300); };
    ta.addEventListener('input', upd); upd();
    const liUrl = c && c.linkedin ? (/^https?:/.test(c.linkedin) ? c.linkedin : 'https://' + c.linkedin) : c ? 'https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent(c.name + ' ' + (c.company || '')) : '';
    const m = ui.modal({
      title: (a.type === 'follow-up' ? 'Follow up' : 'Send message') + (c ? ' - ' + c.name : job ? ' - ' + job.company : ''), wide: true, icon: 'send',
      body: h('div', { class: 'stack' },
        ui.callout('warn', 'lock', 'Waypoint never sends messages for you. Copy the text, send it on ' + (pl.channel === 'email' ? 'email' : 'LinkedIn') + ', then confirm below so your tracker stays accurate.'),
        pl.subject ? ui.field('Subject', h('input', { type: 'text', value: pl.subject, oninput: (e) => { pl.subject = e.target.value; } })) : null,
        ui.field('Message', ta, cnt),
        h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => ui.copy((pl.subject ? 'Subject: ' + pl.subject + '\n\n' : '') + ta.value, 'Message') }, icon('copy', 14), '1. Copy message'),
          liUrl && pl.channel !== 'email' ? h('a', { class: 'btn', href: liUrl, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 14), '2. Open ' + (c && c.linkedin ? 'LinkedIn profile' : 'LinkedIn search')) : null,
          pl.channel === 'email' && c && c.email ? h('span', { class: 'chip' }, icon('mail', 12), c.email) : null,
          pl.channel === 'email' && c && c.email ? h('a', { class: 'btn', href: 'mailto:' + c.email + '?subject=' + encodeURIComponent(pl.subject || '') + '&body=' + encodeURIComponent(ta.value) }, icon('mail', 14), '2. Open email app') : null,
          job && job.url && a.type === 'follow-up' && !c ? h('a', { class: 'btn', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 14), 'Open job posting') : null)),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Not now'), h('button', { class: 'btn good', onclick: () => {
        const now = d.today();
        WP.store.add('outreach', { contactId: c ? c.id : '', jobId: job ? job.id : '', type: pl.type || (a.type === 'follow-up' ? 'follow-up' : 'connection'), channel: pl.channel || 'linkedin', subject: pl.subject || '', body: ta.value, status: 'sent', sentAt: now }, { silent: true });
        if (c) { const next = c.status === 'to-contact' ? 'requested' : c.status; WP.store.update('contacts', c.id, { status: next, lastContacted: now, nextFollowUp: d.addDays(now, 6), interactions: (c.interactions || []).concat([{ date: now, channel: pl.channel || 'linkedin', note: (a.type === 'follow-up' ? 'Follow-up: ' : '') + WP.engine.trunc(ta.value, 80) }]) }, { silent: true }); }
        if (job && a.type === 'follow-up') WP.store.update('jobs', job.id, { events: (job.events || []).concat([{ date: now, type: 'follow-up', note: 'Followed up' + (c ? ' with ' + c.name : '') }]) }, { silent: true });
        WP.store.log(a.type === 'follow-up' ? 'followup' : 'outreach', c ? c.id : job ? job.id : '', '');
        S.done(a); m.close(); ui.toast('Logged as sent'); WP.app.refresh();
      } }, icon('check', 14), '3. I sent it')],
    });
  };

  /* ======================================================= jobs & companies */
  S.ensureCompany = function (name, extra) {
    if (!name) return null;
    let c = st().companies.find((x) => x.name.toLowerCase() === name.trim().toLowerCase());
    if (!c) c = WP.store.add('companies', Object.assign({ name: name.trim(), domain: '', industry: '', size: '', location: '', tier: 'C', status: 'targeting', interest: 3, fit: 3, notes: '', research: { mission: '', products: '', news: '', culture: '', interviewProcess: '', salaryRange: '', keyPeople: '', sources: [] } }, extra || {}), { silent: true });
    return c;
  };
  S.saveJob = function (job, opts) {
    const co = S.ensureCompany(job.company);
    job.companyId = co ? co.id : '';
    if (!job.salaryMin && !job.salaryMax) { const sal = E().parseSalary(job.description); if (sal) { job.salaryMin = sal.min; job.salaryMax = sal.max; job.currency = sal.currency; } }
    const j = WP.store.add('jobs', Object.assign({ status: 'saved', priority: 2, currency: st().settings.currency, events: [], contactIds: [] }, job), { silent: true });
    j.match = E().analyzeJob(j, st().profile).score;
    if (!opts || !opts.silent) WP.store.save();
    return j;
  };
  S.setJobStatus = function (job, status, note) {
    if (job.status === status) return;
    const today = d.today();
    const patch = { status, events: (job.events || []).concat([{ date: today, type: status, note: note || '' }]) };
    if (status === 'applied' && !job.appliedAt) { patch.appliedAt = today; patch.nextAction = 'Follow up if no response'; patch.nextActionDate = d.addDays(today, 7); WP.store.log('applied', job.id, job.company); markActions('apply', 'jobId', job.id); }
    if (status === 'interview' || status === 'screening') WP.store.log('interview', job.id, job.company);
    if (status === 'offer') WP.store.log('offer', job.id, job.company);
    WP.store.update('jobs', job.id, patch);
    const co = job.companyId ? WP.store.get('companies', job.companyId) : null;
    if (co && ['applied', 'screening', 'interview', 'offer'].includes(status) && co.status !== 'applied') WP.store.update('companies', co.id, { status: 'applied' });
    ui.toast('Moved to ' + S.jobStatus(status).label);
  };

  S.jobForm = function (job, onSaved) {
    const isNew = !job; const j = Object.assign({ title: '', company: '', location: '', workMode: '', url: '', source: '', salaryMin: '', salaryMax: '', currency: st().settings.currency, description: '', status: 'saved', priority: 2, notes: '' }, job || {});
    const set = (k) => (v) => { j[k] = v; };
    const dl = h('datalist', { id: 'dl-companies' }, S.companyOptions().map((n) => h('option', { value: n })));
    const body = h('div', { class: 'stack' },
      dl,
      h('div', { class: 'form-grid' },
        ui.field('Job title *', ui.input(j.title, set('title'), { placeholder: 'e.g. Senior Data Analyst' })),
        ui.field('Company *', ui.input(j.company, set('company'), { list: 'dl-companies', placeholder: 'Company name' })),
        ui.field('Location', ui.input(j.location, set('location'), { placeholder: 'City or Remote' })),
        ui.field('Work mode', ui.select(j.workMode, [{ value: '', label: 'Not stated' }, 'remote', 'hybrid', 'onsite'], set('workMode'))),
        ui.field('Posting URL', ui.input(j.url, set('url'), { type: 'url', placeholder: 'https://...' })),
        ui.field('Source', ui.input(j.source, set('source'), { placeholder: 'LinkedIn, referral, careers page...' })),
        ui.field('Salary min', ui.input(j.salaryMin, set('salaryMin'), { type: 'number', min: 0 })),
        ui.field('Salary max', ui.input(j.salaryMax, set('salaryMax'), { type: 'number', min: 0 })),
        ui.field('Status', ui.select(j.status, S.JOB_STATUSES.map((s) => ({ value: s.id, label: s.label })), set('status'))),
        ui.field('Priority', ui.select(j.priority, [{ value: 1, label: 'High' }, { value: 2, label: 'Normal' }, { value: 3, label: 'Low' }], (v) => { j.priority = +v; }))),
      ui.field('Job description (paste the full text - this powers matching and tailoring)', ui.textarea(j.description, set('description'), { rows: 10, placeholder: 'Paste the complete job description here...' })),
      ui.field('Notes', ui.textarea(j.notes, set('notes'), { rows: 3 })));
    const m = ui.modal({
      title: isNew ? 'Add a job' : 'Edit job', wide: true, icon: 'briefcase', body,
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn primary', onclick: () => {
        if (!j.title.trim() || !j.company.trim()) { ui.toast('Title and company are required', 'bad'); return; }
        j.salaryMin = +j.salaryMin || 0; j.salaryMax = +j.salaryMax || 0;
        let saved;
        if (isNew) { const status = j.status; j.status = 'saved'; saved = S.saveJob(j); if (status !== 'saved') S.setJobStatus(saved, status); }
        else { const prevStatus = job.status; const nextStatus = j.status; j.status = prevStatus; const co = S.ensureCompany(j.company); j.companyId = co ? co.id : ''; saved = WP.store.update('jobs', job.id, j); saved.match = E().analyzeJob(saved, st().profile).score; if (nextStatus !== prevStatus) S.setJobStatus(saved, nextStatus); }
        WP.store.save(); m.close(); ui.toast(isNew ? 'Job saved - match ' + saved.match + '%' : 'Job updated');
        if (onSaved) onSaved(saved); else WP.app.refresh();
      } }, icon('check', 14), isNew ? 'Save job' : 'Save changes')],
    });
  };

  S.companyForm = function (co, onSaved) {
    const isNew = !co; const c = Object.assign({ name: '', domain: '', industry: '', size: '', location: '', tier: 'B', status: 'targeting', interest: 3, fit: 3, notes: '' }, co || {});
    const set = (k) => (v) => { c[k] = v; };
    const m = ui.modal({
      title: isNew ? 'Add target company' : 'Edit company', icon: 'building',
      body: h('div', { class: 'form-grid' },
        ui.field('Company name *', ui.input(c.name, set('name'))), ui.field('Website domain', ui.input(c.domain, set('domain'), { placeholder: 'acme.com' })),
        ui.field('Industry', ui.input(c.industry, set('industry'))), ui.field('Size', ui.input(c.size, set('size'), { placeholder: 'e.g. 1,000-5,000' })),
        ui.field('Location', ui.input(c.location, set('location'))),
        ui.field('Tier', ui.select(c.tier, [{ value: 'A', label: 'A - dream company' }, { value: 'B', label: 'B - strong fit' }, { value: 'C', label: 'C - backup' }], set('tier'))),
        ui.field('Status', ui.select(c.status, ['researching', 'targeting', 'applied', 'connected', 'paused'], set('status'))),
        ui.field('My interest (1-5)', ui.input(c.interest, (v) => { c.interest = +v; }, { type: 'number', min: 1, max: 5 })),
        ui.field('My fit (1-5)', ui.input(c.fit, (v) => { c.fit = +v; }, { type: 'number', min: 1, max: 5 })),
        ui.field('Notes', ui.textarea(c.notes, set('notes'), { rows: 3 }), null, 'full')),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn primary', onclick: () => {
        if (!c.name.trim()) { ui.toast('Name is required', 'bad'); return; }
        const saved = isNew ? WP.store.add('companies', Object.assign(c, { research: { mission: '', products: '', news: '', culture: '', interviewProcess: '', salaryRange: '', keyPeople: '', sources: [] } })) : WP.store.update('companies', co.id, c);
        m.close(); ui.toast(isNew ? 'Company added' : 'Company updated'); if (onSaved) onSaved(saved); else WP.app.refresh();
      } }, icon('check', 14), 'Save')],
    });
  };

  S.contactForm = function (ct, onSaved, preset) {
    const isNew = !ct; const c = Object.assign({ name: '', title: '', company: '', relationship: 'employee', warmth: 2, status: 'to-contact', linkedin: '', email: '', source: '', notes: '', nextFollowUp: '' }, preset || {}, ct || {});
    const set = (k) => (v) => { c[k] = v; };
    const dl = h('datalist', { id: 'dl-companies2' }, S.companyOptions().map((n) => h('option', { value: n })));
    const warmLabel = h('span', { class: 'muted small' });
    const updW = () => { warmLabel.textContent = ' ' + c.warmth + '/5 - ' + ['Cold (never interacted)', 'Aware of me', 'Warm (some interaction)', 'Strong (worked together / friends)', 'Close (would vouch for me)'][c.warmth - 1]; };
    const range = h('input', { type: 'range', min: 1, max: 5, value: c.warmth, oninput: (e) => { c.warmth = +e.target.value; updW(); } }); updW();
    const m = ui.modal({
      title: isNew ? 'Add contact' : 'Edit contact', icon: 'user',
      body: h('div', { class: 'form-grid' }, dl,
        ui.field('Name *', ui.input(c.name, set('name'))), ui.field('Title', ui.input(c.title, set('title'))),
        ui.field('Company', ui.input(c.company, set('company'), { list: 'dl-companies2' })),
        ui.field('Relationship', ui.select(c.relationship, S.RELATIONSHIPS.map((r) => ({ value: r.id, label: r.label })), set('relationship'))),
        ui.field('Status', ui.select(c.status, S.CONTACT_STATUSES.map((r) => ({ value: r.id, label: r.label })), set('status'))),
        ui.field('Next follow-up', ui.input(c.nextFollowUp, set('nextFollowUp'), { type: 'date' })),
        ui.field('LinkedIn URL', ui.input(c.linkedin, set('linkedin'), { placeholder: 'linkedin.com/in/...' })), ui.field('Email', ui.input(c.email, set('email'), { type: 'email' })),
        h('div', { class: 'field full' }, h('label', null, 'Relationship warmth', warmLabel), range),
        ui.field('How you know them / notes', ui.textarea(c.notes, set('notes'), { rows: 3 }), null, 'full')),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn primary', onclick: () => {
        if (!c.name.trim()) { ui.toast('Name is required', 'bad'); return; }
        const co = c.company ? S.ensureCompany(c.company) : null; c.companyId = co ? co.id : '';
        const saved = isNew ? WP.store.add('contacts', c) : WP.store.update('contacts', ct.id, c);
        m.close(); ui.toast(isNew ? 'Contact added' : 'Contact updated'); if (onSaved) onSaved(saved); else WP.app.refresh();
      } }, icon('check', 14), 'Save')],
    });
  };

  S.jobDrawer = function (id) {
    const job = WP.store.get('jobs', id); if (!job) return;
    const a = E().analyzeJob(job, st().profile);
    const contacts = st().contacts.filter((c) => (job.companyId && c.companyId === job.companyId) || (c.company || '').toLowerCase() === job.company.toLowerCase());
    const noteInput = h('input', { type: 'text', placeholder: 'Log an event (e.g. "Recruiter call went well")' });
    const body = h('div', { class: 'stack-lg' },
      h('div', { class: 'row' }, S.statusChip(job.status), ui.scoreBadge(job.match, 'Match score'), job.location ? h('span', { class: 'chip' }, icon('pin', 12), job.location) : null, job.workMode ? h('span', { class: 'chip' }, job.workMode) : null,
        job.salaryMin || job.salaryMax ? h('span', { class: 'chip' }, icon('dollar', 12), WP.money(job.salaryMin, job.currency) + ' - ' + WP.money(job.salaryMax, job.currency)) : null,
        job.url ? h('a', { href: job.url, target: '_blank', rel: 'noopener noreferrer', class: 'chip clickable' }, 'Posting ', icon('external', 12)) : null),
      h('div', { class: 'field' }, h('label', null, 'Move to stage'), h('div', { class: 'row', style: { gap: '6px' } }, S.JOB_STATUSES.map((s) => h('button', { class: 'btn sm' + (job.status === s.id ? ' primary' : ''), onclick: () => { S.setJobStatus(job, s.id); dr.close(); S.jobDrawer(id); WP.app.refresh(); } }, h('span', { class: 'status-dot', style: { background: job.status === s.id ? '#fff' : s.color } }), s.label)))),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card tight' }, h('h4', null, 'Matched skills'), h('div', { class: 'chips mt-sm' }, a.matched.slice(0, 12).map((s) => h('span', { class: 'chip match' }, s.name)))),
        h('div', { class: 'card tight' }, h('h4', null, 'Missing'), h('div', { class: 'chips mt-sm' }, a.missing.slice(0, 12).map((s) => h('span', { class: 'chip ' + (s.must ? 'miss' : 'warn') }, s.name, s.must ? ' *' : '')), a.missing.length ? null : h('span', { class: 'muted small' }, 'Nothing missing')))),
      h('div', { class: 'row' },
        h('button', { class: 'btn primary', onclick: () => { dr.close(); S.go('apply/' + id); } }, icon('send', 14), 'Apply Wizard'),
        h('button', { class: 'btn', onclick: () => { dr.close(); S.go('resume/' + id); } }, icon('file', 14), 'Tailor resume'),
        h('button', { class: 'btn', onclick: () => { dr.close(); S.go('jobs/' + id); } }, icon('target', 14), 'Full analysis'),
        h('button', { class: 'btn', onclick: () => { dr.close(); S.jobForm(job); } }, icon('edit', 14), 'Edit')),
      h('div', null, h('h3', null, 'Timeline'), h('div', { class: 'timeline mt-sm' }, (job.events || []).slice().reverse().map((e) => h('div', { class: 'ev' }, h('div', { class: 'd' }, d.fmtLong(e.date) + ' - ' + e.type), e.note ? h('div', null, e.note) : null)), job.events && job.events.length ? null : h('div', { class: 'muted small' }, 'No events yet.')),
        h('div', { class: 'input-group mt-sm' }, noteInput, h('button', { class: 'btn', onclick: () => { if (!noteInput.value.trim()) return; WP.store.update('jobs', id, { events: (job.events || []).concat([{ date: d.today(), type: 'note', note: noteInput.value.trim() }]) }); dr.close(); S.jobDrawer(id); } }, 'Log'))),
      h('div', null, h('h3', null, 'People at ' + job.company + ' (' + contacts.length + ')'), contacts.length ? h('div', { class: 'list mt-sm' }, contacts.map((c) => h('div', { class: 'list-item clickable', onclick: () => { dr.close(); S.contactDrawer(c.id); } }, ui.avatar(c.name), h('div', { class: 'grow' }, h('div', { class: 'title' }, c.name), h('div', { class: 'meta' }, (c.title || '') + ' | ' + (S.CONTACT_STATUSES.find((x) => x.id === c.status) || {}).label)), icon('chevronRight', 16)))) :
        h('div', { class: 'row mt-sm' }, h('span', { class: 'muted small' }, 'No contacts yet - referrals multiply your odds.'), h('button', { class: 'btn sm', onclick: () => { dr.close(); S.go('network?tab=find&company=' + job.companyId); } }, icon('users', 13), 'Find people'))),
      job.notes ? h('div', null, h('h3', null, 'Notes'), h('div', { class: 'pre mt-sm' }, job.notes)) : null);
    const dr = ui.drawer({ title: job.title + ' - ' + job.company, icon: 'briefcase', body, footer: [h('button', { class: 'btn danger', onclick: async () => { if (await ui.confirm({ title: 'Delete this job?', message: 'This removes the job and its pending actions.', okText: 'Delete', danger: true })) { WP.store.remove('jobs', id); dr.close(); WP.app.refresh(); } } }, icon('trash', 14), 'Delete'), h('button', { class: 'btn', onclick: () => dr.close() }, 'Close')] });
  };

  S.contactDrawer = function (id) {
    const c = WP.store.get('contacts', id); if (!c) return;
    const jobs = st().jobs.filter((j) => (c.companyId && j.companyId === c.companyId));
    const note = h('input', { type: 'text', placeholder: 'e.g. "Had a 20-min call, will refer me"' });
    const channel = ui.select('linkedin', ['linkedin', 'email', 'call', 'meeting', 'other'], () => {});
    const liUrl = c.linkedin ? (/^https?:/.test(c.linkedin) ? c.linkedin : 'https://' + c.linkedin) : 'https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent(c.name + ' ' + (c.company || ''));
    const body = h('div', { class: 'stack-lg' },
      h('div', { class: 'row' }, ui.avatar(c.name), h('div', { class: 'grow' }, h('b', null, c.title || ''), h('div', { class: 'muted' }, c.company || '')), h('a', { class: 'btn sm', href: liUrl, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 13), c.linkedin ? 'LinkedIn' : 'Find on LinkedIn')),
      h('div', { class: 'row' }, h('span', { class: 'chip' }, (S.RELATIONSHIPS.find((r) => r.id === c.relationship) || {}).label || c.relationship), h('span', { class: 'chip' }, 'Warmth ' + (c.warmth || 1) + '/5'), c.email ? h('span', { class: 'chip' }, icon('mail', 12), c.email) : null,
        c.lastContacted ? h('span', { class: 'chip' }, 'Last contact ' + d.rel(c.lastContacted)) : null, c.nextFollowUp ? h('span', { class: 'chip ' + (c.nextFollowUp <= d.today() ? 'warn' : '') }, 'Follow up ' + d.rel(c.nextFollowUp)) : null),
      h('div', { class: 'field' }, h('label', null, 'Status'), h('div', { class: 'row', style: { gap: '6px' } }, S.CONTACT_STATUSES.map((s) => h('button', { class: 'btn sm' + (c.status === s.id ? ' primary' : ''), onclick: () => { WP.store.update('contacts', id, { status: s.id }); dr.close(); S.contactDrawer(id); WP.app.refresh(); } }, s.label)))),
      h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => { dr.close(); S.go('outreach?contact=' + id); } }, icon('chat', 14), 'Draft a message'), h('button', { class: 'btn', onclick: () => { dr.close(); S.contactForm(c); } }, icon('edit', 14), 'Edit')),
      h('div', null, h('h3', null, 'Interactions'), h('div', { class: 'timeline mt-sm' }, (c.interactions || []).slice().reverse().map((i) => h('div', { class: 'ev' }, h('div', { class: 'd' }, d.fmtLong(i.date) + ' - ' + i.channel), h('div', null, i.note))), (c.interactions || []).length ? null : h('div', { class: 'muted small' }, 'No interactions logged.')),
        h('div', { class: 'input-group mt-sm' }, channel, note, h('button', { class: 'btn', onclick: () => {
          if (!note.value.trim()) return;
          WP.store.update('contacts', id, { lastContacted: d.today(), interactions: (c.interactions || []).concat([{ date: d.today(), channel: channel.value, note: note.value.trim() }]) });
          WP.store.log('outreach', id, note.value.trim()); WP.store.save(); dr.close(); S.contactDrawer(id);
        } }, 'Log'))),
      jobs.length ? h('div', null, h('h3', null, 'Related jobs'), h('div', { class: 'list mt-sm' }, jobs.map((j) => h('div', { class: 'list-item clickable', onclick: () => { dr.close(); S.jobDrawer(j.id); } }, h('div', { class: 'grow' }, h('div', { class: 'title' }, j.title), h('div', { class: 'meta' }, S.jobStatus(j.status).label)), ui.scoreBadge(j.match))))) : null,
      c.notes ? h('div', null, h('h3', null, 'Notes'), h('div', { class: 'pre mt-sm' }, c.notes)) : null);
    const dr = ui.drawer({ title: c.name, icon: 'user', body, footer: [h('button', { class: 'btn danger', onclick: async () => { if (await ui.confirm({ title: 'Delete ' + c.name + '?', okText: 'Delete', danger: true })) { WP.store.remove('contacts', id); dr.close(); WP.app.refresh(); } } }, icon('trash', 14), 'Delete'), h('button', { class: 'btn', onclick: () => dr.close() }, 'Close')] });
  };

  S.jobPicker = function (selectedId, onPick, filter) {
    const jobs = st().jobs.filter(filter || (() => true));
    return ui.select(selectedId || '', [{ value: '', label: jobs.length ? 'Choose a job...' : 'No jobs yet - add one first' }].concat(jobs.map((j) => ({ value: j.id, label: j.company + ' - ' + j.title + (j.match ? ' (' + j.match + '%)' : '') }))), onPick);
  };
})();
