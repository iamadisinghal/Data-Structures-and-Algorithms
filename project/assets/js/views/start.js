/* Start Here - a complete guide for each mode (Standalone / With Claude). */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui } = WP;
  const S = WP.shared;

  function journey(st) {
    const ph = WP.engine.phases(st);
    const cur = ph.find((p) => p.pct < 70) || ph[ph.length - 1];
    return h('div', { class: 'journey' }, ph.map((p) => h('div', {
      class: 'journey-step' + (p.pct >= 70 ? ' done' : '') + (p === cur ? ' current' : ''), onclick: () => S.go(p.route), role: 'link', tabindex: 0,
      'data-tip': WP.esc(p.desc) + '<br><b>' + p.pct + '%</b> complete',
    },
      h('div', { class: 'row between' }, h('span', { class: 'num' }, 'Phase ' + p.n), p.pct >= 70 ? h('span', { style: { color: 'var(--good-ink)' } }, icon('check', 14)) : icon(p.icon, 14)),
      h('div', { class: 'name' }, p.name), h('div', { class: 'progress ' + (p.pct >= 70 ? 'good' : '') }, h('span', { style: { width: p.pct + '%' } })),
      h('div', { class: 'pct' }, p === cur ? 'You are here' : p.desc))));
  }

  function approvalModel(claude) {
    const col = (cls, ic, title, sub, items) => h('div', { class: 'card tight', style: { borderTop: '3px solid ' + cls } },
      h('div', { class: 'row', style: { gap: '8px' } }, icon(ic, 18), h('b', null, title)), h('div', { class: 'small muted', style: { margin: '2px 0 8px' } }, sub),
      h('ul', { class: 'small text-2', style: { margin: 0, paddingLeft: '18px' } }, items.map((i) => h('li', null, i))));
    return h('div', { class: 'card' },
      h('div', { class: 'card-h' }, h('h3', null, icon('shieldCheck', 18), 'How permissions work'), h('a', { href: '#/settings', class: 'small' }, 'Change what runs automatically')),
      h('p', { class: 'text-2 small' }, (claude ? 'Claude and the planner' : 'The planner') + ' only ever proposes. Every proposal becomes a card in your Approval Queue with the reason, expected impact and effort - you approve, edit or dismiss it.'),
      h('div', { class: 'grid g3 mt' },
        col('var(--good)', 'shield', 'Tier 1 - Prepares', 'Can run automatically (your choice)', ['Research companies & markets', 'Draft resumes, letters, messages', 'Score and rank jobs']),
        col('var(--warn)', 'edit', 'Tier 2 - Changes records', 'Always asks you first', ['Add jobs, contacts, companies it found', 'Change statuses', 'Update your profile']),
        col('var(--critical)', 'lock', 'Tier 3 - Leaves your computer', 'Approve + you do the final click', ['Send any message or email', 'Submit any application', 'Anything that costs money'])));
  }

  function steps(list) {
    return h('div', { class: 'steps' }, list.map((s) => h('div', { class: 'step' + (s.done ? ' done' : '') + (s.claude ? ' claude' : '') },
      h('div', { class: 'dot' }),
      h('div', null,
        h('div', { class: 'row between' }, h('h3', null, s.title), s.time ? h('span', { class: 'chip' }, icon('clock', 12), s.time) : null),
        s.text ? h('p', null, s.text) : null,
        s.bullets ? h('ul', null, s.bullets.map((b) => h('li', null, b))) : null,
        s.actions ? h('div', { class: 'row' }, s.actions) : null))));
  }
  const openBtn = (route, label, primary) => h('button', { class: 'btn sm' + (primary ? ' primary' : ''), onclick: () => S.go(route) }, label, icon('arrowRight', 13));

  function firstRun() {
    return h('div', { class: 'grid g2 mt' },
      h('div', { class: 'card hoverable', onclick: () => { WP.store.loadDemo(); WP.app.renderHeader(); WP.app.go('dashboard'); WP.ui.toast('Sample data loaded - explore freely'); } },
        h('div', { class: 'icon-box', style: { marginBottom: '10px' } }, icon('eye', 18)), h('h3', null, 'Explore with sample data'),
        h('p', { class: 'text-2 small' }, 'See every chart, queue and tool filled in with a realistic (fictional) job seeker. Clear it any time in Data & Settings.'),
        h('span', { class: 'btn primary sm' }, 'Load sample data', icon('arrowRight', 13))),
      h('div', { class: 'card hoverable', onclick: () => { WP.store.state.meta.onboarded = true; WP.store.save(); WP.app.go('profile'); } },
        h('div', { class: 'icon-box good', style: { marginBottom: '10px' } }, icon('rocket', 18)), h('h3', null, 'Start with my own data'),
        h('p', { class: 'text-2 small' }, 'Paste your resume, set your targets and let Waypoint build your plan. Takes about 10 minutes.'),
        h('span', { class: 'btn sm' }, 'Build my profile', icon('arrowRight', 13))));
  }

  function standalone(root, st) {
    const p = st.profile; const ps = WP.engine.profileStrength(p, st).score;
    const visited = st.meta.visited || {};
    const applied = st.jobs.filter((j) => j.appliedAt).length;
    const pending = st.actions.filter((a) => a.status === 'pending').length;
    const isEmpty = !st.jobs.length && !p.name;
    WP.add(root, 
      h('div', { class: 'hero' },
        h('h1', null, 'Your job search, co-piloted.'),
        h('p', null, 'Waypoint researches, organizes, writes and plans with you - entirely in your browser, with no account and no AI required. It prepares every step; you approve what happens next.'),
        h('div', { class: 'hero-stats' },
          h('div', null, h('b', null, ps + '%'), h('span', null, 'profile strength')), h('div', null, h('b', null, st.jobs.length), h('span', null, 'jobs tracked')),
          h('div', null, h('b', null, applied), h('span', null, 'applications')), h('div', null, h('b', null, st.contacts.length), h('span', null, 'people in network')),
          h('div', null, h('b', null, pending), h('span', null, 'awaiting your approval'))),
        h('div', { class: 'row mt' }, isEmpty ? null : h('button', { class: 'btn white', onclick: () => S.go('queue') }, icon('inbox', 15), 'Review approvals'), h('button', { class: 'btn', onclick: () => S.go('dashboard') }, icon('grid', 15), 'Command Center'),
          h('button', { class: 'btn', onclick: () => WP.app.setMode('claude') }, icon('sparkles', 15), 'Have Claude? Switch mode'))),
      isEmpty ? firstRun() : null,
      S.section('Your journey'), journey(st),
      h('div', { class: 'grid g2 mt-lg' },
        h('div', { class: 'span-2' }, approvalModel(false))),
      S.section('Complete process - step by step (Standalone)'),
      h('div', { class: 'split-21' },
        h('div', { class: 'card' }, steps([
          { title: 'Build your master profile', time: '10 min', done: ps >= 70, text: 'Your master profile is the single source of truth. Every tailored resume, letter and message is built from it - so the better it is, the better everything else is.',
            bullets: ['Paste your current resume (or upload .txt/.md/.pdf). Waypoint parses roles, bullets, skills and education automatically.', 'Set target titles, locations, work modes, salary and notice period.', 'Use the bullet coach: fix weak phrases and add numbers to at least 40% of bullets.'], actions: [openBtn('profile', 'Open Profile', true)] },
          { title: 'Set weekly goals and permissions', time: '2 min', done: !!visited.settings, text: 'Tell Waypoint how many applications and messages you want per week, and what it may prepare without asking.', actions: [openBtn('settings', 'Open settings')] },
          { title: 'Define your targets and study the market', time: '15 min', done: st.companies.length >= 3, bullets: ['Add 5-15 target companies and tier them A (dream), B (strong), C (backup).', 'Use the research links on each company (news, reviews, salaries, interview questions) and save notes.', 'Switching careers? Use the Career Switch planner to see transferable skills, gaps and a 12-week roadmap.'], actions: [openBtn('market', 'Open Market & Targets')] },
          { title: 'Discover openings', time: '15 min / day', done: st.jobs.length >= 3, bullets: ['One click opens pre-filtered searches on LinkedIn, Indeed, Google Jobs and regional boards (Naukri, Reed, SEEK...).', 'Use the "hidden jobs" search: postings on company applicant-tracking systems (Greenhouse, Lever, Workday) that many boards miss.', 'Save a job with its full description - you instantly get a match score, missing skills and red flags.'], actions: [openBtn('jobs', 'Open Job Discovery')] },
          { title: 'Map your network', time: '10 min', done: st.contacts.length >= 5, bullets: ['Add people you know: ex-colleagues, alumni, friends, mentors.', 'For each target company, open ready-made searches for recruiters, hiring managers, alumni and ex-colleagues.', 'See your network map and "warm paths" into each company.'], actions: [openBtn('network', 'Open People & Network')] },
          { title: 'Work your Approval Queue every day', time: '5 min / day', done: st.actions.some((a) => a.status !== 'pending'), text: 'The planner turns your goals and pipeline into concrete proposals: tailor this resume, apply to that job, message this person, follow up there. Approve, edit or dismiss each one.', actions: [openBtn('queue', 'Open Approval Queue', true)] },
          { title: 'Tailor, fill and apply', time: '15 min / application', done: st.resumes.length > 0 && applied > 0, bullets: ['Resume Studio builds a tailored, ATS-safe resume per job and scores it (keyword coverage, metrics, length). Export to PDF, Word or text.', 'The Apply Wizard walks you through match review, resume, cover letter, answers and referral check.', 'The Autofill bookmarklet fills standard form fields on job sites. You review and click Submit yourself.'], actions: [openBtn('resume', 'Resume Studio'), openBtn('autofill', 'Autofill Kit')] },
          { title: 'Reach out and follow up', time: '10 min / day', done: st.outreach.filter((o) => o.status !== 'draft').length >= 3, bullets: ['Generate personalized connection notes, referral asks, recruiter messages and follow-ups.', 'Copy, send on LinkedIn or email, then click "I sent it" so reminders stay accurate.'], actions: [openBtn('outreach', 'Open Outreach')] },
          { title: 'Track every application', done: applied >= 3, text: 'Drag cards across the kanban (Saved to Offer). Follow-up reminders appear automatically after 7 quiet days.', actions: [openBtn('tracker', 'Open Applications')] },
          { title: 'Prepare, negotiate and win', done: st.stories.length >= 3, bullets: ['Build a STAR story bank and see which competencies are covered.', 'Practice with timed mock questions for your role family.', 'Compare offers side by side and generate a negotiation script.'], actions: [openBtn('interview', 'Interview Prep'), openBtn('offers', 'Offers')] },
        ])),
        h('div', { class: 'stack-lg' },
          h('div', { class: 'card accent' }, h('h3', { class: 'row' }, icon('clock', 16), 'Your daily 30 minutes'),
            h('ol', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, h('li', null, 'Approval Queue: approve or dismiss today\'s proposals (5 min).'), h('li', null, 'Apply to 1-2 high-match jobs with tailored resumes (15 min).'), h('li', null, 'Send 2-3 personalized messages (5 min).'), h('li', null, 'Log replies and move cards on the tracker (5 min).'))),
          h('div', { class: 'card' }, h('h3', { class: 'row' }, icon('calendar', 16), 'Weekly review'),
            h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, h('li', null, 'Command Center: response rate, funnel, goal progress.'), h('li', null, 'Market insights: which skills keep appearing? Add gaps to your learning plan.'), h('li', null, 'Research 2 new target companies.'), h('li', null, 'Practice 3 interview questions out loud.'), h('li', null, 'Export a backup of your data.'))),
          h('div', { class: 'card' }, h('h3', { class: 'row' }, icon('info', 16), 'Good to know'),
            faq('Is my data private?', 'Yes. Everything is stored in this browser (localStorage). Nothing is uploaded. Export a backup file to move computers.'),
            faq('Does it apply to jobs automatically?', 'No - by design. It prepares everything (resume, letter, answers, autofill) and you press Submit. That keeps you accurate, honest and within job sites\' rules.'),
            faq('Does it work offline?', 'Yes. Only the links you click (job boards, LinkedIn, Google) need the internet.'),
            faq('Can I use it with Claude later?', 'Yes. Switch to "With Claude" at the top - your data carries over.')))));
  }
  function faq(q, a) { return h('details', { style: { margin: '8px 0' } }, h('summary', { style: { cursor: 'pointer', fontWeight: 600, fontSize: '13px' } }, q), h('p', { class: 'small text-2', style: { margin: '6px 0 0' } }, a)); }

  function claudeMode(root, st) {
    const hasKey = WP.claude.hasKey();
    const path = (ic, title, who, text, stepsList, btn) => h('div', { class: 'card', style: { display: 'flex', flexDirection: 'column' } },
      h('div', { class: 'row', style: { marginBottom: '8px' } }, h('div', { class: 'icon-box claude' }, icon(ic, 18)), h('div', null, h('h3', null, title), h('div', { class: 'small muted' }, who))),
      h('p', { class: 'text-2 small' }, text), h('ol', { class: 'small', style: { paddingLeft: '18px', margin: '0 0 12px', flex: 1 } }, stepsList.map((s) => h('li', { style: { margin: '4px 0' } }, s))), btn);
    const isEmpty = !st.jobs.length && !st.profile.name;
    WP.add(root, 
      h('div', { class: 'hero claude' },
        h('h1', null, 'Let Claude do the heavy lifting. You stay in control.'),
        h('p', null, 'Claude researches markets and companies on the live web, finds openings and people, tailors resumes, drafts letters and messages, plans your week and preps you for interviews. Every result comes back to Waypoint as a proposal for you to approve.'),
        h('div', { class: 'row mt' }, h('button', { class: 'btn white', onclick: () => S.go('claude') }, icon('sparkles', 15), 'Open Claude Hub'), h('button', { class: 'btn', onclick: () => S.go('queue') }, icon('inbox', 15), 'Approval Queue'), h('button', { class: 'btn', onclick: () => WP.app.setMode('standalone') }, icon('compass', 15), 'No Claude? Use Standalone'))),
      isEmpty ? firstRun() : null,
      S.section('Pick how you use Claude'),
      h('div', { class: 'grid g3' },
        path('chat', 'Claude.ai (easiest)', 'Web, desktop or mobile app - any plan', 'No setup. Waypoint writes the prompt (with your data) and imports Claude\'s answer back.', [
          'Click "Copy prompt for Claude.ai" on any page (or use the Claude Hub prompt library).', 'Paste it into claude.ai. Turn on web search for research tasks, if your plan has it.', 'Copy Claude\'s full reply and click "Import Claude\'s reply".', 'Review and approve what gets saved.',
        ], h('button', { class: 'btn claude-ghost', onclick: () => S.go('claude?tab=chat') }, 'Set up Claude.ai', icon('arrowRight', 13))),
        path('key', 'API key in Waypoint (one click)', 'Anthropic Console account (pay per use)', 'Add your own API key once and a "Run with Claude" button appears on every page. Results stream in live.', [
          'Create a key at console.anthropic.com (API keys).', 'Paste it in Claude Hub > API key. It stays in this browser only.', 'Click "Run with Claude" on any page - watch it search and write.', 'Approve the results. Typical tasks cost a few cents.',
        ], h('button', { class: hasKey ? 'btn' : 'btn claude', onclick: () => S.go('claude?tab=api') }, hasKey ? 'Key connected - manage' : 'Add my API key', icon('arrowRight', 13))),
        path('terminal', 'Claude Code (most autonomous)', 'Pro, Max, Team, Enterprise or Console', 'Claude works in the claude-workspace folder: slash commands for every step, files for every output, and optional browser form-filling that stops before Submit.', [
          'Export your data (Claude Hub > Claude Code) into claude-workspace/data/.', 'Open a terminal in claude-workspace and run: claude', 'Type /start, then /weekly-plan, /find-jobs, /tailor-resume...', 'Import the updated file back to see and approve proposals here.',
        ], h('button', { class: 'btn claude-ghost', onclick: () => S.go('claude?tab=code') }, 'Set up Claude Code', icon('arrowRight', 13)))),
      h('div', { class: 'card mt' }, h('h3', null, 'Which path is right for me?'), h('div', { class: 'table-wrap mt-sm' }, h('table', { class: 'table' },
        h('thead', null, h('tr', null, ['Capability', 'Claude.ai', 'API key in Waypoint', 'Claude Code'].map((x) => h('th', null, x)))),
        h('tbody', null, [
          ['Live web research (companies, jobs, people, salaries)', 'Yes (web search on)', 'Yes', 'Yes'],
          ['Results imported into Waypoint', 'Paste reply', 'Automatic', 'Via data file import'],
          ['Runs from inside Waypoint', '-', 'Yes', '-'],
          ['Creates approval cards', 'Yes (on import)', 'Yes', 'Yes (source: Claude Code)'],
          ['Fills application forms in your browser', '-', '-', 'Optional (stops before Submit)'],
          ['Writes files (resumes, briefs) to disk', '-', '-', 'Yes'],
          ['Cost', 'Your Claude plan', 'Pay per use (cents per task)', 'Your plan or Console usage'],
        ].map((r) => h('tr', null, r.map((c, i) => h('td', { style: i ? {} : { fontWeight: 600 } }, c)))))))),
      h('div', { class: 'mt-lg' }, approvalModel(true)),
      S.section('Complete process - step by step (With Claude)'),
      h('div', { class: 'split-21' },
        h('div', { class: 'card' }, steps([
          { title: 'Connect Claude', claude: true, time: '3 min', done: hasKey || !!(st.meta.visited || {}).claude, text: 'Choose Claude.ai, an API key, or Claude Code (above). You can mix them - everything shares the same data.', actions: [openBtn('claude', 'Open Claude Hub', true)] },
          { title: 'Profile: let Claude parse and polish it', claude: true, time: '5 min', done: WP.engine.profileStrength(st.profile, st).score >= 70, bullets: ['Paste your resume on the Profile page and run "Parse my resume". Approve the structured result.', 'Run "Rewrite my weakest bullets" - Claude uses only your facts and marks missing numbers as [add metric].'], actions: [openBtn('profile', 'Open Profile')] },
          { title: 'Market scan and company research', claude: true, time: '5 min', done: st.companies.length >= 3, bullets: ['Market & Targets > "Scan the job market": demand, salary ranges (with sources), top skills, companies hiring.', 'Approve which companies to add, then "Research a company" for each tier-A target.', 'Switching careers? Run "Plan my career switch".'], actions: [openBtn('market', 'Open Market & Targets')] },
          { title: 'Find live openings', claude: true, done: st.jobs.length >= 3, text: 'Job Discovery > "Find live job openings". Claude searches career sites and applicant-tracking systems, scores each posting against you, and you pick which to save.', actions: [openBtn('jobs', 'Open Job Discovery')] },
          { title: 'Find the right people', claude: true, done: st.contacts.length >= 5, text: 'People & Network > "Find people at a company". Recruiters, likely hiring managers, alumni and ex-colleagues - public professional info only. Approve who to add.', actions: [openBtn('network', 'Open Network')] },
          { title: 'Let Claude plan your week', claude: true, time: '2 min', done: st.actions.some((a) => a.source === 'claude' || a.source === 'claude-code'), text: 'Approval Queue > "Plan my week". Claude turns your goals and pipeline into prioritized cards. Approve the ones you agree with.', actions: [openBtn('queue', 'Open Approval Queue', true)] },
          { title: 'Tailor, write and apply', claude: true, done: st.resumes.length > 0, bullets: ['Resume Studio > "Tailor my resume": a truthful, job-specific resume plus a change log. Approve to save a version.', '"Write a cover letter" uses your saved company research.', 'Apply Wizard assembles everything. In Claude Code, /apply can fill the form in your browser and stop before Submit.'], actions: [openBtn('resume', 'Resume Studio'), openBtn('tracker', 'Applications')] },
          { title: 'Outreach that sounds like you', claude: true, done: st.outreach.length >= 3, text: 'Outreach > "Draft personalized outreach": three options per person. You copy, send and click "I sent it".', actions: [openBtn('outreach', 'Open Outreach')] },
          { title: 'Interview prep and negotiation', claude: true, done: st.stories.length >= 3, bullets: ['"Build an interview prep sheet" maps your STAR stories to likely questions and researches the company.', '"Plan my salary negotiation" researches market pay and writes your scripts.'], actions: [openBtn('interview', 'Interview Prep'), openBtn('offers', 'Offers')] },
          { title: 'Keep Claude Code and Waypoint in sync', claude: true, bullets: ['Export for Claude Code > copy into claude-workspace/data/ > work in Claude Code.', 'Import from Claude Code > review new proposals in the Approval Queue.', 'Newer changes win automatically; nothing is deleted on import.'], actions: [openBtn('claude?tab=code', 'Sync settings')] },
        ])),
        h('div', { class: 'stack-lg' },
          h('div', { class: 'card claude' }, h('h3', { class: 'row' }, icon('shieldCheck', 16), 'What Claude will and won\'t do'),
            h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
              h('li', null, 'Only uses facts from your profile - never invents titles, dates, metrics or skills.'), h('li', null, 'Marks missing numbers as [add metric] for you to fill.'),
              h('li', null, 'Researches companies, roles and public professional info - never your personal data.'), h('li', null, 'Never sends a message or submits an application for you.'))),
          h('div', { class: 'card' }, h('h3', { class: 'row' }, icon('lock', 16), 'Privacy with Claude'),
            h('p', { class: 'small text-2' }, 'Prompts include your profile (without email/phone) and the job or contact you choose. With an API key, requests go directly from your browser to Anthropic. Your key is stored only in this browser and is never exported.'),
            h('p', { class: 'small text-2', style: { marginBottom: 0 } }, 'Using Claude at work? Follow your organization\'s AI policy and avoid sharing confidential employer or client information.')),
          h('div', { class: 'card' }, h('h3', { class: 'row' }, icon('clock', 16), 'Daily routine with Claude'),
            h('ol', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, h('li', null, 'Monday: "Plan my week" + "Find live job openings".'), h('li', null, 'Daily: approve cards, tailor + apply to 1-2 jobs, send Claude-drafted messages.'), h('li', null, 'Before interviews: prep sheet + mock practice.'), h('li', null, 'Friday: Command Center review, export backup.'))))));
  }

  WP.views.start = {
    title: 'Start Here',
    render(root) {
      const st = WP.store.state;
      if (st.settings.mode === 'claude') claudeMode(root, st); else standalone(root, st);
    },
  };
})();
