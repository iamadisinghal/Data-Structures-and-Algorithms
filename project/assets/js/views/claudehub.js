/* Claude Hub - connect Claude three ways and run any task. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, d } = WP;
  const S = WP.shared;
  const view = { tab: 'overview', task: 'find-jobs', job: '', company: '', contact: '' };

  function statusRow(ok, label, detail) { return h('div', { class: 'check-item' }, h('span', { class: 'ci ' + (ok ? 'pass' : 'todo') }, icon(ok ? 'check' : 'circle', 11)), h('div', null, h('b', { class: 'small' }, label), detail ? h('div', { class: 'small muted' }, detail) : null)); }

  function overview(box, st) {
    const meta = st.meta; const hasKey = WP.claude.hasKey();
    const claudeActs = st.actions.filter((a) => a.source === 'claude' || a.source === 'claude-code');
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'grid g3' }, [
        ['chat', 'Claude.ai', 'Copy a prompt, paste the reply back. Any plan, no setup.', 'chat', 'Set up'],
        ['key', 'API key', hasKey ? 'Connected - "Run with Claude" is live on every page.' : 'One-click runs inside Waypoint. Pay per use.', 'api', hasKey ? 'Manage' : 'Connect'],
        ['terminal', 'Claude Code', 'Slash commands, files and browser form-filling that stops before Submit.', 'code', 'Set up'],
      ].map(([ic, t, dsc, tab, btn]) => h('div', { class: 'card hoverable', onclick: () => { view.tab = tab; WP.app.refresh(); } }, h('div', { class: 'icon-box claude', style: { marginBottom: '10px' } }, icon(ic, 18)), h('h3', null, t), h('p', { class: 'small text-2' }, dsc), h('span', { class: 'btn claude-ghost sm' }, btn, icon('arrowRight', 12))))),
      h('div', { class: 'card' }, h('h3', null, 'Status'), h('div', { class: 'mt-sm' },
        statusRow(hasKey, 'API key', hasKey ? 'Stored in this browser' : 'Optional'),
        statusRow(!!meta.lastClaudeExport, 'Exported for Claude Code', meta.lastClaudeExport ? d.rel(meta.lastClaudeExport) : 'Not yet'),
        statusRow(!!meta.lastClaudeImport, 'Imported from Claude Code', meta.lastClaudeImport ? d.rel(meta.lastClaudeImport) : 'Not yet'),
        statusRow(claudeActs.length > 0, 'Claude proposals', claudeActs.length + ' total, ' + claudeActs.filter((a) => a.status === 'pending').length + ' pending')))));
    WP.add(box, S.section('Everything Claude can do for you'));
    WP.add(box, h('div', { class: 'grid g-auto' }, Object.entries(WP.claude.TASKS).map(([id, t]) => h('div', { class: 'card tight' },
      h('div', { class: 'row', style: { flexWrap: 'nowrap', alignItems: 'flex-start' } }, h('div', { class: 'icon-box claude' }, icon(t.icon, 16)), h('div', null, h('b', null, t.label), h('div', { class: 'small text-2' }, t.desc),
        h('div', { class: 'row mt-sm', style: { gap: '6px' } }, t.web ? h('span', { class: 'chip' }, icon('globe', 11), 'web search') : null, h('span', { class: 'chip claude' }, icon('terminal', 11), t.cc),
          h('button', { class: 'btn sm', onclick: () => { view.tab = 'library'; view.task = id; WP.app.refresh(); } }, 'Use'))))))));
  }

  function chatTab(box, st) {
    const pack = WP.claude.contextPack();
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'card' }, h('h3', null, icon('chat', 16), 'Use Waypoint with Claude.ai (web, desktop or mobile)'),
        h('div', { class: 'steps mt' }, [
          ['Create a Project', ['Go to claude.ai and choose Projects > Create project. Name it "Job Search Copilot".', 'Projects are available on paid plans. On the free plan, skip to step 4 and paste the Context Pack at the start of a chat instead.']],
          ['Paste the project instructions', ['Open the project\'s custom instructions and paste the text on the right.']],
          ['Upload your Context Pack', ['Download it below and add it to the project knowledge. Re-upload whenever your pipeline changes (weekly is plenty).']],
          ['Run tasks with ready-made prompts', ['On any Waypoint page, click "Copy prompt for Claude.ai", or use the Prompt library tab. Paste into a chat in your project.', 'Turn on web search in Claude.ai for research tasks (markets, companies, jobs, people, salaries), if your plan includes it.']],
          ['Bring results back', ['Copy Claude\'s full reply and click "Import Claude\'s reply" on the same page. You review everything before it is saved.']],
        ].map(([t2, items]) => h('div', { class: 'step claude' }, h('div', { class: 'dot' }), h('div', null, h('h3', null, t2), h('ul', null, items.map((x) => h('li', null, x))))))),
        h('div', { class: 'row' }, h('a', { class: 'btn claude', href: 'https://claude.ai/projects', target: '_blank', rel: 'noopener noreferrer' }, icon('external', 14), 'Open claude.ai'), h('button', { class: 'btn', onclick: () => { view.tab = 'library'; WP.app.refresh(); } }, 'Open prompt library'))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, 'Project instructions'), h('div', { class: 'mt-sm' }, ui.codeblock(WP.claude.PROJECT_INSTRUCTIONS, 'Instructions'))),
        h('div', { class: 'card claude' }, h('h3', null, icon('file', 16), 'Context Pack'), h('p', { class: 'small text-2' }, 'Your profile, goals, pipeline, network, stories and saved job descriptions in one Markdown file (' + Math.round(pack.length / 1000) + ' KB). Email and phone are left out.'),
          h('div', { class: 'row' }, h('button', { class: 'btn claude', onclick: () => ui.download('waypoint-context-pack.md', pack, 'text/markdown') }, icon('download', 14), 'Download'), ui.copyBtn(pack, 'Context Pack', '')),
          h('details', { class: 'mt-sm' }, h('summary', { class: 'small', style: { cursor: 'pointer' } }, 'Preview'), h('div', { class: 'pre small mt-sm' }, pack.slice(0, 4000) + (pack.length > 4000 ? '\n...' : '')))))));
  }

  function apiTab(box, st) {
    const cfg = st.settings.claude; const hasKey = WP.claude.hasKey();
    const keyIn = h('input', { type: 'password', placeholder: hasKey ? 'Key saved - paste a new one to replace it' : 'sk-ant-...', autocomplete: 'off' });
    let remember = true;
    const result = h('div', { class: 'mt-sm' });
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'card' }, h('h3', null, icon('key', 16), 'Connect your Anthropic API key'),
        h('ol', { class: 'small text-2', style: { paddingLeft: '18px' } }, h('li', null, 'Sign in at console.anthropic.com and add billing (pay as you go).'), h('li', null, 'Create a key under API keys. Consider a spending limit.'), h('li', null, 'Paste it below. Waypoint then calls Claude directly from this browser.')),
        h('div', { class: 'field' }, h('label', null, 'API key'), h('div', { class: 'input-group' }, keyIn, h('button', { class: 'btn claude', onclick: () => {
          const k = keyIn.value.trim(); if (!k) { ui.toast('Paste a key first', 'bad'); return; }
          if (!/^sk-ant-/.test(k)) ui.toast('That does not look like an Anthropic key (sk-ant-...) - saved anyway', 'info');
          WP.store.setKey(k, remember); keyIn.value = ''; ui.toast('Key saved' + (remember ? '' : ' for this session')); WP.app.refresh();
        } }, 'Save key'))),
        h('label', { class: 'check small mt-sm' }, h('input', { type: 'checkbox', checked: true, onchange: (e) => { remember = e.target.checked; } }), 'Remember on this device (otherwise it is cleared when you close the tab)'),
        h('div', { class: 'form-grid mt' },
          ui.field('Model', ui.select(cfg.model, WP.claude.MODELS.map((m) => ({ value: m.id, label: m.label })), (v) => { cfg.model = v; WP.store.save(); })),
          ui.field('Effort', ui.select(cfg.effort, [['low', 'Low - fastest, cheapest'], ['medium', 'Medium - balanced (default)'], ['high', 'High - most thorough']].map(([v, l]) => ({ value: v, label: l })), (v) => { cfg.effort = v; WP.store.save(); }), 'Some tasks (tailoring, negotiation) always use high.'),
          h('div', { class: 'field' }, h('label', null, 'Web search'), ui.switch(cfg.webSearch !== false, (v) => { cfg.webSearch = v; WP.store.save(); }, 'Allow live web research'))),
        h('div', { class: 'row mt' },
          h('button', { class: 'btn', disabled: !hasKey, onclick: async () => { WP.clear(result); WP.add(result, h('span', { class: 'small muted pulse' }, 'Testing...')); try { const txt = await WP.claude.test(); WP.clear(result); WP.add(result, ui.callout('good', 'check', 'Connected. Claude replied: "' + txt + '"')); } catch (e) { WP.clear(result); WP.add(result, ui.callout('critical', 'alert', WP.claude.friendly(e))); } } }, icon('zap', 14), 'Test connection'),
          hasKey ? h('button', { class: 'btn danger', onclick: () => { WP.store.setKey(''); ui.toast('Key removed'); WP.app.refresh(); } }, icon('trash', 14), 'Remove key') : null),
        result),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon('dollar', 16), 'What it costs'), h('div', { class: 'table-wrap mt-sm' }, h('table', { class: 'table' }, h('thead', null, h('tr', null, h('th', null, 'Model'), h('th', { class: 'num' }, 'Input / 1M'), h('th', { class: 'num' }, 'Output / 1M'))),
          h('tbody', null, WP.claude.MODELS.map((m) => h('tr', null, h('td', { class: 'small' }, m.label), h('td', { class: 'num' }, '$' + m.inPrice), h('td', { class: 'num' }, '$' + m.outPrice)))))),
          h('p', { class: 'small text-2 mt-sm', style: { marginBottom: 0 } }, 'Typical tasks cost a few cents; web research adds about $0.01 per search. Every run shows its token usage and estimated cost.')),
        h('div', { class: 'card' }, h('h3', null, icon('lock', 16), 'Security & privacy'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
          h('li', null, 'The key is stored only in this browser and never included in exports.'), h('li', null, 'Requests go straight from your browser to the Anthropic API (via the official SDK loaded from a CDN).'),
          h('li', null, 'Only use this on a personal, trusted device. Anyone with access to this browser profile could use the key.'), h('li', null, 'Prompts include your profile (without email/phone) and the job/contact you choose.'),
          h('li', null, 'Requests use automatic model fallback: if a request is declined for safety reasons, Anthropic may retry it on another Claude model.'))))));
  }

  function codeTab(box, st) {
    const cmds = [['/start', 'Onboarding + health check of your data'], ['/status', 'Terminal dashboard: funnel, goals, top matches'], ['/weekly-plan', 'Plan the week - creates pending actions'], ['/approve', 'Approve/reject pending actions in bulk'],
      ['/profile', 'Build or refine your profile from files in inbox/'], ['/market-scan', 'Market research for a role + location'], ['/research-company', 'Deep company brief'], ['/find-jobs', 'Search live openings (ATS + boards)'],
      ['/analyze-job', 'Match analysis for one job'], ['/tailor-resume', 'Tailored resume files (Markdown + HTML)'], ['/cover-letter', 'Cover letter for a job'], ['/find-people', 'Recruiters, hiring managers, alumni'],
      ['/outreach', 'Message drafts for a contact'], ['/apply', 'Application package; optional browser form-fill that stops before Submit'], ['/follow-ups', 'Find and draft due follow-ups'], ['/interview-prep', 'Prep sheet for an interview'], ['/negotiate', 'Negotiation plan and scripts'], ['/sync', 'Validate the data file before importing it back']];
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'card' }, h('h3', null, icon('terminal', 16), 'Run your search with Claude Code'),
        h('div', { class: 'steps mt' }, [
          ['Install Claude Code', ['Follow the official guide at docs.claude.com (Claude Code overview). It runs in a terminal and in VS Code / JetBrains. Requires a Claude Pro, Max, Team or Enterprise plan, or an Anthropic Console account.']],
          ['Export your data', ['Click "Export for Claude Code" (right). Save waypoint-data.json into the claude-workspace/data/ folder that ships with Waypoint.']],
          ['Start Claude in the workspace', ['Open a terminal in claude-workspace and run: claude', 'Claude reads claude-workspace/CLAUDE.md - the rules: honesty, privacy, and ask-before-acting.']],
          ['Use slash commands', ['Start with /start, then /weekly-plan. Claude asks for approval at every checkpoint ("approve 1,3", "reject 2").', 'Resumes, letters and research are written to claude-workspace/output/.']],
          ['Bring results back here', ['Click "Import from Claude Code" and choose claude-workspace/data/waypoint-data.json. New proposals appear in your Approval Queue; newer changes win; nothing is deleted.']],
        ].map(([t2, items]) => h('div', { class: 'step claude' }, h('div', { class: 'dot' }), h('div', null, h('h3', null, t2), h('ul', null, items.map((x) => h('li', null, x))))))),
        h('h4', null, 'Commands'), h('div', { class: 'table-wrap mt-sm' }, h('table', { class: 'table' }, h('tbody', null, cmds.map(([c, dsc]) => h('tr', null, h('td', { class: 'mono nowrap' }, c), h('td', { class: 'small' }, dsc))))))),
      h('div', { class: 'stack-lg sticky-side' },
        h('div', { class: 'card claude' }, h('h3', null, icon('refresh', 16), 'Sync'), h('p', { class: 'small text-2' }, 'The web app and Claude Code share one file format. Your API key is never exported.'),
          h('div', { class: 'stack' }, h('button', { class: 'btn claude', onclick: () => exportForCode(st) }, icon('download', 14), 'Export for Claude Code'), h('button', { class: 'btn', onclick: importFromCode }, icon('upload', 14), 'Import from Claude Code')),
          h('div', { class: 'small muted mt-sm' }, 'Last export: ' + (st.meta.lastClaudeExport ? d.rel(st.meta.lastClaudeExport) : 'never') + ' | last import: ' + (st.meta.lastClaudeImport ? d.rel(st.meta.lastClaudeImport) : 'never'))),
        h('div', { class: 'card' }, h('h3', null, 'Folder layout'), h('pre', { class: 'pre small mono', style: { margin: '8px 0 0' } }, 'claude-workspace/\n  CLAUDE.md          rules for Claude\n  .claude/commands/  slash commands\n  .claude/agents/    research helpers\n  data/              waypoint-data.json\n  inbox/             drop resumes & JDs\n  output/            resumes, letters, briefs\n  templates/         ATS templates\n  claude-ai/         Claude.ai instructions')),
        h('div', { class: 'card' }, h('h3', null, icon('shieldCheck', 16), 'Guardrails'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } }, h('li', null, 'Claude asks before adding or changing records.'), h('li', null, 'It never sends messages or submits applications unless you explicitly ask for that specific item.'), h('li', null, 'Browser form-filling stops before the final Submit.'))))));
  }
  function exportForCode(st) {
    st.meta.lastClaudeExport = d.now(); WP.store.saveNow();
    ui.download('waypoint-data.json', JSON.stringify(WP.store.exportDoc(), null, 2), 'application/json');
  }
  async function importFromCode() {
    const f = await ui.pickFile('.json,application/json'); if (!f) return;
    try {
      const doc = JSON.parse(await ui.readText(f));
      const res = WP.store.importDoc(doc, 'merge');
      WP.store.state.meta.lastClaudeImport = d.now(); WP.store.saveNow(); WP.engine.refreshMatches(WP.store.state);
      ui.toast('Imported: ' + res.added + ' new, ' + res.updated + ' updated' + (res.newActions ? ', ' + res.newActions + ' proposals to review' : ''));
      WP.app.go(res.newActions ? 'queue' : 'dashboard');
    } catch (e) { ui.toast('Import failed: ' + (e.message || e), 'bad'); }
  }
  WP.shared.exportForCode = exportForCode; WP.shared.importFromCode = importFromCode;

  function library(box, st) {
    const T = WP.claude.TASKS; const t = T[view.task] || T['find-jobs'];
    const needs = t.needs || [];
    if (needs.includes('job') && (!view.job || !WP.store.get('jobs', view.job))) view.job = (st.jobs[0] || {}).id || '';
    if (needs.includes('company') && (!view.company || !WP.store.get('companies', view.company))) view.company = (st.companies[0] || {}).id || '';
    if (needs.includes('contact') && (!view.contact || !WP.store.get('contacts', view.contact))) view.contact = (st.contacts[0] || {}).id || '';
    const ctx = () => ({ job: WP.store.get('jobs', view.job), company: WP.store.get('companies', view.company), contact: WP.store.get('contacts', view.contact), text: st.profile.rawResume });
    const missing = needs.find((n) => !ctx()[n]);
    WP.add(box, h('div', { class: 'split-12' },
      h('div', { class: 'card pad0' }, h('div', { class: 'list', style: { padding: '6px' } }, Object.entries(T).map(([id, x]) => h('div', { class: 'list-item clickable' + (id === view.task ? ' active' : ''), style: id === view.task ? { background: 'var(--claude-soft)' } : null, onclick: () => { view.task = id; WP.app.refresh(); } },
        h('div', { class: 'icon-box claude', style: { width: '30px', height: '30px' } }, icon(x.icon, 15)), h('div', { class: 'grow', style: { minWidth: 0 } }, h('div', { class: 'title small ellipsis' }, x.label), h('div', { class: 'meta ellipsis' }, x.web ? 'web research' : x.output === 'json' ? 'importable result' : 'written result')))))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card' }, h('h3', null, icon(t.icon, 16), t.label), h('p', { class: 'small text-2' }, t.desc),
          needs.length ? h('div', { class: 'form-grid' },
            needs.includes('job') ? ui.field('Job', S.jobPicker(view.job, (v) => { view.job = v; WP.app.refresh(); })) : null,
            needs.includes('company') ? ui.field('Company', ui.select(view.company, st.companies.map((c) => ({ value: c.id, label: c.name })), (v) => { view.company = v; WP.app.refresh(); })) : null,
            needs.includes('contact') ? ui.field('Contact', ui.select(view.contact, st.contacts.map((c) => ({ value: c.id, label: c.name + ' - ' + (c.company || '') })), (v) => { view.contact = v; WP.app.refresh(); })) : null) : null,
          missing ? ui.callout('warn', 'info', 'Add a ' + missing + ' first to use this task.') : h('div', { class: 'row mt' },
            WP.claude.hasKey() ? h('button', { class: 'btn claude', onclick: () => S.runTask(view.task, ctx()) }, icon('sparkles', 14), 'Run with Claude') : null,
            h('button', { class: 'btn', onclick: () => ui.copy(WP.claude.chatPrompt(view.task, ctx()), 'Prompt') }, icon('copy', 14), 'Copy prompt for Claude.ai'),
            h('button', { class: 'btn', onclick: () => S.importReply(view.task, ctx) }, icon('download', 14), 'Import reply'),
            h('span', { class: 'chip claude clickable', onclick: () => ui.copy(t.cc, 'Command') }, icon('terminal', 11), t.cc))),
        !missing ? h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, 'Prompt preview'), h('span', { class: 'sub' }, 'Includes your data - review before sharing')), ui.codeblock(WP.claude.chatPrompt(view.task, ctx()), 'Prompt')) : null)));
  }

  WP.views.claude = {
    title: 'Claude Hub',
    render(root, route) {
      const st = WP.store.state;
      if (route.query.tab) view.tab = route.query.tab;
      if (st.settings.mode !== 'claude') WP.add(root, h('div', { class: 'mode-banner claude' }, icon('sparkles', 16), h('span', { class: 'grow' }, 'You are in Standalone mode. Switch to "With Claude" to see Claude actions on every page.'), h('button', { class: 'btn claude sm', onclick: () => WP.app.setMode('claude') }, 'Switch')));
      WP.add(root, S.pageHead({ eyebrow: 'With Claude', title: 'Claude Hub', desc: 'Connect Claude the way that suits you - Claude.ai, your own API key, or Claude Code - and run any job-search task. Results always come back as proposals you approve.' }));
      WP.add(root, ui.tabs([{ id: 'overview', label: 'Overview', icon: 'sparkles' }, { id: 'chat', label: 'Claude.ai', icon: 'chat' }, { id: 'api', label: 'API key', icon: 'key' }, { id: 'code', label: 'Claude Code', icon: 'terminal' }, { id: 'library', label: 'Prompt library', icon: 'list' }], view.tab, (t) => { view.tab = t; S.go('claude?tab=' + t); }));
      const box = h('div'); WP.add(root, box);
      ({ overview, chat: chatTab, api: apiTab, code: codeTab, library }[view.tab] || overview)(box, st);
    },
  };
})();
