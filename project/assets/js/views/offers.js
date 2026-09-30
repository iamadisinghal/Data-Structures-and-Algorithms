/* Offers & Negotiation. */
(function () {
  'use strict';
  const WP = window.WP;
  const { h, icon, ui, esc } = WP;
  const S = WP.shared; const C = WP.charts;
  const view = { weights: { money: 50, growth: 30, wlb: 20 }, neg: '', market: '', competing: '' };

  function offerForm(o) {
    const isNew = !o; const x = Object.assign({ company: '', role: '', base: '', bonus: '', equity: '', signing: '', benefits: '', location: '', growth: 3, wlb: 3, deadline: '', notes: '' }, o || {});
    const set = (k) => (v) => { x[k] = v; };
    const num = (label, k, hint) => ui.field(label, ui.input(x[k], (v) => { x[k] = v === '' ? '' : +v; }, { type: 'number', min: 0 }), hint);
    const m = ui.modal({ title: isNew ? 'Add an offer' : 'Edit offer', wide: true, icon: 'dollar',
      body: h('div', { class: 'form-grid' }, h('datalist', { id: 'dl-co3' }, WP.store.state.jobs.map((j) => h('option', { value: j.company }))),
        ui.field('Company *', ui.input(x.company, set('company'), { list: 'dl-co3' })), ui.field('Role', ui.input(x.role, set('role'))),
        num('Base salary (annual)', 'base'), num('Target bonus (annual)', 'bonus'), num('Equity per year', 'equity', 'Total grant ÷ vesting years'), num('Joining / signing bonus', 'signing', 'One-time'), num('Benefits value (annual)', 'benefits', 'Insurance, retirement match, allowances'),
        ui.field('Location / remote', ui.input(x.location, set('location'))), ui.field('Decision deadline', ui.input(x.deadline, set('deadline'), { type: 'date' })),
        ui.field('Growth potential (1-5)', ui.input(x.growth, (v) => { x.growth = +v; }, { type: 'number', min: 1, max: 5 })), ui.field('Work-life balance (1-5)', ui.input(x.wlb, (v) => { x.wlb = +v; }, { type: 'number', min: 1, max: 5 })),
        ui.field('Notes (manager, team, commute, risks...)', ui.textarea(x.notes, set('notes'), { rows: 3 }), null, 'full')),
      footer: [h('button', { class: 'btn ghost', onclick: () => m.close() }, 'Cancel'), h('button', { class: 'btn primary', onclick: () => {
        if (!x.company.trim()) { ui.toast('Company is required', 'bad'); return; }
        ['base', 'bonus', 'equity', 'signing', 'benefits'].forEach((k) => { x[k] = +x[k] || 0; });
        if (isNew) { WP.store.add('offers', x); const j = WP.store.state.jobs.find((jj) => jj.company.toLowerCase() === x.company.toLowerCase() && jj.status !== 'offer'); if (j) S.setJobStatus(j, 'offer', 'Offer received'); WP.store.log('offer', '', x.company); }
        else WP.store.update('offers', o.id, x);
        m.close(); ui.toast('Offer saved'); WP.app.refresh();
      } }, icon('check', 14), 'Save offer')] });
  }

  WP.views.offers = {
    title: 'Offers & Negotiation',
    render(root) {
      const st = WP.store.state; const E = WP.engine; const cur = st.profile.salary.currency || st.settings.currency;
      const fmt = (v) => WP.money(v, cur);
      WP.add(root, S.pageHead({ eyebrow: 'Phase 6 - Win', title: 'Offers & negotiation', desc: 'Compare offers on total compensation and what matters to you - then negotiate with data and a script. Most employers expect a counter; asking politely rarely costs you the offer.',
        actions: [h('button', { class: 'btn primary', onclick: () => offerForm(null) }, icon('plus', 15), 'Add offer')] }));
      const assist = S.assist('negotiate', () => ({}));
      if (assist) WP.add(root, h('div', { class: 'mb' }, assist));
      const offers = st.offers;
      if (!offers.length) {
        WP.add(root, h('div', { class: 'split-21' }, h('div', { class: 'card' }, ui.empty('dollar', 'No offers yet - but prepare now', 'When an offer arrives, add it here to see total compensation, compare side by side and get a negotiation script. Before then, know your numbers:', [h('button', { class: 'btn primary', onclick: () => offerForm(null) }, 'Add an offer')]),
          h('div', { class: 'grid g3 mt' }, [['Current', st.profile.salary.current], ['Target', st.profile.salary.expected], ['Walk-away', st.profile.salary.minimum]].map(([l, v]) => h('div', { class: 'card flat tight kpi center' }, h('div', { class: 'label', style: { justifyContent: 'center' } }, l), h('div', { class: 'value', style: { fontSize: '20px' } }, v ? fmt(v) : '-')))),
          h('p', { class: 'small muted center mt-sm' }, h('a', { href: '#/profile?tab=basics' }, 'Set these in your profile'))),
          tips()));
        return;
      }
      const W = view.weights; const tw = W.money + W.growth + W.wlb || 1;
      const scored = offers.map((o) => ({ o, t: E.offerTotals(o), score: E.offerScore(o, { money: W.money / tw, growth: W.growth / tw, wlb: W.wlb / tw }) })).sort((a, b) => b.score - a.score);
      WP.add(root, h('div', { class: 'grid g-auto' }, scored.map(({ o, t, score }, i) => h('div', { class: 'card' + (i === 0 && offers.length > 1 ? ' accent' : '') },
        h('div', { class: 'row between' }, h('div', null, h('h3', null, o.company), h('div', { class: 'small muted' }, o.role || '')), i === 0 && offers.length > 1 ? h('span', { class: 'chip match' }, icon('star', 11), 'Top pick') : null),
        h('div', { class: 'kpi mt' }, h('div', { class: 'label' }, 'Ongoing annual value'), h('div', { class: 'value' }, fmt(t.ongoing)), h('div', { class: 'delta' }, 'First year ' + fmt(t.firstYear) + (st.profile.salary.current ? ' | ' + (t.base >= st.profile.salary.current ? '+' : '') + Math.round(((t.base - st.profile.salary.current) / st.profile.salary.current) * 100) + '% base vs current' : ''))),
        h('div', { class: 'row mt-sm small' }, 'Score ', h('b', null, score), ' | Growth ', ui.pips(o.growth || 3, 5), ' WLB ', ui.pips(o.wlb || 3, 5)),
        o.deadline ? h('div', { class: 'small mt-sm' }, icon('clock', 12), ' Decide by ' + WP.d.fmtLong(o.deadline) + ' (' + WP.d.rel(o.deadline) + ')') : null,
        h('div', { class: 'row mt' }, h('button', { class: 'btn sm', onclick: () => offerForm(o) }, icon('edit', 13), 'Edit'), h('button', { class: 'btn sm', onclick: () => { view.neg = o.id; WP.app.refresh(); setTimeout(() => { const el = document.getElementById('neg'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); } }, 'Negotiate'),
          h('button', { class: 'btn ghost icon sm', 'aria-label': 'Delete', onclick: async () => { if (await ui.confirm({ title: 'Delete this offer?', okText: 'Delete', danger: true })) { WP.store.remove('offers', o.id); WP.app.refresh(); } } }, icon('trash', 13)))))));
      const comps = [['base', 'Base', 'var(--s1)'], ['bonus', 'Bonus', 'var(--s2)'], ['equity', 'Equity/yr', 'var(--s3)'], ['benefits', 'Benefits', 'var(--s4)'], ['signing', 'Signing (yr 1)', 'var(--s5)']];
      const slider = (k, label) => h('div', { class: 'field' }, h('label', null, label + ': ' + Math.round((W[k] / tw) * 100) + '%'), h('input', { type: 'range', min: 0, max: 100, value: W[k], onchange: (e) => { W[k] = +e.target.value; WP.app.refresh(); } }));
      WP.add(root, h('div', { class: 'split-21 mt' },
        h('div', { class: 'card' }, h('div', { class: 'card-h' }, h('h3', null, icon('chart', 16), 'Total compensation (first year)'), h('span', { class: 'sub' }, 'Hover for the breakdown')),
          C.stackedBars(scored.map((x) => x.o.company), comps.map(([k, l, c]) => ({ key: k, label: l, color: c, values: scored.map((x) => x.t[k]) })), { height: 240, aria: 'Offer compensation breakdown' })),
        h('div', { class: 'card' }, h('h3', null, icon('sliders', 16), 'What matters to you'), h('p', { class: 'small text-2' }, 'Adjust the weights - the score and top pick update.'), slider('money', 'Money'), slider('growth', 'Growth'), slider('wlb', 'Work-life balance'))));
      WP.add(root, h('div', { class: 'table-wrap mt' }, h('table', { class: 'table' }, h('thead', null, h('tr', null, h('th', null, ''), scored.map((x) => h('th', { class: 'num' }, x.o.company)))),
        h('tbody', null, comps.map(([k, l]) => h('tr', null, h('td', null, l), scored.map((x) => h('td', { class: 'num' }, fmt(x.t[k]))))).concat([
          h('tr', null, h('td', null, h('b', null, 'Ongoing / year')), scored.map((x) => h('td', { class: 'num' }, h('b', null, fmt(x.t.ongoing))))),
          h('tr', null, h('td', null, 'Growth / WLB'), scored.map((x) => h('td', { class: 'num' }, (x.o.growth || 3) + ' / ' + (x.o.wlb || 3)))),
          h('tr', null, h('td', null, 'Weighted score'), scored.map((x) => h('td', { class: 'num' }, ui.scoreBadge(x.score))))])))));
      negotiate(root, st, fmt);
    },
  };

  function negotiate(root, st, fmt) {
    const offers = st.offers;
    if (!view.neg || !WP.store.get('offers', view.neg)) view.neg = offers[0].id;
    const o = WP.store.get('offers', view.neg); const p = st.profile;
    const market = +view.market || 0, competing = +view.competing || 0;
    const target = Math.round(Math.max(p.salary.expected || 0, o.base * 1.1, market * 1.05, competing * 1.02) / 1000) * 1000;
    const ask = Math.min(target, Math.round(o.base * 1.25 / 1000) * 1000) || o.base;
    const walk = p.salary.minimum || 0;
    const reasons = [market ? 'market data for this role shows around ' + fmt(market) : null, competing ? 'I have another offer at ' + fmt(competing) : null, 'my experience with ' + (WP.engine.profileSkills(p).listed.size ? Array.from(WP.engine.profileSkills(p).listed).slice(0, 2).join(' and ') : 'the core requirements') + ' means I can contribute quickly'].filter(Boolean);
    const email = 'Hi [Recruiter name],\n\nThank you again for the offer for the ' + (o.role || 'role') + ' position - I am genuinely excited about joining ' + o.company + '.\n\nBefore I accept, I would like to discuss the base salary. Based on ' + reasons.join(', and ') + ', I was hoping for a base of ' + fmt(ask) + '.\n\nIf we can get there, I am ready to sign. I am also open to discussing a joining bonus or other parts of the package if base is constrained.\n\nThank you for considering this - I look forward to hearing from you.\n\nBest regards,\n' + (p.name || '[Your name]');
    const call = '1. Open warmly: "Thank you - I\'m really excited about this role and the team."\n2. Anchor: "Based on ' + reasons[0] + ', I was hoping for a base closer to ' + fmt(ask) + '."\n3. Pause. Let them respond - silence is fine.\n4. If they say no: "I understand. Is there flexibility on a joining bonus, bonus target, equity, or an earlier salary review at 6 months?"\n5. Close: "If we can reach [number/package], I\'m ready to accept today."\n\nNever: invent competing offers, give an ultimatum you won\'t keep, or accept on the spot - ask for 24-48 hours in writing.';
    const mIn = h('input', { type: 'number', value: view.market, placeholder: 'e.g. from Glassdoor/Levels' }); mIn.addEventListener('change', () => { view.market = mIn.value; WP.app.refresh(); });
    const cIn = h('input', { type: 'number', value: view.competing, placeholder: 'only if real' }); cIn.addEventListener('change', () => { view.competing = cIn.value; WP.app.refresh(); });
    WP.add(root, h('div', { class: 'card mt', id: 'neg' }, h('div', { class: 'card-h' }, h('h3', null, icon('handshake', 16), 'Negotiation helper'), ui.select(view.neg, offers.map((x) => ({ value: x.id, label: x.company })), (v) => { view.neg = v; WP.app.refresh(); })),
      h('div', { class: 'split-12' },
        h('div', { class: 'stack' },
          h('div', { class: 'form-grid' }, ui.field('Market rate for the role', mIn), ui.field('Competing offer (base)', cIn)),
          h('div', { class: 'grid g2' }, [['Their offer', fmt(o.base)], ['Your ask', fmt(ask)], ['Your target', fmt(target)], ['Walk-away', walk ? fmt(walk) : 'set in profile']].map(([l, v]) => h('div', { class: 'card flat tight kpi' }, h('div', { class: 'label' }, l), h('div', { class: 'value', style: { fontSize: '19px' } }, v)))),
          walk && o.base < walk ? ui.callout('critical', 'alert', 'This offer is below your walk-away number. Negotiate firmly or be ready to decline politely.') : null,
          h('p', { class: 'small muted' }, 'Ask = the higher of your target, +10% on their offer, or +5% over market - capped at +25% to stay credible.'),
          h('div', { class: 'card flat tight' }, h('h4', null, 'Also negotiable'), h('div', { class: 'chips mt-sm' }, ['Joining bonus', 'Bonus target', 'Equity / RSUs', 'Title / level', 'Start date', 'Remote days', 'Learning budget', 'Relocation', 'Early salary review', 'Extra leave'].map((x) => h('span', { class: 'chip' }, x))))),
        h('div', { class: 'stack' }, h('h4', null, 'Email script'), ui.codeblock(email, 'Email'), h('h4', { class: 'mt-sm' }, 'Phone script'), ui.codeblock(call, 'Script')))));
  }
  function tips() {
    return h('div', { class: 'card' }, h('h3', null, icon('bulb', 16), 'Negotiation basics'), h('ul', { class: 'small text-2', style: { paddingLeft: '18px', marginBottom: 0 } },
      h('li', null, 'Research ranges before the first recruiter call (Levels.fyi, Glassdoor, AmbitionBox, recruiter conversations).'), h('li', null, 'Delay giving a number early: "I\'d like to learn more about the role first - what range is budgeted?"'),
      h('li', null, 'Always negotiate in writing or on a call you follow up in writing.'), h('li', null, 'Negotiate the whole package, not just base.'), h('li', null, 'Be warm, specific and ready to say yes if they meet you.')));
  }
})();
