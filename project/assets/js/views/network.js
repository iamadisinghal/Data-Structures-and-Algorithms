/* People & Network + Outreach. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc, d } = WP;
  const S = WP.shared; const C = WP.charts;
  const view = { tab: 'contacts', q: '', rel: 'all', status: 'all', company: '' };

  function parseCSV(text) {
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
      else if (ch === '"') q = true; else if (ch === ',') { row.push(cell); cell = ''; } else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter((r) => r.some((c) => c.trim()));
  }
  function importLinkedIn() {
    const ta = h('textarea', { rows: 8, class: 'code', placeholder: 'First Name,Last Name,URL,Email Address,Company,Position,Connected On\nPriya,Nair,https://www.linkedin.com/in/...,,Brightpath Fintech,Product Manager,12 Mar 2021' });
    const m = ui.modal({ title: 'Import LinkedIn connections', wide: true, icon: 'upload',
      body: h('div', { class: 'stack' },
        h('ol', { class: 'small text-2', style: { paddingLeft: '18px', margin: 0 } }, h('li', null, 'On LinkedIn: Me > Settings & Privacy > Data privacy > Get a copy of your data > "Connections".'), h('li', null, 'LinkedIn emails you a download link (usually within minutes). Open Connections.csv.'), h('li', null, 'Choose the file below (or paste its contents). Only people at your target companies are imported by default.')),
        h('button', { class: 'btn', onclick: async () => { const f = await ui.pickFile('.csv,text/csv'); if (f) ta.value = await ui.readText(f); } }, icon('upload', 14), 'Choose Connections.csv'), ta,
        h('label', { class: 'check small' }, h('input', { type: 'checkbox', id: 'li-all' }), 'Import everyone (not just people at target companies)')),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn primary', onclick: () => {
        const rows = parseCSV(ta.value); const hi = rows.findIndex((r) => r.some((c) => /first name/i.test(c)));
        if (hi < 0) { ui.toast('Could not find the header row (First Name, Last Name...)', 'bad'); return; }
        const hd = rows[hi].map((c) => c.trim().toLowerCase()); const col = (n) => hd.findIndex((c) => c === n);
        const [fn, ln, url, em, co, pos] = ['first name', 'last name', 'url', 'email address', 'company', 'position'].map(col);
        const all = document.getElementById('li-all').checked; const st = WP.store.state;
        const targets = new Set(st.companies.map((c) => c.name.toLowerCase()));
        let n = 0;
        rows.slice(hi + 1).forEach((r) => {
          const name = ((r[fn] || '') + ' ' + (r[ln] || '')).trim(); const company = (r[co] || '').trim(); if (!name) return;
          if (!all && !targets.has(company.toLowerCase())) return;
          if (st.contacts.some((c) => c.name.toLowerCase() === name.toLowerCase() && (c.company || '').toLowerCase() === company.toLowerCase())) return;
          const cObj = company ? st.companies.find((c) => c.name.toLowerCase() === company.toLowerCase()) : null;
          WP.store.add('contacts', { name, title: (r[pos] || '').trim(), company, companyId: cObj ? cObj.id : '', relationship: 'other', warmth: 2, linkedin: (r[url] || '').trim(), email: (r[em] || '').trim(), source: 'LinkedIn connections', status: 'connected' }, { silent: true }); n++;
        });
        WP.store.save(); m.close(); ui.toast('Imported ' + n + ' connection' + (n === 1 ? '' : 's')); WP.app.refresh();
      } }, icon('check', 14), 'Import')] });
  }

  function contactsTab(box, st) {
    let list = st.contacts.slice();
    if (view.q) { const q = view.q.toLowerCase(); list = list.filter((c) => (c.name + ' ' + c.title + ' ' + c.company).toLowerCase().includes(q)); }
    if (view.rel !== 'all') list = list.filter((c) => c.relationship === view.rel);
    if (view.status !== 'all') list = list.filter((c) => c.status === view.status);
    list.sort((a, b) => (b.warmth || 0) - (a.warmth || 0) || a.name.localeCompare(b.name));
    const statusCounts = {}; st.contacts.forEach((c) => { statusCounts[c.status] = (statusCounts[c.status] || 0) + 1; });
    const warm = st.contacts.filter((c) => (c.warmth || 0) >= 3).length;
    const due = st.contacts.filter((c) => c.nextFollowUp && c.nextFollowUp <= d.today() && !['referred', 'meeting'].includes(c.status)).length;
    WP.add(box, h('div', { class: 'grid g4' },
      kpi('People', st.contacts.length, 'users'), kpi('Warm (3+/5)', warm, 'handshake'), kpi('Referrals', statusCounts.referred || 0, 'award'), kpi('Follow-ups due', due, 'clock')));
    const search = h('input', { type: 'search', placeholder: 'Search people...', value: view.q });
    search.addEventListener('input', WP.debounce(() => { view.q = search.value; WP.app.refresh(); setTimeout(() => { const el = WP.$('input[type=search]'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 0); }, 250));
    WP.add(box, h('div', { class: 'card tight row between mt mb' }, h('div', { class: 'row grow' }, h('div', { style: { flex: 1, minWidth: '180px' } }, search),
      ui.select(view.rel, [{ value: 'all', label: 'All relationships' }].concat(S.RELATIONSHIPS.map((r) => ({ value: r.id, label: r.label }))), (v) => { view.rel = v; WP.app.refresh(); }),
      ui.select(view.status, [{ value: 'all', label: 'All statuses' }].concat(S.CONTACT_STATUSES.map((r) => ({ value: r.id, label: r.label + ' (' + (statusCounts[r.id] || 0) + ')' }))), (v) => { view.status = v; WP.app.refresh(); })),
      h('div', { class: 'row' }, h('button', { class: 'btn', onclick: importLinkedIn }, icon('upload', 14), 'Import LinkedIn CSV'), h('button', { class: 'btn primary', onclick: () => S.contactForm(null) }, icon('plus', 14), 'Add person'))));
    if (!list.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('users', st.contacts.length ? 'No one matches these filters' : 'Your network starts here', 'Add ex-colleagues, classmates, friends and mentors first - warm contacts are 5-10x more likely to reply than strangers. Then use "Find people" for each target company.', [h('button', { class: 'btn primary', onclick: () => S.contactForm(null) }, 'Add a person'), h('button', { class: 'btn', onclick: importLinkedIn }, 'Import LinkedIn connections')]))); return; }
    WP.add(box, h('div', { class: 'table-wrap' }, h('table', { class: 'table' },
      h('thead', null, h('tr', null, ['Person', 'Company', 'Relationship', 'Warmth', 'Status', 'Last contact', 'Follow up', ''].map((x) => h('th', null, x)))),
      h('tbody', null, list.map((c) => h('tr', { class: 'clickable', onclick: () => S.contactDrawer(c.id) },
        h('td', null, h('div', { class: 'row', style: { flexWrap: 'nowrap' } }, ui.avatar(c.name), h('div', null, h('div', { style: { fontWeight: 620 } }, c.name), h('div', { class: 'small muted' }, c.title || '')))),
        h('td', { class: 'small' }, c.company || '-'), h('td', { class: 'small' }, (S.RELATIONSHIPS.find((r) => r.id === c.relationship) || {}).label || c.relationship),
        h('td', null, ui.pips(c.warmth || 1, 5)), h('td', null, h('span', { class: 'chip' }, (S.CONTACT_STATUSES.find((x) => x.id === c.status) || {}).label || c.status)),
        h('td', { class: 'small muted nowrap' }, c.lastContacted ? d.rel(c.lastContacted) : '-'),
        h('td', { class: 'small nowrap' }, c.nextFollowUp ? h('span', { class: 'chip ' + (c.nextFollowUp <= d.today() ? 'warn' : '') }, d.rel(c.nextFollowUp)) : '-'),
        h('td', null, h('button', { class: 'btn sm', onclick: (e) => { e.stopPropagation(); S.go('outreach?contact=' + c.id); } }, icon('chat', 13), 'Message'))))))));
  }
  function kpi(l, v, ic) { return h('div', { class: 'card kpi' }, h('div', { class: 'label' }, icon(ic, 14), l), h('div', { class: 'value' }, v)); }

  function findTab(box, st, route) {
    if (route.query.company) view.company = route.query.company;
    const cos = st.companies;
    if (!cos.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('building', 'Add a target company first', 'People search is organized by company.', [h('button', { class: 'btn primary', onclick: () => S.companyForm(null, (c) => { view.company = c.id; WP.app.refresh(); }) }, 'Add company')]))); return; }
    if (!view.company || !WP.store.get('companies', view.company)) view.company = cos[0].id;
    const co = WP.store.get('companies', view.company);
    const job = st.jobs.find((j) => j.companyId === co.id && !['rejected', 'withdrawn'].includes(j.status));
    const loc = (st.profile.targetLocations || []).find((l) => !/remote/i.test(l)) || '';
    const rows = WP.engine.peopleSearches(co.name, { title: job ? job.title : undefined, location: loc });
    const existing = st.contacts.filter((c) => c.companyId === co.id || (c.company || '').toLowerCase() === co.name.toLowerCase());
    WP.add(box, h('div', { class: 'card tight row between mb' }, h('div', { class: 'row' }, h('b', null, 'Company:'), ui.select(view.company, cos.map((c) => ({ value: c.id, label: c.name + ' (tier ' + c.tier + ')' })), (v) => { view.company = v; WP.app.refresh(); })),
      h('span', { class: 'small muted' }, existing.length + ' contact' + (existing.length === 1 ? '' : 's') + ' already' + (job ? ' | role: ' + job.title : ''))));
    const assist = S.assist('find-people', () => ({ company: co, job }), { ccArg: '"' + co.name + '"' });
    if (assist) WP.add(box, h('div', { class: 'mb' }, assist));
    const nm = h('input', { type: 'text', placeholder: 'Name' }), tt = h('input', { type: 'text', placeholder: 'Title' }), li = h('input', { type: 'text', placeholder: 'LinkedIn URL (optional)' });
    const relSel = ui.select('employee', S.RELATIONSHIPS.map((r) => ({ value: r.id, label: r.label })), () => {});
    WP.add(box, h('div', { class: 'split-21' },
      h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('search', 16), 'Who to look for at ' + co.name), h('span', { class: 'sub' }, 'Opens LinkedIn or Google in a new tab')),
        h('div', { class: 'stack' }, rows.map((r) => h('div', { class: 'card flat tight row', style: { flexWrap: 'nowrap' } }, h('div', { class: 'icon-box' }, icon(r.icon, 16)),
          h('div', { class: 'grow', style: { minWidth: 0 } }, h('b', null, r.kind), h('div', { class: 'small text-2' }, r.why)),
          h('div', { class: 'row', style: { gap: '6px', flexWrap: 'nowrap' } }, h('a', { class: 'btn sm', href: r.li, target: '_blank', rel: 'noopener noreferrer', 'data-tip': 'LinkedIn people search (you must be logged in)' }, 'LinkedIn'), h('a', { class: 'btn sm', href: r.x, target: '_blank', rel: 'noopener noreferrer', 'data-tip': 'Google search of public LinkedIn profiles - works without logging in' }, 'Google')))))),
      h('div', { class: 'stack-lg' },
        h('div', { class: 'card accent' }, h('h3', null, icon('plus', 16), 'Found someone? Add them'), h('div', { class: 'stack mt-sm' }, nm, tt, li, relSel,
          h('button', { class: 'btn primary', onclick: () => { if (!nm.value.trim()) { ui.toast('Name required', 'bad'); return; } WP.store.add('contacts', { name: nm.value.trim(), title: tt.value.trim(), company: co.name, companyId: co.id, relationship: relSel.value, warmth: relSel.value === 'colleague' ? 3 : relSel.value === 'alumni' ? 2 : 1, linkedin: li.value.trim(), source: 'People search', status: 'to-contact' }); S.markActions('find-people', 'companyId', co.id); WP.store.save(); ui.toast('Added ' + nm.value.trim()); WP.app.refresh(); } }, 'Add to network'))),
        h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'Who replies most?'), h('ol', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
          h('li', null, 'Former colleagues and friends (ask for a referral directly).'), h('li', null, 'Alumni of your school (lead with the shared connection).'), h('li', null, 'People 1-2 levels above your target role (potential hiring managers).'),
          h('li', null, 'Recruiters who posted the role.'), h('li', null, 'Peers in the role (great for an honest informational chat).'))),
        existing.length ? h('div', { class: 'card' }, h('h3', null, 'Already in your network'), h('div', { class: 'list mt-sm' }, existing.map((c) => h('div', { class: 'list-item clickable', onclick: () => S.contactDrawer(c.id) }, ui.avatar(c.name), h('div', { class: 'grow' }, h('div', { class: 'title' }, c.name), h('div', { class: 'meta' }, c.title || c.relationship)), ui.pips(c.warmth || 1, 5))))) : null)));
  }

  function mapTab(box, st) {
    const groups = new Map();
    st.companies.slice().sort((a, b) => a.tier.localeCompare(b.tier)).forEach((c) => groups.set(c.id, { label: c.name, tier: c.tier, nodes: [] }));
    const other = { label: 'Other', nodes: [] };
    st.contacts.forEach((c) => {
      const g = (c.companyId && groups.get(c.companyId)) || null;
      const node = { id: c.id, label: c.name, warmth: c.warmth || 1, tip: '<b>' + esc(c.name) + '</b><br>' + esc(c.title || '') + (c.company ? ' @ ' + esc(c.company) : '') + '<br>' + esc(c.relationship) + ' | warmth ' + (c.warmth || 1) + '/5 | ' + esc(c.status) };
      if (g) g.nodes.push(node); else other.nodes.push(node);
    });
    const list = Array.from(groups.values()).filter((g) => g.nodes.length);
    if (other.nodes.length) list.push(other);
    WP.add(box, h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('globe', 16), 'Your network map'), h('span', { class: 'sub' }, 'You in the center, target companies around you, people around each company. Click a person.')),
      C.network(WP.initials(st.profile.name) || 'You', list, { onNode: (n) => S.contactDrawer(n.id), height: 480 })));
    const empty = st.companies.filter((c) => !st.contacts.some((x) => x.companyId === c.id));
    if (empty.length) WP.add(box, h('div', { class: 'card mt' }, h('h3', null, 'Target companies with nobody in your map'), h('div', { class: 'chips mt-sm' }, empty.map((c) => h('span', { class: 'chip clickable miss', onclick: () => { view.tab = 'find'; view.company = c.id; WP.app.refresh(); } }, icon('search', 11), c.name, ' (tier ' + c.tier + ')')))));
  }

  function pathsTab(box, st) {
    const cos = st.companies.slice().sort((a, b) => a.tier.localeCompare(b.tier) || b.interest - a.interest);
    if (!cos.length) { WP.add(box, h('div', { class: 'card' }, ui.empty('route', 'No target companies yet', 'Warm paths show the best person to approach at each target company.'))); return; }
    WP.add(box, ui.callout('', 'info', 'A warm path is the person most likely to help you get noticed at a company. Referrals are consistently the highest-converting way to get interviews - start with your warmest path at each tier-A company.'));
    WP.add(box, h('div', { class: 'grid g2 mt' }, cos.map((c) => {
      const people = st.contacts.filter((x) => x.companyId === c.id || (x.company || '').toLowerCase() === c.name.toLowerCase()).sort((a, b) => (b.warmth || 0) - (a.warmth || 0));
      const best = people[0]; const strength = best ? best.warmth : 0;
      let advice;
      if (!best) advice = h('div', { class: 'small text-2' }, 'No path yet. Look for alumni and ex-colleagues first.');
      else if (best.status === 'referred') advice = h('div', { class: 'small', style: { color: 'var(--good-ink)' } }, icon('check', 12), ' ' + best.name + ' has referred you. Keep them updated.');
      else if (strength >= 4) advice = h('div', { class: 'small' }, 'Ask ', h('b', null, best.name), ' for a referral - you have a strong relationship.');
      else if (strength >= 3) advice = h('div', { class: 'small' }, 'Warm up ', h('b', null, best.name), ': a quick catch-up, then ask about the team.');
      else advice = h('div', { class: 'small' }, 'Start with ', h('b', null, best.name), ' (' + best.relationship + '): a short, specific connection note.');
      return h('div', { class: 'card' }, h('div', { class: 'row between' }, h('div', null, h('b', null, c.name), h('span', { class: 'small muted' }, ' tier ' + c.tier)), h('span', { class: 'chip ' + (strength >= 4 ? 'match' : strength >= 2 ? 'warn' : 'miss') }, strength ? 'Path strength ' + strength + '/5' : 'No path')),
        h('div', { class: 'progress mt-sm ' + (strength >= 4 ? 'good' : '') }, h('span', { style: { width: (strength / 5) * 100 + '%', background: strength >= 4 ? null : strength >= 2 ? '#fab219' : '#d03b3b' } })),
        h('div', { class: 'mt-sm' }, advice),
        people.length ? h('div', { class: 'chips mt-sm' }, people.slice(0, 5).map((p) => h('span', { class: 'chip clickable', onclick: () => S.contactDrawer(p.id) }, p.name, ' · ' + (p.warmth || 1)))) : null,
        h('div', { class: 'row mt' }, best && best.status !== 'referred' ? h('button', { class: 'btn primary sm', onclick: () => S.go('outreach?contact=' + best.id) }, icon('chat', 13), 'Message ' + WP.engine.firstName(best.name)) : null,
          h('button', { class: 'btn sm', onclick: () => { view.tab = 'find'; view.company = c.id; WP.app.refresh(); } }, icon('search', 13), 'Find more people')));
    })));
  }

  WP.views.network = {
    title: 'People & Network',
    render(root, route) {
      const st = WP.store.state;
      if (route.query.tab) view.tab = route.query.tab;
      WP.add(root, S.pageHead({ eyebrow: 'Phase 4 - Network', title: 'People & network', desc: 'Most hires involve a connection. Map who you know, find the right people at each target company, and follow the warmest path to a referral.',
        actions: [h('button', { class: 'btn primary', onclick: () => S.contactForm(null) }, icon('plus', 15), 'Add person')] }));
      WP.add(root, ui.tabs([{ id: 'contacts', label: 'Contacts', icon: 'users', count: st.contacts.length }, { id: 'find', label: 'Find people', icon: 'search' }, { id: 'map', label: 'Network map', icon: 'globe' }, { id: 'paths', label: 'Warm paths', icon: 'route' }], view.tab, (t) => { view.tab = t; S.go('network?tab=' + t); }));
      const box = h('div'); WP.add(root, box);
      ({ contacts: contactsTab, find: findTab, map: mapTab, paths: pathsTab }[view.tab] || contactsTab)(box, st, route);
    },
  };

  /* ============================================================ Outreach */
  const O = { contact: '', job: '', type: '', hook: '', body: '', subject: '', key: '' };
  WP.views.outreach = {
    title: 'Outreach',
    render(root, route) {
      const st = WP.store.state; const E = WP.engine;
      if (route.query.contact && route.query.contact !== O.contact) { O.contact = route.query.contact; O.type = ''; O.key = ''; }
      if (!O.contact || !WP.store.get('contacts', O.contact)) O.contact = (st.contacts.find((c) => c.status === 'to-contact') || st.contacts[0] || {}).id || '';
      const c = O.contact ? WP.store.get('contacts', O.contact) : null;
      if (c && !O.type) O.type = c.relationship === 'alumni' ? 'alumni' : c.relationship === 'colleague' || c.relationship === 'friend' ? 'referral' : c.relationship === 'recruiter' ? 'recruiter' : c.relationship === 'hiring-manager' ? 'hiring-manager' : 'connection';
      if (c && !O.job) { const j = st.jobs.find((x) => x.companyId && x.companyId === c.companyId && !['rejected', 'withdrawn'].includes(x.status)); O.job = j ? j.id : ''; }
      const job = O.job ? WP.store.get('jobs', O.job) : null;
      const key = [O.contact, O.job, O.type, O.hook].join('|');
      if (c && key !== O.key) { const m = E.outreach(O.type, { contact: c, job, hook: O.hook, company: c.companyId ? WP.store.get('companies', c.companyId) : null }); O.body = m.body; O.subject = m.subject; O.key = key; }
      const t = E.OUTREACH_TYPES.find((x) => x.id === O.type) || {};
      WP.add(root, S.pageHead({ eyebrow: 'Phase 4 - Network', title: 'Outreach', desc: 'Personalized messages for every situation - connection notes, referral asks, recruiter notes, follow-ups and thank-yous. You send them; Waypoint keeps score.' }));
      const rr = E.responseRate(st);
      const byType = {}; st.outreach.forEach((o) => { if (o.status === 'draft') return; const k = o.type || 'other'; byType[k] = byType[k] || { sent: 0, replied: 0 }; byType[k].sent++; if (o.status === 'replied') byType[k].replied++; });
      WP.add(root, h('div', { class: 'grid g4 mb' }, kpi('Messages sent', rr.sent, 'send'), kpi('Replies', rr.replied, 'chat'), kpi('Reply rate', rr.outRate + '%', 'trending'), kpi('Drafts', st.outreach.filter((o) => o.status === 'draft').length, 'edit')));
      if (!c) { WP.add(root, h('div', { class: 'card' }, ui.empty('users', 'Add a contact first', 'Outreach is always addressed to a real person in your network.', [h('button', { class: 'btn primary', onclick: () => S.contactForm(null) }, 'Add person'), h('button', { class: 'btn', onclick: () => S.go('network?tab=find') }, 'Find people')]))); }
      else {
        const assist = S.assist('outreach', () => ({ contact: c, job }), { ccArg: '"' + c.name + '"' });
        if (assist) WP.add(root, h('div', { class: 'mb' }, assist));
        const ta = h('textarea', { rows: 11 }); ta.value = O.body;
        const cnt = h('span', { class: 'char-count' });
        const upd = () => { const n = ta.value.length; cnt.textContent = n + ' characters' + (t.limit ? ' / ' + t.limit + ' max (200 on free LinkedIn)' : ''); cnt.classList.toggle('over', !!t.limit && n > t.limit); };
        ta.addEventListener('input', () => { O.body = ta.value; upd(); }); upd();
        const hookIn = h('input', { type: 'text', value: O.hook, placeholder: 'e.g. "Loved your post on dbt testing" or "We both worked at Crestline"' });
        hookIn.addEventListener('change', () => { O.hook = hookIn.value; WP.app.refresh(); });
        const subjIn = h('input', { type: 'text', value: O.subject }); subjIn.addEventListener('input', () => { O.subject = subjIn.value; });
        WP.add(root, h('div', { class: 'split-12' },
          h('div', { class: 'stack-lg' },
            h('div', { class: 'card' }, h('h3', null, icon('user', 16), 'To'),
              h('div', { class: 'stack mt-sm' }, ui.select(O.contact, st.contacts.map((x) => ({ value: x.id, label: x.name + ' - ' + (x.company || x.relationship) })), (v) => { O.contact = v; O.type = ''; O.job = ''; O.key = ''; WP.app.refresh(); }),
                h('div', { class: 'row small' }, ui.avatar(c.name), h('div', null, h('b', null, c.title || ''), h('div', { class: 'muted' }, (S.RELATIONSHIPS.find((r) => r.id === c.relationship) || {}).label + ' | warmth ' + (c.warmth || 1) + '/5 | ' + ((S.CONTACT_STATUSES.find((s) => s.id === c.status) || {}).label || ''))))),
              h('div', { class: 'field mt' }, h('label', null, 'About a job (optional)'), S.jobPicker(O.job, (v) => { O.job = v; WP.app.refresh(); }))),
            h('div', { class: 'card' }, h('h3', null, icon('layers', 16), 'Message type'), h('div', { class: 'stack mt-sm', style: { gap: '6px' } }, E.OUTREACH_TYPES.map((x) => h('label', { class: 'check small', style: { padding: '4px 0' } }, h('input', { type: 'radio', name: 'otype', checked: O.type === x.id, onchange: () => { O.type = x.id; WP.app.refresh(); } }), x.label, x.limit ? h('span', { class: 'muted' }, ' (' + x.limit + ' chars)') : null)))),
            h('div', { class: 'card' }, h('h3', null, icon('star', 16), 'Personal touch'), h('p', { class: 'small text-2' }, 'One specific detail doubles reply rates. Add it and the message regenerates.'), hookIn)),
          h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('chat', 16), t.label || 'Message'), cnt),
            O.subject ? ui.field('Subject', subjIn) : null, h('div', { class: 'mt-sm' }, ta),
            h('div', { class: 'row mt' },
              h('button', { class: 'btn primary', onclick: () => { const a = { id: WP.uid('act'), type: 'send-outreach', title: 'Message ' + c.name, detail: '', ref: { contactId: c.id, jobId: O.job, companyId: c.companyId || '' }, payload: { type: O.type, channel: t.channel, subject: O.subject, body: ta.value }, impact: 2, effort: 1, source: 'user', status: 'approved', createdAt: d.now(), updatedAt: d.now(), decidedAt: d.now() }; st.actions.unshift(a); WP.store.save(); S.sendFlow(a); } }, icon('send', 14), 'Send now (guided)'),
              h('button', { class: 'btn', onclick: () => { S.queue({ type: 'send-outreach', title: 'Message ' + c.name + ' (' + (t.label || O.type) + ')', detail: 'Drafted in Outreach.', ref: { contactId: c.id, jobId: O.job, companyId: c.companyId || '' }, payload: { type: O.type, channel: t.channel, subject: O.subject, body: ta.value }, impact: 2, effort: 1, source: 'user' }); ui.toast('Added to Approval Queue'); } }, icon('inbox', 14), 'Queue for later'),
              h('button', { class: 'btn', onclick: () => { WP.store.add('outreach', { contactId: c.id, jobId: O.job, type: O.type, channel: t.channel, subject: O.subject, body: ta.value, status: 'draft' }); ui.toast('Draft saved'); WP.app.refresh(); } }, 'Save draft'),
              ui.copyBtn(() => (O.subject ? 'Subject: ' + O.subject + '\n\n' : '') + ta.value, 'Message', '')),
            h('div', { class: 'callout mt' }, icon('info', 16), h('div', { class: 'small' }, h('b', null, 'Etiquette: '), 'keep first messages short, make one clear ask, never attach a resume unprompted, and follow up once after 5-7 days. Stop after two follow-ups.')))));
      }
      const log = st.outreach.slice().sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
      WP.add(root, h('div', { class: 'split-21 mt' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('list', 16), 'Outreach log'), h('span', { class: 'sub' }, 'Mark replies to keep your reply rate accurate')),
          log.length ? h('div', { class: 'table-wrap' }, h('table', { class: 'table' }, h('thead', null, h('tr', null, ['To', 'Type', 'Status', 'Date', ''].map((x) => h('th', null, x)))),
            h('tbody', null, log.slice(0, 40).map((o) => { const ct = o.contactId ? WP.store.get('contacts', o.contactId) : null; return h('tr', null,
              h('td', null, h('b', null, ct ? ct.name : '(deleted)'), h('div', { class: 'small muted ellipsis', style: { maxWidth: '260px' } }, o.body)),
              h('td', { class: 'small' }, (E.OUTREACH_TYPES.find((x) => x.id === o.type) || { label: o.type }).label),
              h('td', null, ui.select(o.status, ['draft', 'sent', 'replied'], (v) => { const was = o.status; WP.store.update('outreach', o.id, { status: v, sentAt: v !== 'draft' && !o.sentAt ? d.today() : o.sentAt }); if (v === 'replied' && ct && ['to-contact', 'requested', 'connected', 'no-response'].includes(ct.status)) WP.store.update('contacts', ct.id, { status: 'replied' }); if (was === 'draft' && v === 'sent') WP.store.log('outreach', ct ? ct.id : '', ''); WP.app.refresh(); })),
              h('td', { class: 'small muted nowrap' }, o.sentAt ? d.fmt(o.sentAt) : d.rel(o.createdAt)),
              h('td', null, h('button', { class: 'btn ghost icon sm', 'aria-label': 'Copy', onclick: () => ui.copy(o.body, 'Message') }, icon('copy', 14)))); })))) : ui.empty('chat', 'No messages yet', 'Sent and drafted messages appear here.')),
        h('div', { class: 'card' }, h('h3', null, icon('chart', 16), 'What gets replies'), h('p', { class: 'small text-2' }, 'Reply rate by message type (sent messages only).'),
          C.barH(Object.entries(byType).map(([k, v]) => ({ label: (E.OUTREACH_TYPES.find((x) => x.id === k) || { label: k }).label, value: Math.round((v.replied / v.sent) * 100), tip: '<b>' + esc(k) + '</b><br>' + v.replied + ' replies / ' + v.sent + ' sent' })), { max: 100, format: (v) => v + '%', labelWidth: 150, empty: 'Send a few messages to see this' }))));
    },
  };
})();
