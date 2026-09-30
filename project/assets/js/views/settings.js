/* Data & Settings - goals, permissions, preferences, backup, reports, privacy. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, d } = WP;
  const S = WP.shared;

  const PERMS = [
    { key: 'research', label: 'Research', desc: 'Company & market research, finding people and jobs, scoring', tier: 1 },
    { key: 'drafts', label: 'Drafting', desc: 'Tailored resumes, cover letters, message drafts, prep sheets', tier: 1 },
    { key: 'saveItems', label: 'Saving what it finds', desc: 'Adding jobs, contacts and companies found by Claude to your records', tier: 2 },
    { key: 'followups', label: 'Follow-ups', desc: 'Nudges after applications or unanswered messages', tier: 3, locked: true },
    { key: 'outreach', label: 'Sending messages', desc: 'LinkedIn notes, emails, referral asks', tier: 3, locked: true },
    { key: 'applications', label: 'Submitting applications', desc: 'Any final "Submit" on a job site', tier: 3, locked: true },
  ];

  function csv(rows) { return rows.map((r) => r.map((c) => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(',')).join('\n'); }

  WP.views.settings = {
    title: 'Data & Settings',
    render(root) {
      const st = WP.store.state; const s = st.settings; const g = s.weeklyGoals;
      WP.add(root, S.pageHead({ eyebrow: 'System', title: 'Data & settings', desc: 'Set your goals and permissions, and keep your data safe. Everything lives in this browser until you export it.' }));

      const au = s.autonomy;
      const opt = (p, val) => {
        const on = au[p.key] === val || (p.locked && val === 'ask');
        return h('span', { class: 'perm-opt' + (on ? ' on' : '') + (p.locked ? ' locked' : ''), role: 'radio', 'aria-checked': on ? 'true' : 'false', tabindex: p.locked ? -1 : 0,
          'data-tip': p.locked ? 'Locked for your safety: Waypoint and Claude prepare it, you do the final step.' : (val === 'auto' ? 'Runs automatically (auto-approved)' : 'Creates a card in your Approval Queue'),
          onclick: () => { if (p.locked) { ui.toast('This one always needs you - it leaves your computer', 'info'); return; } au[p.key] = val; WP.store.save(); WP.app.refresh(); } }, icon('check', 14));
      };
      WP.add(root, h('div', { class: 'split-21' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('shieldCheck', 16), 'Permissions - what may happen without asking'), h('span', { class: 'sub' }, 'Applies to the planner, Claude and Claude Code')),
          h('div', { class: 'table-wrap' }, h('table', { class: 'table perm-table' },
            h('thead', null, h('tr', null, h('th', null, 'Capability'), h('th', null, 'Automatic'), h('th', null, 'Ask me first'))),
            h('tbody', null, PERMS.map((p) => h('tr', null,
              h('td', null, h('div', { class: 'row', style: { gap: '6px' } }, h('b', null, p.label), p.locked ? icon('lock', 13) : null, h('span', { class: 'chip ' + (p.tier === 1 ? 'match' : p.tier === 2 ? 'warn' : 'miss'), style: { padding: '0 6px', fontSize: '11px' } }, 'Tier ' + p.tier)), h('div', { class: 'small muted' }, p.desc)),
              h('td', null, p.locked ? h('span', { class: 'small muted' }, 'Never') : opt(p, 'auto')), h('td', null, opt(p, 'ask'))))))),
          h('p', { class: 'small text-2 mt-sm', style: { marginBottom: 0 } }, 'Tier 1 prepares things for you. Tier 2 changes your records. Tier 3 leaves your computer - it always needs your approval and your final click.')),
        h('div', { class: 'card' }, h('h3', null, icon('flag', 16), 'Weekly goals'), h('p', { class: 'small text-2' }, 'The planner and Command Center track these. Be realistic - consistency beats bursts.'),
          h('div', { class: 'form-grid', style: { gridTemplateColumns: '1fr 1fr' } },
            ui.field('Applications', ui.input(g.applications, (v) => { g.applications = Math.max(0, +v || 0); WP.store.save(); }, { type: 'number', min: 0 })),
            ui.field('Outreach messages', ui.input(g.outreach, (v) => { g.outreach = Math.max(0, +v || 0); WP.store.save(); }, { type: 'number', min: 0 })),
            ui.field('Follow-ups', ui.input(g.followups, (v) => { g.followups = Math.max(0, +v || 0); WP.store.save(); }, { type: 'number', min: 0 })),
            ui.field('Learning sessions', ui.input(g.learningHours, (v) => { g.learningHours = Math.max(0, +v || 0); WP.store.save(); }, { type: 'number', min: 0 }))),
          h('div', { class: 'field mt' }, h('label', null, 'Minimum match to suggest applying: ' + s.matchThreshold + '%'), h('input', { type: 'range', min: 30, max: 90, step: 5, value: s.matchThreshold, onchange: (e) => { s.matchThreshold = +e.target.value; WP.store.save(); WP.app.refresh(); } })))));

      WP.add(root, h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card' }, h('h3', null, icon('sliders', 16), 'Preferences'), h('div', { class: 'form-grid mt-sm' },
          ui.field('Mode', ui.select(s.mode, [{ value: 'standalone', label: 'Standalone (no Claude)' }, { value: 'claude', label: 'With Claude' }], (v) => WP.app.setMode(v))),
          ui.field('Theme', ui.select(s.theme, [{ value: 'system', label: 'Match my system' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }], (v) => { s.theme = v; WP.store.save(); WP.app.renderHeader(); })),
          ui.field('Job board region', ui.select(s.region, [['global', 'Global'], ['india', 'India'], ['us', 'United States'], ['uk', 'United Kingdom'], ['eu', 'Europe'], ['canada', 'Canada'], ['australia', 'Australia'], ['mena', 'Middle East'], ['sea', 'Southeast Asia']].map(([v, l]) => ({ value: v, label: l })), (v) => { s.region = v; WP.store.save(); })),
          ui.field('Currency', ui.select(s.currency, ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'AUD', 'SGD', 'AED', 'JPY'], (v) => { s.currency = v; st.profile.salary.currency = v; WP.store.save(); })))),
        h('div', { class: 'card' }, h('h3', null, icon('database', 16), 'Your data'), h('p', { class: 'small text-2' }, 'Stored in this browser only' + (WP.store.storageOK ? '' : ' - WARNING: storage is blocked, export now') + '. About ' + Math.round(JSON.stringify(st).length / 1024) + ' KB: ' + [WP.plural(st.jobs.length, 'job'), WP.plural(st.contacts.length, 'contact'), WP.plural(st.companies.length, 'company', 'companies'), WP.plural(st.actions.length, 'action')].join(', ') + '.'),
          h('div', { class: 'row' },
            h('button', { class: 'btn primary', onclick: () => ui.download('waypoint-backup-' + d.today() + '.json', JSON.stringify(WP.store.exportDoc(), null, 2), 'application/json') }, icon('download', 14), 'Export backup'),
            h('button', { class: 'btn', onclick: async () => {
              const f = await ui.pickFile('.json,application/json'); if (!f) return;
              let doc; try { doc = JSON.parse(await ui.readText(f)); } catch (e) { ui.toast('That file is not valid JSON', 'bad'); return; }
              const mode = await ui.confirm({ title: 'Import ' + f.name, message: 'Merge keeps your current data and adds/updates from the file (newer changes win). Replace swaps everything for the file\'s contents.', okText: 'Merge (recommended)', cancelText: 'Replace instead...' });
              try {
                if (mode) { const r = WP.store.importDoc(doc, 'merge'); ui.toast('Merged: ' + r.added + ' new, ' + r.updated + ' updated'); }
                else if (await ui.confirm({ title: 'Replace all data?', message: 'This overwrites everything in this browser with the file. Export a backup first if unsure.', okText: 'Replace', danger: true })) { WP.store.importDoc(doc, 'replace'); ui.toast('Data replaced'); }
                WP.engine.refreshMatches(WP.store.state); WP.app.renderHeader(); WP.app.refresh();
              } catch (e) { ui.toast(e.message || 'Import failed', 'bad'); }
            } }, icon('upload', 14), 'Import file')),
          h('div', { class: 'row mt-sm' },
            h('button', { class: 'btn sm', onclick: () => ui.download('waypoint-jobs.csv', csv([['Title', 'Company', 'Location', 'Work mode', 'Status', 'Match', 'Applied', 'Salary min', 'Salary max', 'URL', 'Source']].concat(st.jobs.map((j) => [j.title, j.company, j.location, j.workMode, j.status, j.match, j.appliedAt, j.salaryMin, j.salaryMax, j.url, j.source]))), 'text/csv') }, 'Jobs CSV'),
            h('button', { class: 'btn sm', onclick: () => ui.download('waypoint-contacts.csv', csv([['Name', 'Title', 'Company', 'Relationship', 'Warmth', 'Status', 'LinkedIn', 'Email', 'Last contacted', 'Next follow-up']].concat(st.contacts.map((c) => [c.name, c.title, c.company, c.relationship, c.warmth, c.status, c.linkedin, c.email, c.lastContacted, c.nextFollowUp]))), 'text/csv') }, 'Contacts CSV'),
            h('button', { class: 'btn sm', onclick: () => ui.download('waypoint-outreach.csv', csv([['Contact', 'Type', 'Channel', 'Status', 'Sent', 'Message']].concat(st.outreach.map((o) => { const c = WP.store.get('contacts', o.contactId); return [c ? c.name : '', o.type, o.channel, o.status, o.sentAt, o.body]; }))), 'text/csv') }, 'Outreach CSV')))));

      WP.add(root, h('div', { class: 'grid g2 mt' },
        h('div', { class: 'card claude' }, h('h3', null, icon('terminal', 16), 'Claude Code sync'), h('p', { class: 'small text-2' }, 'Save the export as claude-workspace/data/waypoint-data.json. After Claude Code works, import the same file back - its proposals land in your Approval Queue.'),
          h('div', { class: 'row' }, h('button', { class: 'btn claude', onclick: () => S.exportForCode(st) }, icon('download', 14), 'Export for Claude Code'), h('button', { class: 'btn', onclick: () => S.importFromCode() }, icon('upload', 14), 'Import from Claude Code'))),
        h('div', { class: 'card' }, h('h3', null, icon('refresh', 16), 'Start over'), h('p', { class: 'small text-2' }, st.meta.demo ? 'You are using sample data. Clear it to start with your own.' : 'Load sample data to explore, or erase everything in this browser.'),
          h('div', { class: 'row' },
            h('button', { class: 'btn', onclick: async () => { if (st.jobs.length && !st.meta.demo && !(await ui.confirm({ title: 'Replace your data with sample data?', message: 'Your current data will be overwritten. Export a backup first.', okText: 'Load sample data', danger: true }))) return; WP.store.loadDemo(); WP.app.renderHeader(); WP.app.go('dashboard'); ui.toast('Sample data loaded'); } }, icon('eye', 14), 'Load sample data'),
            h('button', { class: 'btn danger', onclick: async () => { if (await ui.confirm({ title: st.meta.demo ? 'Clear sample data?' : 'Erase ALL data?', message: 'This cannot be undone.' + (st.meta.demo ? '' : ' Export a backup first.'), okText: st.meta.demo ? 'Clear sample data' : 'Erase everything', danger: true })) { const mode = st.settings.mode, theme = st.settings.theme; WP.store.reset(); WP.store.state.settings.mode = mode; WP.store.state.settings.theme = theme; WP.store.saveNow(); WP.app.renderHeader(); WP.app.go('start'); ui.toast('Data cleared'); } } }, icon('trash', 14), st.meta.demo ? 'Clear sample data' : 'Erase all data')))));

      const reps = st.reports.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      WP.add(root, h('div', { class: 'card mt' }, h('div', { class: 'card-h' }, h('h3', null, icon('book', 16), 'Saved reports'), h('span', { class: 'sub' }, 'Research and plans saved from Claude')),
        reps.length ? h('div', { class: 'list' }, reps.map((r) => h('div', { class: 'list-item' }, h('div', { class: 'icon-box claude' }, icon('file', 16)), h('div', { class: 'grow' }, h('div', { class: 'title' }, r.title), h('div', { class: 'meta' }, r.kind + ' | ' + d.rel(r.createdAt))),
          h('button', { class: 'btn sm', onclick: () => ui.drawer({ title: r.title, icon: 'file', iconClass: 'claude', wide: true, body: h('div', { class: 'md', html: WP.md(r.markdown) }), footer: [ui.copyBtn(r.markdown, 'Report', ''), h('button', { class: 'btn', onclick: () => ui.download(WP.slug(r.title) + '.md', r.markdown, 'text/markdown') }, 'Download')] }) }, 'Open'),
          h('button', { class: 'btn ghost icon sm', 'aria-label': 'Delete report', onclick: () => { WP.store.remove('reports', r.id); WP.app.refresh(); } }, icon('trash', 14))))) : h('div', { class: 'small muted' }, 'Nothing yet. In With Claude mode, research results can be saved here.')));

      WP.add(root, h('div', { class: 'card mt' }, h('h3', null, icon('lock', 16), 'Privacy & honesty'), h('div', { class: 'grid g3 mt-sm small text-2' },
        h('div', null, h('b', null, 'Local-first. '), 'Waypoint is a set of files that runs in your browser. There is no server, account, tracking or analytics. Data stays in this browser\'s storage until you export it.'),
        h('div', null, h('b', null, 'You are in control. '), 'Nothing is sent, submitted or saved from outside sources without your approval. Messages and applications always need your final click.'),
        h('div', null, h('b', null, 'Honest by design. '), 'Tailoring only selects and rephrases what is in your profile. Missing skills are shown as gaps - you confirm any you genuinely have.')),
        h('p', { class: 'small muted mt', style: { marginBottom: 0 } }, 'Waypoint v1.0 | Links open third-party sites (job boards, LinkedIn, Google) under their own terms. Always follow each site\'s rules and your employer\'s policies.')));
    },
  };
})();
