/* Behavioral, Resume & Job Hunt */
PREP.add({
  id: "career",
  order: 150,
  group: "Career",
  title: "Behavioral, Resume & Job Hunt",
  short: "Behavioral & job hunt",
  blurb: "Stories, resume, applications and the offer — the half of the switch nobody practises.",
  widgets: ["applications"],
  intro: [
    "Technical prep gets you through the coding and design rounds; this tab gets you <b>into</b> the interviews and <b>out</b> with the best offer. Product companies reject many strong engineers in the behavioral, hiring-manager and project deep-dive rounds, and services-to-product switchers lose the most money at the negotiation stage. Treat it as a project with its own weekly hours.",
    "Run it as a funnel in four steps: <b>1. Positioning</b> (decide target roles, fix resume, LinkedIn and GitHub) → <b>2. Getting interviews</b> (referrals, portals, recruiters, managing the notice period) → <b>3. Interviewing</b> (story bank, project deep-dive, mocks) → <b>4. Offer & transition</b> (compensation, negotiation, resignation, first 90 days). Use the <b>application tracker</b> below to log every application and its stage.",
    "Rough timeline for a working engineer: 2 weeks positioning while finishing core DSA, start applying around week 6–8 of technical prep, run interviews over 6–10 weeks in parallel, and aim to have 2+ offers land within the same 2–3 weeks so you can negotiate. With a 60–90 day notice period, plan the whole switch as a 4–6 month project.",
    "India context: notice periods (often 60–90 days in services companies), CTC vs in-hand confusion, background verification and relieving letters, and the heavy role of referrals and job portals like Naukri/Instahyre all shape the strategy. These are covered explicitly in each step."
  ],
  resources: [
    { n: "Tech Interview Handbook — behavioral, resume & negotiation sections", u: "https://www.techinterviewhandbook.org/", d: "Free, concise guides on resume, behavioral rounds, questions to ask and negotiation. Start here." },
    { n: "Amazon Leadership Principles", u: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles", d: "The 16 LPs Amazon interviews against. Also the best generic map of behavioral themes for any company." },
    { n: "levels.fyi", u: "https://www.levels.fyi/", d: "Verified compensation by company, level and city (filter India). Use it to set targets and anchor negotiations." },
    { n: "Glassdoor", u: "https://www.glassdoor.co.in/", d: "Interview experiences, rounds, salaries and reviews by company. Read 10+ interview reports before each loop." },
    { n: "LeetCode Discuss — Compensation", u: "https://leetcode.com/discuss/compensation", d: "Thousands of Indian offer posts (base, bonus, stocks, YOE). The best source for SDE/ML offers in Bangalore/Hyderabad/Pune." },
    { n: "Pramp", u: "https://www.pramp.com/", d: "Free peer mock interviews (behavioral and technical)." },
    { n: "interviewing.io", u: "https://interviewing.io/", d: "Anonymous mocks with engineers from big tech; paid, but realistic feedback. Their blog has good data on interviewing." },
    { n: "Never Split the Difference — Chris Voss", d: "Negotiation tactics (calibrated questions, labelling, anchoring, 'how am I supposed to do that?'). Read before the offer stage." },
    { n: "Haseeb Qureshi — Ten Rules for Negotiating a Job Offer", u: "https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/", d: "The classic two-part guide on handling recruiters, competing offers and getting everything in writing." }
  ],
  levels: [
    {
      name: "Step 1 · Positioning",
      desc: "Decide exactly what you are targeting, then make your resume, LinkedIn and GitHub tell one consistent story.",
      topics: [
        {
          id: "self-assessment-targets",
          title: "Self-assessment, target roles & companies",
          est: "2–3 days",
          why: "A vague target ('any good product company') produces a vague resume and low conversion. A clear target list decides what you study and how you pitch yourself.",
          learn: [
            "List your last 2–3 years of work: projects, tech stack, scale, measurable impact, and what you personally owned.",
            "Pick 1–2 target role titles: e.g. <b>ML Engineer</b>, <b>AI/LLM Engineer</b>, <b>Applied Scientist</b>, <b>Data Scientist</b>, <b>SDE (ML platform)</b>. Read 10 JDs for each and note recurring requirements.",
            "Build a tiered company list of 40–60: Tier A (FAANG/big tech India: Google, Microsoft, Amazon, Meta-adjacent, Adobe, Atlassian, Salesforce, Uber), Tier B (Indian product unicorns: Flipkart, Swiggy, Zomato, Razorpay, PhonePe, Meesho, CRED), Tier C (AI-first startups and well-funded Series A–C), Tier D (product GCCs: Walmart Global Tech, Target, JPMorgan, Goldman Sachs, Intuit, Visa).",
            "Do a skills gap analysis: JD requirements vs your skills, rated 0–3, and turn every gap into a prep task in other tabs.",
            "Decide your non-negotiables: minimum compensation, city/remote, role type, company stage, work hours.",
            "Check your target level: map your YOE to SDE-2 / Senior / MLE-2 equivalents on levels.fyi to avoid down-levelling.",
            "Write a one-line positioning statement: 'AI engineer with N years building LLM/RAG systems in production for enterprise clients, targeting MLE/AI engineer roles at product companies.'"
          ],
          practice: [
            { t: "Spreadsheet: 50 target companies with tier, role, city, referral contact, comp range", p: "TASK", d: "M" },
            { t: "Collect 20 JDs, highlight top 15 recurring skills, rate yourself 0–3 on each", p: "TASK", d: "E" },
            { t: "levels.fyi: note the India comp band for your target level at 10 companies", p: "TASK", d: "E", u: "https://www.levels.fyi/" },
            { t: "Glassdoor: read interview experiences for your top 10 companies and note the round structure", p: "TASK", d: "E", u: "https://www.glassdoor.co.in/" },
            { t: "Write your positioning statement and test it on 2 friends in product companies", p: "TASK", d: "E" }
          ],
          notes: [
            "<b>Big tech</b>: structured loops, high bar on DSA + system design, strong comp with RSUs, slower process (4–8 weeks). <b>AI-first startups</b>: fast, project-heavy, ESOPs, more ownership, more risk. <b>GCCs</b>: good comp and stability, growing AI teams, often more process; interviews vary widely.",
            "Services → product switchers are often down-levelled because titles don't map; counter with concrete scope ('owned the RAG pipeline serving 5k users') not titles.",
            "Role names vary: 'AI Engineer' at a startup may mean LLM apps; 'Applied Scientist' at Amazon means research-heavy ML with a high bar; 'MLE' can mean platform or modelling. Read the JD, not the title.",
            "Prefer roles where your current domain is an advantage (e.g. enterprise GenAI, document AI, analytics) for the first switch; pivot further later.",
            "Revisit the target list every two weeks based on conversion data from your tracker.",
            "Use the gap analysis to decide what <i>not</i> to study — skip skills no JD on your list asks for."
          ],
          cases: [
            "Applying everywhere with one generic resume — low callbacks, wasted interview energy.",
            "Targeting only Tier A first — you'll be rusty; schedule a few Tier B/C interviews as warm-ups before dream companies.",
            "Ignoring level: accepting a lower level for brand name can cost years of growth and lakhs per year.",
            "Chasing the hottest title (e.g. 'AI researcher') without the background — position for roles you can win now.",
            "Not deciding a walk-away number before talking to recruiters."
          ],
          qa: [
            { q: "What kind of role are you looking for?", a: "Be specific and consistent with your resume: role type, problem space and why. E.g. 'An ML/AI engineer role building production LLM systems end to end — I've built RAG and agent systems for enterprise clients and want to own a product used by millions, with tighter feedback loops.'" },
            { q: "Why product companies after services?", a: "Frame as growth, not escape: ownership of one product long-term, direct user feedback, engineering depth at scale. Give an example of what you've done that already looks like product work. Never complain about the current employer." },
            { q: "Where do you see yourself in 3–5 years?", a: "Show ambition aligned with the role: growing into a senior/staff engineer owning a major ML system, mentoring others, being the go-to person for a domain (e.g. LLM evaluation). Avoid 'manager in 2 years' unless it's a management-track role." }
          ]
        },
        {
          id: "resume",
          title: "Resume: one page, XYZ bullets, quantified impact",
          est: "3–4 days",
          why: "Recruiters spend seconds on a first scan and ATS filters run before that. The resume decides whether all your technical prep is ever used.",
          learn: [
            "Format: one page (up to ~8 years experience), single column, clean font, PDF, no photos, no tables/graphics that break ATS parsing.",
            "Sections in order: header (name, phone, email, LinkedIn, GitHub, city) → summary (optional, 2 lines) → experience → projects → skills → education → achievements.",
            "Write every bullet with the <b>XYZ formula</b>: 'Accomplished [X] as measured by [Y] by doing [Z]'. Start with a strong verb (Built, Designed, Reduced, Led).",
            "Quantify: latency (ms), accuracy/F1, cost (₹/$ saved), users, documents, QPS, time saved, % automation, team size.",
            "Add ATS keywords from target JDs naturally: Python, PyTorch, LLMs, RAG, LangChain/LangGraph, vector databases, AWS/Azure, Docker, Kubernetes, MLflow, FastAPI.",
            "Projects section for AI work: 2–3 projects with what, how, scale/metric and a GitHub/demo link.",
            "Translate client work into impact without naming confidential clients: 'for a Fortune 500 insurance client' instead of the client name.",
            "Tailor: keep a master resume and make a 10-minute tailored version per role family (MLE vs AI engineer vs data scientist).",
            "Get 3 reviews: one from a peer at a product company, one recruiter/HR contact, one senior engineer."
          ],
          practice: [
            { t: "Tech Interview Handbook — resume guide; rewrite your resume with it", p: "DOC", d: "M", u: "https://www.techinterviewhandbook.org/resume/" },
            { t: "Rewrite your 10 strongest bullets in XYZ form with a number in each", p: "TASK", d: "M" },
            { t: "Run your resume through a free ATS checker against 3 target JDs; fix missing keywords", p: "TASK", d: "E" },
            { t: "Copy-paste your PDF into a plain text editor — if order/words break, ATS will break too", p: "TASK", d: "E" },
            { t: "Ask 3 people for a 5-minute review and log their comments", p: "TASK", d: "M" },
            { t: "Make an MLE-flavoured and an AI-engineer-flavoured variant", p: "TASK", d: "M" }
          ],
          notes: [
            "Weak: 'Worked on RAG chatbot using LangChain.' Strong: '<b>Built</b> a RAG assistant over 40k policy documents for 3k internal users, <b>raising</b> answer accuracy from 62% to 87% on a 300-question eval set via hybrid search and cross-encoder reranking; cut p95 latency to 2.1 s.'",
            "Weak: 'Responsible for model deployment.' Strong: '<b>Containerised</b> and deployed 6 ML models on AKS with CI/CD and MLflow registry, <b>reducing</b> release time from 2 weeks to 1 day.'",
            "If you don't have exact numbers, estimate honestly and be ready to explain how ('~30% reduction measured over two sprints').",
            "Skills section: group by category (Languages · ML/DL · GenAI · MLOps · Cloud · Data). Only list what you can be grilled on.",
            "Use the same job titles your company issued; clarify scope in bullets instead of inflating titles (BGV will check).",
            "File name: <code>Firstname_Lastname_ML_Engineer.pdf</code>. Keep links clickable.",
            "Education and CGPA: keep it short after 3+ years experience; include notable ranks (GATE, JEE) only if strong."
          ],
          cases: [
            "Two pages of responsibilities with no numbers — the most common services-company resume pattern.",
            "Tool soup: 40 technologies listed — signals shallowness; interviewers pick one you barely know.",
            "Naming confidential clients or sharing client data in project descriptions.",
            "Inflated titles or dates — background verification will catch mismatches and offers get revoked.",
            "Fancy two-column Canva templates that ATS parses into garbage.",
            "Typos, inconsistent tenses and date formats — signals carelessness.",
            "Listing 'ChatGPT' or 'prompt engineering' as the main AI skill without engineering depth."
          ],
          qa: [
            { q: "Walk me through your resume.", a: "2 minutes, chronological but impact-focused: current role and biggest project with metric, previous highlights, the thread that connects them (e.g. moving from analytics to production AI), and why this role is the logical next step. Practise it timed." },
            { q: "This bullet says you improved accuracy by 25% — how did you measure that?", a: "Have a precise answer for every number: baseline, eval set (size, how built), metric definition, what changed, and caveats. If you can't explain a number in 30 seconds, remove it from the resume." },
            { q: "Why is there a gap / short stint on your resume?", a: "One or two honest sentences (project ended, health, family, upskilling) plus what you did in that time, then move on. Don't over-explain or sound defensive." }
          ]
        },
        {
          id: "linkedin-github-portfolio",
          title: "LinkedIn, GitHub & portfolio",
          est: "2–3 days",
          why: "Recruiters in India source heavily from LinkedIn and Naukri searches; a strong profile turns into inbound interview calls without applying.",
          learn: [
            "Headline with role + specialism + keywords: 'AI Engineer · LLMs, RAG, Agents · Python, PyTorch, Azure · Building GenAI in production'.",
            "About section: 3 short paragraphs — what you do, proof (2–3 metrics/projects), what you're looking for; include keywords.",
            "Experience entries mirror resume bullets (shorter); add skills to each role so LinkedIn search matches them.",
            "Featured section: pin 2–3 projects (GitHub repo, demo video, blog post).",
            "Open to Work: set to <b>recruiters only</b> (not the public green banner) if you don't want your current employer to see; set job titles, locations and start date.",
            "Turn on recruiter-visible settings: location (Bangalore/Hyderabad/remote), job types; collect 15–20 skill endorsements on key skills.",
            "GitHub: pinned repos with good READMEs (problem, architecture diagram, how to run, results), clean commit history, no secrets.",
            "Optional portfolio site or blog with 2–3 technical write-ups (e.g. 'what I learned evaluating our RAG system')."
          ],
          practice: [
            { t: "Rewrite LinkedIn headline + About using the template; ask a recruiter friend for feedback", p: "TASK", d: "E" },
            { t: "Set Open to Work (recruiters only) with 3 titles and 3 cities", p: "TASK", d: "E" },
            { t: "Polish READMEs of 3 pinned repos: diagram, demo GIF, results table", p: "TASK", d: "M" },
            { t: "Write and publish one technical post on LinkedIn about a lesson from your AI work (no client data)", p: "DOC", d: "M" },
            { t: "Connect with 30 engineers/recruiters at target companies with a short note", p: "TASK", d: "M" }
          ],
          notes: [
            "LinkedIn Recruiter search is keyword-based: headline, current title, skills and About text matter most — put target keywords there.",
            "Post consistently (e.g. once every 1–2 weeks) about real engineering learnings; it builds inbound and referral goodwill. Avoid generic AI hype posts.",
            "README template: Problem → Demo → Architecture diagram → Tech stack → How to run → Evaluation/results → Limitations & next steps.",
            "Use a professional photo and custom URL (linkedin.com/in/firstname-lastname).",
            "Keep Naukri profile updated too — Indian recruiters rank recently updated profiles higher; refresh it weekly while actively searching.",
            "Make sure dates, titles and companies match your resume exactly."
          ],
          cases: [
            "Public 'Open to Work' banner visible to your manager — use the recruiters-only option.",
            "GitHub full of forked tutorials and empty repos — pin only your best 3–6.",
            "Committing API keys in a public repo — rotate keys and scrub history.",
            "Posting confidential client project details or screenshots.",
            "Profile and resume telling different stories (titles, dates, skills)."
          ],
          qa: [
            { q: "I see your GitHub project — why did you build it this way?", a: "Be ready to explain every pinned repo: motivation, architecture, key trade-off, what broke, what you'd change. If you can't defend it, unpin it." },
            { q: "Are you actively looking? (recruiter cold message)", a: "'Yes, I'm exploring ML/AI engineer roles in Bangalore or remote — happy to talk. Could you share the role, team, level and comp range?' Keep it positive, short, and get the details before investing time." }
          ]
        },
        {
          id: "signal-projects",
          title: "Side projects that signal AI engineering skill",
          est: "2–4 weeks (in parallel)",
          why: "When your day job is client-confidential, a public production-grade project is the only proof interviewers can inspect. It also fuels the project deep-dive round.",
          learn: [
            "Choose 1–2 projects that mirror target JDs (e.g. RAG with evaluation, agent with tools, fine-tuned small model, ML system with monitoring) instead of 10 toy notebooks.",
            "Make it production-shaped: API (FastAPI), container, CI, tests, evaluation suite, logging/tracing, deployment (free tier cloud or HF Spaces).",
            "Include an <b>evaluation</b> section with numbers — what was measured, baseline vs final.",
            "Write a design doc / README with architecture diagram and trade-offs.",
            "Record a 2-minute demo video and add it to LinkedIn Featured.",
            "Contribute small but real PRs to an open-source AI library you use (docs, bug fixes, examples).",
            "Optional: Kaggle competition medal or a reproducible paper implementation for ML-heavy roles."
          ],
          practice: [
            { t: "Project A: RAG over a public corpus (e.g. RBI circulars or Indian law) with hybrid search, reranker, RAGAS eval and a Streamlit UI", p: "BUILD", d: "H" },
            { t: "Project B: tool-using agent (e.g. personal finance or travel planner) with guardrails, tracing and a 30-case eval suite", p: "BUILD", d: "H" },
            { t: "Project C: fine-tune a small open model with LoRA for a narrow task and compare against a prompted large model on cost and quality", p: "BUILD", d: "H" },
            { t: "Write the design doc + blog post for one project", p: "DOC", d: "M" },
            { t: "Open 1 PR on an open-source AI repo", p: "TASK", d: "M" }
          ],
          notes: [
            "One deep project &gt; five shallow ones. Depth = eval numbers, failure analysis, deployment, cost and latency figures.",
            "Pick India-flavoured data for originality (Indian legal texts, government schemes, regional languages, cricket stats) — interviewers remember it.",
            "Track your time on side projects; cap at ~20–25% of prep time so DSA/system design don't suffer.",
            "Every project should answer: what problem, for whom, how measured, what trade-offs, what's next.",
            "Check your employment agreement on IP and moonlighting; build on personal hardware/accounts and public data only."
          ],
          cases: [
            "Building yet another 'chat with PDF' with no evaluation — it signals tutorial-following.",
            "Never-finished projects — scope to something you can ship in 2–3 weekends.",
            "Using company code, data or laptops for side projects — IP and policy violation.",
            "Demo link that's down during the interview — keep a recorded video as backup."
          ],
          qa: [
            { q: "Tell me about a project you're proud of outside work.", a: "Problem and motivation → architecture → hardest technical decision with the alternative you rejected → evaluation numbers → what you learned and what you'd do next. 2–3 minutes, then let them dig." },
            { q: "How did you evaluate it?", a: "Describe the eval set (how built, size), metrics (e.g. recall@5, faithfulness), baseline vs final numbers, and one failure category you discovered and fixed." }
          ]
        }
      ]
    },
    {
      name: "Step 2 · Getting interviews",
      desc: "Fill the top of the funnel: referrals first, then portals and recruiters, while managing the notice period and tracking every application.",
      topics: [
        {
          id: "referrals-outreach",
          title: "Referral strategy & cold outreach",
          est: "Ongoing (start week 6–8)",
          why: "Referrals convert to interviews several times better than cold applications at most product companies; in India they're the single biggest lever for services-to-product switches.",
          learn: [
            "Map your network: college alumni, ex-colleagues now at product companies, LinkedIn 2nd-degree connections at each target company.",
            "Ask for referrals for a <b>specific job ID</b>, with your resume and a 3-line summary attached — make it a 2-minute task for the referrer.",
            "Write a cold outreach DM template and personalise the first line for each person.",
            "Follow up once after 5–7 days; then move on without spamming.",
            "Reach hiring managers directly for startups and smaller teams — a short note with a relevant project link.",
            "Thank referrers and update them on outcomes; keep the relationship for the future.",
            "Track referral asks in the application tracker (who, when, job ID, status)."
          ],
          practice: [
            { t: "List 3 contacts (alumni/ex-colleagues) at each of your top 20 companies", p: "TASK", d: "M" },
            { t: "Write your referral DM and cold-email templates", p: "DOC", d: "E" },
            { t: "Send 10 personalised referral requests this week", p: "TASK", d: "M" },
            { t: "Message 5 hiring managers at AI startups with a project link", p: "TASK", d: "H" }
          ],
          notes: [
            "<b>Referral DM template:</b> 'Hi [Name], I'm [Your name], an AI engineer at [current company] (also [shared college/ex-company], if any). I saw the [Role, Job ID/link] on your team's careers page — I've been building [one-line relevant work, e.g. production RAG systems for 3k users] and it looks like a strong fit. Would you be open to referring me? I've attached my resume and a 3-line summary below so it takes you two minutes. Totally fine if not — thanks either way!'",
            "<b>3-line summary for the referrer:</b> years + role; best project with metric; key skills matching the JD.",
            "<b>Hiring-manager cold note:</b> 'Hi [Name], I read about [team/product/blog post]. I've built [relevant thing + metric]; here's a 2-min demo: [link]. I'd love to be considered for [role]. Happy to share more.'",
            "Many big tech companies pay referral bonuses — you're often doing the referrer a favour; ask confidently but politely.",
            "Best response rates: weekday mornings, short messages, a specific job ID, and a shared connection in the first line.",
            "One referral per company at a time is cleaner; multiple referrals for the same role can confuse recruiters."
          ],
          cases: [
            "'Hi, please refer me' with no job ID or resume — mostly ignored.",
            "Asking strangers for a referral in the very first message without context — warm up with a genuine question if possible.",
            "Applying directly and via referral for the same role — the earlier application may 'own' the candidate and the referral gets no credit.",
            "Spamming the same person repeatedly — burns the connection.",
            "Referral for a role that's clearly off-level or off-profile, wasting the referrer's credibility."
          ],
          qa: [
            { q: "How did you hear about this role?", a: "Mention the referrer by name if referred ('[Name] on the payments ML team suggested I apply') and tie it to genuine interest in the team/product." },
            { q: "What do you know about our company/team?", a: "Product, business model, recent launches or engineering blog posts, the team's AI use cases, and one thoughtful question. 5–10 minutes of research before every call is enough to stand out." }
          ]
        },
        {
          id: "portals-recruiters",
          title: "Job portals, recruiters & consultancies",
          est: "Ongoing",
          why: "Portals and recruiters fill the funnel when referrals run out, and in India a large share of mid-level hiring flows through Naukri, Instahyre and consultancies.",
          learn: [
            "LinkedIn Jobs: set alerts by title + city, use Easy Apply sparingly, apply within the first 48 hours of a posting.",
            "Naukri: complete profile (100%), keywords in headline and key skills, update weekly, set notice period accurately, use the resume headline.",
            "Instahyre and Cutshort: curated tech roles, recruiters reach out directly; good for product companies and startups.",
            "Wellfound (formerly AngelList Talent): startups, including remote and AI-first roles; shows salary and equity ranges.",
            "Company career pages: apply directly for big tech (Google, Microsoft, Amazon) and set job alerts on their portals.",
            "Third-party recruiters/consultancies: useful volume, but confirm the client name and role before sharing details; never pay a recruiter.",
            "Track source of each application to learn which channels convert."
          ],
          practice: [
            { t: "Complete Naukri profile to 100% with keywords and accurate notice period", p: "TASK", d: "E", u: "https://www.naukri.com/" },
            { t: "Create Instahyre and Cutshort profiles", p: "TASK", d: "E", u: "https://www.instahyre.com/" },
            { t: "Create a Wellfound profile and shortlist 15 AI startups", p: "TASK", d: "E", u: "https://wellfound.com/" },
            { t: "Set LinkedIn + 10 company-career-page alerts for your target titles", p: "TASK", d: "E" },
            { t: "Apply to 10 roles this week across 3 channels and log them in the tracker", p: "TASK", d: "M" }
          ],
          notes: [
            "Recruiter screen script: confirm role, team, level, location/remote policy, interview process and timeline, and their budget range before giving numbers.",
            "When a recruiter asks for expected CTC early: 'I'm focused on finding the right role; I'm sure we can agree on comp if it's a fit. What's the budgeted range for this level?'",
            "Consultancies often push roles in bulk; ask which company and why they think you fit; decline politely if it doesn't match your target list.",
            "Fresh postings get the most attention; schedule 20–30 min daily for alerts rather than weekend bulk applying.",
            "Keep a short 'recruiter info pack': resume PDF, notice period, current location, preferred locations, LinkedIn/GitHub links.",
            "Fake job offers and 'pay for placement' scams are common in India — legitimate companies never charge a fee."
          ],
          cases: [
            "Same resume submitted to the same company by two consultancies — duplicate profiles cause rejection; track who submitted where.",
            "Wrong notice period on Naukri (e.g. '15 days' when it's 90) — wastes everyone's time and burns credibility.",
            "Sharing current payslips with unverified recruiters.",
            "Mass Easy Apply to 200 jobs — low conversion; quality over quantity.",
            "Paying a 'consultant' for interview guarantees — scam."
          ],
          qa: [
            { q: "What is your current and expected CTC?", a: "Current: you may have to share it in India, often required by forms — give accurate numbers (BGV checks) but frame total comp correctly. Expected: try to get their range first; if pressed, give a researched range based on levels.fyi for the target level, not a % hike over current." },
            { q: "Why are you open to opportunities right now?", a: "Positive, forward-looking: 'I've grown a lot building GenAI systems here; I'm now looking for deeper ownership of a product at scale, which this role offers.' No complaints." }
          ]
        },
        {
          id: "notice-period",
          title: "Notice period strategy (India)",
          est: "1 day to plan, months to execute",
          why: "A 60–90 day notice is the biggest practical blocker for Indian switchers; many companies drop candidates or prefer immediate joiners. Planning it well widens your options.",
          learn: [
            "Read your appointment letter and HR policy: exact notice period, whether it differs on probation, buyout rules, leave encashment/adjustment rules.",
            "Options: serve full notice, negotiate early release with your manager, buy out the remaining notice (pay basic or gross for the unserved days — check which), adjust earned leave against notice (only if policy allows).",
            "Ask the new employer about <b>notice buyout reimbursement</b> — many product companies pay it as a joining bonus component.",
            "Interview-while-serving-notice strategy: resigning before having an offer gives you a shorter effective notice and better 'immediate joiner' positioning — but is risky; only do it with savings and strong interview readiness.",
            "Know how to state notice in applications: 'Notice: 90 days, negotiable to ~60 with buyout' if that's true.",
            "Plan the timeline backwards from your target joining date: offers → resignation → notice → joining.",
            "Keep the resignation acknowledgement and last working day in writing (email from HR)."
          ],
          practice: [
            { t: "Find and read the notice and buyout clause in your appointment letter / HR portal", p: "DOC", d: "E" },
            { t: "Calculate buyout cost for 30/60/90 days based on your salary structure", p: "TASK", d: "E" },
            { t: "Draft the early-release request email to your manager (keep it ready, don't send yet)", p: "DOC", d: "E" },
            { t: "Write your timeline: target offer date, resignation date, last working day, joining date", p: "TASK", d: "M" }
          ],
          notes: [
            "Typical: services companies 60–90 days, product companies 30–60 days. Some recruiters filter candidates with 90-day notice for urgent roles — apply more broadly to compensate.",
            "Buyout amount is usually calculated on <b>basic</b> or <b>gross</b> salary for unserved days — the difference is large, check the clause.",
            "Early release is often negotiable if your project has a replacement and you offer a strong handover plan; ask after resigning, not before.",
            "If you resign before an offer: you can join in 30–60 days instead of 90, but you lose negotiation leverage if your notice is ending and you have no offer.",
            "Keep offers alive during notice: stay in touch with the new recruiter fortnightly; some candidates get offers revoked or 'better counter' calls during long notices.",
            "Get the new employer's commitment on buyout reimbursement <b>in the offer letter</b>, not over a call."
          ],
          cases: [
            "Absconding (leaving without serving notice or settling buyout) — no relieving letter, failed BGV, possible legal recovery; never do it.",
            "Assuming leaves can be adjusted against notice when policy forbids it.",
            "Telling a new employer '30 days' when it's really 90 — offer may be withdrawn later.",
            "Resigning on the strength of a verbal offer — wait for the written offer letter.",
            "Accepting multiple offers and backing out late ('offer shopping') — Indian recruiters network; it can hurt your reputation."
          ],
          qa: [
            { q: "Your notice period is 90 days; can you join earlier?", a: "Be honest and constructive: 'My official notice is 90 days. I'll request early release and I'm open to a buyout; realistically 45–60 days. If you can support buyout reimbursement, that speeds it up.'" },
            { q: "Are you currently serving notice?", a: "If yes, say so with the last working day and status of other offers (without naming exact numbers early). If no, give your notice and the realistic earliest joining date." }
          ]
        },
        {
          id: "application-pipeline",
          title: "Application tracking & pipeline management",
          est: "Ongoing, 15 min/day",
          why: "Job hunting is a numbers game with a measurable funnel. Tracking turns random applying into a process you can debug.",
          learn: [
            "Log every application in the tracker: company, role, channel (referral/portal/recruiter), date, stage, next action, contact, notes.",
            "Target <b>40–60 applications</b> over the search, in waves of 10–15 per week, mixing tiers.",
            "Know rough funnel benchmarks: cold applications ~5–10% to recruiter screen, referrals ~30–50%, screen → onsite ~40–60%, onsite → offer ~20–40% (varies a lot).",
            "Diagnose the funnel: low callbacks → resume/targeting issue; fail screens → pitch/basics; fail onsite → technical depth or behavioral.",
            "Batch interviews: schedule warm-up companies first and dream companies 2–4 weeks later; try to align final rounds in the same window.",
            "Write a post-interview log within 1 hour: questions asked, what went well, what to fix.",
            "Weekly review (30 min): update stages, follow-ups, numbers, and adjust next week's applications."
          ],
          practice: [
            { t: "Add your first 15 applications to the tracker widget with channel and stage", p: "TASK", d: "E" },
            { t: "After 3 weeks, compute your funnel conversion by channel and stage", p: "TASK", d: "M" },
            { t: "Create a post-interview reflection template and use it after every round", p: "DOC", d: "E" },
            { t: "Plan your interview calendar: 3 warm-ups before the first Tier A loop", p: "TASK", d: "M" }
          ],
          notes: [
            "Stages: Wishlist → Applied → Referral asked → Recruiter screen → OA/Phone → Onsite/Loop → Offer → Negotiation → Accepted/Rejected.",
            "Follow up if no response: 7 days after applying (via referrer), 3–5 business days after an interview (to recruiter).",
            "Ask every recruiter about the timeline and other steps; note them so you can sequence processes and avoid exploding offers.",
            "Keep a 'question bank' from all interviews — companies reuse questions.",
            "Rejections are data, not verdicts. Many companies allow reapplying after 6–12 months; note cool-down dates."
          ],
          cases: [
            "Not tracking → forgetting follow-ups, double applying, missing deadlines for OAs.",
            "Interviewing at the dream company first while rusty.",
            "Offers landing months apart — no leverage; slow down fast processes or speed up slow ones by telling recruiters about deadlines.",
            "Burnout from too many simultaneous loops while working full time — cap at ~3–4 active onsite processes.",
            "Ignoring the data: 50 applications with 1 callback means the resume/targeting must change, not 'apply to 50 more'."
          ],
          qa: [
            { q: "Are you interviewing elsewhere?", a: "Yes, honestly but briefly: 'Yes, I'm in later stages with a couple of companies, but this role is a top choice because [specific reason].' Mention deadlines only when it helps align timelines." },
            { q: "What's your timeline?", a: "Give real constraints: other process stages, offer deadlines, notice period. Recruiters use this to prioritise you; it's legitimate leverage when true." }
          ]
        }
      ]
    },
    {
      name: "Step 3 · Interviewing",
      desc: "Behavioral rounds, project deep dives, hiring manager rounds and mocks — prepared with the same rigour as DSA.",
      topics: [
        {
          id: "star-story-bank",
          title: "Behavioral: STAR/CARL & the story bank",
          est: "1 week, then refresh",
          why: "Every company has a behavioral component; at Amazon it can be half the loop. Prepared stories turn vague rambling into crisp, high-signal answers.",
          learn: [
            "Learn <b>STAR</b> (Situation, Task, Action, Result) and <b>CARL</b> (Context, Action, Result, Learning); spend ~60% of the time on Action, use 'I' not 'we'.",
            "Write story #1: your biggest technical impact project, in STAR, ≤2 min, with a number in the Result.",
            "Write story #2: a failure or mistake you owned — what went wrong, what you did, what changed afterwards.",
            "Write story #3: a conflict with a stakeholder or teammate, in STAR, ≤2 min.",
            "Write story #4: leading without authority / mentoring a junior.",
            "Write story #5: handling ambiguity — unclear requirements or a new technology.",
            "Write story #6: disagree and commit — you pushed back, lost or won, and committed.",
            "Write story #7: tight deadline / delivering under pressure with a trade-off.",
            "Write story #8: customer obsession — going beyond for a user/client; story #9–10: learning something fast, improving a process.",
            "Build a matrix: stories × themes; each story should cover 2–3 themes so 8–10 stories cover ~25 common questions."
          ],
          practice: [
            { t: "Tech Interview Handbook — behavioral interview guide and question list", p: "DOC", d: "E", u: "https://www.techinterviewhandbook.org/behavioral-interview/" },
            { t: "Write 8–10 stories in a doc using a STAR template", p: "DOC", d: "M" },
            { t: "Record yourself telling each story; cut every story to under 2 minutes", p: "TASK", d: "M" },
            { t: "Build the story × theme matrix and fill gaps", p: "TASK", d: "E" },
            { t: "Do 2 behavioral mocks with a friend or on Pramp", p: "MOCK", d: "M", u: "https://www.pramp.com/" },
            { t: "Watch 2 mock behavioral interviews on YouTube and note what strong answers do", p: "YT", d: "E" }
          ],
          notes: [
            "<b>STAR template:</b> S (1–2 sentences: team, project, stakes) · T (your specific responsibility) · A (3–5 concrete steps <i>you</i> took, incl. one tough decision) · R (number + business outcome + what you learned).",
            "Themes to cover: impact, failure, conflict, leadership/mentoring, ambiguity, disagree & commit, tight deadline, customer focus, learning fast, ownership beyond your role, data-driven decision, handling feedback.",
            "Make Results measurable: 'reduced manual review effort by 60%', 'unblocked a ₹X crore renewal', 'cut latency from 6 s to 1.8 s'.",
            "Prepare follow-ups for each story: what would you do differently? what did your manager say? what was the hardest part? what data did you use?",
            "Failure stories must be real failures with real consequences, owned by you, with a lasting change — not humble-brags.",
            "Pause, pick the story, then signpost: 'I'll talk about the time we had to ship a RAG pilot in three weeks…'",
            "Keep confidentiality: say 'a large US insurer' rather than the client name."
          ],
          cases: [
            "Saying 'we' for everything — interviewer can't tell what you did.",
            "Rambling 5-minute stories with a 10-second Action section.",
            "Fake failure ('I work too hard') — signals low self-awareness.",
            "Badmouthing teammates or managers in conflict stories — show empathy and resolution.",
            "No Result or no number — story ends in the air.",
            "Reusing the same story for every question in one loop — interviewers compare notes."
          ],
          qa: [
            { q: "Tell me about a time you had a conflict with a colleague.", a: "Pick a work-disagreement (approach, priority), not personal drama. S/T briefly; A: you sought to understand their view, used data/prototype to compare options, found common goal, escalated only if needed; R: decision + outcome + improved relationship; learning." },
            { q: "Tell me about a time you failed.", a: "Real failure with stakes (missed deadline, model regression in prod). Own it without blaming. Actions to fix immediately, then the systemic change you made (tests, monitoring, process). Result: it hasn't recurred, and you now apply the lesson." },
            { q: "Describe a time you dealt with ambiguity.", a: "Unclear requirements (e.g. 'add AI to our claims process'). You clarified the goal with stakeholders, defined success metrics, built a quick prototype to reduce uncertainty, iterated with feedback. Result with numbers." },
            { q: "Tell me about a time you had a tight deadline.", a: "Show prioritisation: what you cut or deferred and why, how you communicated trade-offs early, what you did to de-risk. Result: delivered core scope on time, followed up with the rest." },
            { q: "Tell me about a time you mentored someone.", a: "Specific person and gap, what you did (pairing, code reviews, giving ownership of a module), how you measured growth, outcome (they shipped X independently / got promoted)." }
          ]
        },
        {
          id: "amazon-lp-mapping",
          title: "Amazon Leadership Principles mapping",
          est: "3–4 days",
          why: "Amazon (and AWS, Audible, Amazon Pay India) evaluates every interviewer's round against 2–3 LPs; the bar raiser checks depth. The LP list is also a great general map for any company.",
          learn: [
            "Read all 16 LPs and the one-paragraph description of each.",
            "Map each of your 8–10 stories to 2–3 LPs; ensure every LP has at least 2 stories.",
            "Prioritise the most-asked LPs: Customer Obsession, Ownership, Dive Deep, Deliver Results, Bias for Action, Earn Trust, Have Backbone; Disagree and Commit, Learn and Be Curious, Insist on the Highest Standards.",
            "Prepare for multiple follow-ups per story (Amazon interviewers drill 3–5 levels deep): numbers, your exact role, alternatives considered.",
            "Prepare 'Dive Deep' stories with metrics and root-cause analysis — natural for ML debugging stories.",
            "Know the Amazon loop structure: OA → phone screen → loop of 4–5 rounds, each with coding/design + LP questions, one Bar Raiser."
          ],
          practice: [
            { t: "Read Amazon's Leadership Principles page", p: "DOC", d: "E", u: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles" },
            { t: "Build an LP × story table; fill any LP with fewer than 2 stories", p: "TASK", d: "M" },
            { t: "Mock: a friend asks 1 LP question and 4 follow-ups per story", p: "MOCK", d: "H" },
            { t: "Read 5 Amazon India interview experiences on LeetCode Discuss / Glassdoor", p: "TASK", d: "E" }
          ],
          notes: [
            "<b>Customer Obsession</b>: worked backwards from user pain; e.g. you changed a model's threshold because client reviewers were overwhelmed.",
            "<b>Ownership</b>: took responsibility beyond your scope (fixed a broken pipeline no one owned, set up monitoring).",
            "<b>Dive Deep</b>: debugged a metric drop to root cause with data (training-serving skew, a data pipeline bug).",
            "<b>Bias for Action</b>: made a reversible decision quickly with incomplete info; explain why it was a 'two-way door'.",
            "<b>Have Backbone; Disagree and Commit</b>: disagreed with data, respectfully, then fully committed to the decision.",
            "<b>Deliver Results</b>: hit a goal despite setbacks; explain obstacles and how you kept quality.",
            "Use data in every answer — Amazon interviewers write down numbers as evidence."
          ],
          cases: [
            "Generic answers without specifics — Amazon interviewers will keep drilling until they find the edge of your knowledge.",
            "Stories where the customer is unclear — for internal work, the customer is the downstream team/user.",
            "Disagree-and-commit stories where you didn't actually commit, or you 'won' by escalation only.",
            "Being unable to give exact numbers when asked 'how much?' — know your metrics.",
            "Not preparing LPs for SDE/MLE loops assuming it's only for managers — every Amazon loop tests them."
          ],
          qa: [
            { q: "Tell me about a time you went beyond what the customer asked for. (Customer Obsession)", a: "Customer need → insight you uncovered (talking to users, analysing logs) → what you built beyond the ask → measurable customer outcome → how you validated it." },
            { q: "Tell me about a time you made a decision with incomplete data. (Bias for Action)", a: "Situation with time pressure, what data you had and lacked, why the decision was reversible, the mitigation/rollback plan, the outcome and what you'd change." },
            { q: "Describe a time you dug deep to find the root cause. (Dive Deep)", a: "Symptom (metric drop), hypotheses, data you examined (logs, slices, feature distributions), root cause, fix, preventive monitoring/test added." }
          ]
        },
        {
          id: "tmay-why-leaving",
          title: "'Tell me about yourself' & 'Why are you leaving?'",
          est: "1–2 days",
          why: "The first 2 minutes of nearly every interview. A crisp opening sets the frame for the whole round; a bad 'why leaving' answer is an instant red flag.",
          learn: [
            "Write a 90-second 'Tell me about yourself': present → past → future (why this role).",
            "Include 1–2 headline achievements with numbers and the skills the role needs.",
            "Prepare a 30-second version for recruiter calls and a 2-minute version for hiring managers.",
            "Write a positive 'why are you leaving' answer focused on what you're moving toward.",
            "Write 'why this company' answers for each top-10 company (product, team, tech, mission — specific).",
            "Practise aloud until it sounds natural, not memorised; record and listen."
          ],
          practice: [
            { t: "Write your 90-second TMAY and time it", p: "DOC", d: "E" },
            { t: "Record TMAY on video 3 times; fix filler words and pace", p: "TASK", d: "M" },
            { t: "Write 'why this company' for your top 10 targets", p: "DOC", d: "M" },
            { t: "Mock the first 5 minutes of an interview with a friend", p: "MOCK", d: "E" }
          ],
          notes: [
            "<b>TMAY template:</b> 'I'm an AI engineer with N years at [company], where I build [type of systems] for [kind of clients/users]. Most recently I [headline project + metric]. Before that I [earlier relevant thing]. I'm now looking to [what you want: own an AI product at scale], which is why this role on [team] excites me — especially [specific thing].'",
            "<b>Why leaving template:</b> 'I've learned a lot — [1 positive]. I'm looking for [ownership of a product / larger scale / deeper ML engineering] which is hard to get in a project-based model. This role offers exactly that.'",
            "Tailor the last line of TMAY for every company and role.",
            "Hiring managers want: relevant, concise, energetic, and a reason this move makes sense.",
            "End with a hook that invites a follow-up question about your best project.",
            "Keep your 'why leaving' consistent across recruiter, HM and HR rounds."
          ],
          cases: [
            "Reciting your resume from school onwards.",
            "Badmouthing your current employer, manager or 'services culture' — never.",
            "Saying 'money' as the main reason — it's fine to want growth in comp, but lead with role and growth.",
            "Generic 'why this company': 'it's a great brand'.",
            "TMAY over 3 minutes — interviewer loses interest."
          ],
          qa: [
            { q: "Tell me about yourself.", a: "90 seconds: current role and core skill → headline achievement with number → relevant earlier experience → why this role now. Finish on something you want them to ask about." },
            { q: "Why are you leaving your current company?", a: "Toward, not away: what you've gained there, what you're seeking (product ownership, scale, depth in AI), why this role offers it. Positive tone, no complaints." },
            { q: "Why do you want to join us?", a: "Specific: a product or AI problem they're solving, an engineering blog/talk you read, team's tech, and how your experience maps to it. One sentence on growth for you." },
            { q: "Why should we hire you?", a: "Three points matched to the JD, each backed by evidence: e.g. built production RAG at scale (metric), strong engineering/MLOps (deployed X models), and ownership/communication with clients." }
          ]
        },
        {
          id: "project-deep-dive",
          title: "Project deep-dive round",
          est: "3–5 days",
          why: "Most AI/ML loops have a round where you explain one project end to end and get grilled on trade-offs. For services engineers it's where you prove depth and personal ownership.",
          learn: [
            "Pick 2 projects (one main, one backup) where you owned major decisions and know the numbers.",
            "Prepare a 5-minute overview: problem & business goal → users/scale → architecture → your role → results.",
            "Draw the architecture diagram from memory on a whiteboard/excalidraw in under 3 minutes.",
            "List every key decision with the alternatives you considered and why you chose (model, chunking, vector DB, framework, cloud service, eval method).",
            "Know your metrics cold: baselines, eval set, offline vs online, latency, cost per request, adoption.",
            "Prepare 'what went wrong' and 'what would you do differently with more time/data'.",
            "Prepare how you'd scale it 10× or 100× and what would break first.",
            "Sanitise: remove client names and confidential numbers; use relative numbers if needed."
          ],
          practice: [
            { t: "Write a 1-page project brief (problem, arch, decisions, metrics, lessons) for your main project", p: "DOC", d: "M" },
            { t: "Draw the architecture diagram from memory, timed", p: "TASK", d: "E" },
            { t: "Ask a friend to grill you for 30 minutes with 'why?' after every answer", p: "MOCK", d: "H" },
            { t: "Prepare answers to 15 likely deep-dive questions (list below)", p: "DOC", d: "M" }
          ],
          notes: [
            "Structure: <b>Why</b> (business problem, stakes) → <b>What</b> (system, scale) → <b>How</b> (architecture, key decisions) → <b>Results</b> (metrics) → <b>Reflection</b> (lessons, next steps).",
            "Interviewers check: Did you own it? Do you understand the parts you didn't build? Can you reason about trade-offs? Do you measure?",
            "Use the trade-off formula: 'We chose X over Y because of [constraint]; the cost was [downside]; we mitigated with [Z].'",
            "Have numbers ready: data size, latency p95, accuracy/F1/faithfulness, cost, users, timeline, team size and your share.",
            "If you didn't build a component, say so and explain how it works anyway — honesty plus understanding beats bluffing.",
            "Link back to ML system design concepts (evaluation, monitoring, drift, serving) — it shows you can generalise."
          ],
          cases: [
            "Describing the team's work so vaguely that ownership is unclear.",
            "No metrics or eval method — 'the client was happy' isn't a result.",
            "Bluffing about a component you didn't touch; interviewers drill until it breaks.",
            "Getting lost in details for 20 minutes — give the overview first, then let them choose where to dig.",
            "Sharing confidential client data, screenshots or code."
          ],
          qa: [
            { q: "Walk me through the architecture of your project.", a: "Draw it left to right: data sources → ingestion → processing/model → serving → users, with monitoring/eval loop. Name the tech for each box and point to the 2–3 decisions that mattered most." },
            { q: "Why did you choose this approach over alternatives?", a: "State the alternatives you seriously considered, the decision criteria (accuracy, latency, cost, team skill, timeline, compliance), the evidence (quick experiment/benchmark) and the trade-off you accepted." },
            { q: "How did you measure success?", a: "Offline metrics on a defined eval set (and how it was built), online/business metrics (adoption, time saved, accuracy in production), baselines and the improvement over them." },
            { q: "What would you do differently?", a: "Pick 1–2 real lessons: e.g. build the eval set earlier, invest in data quality before model tuning, add monitoring from day one. Show you've already applied the lesson since." },
            { q: "How would you scale this to 100× users?", a: "Identify bottlenecks (LLM rate limits, vector DB memory, ingestion throughput), then propose caching, horizontal scaling, async processing, sharded indexes, model routing for cost, and stronger monitoring." }
          ]
        },
        {
          id: "hm-culture-round",
          title: "Hiring manager & culture-fit round",
          est: "2–3 days",
          why: "The hiring manager often has veto power and decides the level. They assess ownership, communication, motivation and team fit, not just technical skill.",
          learn: [
            "Research the manager (LinkedIn, talks, blog posts) and the team's product/charter.",
            "Prepare questions about the team's roadmap, challenges and how success is measured in the first 6 months.",
            "Prepare stories on ownership, working with product/stakeholders, prioritisation and handling feedback.",
            "Show product sense: how the ML work affects users and business metrics.",
            "Be ready for 'how do you handle disagreement with your manager?' and 'what kind of manager do you work best with?'",
            "Signal level: talk about scope (systems you owned, decisions you drove, people you influenced)."
          ],
          practice: [
            { t: "Write 5 tailored questions for each hiring manager before the call", p: "DOC", d: "E" },
            { t: "Mock an HM round with a senior engineer/manager friend", p: "MOCK", d: "M" },
            { t: "Prepare a 30-60-90 day plan outline for your top target role", p: "DOC", d: "M" }
          ],
          notes: [
            "HMs ask themselves: Will this person ship? Can I trust them with ambiguity? Will they make the team better? Are they excited about <i>this</i> work?",
            "Culture fit means values alignment, not being identical — show curiosity, ownership, low ego, and clear communication.",
            "Mention how you work with non-ML stakeholders (PMs, business, clients) — services experience is a strength here; frame client management as stakeholder management.",
            "Ask about the team's ML maturity (eval, deployment, on-call) — it shows you think about production.",
            "Close strongly: summarise why you fit and ask 'is there anything that makes you hesitant about my fit?' to address concerns live."
          ],
          cases: [
            "Treating the HM round as casual and not preparing.",
            "Only talking about technology, never users or business impact.",
            "Asking about leave, WFH and perks first — save for the recruiter/HR stage.",
            "Appearing to want 'any job' — show specific interest in this team.",
            "Overclaiming leadership you can't back with stories."
          ],
          qa: [
            { q: "How do you handle disagreement with your manager?", a: "Disagree privately with data and a proposed alternative, listen to their context, align on the goal, and commit once decided. Example story in STAR." },
            { q: "How do you prioritise when everything is urgent?", a: "Clarify impact and deadlines with stakeholders, use impact × effort, communicate trade-offs early, protect focus time, and revisit priorities weekly. Short example." },
            { q: "What kind of work environment helps you do your best?", a: "Honest and aligned to the role: clear goals, ownership, fast feedback, colleagues who give candid code/design reviews. Avoid answers that conflict with the team's known culture." },
            { q: "What would you do in your first 3 months here?", a: "Learn (systems, data, people, metrics) → deliver a small win in the first month → take ownership of a meaningful piece by month 3; mention specific things based on the team's context." }
          ]
        },
        {
          id: "mock-interviews",
          title: "Mock interviews & feedback loop",
          est: "Weekly, ongoing",
          why: "Real interview performance differs from solo practice; mocks expose nervousness, timing and communication gaps before they cost you an offer.",
          learn: [
            "Schedule at least 1 mock per week from week 4 of prep: alternate coding, system design, ML design and behavioral.",
            "Use a mix: peers (free), Pramp (free peer mocks), interviewing.io or paid mentors (senior engineers from target companies).",
            "Simulate real conditions: camera on, timed, shared editor/whiteboard, no pausing.",
            "Ask for a written score on a rubric: problem solving, communication, coding, testing, design depth, behavioral signal.",
            "Log feedback in the tracker and turn each weakness into a specific drill.",
            "Be the interviewer for a friend — you'll learn what good answers look like."
          ],
          practice: [
            { t: "Book 2 peer mocks on Pramp", p: "MOCK", d: "M", u: "https://www.pramp.com/" },
            { t: "One interviewing.io or paid mentor mock before your first Tier A loop", p: "MOCK", d: "H", u: "https://interviewing.io/" },
            { t: "Run a behavioral mock using 5 random questions from the Tech Interview Handbook list", p: "MOCK", d: "M" },
            { t: "Watch 2 interviewing.io public mock recordings and note what strong candidates do", p: "YT", d: "E" },
            { t: "Interview a friend for 45 minutes using a rubric", p: "MOCK", d: "M" }
          ],
          notes: [
            "Rubric for self-review: Did I clarify? Did I think aloud? Did I state complexity/trade-offs? Did I test? Did I manage time? Did I sound confident and collaborative?",
            "Record mocks (with consent) — watching yourself is the fastest way to fix filler words and silence.",
            "Use a feedback log: date, type, score, top 2 issues, drill assigned, re-tested date.",
            "Do the last mock 2–3 days before a real loop, not the night before.",
            "Nervousness reduces with repetition; real low-stakes interviews (warm-up companies) are the best mocks."
          ],
          cases: [
            "Only practising alone — first real interview becomes the mock.",
            "Mocks with friends who only praise — ask for brutal, rubric-based feedback.",
            "Collecting feedback but not changing anything.",
            "Doing only coding mocks and skipping behavioral/HM practice."
          ],
          qa: [
            { q: "What was the feedback from your last interview / mock and what did you change?", a: "Shows coachability: specific feedback (e.g. 'jumped into code without clarifying'), concrete change (a clarifying checklist), result in later interviews." },
            { q: "How do you handle a question you don't know?", a: "Say what you do know, reason aloud from first principles, ask a clarifying question or for a hint, and be honest — interviewers value structured thinking over bluffing." }
          ]
        },
        {
          id: "questions-to-ask",
          title: "Questions to ask the interviewer",
          est: "1 day",
          why: "'Do you have any questions?' closes every round. Good questions signal seniority and interest and give you data to choose between offers.",
          learn: [
            "Prepare 3–5 questions per round type: engineer, hiring manager, skip-level, HR.",
            "Ask about the work: current biggest technical challenge, how ML models go to production, evaluation practices.",
            "Ask about the team: size, seniority mix, how decisions are made, on-call.",
            "Ask about growth: how performance is measured, promotion process, what top performers do differently.",
            "Ask about culture: what the interviewer likes/would change, how disagreement is handled.",
            "Save compensation, leave and WFH questions for the recruiter/HR conversation.",
            "Use answers as data in your decision matrix between offers."
          ],
          practice: [
            { t: "Tech Interview Handbook — 'questions to ask' list; pick your top 15", p: "DOC", d: "E", u: "https://www.techinterviewhandbook.org/" },
            { t: "Write a question bank grouped by round type", p: "DOC", d: "E" },
            { t: "After each round, note the answers in your tracker notes", p: "TASK", d: "E" }
          ],
          notes: [
            "For engineers: 'What does a typical week look like?' · 'How do models go from notebook to production here?' · 'What's one thing you'd improve in the ML stack?'",
            "For hiring managers: 'What would make someone successful in this role in 6 months?' · 'What's the biggest challenge the team faces this year?' · 'How is the team's impact measured?'",
            "For AI teams specifically: 'How do you evaluate LLM features before launch?' · 'How much of the work is building vs integrating APIs?' · 'What's the GPU/compute situation?'",
            "For HR: 'What's the leveling for this offer and how is it decided?' · 'How does the performance and appraisal cycle work?' · 'What's the vesting schedule and refresh policy?'",
            "Closing question: 'Is there anything in my background that makes you hesitant?' — gives you a chance to address concerns.",
            "Listen and ask a follow-up to their answer — a conversation beats a list."
          ],
          cases: [
            "'No, I don't have any questions' — signals low interest.",
            "Asking things clearly answered on the website.",
            "Asking about salary/leave in a technical round.",
            "Asking 10 questions when there are 3 minutes left — pick 1–2."
          ],
          qa: [
            { q: "Do you have any questions for me?", a: "Ask 2 thoughtful, role-specific questions tailored to the interviewer's role, and a short follow-up on their answer. Thank them and reiterate interest briefly." },
            { q: "What questions help you compare two offers?", a: "Team charter and roadmap stability, manager style, on-call load, ML maturity, promotion timelines, vesting/refreshers, learning budget — collect the same data from each company." }
          ]
        }
      ]
    },
    {
      name: "Step 4 · Offer & transition",
      desc: "Understand the offer, negotiate well, resign cleanly and start strong at the new company.",
      topics: [
        {
          id: "comp-india",
          title: "Compensation structure in India",
          est: "2–3 days",
          why: "Indian offers are quoted as CTC with many components; two offers with the same CTC can differ by lakhs in actual cash. You must compare like for like.",
          learn: [
            "Break down CTC: <b>fixed</b> (basic, HRA, special allowance, LTA), <b>employer PF</b> (12% of basic, often capped), <b>gratuity</b> (≈4.81% of basic), <b>variable/performance bonus</b>, <b>joining/sign-on bonus</b>, <b>RSUs/ESOPs</b>, benefits (insurance, meal cards, NPS).",
            "Compute <b>monthly in-hand</b>: fixed gross − employee PF − professional tax − income tax (TDS). Use the new vs old tax regime correctly.",
            "Variable pay: target % vs typical payout %; ask for last 2 years' actual payout ratios.",
            "RSUs (public companies): grant value, vesting schedule (e.g. Amazon 5/15/40/40 back-loaded, others more even), cliff, refreshers, currency risk (USD-denominated).",
            "ESOPs (startups): number of options, strike price, latest valuation/409A-equivalent, vesting (often 4 years with 1-year cliff), exercise window after leaving, liquidity/buyback history, taxation at exercise.",
            "Joining bonus terms: clawback if you leave within 12 months; sometimes paid in two instalments.",
            "Other: relocation, notice buyout reimbursement, insurance coverage for parents, WFH policy, learning budget.",
            "Know about India's new Labour Codes (in force from late 2025): wages must be ≥50% of total remuneration, which can raise PF/gratuity and change in-hand — confirm the structure with HR."
          ],
          practice: [
            { t: "Build a spreadsheet: CTC breakdown → annual cash → monthly in-hand → year 1–4 total comp", p: "TASK", d: "M" },
            { t: "Compute your current in-hand and total comp accurately from payslips and Form 16", p: "TASK", d: "E" },
            { t: "Check 10 offers for your target level on levels.fyi and LeetCode Discuss compensation", p: "TASK", d: "E", u: "https://leetcode.com/discuss/compensation" },
            { t: "Model ESOP value scenarios (0×, 1×, 3× valuation) for a startup offer", p: "TASK", d: "M" }
          ],
          notes: [
            "Compare offers on <b>year-1 cash</b>, <b>4-year total</b> and <b>guaranteed vs at-risk</b> parts separately. Joining bonus and RSUs inflate 'CTC' differently.",
            "Typical for many product companies: variable 10–20% of fixed; startups may have little variable but more ESOPs.",
            "Some companies include one-time items (joining bonus, relocation, insurance premium) in 'CTC' — ask for 'fixed + variable' and 'one-time' separately.",
            "Treat startup ESOPs as a lottery ticket: value them at near-zero for comparison unless there is a buyback/liquidity history.",
            "RSU grants are often converted at a fixed exchange rate and stock price at grant; actual value moves with stock and INR/USD.",
            "Employer PF is part of CTC but not in-hand; it's still your money (retirement), so count it, but separately.",
            "Ask for the offer breakup in writing before negotiating — negotiate components, not just the headline."
          ],
          cases: [
            "Comparing CTC headlines that include one-time bonuses and 4-year RSUs vs pure fixed salary.",
            "Assuming 100% variable payout — many companies pay out less.",
            "Ignoring joining bonus clawback clauses.",
            "Treating ESOPs at the last round valuation as cash.",
            "Forgetting tax: joining bonus and RSU vesting are taxed as salary income.",
            "Not checking the exercise window for ESOPs after leaving (could force a large payment or forfeit)."
          ],
          qa: [
            { q: "What is your current CTC and how is it structured?", a: "Give accurate, verifiable numbers (fixed, variable, bonuses, any stock). Mention upcoming appraisal or bonus you'll forfeit if relevant ('My appraisal is due in April and I'll forgo the annual bonus by leaving now')." },
            { q: "Can you share your payslips?", a: "Standard at the offer/BGV stage in India; share after receiving a written offer or at the HR's verification step, not to unverified third parties early in the process." }
          ]
        },
        {
          id: "negotiation",
          title: "Negotiation: competing offers & counter-offers",
          est: "1 week during offers",
          why: "A single polite negotiation conversation commonly adds 10–20% to an offer. Switchers who skip it leave lakhs per year on the table — compounding into future hikes.",
          learn: [
            "Always negotiate — recruiters expect it; the offer is rarely withdrawn for polite negotiation.",
            "Avoid stating a number first; if forced, anchor high with a researched range for the level (levels.fyi, LeetCode Discuss).",
            "Get <b>competing offers</b> to land together — the strongest leverage. Share them truthfully (numbers, not documents unless asked).",
            "Negotiate the components: base first, then joining bonus (to cover forfeited bonus/notice buyout), RSUs, level, joining date.",
            "Ask for the level to be reconsidered if you're under-levelled — it affects comp for years.",
            "Use calibrated questions ('How can we get closer to X?', 'What flexibility is there on the joining bonus?').",
            "Handle exploding offers by asking for a reasonable extension (a few days to a week) citing other processes.",
            "Handle counter-offers from your current employer: decide in advance; most people who accept counters leave within a year anyway.",
            "Get everything in writing in the revised offer letter before accepting."
          ],
          practice: [
            { t: "Read Haseeb Qureshi's 'Ten Rules for Negotiating a Job Offer' (both parts)", p: "DOC", d: "E", u: "https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/" },
            { t: "Read Tech Interview Handbook — negotiation section", p: "DOC", d: "E", u: "https://www.techinterviewhandbook.org/" },
            { t: "Write your negotiation script (call + email) and role-play it with a friend", p: "MOCK", d: "M" },
            { t: "Set your target, acceptable and walk-away numbers for each offer", p: "TASK", d: "M" },
            { t: "Read 'Never Split the Difference' chapters on calibrated questions and labels", p: "DOC", d: "M" }
          ],
          notes: [
            "<b>Negotiation email template:</b> 'Thank you for the offer — I'm genuinely excited about [team/role]. I'd like to make this work. I have another offer at [₹X fixed + ₹Y joining + RSUs], and given [scope/level, my RAG production experience], I was hoping we could get the fixed to ₹Z and add a joining bonus to cover my forfeited bonus and notice buyout. If we can get there, I'm ready to sign this week.'",
            "Pair every ask with enthusiasm and a commitment ('if we can get to X, I'll accept') — recruiters need a reason to go back to the comp team.",
            "Base salary is hardest to move but compounds (future hikes are % of base); joining bonus and RSUs are easier to increase.",
            "Don't lie about competing offers — Indian recruiters may ask for offer letters, and the industry is small.",
            "Silence and 'Let me think about it' are powerful; don't accept on the first call.",
            "Counter-offer from current employer: ask yourself whether the reasons you wanted to leave are fixed by money. Usually not.",
            "Big tech has fixed bands per level — if you're at the top of a band, ask for a level re-evaluation or more sign-on/RSUs instead."
          ],
          cases: [
            "Revealing current CTC first and getting anchored to a '30% hike' instead of market value — try to get their range first.",
            "Accepting verbally on the call before seeing the revised written offer.",
            "Negotiating aggressively/rudely or with ultimatums you won't keep.",
            "Using fake offers as leverage.",
            "Accepting a counter-offer that's just early appraisal — the underlying issues remain and trust is damaged.",
            "Negotiating only the base and forgetting joining bonus, notice buyout, level and joining date."
          ],
          qa: [
            { q: "What are your salary expectations?", a: "'I'd like to understand the full scope and level first. Based on my research for this level in Bangalore, roles like this pay in the range of ₹A–B fixed. What range has been budgeted?' Anchor at the top of the researched range if pressed." },
            { q: "This is our best offer. Can you accept today?", a: "'I appreciate it and I'm excited. I need a few days to review the details and close out my other process — could I get back to you by [date]?' Then ask for specific movement on one component." },
            { q: "Your current company has offered you a counter. Will you stay?", a: "Decide beforehand. If leaving: 'I appreciate the offer, but my decision is about the role and growth, not just compensation. I've accepted another position.' Stay polite and grateful." }
          ]
        },
        {
          id: "bgv-resignation",
          title: "BGV, relieving letter, resignation & handover",
          est: "Over the notice period",
          why: "Indian offers depend on clean background verification and a relieving letter; a messy exit can delay joining or even cost the offer.",
          learn: [
            "Background verification (BGV): employment dates, designation, salary (sometimes), education, address, criminal check; done by firms like AuthBridge/First Advantage/HireRight.",
            "Make sure resume dates, titles and CTC exactly match HR records and documents.",
            "Documents to keep: offer and appointment letters, all payslips, Form 16, increment letters, resignation acceptance email, relieving and experience letters, PF UAN.",
            "Resign only after the <b>written offer</b> is accepted (and ideally after the new company confirms BGV can proceed with your current employer's check after you leave).",
            "Write a short, positive resignation email to your manager (after a verbal conversation), copy HR as per policy.",
            "Create a handover document: projects, access, credentials (transfer via proper channels), runbooks, open issues, contacts; train your replacement.",
            "Full & final settlement (F&F): leave encashment, pending bonus, deductions; usually 30–60 days after last day.",
            "Transfer PF through the EPFO portal using UAN; submit Form 12B / previous-employer income details to the new employer for correct TDS."
          ],
          practice: [
            { t: "Collect all employment documents into one folder (payslips, Form 16, letters, UAN)", p: "TASK", d: "E" },
            { t: "Draft your resignation email (keep ready)", p: "DOC", d: "E" },
            { t: "Create a handover document template for your current projects", p: "DOC", d: "M" },
            { t: "Check your UAN is KYC-linked on the EPFO member portal", p: "TASK", d: "E" }
          ],
          notes: [
            "<b>Resignation email template:</b> 'Hi [Manager], as discussed, I'm resigning from my position as [title], effective today. As per policy, my last working day would be [date]; I'm happy to discuss an earlier release with a complete handover. Thank you for the support and learning over the past [N] years — I'll make sure the transition is smooth. Regards, [Name].'",
            "Tell your manager in person/call first, then send the email; never let them hear it from HR or LinkedIn.",
            "Keep working seriously during notice — references and rehire eligibility matter in a small industry.",
            "Don't update LinkedIn with the new role until you've joined (or at least until after BGV).",
            "Return all assets (laptop, ID card) and get written clearance; take personal files off the work laptop beforehand (never company data).",
            "Ask for the relieving letter and experience letter on your last day or within F&F; the new employer will ask for it within the first months."
          ],
          cases: [
            "Mismatch between declared CTC/designation and BGV records → offer revoked.",
            "Resigning on a verbal offer that never materialises.",
            "Copying company code/data/documents to personal drives — policy and legal violation, can trigger termination for cause.",
            "Burning bridges with a negative exit interview — keep feedback constructive.",
            "Not getting the relieving letter (e.g. due to unpaid buyout) — joining or BGV gets stuck.",
            "Forgetting to declare previous-employer income to the new employer → tax shortfall at year end."
          ],
          qa: [
            { q: "Why do you want to leave? (exit interview / manager conversation)", a: "Thank them, cite growth/role reasons, give constructive and specific feedback if asked, avoid blame. Keep the door open for a future return." },
            { q: "Can we contact your current employer for reference?", a: "'Yes, after I've resigned / after my last working day; before that, please use my previous managers or colleagues as references.'" }
          ]
        },
        {
          id: "first-90-days",
          title: "First 90 days at the new job",
          est: "3 months",
          why: "Probation and first impressions set your trajectory, level perception and first appraisal — especially when moving from services to product culture.",
          learn: [
            "Weeks 1–2: set up environment, meet the team, read design docs and on-call runbooks, understand the product and key metrics.",
            "Have a 1:1 with your manager to agree on 30/60/90-day expectations and how success is measured.",
            "Ship a small change in the first 2–3 weeks (bug fix, small feature, eval improvement) to learn the deploy process.",
            "Map stakeholders: PM, data/infra teams, adjacent ML teams; schedule 15–30 min intros.",
            "By day 60: own a meaningful component or project; by day 90: deliver measurable impact and propose improvements.",
            "Keep a brag document from day 1: what you did, impact, links — fuel for appraisals and your next switch.",
            "Learn the culture: code review norms, writing (design docs/PRDs), on-call, how decisions are made.",
            "Complete probation requirements and pending admin: PF transfer, insurance, tax declarations."
          ],
          practice: [
            { t: "Write a 30-60-90 plan in week 1 and review it with your manager", p: "DOC", d: "M" },
            { t: "Start a brag document and update it weekly", p: "DOC", d: "E" },
            { t: "Schedule 10 intro 1:1s in the first month", p: "TASK", d: "E" },
            { t: "Ship your first PR to production within 3 weeks", p: "TASK", d: "M" }
          ],
          notes: [
            "Ask lots of questions early — the 'new person' window is when questions are cheapest; write down the answers in a personal wiki.",
            "Product companies value writing: short design docs, clear PR descriptions, async updates. Practise this from week 1.",
            "Understand the metrics your team is judged on and connect your work to them.",
            "Avoid proposing big rewrites in month 1; first understand why things are the way they are.",
            "Over-communicate progress and blockers in standups and 1:1s; don't disappear for two weeks on a hard problem.",
            "Build relationships with on-call and infra folks — they unblock you."
          ],
          cases: [
            "Waiting to be told what to do (services habit) — product teams expect proactive ownership.",
            "Criticising existing systems before understanding constraints.",
            "Not clarifying expectations — surprises at probation review.",
            "Working long hours silently instead of asking for help.",
            "Not documenting achievements → weak first appraisal."
          ],
          qa: [
            { q: "Manager 1:1: what do you need from me?", a: "Clear priorities for the first quarter, early feedback (good and bad), introductions to key people, and a sense of what 'exceeding expectations' looks like at your level." },
            { q: "How is your onboarding going? (30-day check-in)", a: "Concrete: what you've learned, what you've shipped, what's unclear, what support would speed you up, and your plan for the next 30 days." }
          ]
        }
      ]
    }
  ]
});
