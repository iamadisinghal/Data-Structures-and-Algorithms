/* Apply Wizard (per job) + Autofill Kit (answer bank & bookmarklet). */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc, d } = WP;
  const S = WP.shared; const C = WP.charts;
  const steps = {};

  function yearsWith(p, skill) {
    let days = 0;
    (p.experience || []).forEach((e) => {
      if (!WP.engine.findSkills([e.title].concat(e.bullets || []).join('\n')).has(skill)) return;
      const s = WP.d.parse((e.start || '') + (String(e.start || '').length === 7 ? '-01' : ''));
      const en = e.current || !e.end ? new Date() : WP.d.parse(e.end + (String(e.end).length === 7 ? '-01' : ''));
      if (s && en && en > s) days += (en - s) / 86400000;
    });
    return days ? Math.max(0.5, Math.round((days / 365.25) * 2) / 2) : null;
  }
  function screening(st, job, a) {
    const p = st.profile; const co = job.companyId ? WP.store.get('companies', job.companyId) : null; const r = (co && co.research) || {};
    const best = WP.engine.bestBullets(p, a, 2);
    const top = a.matched.filter((s) => s.must || s.weight >= 2).slice(0, 3).map((s) => s.name);
    const resp = (job.description || '').split('\n').map((l) => l.trim()).filter((l) => /^[-•*]/.test(l)).map((l) => l.replace(/^[-•*]\s*/, ''))[0];
    const lf = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
    const hook = r.mission ? 'your mission to ' + lf(r.mission.replace(/\.$/, '')) : r.news ? 'your recent momentum (' + lf(r.news.split(/[.;]/)[0]) + ')' : 'the work ' + job.company + ' is doing' + (co && co.industry ? ' in ' + co.industry.toLowerCase() : '');
    const qs = [
      { q: 'Why do you want to work at ' + job.company + '?', a: 'I am drawn to ' + hook + '. The ' + job.title + ' role fits my experience in ' + (top.join(', ') || 'this area') + (best[0] ? ' - for example, I ' + lf(best[0].text.replace(/\.$/, '')) : '') + '. ' + (resp ? 'I would love to help the team ' + lf(resp.replace(/\.$/, '')) + '.' : '') },
      { q: 'Why are you a good fit for this role?', a: 'I bring ' + Math.floor(WP.engine.years(p)) + '+ years of hands-on work with ' + (top.join(', ') || 'the core skills in this posting') + '. ' + best.map((b) => 'At ' + b.company + ', I ' + lf(b.text.replace(/\.$/, '')) + '.').join(' ') },
    ];
    a.must.filter((s) => s.have).slice(0, 3).forEach((s) => { const y = yearsWith(p, s.name); qs.push({ q: 'How many years of experience do you have with ' + s.name + '?', a: y ? String(y) + (y === 1 ? ' year' : ' years') : '[add years - listed in your skills but not mentioned in any role]' }); });
    qs.push({ q: 'What are your salary expectations?', a: st.answers.expectedSalary || (p.salary.expected ? WP.money(p.salary.expected, p.salary.currency) + ' per year, flexible depending on the overall package' : '[research the range first - see Offers & Negotiation]') });
    qs.push({ q: 'What is your notice period / earliest start date?', a: st.answers.noticePeriod || p.noticePeriod || '[e.g. 30 days]' });
    if (st.answers.workAuth || p.workAuth) qs.push({ q: 'Are you legally authorized to work in this location?', a: st.answers.workAuth || p.workAuth });
    return qs;
  }

  WP.views.apply = {
    title: 'Apply Wizard',
    render(root, route) {
      const st = WP.store.state; const id = route.parts[0]; const job = id ? WP.store.get('jobs', id) : null;
      if (!job) {
        WP.add(root, S.pageHead({ eyebrow: 'Phase 5 - Apply', title: 'Apply Wizard', desc: 'Pick a job to walk through fit, resume, cover letter, referral, answers and submission.' }));
        const jobs = st.jobs.filter((j) => ['saved', 'applying'].includes(j.status)).sort((a, b) => (b.match || 0) - (a.match || 0));
        WP.add(root, jobs.length ? h('div', { class: 'grid g-auto' }, jobs.map((j) => h('div', { class: 'card hoverable', onclick: () => S.go('apply/' + j.id) }, h('div', { class: 'row between' }, h('b', null, j.title), ui.scoreBadge(j.match)), h('div', { class: 'small muted' }, j.company), h('div', { class: 'row mt-sm' }, S.statusChip(j.status))))) : h('div', { class: 'card' }, ui.empty('send', 'Nothing to apply to yet', 'Save jobs first.', [h('button', { class: 'btn primary', onclick: () => S.go('jobs') }, 'Job Discovery')])));
        return;
      }
      const a = WP.engine.analyzeJob(job, st.profile);
      const cur = steps[job.id] || 0;
      const resume = job.resumeId ? WP.store.get('resumes', job.resumeId) : null;
      const letter = job.coverLetterId ? WP.store.get('coverLetters', job.coverLetterId) : null;
      const contacts = st.contacts.filter((c) => job.companyId && c.companyId === job.companyId).sort((x, y) => (y.warmth || 0) - (x.warmth || 0));
      const referred = contacts.some((c) => c.status === 'referred');
      const applied = !!job.appliedAt;
      const STEPS = [
        { id: 'fit', label: 'Review fit', done: true }, { id: 'resume', label: 'Resume', done: !!resume }, { id: 'letter', label: 'Cover letter', done: !!letter || job.skipLetter },
        { id: 'referral', label: 'Referral', done: referred || job.skipReferral }, { id: 'answers', label: 'Answers & autofill', done: !!job.answersReviewed }, { id: 'submit', label: 'Submit & track', done: applied },
      ];
      const go = (i) => { steps[job.id] = Math.max(0, Math.min(STEPS.length - 1, i)); WP.app.refresh(); };
      WP.add(root, h('div', { class: 'row mb' }, h('a', { href: '#/jobs/' + job.id, class: 'small row', style: { gap: '4px' } }, icon('chevronLeft', 14), 'Job analysis')));
      WP.add(root, S.pageHead({ eyebrow: 'Apply Wizard', title: job.title + ' - ' + job.company, desc: 'Six guided steps. Waypoint prepares everything; you stay in control of what gets sent and you click Submit.',
        actions: [ui.scoreBadge(job.match, 'Match score'), S.statusChip(job.status), job.url ? h('a', { class: 'btn', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 14), 'Posting') : null] }));
      WP.add(root, h('div', { class: 'wizard-steps' }, STEPS.map((s, i) => h('div', { class: 'wizard-step' + (i === cur ? ' active' : '') + (s.done && i !== cur ? ' done' : ''), onclick: () => go(i) }, h('span', { class: 'n' }, s.done && i !== cur ? '✓' : i + 1), s.label))));
      const box = h('div', { class: 'card' }); WP.add(root, box);
      const nav = (nextLabel, onNext) => h('div', { class: 'row between mt-lg' }, cur > 0 ? h('button', { class: 'btn', onclick: () => go(cur - 1) }, icon('chevronLeft', 14), 'Back') : h('span'), onNext !== false ? h('button', { class: 'btn primary', onclick: () => { if (onNext) onNext(); go(cur + 1); } }, nextLabel || 'Next', icon('chevronRight', 14)) : h('span'));
      const step = STEPS[cur].id;
      if (step === 'fit') {
        const mustMissing = a.must.filter((s) => !s.have);
        WP.add(box, h('div', { class: 'split-12' }, h('div', null, C.gauge(a.score)),
          h('div', null, h('h3', null, a.score >= 75 ? 'Go - this is a strong match.' : a.score >= 55 ? 'Go, with a tailored resume.' : 'Stretch - apply if you can address the gaps.'),
            h('p', { class: 'text-2 small' }, 'Matched ' + a.matched.length + ' of ' + a.skills.length + ' skills' + (a.years != null ? ' | asks ' + a.years + '+ years, you have ~' + a.profileYears : '') + '.'),
            mustMissing.length ? h('div', null, h('h4', null, 'Missing must-haves'), h('div', { class: 'chips mt-sm' }, mustMissing.map((s) => h('span', { class: 'chip miss' }, s.name))), h('p', { class: 'small text-2 mt-sm' }, 'If you have any of these, add them in step 2. Otherwise, acknowledge one briefly in your cover letter with how you are closing the gap.')) : h('div', { class: 'callout good' }, icon('check', 16), 'You cover every must-have skill.'),
            a.redFlags.length ? h('div', { class: 'mt' }, h('h4', null, 'Worth asking about'), a.redFlags.map((r2) => h('div', { class: 'small text-2', style: { margin: '4px 0' } }, '• ' + r2))) : null)), nav('Continue to resume'));
      } else if (step === 'resume') {
        const assist = S.assist('tailor-resume', () => ({ job }), { ccArg: job.id, compact: true });
        WP.add(box, h('h3', null, icon('file', 16), 'Tailored resume'),
          resume ? h('div', { class: 'callout good mt' }, icon('check', 16), h('div', { class: 'grow row between' }, h('span', null, 'Saved version "' + resume.name + '" - ATS ' + resume.atsScore + '%, keywords ' + resume.matchScore + '%.'), h('div', { class: 'row' },
            h('button', { class: 'btn sm', onclick: () => WP.resume.print(WP.resume.render(resume.data, resume.template || 'classic'), WP.resume.fileBase(resume.data, job)) }, icon('printer', 13), 'PDF'),
            h('button', { class: 'btn sm', onclick: () => ui.download(WP.resume.fileBase(resume.data, job) + '.doc', WP.resume.word(resume.data), 'application/msword') }, 'Word'),
            h('button', { class: 'btn sm', onclick: () => S.go('resume/' + job.id) }, 'Edit')))) :
            h('div', { class: 'mt' }, h('p', { class: 'text-2' }, 'Generate a tailored version in one click (you can fine-tune it in Resume Studio).'),
              h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => {
                const t = WP.engine.tailor(st.profile, job, {}); const ats = WP.engine.atsCheck(t.data, t.analysis, job);
                const v = WP.store.add('resumes', { name: job.company + ' - ' + job.title, jobId: job.id, template: 'classic', data: t.data, matchScore: Math.round(t.coverage * 100), atsScore: ats.score });
                WP.store.update('jobs', job.id, { resumeId: v.id }); S.markActions('tailor-resume', 'jobId', job.id); if (job.status === 'saved') S.setJobStatus(job, 'applying'); WP.store.log('resume', job.id, ''); ui.toast('Tailored resume created (ATS ' + ats.score + '%)'); WP.app.refresh();
              } }, icon('wand', 14), 'Generate tailored resume'), h('button', { class: 'btn', onclick: () => S.go('resume/' + job.id) }, 'Open Resume Studio'))),
          assist ? h('div', { class: 'mt' }, assist) : null, nav('Continue to cover letter'));
      } else if (step === 'letter') {
        WP.add(box, h('h3', null, icon('mail', 16), 'Cover letter'),
          letter ? h('div', { class: 'mt' }, h('div', { class: 'pre', style: { fontFamily: 'Georgia, serif' } }, letter.body), h('div', { class: 'row mt-sm' }, ui.copyBtn(letter.body, 'Letter', ''), h('button', { class: 'btn', onclick: () => S.go('resume/' + job.id + '?tab=letter') }, icon('edit', 14), 'Edit'))) :
            h('div', { class: 'mt' }, h('p', { class: 'text-2' }, 'Many applications make it optional - but a specific letter helps for competitive or career-change roles.'),
              h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => { const co = job.companyId ? WP.store.get('companies', job.companyId) : null; const cl = WP.store.add('coverLetters', { jobId: job.id, tone: 'professional', body: WP.engine.coverLetter(st.profile, job, co, st.profile.careerSwitch.active ? 'career-change' : 'professional', {}) }); WP.store.update('jobs', job.id, { coverLetterId: cl.id }); ui.toast('Cover letter drafted - review it'); WP.app.refresh(); } }, icon('wand', 14), 'Draft cover letter'),
                h('button', { class: 'btn', onclick: () => { WP.store.update('jobs', job.id, { skipLetter: true }); go(cur + 1); } }, 'Skip - not needed'))),
          nav('Continue to referral'));
      } else if (step === 'referral') {
        const warm = contacts.filter((c) => (c.warmth || 0) >= 3);
        WP.add(box, h('h3', null, icon('handshake', 16), 'Referral check'), h('p', { class: 'text-2 small' }, 'A referral puts your application in front of a human. If you have a warm contact, ask before (or right after) applying.'),
          referred ? h('div', { class: 'callout good' }, icon('check', 16), 'You have a referral from ' + contacts.find((c) => c.status === 'referred').name + '. Mention their name in your application where asked.') :
            contacts.length ? h('div', { class: 'list' }, contacts.map((c) => h('div', { class: 'list-item' }, ui.avatar(c.name), h('div', { class: 'grow' }, h('div', { class: 'title' }, c.name), h('div', { class: 'meta' }, (c.title || '') + ' | warmth ' + (c.warmth || 1) + '/5 | ' + c.status)),
              h('button', { class: 'btn sm' + ((c.warmth || 0) >= 3 ? ' primary' : ''), onclick: () => S.go('outreach?contact=' + c.id) }, (c.warmth || 0) >= 3 ? 'Ask for referral' : 'Reach out')))) :
              h('div', { class: 'callout warn' }, icon('info', 16), h('div', null, 'No contacts at ' + job.company + ' yet. ', h('a', { href: '#/network?tab=find&company=' + job.companyId }, 'Find recruiters, alumni and ex-colleagues there'), ' - even one message can make a difference.')),
          !referred ? h('div', { class: 'row mt' }, h('button', { class: 'btn', onclick: () => { WP.store.update('jobs', job.id, { skipReferral: true }); go(cur + 1); } }, 'Apply without a referral')) : null,
          warm.length && !referred ? h('p', { class: 'small muted mt-sm' }, 'Tip: ' + warm[0].name + ' is your warmest path.') : null, nav('Continue to answers'));
      } else if (step === 'answers') {
        const qs = screening(st, job, a); job.screening = job.screening || {};
        WP.add(box, h('h3', null, icon('zap', 16), 'Answers & autofill'), h('p', { class: 'text-2 small' }, 'Drafts for the questions application forms usually ask - edit and copy them in. Standard fields (name, email, phone, links...) can be filled by your Autofill bookmarklet.'),
          h('div', { class: 'stack mt' }, qs.map((x) => { const ta = h('textarea', { rows: x.a.length > 160 ? 4 : 2 }); ta.value = job.screening[x.q] || x.a; ta.addEventListener('input', () => { job.screening[x.q] = ta.value; WP.store.save(); });
            return h('div', { class: 'field' }, h('label', null, x.q), h('div', { class: 'input-group' }, ta, h('button', { class: 'btn icon', 'aria-label': 'Copy answer', onclick: () => ui.copy(ta.value, 'Answer') }, icon('copy', 15)))); })),
          h('div', { class: 'callout mt' }, icon('zap', 16), h('div', { class: 'small' }, 'Autofill bookmarklet: ', Object.keys(st.answers).length ? h('span', null, 'ready with ' + Object.keys(st.answers).filter((k) => st.answers[k]).length + ' answers. ', h('a', { href: '#/autofill' }, 'Open the Autofill Kit'), ' to install it.') : h('a', { href: '#/autofill' }, 'Set up your answer bank and bookmarklet (2 minutes)'))),
          nav('Continue to submit', () => { WP.store.update('jobs', job.id, { answersReviewed: true }); }));
      } else {
        const checks = [['Tailored resume ready', !!resume], ['Cover letter ready (or not needed)', !!letter || !!job.skipLetter], ['Referral asked (or skipped)', referred || !!job.skipReferral], ['Answers reviewed', !!job.answersReviewed]];
        WP.add(box, h('h3', null, icon('send', 16), 'Submit & track'),
          h('div', { class: 'grid g2 mt' },
            h('div', null, checks.map(([l, ok]) => h('div', { class: 'check-item' }, h('span', { class: 'ci ' + (ok ? 'pass' : 'todo') }, icon(ok ? 'check' : 'circle', 11)), h('div', { class: 'small' }, l)))),
            h('div', { class: 'stack' },
              ui.callout('warn', 'lock', 'Waypoint never submits for you. Open the posting, fill it in (use your bookmarklet), attach your resume, review, and click Submit yourself.'),
              job.url ? h('a', { class: 'btn primary lg', href: job.url, target: '_blank', rel: 'noopener noreferrer' }, icon('external', 16), 'Open the application') : h('div', { class: 'small muted' }, 'No posting URL saved - edit the job to add it.'),
              applied ? h('div', { class: 'callout good' }, icon('check', 16), 'Applied on ' + d.fmtLong(job.appliedAt) + '. Follow-up reminder set for ' + d.fmtLong(job.nextActionDate || d.addDays(job.appliedAt, 7)) + '.') :
                h('button', { class: 'btn good lg', onclick: () => { S.setJobStatus(job, 'applied', 'Applied via Apply Wizard'); WP.app.refresh(); } }, icon('check', 16), 'I submitted my application'))),
          applied ? h('div', { class: 'card flat mt' }, h('h4', null, 'Next best moves'), h('div', { class: 'row mt-sm' },
            contacts.length ? h('button', { class: 'btn', onclick: () => S.go('outreach?contact=' + contacts[0].id) }, icon('chat', 14), 'Tell ' + WP.engine.firstName(contacts[0].name) + ' you applied') : h('button', { class: 'btn', onclick: () => S.go('network?tab=find&company=' + job.companyId) }, icon('users', 14), 'Find the recruiter'),
            h('button', { class: 'btn', onclick: () => S.go('interview?tab=prep&job=' + job.id) }, icon('mic', 14), 'Start interview prep'), h('button', { class: 'btn', onclick: () => S.go('apply') }, icon('send', 14), 'Apply to another job'))) : null,
          nav(null, false));
      }
    },
  };

  /* ============================================================ Autofill Kit */
  const GROUPS = [['personal', 'Personal details'], ['links', 'Links'], ['experience', 'Experience & education'], ['eligibility', 'Work eligibility'], ['compensation', 'Compensation'], ['logistics', 'Logistics'], ['motivation', 'Motivation (long answers)'], ['eeo', 'Voluntary EEO questions']];
  WP.views.autofill = {
    title: 'Autofill Kit',
    render(root) {
      const st = WP.store.state; const A = st.answers; const Q = (WP.K && WP.K.appQuestions) || [];
      const filled = Q.filter((q) => A[q.key]).length;
      WP.add(root, S.pageHead({ eyebrow: 'Phase 5 - Apply', title: 'Autofill Kit', desc: 'Fill the same application questions once. A browser bookmarklet then fills standard fields on job sites (Workday, Greenhouse, Lever and most others) - highlighted in green for you to review. It never clicks Submit.',
        actions: [h('button', { class: 'btn', onclick: () => { const dft = WP.engine.answerDefaults(st.profile); let n = 0; Object.keys(dft).forEach((k) => { if (dft[k] && !A[k]) { A[k] = dft[k]; n++; } }); WP.store.save(); ui.toast(n ? 'Filled ' + n + ' answers from your profile' : 'Nothing new to fill from profile', n ? 'good' : 'info'); WP.app.refresh(); } }, icon('wand', 15), 'Fill from my profile')] }));
      const bm = WP.engine.bookmarklet(A);
      const link = h('a', { class: 'bookmarklet', href: bm, onclick: (e) => { e.preventDefault(); ui.toast('Drag this button to your bookmarks bar. To test it, use "Test on the demo form" below.', 'info'); } }, icon('zap', 16), 'Waypoint Autofill');
      WP.add(root, h('div', { class: 'split-12' },
        h('div', { class: 'stack-lg' },
          h('div', { class: 'card accent' }, h('h3', null, '1. Install the bookmarklet'), h('p', { class: 'small text-2' }, 'Show your bookmarks bar (Ctrl+Shift+B, or Cmd+Shift+B on Mac), then drag this button onto it:'),
            h('div', { class: 'center', style: { padding: '10px 0' } }, link),
            h('details', null, h('summary', { class: 'small', style: { cursor: 'pointer' } }, 'Cannot drag? Create it manually'), h('ol', { class: 'small text-2', style: { paddingLeft: '18px' } }, h('li', null, 'Copy the code below.'), h('li', null, 'Right-click your bookmarks bar > Add page / Add bookmark.'), h('li', null, 'Name: Waypoint Autofill. URL: paste the code.')), ui.copyBtn(bm, 'Bookmarklet code', 'sm')),
            h('p', { class: 'small muted', style: { margin: '10px 0 0' } }, 'Re-install after changing answers - the bookmarklet carries a copy of them. It lives only in your browser.')),
          h('div', { class: 'card' }, h('h3', null, '2. Use it on any application'), h('ol', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
            h('li', null, 'Open the application form (log in if needed).'), h('li', null, 'Click "Waypoint Autofill" in your bookmarks bar.'), h('li', null, 'Filled fields turn green. Review each one, answer anything left, attach your tailored resume.'), h('li', null, 'Click Submit yourself, then mark the job as Applied in Waypoint.'))),
          h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, 'Try it: demo form'), h('div', { class: 'row' }, h('button', { class: 'btn primary sm', onclick: () => { const n = WP.engine.autofillRun(A); if (!n) ui.toast('No fields filled - add answers to your bank first', 'bad'); } }, icon('zap', 13), 'Test on the demo form'), h('button', { class: 'btn sm', onclick: () => WP.app.refresh() }, 'Reset'))),
            demoForm()),
          h('div', { class: 'card' }, h('h3', null, icon('shieldCheck', 16), 'Good to know'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
            h('li', null, 'Works on standard text, email, phone, dropdown and textarea fields. File uploads, checkboxes and custom widgets stay manual.'), h('li', null, 'Some sites use iframes from other domains - browsers block filling those for security.'),
            h('li', null, 'EEO questions (gender, ethnicity, veteran, disability) are voluntary. "Prefer not to say" is always acceptable.'), h('li', null, 'Using Claude Code? The /apply command can fill complex forms with Claude in your browser and stops before Submit.')))),
        h('div', { class: 'card', 'data-wp-skip': '1' }, h('div', { class: 'card-h' }, h('h3', null, icon('list', 16), 'Your answer bank'), h('span', { class: 'sub' }, filled + ' of ' + Q.length + ' answered')), h('div', { class: 'progress mb' }, h('span', { style: { width: (Q.length ? (filled / Q.length) * 100 : 0) + '%' } })),
          GROUPS.map(([g, label]) => {
            const qs = Q.filter((q) => q.group === g); if (!qs.length) return null;
            return h('details', { open: g === 'personal' || g === 'eligibility' || g === 'compensation', style: { borderTop: '1px solid var(--border)', padding: '10px 0' } },
              h('summary', { style: { cursor: 'pointer', fontWeight: 650 } }, label, h('span', { class: 'muted small' }, '  ' + qs.filter((q) => A[q.key]).length + '/' + qs.length)),
              h('div', { class: 'form-grid mt' }, qs.map((q) => {
                const set = (v) => { A[q.key] = v; WP.store.save(); };
                let input;
                if (q.type === 'select') input = ui.select(A[q.key] || '', [{ value: '', label: 'Choose...' }].concat((q.options || []).map((o) => ({ value: o, label: o }))), set);
                else if (q.type === 'yesno') input = ui.select(A[q.key] || '', [{ value: '', label: 'Choose...' }, 'Yes', 'No'], set);
                else if (q.type === 'textarea') input = ui.textarea(A[q.key] || '', set, { rows: 3 });
                else input = ui.input(A[q.key] || '', set);
                return ui.field(q.label, input, q.help || null, q.type === 'textarea' ? 'full' : '');
              })));
          }),
          h('div', { class: 'row mt' }, h('button', { class: 'btn', onclick: () => ui.copy(Q.filter((q) => A[q.key]).map((q) => q.label + ': ' + A[q.key]).join('\n'), 'All answers') }, icon('copy', 14), 'Copy all as text'), h('button', { class: 'btn', onclick: () => WP.app.refresh() }, icon('refresh', 14), 'Update bookmarklet')))));
    },
  };
  function demoForm() {
    const f = (label, name, type, opts) => h('div', { class: 'field' }, h('label', { for: 'demo-' + name }, label), opts ? h('select', { id: 'demo-' + name, name }, [h('option', { value: '' }, 'Select...')].concat(opts.map((o) => h('option', { value: o }, o)))) : h('input', { id: 'demo-' + name, name, type: type || 'text' }));
    return h('form', { class: 'form-grid', onsubmit: (e) => { e.preventDefault(); ui.toast('This is only a demo form - nothing was submitted', 'info'); } },
      f('First name', 'first_name'), f('Last name', 'last_name'), f('Email', 'email', 'email'), f('Phone', 'phone', 'tel'), f('City', 'city'), f('LinkedIn profile', 'linkedin_url', 'url'),
      f('Current company', 'current_company'), f('Years of experience', 'years_experience'), f('Notice period', 'notice_period'), f('Expected salary', 'expected_salary'),
      f('Are you legally authorized to work in this country?', 'work_authorization', null, ['Yes', 'No']), f('Will you now or in the future require visa sponsorship?', 'sponsorship', null, ['Yes', 'No']),
      f('How did you hear about us?', 'source', null, ['LinkedIn', 'Referral', 'Company website', 'Job board', 'Other']), f('Gender (voluntary)', 'gender', null, ['Male', 'Female', 'Non-binary', 'Prefer not to say']),
      h('div', { class: 'full' }, h('button', { class: 'btn', type: 'submit' }, 'Submit (demo)')));
  }
})();
