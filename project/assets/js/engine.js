/* Waypoint engine: the offline "brain" - parsing, matching, tailoring, writing, planning.
   Everything here is deterministic and runs in the browser; no data leaves the machine. */
(function () {
  'use strict';
  const WP = window.WP;
  const E = {};
  const K = () => WP.K || { skills: [], roleFamilies: [], actionVerbs: {}, weakPhrases: [], stopwords: [], sectionHeadings: {}, seniority: [], interview: { competencies: [], behavioral: [], byFamily: {}, closers: [] }, appQuestions: [], learningSites: [] };
  const lc = (s) => String(s || '').toLowerCase();
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sentenceCase = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const lowerFirst = (s) => (s && !/^[A-Z]{2}/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  const stripDot = (s) => String(s || '').trim().replace(/[.;]+$/, '');
  const LOW_WEIGHT_CATS = /soft skill|language/i;

  /* =================================================== skill index / match */
  let IDX = null;
  function index() {
    if (IDX) return IDX;
    const byLower = new Map();
    const ci = [], cs = [];
    (K().skills || []).forEach((sk) => {
      if (!sk || !sk.n) return;
      if (!sk.cs) { byLower.set(lc(sk.n), sk); ci.push(lc(sk.n)); }
      else { cs.push(sk.n); byLower.set('\u0000' + sk.n, sk); }
      (sk.a || []).forEach((a) => { const al = lc(a); if (!byLower.has(al)) { byLower.set(al, sk); ci.push(al); } });
    });
    const sortLen = (a, b) => b.length - a.length;
    ci.sort(sortLen); cs.sort(sortLen);
    const reCI = ci.length ? new RegExp('(?<![a-z0-9+#])(' + ci.map(reEsc).join('|') + ')(?![a-z0-9+#])', 'g') : null;
    const reCS = cs.length ? new RegExp("(?<![A-Za-z0-9+#\\-'&.])(" + cs.map(reEsc).join('|') + ")(?![A-Za-z0-9+#\\-'&])", 'g') : null;
    const verbs = new Set([].concat(...Object.values(K().actionVerbs || {})).map(lc));
    const stop = new Set((K().stopwords || []).map(lc));
    IDX = { byLower, reCI, reCS, verbs, stop, all: K().skills || [] };
    return IDX;
  }
  E.resetIndex = () => { IDX = null; };

  /** Find canonical skills in text -> Map(name -> {skill, count}) */
  E.findSkills = function (text) {
    const idx = index(); const out = new Map();
    if (!text) return out;
    const add = (sk) => { const cur = out.get(sk.n); if (cur) cur.count++; else out.set(sk.n, { skill: sk, count: 1 }); };
    if (idx.reCI) { const low = lc(text); idx.reCI.lastIndex = 0; let m; while ((m = idx.reCI.exec(low))) { const sk = idx.byLower.get(m[1]); if (sk) add(sk); } }
    if (idx.reCS) {
      idx.reCS.lastIndex = 0; let m;
      while ((m = idx.reCS.exec(text))) {
        const after = text.slice(m.index + m[0].length, m.index + m[0].length + 10);
        if (/^[ -](live|to|ahead|back|beyond|through|with|for)\b/i.test(after)) continue; /* "Go live", "Go to market"... */
        const sk = idx.byLower.get('\u0000' + m[1]); if (sk) add(sk);
      }
    }
    return out;
  };
  E.skillsIn = (text) => Array.from(E.findSkills(text).keys());
  E.canonSkill = function (name) {
    const idx = index(); const n = String(name || '').trim(); if (!n) return n;
    const sk = idx.byLower.get(lc(n)) || idx.byLower.get('\u0000' + n);
    return sk ? sk.n : n;
  };
  E.skillInfo = (name) => { const idx = index(); return idx.byLower.get(lc(name)) || idx.byLower.get('\u0000' + name) || null; };
  E.suggestSkills = function (q) {
    const idx = index(); q = lc(q).trim(); if (!q) return [];
    const res = [], seen = new Set();
    for (const sk of idx.all) {
      const names = [sk.n].concat(sk.a || []);
      let score = -1;
      for (const nm of names) { const l = lc(nm); if (l === q) score = Math.max(score, 3); else if (l.startsWith(q)) score = Math.max(score, 2); else if (l.includes(q)) score = Math.max(score, 1); }
      if (score > -1 && !seen.has(sk.n)) { seen.add(sk.n); res.push({ label: sk.n, sub: sk.c, score }); }
    }
    res.sort((a, b) => b.score - a.score || a.label.length - b.label.length);
    const typed = String(q);
    if (!res.some((r) => lc(r.label) === typed)) res.push({ label: sentenceCase(typed), sub: 'custom' });
    return res.slice(0, 10);
  };
  const skillWeightMult = (name) => { const info = E.skillInfo(name); return info && LOW_WEIGHT_CATS.test(info.c || '') ? 0.5 : 1; };

  /* ============================================================ profile */
  E.profileText = function (p) {
    return [p.headline, p.summary, (p.skills || []).join(', '), (p.experience || []).map((e) => [e.title, e.company, (e.bullets || []).join('\n')].join('\n')).join('\n'),
      (p.projects || []).map((x) => [x.name, x.description, (x.bullets || []).join('\n')].join('\n')).join('\n'), (p.certifications || []).join('\n'), (p.education || []).map((e) => e.degree + ' ' + (e.details || '')).join('\n')].join('\n');
  };
  /** Set of canonical skills the person demonstrably has (listed + mentioned). */
  E.profileSkills = function (p) {
    const listed = new Set((p.skills || []).map(E.canonSkill));
    const mentioned = new Set(E.skillsIn(E.profileText(p)));
    const all = new Set([...listed, ...mentioned]);
    return { listed, mentioned, all, has: (n) => all.has(n) || Array.from(all).some((x) => lc(x) === lc(n)) };
  };
  E.years = function (p) {
    const ranges = (p.experience || []).map((e) => {
      const s = WP.d.parse((e.start || '') + (String(e.start || '').length === 7 ? '-01' : ''));
      const en = e.current || !e.end ? new Date() : WP.d.parse(e.end + (String(e.end).length === 7 ? '-01' : ''));
      return s && en && en > s ? [s.getTime(), en.getTime()] : null;
    }).filter(Boolean).sort((a, b) => a[0] - b[0]);
    let total = 0, cur = null;
    ranges.forEach((r) => { if (!cur) cur = r.slice(); else if (r[0] <= cur[1]) cur[1] = Math.max(cur[1], r[1]); else { total += cur[1] - cur[0]; cur = r.slice(); } });
    if (cur) total += cur[1] - cur[0];
    const computed = total / (365.25 * 86400000);
    const stated = Number(p.yearsExperience) || 0;
    return Math.round(Math.max(stated, computed) * 10) / 10;
  };

  E.profileStrength = function (p, st) {
    const bullets = [].concat(...(p.experience || []).map((e) => e.bullets || []));
    const metricPct = bullets.length ? bullets.filter((b) => E.bullet(b).hasMetric).length / bullets.length : 0;
    const items = [
      { label: 'Name, email and phone', done: !!(p.name && p.email && p.phone), w: 10, where: 'basics' },
      { label: 'Headline', done: !!p.headline, w: 5, where: 'basics' },
      { label: 'LinkedIn profile URL', done: !!p.linkedin, w: 5, where: 'basics' },
      { label: 'Target job titles', done: (p.targetTitles || []).length > 0, w: 10, where: 'targets' },
      { label: 'Target locations / work modes', done: (p.targetLocations || []).length > 0, w: 5, where: 'targets' },
      { label: 'Professional summary', done: String(p.summary || '').split(/\s+/).length >= 15, w: 10, where: 'basics' },
      { label: 'At least 8 skills', done: (p.skills || []).length >= 8, w: 10, where: 'skills' },
      { label: 'Work experience with 3+ bullets', done: (p.experience || []).some((e) => (e.bullets || []).length >= 3), w: 15, where: 'experience' },
      { label: '40%+ of bullets show a number', done: metricPct >= 0.4, w: 10, where: 'experience', detail: Math.round(metricPct * 100) + '% today' },
      { label: 'Education', done: (p.education || []).length > 0, w: 5, where: 'education' },
      { label: 'Salary expectations', done: !!(p.salary && (p.salary.expected || p.salary.minimum)), w: 5, where: 'targets' },
      { label: 'Notice period and work authorization', done: !!(p.noticePeriod && p.workAuth), w: 5, where: 'targets' },
      { label: '3+ interview stories (STAR)', done: st ? st.stories.length >= 3 : false, w: 5, where: 'stories' },
    ];
    const score = items.reduce((a, i) => a + (i.done ? i.w : 0), 0);
    return { score, items };
  };

  /* ========================================================= resume parse */
  const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };
  const DATE_RE = /((?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{1,2}\/\d{4}|\d{4})\s*(?:-|–|—|to|until)\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{1,2}\/\d{4}|\d{4}|present|current|now|today|date)/i;
  function toYM(s) {
    s = lc(s).trim(); if (/present|current|now|today|date/.test(s)) return '';
    let m = s.match(/([a-z]+)\.?\s*(\d{4})/); if (m && MONTHS[m[1].slice(0, 4)] || (m && MONTHS[m[1].slice(0, 3)])) return m[2] + '-' + String(MONTHS[m[1].slice(0, 4)] || MONTHS[m[1].slice(0, 3)]).padStart(2, '0');
    m = s.match(/(\d{1,2})\/(\d{4})/); if (m) return m[2] + '-' + String(m[1]).padStart(2, '0');
    m = s.match(/(\d{4})/); if (m) return m[1] + '-01';
    return '';
  }
  E.parseResume = function (text) {
    text = String(text || '').replace(/\r/g, '').replace(/ /g, ' ');
    const lines = text.split('\n').map((l) => l.replace(/\s+$/, ''));
    const heads = K().sectionHeadings || {};
    const headMap = [];
    Object.keys(heads).forEach((k) => heads[k].forEach((v) => headMap.push([lc(v), k])));
    headMap.sort((a, b) => b[0].length - a[0].length);
    const secOf = (line) => {
      const l = lc(line).replace(/[:|•\-–—_*#]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (!l || l.length > 40) return null;
      for (const [v, k] of headMap) if (l === v || (l.startsWith(v) && l.length <= v.length + 3)) return k;
      return null;
    };
    const out = { name: '', email: '', phone: '', linkedin: '', github: '', website: '', location: '', headline: '', summary: '', skills: [], experience: [], education: [], projects: [], certifications: [], achievements: [], languages: [] };
    const em = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/); if (em) out.email = em[0];
    const ph = text.match(/(\+?\d[\d\s().-]{8,}\d)/); if (ph) out.phone = ph[1].trim();
    const li = text.match(/(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/in\/[A-Za-z0-9_%-]+\/?/i); if (li) out.linkedin = li[0];
    const gh = text.match(/(?:https?:\/\/)?github\.com\/[A-Za-z0-9_-]+/i); if (gh) out.github = gh[0];
    const top = lines.filter((l) => l.trim()).slice(0, 6);
    for (const l of top) {
      const t = l.trim();
      if (!out.name && /^[A-Za-z][A-Za-z .'-]{2,40}$/.test(t) && t.split(' ').length <= 5 && !secOf(t) && !/@|\d/.test(t)) { out.name = t.replace(/\s+/g, ' '); continue; }
      if (out.name && !out.headline && t.length < 120 && !/@|linkedin|github|\+?\d{3}/.test(lc(t)) && !secOf(t)) { out.headline = t; }
    }
    const loc = top.join(' | ').match(/([A-Z][a-zA-Z]+(?:[ -][A-Z][a-zA-Z]+)?,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z]+))/); if (loc) out.location = loc[1];

    let sec = 'header'; const blocks = {};
    lines.forEach((l) => { const s = secOf(l); if (s) { sec = s; blocks[sec] = blocks[sec] || []; return; } (blocks[sec] = blocks[sec] || []).push(l); });
    const isBullet = (l) => /^\s*([•●▪◦‣\-*–]|\d+[.)])\s+/.test(l);
    const clean = (l) => l.replace(/^\s*([•●▪◦‣\-*–]|\d+[.)])\s+/, '').trim();

    if (blocks.summary) out.summary = blocks.summary.map((l) => l.trim()).filter(Boolean).join(' ').slice(0, 1200);
    const skillText = (blocks.skills || []).join('\n');
    out.skills = WP.uniq(E.skillsIn(skillText + '\n' + text));
    if (blocks.skills) {
      skillText.split(/[,;|•\n]/).map((x) => x.replace(/^[^:]*:\s*/, '').trim()).filter((x) => x && x.length < 32 && x.split(' ').length <= 4)
        .forEach((x) => { const c = E.canonSkill(x); if (!out.skills.some((s) => lc(s) === lc(c))) out.skills.push(c); });
    }

    const exp = blocks.experience || [];
    let cur = null; let pendingHeader = [];
    const flushHeader = () => {
      if (!pendingHeader.length) return;
      const joined = pendingHeader.join(' | ');
      const dm = joined.match(DATE_RE);
      if (dm || !cur) {
        cur = { id: WP.uid('exp'), title: '', company: '', location: '', start: '', end: '', current: false, bullets: [] };
        out.experience.push(cur);
        if (dm) { cur.start = toYM(dm[1]); cur.end = toYM(dm[2]); cur.current = !cur.end; }
        const parts = joined.replace(DATE_RE, '').split(/\s*(?:\||,| at | @ |–|—| - )\s*/).map((x) => x.trim()).filter((x) => x && x.length > 1);
        cur.title = parts[0] || ''; cur.company = parts[1] || ''; cur.location = parts[2] && parts[2].length < 40 ? parts[2] : '';
      } else cur.bullets.push(joined);
      pendingHeader = [];
    };
    exp.forEach((l) => {
      if (!l.trim()) { flushHeader(); return; }
      if (isBullet(l)) { flushHeader(); if (!cur) { cur = { id: WP.uid('exp'), title: '', company: '', location: '', start: '', end: '', current: false, bullets: [] }; out.experience.push(cur); } cur.bullets.push(clean(l)); }
      else if (cur && cur.bullets.length && l.trim().length > 60 && !DATE_RE.test(l)) cur.bullets[cur.bullets.length - 1] += ' ' + l.trim();
      else pendingHeader.push(l.trim());
    });
    flushHeader();
    out.experience = out.experience.filter((e) => e.title || e.bullets.length);

    (blocks.education || []).filter((l) => l.trim()).forEach((l) => {
      const t = clean(l); const yr = (t.match(/(19|20)\d{2}(?!.*(19|20)\d{2})/) || [''])[0];
      if (/(bachelor|master|b\.?\s?tech|m\.?\s?tech|b\.?sc|m\.?sc|mba|ph\.?d|b\.?a\b|m\.?a\b|b\.?e\b|b\.?com|m\.?com|diploma|degree|university|college|institute|school)/i.test(t))
        out.education.push({ id: WP.uid('edu'), degree: t.split(/\s*[,|–—-]\s*/)[0], school: t.split(/\s*[,|–—-]\s*/)[1] || '', year: yr, details: '' });
    });
    (blocks.certifications || []).map(clean).filter(Boolean).forEach((c) => out.certifications.push(c));
    (blocks.achievements || []).map(clean).filter(Boolean).forEach((c) => out.achievements.push(c));
    (blocks.languages || []).join(',').split(/[,;|\n]/).map((x) => x.trim()).filter(Boolean).forEach((c) => out.languages.push(c));
    let prj = null;
    (blocks.projects || []).forEach((l) => {
      if (!l.trim()) return;
      if (isBullet(l) && prj) prj.bullets.push(clean(l));
      else { prj = { id: WP.uid('prj'), name: clean(l).split(/\s*[|–—]\s*/)[0].slice(0, 80), link: (l.match(/https?:\/\/\S+|github\.com\/\S+/) || [''])[0], description: '', bullets: [] }; out.projects.push(prj); }
    });
    out.yearsExperience = E.years({ experience: out.experience });
    const latest = out.experience[0]; if (latest) { out.currentTitle = latest.title; out.currentCompany = latest.company; }
    return out;
  };

  /* ================================================================ bullets */
  E.bullet = function (b) {
    const idx = index(); const low = lc(b);
    const weak = (K().weakPhrases || []).filter((w) => new RegExp('(^|[^a-z])' + reEsc(lc(w.p)) + '([^a-z]|$)').test(low));
    const hasMetric = /\d/.test(b.replace(/\b(19|20)\d{2}\b/g, '')) || /%|\$|₹|£|€/.test(b);
    const first = lc((b.trim().match(/^[A-Za-z-]+/) || [''])[0]);
    const strongVerb = idx.verbs.has(first);
    const words = b.trim().split(/\s+/).filter(Boolean).length;
    const tips = [];
    weak.forEach((w) => tips.push('Replace "' + w.p + '" with a stronger verb like ' + (w.s || []).slice(0, 3).join(', ') + '. ' + (w.why || '')));
    if (!hasMetric) tips.push('Add a number: how many, how much, how fast, or % change.');
    if (!strongVerb && !weak.length) tips.push('Start with a strong action verb (e.g. Led, Built, Reduced, Launched).');
    if (words > 38) tips.push('Too long (' + words + ' words) - aim for 15-30.');
    if (words < 6) tips.push('Too short to show impact - add what changed because of your work.');
    const score = (hasMetric ? 2 : 0) + (strongVerb ? 1 : 0) - weak.length * 1.5 + (words >= 10 && words <= 32 ? 1 : 0);
    return { weak, hasMetric, strongVerb, words, tips, quality: score >= 3 ? 'strong' : score >= 1 ? 'ok' : 'weak' };
  };
  E.improveBullet = function (b) {
    let out = b.trim();
    (K().weakPhrases || []).forEach((w) => {
      const re = new RegExp('^(\\s*)' + reEsc(w.p) + '\\s+', 'i');
      if (re.test(out) && w.s && w.s[0]) out = out.replace(re, '$1' + w.s[0] + ' ');
    });
    out = sentenceCase(out);
    if (!E.bullet(out).hasMetric) out = stripDot(out) + ', [add result: e.g. "saving X hours/week" or "improving Y by Z%"]';
    return out;
  };

  /* ============================================================ JD analysis */
  const SEC = {
    must: /^(requirements?|qualifications?|minimum qualifications|basic qualifications|required|what you('|’)?ll need|what you need|what we('|’)?re looking for|what we are looking for|what you bring|must[- ]haves?|you have|who you are|skills( and| &) experience|essential|your profile|about you|key skills|you should have|ideal candidate|eligibility)\b/i,
    nice: /^(preferred|nice[- ]to[- ]haves?|bonus|pluses|desired|good to have|additional|extra credit|it('|’)?s a plus)\b/i,
    resp: /^(responsibilities|what you('|’)?ll do|what you will do|the role|role overview|your impact|day[- ]to[- ]day|key (duties|responsibilities)|in this role|your mission|job description|duties|about the role|the opportunity|role summary)\b/i,
    about: /^(about (us|the company)|who we are|our mission|company overview|about [A-Z])/i,
    benefits: /^(benefits|perks|what we offer|we offer|compensation|why join|why you('|’)?ll love)/i,
  };
  const WEIGHT = { must: 3, resp: 2, nice: 1, about: 0.6, benefits: 0, none: 1.6 };
  const RED_FLAGS = [
    [/\b(rock ?star|ninja|guru|wizard|superhero|unicorn)\b/i, 'Buzzword job titles can signal unclear expectations.'],
    [/wear (many|multiple) hats/i, 'Scope may be broad or undefined - ask what success looks like in 90 days.'],
    [/work hard,? play hard/i, 'Culture cue: ask about working hours and flexibility.'],
    [/\b(commission[- ]only|unpaid)\b/i, 'Compensation risk: confirm fixed pay.'],
    [/\b(immediate joiners?|urgent(ly)? hiring|start immediately|asap)\b/i, 'Urgent hiring - ask why the role is open (growth vs. turnover).'],
    [/\bwe('| a)re (like )?a family\b/i, 'Family-talk can blur boundaries - ask about workload norms.'],
    [/\b(24\/7|nights and weekends|always on|on-call)\b/i, 'Possible on-call or out-of-hours work - clarify expectations.'],
    [/\bfast[- ]paced\b/i, 'Fast-paced: ask about team size, priorities and burnout.'],
  ];
  const GREEN_FLAGS = [
    [/(learning|education|training) (budget|stipend|allowance)/i, 'Learning budget'], [/\bmentor(ship|ing)?\b/i, 'Mentorship'],
    [/\b(flexible|flexi)[- ]?(hours|working|schedule)\b/i, 'Flexible hours'], [/\bparental leave\b/i, 'Parental leave'],
    [/\b(esops?|equity|stock options|rsus?)\b/i, 'Equity'], [/\bremote\b/i, 'Remote-friendly'], [/\bwellness\b/i, 'Wellness benefits'],
    [/\b(diverse|inclusive|inclusion|equal opportunity)\b/i, 'Inclusion statement'],
  ];

  E.parseSalary = function (text) {
    const t = String(text || '');
    let m = t.match(/(\d{1,3}(?:\.\d+)?)\s*(?:-|–|to)\s*(\d{1,3}(?:\.\d+)?)\s*(?:lpa|lakhs?(?:\s*per\s*annum)?|l\b)/i);
    if (m) return { min: Math.round(+m[1] * 1e5), max: Math.round(+m[2] * 1e5), currency: 'INR' };
    const CUR = { '$': 'USD', usd: 'USD', '£': 'GBP', gbp: 'GBP', '€': 'EUR', eur: 'EUR', '₹': 'INR', inr: 'INR', rs: 'INR', 'rs.': 'INR', cad: 'CAD', aud: 'AUD', sgd: 'SGD', aed: 'AED' };
    const mult = (u) => { u = lc(u || ''); return u === 'k' ? 1e3 : u === 'm' ? 1e6 : /^l/.test(u) ? 1e5 : u === 'cr' ? 1e7 : 1; };
    m = t.match(/(\$|usd|£|gbp|€|eur|₹|inr|rs\.?|cad|aud|sgd|aed)\s?([\d][\d,]*(?:\.\d+)?)\s*(k|m|l|lakhs?|cr)?\s*(?:-|–|to)\s*(?:\$|usd|£|gbp|€|eur|₹|inr|rs\.?|cad|aud|sgd|aed)?\s?([\d][\d,]*(?:\.\d+)?)\s*(k|m|l|lakhs?|cr)?/i);
    if (m) {
      const a = parseFloat(m[2].replace(/,/g, '')) * mult(m[3] || m[5]), b = parseFloat(m[4].replace(/,/g, '')) * mult(m[5] || m[3]);
      if (a > 0 && b >= a) return { min: Math.round(a), max: Math.round(b), currency: CUR[lc(m[1])] || 'USD' };
    }
    return null;
  };

  function titleTokens(t) {
    const sen = new Set(['senior', 'sr', 'junior', 'jr', 'lead', 'principal', 'staff', 'head', 'chief', 'associate', 'intern', 'i', 'ii', 'iii', 'iv', 'entry', 'level', 'mid', 'of', 'and', '&', 'the', '-', 'a']);
    return lc(t).replace(/[^a-z0-9+# ]/g, ' ').split(/\s+/).filter((w) => w && !sen.has(w));
  }
  E.titleSimilarity = function (a, b) {
    const A = new Set(titleTokens(a)), B = new Set(titleTokens(b)); if (!A.size || !B.size) return 0;
    let inter = 0; A.forEach((x) => { if (B.has(x)) inter++; });
    return inter / Math.max(A.size, B.size);
  };
  E.seniorityOf = function (title) {
    const t = ' ' + lc(title).replace(/[^a-z. ]/g, ' ') + ' ';
    let found = null;
    (K().seniority || []).forEach((s) => { if ((s.words || []).some((w) => t.includes(' ' + lc(w) + ' '))) found = s; });
    return found;
  };
  E.detectFamily = function (title, skills) {
    const fams = K().roleFamilies || []; let best = null, bestScore = 0;
    fams.forEach((f) => {
      const tScore = Math.max(0, ...(f.titles || []).map((t) => E.titleSimilarity(title, t)));
      const sk = new Set((skills || []).map(lc));
      const core = f.coreSkills || [];
      const sScore = core.length ? core.filter((c) => sk.has(lc(c))).length / core.length : 0;
      const score = tScore * 0.65 + sScore * 0.35;
      if (score > bestScore) { bestScore = score; best = f; }
    });
    return bestScore > 0.15 ? best : null;
  };
  E.family = (id) => (K().roleFamilies || []).find((f) => f.id === id) || null;

  const memo = new Map();
  E.analyzeJob = function (job, profile) {
    profile = profile || WP.store.state.profile;
    const key = job.id + '|' + (job.description || '').length + '|' + job.title + '|' + (profile.updatedAt || '') + '|' + (profile.skills || []).length + '|' + (job.workMode || '') + '|' + (job.location || '');
    if (memo.has(key)) return memo.get(key);
    const text = String(job.description || '');
    const lines = text.replace(/\r/g, '').split('\n');
    const skills = new Map();
    let section = 'none', anySection = false;
    lines.forEach((raw) => {
      const line = raw.trim(); if (!line) return;
      const plain = line.replace(/^[#*\-•\s]+/, '').replace(/[:*]+$/, '').trim();
      if (plain.length < 70 && !/^[-•*]/.test(line)) {
        for (const k of Object.keys(SEC)) if (SEC[k].test(plain)) { section = k; anySection = true; return; }
      }
      let w = WEIGHT[section];
      if (/(preferred|nice to have|a plus|is a plus|bonus|good to have|desirable|familiarity)/i.test(line) && section !== 'benefits') w = Math.min(w, 1);
      else if (/(must|required|mandatory|strong|expert|proficien|advanced|hands-on|solid)/i.test(line) && section !== 'benefits' && section !== 'about') w = Math.max(w, 2.6);
      if (w <= 0) return;
      E.findSkills(line).forEach((v, name) => {
        const cur = skills.get(name) || { name, category: v.skill.c, weight: 0, count: 0, sections: new Set() };
        cur.weight = Math.max(cur.weight, w); cur.count += v.count; cur.sections.add(section);
        skills.set(name, cur);
      });
    });
    E.findSkills(job.title).forEach((v, name) => { const cur = skills.get(name) || { name, category: v.skill.c, weight: 0, count: 0, sections: new Set() }; cur.weight = Math.max(cur.weight, 3); cur.count++; skills.set(name, cur); });
    if (!anySection) skills.forEach((s) => { s.weight = Math.min(3, 1.4 + 0.4 * s.count); });
    const ps = E.profileSkills(profile);
    const list = Array.from(skills.values()).map((s) => {
      const weight = Math.round(Math.min(4, s.weight + Math.min(1, 0.25 * (s.count - 1))) * skillWeightMult(s.name) * 100) / 100;
      const must = s.sections.has('must') || (!anySection && s.weight >= 2.4) || (s.sections.has('none') && s.weight >= 2.6);
      const nice = !must && (s.sections.has('nice') || s.weight <= 1);
      return { name: s.name, category: s.category, weight, count: s.count, must, nice, have: ps.has(s.name), listed: ps.listed.has(s.name) };
    }).sort((a, b) => b.weight - a.weight || b.count - a.count);

    const idx = index(); const freq = new Map();
    const skillWords = new Set([].concat(...list.map((s) => lc(s.name).split(/\s+/))));
    const words = lc(text).replace(/[^a-z0-9+#/ \n-]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !idx.stop.has(w) && !/^\d+$/.test(w) && !skillWords.has(w));
    for (let i = 0; i < words.length; i++) {
      freq.set(words[i], (freq.get(words[i]) || 0) + 1);
      if (i + 1 < words.length && !idx.stop.has(words[i + 1])) { const bg = words[i] + ' ' + words[i + 1]; freq.set(bg, (freq.get(bg) || 0) + 1); }
    }
    const ptext = lc(E.profileText(profile));
    const keywords = Array.from(freq.entries()).filter(([k, c]) => c >= 2 || (k.includes(' ') && c >= 2)).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
      .slice(0, 18).map(([term, count]) => ({ term, count, have: ptext.includes(term) }));

    let years = null;
    const yre = /(\d{1,2})\s*\+?\s*(?:-|–|to)?\s*(\d{1,2})?\s*\+?\s*(?:years?|yrs?)/gi; let ym;
    while ((ym = yre.exec(text))) {
      const ctx = lc(text.slice(Math.max(0, ym.index - 60), ym.index + 80));
      const n = +ym[1]; const tail = text.slice(ym.index + ym[0].length, ym.index + ym[0].length + 12).toLowerCase();
      if (n > 0 && n <= 25 && !/^\s*(old|ago)/.test(tail) && !/(founded|in business|for over|over the (past|last)|history of)/.test(ctx)) years = years == null ? n : Math.min(years, n);
    }
    const low = lc(text);
    const education = /\b(ph\.?d|doctorate)\b/.test(low) ? 'PhD' : /\b(master'?s|mba|m\.?tech|m\.?sc|msc|ms in|m\.s\.)\b/.test(low) ? "Master's" : /\b(bachelor'?s|b\.?tech|b\.?e\b|b\.?sc|bsc|b\.s\.|degree in|graduate)\b/.test(low) ? "Bachelor's" : null;
    const workMode = job.workMode || (/\bhybrid\b/.test(low) ? 'hybrid' : /\bremote\b/.test(low) ? 'remote' : /\b(on[- ]?site|in[- ]office|work from office)\b/.test(low) ? 'onsite' : '');
    const salary = (job.salaryMin || job.salaryMax) ? { min: job.salaryMin, max: job.salaryMax, currency: job.currency } : E.parseSalary(text);
    const redFlags = RED_FLAGS.filter(([re]) => re.test(text)).map(([, why]) => why);
    if (!salary && /competitive (salary|pay|compensation)/i.test(text)) redFlags.push('Says "competitive salary" but lists no range - research market pay first.');
    const greenFlags = GREEN_FLAGS.filter(([re]) => re.test(text)).map(([, l]) => l);
    if (salary) greenFlags.unshift('Salary range listed');
    const family = E.detectFamily(job.title, list.map((s) => s.name));
    const seniority = E.seniorityOf(job.title);

    /* scoring */
    const totalW = list.reduce((a, s) => a + s.weight, 0);
    const haveW = list.filter((s) => s.have).reduce((a, s) => a + s.weight, 0);
    const skillScore = totalW ? haveW / totalW : 0.5;
    const musts = list.filter((s) => s.must);
    const mustScore = musts.length ? musts.filter((s) => s.have).length / musts.length : skillScore;
    const yrs = E.years(profile);
    const expScore = years == null ? 0.85 : yrs >= years ? 1 : yrs >= years - 1 ? 0.8 : Math.max(0, yrs / years) * 0.8;
    const targets = (profile.targetTitles || []).concat(profile.currentTitle ? [profile.currentTitle] : []);
    let titleScore = targets.length ? Math.max(...targets.map((t) => E.titleSimilarity(job.title, t))) : 0.5;
    if (family && profile.careerSwitch && profile.careerSwitch.active && profile.careerSwitch.toFamily === family.id) titleScore = Math.max(titleScore, 0.7);
    const hasMaster = (profile.education || []).some((e) => /master|mba|m\.?tech|m\.?sc|ph\.?d/i.test(e.degree || ''));
    const hasPhd = (profile.education || []).some((e) => /ph\.?d|doctor/i.test(e.degree || ''));
    const eduScore = education === 'PhD' ? (hasPhd ? 1 : 0.5) : education === "Master's" ? (hasMaster ? 1 : 0.75) : 1;
    const modes = profile.workModes || [];
    let locScore = !workMode || !modes.length ? 0.8 : modes.includes(workMode) ? 1 : 0.4;
    const tl = (profile.targetLocations || []).map(lc);
    if (tl.length && job.location && tl.some((l) => lc(job.location).includes(l) || l.includes(lc(job.location).split(',')[0]))) locScore = Math.min(1, locScore + 0.2);
    const breakdown = [
      { key: 'skills', label: 'Skills coverage', value: skillScore, weight: 0.42, tip: 'Weighted share of the job\'s skills that appear in your profile.' },
      { key: 'must', label: 'Must-have skills', value: mustScore, weight: 0.18, tip: 'Share of required skills you have.' },
      { key: 'experience', label: 'Years of experience', value: expScore, weight: 0.14, tip: years != null ? 'Asks for ' + years + '+ years; you have ~' + yrs + '.' : 'No explicit years requirement found.' },
      { key: 'title', label: 'Title alignment', value: titleScore, weight: 0.14, tip: 'How closely the title matches your target or current titles.' },
      { key: 'education', label: 'Education', value: eduScore, weight: 0.05, tip: education ? 'Mentions ' + education + '.' : 'No degree requirement found.' },
      { key: 'location', label: 'Location / work mode', value: locScore, weight: 0.07, tip: workMode ? 'Role is ' + workMode + '.' : 'Work mode not stated.' },
    ];
    const score = Math.round(breakdown.reduce((a, b) => a + b.value * b.weight, 0) * 100);
    const missing = list.filter((s) => !s.have);
    const tips = [];
    if (missing.filter((s) => s.must).length) tips.push('Missing must-haves: ' + missing.filter((s) => s.must).slice(0, 5).map((s) => s.name).join(', ') + '. If you have them, add them to your profile; if not, address them honestly in your cover letter.');
    if (titleScore < 0.5) tips.push('Mirror the exact title "' + job.title + '" in your resume headline (if it truthfully describes you).');
    if (keywords.filter((k) => !k.have).length) tips.push('Consider using these phrases from the posting where accurate: ' + keywords.filter((k) => !k.have).slice(0, 5).map((k) => '"' + k.term + '"').join(', ') + '.');
    if (years != null && yrs < years) tips.push('The role asks for ' + years + '+ years. Emphasize scope and impact to offset the gap.');
    const res = { score, breakdown, skills: list, must: musts, nice: list.filter((s) => s.nice), missing, matched: list.filter((s) => s.have), keywords, years, education, workMode, salary, redFlags, greenFlags, family, seniority, tips, profileYears: yrs };
    memo.set(key, res);
    if (memo.size > 400) memo.delete(memo.keys().next().value);
    return res;
  };
  E.refreshMatches = function (st) { st.jobs.forEach((j) => { j.match = E.analyzeJob(j, st.profile).score; }); };

  /* ========================================================= tailoring */
  E.summaryVariants = function (p, job, a) {
    const yrs = Math.max(1, Math.floor(E.years(p)));
    const src = a.matched.length ? a.matched : (p.skills || []).map((n) => ({ name: n, category: (E.skillInfo(n) || {}).c || '' }));
    const top = src.filter((s) => !LOW_WEIGHT_CATS.test(s.category || '')).slice(0, 4).map((s) => s.name);
    const s3 = top.length ? (top.length > 2 ? top.slice(0, -1).join(', ') + ' and ' + top[top.length - 1] : top.join(' and ')) : 'my core skills';
    const best = bestBullets(p, a, 1)[0];
    const ach = best ? stripDot(lowerFirst(best.text)) : '';
    const cur = p.currentTitle || (p.targetTitles || [])[0] || 'Professional';
    const role = job.title || (p.targetTitles || [])[0] || 'this role';
    const hook = a.family && a.family.summaryHook ? a.family.summaryHook : 'delivering measurable results';
    const cs = p.careerSwitch || {};
    const v = [];
    v.push(cur + ' with ' + yrs + '+ years of experience in ' + s3 + '.' + (ach ? ' Most recently, ' + ach + '.' : '') + ' Ready to bring a track record of ' + hook + ' to ' + (job.company || 'your team') + ' as ' + article(role) + ' ' + role + '.');
    v.push(sentenceCase(role) + ' candidate with ' + yrs + ' years of hands-on ' + (top[0] || 'industry') + (top[1] ? ' and ' + top[1] : '') + ' experience.' + (ach ? ' Known for impact: ' + ach + '.' : '') + ' Strengths include ' + (top.slice(2).concat(a.matched.filter((x) => LOW_WEIGHT_CATS.test(x.category || '')).map((x) => lc(x.name))).slice(0, 3).join(', ') || 'clear communication and ownership') + '.');
    v.push(yrs + '+ years | ' + (top.length ? top.join(' | ') : cur) + (ach ? '. ' + sentenceCase(ach) + '.' : '.'));
    if (cs.active && cs.toFamily) {
      const from = E.family(cs.fromFamily), to = E.family(cs.toFamily);
      v.unshift('Transitioning from ' + (from ? from.name.toLowerCase() : 'my current field') + ' into ' + (to ? to.name.toLowerCase() : 'a new field') + ', bringing ' + yrs + ' years of transferable experience in ' + s3 + '.' + (ach ? ' Most recently, ' + ach + '.' : '') + ' Excited to apply this foundation as ' + article(role) + ' ' + role + ' at ' + (job.company || 'your company') + '.');
    }
    return v;
  };
  function article(w) { return /^[aeiou]/i.test(w || '') ? 'an' : 'a'; }

  function bulletScore(text, a) {
    const found = E.findSkills(text);
    let sc = 0; const hits = [];
    a.skills.forEach((s) => { if (found.has(s.name)) { sc += s.weight; hits.push(s.name); } });
    const low = lc(text);
    a.keywords.forEach((k) => { if (low.includes(k.term)) sc += 0.5; });
    const bi = E.bullet(text);
    sc += (bi.hasMetric ? 1 : 0) + (bi.strongVerb ? 0.3 : 0) - bi.weak.length * 0.5;
    return { sc, hits };
  }
  function bestBullets(p, a, n) {
    const all = [];
    (p.experience || []).forEach((e) => (e.bullets || []).forEach((b) => { const r = bulletScore(b, a); all.push({ text: b, score: r.sc + (E.bullet(b).hasMetric ? 1 : 0), hits: r.hits, company: e.company }); }));
    return all.sort((x, y) => y.score - x.score).slice(0, n);
  }
  E.bestBullets = bestBullets;

  E.tailor = function (p, job, opts) {
    opts = opts || {};
    const a = E.analyzeJob(job, p);
    const per = opts.bulletsPerRole || [6, 4, 3, 2];
    const changes = [];
    const exps = (p.experience || []).slice().sort((x, y) => (y.current ? 1 : 0) - (x.current ? 1 : 0) || String(y.start || '').localeCompare(String(x.start || '')));
    const experience = exps.map((e, i) => {
      const scored = (e.bullets || []).map((b, j) => ({ b, j, ...bulletScore(b, a) }));
      const keep = scored.slice().sort((x, y) => y.sc - x.sc || x.j - y.j).slice(0, per[Math.min(i, per.length - 1)]);
      if (keep.length && keep[0].j !== 0 && keep[0].hits.length) changes.push('Moved "' + trunc(keep[0].b, 60) + '" to the top of ' + (e.company || 'role') + ' (matches ' + keep[0].hits.slice(0, 3).join(', ') + ').');
      const dropped = scored.length - keep.length; if (dropped > 0) changes.push('Left out ' + WP.plural(dropped, 'low-relevance bullet') + ' from ' + (e.company || 'a role') + ' to stay focused.');
      return { title: e.title, company: e.company, location: e.location, dates: fmtRange(e), bullets: keep.map((k) => k.b) };
    });
    const ps = E.profileSkills(p);
    const extra = (opts.confirmedSkills || []).filter((s) => !ps.has(s));
    const jdHave = a.skills.filter((s) => s.have).map((s) => s.name);
    const rest = (p.skills || []).map(E.canonSkill).filter((s) => !jdHave.includes(s) && !extra.includes(s));
    const skills = WP.uniq(jdHave.concat(extra, rest)).slice(0, opts.maxSkills || 22);
    if (jdHave.length) changes.push('Skills reordered so the job\'s top skills come first: ' + jdHave.slice(0, 5).join(', ') + '.');
    if (extra.length) changes.push('Added skills you confirmed you have: ' + extra.join(', ') + '.');
    const variants = E.summaryVariants(p, job, a);
    const summary = opts.summary != null ? opts.summary : variants[Math.min(opts.summaryIndex || 0, variants.length - 1)];
    const headline = opts.headline != null ? opts.headline : [job.title].concat(jdHave.filter((s) => !LOW_WEIGHT_CATS.test(E.skillInfo(s) ? E.skillInfo(s).c : '')).slice(0, 3)).join(' | ');
    changes.push('Headline mirrors the posting title "' + job.title + '".');
    const projects = (p.projects || []).map((x) => ({ x, sc: bulletScore([x.name, x.description].concat(x.bullets || []).join(' '), a).sc }))
      .filter((o) => o.sc > 0.5 || E.years(p) < 3).sort((m, n) => n.sc - m.sc).slice(0, 3)
      .map((o) => ({ name: o.x.name, link: o.x.link, description: o.x.description, bullets: o.x.bullets || [] }));
    const certs = (p.certifications || []).slice().sort((c1, c2) => bulletScore(c2, a).sc - bulletScore(c1, a).sc);
    const data = {
      name: p.name, headline, contact: [p.email, p.phone, p.location, p.linkedin, p.github || p.website].filter(Boolean),
      summary, skills, experience, projects,
      education: (p.education || []).map((e) => ({ degree: e.degree, school: e.school, year: e.year, details: e.details })),
      certifications: certs, languages: p.languages || [], achievements: p.achievements || [],
    };
    const text = resumeText(data);
    const found = E.findSkills(text);
    const cov = a.skills.length ? a.skills.filter((s) => found.has(s.name)).length / a.skills.length : 1;
    const mustCov = a.must.length ? a.must.filter((s) => found.has(s.name)).length / a.must.length : 1;
    return { data, analysis: a, variants, changes, coverage: cov, mustCoverage: mustCov, missing: a.skills.filter((s) => !found.has(s.name)) };
  };
  function trunc(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  E.trunc = trunc;
  function fmtRange(e) {
    const f = (ym) => (ym ? WP.d.monthName(ym) : '');
    return (f(e.start) || '') + (e.start || e.end || e.current ? ' - ' : '') + (e.current || !e.end ? (e.start ? 'Present' : '') : f(e.end));
  }
  E.fmtRange = fmtRange;
  function resumeText(d) {
    return [d.name, d.headline, (d.contact || []).join(' | '), d.summary, (d.skills || []).join(', '),
      (d.experience || []).map((e) => [e.title, e.company, e.location, e.dates].join(' ') + '\n' + (e.bullets || []).join('\n')).join('\n'),
      (d.projects || []).map((x) => x.name + ' ' + (x.description || '') + '\n' + (x.bullets || []).join('\n')).join('\n'),
      (d.education || []).map((e) => [e.degree, e.school, e.year].join(' ')).join('\n'), (d.certifications || []).join('\n')].join('\n');
  }
  E.resumeText = resumeText;

  E.atsCheck = function (d, a, job) {
    const text = resumeText(d); const words = text.split(/\s+/).filter(Boolean).length;
    const bullets = [].concat(...(d.experience || []).map((e) => e.bullets || []));
    const metric = bullets.length ? bullets.filter((b) => E.bullet(b).hasMetric).length / bullets.length : 0;
    const weak = bullets.reduce((n, b) => n + E.bullet(b).weak.length, 0);
    const found = E.findSkills(text);
    const mustMiss = a ? a.must.filter((s) => !found.has(s.name)).map((s) => s.name) : [];
    const mustCov = a && a.must.length ? 1 - mustMiss.length / a.must.length : 1;
    const allCov = a && a.skills.length ? a.skills.filter((s) => found.has(s.name)).length / a.skills.length : 1;
    const hasContact = (d.contact || []).some((c) => /@/.test(c)) && (d.contact || []).some((c) => /\d{6,}|\d{3}[\s-]\d{3}/.test(c.replace(/\s/g, ' ')));
    const hasLinked = (d.contact || []).some((c) => /linkedin/i.test(c));
    const sumW = String(d.summary || '').split(/\s+/).filter(Boolean).length;
    const titleIn = job ? lc(d.headline + ' ' + d.summary).includes(lc(job.title)) : true;
    const longB = bullets.filter((b) => b.split(/\s+/).length > 40).length;
    const dates = (d.experience || []).every((e) => e.dates && e.dates.trim());
    const checks = [
      { label: 'Email and phone number present', status: hasContact ? 'pass' : 'fail', w: 10, tip: 'Recruiters and ATS parsers need both.' },
      { label: 'LinkedIn URL included', status: hasLinked ? 'pass' : 'warn', w: 4 },
      { label: 'Summary is 25-90 words', status: sumW >= 25 && sumW <= 90 ? 'pass' : sumW ? 'warn' : 'fail', w: 6, tip: sumW + ' words now.' },
      { label: 'Job title mirrored in headline or summary', status: titleIn ? 'pass' : 'warn', w: 8 },
      { label: 'Must-have skills covered', status: mustCov >= 0.8 ? 'pass' : mustCov >= 0.5 ? 'warn' : 'fail', w: 22, tip: mustMiss.length ? 'Missing: ' + mustMiss.join(', ') : 'All covered.' },
      { label: 'Overall keyword coverage 70%+', status: allCov >= 0.7 ? 'pass' : allCov >= 0.45 ? 'warn' : 'fail', w: 14, tip: Math.round(allCov * 100) + '% of the job\'s skills appear.' },
      { label: 'Half of bullets show measurable results', status: metric >= 0.5 ? 'pass' : metric >= 0.3 ? 'warn' : 'fail', w: 12, tip: Math.round(metric * 100) + '% include a number.' },
      { label: 'No weak phrases ("responsible for", "helped"...)', status: weak === 0 ? 'pass' : 'warn', w: 8, tip: weak ? weak + ' found - use the bullet coach.' : '' },
      { label: 'Length fits 1-2 pages (350-900 words)', status: words >= 350 && words <= 900 ? 'pass' : 'warn', w: 6, tip: words + ' words.' },
      { label: 'Every role has dates', status: dates ? 'pass' : 'warn', w: 4 },
      { label: 'Bullets under 40 words', status: longB ? 'warn' : 'pass', w: 3 },
      { label: 'Single column, standard headings, no tables/images', status: 'pass', w: 3, tip: 'All Waypoint templates are ATS-safe.' },
    ];
    const score = Math.round(checks.reduce((acc, c) => acc + (c.status === 'pass' ? c.w : c.status === 'warn' ? c.w * 0.5 : 0), 0) / checks.reduce((acc, c) => acc + c.w, 0) * 100);
    return { score, checks, words, metric, coverage: allCov, mustCoverage: mustCov };
  };

  /* ============================================================ writing */
  E.firstName = (n) => String(n || '').trim().split(/\s+/)[0] || '';
  function companyHook(company, job) {
    const r = (company && company.research) || {};
    if (r.news) return 'I have been following ' + (company.name) + "'s recent news - " + stripDot(lowerFirst(r.news.split(/(?<=[.;])\s/)[0])) + ' - and it is exactly the kind of momentum I want to be part of.';
    if (r.mission) return 'Your mission to ' + stripDot(lowerFirst(r.mission.replace(/^(to|our mission is to)\s+/i, ''))) + ' resonates with me.';
    if (company && company.industry) return 'I am drawn to ' + company.name + "'s work in " + lc(company.industry) + '.';
    return 'The scope of this role and ' + (job.company || 'your team') + "'s direction stood out to me.";
  }
  E.coverLetter = function (p, job, company, tone, opts) {
    opts = opts || {};
    const a = E.analyzeJob(job, p);
    const yrs = Math.max(1, Math.floor(E.years(p)));
    const top = a.matched.filter((s) => !LOW_WEIGHT_CATS.test(s.category || '')).slice(0, 3).map((s) => s.name);
    const best = bestBullets(p, a, 3);
    const mustMissing = a.must.filter((s) => !s.have).slice(0, 2).map((s) => s.name);
    const learning = (WP.store.state.learning || []).filter((l) => l.status !== 'done').map((l) => l.skill);
    const greet = opts.hiringManager ? 'Dear ' + opts.hiringManager + ',' : 'Dear ' + (job.company ? job.company + ' ' : '') + 'Hiring Team,';
    const role = job.title || 'the open role';
    const s2 = top.length > 1 ? top.slice(0, -1).join(', ') + ' and ' + top[top.length - 1] : top[0] || 'my field';
    const proof = best.map((b) => (b.company ? 'At ' + b.company + ', I ' : 'I ') + stripDot(lowerFirst(b.text)) + '.');
    const cs = p.careerSwitch || {};
    const from = E.family(cs.fromFamily), to = E.family(cs.toFamily);
    let open;
    switch (tone) {
      case 'enthusiastic': open = 'When I saw that ' + (job.company || 'your company') + ' is hiring ' + article(role) + ' ' + role + ', I knew I had to reach out. ' + companyHook(company, job); break;
      case 'concise': open = 'I am applying for the ' + role + ' role. I bring ' + yrs + '+ years of experience in ' + s2 + ', and a record of measurable results.'; break;
      case 'career-change': open = 'After ' + yrs + ' years in ' + (from ? lc(from.name) : 'my current field') + ', I am moving into ' + (to ? lc(to.name) : 'a new direction') + ' - and the ' + role + ' role at ' + (job.company || 'your company') + ' is where my transferable strengths in ' + s2 + ' fit best.'; break;
      case 'referral': open = (opts.referrer || '[Referrer name]') + ' suggested I reach out about the ' + role + ' role at ' + (job.company || 'your company') + '. ' + companyHook(company, job); break;
      default: open = 'I am excited to apply for the ' + role + ' position at ' + (job.company || 'your company') + '. With ' + yrs + '+ years of experience in ' + s2 + ', I have built a track record of turning work into measurable outcomes. ' + companyHook(company, job);
    }
    const body = tone === 'concise' ? proof.slice(0, 2).join(' ') : 'A few highlights that map to what you are looking for:\n\n' + proof.map((x) => '- ' + x).join('\n');
    const fitSkills = a.must.filter((s) => s.have).slice(0, 4).map((s) => s.name);
    let fit = fitSkills.length ? 'The role calls for ' + fitSkills.join(', ') + ' - these are core to how I work every day.' : '';
    if (mustMissing.length) {
      const learningNow = mustMissing.filter((m) => learning.some((l) => lc(l) === lc(m)));
      fit += ' ' + (learningNow.length ? 'I am actively building ' + learningNow.join(' and ') + ', and I ramp up on new tools quickly.' : 'Where I am still growing (for example ' + mustMissing.join(' and ') + '), I have a record of ramping up quickly on new tools.');
    }
    const close = tone === 'concise'
      ? 'I would welcome a short conversation. Thank you for your time.'
      : 'I would welcome the chance to discuss how I can contribute to ' + (job.company || 'your team') + '. Thank you for your time and consideration.';
    const sign = (tone === 'enthusiastic' ? 'Best regards,' : 'Sincerely,') + '\n' + (p.name || '[Your name]') + '\n' + [p.phone, p.email, p.linkedin].filter(Boolean).join(' | ');
    return [greet, open, body, fit.trim(), close, sign].filter(Boolean).join('\n\n');
  };

  E.OUTREACH_TYPES = [
    { id: 'connection', label: 'LinkedIn connection note', channel: 'linkedin', limit: 300 },
    { id: 'referral', label: 'Referral request', channel: 'linkedin' },
    { id: 'recruiter', label: 'Message to recruiter', channel: 'linkedin' },
    { id: 'hiring-manager', label: 'Email to hiring manager', channel: 'email' },
    { id: 'informational', label: 'Informational interview ask', channel: 'linkedin' },
    { id: 'alumni', label: 'Alumni / shared-background note', channel: 'linkedin', limit: 300 },
    { id: 'follow-up', label: 'Follow-up (no reply / after applying)', channel: 'email' },
    { id: 'thank-you', label: 'Thank-you after interview', channel: 'email' },
    { id: 'reconnect', label: 'Reconnect with former colleague', channel: 'linkedin' },
  ];
  E.outreach = function (type, ctx) {
    const p = ctx.profile || WP.store.state.profile;
    const c = ctx.contact || {}; const job = ctx.job || null; const company = ctx.company || null;
    const fn = E.firstName(c.name) || 'there';
    const me = E.firstName(p.name) || '[Your name]';
    const cur = p.currentTitle || 'professional';
    const org = c.company || (job && job.company) || (company && company.name) || 'your company';
    const role = job ? job.title : (p.targetTitles || [])[0] || 'roles on your team';
    const a = job ? E.analyzeJob(job, p) : null;
    const top = (a ? a.matched.map((s) => s.name) : (p.skills || [])).slice(0, 2);
    const yrs = Math.max(1, Math.floor(E.years(p)));
    const best = a ? bestBullets(p, a, 1)[0] : bestBullets(p, { skills: [], keywords: [] }, 1)[0];
    const win = best ? stripDot(lowerFirst(best.text)) : '';
    const hook = ctx.hook ? ' ' + stripDot(ctx.hook) + '.' : '';
    const school = ((p.education || [])[0] || {}).school || '[school]';
    const prevCo = ((p.experience || [])[1] || (p.experience || [])[0] || {}).company || '[company]';
    let subject = '', body = '';
    switch (type) {
      case 'connection':
        body = 'Hi ' + fn + ', I\'m ' + article(cur) + ' ' + cur + ' exploring ' + role + ' opportunities and admire ' + org + '\'s work.' + hook + ' I\'d love to connect and learn from your experience.';
        break;
      case 'alumni':
        body = 'Hi ' + fn + ', fellow ' + school + ' alum here! I\'m ' + article(cur) + ' ' + cur + ' interested in ' + org + '.' + hook + ' Would love to connect.';
        break;
      case 'referral':
        subject = 'Referral for ' + role + ' at ' + org + '?';
        body = 'Hi ' + fn + ',\n\nHope you\'re doing well! I noticed ' + org + ' is hiring ' + article(role) + ' ' + role + (job && job.url ? ' (' + job.url + ')' : '') + ', and it lines up closely with my background: ' + yrs + '+ years in ' + (top.join(' and ') || 'the field') + (win ? ', most recently I ' + win : '') + '.\n\nWould you be comfortable referring me, or pointing me to the right person? I\'m happy to send my resume and a short blurb to make it easy. No pressure at all if the timing isn\'t right.\n\nThanks so much,\n' + me;
        break;
      case 'recruiter':
        subject = role + ' - ' + (p.name || me);
        body = 'Hi ' + fn + ', I saw ' + org + ' is hiring for ' + article(role) + ' ' + role + '. I\'m ' + article(cur) + ' ' + cur + ' with ' + yrs + '+ years in ' + (top.join(' and ') || 'this area') + (win ? ' - most recently I ' + win : '') + '.' + hook + ' I\'ve applied and would appreciate a few minutes to see whether my background fits. Thank you!';
        break;
      case 'hiring-manager':
        subject = 'Re: ' + role + ' - ' + (win ? trunc(sentenceCase(win), 60) : (p.name || me));
        body = 'Hi ' + fn + ',\n\nI\'m applying for the ' + role + ' role on your team and wanted to reach out directly.' + hook + '\n\nA quick snapshot of what I\'d bring:\n- ' + yrs + '+ years in ' + (top.join(' and ') || 'the field') + '\n' + (win ? '- Recent impact: ' + win + '\n' : '') + '- ' + (a && a.must.filter((s) => s.have).length ? 'Hands-on with ' + a.must.filter((s) => s.have).slice(0, 3).map((s) => s.name).join(', ') : 'A strong record of ownership and delivery') + '\n\nWould you be open to a 15-minute conversation this week or next? My resume is attached.\n\nBest,\n' + (p.name || me) + '\n' + [p.phone, p.linkedin].filter(Boolean).join(' | ');
        break;
      case 'informational':
        subject = 'Quick question about your work at ' + org;
        body = 'Hi ' + fn + ',\n\nI\'m ' + article(cur) + ' ' + cur + ' exploring a move toward ' + role + '.' + hook + ' Your path at ' + org + ' is exactly the kind of experience I\'d love to learn from.\n\nWould you be open to a 15-20 minute chat in the next couple of weeks? I have a few specific questions about the team and the skills that matter most. Happy to work around your schedule.\n\nThank you,\n' + me;
        break;
      case 'follow-up':
        subject = 'Following up: ' + role + ' application';
        body = 'Hi ' + fn + ',\n\nI hope your week is going well. I applied for the ' + role + ' role at ' + org + (job && job.appliedAt ? ' on ' + WP.d.fmtLong(job.appliedAt) : '') + ' and wanted to follow up to reiterate my interest.' + (win ? ' Since applying, I have kept thinking about how my experience - ' + win + ' - could help the team.' : '') + '\n\nIs there any additional information I can share to support my application?\n\nThank you,\n' + (p.name || me);
        break;
      case 'thank-you':
        subject = 'Thank you - ' + role + ' interview';
        body = 'Hi ' + fn + ',\n\nThank you for taking the time to speak with me about the ' + role + ' role today. I especially enjoyed our conversation about ' + (ctx.hook ? stripDot(lowerFirst(ctx.hook)) : '[topic you discussed]') + '.\n\nIt reinforced my excitement about joining ' + org + '. ' + (top.length ? 'My experience with ' + top.join(' and ') + ' maps directly to the challenges you described, and I would love to help the team tackle them.' : '') + '\n\nPlease let me know if I can provide anything else. Looking forward to next steps.\n\nBest regards,\n' + (p.name || me);
        break;
      case 'reconnect':
        body = 'Hi ' + fn + '! It\'s been a while since our ' + prevCo + ' days - hope all is well at ' + org + '.' + hook + ' I\'m currently exploring ' + role + ' roles and would love to catch up and hear what you\'re working on. Coffee or a quick call sometime?';
        break;
      default: body = 'Hi ' + fn + ',';
    }
    const t = E.OUTREACH_TYPES.find((x) => x.id === type) || {};
    return { subject, body, channel: t.channel || 'linkedin', limit: t.limit || null };
  };

  /* ======================================================= search links */
  const enc = encodeURIComponent;
  const g = (q) => 'https://www.google.com/search?q=' + enc(q);
  E.google = g;
  E.jobBoards = function (region, q, loc, f) {
    f = f || {};
    const days = f.posted || '7';
    const li = 'https://www.linkedin.com/jobs/search/?keywords=' + enc(q) + (loc ? '&location=' + enc(loc) : '') + '&f_TPR=r' + (+days * 86400) + (f.remote ? '&f_WT=2' : '');
    const qs = WP.slug(q), ls = WP.slug(loc || '');
    const indeedHost = { india: 'in.indeed.com', uk: 'uk.indeed.com', canada: 'ca.indeed.com', australia: 'au.indeed.com', eu: 'www.indeed.com', sea: 'sg.indeed.com', mena: 'ae.indeed.com' }[region] || 'www.indeed.com';
    const base = [
      { name: 'LinkedIn Jobs', url: li, sub: 'Posted in last ' + days + ' day(s)' + (f.remote ? ', remote' : ''), icon: 'briefcase' },
      { name: 'Indeed', url: 'https://' + indeedHost + '/jobs?q=' + enc(q) + (loc ? '&l=' + enc(loc) : '') + '&fromage=' + days + (f.remote ? '&sc=0kf%3Aattr(DSQF7)%3B' : ''), sub: indeedHost, icon: 'search' },
      { name: 'Google Jobs', url: 'https://www.google.com/search?q=' + enc(q + ' jobs' + (loc ? ' ' + loc : '')) + '&ibp=htl;jobs', sub: 'Aggregates many boards', icon: 'globe' },
      { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job/jobs.htm?sc.keyword=' + enc(q), sub: 'Jobs + reviews + salaries', icon: 'building' },
    ];
    const R = {
      india: [
        { name: 'Naukri', url: 'https://www.naukri.com/' + qs + '-jobs' + (ls ? '-in-' + ls : '') + '?jobAge=' + days, sub: 'Largest India board', icon: 'briefcase' },
        { name: 'foundit (Monster)', url: 'https://www.foundit.in/srp/results?query=' + enc(q) + (loc ? '&locations=' + enc(loc) : ''), sub: 'India', icon: 'search' },
        { name: 'Instahyre (via Google)', url: g('site:instahyre.com "' + q + '"' + (loc ? ' ' + loc : '')), sub: 'Curated tech/product roles', icon: 'globe' },
        { name: 'Cutshort (via Google)', url: g('site:cutshort.io "' + q + '"'), sub: 'Startups', icon: 'globe' },
        { name: 'Glassdoor India', url: 'https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=' + enc(q), sub: 'India', icon: 'building' },
      ],
      us: [
        { name: 'Dice', url: 'https://www.dice.com/jobs?q=' + enc(q) + (loc ? '&location=' + enc(loc) : ''), sub: 'Tech roles', icon: 'briefcase' },
        { name: 'ZipRecruiter', url: 'https://www.ziprecruiter.com/jobs-search?search=' + enc(q) + (loc ? '&location=' + enc(loc) : ''), sub: 'US', icon: 'search' },
        { name: 'Built In', url: 'https://builtin.com/jobs?search=' + enc(q), sub: 'Tech & startups', icon: 'building' },
        { name: 'USAJOBS', url: 'https://www.usajobs.gov/Search/Results?k=' + enc(q) + (loc ? '&l=' + enc(loc) : ''), sub: 'US government', icon: 'flag' },
      ],
      uk: [
        { name: 'Reed', url: 'https://www.reed.co.uk/jobs/' + qs + '-jobs' + (ls ? '-in-' + ls : ''), sub: 'UK', icon: 'briefcase' },
        { name: 'Totaljobs', url: 'https://www.totaljobs.com/jobs/' + qs + (ls ? '/in-' + ls : ''), sub: 'UK', icon: 'search' },
        { name: 'CV-Library', url: 'https://www.cv-library.co.uk/' + qs + '-jobs' + (ls ? '-in-' + ls : ''), sub: 'UK', icon: 'file' },
      ],
      eu: [
        { name: 'StepStone (DE)', url: 'https://www.stepstone.de/jobs/' + qs + (ls ? '/in-' + ls : ''), sub: 'Germany', icon: 'briefcase' },
        { name: 'Welcome to the Jungle', url: 'https://www.welcometothejungle.com/en/jobs?query=' + enc(q), sub: 'Europe', icon: 'search' },
        { name: 'EURES (via Google)', url: g('site:eures.europa.eu "' + q + '"'), sub: 'EU job mobility portal', icon: 'globe' },
      ],
      canada: [{ name: 'Job Bank', url: 'https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=' + enc(q) + (loc ? '&locationstring=' + enc(loc) : ''), sub: 'Government of Canada', icon: 'flag' }],
      australia: [{ name: 'SEEK', url: 'https://www.seek.com.au/' + qs + '-jobs' + (ls ? '/in-' + ls : ''), sub: 'Australia', icon: 'briefcase' }],
      mena: [
        { name: 'Bayt', url: 'https://www.bayt.com/en/international/jobs/' + qs + '-jobs/', sub: 'Middle East', icon: 'briefcase' },
        { name: 'Naukrigulf', url: 'https://www.naukrigulf.com/' + qs + '-jobs', sub: 'Gulf region', icon: 'search' },
      ],
      sea: [{ name: 'JobStreet (via Google)', url: g('site:jobstreet.com "' + q + '"' + (loc ? ' ' + loc : '')), sub: 'Southeast Asia', icon: 'globe' }],
    };
    const remote = [
      { name: 'We Work Remotely', url: 'https://weworkremotely.com/remote-jobs/search?term=' + enc(q), sub: 'Remote only', icon: 'globe' },
      { name: 'Remote OK', url: 'https://remoteok.com/remote-' + qs + '-jobs', sub: 'Remote only', icon: 'globe' },
      { name: 'Wellfound (via Google)', url: g('site:wellfound.com/jobs "' + q + '"'), sub: 'Startups', icon: 'rocket' },
    ];
    return { base, regional: R[region] || [], remote };
  };
  E.atsXray = function (q, loc) {
    const sites = [['Greenhouse', 'boards.greenhouse.io'], ['Greenhouse (new)', 'job-boards.greenhouse.io'], ['Lever', 'jobs.lever.co'], ['Ashby', 'jobs.ashbyhq.com'], ['Workday', 'myworkdayjobs.com'], ['SmartRecruiters', 'jobs.smartrecruiters.com'], ['Workable', 'apply.workable.com'], ['iCIMS', 'icims.com']];
    const locPart = loc ? ' "' + loc + '"' : '';
    const all = '(' + sites.map((s) => 'site:' + s[1]).join(' OR ') + ') "' + q + '"' + locPart;
    return { all: g(all), allQuery: all, each: sites.map(([n, s]) => ({ name: n, url: g('site:' + s + ' "' + q + '"' + locPart), sub: s })) };
  };
  function coreTitle(t) { return titleTokens(t).join(' ').replace(/\b\w/g, (c) => c.toUpperCase()); }
  E.coreTitle = coreTitle;
  E.managerTitles = function (title, familyId) {
    const core = coreTitle(title || '');
    const noun = core.split(' ').slice(0, -1).join(' ') || core;
    const byFam = {
      'data-analytics': ['Analytics Manager', 'Head of Analytics', 'Director of Analytics'], 'data-science-ml': ['Head of Data Science', 'Data Science Manager', 'ML Engineering Manager'],
      'data-engineering': ['Data Engineering Manager', 'Head of Data Engineering', 'Head of Data Platform'], 'software-engineering': ['Engineering Manager', 'Head of Engineering', 'Director of Engineering'],
      'product-management': ['Group Product Manager', 'Director of Product', 'Head of Product'], 'ux-ui-design': ['Design Manager', 'Head of Design', 'Design Director'],
      'digital-marketing': ['Marketing Manager', 'Head of Marketing', 'Growth Lead'], 'sales-bd': ['Sales Manager', 'Head of Sales', 'Regional Sales Director'],
      'finance-accounting': ['Finance Manager', 'Financial Controller', 'Head of Finance'], 'hr-talent': ['HR Manager', 'Head of People', 'HR Business Partner'],
    };
    const list = (byFam[familyId] || []).concat(noun ? [noun + ' Manager', 'Head of ' + noun, noun + ' Lead'] : ['Manager']);
    return WP.uniq(list).slice(0, 5);
  };
  E.peopleSearches = function (companyName, opts) {
    opts = opts || {};
    const p = opts.profile || WP.store.state.profile;
    const title = opts.title || (p.targetTitles || [])[0] || p.currentTitle || '';
    const fam = E.detectFamily(title, p.skills || []);
    const loc = opts.location ? ' "' + opts.location + '"' : '';
    const co = '"' + companyName + '"';
    const mgr = E.managerTitles(title, fam && fam.id);
    const li = (kw) => 'https://www.linkedin.com/search/results/people/?keywords=' + enc(kw);
    const x = (kw) => g('site:linkedin.com/in ' + kw);
    const rows = [
      { kind: 'Recruiters', why: 'They own the hiring pipeline - the fastest path to a screen.', li: li(companyName + ' recruiter OR "talent acquisition"'), x: x(co + ' (recruiter OR "talent acquisition" OR "talent partner")' + loc), icon: 'users' },
      { kind: 'Hiring managers', why: 'Decision makers for ' + (title || 'your target role') + '. Try: ' + mgr.slice(0, 3).join(', ') + '.', li: li(companyName + ' ' + mgr[0]), x: x(co + ' (' + mgr.map((m) => '"' + m + '"').join(' OR ') + ')' + loc), icon: 'award' },
      { kind: 'Peers in the role', why: 'Great for referrals and honest team insight.', li: li(companyName + ' ' + coreTitle(title)), x: x(co + ' "' + coreTitle(title) + '"' + loc), icon: 'user' },
    ];
    (p.education || []).slice(0, 2).forEach((e) => { if (e.school) rows.push({ kind: 'Alumni: ' + e.school, why: 'Shared school = warmer reply rates.', li: li(companyName + ' ' + e.school), x: x(co + ' "' + e.school + '"'), icon: 'grad' }); });
    (p.experience || []).slice(0, 3).forEach((e) => { if (e.company) rows.push({ kind: 'Ex-' + e.company, why: 'Former colleagues now at ' + companyName + '.', li: li(companyName + ' ' + e.company), x: x(co + ' "' + e.company + '"'), icon: 'handshake' }); });
    return rows;
  };
  E.companyLinks = function (c, region) {
    const n = c.name, q = '"' + n + '"';
    const links = [
      c.domain && !/\.example$/.test(c.domain) ? { name: 'Company website', url: 'https://' + c.domain.replace(/^https?:\/\//, ''), sub: c.domain, icon: 'globe' } : null,
      { name: 'Careers page', url: g(q + ' careers jobs'), sub: 'Find open roles directly', icon: 'briefcase' },
      { name: 'LinkedIn company', url: 'https://www.linkedin.com/search/results/companies/?keywords=' + enc(n), sub: 'Size, growth, people', icon: 'users' },
      { name: 'Recent news', url: 'https://news.google.com/search?q=' + enc(n), sub: 'Last few months', icon: 'trending' },
      { name: 'Glassdoor reviews', url: 'https://www.glassdoor.com/Search/results.htm?keyword=' + enc(n), sub: 'Culture, ratings', icon: 'star' },
      { name: 'Interview questions', url: g('site:glassdoor.com ' + q + ' interview questions'), sub: 'What they ask', icon: 'mic' },
      { name: 'Salaries (Levels.fyi)', url: g('site:levels.fyi ' + q), sub: 'Compensation data', icon: 'dollar' },
      { name: 'Crunchbase', url: 'https://www.crunchbase.com/textsearch?q=' + enc(n), sub: 'Funding, investors', icon: 'chart' },
      { name: 'Reddit discussions', url: g('site:reddit.com ' + q + ' (interview OR culture OR working)'), sub: 'Unfiltered opinions', icon: 'chat' },
      { name: 'Engineering / team blog', url: g(q + ' (engineering OR tech OR data) blog'), sub: 'How teams work', icon: 'book' },
      { name: 'Annual report / investors', url: g(q + ' annual report OR investor relations'), sub: 'Strategy & priorities', icon: 'file' },
    ];
    if (region === 'india') links.push({ name: 'AmbitionBox', url: g('site:ambitionbox.com ' + q), sub: 'India reviews & salaries', icon: 'star' });
    if (c.domain && !/\.example$/.test(c.domain)) links.push({ name: 'Email format (Hunter)', url: 'https://hunter.io/search/' + enc(c.domain), sub: 'Guess work emails - verify!', icon: 'mail' });
    return links.filter(Boolean);
  };
  E.learningLinks = (skill) => (K().learningSites || [{ name: 'Google', url: 'https://www.google.com/search?q={q}+tutorial' }]).map((s) => ({ name: s.name, url: s.url.replace('{q}', enc(skill)) }));

  /* ======================================================= insights */
  E.weekCounts = function (st, weekStartISO) {
    const ws = weekStartISO || WP.d.weekStart();
    const we = WP.d.addDays(ws, 7);
    const c = { applied: 0, outreach: 0, followup: 0, learning: 0, research: 0, interview: 0 };
    st.activity.forEach((a) => { if (a.date >= ws && a.date < we && c[a.type] != null) c[a.type]++; });
    return c;
  };
  E.weeklySeries = function (st, weeks) {
    const labels = [], out = { applied: [], outreach: [], followup: [] };
    for (let i = weeks - 1; i >= 0; i--) {
      const ws = WP.d.weekStart(WP.d.addDays(WP.d.today(), -7 * i));
      labels.push(ws);
      const c = E.weekCounts(st, ws);
      out.applied.push(c.applied); out.outreach.push(c.outreach); out.followup.push(c.followup);
    }
    return { labels, ...out };
  };
  E.statusCounts = function (st) {
    const c = {}; st.jobs.forEach((j) => { c[j.status] = (c[j.status] || 0) + 1; }); return c;
  };
  E.funnel = function (st) {
    const reached = (j, stage) => {
      const order = ['saved', 'applying', 'applied', 'screening', 'interview', 'offer'];
      const evTypes = new Set((j.events || []).map((e) => e.type));
      if (stage === 'applied') return !!j.appliedAt || ['applied', 'screening', 'interview', 'offer'].includes(j.status) || evTypes.has('applied');
      if (stage === 'screening') return ['screening', 'interview', 'offer'].includes(j.status) || evTypes.has('screening') || evTypes.has('interview');
      if (stage === 'interview') return ['interview', 'offer'].includes(j.status) || evTypes.has('interview');
      if (stage === 'offer') return j.status === 'offer' || evTypes.has('offer');
      return order.includes(j.status) || true;
    };
    const jobs = st.jobs.filter((j) => j.status !== 'withdrawn');
    return [
      { key: 'saved', label: 'Saved', value: jobs.length, hint: 'All jobs you are tracking' },
      { key: 'applied', label: 'Applied', value: jobs.filter((j) => reached(j, 'applied')).length },
      { key: 'screening', label: 'Screening', value: jobs.filter((j) => reached(j, 'screening')).length },
      { key: 'interview', label: 'Interview', value: jobs.filter((j) => reached(j, 'interview')).length },
      { key: 'offer', label: 'Offer', value: jobs.filter((j) => reached(j, 'offer')).length },
    ];
  };
  E.insights = function (st) {
    const p = st.profile; const demand = new Map();
    const modes = { remote: 0, hybrid: 0, onsite: 0, unknown: 0 }; const seniority = {}; const locations = {}; const sources = {};
    const salaries = []; const families = {};
    st.jobs.forEach((j) => {
      const a = E.analyzeJob(j, p);
      a.skills.forEach((s) => { const cur = demand.get(s.name) || { name: s.name, count: 0, weight: 0, have: s.have, must: 0 }; cur.count++; cur.weight += s.weight; if (s.must) cur.must++; demand.set(s.name, cur); });
      modes[a.workMode || 'unknown'] = (modes[a.workMode || 'unknown'] || 0) + 1;
      const sen = a.seniority ? a.seniority.label : 'Mid-level / unspecified';
      seniority[sen] = (seniority[sen] || 0) + 1;
      const loc = (j.location || 'Unspecified').split(/[,(]/)[0].trim() || 'Unspecified';
      locations[loc] = (locations[loc] || 0) + 1;
      sources[j.source || 'Unknown'] = (sources[j.source || 'Unknown'] || 0) + 1;
      if (a.family) families[a.family.name] = (families[a.family.name] || 0) + 1;
      if (a.salary && (a.salary.min || a.salary.max)) salaries.push({ label: j.company + ' - ' + j.title, min: a.salary.min || a.salary.max, max: a.salary.max || a.salary.min, currency: a.salary.currency });
    });
    const skillDemand = Array.from(demand.values()).sort((a, b) => b.weight - a.weight);
    const gaps = skillDemand.filter((s) => !s.have && !LOW_WEIGHT_CATS.test((E.skillInfo(s.name) || {}).c || ''));
    const matches = st.jobs.map((j) => j.match || 0);
    return { skillDemand, gaps, modes, seniority, locations, sources, salaries, families, avgMatch: matches.length ? Math.round(matches.reduce((a, b) => a + b, 0) / matches.length) : 0, jobs: st.jobs.length };
  };
  E.responseRate = function (st) {
    const applied = st.jobs.filter((j) => j.appliedAt || ['applied', 'screening', 'interview', 'offer', 'rejected'].includes(j.status));
    const responded = applied.filter((j) => ['screening', 'interview', 'offer', 'rejected'].includes(j.status) || (j.events || []).some((e) => ['screening', 'interview', 'offer', 'rejected'].includes(e.type)));
    const sent = st.outreach.filter((o) => o.status === 'sent' || o.status === 'replied');
    const replied = st.outreach.filter((o) => o.status === 'replied');
    return { applied: applied.length, responded: responded.length, appRate: applied.length ? Math.round((responded.length / applied.length) * 100) : 0, sent: sent.length, replied: replied.length, outRate: sent.length ? Math.round((replied.length / sent.length) * 100) : 0 };
  };

  /* ===================================================== journey phases */
  E.phases = function (st) {
    const p = st.profile;
    const ps = E.profileStrength(p, st).score;
    const tiers = st.companies.filter((c) => c.tier === 'A');
    const researched = tiers.filter((c) => c.research && (c.research.mission || c.research.news || c.research.products)).length;
    const target = Math.round(((p.targetTitles.length ? 35 : 0) + Math.min(35, st.companies.length * 7) + (tiers.length ? (researched / tiers.length) * 30 : 0)));
    const discover = Math.min(100, st.jobs.length * 12);
    const applied = st.jobs.filter((j) => j.appliedAt || ['applied', 'screening', 'interview', 'offer'].includes(j.status)).length;
    const apply = Math.min(100, applied * 10 + (st.resumes.length ? 10 : 0));
    const sent = st.outreach.filter((o) => o.status !== 'draft').length;
    const network = Math.min(100, st.contacts.length * 5 + sent * 6);
    const win = Math.min(100, st.stories.length * 12 + (st.jobs.some((j) => j.status === 'interview' || j.status === 'offer') ? 20 : 0) + (st.offers.length ? 20 : 0));
    return [
      { id: 'prepare', n: 1, name: 'Prepare', desc: 'Profile, master resume, goals', pct: ps, route: 'profile', icon: 'user' },
      { id: 'target', n: 2, name: 'Target', desc: 'Roles, companies, market', pct: Math.min(100, target), route: 'market', icon: 'target' },
      { id: 'discover', n: 3, name: 'Discover', desc: 'Find & score openings', pct: discover, route: 'jobs', icon: 'search' },
      { id: 'network', n: 4, name: 'Network', desc: 'People, referrals, outreach', pct: network, route: 'network', icon: 'users' },
      { id: 'apply', n: 5, name: 'Apply', desc: 'Tailor, fill, submit, track', pct: apply, route: 'tracker', icon: 'send' },
      { id: 'win', n: 6, name: 'Win', desc: 'Interview, negotiate, accept', pct: win, route: 'interview', icon: 'award' },
    ];
  };

  /* ===================================================== career switch */
  E.switchPlan = function (p, fromId, toId) {
    const from = E.family(fromId), to = E.family(toId);
    if (!to) return null;
    const ps = E.profileSkills(p);
    const core = to.coreSkills || [];
    const transferable = core.filter((s) => ps.has(s));
    const gaps = core.filter((s) => !ps.has(s));
    const fromCore = from ? from.coreSkills || [] : [];
    const shared = fromCore.filter((s) => core.includes(s));
    const extraAssets = Array.from(ps.all).filter((s) => !core.includes(s)).slice(0, 10);
    const overlap = core.length ? Math.round((transferable.length / core.length) * 100) : 0;
    const g1 = gaps.slice(0, 2), g2 = gaps.slice(2, 4);
    const roadmap = [
      { weeks: 'Weeks 1-2', title: 'Foundations', items: ['Learn the basics of ' + (g1.join(' and ') || 'the core tools') + ' (see learning links).', 'Read 3 job posts for ' + ((to.titles || [])[0] || 'the target role') + ' and list recurring requirements.', 'Reframe your headline toward ' + to.name + '.'] },
      { weeks: 'Weeks 3-6', title: 'Build proof', items: ['Ship one portfolio project that uses ' + (gaps.slice(0, 3).join(', ') || 'the target skills') + '.', g2.length ? 'Start on ' + g2.join(' and ') + '.' : 'Deepen your strongest transferable skill.', 'Write a short post or case study about what you built.'] },
      { weeks: 'Weeks 7-8', title: 'Reposition', items: ['Rewrite resume bullets to emphasise transferable wins (' + (transferable.slice(0, 3).join(', ') || 'your strengths') + ').', 'Prepare your "why I\'m switching" story (STAR format).', 'Ask 2 people in ' + to.name + ' for feedback on your resume.'] },
      { weeks: 'Weeks 9-12', title: 'Go to market', items: ['Target bridge roles: ' + ((to.bridgeRoles || []).slice(0, 3).join(', ') || 'adjacent roles') + '.', 'Book 4 informational interviews via alumni and ex-colleagues.', 'Apply to 5-8 well-matched roles per week with tailored resumes.'] },
    ];
    return { from, to, transferable, gaps, shared, extraAssets, overlap, roadmap, bridgeRoles: to.bridgeRoles || [] };
  };

  /* ===================================================== offers */
  E.offerTotals = function (o) {
    const base = +o.base || 0, bonus = +o.bonus || 0, equity = +o.equity || 0, signing = +o.signing || 0, benefits = +o.benefits || 0;
    return { base, bonus, equity, signing, benefits, firstYear: base + bonus + equity + signing + benefits, ongoing: base + bonus + equity + benefits };
  };
  E.offerScore = function (o, weights) {
    weights = weights || { money: 0.5, growth: 0.3, wlb: 0.2 };
    const all = WP.store.state.offers.map((x) => E.offerTotals(x).ongoing);
    const max = Math.max(1, ...all);
    return Math.round((E.offerTotals(o).ongoing / max * weights.money + ((+o.growth || 3) / 5) * weights.growth + ((+o.wlb || 3) / 5) * weights.wlb) * 100);
  };

  /* ===================================================== planner */
  const P = {};
  function exists(st, type, refKey, refVal, windowDays) {
    return st.actions.some((a) => a.type === type && ((a.ref && a.ref[refKey]) === refVal || (a.payload && a.payload.skill === refVal)) &&
      (a.status === 'pending' || a.status === 'approved' || (windowDays && a.status !== 'rejected' && WP.d.diff(a.decidedAt || a.createdAt) <= windowDays) || (!windowDays && a.status === 'done' && ['tailor-resume', 'research-company', 'find-people', 'interview-prep', 'learn-skill'].includes(type))));
  }
  P.suggest = function (st) {
    const out = []; const p = st.profile;
    const goals = st.settings.weeklyGoals; const week = E.weekCounts(st);
    const thr = st.settings.matchThreshold || 60;
    const auto = st.settings.autonomy || {};
    const mk = (o) => out.push(Object.assign({ impact: 2, effort: 2, source: 'planner', payload: {}, ref: {} }, o));
    const strength = E.profileStrength(p, st);
    if (strength.score < 60 && !st.actions.some((a) => a.type === 'custom' && a.payload && a.payload.key === 'profile' && a.status === 'pending'))
      mk({ type: 'custom', title: 'Complete your profile (' + strength.score + '% strong)', detail: 'Everything else - matching, tailoring, outreach - gets better with a complete profile. Missing: ' + strength.items.filter((i) => !i.done).slice(0, 3).map((i) => i.label.toLowerCase()).join(', ') + '.', impact: 3, effort: 2, payload: { key: 'profile', route: 'profile' } });
    const remainingApps = Math.max(1, goals.applications - week.applied);
    st.jobs.filter((j) => j.status === 'saved' && (j.match || 0) >= thr).sort((a, b) => (b.match || 0) - (a.match || 0)).slice(0, remainingApps).forEach((j) => {
      if (!j.resumeId && !exists(st, 'tailor-resume', 'jobId', j.id))
        mk({ type: 'tailor-resume', title: 'Tailor resume for ' + j.company + ' - ' + j.title, detail: j.match + '% match. A tailored resume puts the job\'s top skills first and mirrors its title.', ref: { jobId: j.id, companyId: j.companyId }, impact: 3, effort: 1, autoApprove: auto.drafts === 'auto' });
      else if (j.resumeId && !exists(st, 'apply', 'jobId', j.id))
        mk({ type: 'apply', title: 'Apply to ' + j.company + ' - ' + j.title + ' (' + j.match + '% match)', detail: 'Tailored resume is ready. The Apply Wizard assembles your cover letter and answers; you do the final submit.', ref: { jobId: j.id, companyId: j.companyId }, impact: 3, effort: 2 });
    });
    st.companies.filter((c) => (c.tier === 'A' || c.tier === 'B') && c.status !== 'paused').forEach((c) => {
      const cnt = st.contacts.filter((x) => x.companyId === c.id || lc(x.company) === lc(c.name)).length;
      if (cnt < 2 && !exists(st, 'find-people', 'companyId', c.id))
        mk({ type: 'find-people', title: 'Find people at ' + c.name, detail: (cnt ? 'Only ' + cnt + ' contact' : 'No contacts') + ' at a tier-' + c.tier + ' company. Referrals are far more likely to lead to interviews than cold applications.', ref: { companyId: c.id }, impact: 3, effort: 1, autoApprove: auto.research === 'auto' });
      const r = c.research || {};
      if (c.tier === 'A' && !(r.mission || r.news || r.products) && !exists(st, 'research-company', 'companyId', c.id))
        mk({ type: 'research-company', title: 'Research ' + c.name, detail: 'Tier-A target without research notes. Research feeds your cover letters, outreach and interview prep.', ref: { companyId: c.id }, impact: 2, effort: 1, autoApprove: auto.research === 'auto' });
    });
    const remainingOut = Math.max(1, goals.outreach - week.outreach);
    st.contacts.filter((c) => c.status === 'to-contact').sort((a, b) => (b.warmth || 0) - (a.warmth || 0)).slice(0, Math.min(5, remainingOut)).forEach((c) => {
      if (exists(st, 'send-outreach', 'contactId', c.id)) return;
      const job = st.jobs.find((j) => j.companyId && j.companyId === c.companyId && !['rejected', 'withdrawn'].includes(j.status)) || null;
      const type = c.relationship === 'alumni' ? 'alumni' : c.relationship === 'colleague' ? (job ? 'referral' : 'reconnect') : c.relationship === 'recruiter' ? 'recruiter' : c.relationship === 'hiring-manager' ? 'hiring-manager' : 'connection';
      const msg = E.outreach(type, { contact: c, job, profile: p });
      mk({ type: 'send-outreach', title: 'Message ' + c.name + ' (' + (c.title || c.relationship) + ', ' + (c.company || '') + ')', detail: 'Warmth ' + (c.warmth || 1) + '/5. Draft below - edit before approving. Nothing is sent automatically.', ref: { contactId: c.id, companyId: c.companyId, jobId: job ? job.id : '' }, impact: c.warmth >= 3 ? 3 : 2, effort: 1, payload: { type, channel: msg.channel, subject: msg.subject, body: msg.body } });
    });
    st.jobs.filter((j) => j.status === 'applied' && j.appliedAt && WP.d.diff(j.appliedAt) >= 7).forEach((j) => {
      const lastEv = (j.events || []).map((e) => e.date).sort().pop() || j.appliedAt;
      if (WP.d.diff(lastEv) < 7 || exists(st, 'follow-up', 'jobId', j.id, 6)) return;
      const contact = st.contacts.find((c) => (c.companyId && c.companyId === j.companyId) && (c.relationship === 'recruiter' || c.relationship === 'hiring-manager'));
      const msg = E.outreach('follow-up', { job: j, contact: contact || { name: '', company: j.company }, profile: p });
      mk({ type: 'follow-up', title: 'Follow up on ' + j.company + ' - ' + j.title, detail: 'Applied ' + WP.d.diff(j.appliedAt) + ' days ago with no update.' + (contact ? ' Send to ' + contact.name + '.' : ' Find a recruiter or reply to the confirmation email.'), ref: { jobId: j.id, contactId: contact ? contact.id : '', companyId: j.companyId }, impact: 2, effort: 1, payload: { subject: msg.subject, body: msg.body } });
    });
    st.contacts.filter((c) => (c.status === 'requested' || c.status === 'connected') && c.lastContacted && WP.d.diff(c.lastContacted) >= 5 && WP.d.diff(c.lastContacted) <= 30).forEach((c) => {
      if (exists(st, 'follow-up', 'contactId', c.id, 5)) return;
      mk({ type: 'follow-up', title: 'Nudge ' + c.name + ' at ' + (c.company || ''), detail: 'Last contact ' + WP.d.diff(c.lastContacted) + ' days ago (' + c.status + '). A short, friendly nudge often gets the reply.', ref: { contactId: c.id, companyId: c.companyId }, impact: 1, effort: 1, payload: { body: 'Hi ' + E.firstName(c.name) + ', just bumping this in case it got buried - would love to connect when you have a moment. Thanks!' } });
    });
    st.jobs.filter((j) => j.status === 'interview' || j.status === 'screening').forEach((j) => {
      if (!exists(st, 'interview-prep', 'jobId', j.id))
        mk({ type: 'interview-prep', title: 'Prepare for ' + j.company + ' interview', detail: 'Build a prep sheet: likely questions, matching STAR stories, questions to ask, and company research.', ref: { jobId: j.id, companyId: j.companyId }, impact: 3, effort: 2, autoApprove: auto.drafts === 'auto' });
    });
    const ins = E.insights(st);
    ins.gaps.filter((g2) => g2.count >= 2 || g2.must >= 1).slice(0, 3).forEach((g2) => {
      if (st.learning.some((l) => lc(l.skill) === lc(g2.name)) || exists(st, 'learn-skill', 'skill', g2.name)) return;
      mk({ type: 'learn-skill', title: 'Close a skill gap: ' + g2.name, detail: 'Appears in ' + WP.plural(g2.count, 'saved job') + (g2.must ? ' (' + g2.must + ' as a must-have)' : '') + '. Adding it to your learning plan builds a credible story.', payload: { skill: g2.name, resource: '' }, ref: {}, impact: g2.must ? 2 : 1, effort: 3 });
    });
    return out;
  };
  P.run = function (st, opts) {
    const drafts = P.suggest(st); let added = 0;
    drafts.forEach((dft) => {
      const auto = dft.autoApprove; delete dft.autoApprove;
      const now = WP.d.now();
      st.actions.unshift(Object.assign({ id: WP.uid('act'), createdAt: now, updatedAt: now, status: auto ? 'approved' : 'pending', decidedAt: auto ? now : '', doneAt: '', autoApproved: !!auto }, dft));
      added++;
    });
    if (!opts || !opts.silent) WP.store.save();
    return added;
  };
  E.planner = P;

  E.ACTION_META = {
    'save-job': { label: 'Save job', icon: 'briefcase', tier: 2 }, 'add-contact': { label: 'Add contact', icon: 'user', tier: 2 }, 'add-company': { label: 'Add company', icon: 'building', tier: 2 },
    'research-company': { label: 'Research', icon: 'search', tier: 1 }, 'find-people': { label: 'Find people', icon: 'users', tier: 1 }, 'tailor-resume': { label: 'Tailor resume', icon: 'file', tier: 1 },
    apply: { label: 'Apply', icon: 'send', tier: 3 }, 'send-outreach': { label: 'Send message', icon: 'chat', tier: 3 }, 'follow-up': { label: 'Follow up', icon: 'refresh', tier: 3 },
    'interview-prep': { label: 'Interview prep', icon: 'mic', tier: 1 }, 'learn-skill': { label: 'Learn skill', icon: 'book', tier: 1 }, custom: { label: 'Task', icon: 'flag', tier: 1 },
  };

  /* ===================================================== autofill bookmarklet */
  E.autofillData = function (answers) {
    const qs = (K().appQuestions || []).filter((q) => answers[q.key] && q.hints && q.hints.length && q.type !== 'textarea');
    const generic = ['fullName', 'preferredName'];
    qs.sort((a, b) => (generic.includes(a.key) ? 1 : 0) - (generic.includes(b.key) ? 1 : 0));
    return qs.map((q) => ({ h: q.hints.map(lc), v: String(answers[q.key]) }));
  };
  /* Runs on a job application page (as a bookmarklet) or on Waypoint's demo form. Never submits. */
  const AUTOFILL_FN = function (D) {
      var n = 0, skip = ['hidden', 'submit', 'button', 'file', 'checkbox', 'radio', 'password', 'image', 'reset'];
      function setv(el, v) {
        var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        var setter = Object.getOwnPropertyDescriptor(proto, 'value').set; setter.call(el, v);
        el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); el.dispatchEvent(new Event('blur', { bubbles: true }));
        el.style.outline = '2px solid #22c55e'; el.style.backgroundColor = '#f0fdf4'; n++;
      }
      function text(el) {
        var t = [el.name, el.id, el.placeholder, el.getAttribute('aria-label'), el.getAttribute('autocomplete'), el.getAttribute('data-automation-id'), el.getAttribute('data-qa')];
        if (el.id) { try { var l = document.querySelector('label[for="' + CSS.escape(el.id) + '"]'); if (l) t.push(l.textContent); } catch (e) {} }
        var pl = el.closest('label'); if (pl) t.push(pl.textContent);
        var lb = el.getAttribute('aria-labelledby'); if (lb) lb.split(' ').forEach(function (i) { var e2 = document.getElementById(i); if (e2) t.push(e2.textContent); });
        var par = el.parentElement;
        for (var k = 0; k < 3 && par; k++) { var lab = par.querySelector('label,legend'); if (lab && !lab.contains(el)) { t.push(lab.textContent); break; } par = par.parentElement; }
        return t.filter(Boolean).join(' | ').toLowerCase().replace(/\s+/g, ' ');
      }
      function scan(doc) {
        [].slice.call(doc.querySelectorAll('input,textarea,select')).forEach(function (el) {
          var ty = (el.type || '').toLowerCase();
          if (el.tagName === 'TEXTAREA' || el.disabled || el.readOnly || skip.indexOf(ty) > -1 || (el.value && el.tagName !== 'SELECT') || el.offsetParent === null || (el.closest && el.closest('[data-wp-skip]'))) return;
          var lab = text(el);
          for (var i = 0; i < D.length; i++) {
            var f = D[i];
            if (f.h.some(function (hh) { return lab.indexOf(hh) > -1; })) {
              if (el.tagName === 'SELECT') {
                var want = f.v.toLowerCase(), opt = [].slice.call(el.options).filter(function (o) { var t2 = o.text.toLowerCase().trim(); return t2 && (t2 === want || t2.indexOf(want) === 0 || want.indexOf(t2) === 0); })[0];
                if (opt && el.value !== opt.value) setv(el, opt.value);
              } else setv(el, f.v);
              break;
            }
          }
        });
      }
      scan(document);
      [].slice.call(document.querySelectorAll('iframe')).forEach(function (fr) { try { if (fr.contentDocument) scan(fr.contentDocument); } catch (e) {} });
      var b = document.createElement('div');
      b.textContent = 'Waypoint filled ' + n + ' field' + (n === 1 ? '' : 's') + ' (green). Review everything - you click Submit.';
      b.style.cssText = 'position:fixed;z-index:2147483647;bottom:16px;right:16px;background:#111827;color:#fff;padding:12px 16px;border-radius:10px;font:600 14px system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3)';
      document.body.appendChild(b); setTimeout(function () { b.remove(); }, 7000);
      return n;
    };
  E.bookmarklet = (answers) => 'javascript:(' + AUTOFILL_FN.toString().replace(/\n\s*/g, ' ') + ')(' + JSON.stringify(E.autofillData(answers)) + ');void 0';
  E.autofillRun = (answers) => AUTOFILL_FN(E.autofillData(answers));

  /* profile -> answer bank defaults */
  E.answerDefaults = function (p) {
    const parts = String(p.name || '').trim().split(/\s+/);
    const edu = (p.education || [])[0] || {};
    const locParts = String(p.location || '').split(',').map((x) => x.trim());
    return {
      firstName: parts[0] || '', lastName: parts.length > 1 ? parts.slice(1).join(' ') : '', fullName: p.name || '', email: p.email || '', phone: p.phone || '',
      city: locParts[0] || '', country: locParts.length > 1 ? locParts[locParts.length - 1] : '',
      linkedin: p.linkedin ? (/^https?:/.test(p.linkedin) ? p.linkedin : 'https://' + p.linkedin) : '', github: p.github ? (/^https?:/.test(p.github) ? p.github : 'https://' + p.github) : '',
      website: p.website || '', portfolio: p.website || '', currentCompany: p.currentCompany || '', currentTitle: p.currentTitle || '',
      yearsExperience: String(Math.floor(E.years(p)) || ''), highestEducation: edu.degree || '', school: edu.school || '', degree: edu.degree || '', graduationYear: edu.year || '',
      noticePeriod: p.noticePeriod || '', relocate: p.relocate ? 'Yes' : 'No', languages: (p.languages || []).join(', '),
      expectedSalary: p.salary && p.salary.expected ? String(p.salary.expected) : '', currentSalary: p.salary && p.salary.current ? String(p.salary.current) : '',
      remotePreference: (p.workModes || []).join(' / '),
    };
  };

  WP.engine = E;
})();
