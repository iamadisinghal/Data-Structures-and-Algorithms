/* Waypoint store: one JSON document, persisted to localStorage. Schema: docs/DATA-SCHEMA.md */
(function () {
  'use strict';
  const WP = window.WP;
  const KEY = 'waypoint.v1';
  const KEY_API = 'waypoint.claudeKey';
  const COLLECTIONS = ['companies', 'jobs', 'contacts', 'outreach', 'resumes', 'coverLetters', 'stories', 'offers', 'actions', 'reports'];
  const PREFIX = { companies: 'co', jobs: 'job', contacts: 'ct', outreach: 'out', resumes: 'res', coverLetters: 'cl', stories: 'st', offers: 'off', actions: 'act', reports: 'rep' };

  function blank() {
    const now = WP.d.now();
    return {
      version: 1,
      meta: { createdAt: now, updatedAt: now, demo: false, onboarded: false },
      settings: {
        mode: 'standalone', theme: 'system', region: 'global', currency: 'USD',
        weeklyGoals: { applications: 10, outreach: 15, followups: 5, learningHours: 3 },
        autonomy: { research: 'auto', drafts: 'auto', saveItems: 'ask', outreach: 'ask', applications: 'ask', followups: 'ask' },
        claude: { model: 'claude-opus-5-5', effort: 'medium', webSearch: true },
        matchThreshold: 60,
      },
      profile: {
        name: '', headline: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '',
        currentTitle: '', currentCompany: '', yearsExperience: 0,
        targetTitles: [], targetLocations: [], workModes: ['remote', 'hybrid'],
        salary: { current: 0, expected: 0, minimum: 0, currency: 'USD' },
        noticePeriod: '', workAuth: '', relocate: false, summary: '', skills: [],
        experience: [], education: [], projects: [], certifications: [], achievements: [], languages: [],
        rawResume: '', careerSwitch: { active: false, fromFamily: '', toFamily: '', motivation: '' },
        updatedAt: now,
      },
      companies: [], jobs: [], contacts: [], outreach: [], resumes: [], coverLetters: [],
      stories: [], answers: {}, offers: [], actions: [], activity: [], learning: [], reports: [],
    };
  }

  function normalize(s) {
    const b = blank();
    const out = Object.assign({}, b, s || {});
    out.meta = Object.assign({}, b.meta, out.meta);
    out.settings = Object.assign({}, b.settings, out.settings);
    out.settings.weeklyGoals = Object.assign({}, b.settings.weeklyGoals, out.settings.weeklyGoals);
    out.settings.autonomy = Object.assign({}, b.settings.autonomy, out.settings.autonomy);
    out.settings.autonomy.outreach = 'ask'; out.settings.autonomy.applications = 'ask';
    out.settings.claude = Object.assign({}, b.settings.claude, out.settings.claude);
    out.profile = Object.assign({}, b.profile, out.profile);
    out.profile.salary = Object.assign({}, b.profile.salary, out.profile.salary);
    out.profile.careerSwitch = Object.assign({}, b.profile.careerSwitch, out.profile.careerSwitch);
    ['targetTitles', 'targetLocations', 'workModes', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements', 'languages']
      .forEach((k) => { if (!Array.isArray(out.profile[k])) out.profile[k] = []; });
    COLLECTIONS.concat(['activity', 'learning']).forEach((k) => { if (!Array.isArray(out[k])) out[k] = []; });
    if (!out.answers || typeof out.answers !== 'object') out.answers = {};
    out.profile.experience.forEach((e) => { if (!e.id) e.id = WP.uid('exp'); if (!Array.isArray(e.bullets)) e.bullets = []; });
    out.profile.education.forEach((e) => { if (!e.id) e.id = WP.uid('edu'); });
    out.profile.projects.forEach((e) => { if (!e.id) e.id = WP.uid('prj'); if (!Array.isArray(e.bullets)) e.bullets = []; });
    out.jobs.forEach((j) => { if (!Array.isArray(j.events)) j.events = []; if (!Array.isArray(j.contactIds)) j.contactIds = []; });
    out.contacts.forEach((c) => { if (!Array.isArray(c.interactions)) c.interactions = []; });
    return out;
  }

  let storageOK = true;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? normalize(JSON.parse(raw)) : null;
    } catch (e) { storageOK = false; return null; }
  }

  const listeners = [];
  const store = {
    state: null,
    get storageOK() { return storageOK; },
    COLLECTIONS,
    init() {
      store.state = load() || blank();
      return store.state;
    },
    saveNow() {
      store.state.meta.updatedAt = WP.d.now();
      try { localStorage.setItem(KEY, JSON.stringify(store.state)); storageOK = true; }
      catch (e) { storageOK = false; WP.ui.toast('Could not save in this browser - export your data to keep it', 'bad'); }
      listeners.forEach((fn) => { try { fn(); } catch (err) { console.error(err); } });
    },
    on(fn) { listeners.push(fn); },
    touchProfile() { store.state.profile.updatedAt = WP.d.now(); store.save(); },

    /* collections */
    list(col) { return store.state[col]; },
    get(col, id) { return store.state[col].find((x) => x.id === id) || null; },
    add(col, item, opts) {
      const now = WP.d.now();
      const it = Object.assign({ id: WP.uid(PREFIX[col]), createdAt: now }, item, { updatedAt: now });
      if (!it.id) it.id = WP.uid(PREFIX[col]);
      if (col === 'jobs') { it.events = it.events || []; it.contactIds = it.contactIds || []; it.status = it.status || 'saved'; }
      if (col === 'contacts') { it.interactions = it.interactions || []; it.status = it.status || 'to-contact'; }
      store.state[col].unshift(it);
      if (!opts || !opts.silent) store.save();
      return it;
    },
    update(col, id, patch, opts) {
      const it = store.get(col, id); if (!it) return null;
      Object.assign(it, patch, { updatedAt: WP.d.now() });
      if (!opts || !opts.silent) store.save();
      return it;
    },
    remove(col, id) {
      store.state[col] = store.state[col].filter((x) => x.id !== id);
      if (col === 'jobs') store.state.actions = store.state.actions.filter((a) => !(a.ref && a.ref.jobId === id && a.status === 'pending'));
      if (col === 'contacts') store.state.actions = store.state.actions.filter((a) => !(a.ref && a.ref.contactId === id && a.status === 'pending'));
      store.save();
    },
    log(type, ref, note) {
      store.state.activity.push({ date: WP.d.today(), type, ref: ref || '', note: note || '' });
      if (store.state.activity.length > 3000) store.state.activity = store.state.activity.slice(-3000);
    },

    /* import / export */
    exportDoc() {
      const doc = JSON.parse(JSON.stringify(store.state));
      doc.exportedAt = WP.d.now();
      doc.exportedBy = 'waypoint-web';
      return doc;
    },
    importDoc(incoming, mode) {
      if (!incoming || typeof incoming !== 'object') throw new Error('Not a Waypoint JSON document');
      if (!incoming.profile && !incoming.jobs && !incoming.actions) throw new Error('This file does not look like Waypoint data');
      const inc = normalize(incoming);
      if (mode === 'replace') {
        const keepSettings = store.state.settings;
        store.state = inc;
        store.state.settings = Object.assign({}, inc.settings, { mode: keepSettings.mode, theme: keepSettings.theme });
        store.saveNow();
        return { replaced: true };
      }
      const summary = { added: 0, updated: 0, newActions: 0, profile: false };
      COLLECTIONS.forEach((col) => {
        const map = new Map(store.state[col].map((x) => [x.id, x]));
        inc[col].forEach((it) => {
          if (!it.id) it.id = WP.uid(PREFIX[col]);
          const cur = map.get(it.id);
          if (!cur) { store.state[col].push(it); summary.added++; if (col === 'actions' && it.status === 'pending') summary.newActions++; }
          else if ((it.updatedAt || '') > (cur.updatedAt || '')) { Object.assign(cur, it); summary.updated++; }
        });
      });
      if ((inc.profile.updatedAt || '') > (store.state.profile.updatedAt || '') && inc.profile.name) {
        store.state.profile = Object.assign({}, store.state.profile, inc.profile); summary.profile = true;
      }
      Object.keys(inc.answers).forEach((k) => { if (inc.answers[k] && !store.state.answers[k]) store.state.answers[k] = inc.answers[k]; });
      const seen = new Set(store.state.activity.map((a) => [a.date, a.type, a.ref, a.note].join('|')));
      inc.activity.forEach((a) => { const k = [a.date, a.type, a.ref, a.note].join('|'); if (!seen.has(k)) { store.state.activity.push(a); seen.add(k); } });
      const lseen = new Set(store.state.learning.map((l) => l.skill.toLowerCase()));
      inc.learning.forEach((l) => { if (l.skill && !lseen.has(l.skill.toLowerCase())) store.state.learning.push(l); });
      store.saveNow();
      return summary;
    },
    reset() { store.state = blank(); store.saveNow(); },

    /* Claude API key - stored separately, never exported */
    getKey() { try { return localStorage.getItem(KEY_API) || sessionStorage.getItem(KEY_API) || ''; } catch (e) { return ''; } },
    setKey(k, remember) {
      try {
        localStorage.removeItem(KEY_API); sessionStorage.removeItem(KEY_API);
        if (k) (remember ? localStorage : sessionStorage).setItem(KEY_API, k);
      } catch (e) { WP.ui.toast('Browser storage is blocked - the key will only last for this page', 'bad'); store._volatileKey = k; }
    },
  };
  store.save = WP.debounce(store.saveNow, 250);

  /* ----------------------------------------------------------- demo data */
  store.loadDemo = function () {
    const s = blank();
    const today = WP.d.today();
    const ago = (n) => WP.d.addDays(today, -n);
    const ts = (n) => new Date(Date.now() - n * 86400000).toISOString();
    s.meta.demo = true; s.meta.onboarded = true;
    s.settings.region = 'india'; s.settings.currency = 'INR';
    s.settings.mode = (store.state && store.state.settings.mode) || 'standalone';
    s.settings.theme = (store.state && store.state.settings.theme) || 'system';
    Object.assign(s.profile, {
      name: 'Alex Rivera', headline: 'Data Analyst | SQL, Python, Power BI | Turning retail data into decisions',
      email: 'alex.rivera@example.com', phone: '+91 98765 43210', location: 'Bengaluru, India',
      linkedin: 'linkedin.com/in/alex-rivera-demo', github: 'github.com/alex-rivera-demo', website: '',
      currentTitle: 'Data Analyst', currentCompany: 'Meridian Retail Group', yearsExperience: 7,
      targetTitles: ['Senior Data Analyst', 'Analytics Engineer', 'Product Analyst'],
      targetLocations: ['Bengaluru', 'Remote'], workModes: ['remote', 'hybrid'],
      salary: { current: 1600000, expected: 2400000, minimum: 2000000, currency: 'INR' },
      noticePeriod: '60 days', workAuth: 'Indian citizen - authorized to work in India', relocate: false,
      summary: 'Data analyst with 7 years of experience turning messy retail and financial data into dashboards, experiments and forecasts that leaders actually use.',
      skills: ['SQL', 'Python', 'Pandas', 'Power BI', 'Tableau', 'Business Intelligence', 'Microsoft Excel', 'Statistics', 'A/B Testing', 'dbt', 'Snowflake', 'Data Visualization', 'Stakeholder Management', 'ETL', 'Google Analytics', 'Data Modeling', 'Communication'],
      experience: [
        { id: 'exp_demo1', title: 'Data Analyst', company: 'Meridian Retail Group', location: 'Bengaluru', start: '2022-03', end: '', current: true, bullets: [
          'Built a self-serve Power BI sales dashboard suite used by 120+ regional managers, cutting ad-hoc reporting requests by 40%.',
          'Designed and analyzed 25+ A/B tests on pricing and promotions, informing changes that lifted average basket size by 6%.',
          'Automated weekly KPI reporting with Python and SQL, saving the analytics team about 10 hours per week.',
          'Responsible for data quality checks on the sales data warehouse.',
          'Partnered with category managers to define demand forecasting metrics and a shared KPI dictionary adopted by 4 teams.',
          'Migrated 30 legacy Excel reports to dbt models on Snowflake, cutting refresh time from 6 hours to 20 minutes.',
        ] },
        { id: 'exp_demo2', title: 'Business Analyst', company: 'Crestline Financial Services', location: 'Pune', start: '2020-01', end: '2022-02', current: false, bullets: [
          'Worked on customer churn analysis using SQL and Excel.',
          'Developed a churn-risk scoring model in Python (logistic regression) that helped retention teams save 1,800 at-risk accounts in one quarter.',
          'Created Tableau dashboards tracking loan portfolio health for 3 business units.',
          'Helped with requirements gathering for a CRM migration project.',
        ] },
        { id: 'exp_demo3', title: 'Analytics Intern', company: 'Brightside Consulting', location: 'Mumbai', start: '2019-06', end: '2019-12', current: false, bullets: [
          'Cleaned and analyzed survey data for 5 client engagements using Excel and SPSS.',
          'Assisted with market sizing models for a retail client.',
        ] },
      ],
      education: [{ id: 'edu_demo1', degree: 'B.Tech, Computer Science', school: 'Pune Institute of Technology', year: '2019', details: 'Minor in Statistics' }],
      projects: [{ id: 'prj_demo1', name: 'Open Retail Demand Forecast', link: 'github.com/alex-rivera-demo/retail-forecast', description: 'Weekly demand forecasting on public retail data.', bullets: ['Compared ARIMA, Prophet and gradient boosting; best model reduced MAPE to 8.4%.'] }],
      certifications: ['Google Data Analytics Professional Certificate', 'Microsoft Certified: Power BI Data Analyst Associate'],
      achievements: ['Meridian "Insight of the Year" award (2023)'],
      languages: ['English', 'Hindi', 'Spanish (basic)'],
      careerSwitch: { active: false, fromFamily: 'data-analytics', toFamily: 'data-engineering', motivation: 'Move closer to data platforms and analytics engineering.' },
      updatedAt: ts(3),
    });

    const co = (id, name, industry, tier, status, interest, fit, extra) => Object.assign({ id, name, domain: WP.slug(name).replace(/-/g, '') + '.example', industry, size: '', location: 'Bengaluru', tier, status, interest, fit, notes: '', research: { mission: '', products: '', news: '', culture: '', interviewProcess: '', salaryRange: '', keyPeople: '', sources: [] }, createdAt: ts(40), updatedAt: ts(10) }, extra || {});
    s.companies = [
      co('co_demo1', 'Northwind Analytics', 'SaaS / Analytics', 'A', 'applied', 5, 4, { size: '1,000-5,000', research: { mission: 'Make analytics accessible to every business team.', products: 'Self-serve BI platform, embedded analytics SDK.', news: 'Launched an AI-assisted query builder this quarter; expanding its Bengaluru R&D centre.', culture: 'Remote-friendly, writing culture, quarterly hack weeks.', interviewProcess: 'Recruiter screen -> SQL case (take-home) -> panel (stakeholder + product sense) -> hiring manager.', salaryRange: 'Senior Data Analyst: roughly 22-32 L (self-reported)', keyPeople: 'Rahul Menon (Analytics Manager)', sources: [] } }),
      co('co_demo2', 'Lumen Health', 'Healthtech', 'A', 'applied', 5, 3, { size: '500-1,000', location: 'Remote' }),
      co('co_demo3', 'Brightpath Fintech', 'Fintech', 'B', 'connected', 4, 4, { size: '200-500' }),
      co('co_demo4', 'Cobalt Commerce', 'E-commerce', 'B', 'targeting', 4, 5, { size: '5,000+' }),
      co('co_demo5', 'Nimbus Cloud Systems', 'Cloud software', 'C', 'researching', 3, 2, { size: '1,000-5,000', location: 'Remote' }),
      co('co_demo6', 'Quanta Logistics', 'Supply chain', 'B', 'targeting', 3, 4, { size: '1,000-5,000', location: 'Pune' }),
    ];

    const JD = {
      nw: 'About the role\nNorthwind Analytics is hiring a Senior Data Analyst to partner with Product and Growth teams in Bengaluru (hybrid, 3 days in office).\n\nWhat you will do\n- Own product and revenue dashboards in Power BI and Looker\n- Design A/B tests and analyze experiment results with statistical rigor\n- Write complex SQL on Snowflake and build dbt models with the data engineering team\n- Present insights to senior stakeholders and influence roadmap decisions\n\nRequirements\n- 4+ years of experience in data analytics or business intelligence\n- Expert SQL and strong Python (Pandas)\n- Experience with A/B testing, statistics and experiment design\n- Power BI or Tableau; data modeling fundamentals\n- Excellent communication and stakeholder management\n\nNice to have\n- dbt, Snowflake, Looker\n- SaaS or product analytics experience\n\nCompensation: INR 24,00,000 - 32,00,000 per year.',
      lh: 'Lumen Health - Analytics Engineer (Remote, India)\n\nWe are building the data platform behind care-delivery insights for 2M patients.\n\nResponsibilities\n- Build and maintain dbt models on Snowflake that power clinical and operational reporting\n- Develop data pipelines with Airflow and Python\n- Define metrics layers and data contracts with analysts\n- Improve data quality, testing and documentation\n\nRequirements\n- 3+ years in analytics engineering, data engineering or BI\n- Strong SQL, dbt and data modeling (Kimball)\n- Python for data transformation\n- Experience with Airflow or similar orchestration\n- Git and CI/CD for analytics code\n\nPreferred\n- Healthcare data (HL7, FHIR) familiarity\n- Tableau or Power BI\n\nSalary: 22-30 LPA',
      bp: 'Product Analyst - Brightpath Fintech (Bengaluru)\n\nHelp us understand how 3M users save, borrow and invest.\n\nWhat you will do\n- Define product KPIs and build funnels, cohorts and retention analyses\n- Run and read A/B tests with product managers\n- Build Tableau dashboards and automate reporting with SQL and Python\n- Translate data into clear product recommendations\n\nWhat we are looking for\n- 3-6 years in product analytics or business analytics\n- Advanced SQL; Python or R\n- Experimentation and statistics\n- Mixpanel or Amplitude experience\n- Fintech or lending domain is a plus\n\nWe offer ESOPs, flexible hours and a learning budget.',
      cc: 'Senior Business Intelligence Analyst - Cobalt Commerce\nLocation: Bengaluru (Hybrid)\n\nThe role\nLead BI for our marketplace category teams. You will own the semantic layer and executive dashboards.\n\nResponsibilities\n- Build executive and category dashboards in Power BI\n- Model data in Snowflake and dbt; optimize SQL performance\n- Partner with category managers on pricing, promotions and demand forecasting\n- Mentor two junior analysts\n\nRequirements\n- 5+ years in BI or analytics, ideally retail or e-commerce\n- Expert SQL and Power BI (DAX), data modeling\n- dbt and Snowflake experience\n- Strong stakeholder management and communication\n- Experience with A/B testing and forecasting\n\nNice to have\n- Python, Google Analytics\n- Team leadership experience\n\nCTC: 26-34 LPA',
      ql: 'Data Analyst II - Quanta Logistics (Pune, hybrid)\n\nOptimize how 40,000 shipments a day move across India.\n\nResponsibilities\n- Analyze network, delivery time and cost data\n- Build Tableau dashboards for operations leaders\n- Develop forecasting models for volume planning\n- Automate reports with SQL and Python\n\nRequirements\n- 2-4 years of experience in analytics\n- SQL, Microsoft Excel, Tableau\n- Python or R for analysis\n- Understanding of statistics and forecasting\n- Supply chain or logistics domain knowledge preferred\n\nNice to have\n- Power BI, Snowflake\n- Six Sigma or Lean exposure',
      nc: 'Analytics Engineer - Nimbus Cloud Systems (Remote)\n\nJoin our data platform team.\n\nWhat you will do\n- Build batch and streaming pipelines with Apache Spark, Kafka and Airflow\n- Own dbt transformations in BigQuery\n- Build internal data products and APIs\n\nRequirements\n- 4+ years in data engineering\n- Spark, Kafka, Airflow in production\n- Strong Python and SQL\n- Google Cloud Platform (BigQuery, Dataflow)\n- Terraform and Docker\n\nNice to have\n- Kubernetes\n- dbt\n\nUSD-equivalent remote pay bands.',
      ll: 'Lead Data Analyst - Lumen Health (Bengaluru)\n\nLead a team of 5 analysts supporting operations.\n\nRequirements\n- 7+ years in analytics with 2+ years managing people\n- SQL, Python, Tableau\n- Healthcare operations analytics\n- Team leadership and stakeholder management',
      cm: 'Marketing Data Analyst - Cobalt Commerce (Remote)\n\nMeasure and optimize a large marketing budget across channels.\n\nResponsibilities\n- Build attribution and marketing mix analyses\n- Own Google Analytics 4 and campaign dashboards in Power BI\n- Run incrementality and A/B tests\n\nRequirements\n- 3+ years in marketing analytics\n- SQL, Python, Google Analytics\n- A/B testing and statistics\n- Power BI or Tableau\n\nNice to have\n- Marketing mix modeling, BigQuery',
    };
    const job = (id, title, company, companyId, location, workMode, status, desc, extra) => Object.assign({
      id, title, company, companyId, location, workMode, url: 'https://example.com/jobs/' + id, source: 'LinkedIn',
      salaryMin: 0, salaryMax: 0, currency: 'INR', description: desc, status, match: 0, priority: 2,
      resumeId: '', coverLetterId: '', appliedAt: '', nextAction: '', nextActionDate: '', contactIds: [], events: [], notes: '',
      createdAt: ts(35), updatedAt: ts(5),
    }, extra || {});
    s.jobs = [
      job('job_demo1', 'Senior Data Analyst', 'Northwind Analytics', 'co_demo1', 'Bengaluru', 'hybrid', 'interview', JD.nw, {
        salaryMin: 2400000, salaryMax: 3200000, appliedAt: ago(18), priority: 1, contactIds: ['ct_demo1', 'ct_demo2'],
        nextAction: 'Panel interview (stakeholder + product sense)', nextActionDate: WP.d.addDays(today, 3),
        events: [{ date: ago(18), type: 'applied', note: 'Applied via referral from Meera' }, { date: ago(12), type: 'screening', note: 'Recruiter screen - positive' }, { date: ago(6), type: 'interview', note: 'SQL take-home submitted' }],
      }),
      job('job_demo2', 'Analytics Engineer', 'Lumen Health', 'co_demo2', 'Remote (India)', 'remote', 'applied', JD.lh, { salaryMin: 2200000, salaryMax: 3000000, appliedAt: ago(9), source: 'Company site', events: [{ date: ago(9), type: 'applied', note: 'Applied on careers page' }] }),
      job('job_demo3', 'Product Analyst', 'Brightpath Fintech', 'co_demo3', 'Bengaluru', 'onsite', 'screening', JD.bp, { appliedAt: ago(12), priority: 1, contactIds: ['ct_demo5', 'ct_demo6'], source: 'Referral', events: [{ date: ago(12), type: 'applied', note: 'Referred by Priya Nair' }, { date: ago(4), type: 'screening', note: 'Recruiter call with Arjun' }], nextAction: 'Hiring manager call', nextActionDate: WP.d.addDays(today, 5) }),
      job('job_demo4', 'Senior Business Intelligence Analyst', 'Cobalt Commerce', 'co_demo4', 'Bengaluru', 'hybrid', 'saved', JD.cc, { salaryMin: 2600000, salaryMax: 3400000, priority: 1, createdAt: ts(4), updatedAt: ts(4) }),
      job('job_demo5', 'Data Analyst II', 'Quanta Logistics', 'co_demo6', 'Pune', 'hybrid', 'saved', JD.ql, { source: 'Naukri', createdAt: ts(3), updatedAt: ts(3) }),
      job('job_demo6', 'Analytics Engineer', 'Nimbus Cloud Systems', 'co_demo5', 'Remote', 'remote', 'saved', JD.nc, { source: 'Wellfound', priority: 3, createdAt: ts(2), updatedAt: ts(2) }),
      job('job_demo7', 'Lead Data Analyst', 'Lumen Health', 'co_demo2', 'Bengaluru', 'onsite', 'rejected', JD.ll, { appliedAt: ago(31), events: [{ date: ago(31), type: 'applied', note: '' }, { date: ago(20), type: 'rejected', note: 'Wanted people-management experience' }] }),
      job('job_demo8', 'Marketing Data Analyst', 'Cobalt Commerce', 'co_demo4', 'Remote', 'remote', 'applied', JD.cm, { appliedAt: ago(3), events: [{ date: ago(3), type: 'applied', note: '' }] }),
    ];

    const ct = (id, name, title, company, companyId, relationship, warmth, status, extra) => Object.assign({
      id, name, title, company, companyId, relationship, warmth, linkedin: '', email: '', source: 'LinkedIn', status,
      lastContacted: '', nextFollowUp: '', interactions: [], notes: '', createdAt: ts(30), updatedAt: ts(6),
    }, extra || {});
    s.contacts = [
      ct('ct_demo1', 'Meera Iyer', 'Talent Acquisition Partner', 'Northwind Analytics', 'co_demo1', 'recruiter', 3, 'replied', { lastContacted: ago(12), interactions: [{ date: ago(20), channel: 'linkedin', note: 'Connection request with note' }, { date: ago(12), channel: 'email', note: 'Scheduled recruiter screen' }] }),
      ct('ct_demo2', 'Rahul Menon', 'Analytics Manager', 'Northwind Analytics', 'co_demo1', 'hiring-manager', 2, 'connected', { lastContacted: ago(15) }),
      ct('ct_demo3', 'Sana Kapoor', 'Senior Data Scientist', 'Lumen Health', 'co_demo2', 'alumni', 3, 'to-contact', { notes: 'Same university, 2 years senior.' }),
      ct('ct_demo4', 'David Chen', 'Data Engineering Lead', 'Lumen Health', 'co_demo2', 'employee', 1, 'requested', { lastContacted: ago(6) }),
      ct('ct_demo5', 'Priya Nair', 'Product Manager', 'Brightpath Fintech', 'co_demo3', 'colleague', 5, 'referred', { lastContacted: ago(13), notes: 'Worked together at Crestline.' }),
      ct('ct_demo6', 'Arjun Das', 'Senior Recruiter', 'Brightpath Fintech', 'co_demo3', 'recruiter', 2, 'meeting', { lastContacted: ago(4) }),
      ct('ct_demo7', 'Lena Fischer', 'Head of Business Intelligence', 'Cobalt Commerce', 'co_demo4', 'hiring-manager', 1, 'to-contact'),
      ct('ct_demo8', 'Karan Shah', 'Operations Analyst', 'Quanta Logistics', 'co_demo6', 'alumni', 2, 'to-contact'),
      ct('ct_demo9', 'Ana Souza', 'Principal Consultant', 'Brightside Consulting', '', 'mentor', 4, 'connected', { lastContacted: ago(25) }),
    ];
    s.outreach = [
      { id: 'out_demo1', contactId: 'ct_demo1', jobId: 'job_demo1', type: 'recruiter', channel: 'linkedin', subject: '', body: 'Hi Meera - I saw Northwind is hiring a Senior Data Analyst. I build Power BI and experimentation programs at Meridian Retail and would love to learn more about the team.', status: 'replied', sentAt: ago(20), createdAt: ts(21), updatedAt: ts(12) },
      { id: 'out_demo2', contactId: 'ct_demo4', jobId: 'job_demo2', type: 'connection', channel: 'linkedin', subject: '', body: 'Hi David - I just applied for the Analytics Engineer role at Lumen Health. I have been migrating reporting to dbt on Snowflake and would value connecting.', status: 'sent', sentAt: ago(6), createdAt: ts(7), updatedAt: ts(6) },
      { id: 'out_demo3', contactId: 'ct_demo5', jobId: 'job_demo3', type: 'referral', channel: 'linkedin', subject: '', body: 'Hi Priya! Hope Brightpath is treating you well...', status: 'replied', sentAt: ago(14), createdAt: ts(15), updatedAt: ts(13) },
    ];
    s.stories = [
      { id: 'st_demo1', title: 'Self-serve dashboards cut ad-hoc requests 40%', situation: 'Regional managers sent 60+ ad-hoc data requests a week to a 3-person team.', task: 'Reduce the load without slowing managers down.', action: 'Interviewed 12 managers, prioritized 8 recurring questions, built a Power BI suite with row-level security and ran training sessions.', result: 'Ad-hoc requests fell 40% in two months; 120+ weekly active users.', competencies: ['ownership', 'customer', 'data-driven'], createdAt: ts(20), updatedAt: ts(20) },
      { id: 'st_demo2', title: 'Pushing back on a flawed pricing test', situation: 'Leadership wanted to ship a price increase after a 3-day test.', task: 'Make sure the decision was statistically sound.', action: 'Ran a power analysis, showed the test was underpowered, proposed a 2-week design and aligned stakeholders.', result: 'Extended test revealed a 4% conversion drop; we shipped a smaller change that lifted margin 2%.', competencies: ['influence', 'integrity', 'data-driven'], createdAt: ts(18), updatedAt: ts(18) },
      { id: 'st_demo3', title: 'Missed deadline on churn model', situation: 'My first churn model slipped two weeks because data access took longer than planned.', task: 'Recover trust and deliver.', action: 'Flagged the risk late - learned to surface blockers in week one; shipped a simpler baseline first.', result: 'Baseline shipped in 5 days; full model a week later saved 1,800 accounts in a quarter.', competencies: ['failure', 'growth'], createdAt: ts(16), updatedAt: ts(16) },
    ];
    s.answers = {
      firstName: 'Alex', lastName: 'Rivera', fullName: 'Alex Rivera', email: 'alex.rivera@example.com', phone: '+91 98765 43210',
      city: 'Bengaluru', country: 'India', linkedin: 'https://linkedin.com/in/alex-rivera-demo', github: 'https://github.com/alex-rivera-demo',
      currentCompany: 'Meridian Retail Group', currentTitle: 'Data Analyst', yearsExperience: '7', noticePeriod: '60 days',
      workAuth: 'Yes', sponsorship: 'No', relocate: 'No', expectedSalary: 'INR 24,00,000 per year (negotiable)',
      howHeard: 'LinkedIn', gender: 'Prefer not to say',
    };
    s.learning = [{ skill: 'Airflow', resource: '', status: 'doing', hours: 4 }, { skill: 'Looker', resource: '', status: 'todo', hours: 0 }];

    /* ~10 weeks of plausible activity (deterministic pseudo-random) */
    let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let n = 70; n >= 1; n--) {
      const date = ago(n); const dow = new Date(date + 'T00:00:00').getDay();
      if (dow === 0) continue;
      const ramp = 0.35 + (70 - n) / 90;
      if (rnd() < 0.45 * ramp) s.activity.push({ date, type: 'applied', ref: '', note: '' });
      if (rnd() < 0.6 * ramp) s.activity.push({ date, type: 'outreach', ref: '', note: '' });
      if (rnd() < 0.35 * ramp) s.activity.push({ date, type: 'outreach', ref: '', note: '' });
      if (rnd() < 0.3) s.activity.push({ date, type: 'research', ref: '', note: '' });
      if (rnd() < 0.18) s.activity.push({ date, type: 'learning', ref: '', note: '' });
      if (rnd() < 0.12 * ramp) s.activity.push({ date, type: 'followup', ref: '', note: '' });
    }
    [['applied', 2], ['outreach', 4], ['followup', 1], ['research', 1], ['learning', 1]].forEach(([type, n]) => { for (let i = 0; i < n; i++) s.activity.push({ date: today, type, ref: '', note: '' }); });
    s.jobs.forEach((j) => j.events.forEach((e) => s.activity.push({ date: e.date, type: e.type === 'applied' ? 'applied' : e.type === 'interview' ? 'interview' : 'followup', ref: j.id, note: e.note })));
    store.state = normalize(s);
    if (WP.engine) {
      store.state.profile.skills = WP.uniq(store.state.profile.skills.map((x) => WP.engine.canonSkill(x)));
      store.state.jobs.forEach((j) => { j.match = WP.engine.analyzeJob(j, store.state.profile).score; });
      WP.engine.planner.run(store.state, { silent: true });
    }
    store.saveNow();
  };

  WP.store = store;
})();
