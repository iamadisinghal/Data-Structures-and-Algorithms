/* Switch Prep planner - rendering, progress, filters, notes, tracker.
   Content comes from data/*.js via PREP.add(); see README.md for the schema. */
(function () {
  'use strict';

  var KEY = 'switchprep-v1';
  var PLATFORMS = {
    LC: 'LeetCode', GFG: 'GeeksforGeeks', CN: 'Code360', IB: 'InterviewBit', HR: 'HackerRank',
    CSES: 'CSES', CF: 'Codeforces', AC: 'AtCoder', DL: 'DataLemur', SS: 'StrataScratch',
    KG: 'Kaggle', DML: 'Deep-ML', SQLZ: 'SQLZoo', BOOK: 'Book', DOC: 'Docs', BUILD: 'Build',
    YT: 'YouTube', BLOG: 'Blog', PAPER: 'Paper', RG: 'Refactoring Guru', GH: 'GitHub',
    TASK: 'Task', MOCK: 'Mock', SELF: 'Solo timed', HELLO: 'Hello Interview', BYTEBYTEGO: 'ByteByteGo'
  };
  var STAGES = ['Wishlist', 'Applied', 'Referred', 'OA / assignment', 'Phone screen', 'Onsite / loop', 'Offer', 'Rejected', 'Withdrawn'];
  var SOURCES = ['Referral', 'LinkedIn', 'Naukri', 'Instahyre', 'Cutshort', 'Wellfound', 'Career page', 'Recruiter', 'Other'];

  /* ---------- state ---------- */
  var S = load();
  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { s = {}; }
    s.done = s.done || {}; s.star = s.star || {}; s.notes = s.notes || {};
    s.apps = s.apps || []; s.open = s.open || {};
    return s;
  }
  var saveT;
  function save(now) {
    clearTimeout(saveT);
    var w = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
    if (now) w(); else saveT = setTimeout(w, 250);
  }

  /* ---------- helpers ---------- */
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  function strip(h) { return String(h || '').replace(/<[^>]*>/g, ''); }
  var decoder = document.createElement('textarea');
  function plain(h) { decoder.innerHTML = strip(h); return decoder.value; }
  function pct(d, t) { return t ? Math.round(100 * d / t) : 0; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function arr(x) { return Array.isArray(x) ? x : (x ? [x] : []); }

  /* ---------- merge tab definitions ---------- */
  var tabs = [], byId = {}, index = {};
  (window.PREP && window.PREP._t || []).forEach(function (t) {
    if (!t || !t.id) return;
    var e = byId[t.id];
    if (!e) { e = byId[t.id] = { id: t.id, levels: [], resources: [], intro: [], widgets: [], refMap: {} }; tabs.push(e); }
    ['order', 'group', 'title', 'short', 'blurb'].forEach(function (k) { if (t[k] != null && e[k] == null) e[k] = t[k]; });
    e.intro = e.intro.concat(arr(t.intro));
    e.resources = e.resources.concat(arr(t.resources));
    e.widgets = e.widgets.concat(arr(t.widgets));
    // refs: { topicId: [ {n, u, k, d} ] } - lets reading lists live in their own files
    if (t.refs) Object.keys(t.refs).forEach(function (id) { e.refMap[id] = (e.refMap[id] || []).concat(arr(t.refs[id])); });
    arr(t.levels).forEach(function (l) {
      var el = null;
      for (var i = 0; i < e.levels.length; i++) if (e.levels[i].name === l.name) el = e.levels[i];
      if (!el) { el = { name: l.name, desc: l.desc, topics: [] }; e.levels.push(el); }
      if (!el.desc && l.desc) el.desc = l.desc;
      el.topics = el.topics.concat(arr(l.topics));
    });
  });
  // groups are ordered by their earliest tab, tabs by their own order inside a group
  var grank = {};
  tabs.forEach(function (t) { var g = t.group || ''; grank[g] = Math.min(grank[g] == null ? 1e9 : grank[g], t.order || 999); });
  tabs.sort(function (a, b) { return (grank[a.group || ''] - grank[b.group || '']) || ((a.order || 999) - (b.order || 999)); });

  // stable keys for every checkable item
  tabs.forEach(function (tab) {
    tab.levels.forEach(function (lv) {
      lv.topics.forEach(function (tp, ti) {
        tp.id = tp.id || ('t' + ti + '-' + hash(tp.title || ''));
        var base = tab.id + '/' + tp.id;
        tp._k = base;
        tp._items = [];
        tp._refs = arr(tp.refs).concat(tab.refMap[tp.id] || []);
        arr(tp.learn).forEach(function (x) { add(tab, tp, 'l', x, strip(x)); });
        arr(tp.practice).forEach(function (x) { add(tab, tp, 'p', x, x.t + '|' + (x.p || '')); });
        arr(tp.qa).forEach(function (x) { add(tab, tp, 'q', x, strip(x.q)); });
      });
    });
  });
  function add(tab, tp, kind, item, text) {
    var k = tp._k + '/' + kind + '/' + hash(text);
    while (index[k]) k += '_';
    item = typeof item === 'object' ? item : { html: item };
    var rec = { k: k, kind: kind, item: item, tab: tab, topic: tp };
    index[k] = rec; tp._items.push(rec);
  }

  /* ---------- counts ---------- */
  function countTopic(tp) {
    var c = { d: 0, t: 0, l: [0, 0], p: [0, 0], q: [0, 0] };
    tp._items.forEach(function (r) { var b = S.done[r.k] ? 1 : 0; c.t++; c.d += b; c[r.kind][1]++; c[r.kind][0] += b; });
    return c;
  }
  function sum(list) {
    var c = { d: 0, t: 0, l: [0, 0], p: [0, 0], q: [0, 0] };
    list.forEach(function (x) { c.d += x.d; c.t += x.t; ['l', 'p', 'q'].forEach(function (k) { c[k][0] += x[k][0]; c[k][1] += x[k][1]; }); });
    return c;
  }
  function countLevel(lv) { return sum(lv.topics.map(countTopic)); }
  function countTab(tab) { return sum(tab.levels.map(countLevel)); }

  /* ---------- nav ---------- */
  var nav = $('#tabs');
  function renderNav() {
    var html = '', g = null;
    tabs.forEach(function (tab) {
      if (tab.group !== g) { g = tab.group; if (g) html += '<div class="grp">' + esc(g) + '</div>'; }
      html += '<a href="#' + esc(tab.id) + '" data-nav="' + esc(tab.id) + '"><span class="row"><span>' + esc(tab.short || tab.title) +
        '</span><span class="pct"></span></span><span class="bar"><i></i></span></a>';
    });
    nav.innerHTML = html;
    refreshNav();
  }
  function refreshNav() {
    var all = { d: 0, t: 0 };
    tabs.forEach(function (tab) {
      var c = countTab(tab), a = $('[data-nav="' + tab.id + '"]', nav);
      all.d += c.d; all.t += c.t;
      if (!a) return;
      $('.pct', a).textContent = c.t ? pct(c.d, c.t) + '%' : '';
      $('.bar i', a).style.width = pct(c.d, c.t) + '%';
      a.classList.toggle('active', tab === current);
    });
    $('#overallBar').style.width = pct(all.d, all.t) + '%';
    $('#overallTxt').textContent = 'Overall: ' + all.d + ' of ' + all.t + ' items (' + pct(all.d, all.t) + '%)';
  }

  /* ---------- tab view ---------- */
  var view = $('#view'), current = null, uid = 0, filtering = false;

  function practiceHTML(r) {
    var x = r.item, plat = PLATFORMS[x.p] || x.p || '';
    var url = x.u || ('https://www.google.com/search?q=' + encodeURIComponent(plain(x.t) + ' ' + plat));
    var id = 'c' + (++uid);
    // titles may carry inline <code> / entities, so they are rendered as HTML like the other content fields
    return '<li data-key="' + r.k + '"><input type="checkbox" id="' + id + '" data-k="' + r.k + '"' + (S.done[r.k] ? ' checked' : '') + '>' +
      '<label for="' + id + '"><a class="pt" href="' + esc(url) + '" target="_blank" rel="noopener"' + (x.u ? '' : ' title="Opens a web search"') + '>' + x.t + '</a>' +
      (plat ? '<span class="tag">' + esc(plat) + '</span>' : '') +
      (x.d ? '<span class="dif ' + esc(x.d) + '">' + esc({ E: 'Easy', M: 'Medium', H: 'Hard' }[x.d] || x.d) + '</span>' : '') +
      '</label>' + starHTML(r.k) + '</li>';
  }
  function learnHTML(r) {
    var id = 'c' + (++uid);
    return '<li data-key="' + r.k + '"><input type="checkbox" id="' + id + '" data-k="' + r.k + '"' + (S.done[r.k] ? ' checked' : '') + '>' +
      '<label for="' + id + '"><span class="pt">' + r.item.html + '</span></label>' + starHTML(r.k) + '</li>';
  }
  function qaHTML(r) {
    return '<li data-key="' + r.k + '"><input type="checkbox" aria-label="I can answer this" title="Tick when you can answer this confidently" data-k="' + r.k + '"' + (S.done[r.k] ? ' checked' : '') + '>' +
      '<details><summary>' + r.item.q + '</summary><div class="ans">' + (r.item.a || '') + '</div></details></li>';
  }
  var KINDS = { video: 'Video', playlist: 'Playlist', article: 'Article', book: 'Book', course: 'Course', docs: 'Docs', paper: 'Paper', notes: 'Notes', visual: 'Visualiser', blog: 'Blog' };
  function refHTML(r) {
    var k = (r.k || '').toLowerCase(), q = plain(r.n);
    var url = r.u || ((k === 'video' || k === 'playlist') ? 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q)
      : 'https://www.google.com/search?q=' + encodeURIComponent(q));
    return '<li><span class="kind k-' + esc(k || 'other') + '">' + esc(KINDS[k] || r.k || 'Link') + '</span>' +
      '<a href="' + esc(url) + '" target="_blank" rel="noopener"' + (r.u ? '' : ' title="Opens a search"') + '>' + r.n + '</a>' +
      (r.d ? ' <span class="rd">— ' + r.d + '</span>' : '') + '</li>';
  }
  function starHTML(k) {
    return '<button class="star' + (S.star[k] ? ' on' : '') + '" data-star="' + k + '" title="Mark to revisit" aria-label="Mark to revisit" aria-pressed="' + (S.star[k] ? 'true' : 'false') + '">★</button>';
  }

  function topicHTML(tab, tp) {
    var c = countTopic(tp), items = { l: [], p: [], q: [] };
    tp._items.forEach(function (r) { items[r.kind].push(r); });
    var open = !!S.open[tp._k];
    var h = '<details class="topic" id="topic-' + esc(tp.id) + '" data-tp="' + tp._k + '"' + (open ? ' open' : '') + '>' +
      '<summary><span class="t-title">' + esc(tp.title) + (tp.est ? '<span class="est">' + esc(tp.est) + '</span>' : '') +
      '<span class="done-chip"' + (c.t && c.d === c.t ? '' : ' hidden') + '>done</span></span>' +
      '<span class="t-meta"><span class="cnt">' + c.d + '/' + c.t + '</span><span class="bar"><i style="width:' + pct(c.d, c.t) + '%"></i></span></span>' +
      (tp.why ? '<span class="t-why">' + tp.why + '</span>' : '') + '</summary><div class="t-body">';
    if (open) h += topicBody(tp, items);
    return h + '</div></details>';
  }
  // body is rendered lazily on first open to keep large tabs fast
  function topicBody(tp, items) {
    if (!items) { items = { l: [], p: [], q: [] }; tp._items.forEach(function (r) { items[r.kind].push(r); }); }
    var h = '<div class="cols">';
    if (tp._refs.length) h += '<div class="sec wide refs"><h4>Read &amp; watch (free)</h4><ul class="reflist">' + tp._refs.map(refHTML).join('') + '</ul></div>';
    if (items.l.length) h += '<div class="sec"><h4>Learn <span data-sc="l"></span></h4><ul class="check">' + items.l.map(learnHTML).join('') + '</ul></div>';
    if (items.p.length) h += '<div class="sec"><h4>Practice <span data-sc="p"></span></h4><ul class="check">' + items.p.map(practiceHTML).join('') + '</ul></div>';
    if (arr(tp.notes).length) h += '<div class="sec notes"><h4>Notes · how to spot &amp; solve</h4><ul class="plain">' + arr(tp.notes).map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul></div>';
    if (arr(tp.cases).length) h += '<div class="sec cases"><h4>Cases to remember</h4><ul class="plain">' + arr(tp.cases).map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul></div>';
    if (items.q.length) h += '<div class="sec wide"><h4>Interview questions <span data-sc="q"></span></h4><ul class="check qa">' + items.q.map(qaHTML).join('') + '</ul></div>';
    if (tp.code) h += '<div class="sec wide"><h4>Template</h4><pre class="code">' + esc(tp.code) + '</pre></div>';
    h += '<div class="sec wide mynotes"><h4>My notes <span class="saved" hidden>saved</span></h4><textarea data-notes="' + tp._k + '" placeholder="Your own notes, mistakes, links…">' + esc(S.notes[tp._k] || '') + '</textarea></div>';
    return h + '</div>';
  }
  function ensureBody(det) {
    var body = $('.t-body', det);
    if (body.childElementCount) return;
    var rec = topicByKey(det.getAttribute('data-tp'));
    if (rec) { body.innerHTML = topicBody(rec); refreshTopic(rec); }
  }
  function topicByKey(k) {
    var found = null;
    tabs.forEach(function (t) { t.levels.forEach(function (l) { l.topics.forEach(function (tp) { if (tp._k === k) found = tp; }); }); });
    return found;
  }

  function renderTab(tab, focusTopic) {
    current = tab; uid = 0;
    var c = countTab(tab);
    var h = '<div class="tab-head"><h2>' + esc(tab.title) + '</h2>' + (tab.blurb ? '<p class="blurb">' + esc(tab.blurb) + '</p>' : '') +
      '<div class="tab-prog"><span class="bar big"><i id="tabBar"></i></span><span class="num" id="tabNum"></span></div>' +
      '<div class="split" id="tabSplit"></div></div>';

    if (tab.levels.length) {
      h += '<div class="controls"><input type="search" id="q" placeholder="Filter topics, problems, notes…" aria-label="Filter">' +
        '<select id="st" aria-label="Show"><option value="all">Show all</option><option value="todo">Not done</option><option value="done">Done</option><option value="star">★ Revisit</option></select>' +
        '<button class="btn sm" id="expand">Expand all</button><button class="btn sm" id="collapse">Collapse all</button>' +
        '<button class="btn sm danger" id="resetTab">Clear this tab</button></div>';
    }
    if (tab.intro.length) h += '<div class="intro">' + tab.intro.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>';
    tab.widgets.forEach(function (w) { h += '<div data-widget="' + esc(w) + '"></div>'; });
    if (tab.resources.length) {
      h += '<details class="res"><summary>Resources (' + tab.resources.length + ')</summary><ul>' + tab.resources.map(function (r) {
        return '<li>' + (r.u ? '<a href="' + esc(r.u) + '" target="_blank" rel="noopener">' + esc(r.n) + '</a>' : esc(r.n)) + (r.d ? ' <span>— ' + esc(r.d) + '</span>' : '') + '</li>';
      }).join('') + '</ul></details>';
    }
    tab.levels.forEach(function (lv, li) {
      h += '<section class="level" data-lv="' + li + '"><div class="level-head"><h3>' + esc(lv.name) + '</h3><span class="pct"></span></div>' +
        (lv.desc ? '<p class="desc">' + lv.desc + '</p>' : '') + '<div class="bar"><i></i></div>' +
        lv.topics.map(function (tp) { return topicHTML(tab, tp); }).join('') + '</section>';
    });
    if (!tab.levels.length && !tab.widgets.length) h += '<p class="empty">No content loaded for this tab — check that its data file exists.</p>';
    view.innerHTML = h;
    renderWidgets();
    refreshTab();
    refreshNav();
    document.title = (tab.short || tab.title) + ' · Switch Prep';
    if (focusTopic) {
      var det = document.getElementById('topic-' + focusTopic);
      if (det) { det.open = true; ensureBody(det); det.scrollIntoView({ block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }

  function refreshTopic(tp) {
    var det = view.querySelector('[data-tp="' + tp._k + '"]');
    if (!det) return;
    var c = countTopic(tp);
    $('.cnt', det).textContent = c.d + '/' + c.t;
    $('.t-meta .bar i', det).style.width = pct(c.d, c.t) + '%';
    $('.done-chip', det).hidden = !(c.t && c.d === c.t);
    $$('[data-sc]', det).forEach(function (s) { var k = s.getAttribute('data-sc'); s.textContent = c[k][0] + ' / ' + c[k][1]; });
  }
  function refreshTab() {
    var tab = current; if (!tab) return;
    var c = countTab(tab);
    var bar = $('#tabBar'); if (bar) bar.style.width = pct(c.d, c.t) + '%';
    var num = $('#tabNum'); if (num) num.textContent = c.t ? pct(c.d, c.t) + '% · ' + c.d + ' / ' + c.t : '';
    var sp = $('#tabSplit');
    if (sp) sp.innerHTML = c.t ? ('<span>Concepts ' + c.l[0] + ' / ' + c.l[1] + '</span><span>Practice ' + c.p[0] + ' / ' + c.p[1] + '</span><span>Questions ' + c.q[0] + ' / ' + c.q[1] + '</span>') : '';
    tab.levels.forEach(function (lv, li) {
      var sec = view.querySelector('[data-lv="' + li + '"]'); if (!sec) return;
      var lc = countLevel(lv);
      $('.level-head .pct', sec).textContent = lc.d + ' / ' + lc.t + ' · ' + pct(lc.d, lc.t) + '%';
      $(':scope > .bar i', sec).style.width = pct(lc.d, lc.t) + '%';
      lv.topics.forEach(refreshTopic);
    });
  }

  /* ---------- filtering ---------- */
  function applyFilter() {
    var qEl = $('#q'), stEl = $('#st'); if (!qEl) return;
    var q = qEl.value.trim().toLowerCase(), st = stEl.value;
    filtering = !!q || st !== 'all';
    $$('details.topic', view).forEach(function (det) {
      var tp = topicByKey(det.getAttribute('data-tp'));
      if (filtering) ensureBody(det);
      var topicText = (tp.title + ' ' + strip(tp.why) + ' ' + arr(tp.notes).map(strip).join(' ') + ' ' + arr(tp.cases).map(strip).join(' ')).toLowerCase();
      var topicHit = !q || topicText.indexOf(q) >= 0;
      var any = false;
      $$('li[data-key]', det).forEach(function (li) {
        var k = li.getAttribute('data-key');
        var okSt = st === 'all' || (st === 'done' && S.done[k]) || (st === 'todo' && !S.done[k]) || (st === 'star' && S.star[k]);
        var okQ = !q || topicHit || li.textContent.toLowerCase().indexOf(q) >= 0;
        li.hidden = !(okSt && okQ);
        if (!li.hidden) any = true;
      });
      var show = filtering ? (any || (q && topicHit && st === 'all')) : true;
      det.hidden = !show;
      if (filtering && show) det.open = true;
      else if (!filtering) det.open = !!S.open[tp._k];
    });
    $$('section.level', view).forEach(function (sec) { sec.hidden = !$$('details.topic', sec).some(function (d) { return !d.hidden; }); });
  }

  /* ---------- widgets ---------- */
  function renderWidgets() {
    $$('[data-widget]', view).forEach(function (el) {
      var w = el.getAttribute('data-widget');
      if (w === 'dashboard') el.innerHTML = dashboardHTML();
      else if (w === 'revisit') el.innerHTML = revisitHTML();
      else if (w === 'applications') renderApps(el);
    });
  }
  function dashboardHTML() {
    return '<div class="dash">' + tabs.filter(function (t) { return t !== current && t.levels.length; }).map(function (t) {
      var c = countTab(t);
      return '<a href="#' + esc(t.id) + '"><span class="g">' + esc(t.group || '') + '</span><b>' + esc(t.short || t.title) + '</b>' +
        '<span class="bar"><i style="width:' + pct(c.d, c.t) + '%"></i></span><span class="row"><span>' + c.d + ' / ' + c.t + '</span><span>' + pct(c.d, c.t) + '%</span></span></a>';
    }).join('') + '</div>';
  }
  function revisitHTML() {
    var keys = Object.keys(S.star).filter(function (k) { return index[k]; }).sort(function (a, b) { return (S.star[b] || 0) - (S.star[a] || 0); });
    var h = '<div class="panel"><h3>★ Revisit list (' + keys.length + ')</h3>';
    if (!keys.length) return h + '<p class="hint">Click the ★ next to any concept or problem to collect it here — use it for problems you solved with hints and want to redo in a week.</p></div>';
    h += '<p class="hint">Newest first. Re-solve without looking, then un-star.</p><ul class="check rv">';
    keys.forEach(function (k) {
      var r = index[k], label = r.kind === 'p' ? r.item.t : r.kind === 'q' ? strip(r.item.q) : r.item.html;
      var id = 'rv' + (++uid);
      h += '<li data-key="' + k + '"><input type="checkbox" id="' + id + '" data-k="' + k + '"' + (S.done[k] ? ' checked' : '') + '><label for="' + id + '"><span class="pt">' + label + '</span>' +
        '<a class="from" href="#' + esc(r.tab.id) + '/' + esc(r.topic.id) + '">' + esc(r.tab.short || r.tab.title) + ' › ' + esc(r.topic.title) + '</a></label>' + starHTML(k) + '</li>';
    });
    return h + '</ul></div>';
  }

  function renderApps(el) {
    var counts = {}; STAGES.forEach(function (s) { counts[s] = 0; });
    S.apps.forEach(function (a) { counts[a.stage] = (counts[a.stage] || 0) + 1; });
    var opt = function (list, v) { return list.map(function (s) { return '<option' + (s === v ? ' selected' : '') + '>' + esc(s) + '</option>'; }).join(''); };
    var h = '<div class="panel"><h3>Application tracker (' + S.apps.length + ')</h3>' +
      '<p class="hint">One row per application. Aim for a steady pipeline: ~5–10 new applications a week, referrals first.</p>' +
      '<div class="funnel">' + STAGES.map(function (s) { return '<span>' + esc(s) + ' <b>' + counts[s] + '</b></span>'; }).join('') + '</div>' +
      '<button class="btn sm" data-app-add>+ Add application</button>';
    if (S.apps.length) {
      h += '<div class="tw"><table><thead><tr><th>Company</th><th>Role</th><th>Source</th><th>Stage</th><th>Applied</th><th>Next step</th><th>Notes</th><th></th></tr></thead><tbody>' +
        S.apps.map(function (a, i) {
          return '<tr data-i="' + i + '"><td><input data-f="company" value="' + esc(a.company) + '" aria-label="Company"></td>' +
            '<td><input data-f="role" value="' + esc(a.role) + '" aria-label="Role"></td>' +
            '<td><select data-f="source" aria-label="Source">' + opt(SOURCES, a.source) + '</select></td>' +
            '<td><select data-f="stage" aria-label="Stage">' + opt(STAGES, a.stage) + '</select></td>' +
            '<td><input type="date" data-f="date" value="' + esc(a.date) + '" aria-label="Applied on"></td>' +
            '<td><input class="w" data-f="next" value="' + esc(a.next) + '" aria-label="Next step"></td>' +
            '<td><input class="w" data-f="notes" value="' + esc(a.notes) + '" aria-label="Notes"></td>' +
            '<td><button class="x" data-app-del="' + i + '" title="Remove" aria-label="Remove application">×</button></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    el.innerHTML = h + '</div>';
  }
  function todayISO() { var t = new Date(); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2); }

  /* ---------- events ---------- */
  view.addEventListener('change', function (e) {
    var el = e.target, k = el.getAttribute('data-k');
    if (k) {
      if (el.checked) S.done[k] = 1; else delete S.done[k];
      save();
      $$('input[data-k="' + k + '"]', view).forEach(function (o) { o.checked = el.checked; });
      var r = index[k];
      if (r && r.tab === current) refreshTab();
      $$('[data-widget="dashboard"]', view).forEach(function (w) { w.innerHTML = dashboardHTML(); });
      refreshNav();
      return;
    }
    if (el.id === 'st') { applyFilter(); return; }
    var tr = el.closest('tr[data-i]');
    if (tr && el.getAttribute('data-f')) {
      S.apps[+tr.getAttribute('data-i')][el.getAttribute('data-f')] = el.value; save(true);
      if (el.getAttribute('data-f') === 'stage') renderApps(el.closest('[data-widget]'));
    }
  });
  view.addEventListener('input', function (e) {
    var el = e.target;
    if (el.id === 'q') { applyFilter(); return; }
    var nk = el.getAttribute('data-notes');
    if (nk) {
      if (el.value) S.notes[nk] = el.value; else delete S.notes[nk];
      save();
      var s = el.parentNode.querySelector('.saved'); if (s) { s.hidden = false; clearTimeout(s._t); s._t = setTimeout(function () { s.hidden = true; }, 1200); }
      return;
    }
    var tr = el.closest('tr[data-i]');
    if (tr && el.tagName === 'INPUT') { S.apps[+tr.getAttribute('data-i')][el.getAttribute('data-f')] = el.value; save(); }
  });
  view.addEventListener('click', function (e) {
    var el = e.target.closest('button'); if (!el) return;
    var sk = el.getAttribute('data-star');
    if (sk) {
      e.preventDefault();
      if (S.star[sk]) delete S.star[sk]; else S.star[sk] = Date.now();
      save();
      $$('[data-star="' + sk + '"]', view).forEach(function (b) { b.classList.toggle('on', !!S.star[sk]); b.setAttribute('aria-pressed', S.star[sk] ? 'true' : 'false'); });
      // un-starring removes the row from the revisit list; new stars show up next time the list renders
      $$('[data-widget="revisit"]', view).forEach(function (w) { if (!S.star[sk]) w.innerHTML = revisitHTML(); });
      return;
    }
    if (el.id === 'expand' || el.id === 'collapse') {
      var open = el.id === 'expand';
      $$('details.topic', view).forEach(function (d) { if (!d.hidden) { d.open = open; if (open) ensureBody(d); } });
      if (!filtering) current.levels.forEach(function (lv) { lv.topics.forEach(function (tp) { if (open) S.open[tp._k] = 1; else delete S.open[tp._k]; }); });
      save();
      return;
    }
    if (el.id === 'resetTab') {
      if (!confirm('Clear all ticks in "' + current.title + '"? Notes and stars are kept.')) return;
      Object.keys(S.done).forEach(function (k) { if (index[k] && index[k].tab === current) delete S.done[k]; });
      save(true); renderTab(current); return;
    }
    if (el.hasAttribute('data-app-add')) {
      S.apps.push({ company: '', role: '', source: 'Referral', stage: 'Wishlist', date: todayISO(), next: '', notes: '' });
      save(true); var w = el.closest('[data-widget]'); renderApps(w);
      var ins = $$('input[data-f="company"]', w); if (ins.length) ins[ins.length - 1].focus();
      return;
    }
    var del = el.getAttribute('data-app-del');
    if (del != null) {
      var a = S.apps[+del];
      if ((a.company || a.role) && !confirm('Remove ' + (a.company || 'this application') + '?')) return;
      S.apps.splice(+del, 1); save(true); renderApps(el.closest('[data-widget]'));
    }
  });
  view.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d.classList || !d.classList.contains('topic')) return;
    if (d.open) ensureBody(d);
    if (filtering) return;
    var k = d.getAttribute('data-tp');
    if (d.open) S.open[k] = 1; else delete S.open[k];
    save();
  }, true);

  /* ---------- routing ---------- */
  function route() {
    var h = decodeURIComponent((location.hash || '').slice(1)).split('/');
    var tab = byId[h[0]] || tabs[0];
    if (!tab) { view.innerHTML = '<p class="empty">No data files loaded.</p>'; return; }
    renderTab(tab, h[1]);
  }
  window.addEventListener('hashchange', route);

  /* ---------- tools ---------- */
  $('#exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'switch-prep-progress-' + todayISO() + '.json';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });
  $('#importFile').addEventListener('change', function (e) {
    var f = e.target.files[0]; if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var d = JSON.parse(rd.result);
        if (!d || typeof d !== 'object' || !d.done) throw new Error('not a progress file');
        if (!confirm('Replace current progress with the imported file?')) return;
        localStorage.setItem(KEY, JSON.stringify(d)); S = load(); renderNav(); route();
      } catch (err) { alert('Could not import: ' + err.message); }
      e.target.value = '';
    };
    rd.readAsText(f);
  });
  $('#resetAll').addEventListener('click', function () {
    if (!confirm('Clear ALL ticks, stars, notes and applications? Export first if unsure.')) return;
    S = { done: {}, star: {}, notes: {}, apps: [], open: {} }; save(true); renderNav(); route();
  });

  renderNav();
  route();
})();
