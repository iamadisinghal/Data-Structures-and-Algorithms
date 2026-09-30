/* Waypoint <-> Claude.
   One task library, three ways to run it:
   1. In-app, with the user's own Anthropic API key (official TypeScript SDK loaded from a CDN).
   2. Copy/paste into Claude.ai (any plan) - the reply's JSON block is imported back.
   3. Claude Code - via the claude-workspace/ slash commands and the shared JSON file. */
(function () {
  'use strict';
  const WP = window.WP;
  const CL = {};
  const SDK_VERSION = '0.110.0';
  const SDK_URLS = [
    'https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@' + SDK_VERSION + '/+esm',
    'https://esm.sh/@anthropic-ai/sdk@' + SDK_VERSION,
  ];
  CL.MODELS = [
    { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 (recommended)', inPrice: 4, outPrice: 20 },
    { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 (faster, lower cost)', inPrice: 2, outPrice: 10 },
  ];
  CL.WEB_SEARCH_PRICE = 10 / 1000; // USD per search

  let SDK = null;
  async function loadSDK() {
    if (SDK) return SDK;
    let lastErr;
    for (const url of SDK_URLS) {
      try { const mod = await import(url); SDK = mod.default || mod.Anthropic; if (SDK) return SDK; } catch (e) { lastErr = e; }
    }
    const err = new Error('Could not load the Anthropic SDK from the CDN. Check your internet connection or firewall (cdn.jsdelivr.net / esm.sh).');
    err.cause = lastErr; err.code = 'SDK_LOAD';
    throw err;
  }
  CL.hasKey = () => !!(WP.store.getKey() || WP.store._volatileKey);
  async function client() {
    const key = WP.store.getKey() || WP.store._volatileKey;
    if (!key) { const e = new Error('Add your Anthropic API key in the With Claude hub first.'); e.code = 'NO_KEY'; throw e; }
    const Anthropic = await loadSDK();
    return new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true, maxRetries: 2 });
  }

  function friendly(err) {
    if (!err) return 'Unknown error';
    if (err.code === 'NO_KEY' || err.code === 'SDK_LOAD') return err.message;
    if (SDK) {
      if (err instanceof SDK.AuthenticationError) return 'Your API key was rejected. Check it in the With Claude hub.';
      if (err instanceof SDK.PermissionDeniedError) return 'This API key is not allowed to use that feature or model. (Web search may need to be enabled by your organization admin in the Claude Console.)';
      if (err instanceof SDK.RateLimitError) return 'Rate limit reached - wait a minute and try again.';
      if (err instanceof SDK.BadRequestError) return 'The request was rejected: ' + (err.message || 'bad request');
      if (err instanceof SDK.APIConnectionError) return 'Could not reach the Claude API. Check your connection, VPN or proxy.';
      if (err instanceof SDK.APIError) return 'Claude API error ' + (err.status || '') + ': ' + err.message;
    }
    if (err.name === 'AbortError') return 'Stopped.';
    return err.message || String(err);
  }
  CL.friendly = friendly;

  /** Run a prompt with streaming. Returns { text, json, usage, costUSD, model, searches }. */
  CL.run = async function (req, cb) {
    cb = cb || {};
    const c = await client();
    const cfg = WP.store.state.settings.claude;
    const model = cfg.model || 'claude-opus-5-5';
    const params = {
      model,
      max_tokens: req.maxTokens || 32000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: req.system,
      messages: [{ role: 'user', content: req.user }],
      output_config: { effort: req.effort || cfg.effort || 'medium' },
    };
    const useWeb = req.web && cfg.webSearch !== false;
    if (useWeb) params.tools = [{ type: 'web_search_20260209', name: 'web_search', max_uses: req.maxSearches || 6 }];
    if (req.schema && !useWeb) params.output_config.format = { type: 'json_schema', schema: req.schema };
    let text = '', searches = 0; const usage = { input: 0, output: 0, cacheRead: 0 };
    const queries = [];
    let final = null;
    for (let turn = 0; turn < 6; turn++) {
      const stream = c.beta.messages.stream(params, { signal: cb.signal });
      stream.on('text', (delta) => { text += delta; if (cb.onText) cb.onText(delta, text); });
      stream.on('contentBlock', (block) => {
        if (block && block.type === 'server_tool_use' && block.name === 'web_search') {
          const q = block.input && block.input.query; if (q) { queries.push(q); if (cb.onStatus) cb.onStatus('Searching the web: "' + q + '"'); }
        } else if (block && block.type === 'web_search_tool_result' && cb.onStatus) cb.onStatus('Reading results...');
      });
      const msg = await stream.finalMessage();
      usage.input += msg.usage.input_tokens || 0; usage.output += msg.usage.output_tokens || 0; usage.cacheRead += msg.usage.cache_read_input_tokens || 0;
      if (msg.usage.server_tool_use && msg.usage.server_tool_use.web_search_requests) searches += msg.usage.server_tool_use.web_search_requests;
      if (msg.stop_reason === 'pause_turn') { params.messages = params.messages.concat([{ role: 'assistant', content: msg.content }]); if (cb.onStatus) cb.onStatus('Continuing research...'); continue; }
      if (msg.stop_reason === 'refusal') {
        const det = msg.stop_details || {};
        const e = new Error('Claude declined this request' + (det.explanation ? ': ' + det.explanation : '.')); e.code = 'REFUSAL'; throw e;
      }
      final = msg; break;
    }
    if (final && final.stop_reason === 'max_tokens' && cb.onStatus) cb.onStatus('Output hit the length limit - result may be cut off.');
    const m = CL.MODELS.find((x) => x.id === model) || CL.MODELS[0];
    const costUSD = (usage.input * m.inPrice + usage.output * m.outPrice) / 1e6 + searches * CL.WEB_SEARCH_PRICE;
    let json = null;
    if (req.schema || req.expectJSON) json = WP.extractJSON(text);
    return { text, json, usage, costUSD, model: final ? final.model : model, searches, queries };
  };

  CL.test = async function () {
    const c = await client();
    const cfg = WP.store.state.settings.claude;
    const msg = await c.beta.messages.create({
      model: cfg.model || 'claude-opus-5-5', max_tokens: 64, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default',
      output_config: { effort: 'low' }, messages: [{ role: 'user', content: 'Reply with exactly: Waypoint connected.' }],
    });
    return msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
  };

  /* ================================================================ context */
  const P = () => WP.store.state.profile;
  CL.ctx = {
    profile(p) {
      p = p || P();
      return {
        name: p.name, headline: p.headline, location: p.location, currentTitle: p.currentTitle, currentCompany: p.currentCompany,
        yearsExperience: WP.engine.years(p), targetTitles: p.targetTitles, targetLocations: p.targetLocations, workModes: p.workModes,
        noticePeriod: p.noticePeriod, summary: p.summary, skills: p.skills,
        experience: (p.experience || []).map((e) => ({ title: e.title, company: e.company, location: e.location, dates: WP.engine.fmtRange(e), bullets: e.bullets })),
        projects: (p.projects || []).map((x) => ({ name: x.name, description: x.description, bullets: x.bullets })),
        education: (p.education || []).map((e) => ({ degree: e.degree, school: e.school, year: e.year })),
        certifications: p.certifications, achievements: p.achievements, languages: p.languages,
        careerSwitch: p.careerSwitch && p.careerSwitch.active ? { from: (WP.engine.family(p.careerSwitch.fromFamily) || {}).name, to: (WP.engine.family(p.careerSwitch.toFamily) || {}).name, motivation: p.careerSwitch.motivation } : undefined,
      };
    },
    job(j) { return j ? { id: j.id, title: j.title, company: j.company, location: j.location, workMode: j.workMode, url: j.url, salary: j.salaryMin || j.salaryMax ? [j.salaryMin, j.salaryMax, j.currency].join(' ') : undefined, description: j.description } : null; },
    company(c) { return c ? { id: c.id, name: c.name, domain: c.domain, industry: c.industry, tier: c.tier, research: c.research } : null; },
    contact(c) { return c ? { id: c.id, name: c.name, title: c.title, company: c.company, relationship: c.relationship, warmth: c.warmth, status: c.status, notes: c.notes } : null; },
    pipeline(st) {
      st = st || WP.store.state;
      return {
        today: WP.d.today(), weeklyGoals: st.settings.weeklyGoals, thisWeek: WP.engine.weekCounts(st),
        jobs: st.jobs.map((j) => ({ id: j.id, title: j.title, company: j.company, companyId: j.companyId, status: j.status, match: j.match, appliedAt: j.appliedAt, hasTailoredResume: !!j.resumeId })),
        contacts: st.contacts.map((c) => ({ id: c.id, name: c.name, company: c.company, companyId: c.companyId, relationship: c.relationship, warmth: c.warmth, status: c.status, lastContacted: c.lastContacted })),
        companies: st.companies.map((c) => ({ id: c.id, name: c.name, tier: c.tier, status: c.status, researched: !!(c.research && (c.research.mission || c.research.news)) })),
        pendingActions: st.actions.filter((a) => a.status === 'pending').map((a) => a.title),
        skillGaps: WP.engine.insights(st).gaps.slice(0, 8).map((g) => g.name),
      };
    },
  };
  const J = (o) => JSON.stringify(o, null, 1);

  const SYSTEM = [
    'You are Waypoint, a career copilot working on behalf of the job seeker described in the context.',
    'Rules:',
    '1. Honesty first: never invent employers, titles, dates, degrees, certifications, metrics or skills. Tailoring means selecting, ordering and rephrasing TRUE facts from the profile. If a number would help but is not in the profile, write [add metric] instead of making one up. Skills the person lacks are gaps - never claim them.',
    '2. Privacy: when you search the web, search for companies, roles, markets and people\'s public professional information. Never search for the user\'s own personal details. For people, use only public professional info (name, title, company, public profile URL) - no personal contact details, addresses or family information.',
    '3. You propose, the user decides: anything that would send a message, submit an application or change the user\'s records is returned as a proposal for them to approve. Never claim you sent or submitted anything.',
    '4. Be specific and concise. Cite sources (URL) for facts found on the web, with dates where relevant.',
    '5. When a JSON block is requested, end your answer with exactly one ```json fenced block matching the requested shape. Use empty strings or empty arrays for unknown values - never placeholders like "N/A".',
  ].join('\n');
  CL.SYSTEM = SYSTEM;

  /* ================================================================ tasks */
  const S = {
    str: { type: 'string' }, num: { type: 'number' }, bool: { type: 'boolean' },
    arr: (items) => ({ type: 'array', items }), obj: (props, req) => ({ type: 'object', properties: props, required: req || Object.keys(props), additionalProperties: false }),
  };
  const RESUME_DATA = S.obj({
    headline: S.str, summary: S.str, skills: S.arr(S.str),
    experience: S.arr(S.obj({ title: S.str, company: S.str, location: S.str, dates: S.str, bullets: S.arr(S.str) })),
    projects: S.arr(S.obj({ name: S.str, description: S.str, bullets: S.arr(S.str) })),
    certifications: S.arr(S.str),
  });

  CL.TASKS = {
    'parse-resume': {
      label: 'Parse my resume into a structured profile', icon: 'file', web: false, effort: 'low', needs: [], output: 'json', cc: '/profile',
      desc: 'Claude reads your pasted resume and extracts experience, skills, education and more - more accurately than the offline parser.',
      schema: S.obj({
        name: S.str, headline: S.str, location: S.str, linkedin: S.str, github: S.str, website: S.str, currentTitle: S.str, currentCompany: S.str, yearsExperience: S.num, summary: S.str,
        skills: S.arr(S.str),
        experience: S.arr(S.obj({ title: S.str, company: S.str, location: S.str, start: S.str, end: S.str, current: S.bool, bullets: S.arr(S.str) })),
        education: S.arr(S.obj({ degree: S.str, school: S.str, year: S.str, details: S.str })),
        projects: S.arr(S.obj({ name: S.str, link: S.str, description: S.str, bullets: S.arr(S.str) })),
        certifications: S.arr(S.str), achievements: S.arr(S.str), languages: S.arr(S.str),
      }),
      build: (x) => ({ system: SYSTEM, user: 'Extract a structured profile from this resume. Keep bullets verbatim (fix only obvious typos). Dates as YYYY-MM; end = "" and current = true for the current role. Skills: canonical names (e.g. "Microsoft Excel", "Power BI").\n\nReturn JSON with keys: name, headline, location, linkedin, github, website, currentTitle, currentCompany, yearsExperience, summary, skills[], experience[{title, company, location, start, end, current, bullets[]}], education[{degree, school, year, details}], projects[{name, link, description, bullets[]}], certifications[], achievements[], languages[].\n\nRESUME:\n"""\n' + (x.text || P().rawResume || '') + '\n"""' }),
    },
    'improve-bullets': {
      label: 'Rewrite my weakest resume bullets', icon: 'wand', web: false, effort: 'medium', needs: [], output: 'json', cc: '/profile',
      desc: 'Claude rewrites weak bullets into impact statements - using only facts you gave. Missing numbers become [add metric].',
      schema: S.obj({ bullets: S.arr(S.obj({ role: S.str, original: S.str, improved: S.str, why: S.str })) }),
      build: () => {
        const p = P();
        const weak = [];
        (p.experience || []).forEach((e) => (e.bullets || []).forEach((b) => { const bi = WP.engine.bullet(b); if (bi.quality !== 'strong') weak.push({ role: e.title + ' @ ' + e.company, original: b, issues: bi.tips }); }));
        return { system: SYSTEM, user: 'Rewrite these resume bullets as strong, specific impact statements (action verb + what + measurable result). Use ONLY facts present in the original bullet and the profile; where a result number is missing write [add metric]. Keep each under 30 words.\n\nPROFILE:\n' + J(CL.ctx.profile()) + '\n\nBULLETS TO IMPROVE:\n' + J(weak.slice(0, 25)) + '\n\nReturn JSON: {"bullets":[{"role","original","improved","why"}]} with "original" copied exactly.' };
      },
    },
    'market-scan': {
      label: 'Scan the job market for my target role', icon: 'trending', web: true, effort: 'medium', needs: [], output: 'json', expectJSON: true, maxSearches: 8, cc: '/market-scan',
      desc: 'Live web research: demand, salary ranges (with sources), most-requested skills and companies hiring for your target role and location.',
      build: (x) => {
        const p = P(); const role = x.role || (p.targetTitles || [])[0] || p.currentTitle; const loc = x.location || (p.targetLocations || []).join(' / ') || p.location;
        return { system: SYSTEM, user: 'Research the current job market for "' + role + '" in ' + loc + ' (work modes: ' + (p.workModes || []).join(', ') + ').\n\nCover: 1) demand and hiring trends (last 6-12 months), 2) typical salary ranges with sources and dates, 3) the 10-15 most requested skills, 4) 8-12 companies actively hiring for this role that fit this candidate, with why, 5) how this candidate compares and the top 3 gaps to close.\n\nCANDIDATE:\n' + J(CL.ctx.profile()) + '\n\nWrite a concise markdown report, then end with:\n```json\n{"companies":[{"name":"","domain":"","industry":"","size":"","location":"","why":""}],"topSkills":[{"name":"","demand":"high|medium|low"}],"salary":{"currency":"","low":0,"median":0,"high":0,"source":""},"gaps":[""]}\n```' };
      },
    },
    'research-company': {
      label: 'Research a company', icon: 'building', web: true, effort: 'medium', needs: ['company'], output: 'json', expectJSON: true, maxSearches: 6, cc: '/research-company',
      desc: 'Mission, products, recent news, culture signals, interview process, salary signals and key people - with sources.',
      build: (x) => ({ system: SYSTEM, user: 'Research ' + x.company.name + (x.company.domain && !/\.example$/.test(x.company.domain) ? ' (' + x.company.domain + ')' : '') + ' for a job seeker targeting: ' + ((P().targetTitles || []).join(', ') || P().currentTitle) + '.\n\nFind: mission; main products/services; notable news from the last 12 months (dated); culture signals (reviews, values, work style); typical interview process for this kind of role; salary signals for the target role; key people relevant to the target team (public info only); and likely team pain points where this candidate can help.\n\nCANDIDATE:\n' + J(CL.ctx.profile()) + '\n\nWrite a brief markdown briefing (with source links), then end with:\n```json\n{"mission":"","products":"","news":"","culture":"","interviewProcess":"","salaryRange":"","keyPeople":"","painPoints":"","sources":[""]}\n```' }),
    },
    'find-jobs': {
      label: 'Find live job openings for me', icon: 'search', web: true, effort: 'medium', needs: [], output: 'json', expectJSON: true, maxSearches: 10, cc: '/find-jobs',
      desc: 'Searches company career sites and applicant-tracking systems (Greenhouse, Lever, Workday, Ashby...) plus job boards, then scores each opening against you.',
      build: (x) => {
        const p = P(); const st = WP.store.state;
        const known = st.jobs.map((j) => j.company + ' - ' + j.title);
        return { system: SYSTEM, user: 'Find 8-12 CURRENT job openings that fit this candidate. Target titles: ' + ((p.targetTitles || []).join(', ') || p.currentTitle) + '. Locations: ' + ((p.targetLocations || []).join(', ') || p.location) + '. Work modes: ' + (p.workModes || []).join(', ') + (x.extra ? '. Extra criteria: ' + x.extra : '') + '.\n\nPrefer postings from company career pages and ATS boards (site:boards.greenhouse.io, site:jobs.lever.co, site:myworkdayjobs.com, site:jobs.ashbyhq.com) and reputable boards. Only include postings you actually found, with a working URL. Skip these already-tracked jobs: ' + J(known) + '.\n\nCANDIDATE:\n' + J(CL.ctx.profile()) + '\n\nWrite a short ranked markdown table (title, company, location, why it fits, fit 0-100), then end with:\n```json\n{"jobs":[{"title":"","company":"","location":"","workMode":"remote|hybrid|onsite|","url":"","source":"","postedAt":"","salaryMin":0,"salaryMax":0,"currency":"","description":"key responsibilities and requirements as found in the posting","fit":0,"why":""}]}\n```' };
      },
    },
    'analyze-job': {
      label: 'Deep-analyze this job vs my profile', icon: 'target', web: false, effort: 'medium', needs: ['job'], output: 'json', cc: '/analyze-job',
      desc: 'Must-haves vs nice-to-haves, honest match score with reasoning, gaps and how to address them, red flags and keywords to mirror.',
      schema: S.obj({ score: S.num, summary: S.str, mustHave: S.arr(S.str), niceToHave: S.arr(S.str), matched: S.arr(S.str), gaps: S.arr(S.obj({ skill: S.str, mitigation: S.str })), redFlags: S.arr(S.str), keywords: S.arr(S.str), interviewFocus: S.arr(S.str) }),
      build: (x) => ({ system: SYSTEM, user: 'Analyze how well this candidate fits this job. Be honest and specific.\n\nJOB:\n' + J(CL.ctx.job(x.job)) + '\n\nCANDIDATE:\n' + J(CL.ctx.profile()) + '\n\nReturn JSON: {"score":0-100,"summary":"2-3 sentences","mustHave":[],"niceToHave":[],"matched":[],"gaps":[{"skill","mitigation"}],"redFlags":[],"keywords":["phrases to mirror if true"],"interviewFocus":["topics they will probe"]}' }),
    },
    'tailor-resume': {
      label: 'Tailor my resume for this job', icon: 'file', web: false, effort: 'high', needs: ['job'], output: 'json', cc: '/tailor-resume',
      desc: 'An ATS-friendly resume built only from your true experience: reordered, rephrased and focused on this job\'s requirements - with a change log.',
      schema: S.obj({ resume: RESUME_DATA, changes: S.arr(S.str), missingKeywords: S.arr(S.str) }),
      build: (x) => ({ system: SYSTEM, user: 'Tailor this candidate\'s resume for the job below. Keep it truthful: select, reorder and rephrase facts from the profile; mirror the job\'s language only where it accurately describes the candidate; never add skills or metrics they do not have ([add metric] where a number would help). Aim for 1-2 pages: most recent role 4-6 bullets, older roles 2-4. Headline should mirror the job title if accurate.\n\nJOB:\n' + J(CL.ctx.job(x.job)) + '\n\nCANDIDATE PROFILE:\n' + J(CL.ctx.profile()) + '\n\nReturn JSON: {"resume":{"headline","summary","skills":[],"experience":[{"title","company","location","dates","bullets":[]}],"projects":[{"name","description","bullets":[]}],"certifications":[]},"changes":["what you changed and why"],"missingKeywords":["job requirements the candidate genuinely lacks"]}' }),
    },
    'cover-letter': {
      label: 'Write a cover letter for this job', icon: 'mail', web: false, effort: 'medium', needs: ['job'], output: 'text', cc: '/cover-letter',
      desc: 'A specific, 250-350 word letter using your real achievements and any company research you have saved.',
      build: (x) => {
        const co = x.job.companyId ? WP.store.get('companies', x.job.companyId) : null;
        return { system: SYSTEM, user: 'Write a ' + (x.tone || 'professional') + ' cover letter (250-350 words) for this job. Open with a specific hook about the company, connect 2-3 of the candidate\'s real achievements to the job\'s top requirements, address one gap honestly if relevant, and close with a clear call to action. No clichés ("I am writing to express my interest"). Plain text only, ready to paste, signed with the candidate\'s name.\n\nJOB:\n' + J(CL.ctx.job(x.job)) + '\n\nCOMPANY RESEARCH:\n' + J(co ? co.research : {}) + '\n\nCANDIDATE:\n' + J(CL.ctx.profile()) };
      },
    },
    'find-people': {
      label: 'Find people to contact at a company', icon: 'users', web: true, effort: 'medium', needs: ['company'], output: 'json', expectJSON: true, maxSearches: 8, cc: '/find-people',
      desc: 'Recruiters, likely hiring managers, team members, alumni of your schools and ex-colleagues - public professional info only.',
      build: (x) => {
        const p = P();
        return { system: SYSTEM, user: 'Find 5-10 people at ' + x.company.name + ' this candidate could reach out to about ' + ((x.job && x.job.title) || (p.targetTitles || [])[0] || 'roles') + ' opportunities: recruiters/talent partners, the likely hiring manager(s), team members in similar roles, alumni of ' + ((p.education || []).map((e) => e.school).filter(Boolean).join(' / ') || 'their schools') + ', and former colleagues from ' + ((p.experience || []).map((e) => e.company).filter(Boolean).join(' / ') || 'their past employers') + '. Use public professional information only (name, current title, public profile URL). Do not include personal emails or phone numbers.\n\nWrite a markdown table (name, title, why relevant, suggested approach), then end with:\n```json\n{"contacts":[{"name":"","title":"","company":"' + x.company.name + '","relationship":"recruiter|hiring-manager|employee|alumni|colleague","linkedin":"","source":"","why":"","approach":""}]}\n```' };
      },
    },
    'outreach': {
      label: 'Draft personalized outreach', icon: 'chat', web: false, effort: 'medium', needs: ['contact'], output: 'json', cc: '/outreach',
      desc: 'Three tailored message options for this person (connection note under 300 characters, a longer message, and a follow-up). You send them yourself.',
      schema: S.obj({ messages: S.arr(S.obj({ type: S.str, channel: S.str, subject: S.str, body: S.str })) }),
      build: (x) => ({ system: SYSTEM, user: 'Draft outreach from the candidate to this person. Make it specific, warm and brief; reference the shared connection point (company, school, past employer, role) and one concrete, true strength of the candidate. Provide exactly 3 options: (1) a LinkedIn connection note under 280 characters, (2) a longer LinkedIn message or email with subject (under 120 words) - a referral ask if they are a former colleague or friend, otherwise an informational/recruiter ask, (3) a polite follow-up to send after 5-7 days of silence.\n\nPERSON:\n' + J(CL.ctx.contact(x.contact)) + (x.job ? '\n\nRELATED JOB:\n' + J({ title: x.job.title, company: x.job.company, url: x.job.url }) : '') + '\n\nCANDIDATE:\n' + J(CL.ctx.profile()) + '\n\nReturn JSON: {"messages":[{"type":"connection|referral|recruiter|informational|hiring-manager|follow-up","channel":"linkedin|email","subject":"","body":""}]}' }),
    },
    'interview-prep': {
      label: 'Build an interview prep sheet', icon: 'mic', web: true, effort: 'medium', needs: ['job'], output: 'text', maxSearches: 5, cc: '/interview-prep',
      desc: 'Company briefing, the questions they are likely to ask, which of your STAR stories to use for each, gaps to prepare for and smart questions to ask.',
      build: (x) => ({ system: SYSTEM, user: 'Create an interview prep sheet (markdown) for this candidate and job. Include: 1) a 5-bullet company briefing with recent news (cite sources), 2) the interview process if public, 3) 12 likely questions (behavioral + role-specific) and for each, which of the candidate\'s STAR stories fits best or what story they still need, 4) tough questions about their gaps with honest answer strategies, 5) 6 sharp questions to ask the interviewers, 6) a 30-60-90 day plan outline.\n\nJOB:\n' + J(CL.ctx.job(x.job)) + '\n\nSTAR STORIES:\n' + J(WP.store.state.stories.map((s) => ({ title: s.title, situation: s.situation, action: s.action, result: s.result, competencies: s.competencies }))) + '\n\nCANDIDATE:\n' + J(CL.ctx.profile()) }),
    },
    'negotiate': {
      label: 'Plan my salary negotiation', icon: 'dollar', web: true, effort: 'high', needs: [], output: 'text', maxSearches: 5, cc: '/negotiate',
      desc: 'Market data with sources, a recommended counter-offer range, word-for-word email and phone scripts, and your walk-away point.',
      build: () => {
        const st = WP.store.state;
        return { system: SYSTEM, user: 'Help this candidate negotiate. Research current market pay for their target role and location (cite sources), compare their offers, recommend a counter-offer range and priorities (base, bonus, equity, joining bonus, start date, remote, title, learning budget), and write (a) an email script and (b) a phone script, plus a walk-away point based on their stated minimum. Never suggest lying about competing offers.\n\nOFFERS:\n' + J(st.offers) + '\n\nSALARY EXPECTATIONS:\n' + J(st.profile.salary) + '\n\nCANDIDATE:\n' + J(CL.ctx.profile()) };
      },
    },
    'weekly-plan': {
      label: 'Plan my week (creates approval cards)', icon: 'calendar', web: false, effort: 'medium', needs: [], output: 'json', cc: '/weekly-plan',
      desc: 'Claude reviews your whole pipeline against your weekly goals and proposes a prioritized set of actions for your Approval Queue.',
      schema: S.obj({ summary: S.str, actions: S.arr(S.obj({ type: S.str, title: S.str, detail: S.str, jobId: S.str, contactId: S.str, companyId: S.str, impact: S.num, effort: S.num, skill: S.str, body: S.str })) }),
      build: () => ({ system: SYSTEM, user: 'Act as this candidate\'s job-search coach. Review their pipeline against weekly goals and propose 6-12 prioritized actions for this week. Allowed types: tailor-resume, apply, find-people, research-company, send-outreach, follow-up, interview-prep, learn-skill, custom. Reference existing ids (jobId/contactId/companyId) where relevant; leave "" otherwise. impact and effort are 1-3. For learn-skill set "skill"; for send-outreach and follow-up put a ready-to-send draft in "body" (otherwise ""). Do not duplicate pending actions.\n\nPIPELINE:\n' + J(CL.ctx.pipeline()) + '\n\nCANDIDATE:\n' + J({ targetTitles: P().targetTitles, targetLocations: P().targetLocations, skills: P().skills, yearsExperience: WP.engine.years(P()) }) + '\n\nReturn JSON: {"summary":"2 sentences","actions":[{"type","title","detail","jobId","contactId","companyId","impact","effort","skill","body"}]}' }),
    },
    'switch-plan': {
      label: 'Plan my career switch', icon: 'route', web: true, effort: 'high', needs: [], output: 'text', maxSearches: 5, cc: '/market-scan',
      desc: 'Transferable strengths, honest gaps, bridge roles, a 90-day learning and portfolio plan, and how to tell your switch story.',
      build: () => ({ system: SYSTEM, user: 'This candidate wants to switch careers. Using current market information (cite sources), write a markdown plan: 1) realistic target and bridge roles, 2) transferable strengths with evidence from their profile, 3) the most important gaps and the fastest credible way to close each, 4) a 12-week plan (learning, 1-2 portfolio projects, networking, applications), 5) how to reframe their resume headline and summary, 6) a 60-second "why I am switching" story.\n\nCANDIDATE:\n' + J(CL.ctx.profile()) }),
    },
  };

  /* ====================================================== Claude.ai bridge */
  CL.chatPrompt = function (taskId, x) {
    const t = CL.TASKS[taskId]; const b = t.build(x || {});
    let jsonHint = '';
    if (t.schema && t.output === 'json') jsonHint = '\n\nEnd your reply with ONE ```json fenced block that matches the JSON shape described above, so I can import it into my Waypoint app.';
    return '# Instructions\n' + b.system + '\n\n# Task\n' + b.user + jsonHint + (t.web ? '\n\n(Use web search if it is available to you. If it is not, say so and do your best from what you know, flagging anything that may be outdated.)' : '');
  };

  CL.contextPack = function () {
    const st = WP.store.state; const p = st.profile;
    const lines = [];
    lines.push('# Waypoint Context Pack - ' + (p.name || 'Job seeker'));
    lines.push('_Generated ' + WP.d.fmtLong(WP.d.today()) + '. Upload this file to a Claude Project ("Project knowledge") so every chat knows your background and pipeline. Contact details are intentionally excluded._\n');
    lines.push('## Goals');
    lines.push('- Target titles: ' + ((p.targetTitles || []).join(', ') || '-'));
    lines.push('- Locations: ' + ((p.targetLocations || []).join(', ') || '-') + ' | Work modes: ' + (p.workModes || []).join(', '));
    lines.push('- Notice period: ' + (p.noticePeriod || '-') + ' | Expected salary: ' + (p.salary && p.salary.expected ? WP.money(p.salary.expected, p.salary.currency) : '-'));
    lines.push('- Weekly goals: ' + st.settings.weeklyGoals.applications + ' applications, ' + st.settings.weeklyGoals.outreach + ' outreach messages, ' + st.settings.weeklyGoals.followups + ' follow-ups');
    if (p.careerSwitch && p.careerSwitch.active) lines.push('- Career switch: ' + ((WP.engine.family(p.careerSwitch.fromFamily) || {}).name || '?') + ' -> ' + ((WP.engine.family(p.careerSwitch.toFamily) || {}).name || '?') + ' (' + (p.careerSwitch.motivation || '') + ')');
    lines.push('\n## Profile');
    lines.push('**' + (p.name || '') + '** - ' + (p.headline || p.currentTitle || '') + ' | ' + (p.location || '') + ' | ~' + WP.engine.years(p) + ' years');
    if (p.summary) lines.push('\n' + p.summary);
    lines.push('\n**Skills:** ' + (p.skills || []).join(', '));
    lines.push('\n### Experience');
    (p.experience || []).forEach((e) => { lines.push('\n**' + e.title + '** - ' + e.company + (e.location ? ', ' + e.location : '') + ' (' + WP.engine.fmtRange(e) + ')'); (e.bullets || []).forEach((b) => lines.push('- ' + b)); });
    if ((p.projects || []).length) { lines.push('\n### Projects'); p.projects.forEach((x) => { lines.push('- **' + x.name + '**: ' + (x.description || '') + ' ' + (x.bullets || []).join(' ')); }); }
    lines.push('\n### Education & certifications');
    (p.education || []).forEach((e) => lines.push('- ' + e.degree + ', ' + e.school + ' ' + (e.year || '')));
    (p.certifications || []).forEach((c) => lines.push('- ' + c));
    lines.push('\n## Pipeline');
    lines.push('| Job | Company | Status | Match | Applied |'); lines.push('|---|---|---|---|---|');
    st.jobs.forEach((j) => lines.push('| ' + j.title + ' | ' + j.company + ' | ' + j.status + ' | ' + (j.match || '-') + '% | ' + (j.appliedAt || '-') + ' |'));
    lines.push('\n## Target companies');
    st.companies.forEach((c) => lines.push('- **' + c.name + '** (tier ' + c.tier + ', ' + c.status + ')' + (c.research && c.research.mission ? ' - ' + c.research.mission : '')));
    lines.push('\n## Network');
    st.contacts.forEach((c) => lines.push('- ' + c.name + ' - ' + (c.title || '') + ' @ ' + (c.company || '') + ' (' + c.relationship + ', warmth ' + c.warmth + '/5, ' + c.status + ')'));
    lines.push('\n## STAR stories');
    st.stories.forEach((s) => lines.push('- **' + s.title + '**: S: ' + s.situation + ' T: ' + s.task + ' A: ' + s.action + ' R: ' + s.result));
    lines.push('\n## Job descriptions (saved)');
    st.jobs.filter((j) => j.description && !['rejected', 'withdrawn'].includes(j.status)).slice(0, 12).forEach((j) => { lines.push('\n### ' + j.title + ' - ' + j.company + ' [' + j.id + ']'); lines.push(j.description.slice(0, 3000)); });
    return lines.join('\n');
  };

  CL.PROJECT_INSTRUCTIONS = [
    'You are my job-search copilot. My background, goals, pipeline and saved job descriptions are in the "Waypoint Context Pack" file in this project.',
    '',
    'How to work with me:',
    '- Honesty: never invent employers, titles, dates, degrees, metrics or skills. Tailor by selecting, reordering and rephrasing what is true. Use [add metric] where a number is missing.',
    '- Propose, then wait: end each answer with numbered next steps and wait for me to reply like "go 1,3" before doing them.',
    '- Never claim you sent a message or submitted an application - I do that myself.',
    '- When I ask for something my Waypoint app can import (jobs, contacts, a tailored resume, outreach drafts, a weekly plan), end your reply with one ```json block in the shape I describe.',
    '- Use web search (when available) for companies, roles, salaries and public professional info about people. Cite sources with dates.',
    '- Be concise and specific. Prefer tables and checklists.',
  ].join('\n');

  WP.claude = CL;
})();
