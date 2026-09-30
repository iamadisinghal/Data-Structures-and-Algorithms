# Waypoint prompt library for Claude.ai

There are 20 prompts here that mirror the Claude Code slash commands. They work in any Claude.ai chat (web, desktop or mobile, any plan). They work best inside the **Job Search Copilot** project (see `PROJECT-INSTRUCTIONS.md`).

**How to use**
1. Copy a prompt and replace every `{{placeholder}}`. The web app's **With Claude** tab offers many of these tasks pre-filled with your data. If the tab's version of a prompt differs from this file, use the tab's version, because it matches the app's importer exactly.
2. Not using the project? Paste the instruction block from `PROJECT-INSTRUCTIONS.md` as your first message, then the prompt.
3. **Bringing results back:** in the web app's **With Claude** tab, open the matching task, choose to import Claude's reply, and paste **Claude's complete reply**. The app reads the JSON block at the end and shows you a review screen, and nothing is saved until you approve. Each prompt below names its import box and the exact JSON shape.

**Common placeholders:** `{{today}}` (e.g. 2026-09-30), `{{region}}` (global, india, us, uk, eu, canada, australia, mena or sea), `{{currency}}` (e.g. USD, INR), `{{my_profile}}` (paste your Context Pack or profile, or write "see project knowledge"), `{{job_description}}` (the full JD text).

**JSON rules used by every prompt:** exactly one ```json block at the very end of the reply. Use `""`, `0` or `[]` for unknown values, never "N/A". Never invent facts to fill a field. The web app adds ids, timestamps, statuses and `source` itself when you approve.

| # | Prompt | Mirrors | Import box in the web app (With Claude tab) |
|---|---|---|---|
| 1 | Health check and first plan | `/start` | Plan my week |
| 2 | Build my profile from a resume | `/profile` | Parse my resume into a structured profile |
| 3 | Rewrite my weakest bullets | `/profile` | Rewrite my weakest resume bullets |
| 4 | Market scan | `/market-scan` | Scan the job market for my target role |
| 5 | Company deep dive | `/research-company` | Research a company |
| 6 | Find live jobs | `/find-jobs` | Find live job openings for me |
| 7 | Analyze a job | `/analyze-job` | Deep-analyze this job vs my profile |
| 8 | Tailor my resume | `/tailor-resume` | Tailor my resume for this job |
| 9 | Cover letter | `/cover-letter` | Write a cover letter for this job (plain text) |
| 10 | Find people | `/find-people` | Find people to contact at a company |
| 11 | Outreach messages | `/outreach` | Draft personalized outreach |
| 12 | Application package | `/apply` | none (copy what you need) |
| 13 | Follow-ups due | `/follow-ups` | Plan my week |
| 14 | Interview prep | `/interview-prep` | Build an interview prep sheet (plain text) |
| 15 | STAR story bank | `/interview-prep` | none (copy into your story bank) |
| 16 | Mock interview | `/interview-prep` | none |
| 17 | Negotiation plan | `/negotiate` | Plan my salary negotiation (plain text) |
| 18 | Weekly plan | `/weekly-plan` | Plan my week |
| 19 | Skill-gap learning plan | `/weekly-plan` | Plan my week |
| 20 | Fix a JSON block that won't import | `/sync` | the box you were using |

**The "Plan my week" action shape** is shared by prompts 1, 13, 18 and 19. The web app turns each item into a pending **Action** (with id, `ref`, `status: "pending"` and `source: "claude"`) in your **Approval Queue**:
```json
{ "summary": "2 sentences",
  "actions": [
    { "type": "apply", "title": "Apply to Acme - Data Analyst (82% match)", "detail": "Why, and what will happen",
      "jobId": "job_... or empty", "contactId": "ct_... or empty", "companyId": "co_... or empty", "impact": 3, "effort": 2 }
  ] }
```
Allowed `type` values: `tailor-resume`, `apply`, `find-people`, `research-company`, `send-outreach`, `follow-up`, `interview-prep`, `learn-skill`, `custom`. `impact` and `effort` are 1-3. Use existing ids from your data where relevant, otherwise `""`.

---

## 1. Health check and first plan (`/start`)

```text
Act as my Waypoint job-search copilot. Today is {{today}}. Here is my data: {{my_profile}}.
1) Score my profile's completeness as a checklist (contact, target titles, locations and work modes, salary expectation and minimum, summary, 8+ skills, 2+ bullets per role, share of bullets with numbers, education, 5+ STAR stories, standard screening answers).
2) Summarize my pipeline (jobs per status) and this week's activity vs my weekly goals: {{weekly_goals, e.g. 10 applications, 15 outreach, 5 follow-ups, 3 learning hours}}.
3) Ask me 3-5 targeted questions about the most important missing essentials.
4) Propose a 7-day plan of 5-8 concrete steps with impact and effort (1-3), as numbered "Proposed next steps".
End with one json block: {"summary":"","actions":[{"type","title","detail","jobId","contactId","companyId","impact","effort"}]}
```

**Expected output:** a checklist, a pipeline table, questions and a numbered plan. **JSON:** the "Plan my week" action shape above. Import it in **Plan my week**.

## 2. Build my profile from a resume (`/profile`)

```text
Here is my resume: {{resume_text or "see project knowledge"}}.
Extract a structured profile. Keep bullets verbatim (fix only obvious typos) and ask me about anything ambiguous; don't guess dates or titles. Dates as YYYY-MM; for the current role end = "" and current = true. Use canonical skill names.
Then, above the JSON, list: bullets with no metric or with duties instead of impact, skills mentioned in bullets but missing from my skills list, and 3-5 questions to recover metrics.
End with one json block in exactly this shape.
```

**JSON:** a profile object. Import it in **Parse my resume into a structured profile** (you then choose replace or merge):
```json
{ "name": "", "headline": "", "location": "", "linkedin": "", "github": "", "website": "",
  "currentTitle": "", "currentCompany": "", "yearsExperience": 0, "summary": "",
  "skills": [],
  "experience": [ { "title": "", "company": "", "location": "", "start": "2021-04", "end": "", "current": true, "bullets": [] } ],
  "education": [ { "degree": "", "school": "", "year": "", "details": "" } ],
  "projects": [ { "name": "", "link": "", "description": "", "bullets": [] } ],
  "certifications": [], "achievements": [], "languages": [] }
```

## 3. Rewrite my weakest bullets (`/profile`)

```text
Here is my profile: {{my_profile}}. Rewrite my weakest resume bullets (no metric, duties instead of impact, vague verbs, too long) as strong impact statements: action verb + what + measurable result. Use ONLY facts present in the original bullet and my profile; where a number is missing write [add metric]. Keep each under 30 words, and copy "original" exactly as it appears in my profile.
End with one json block: {"bullets":[{"role":"Title @ Company","original":"","improved":"","why":""}]}
```

**JSON:** `{"bullets":[{ "role", "original", "improved", "why" }]}`. Import it in **Rewrite my weakest resume bullets** and tick the rewrites to keep.

## 4. Market scan (`/market-scan`)

```text
Research the job market for {{role}} in {{location}} (region {{region}}, currency {{currency}}, work modes {{work_modes}}). Use web search and prefer sources from the last 12 months.
Cover: demand and hiring trends (last 6-12 months, cited); salary ranges for junior, mid and senior with each figure's source, URL and date (say whether base or total); the 10-15 most requested skills from a sample of recent postings (give the sample size); 8-12 companies actively hiring for this role that fit me, with why; the remote/hybrid/onsite split; and how I compare ({{my_profile}}), with my top 3 gaps.
Write a concise markdown report, then end with one json block in exactly this shape.
```

**JSON:** import it in **Scan the job market for my target role** (you can then add the companies, and add the gaps to your learning plan):
```json
{ "companies": [ { "name": "", "domain": "", "industry": "", "size": "", "location": "", "why": "" } ],
  "topSkills": [ { "name": "", "demand": "high" } ],
  "salary": { "currency": "{{currency}}", "low": 0, "median": 0, "high": 0, "source": "source name, URL, date" },
  "gaps": [ "" ] }
```
`demand` is `high`, `medium` or `low`.

## 5. Company deep dive (`/research-company`)

```text
Research {{company}} ({{company_domain}}) for a {{target_role}} application. Use web search and cite a URL and date for every non-obvious fact.
Find: mission; main products and services; notable news from the last 12 months (dated); culture signals (reviews with sample size, values, work style); the typical interview process for this kind of role; salary signals for the role in {{currency}}; key people relevant to the team (public professional info only); likely team pain points (labelled as inference) and how my background maps to each ({{my_profile}}); 3 talking points; watch-outs.
Write a brief markdown briefing with source links, then end with one json block in exactly this shape, with each field in 1-4 sentences.
```

**JSON:** the `Company.research` fields plus `painPoints`. Import it in **Research a company** (it's saved to that company):
```json
{ "mission": "", "products": "", "news": "", "culture": "", "interviewProcess": "", "salaryRange": "",
  "keyPeople": "", "painPoints": "", "sources": [ "https://..." ] }
```

## 6. Find live jobs (`/find-jobs`)

```text
Find 8-12 CURRENT openings that fit me. Target titles: {{target_titles}}. Locations: {{locations}}. Work modes: {{work_modes}}. Region {{region}}; salary floor {{minimum_salary}} {{currency}}. Extra criteria: {{extra or "none"}}.
Search with ATS x-ray queries (site:boards.greenhouse.io, site:jobs.lever.co, site:myworkdayjobs.com, site:jobs.ashbyhq.com, site:smartrecruiters.com), company careers pages, and regional boards (e.g. Naukri/foundit for India, Indeed, LinkedIn public job pages). Only include postings you actually found, with a working URL. Skip postings older than about 30 days, duplicates, likely scams, and jobs I already track: {{tracked_jobs or "none"}}.
Score each job 0-100 with the Waypoint rubric (must-haves 40, title/seniority 20, years/domain 15, location/mode 10, salary 10, authorization/notice 5). Show a ranked markdown table (title, company, location, why it fits, fit 0-100).
Then end with one json block in exactly this shape. My profile: {{my_profile}}.
```

**JSON:** import it in **Find live job openings for me** (save now, or send to the Approval Queue as `save-job` actions):
```json
{ "jobs": [
  { "title": "", "company": "", "location": "", "workMode": "hybrid", "url": "https://...", "source": "Greenhouse",
    "postedAt": "2026-09-25", "salaryMin": 0, "salaryMax": 0, "currency": "{{currency}}",
    "description": "key responsibilities and requirements as found in the posting", "fit": 78,
    "why": "Covers 7/9 must-haves; missing dbt; hybrid in target city" }
] }
```
`workMode` is `remote`, `hybrid`, `onsite` or `""`.

## 7. Analyze a job (`/analyze-job`)

```text
Analyze how well I fit this job. Be honest and specific. JD: {{job_description}}. My profile: {{my_profile}}.
In the reply: a requirements table (requirement | must-have or nice-to-have | evidence from my profile | covered, partial or gap), the match score with the rubric breakdown, gaps with honest mitigation (never suggest claiming a skill), red flags, and a verdict (apply now, apply after tailoring, network first, or skip).
End with one json block in exactly this shape.
```

**JSON:** import it in **Deep-analyze this job vs my profile** (it's saved to that job):
```json
{ "score": 0, "summary": "2-3 sentences", "mustHave": [], "niceToHave": [], "matched": [],
  "gaps": [ { "skill": "", "mitigation": "" } ], "redFlags": [], "keywords": [ "phrases to mirror if true" ],
  "interviewFocus": [ "topics they will probe" ] }
```

## 8. Tailor my resume (`/tailor-resume`)

```text
Tailor my resume for this job. JD: {{job_description}}. My master profile and stories: {{my_profile}}.
Rules: use only true facts. Select, reorder and rephrase; never add employers, titles, dates, degrees, metrics, tools or skills. Mirror the job's language only where it accurately describes me. Keep [add metric] where a number would help. Keep every role with its true title and dates. ATS-friendly. Aim for 1-2 pages: most recent role 4-6 bullets, older roles 2-4. The headline should mirror the job title if accurate.
Show the change log (what changed and why) and the top-20 keyword coverage before and after. List the requirements I genuinely lack; don't add them.
End with one json block in exactly this shape.
```

**JSON:** the `resume` object uses the `ResumeVersion.data` shape. Your name, contact details and education are filled in from your profile by the app. Import it in **Tailor my resume for this job**, preview it, and approve to save it as a resume version:
```json
{ "resume": {
    "headline": "", "summary": "", "skills": [],
    "experience": [ { "title": "", "company": "", "location": "", "dates": "Apr 2021 - Present", "bullets": [] } ],
    "projects": [ { "name": "", "description": "", "bullets": [] } ],
    "certifications": [] },
  "changes": [ "what you changed and why" ],
  "missingKeywords": [ "job requirements I genuinely lack" ] }
```

## 9. Cover letter (`/cover-letter`)

```text
Write a {{professional | warm | direct | enthusiastic}} cover letter (250-350 words) for {{job_title}} at {{company}}. JD: {{job_description}}. Company research: {{company_research or "please research briefly and use one specific, recent fact"}}. My profile: {{my_profile}}.
Open with a specific hook about the company, connect 2-3 of my real achievements to the job's top requirements, address one gap honestly if relevant, and close with a clear call to action. No clichés ("I am writing to express my interest"). Never invent facts; keep [add metric] placeholders.
Reply with the letter ONLY, as plain text ready to paste and signed with my name, with no notes before or after it.
```

**Expected output:** plain text only, with no JSON. Paste it into **Write a cover letter for this job**, edit it if needed, and save.

## 10. Find people (`/find-people`)

```text
Find 5-10 people at {{company}} I could reach out to about {{role_or_team}} opportunities: recruiters or talent partners, the likely hiring manager(s) (label them "likely"), team members in similar roles, alumni of {{my_schools}}, and former colleagues from {{my_past_employers}}.
Use public professional information only (name, current title, public profile URL). No personal emails, phone numbers, addresses, family or private accounts. Use search results and public pages, not logged-in LinkedIn pages, and never put my name in a search.
Write a markdown table (name, title, why relevant, suggested approach). Also give me LinkedIn and Google search URLs I can open myself. Then end with one json block in exactly this shape.
```

**JSON:** import it in **Find people to contact at a company** (add now, or send to the Approval Queue as `add-contact` actions):
```json
{ "contacts": [
  { "name": "", "title": "", "company": "{{company}}", "relationship": "recruiter",
    "linkedin": "public profile URL or empty", "source": "where you found them", "why": "", "approach": "" }
] }
```
`relationship` is `recruiter`, `hiring-manager`, `employee`, `alumni` or `colleague`.

## 11. Outreach messages (`/outreach`)

```text
Draft outreach from me to {{contact_name}}, {{contact_title}} at {{company}} (relationship: {{recruiter | hiring-manager | alumni | colleague | employee}}), about {{job_title_or_goal}}. What we share, or their public work: {{hook}}. My profile: {{my_profile}}.
Make it specific, warm and brief, using one true hook and one clear ask. Provide 3-5 options:
(1) a LinkedIn connection note of at most 300 characters, plus a variant of at most 200 characters (show the exact character counts);
(2) a longer LinkedIn message or email with subject (under 120 words): a referral ask if they know me, otherwise an informational or recruiter ask;
(3) a polite follow-up for after 5-7 days of silence.
I will send these myself. End with one json block in exactly this shape.
```

**JSON:** each message has the `send-outreach` payload shape. Import it in **Draft personalized outreach**, then copy, save as a draft, or queue each one for approval:
```json
{ "messages": [
  { "type": "connection", "channel": "linkedin", "subject": "", "body": "Hi ..." }
] }
```
`type` is `connection`, `referral`, `recruiter`, `informational`, `hiring-manager` or `follow-up`. `channel` is `linkedin` or `email`.

## 12. Application package (`/apply`)

```text
Help me prepare my application for {{job_title}} at {{company}} ({{job_url}}). JD: {{job_description}}. My profile: {{my_profile}}. My saved answers: {{answers or "none yet"}}. The form's screening questions: {{questions or "unknown"}}.
Give: (1) a checklist (tailored resume, cover letter needed or not, referral option, answers reviewed, salary field, portal account created by me, submitted by me); (2) answers to the standard questions (work authorization, sponsorship, notice period, start date, relocation, salary expectation, why I'm leaving, why this company, about me, strength, weakness, remote preference), using only true facts and marking [confirm] where I must check; (3) drafts for the screening questions within any stated limits.
I will submit the application myself.
```

**Expected output:** Markdown with a checklist and question-and-answer pairs to copy into the form. No JSON: the web app has no import box for this. Keep good answers somewhere you can reuse them. (In Claude Code, `/apply` stores them in your data's `answers` bank.)

## 13. Follow-ups due (`/follow-ups`)

```text
Today is {{today}}. My pipeline and contacts: {{jobs_and_contacts or "see project knowledge"}}.
Find: applications 7 or more days old with no response; messages with no reply after 5 or more days; interviews in the last 2 days without a thank-you; and stale items (applied 21 or more days ago, or 2 or more unanswered follow-ups) I should close out instead. Draft a short message for each: follow-ups add something new, and thank-yous mention one specific topic. Show a table (type, who or which job, days since, channel, first line). I will send them myself.
End with one json block: {"summary":"","actions":[{"type":"follow-up","title":"","detail":"<recipient, channel, then the full message text>","jobId":"","contactId":"","companyId":"","impact":2,"effort":1}]}
```

**JSON:** the "Plan my week" action shape, with `type: "follow-up"` and the full message text in `detail` so it shows on the approval card. Import it in **Plan my week**.

## 14. Interview prep (`/interview-prep`)

```text
Create an interview prep sheet (markdown) for a {{stage: recruiter screen | hiring manager | technical | panel}} interview for {{job_title}} at {{company}} on {{date}}. JD: {{job_description}}. Interviewers (if known): {{names_and_titles}}. My profile and STAR stories: {{my_profile}}.
Include: a one-page cheat sheet (company in 3 lines, role in 3 lines, their top 3 needs, my top 3 proof points, a 60-second "tell me about yourself" from true facts); a 5-bullet company briefing with recent news (cited); the interview process if public (cited); 12-20 likely questions (behavioral and role-specific), each with the STAR story that fits best or the story I still need (never invent one); tough questions about my gaps with honest answer strategies; 6-10 sharp questions to ask; a 30-60-90 day outline; and a logistics checklist.
```

**Expected output:** a Markdown prep sheet, with no JSON. Paste it into **Build an interview prep sheet** to save it to the job.

## 15. STAR story bank

```text
Help me build STAR stories for these competencies: {{leadership, conflict, failure, ambiguity, influence, technical depth, ...}}. My experience: {{my_profile}}.
For each competency, ask me one question at a time to recall a real example, then write it up as Title, Situation, Task, Action, Result (under 120 words), plus competencies, with a measurable result where I've given one ([add metric] otherwise). Never invent details. When I say "done", list all the stories in that format.
```

**Expected output:** stories in Title / Situation / Task / Action / Result / Competencies format (the `Story` fields). Add them to your STAR stories in the web app (Interview Prep). There's no import box for stories.

## 16. Mock interview

```text
Run a mock {{stage}} interview for {{job_title}} at {{company}}. Ask one question at a time and wait for my answer. After each answer, give 3-5 bullets of feedback: STAR structure, specificity, evidence and metrics, length (aim for 1.5-2 minutes spoken), and one stronger opening line that uses only what I said. After {{number, e.g. 6}} questions, summarize my strengths and the 3 things to practise.
```

**Expected output:** an interactive conversation. No JSON.

## 17. Negotiation plan (`/negotiate`)

```text
Help me negotiate. Offers: {{for each: company, role, base, bonus, equity per year, signing, benefits estimate, location, growth 1-5, wlb 1-5, deadline}}. My current pay: {{current}}. My minimum: {{minimum}} {{currency}}.
Research current market pay for this role, level and location (3-5 sources, each cited with URL and date; say whether base or total). Compare the offers in a table (year-1 total, steady-state annual, market percentile). Recommend a counter-offer range and priorities (base, bonus, equity, joining bonus, start date, remote, title, learning budget), plus a private walk-away point based on my minimum (never put it in a script). Write (a) an email script (150-220 words), (b) a phone script (the ask, holding a pause, "what's your number?", "this is our best offer", deadline pressure), and (c) accept and decline templates. Never suggest inventing or inflating a competing offer. I will contact the employer myself.
```

**Expected output:** a Markdown plan, with no JSON. Paste it into **Plan my salary negotiation** to save it as a report.

## 18. Weekly plan (`/weekly-plan`)

```text
Act as my job-search coach. Today is {{today}}. Weekly goals: {{applications, outreach, follow-ups, learning hours}}. This week so far: {{activity counts}}. Pipeline, contacts and pending actions: {{my_data or "see project knowledge"}}. Time available: {{hours}}.
Propose 6-12 prioritized actions for this week, in this order: follow-ups due; apply to top matches (70+, tailor the resume first if needed); find people at tier A companies with no contacts; outreach to known contacts; research tier A/B companies with no research; refill the pipeline if fewer than ~10 active saved jobs; interview prep for active interviews; skill gaps that recur across top jobs. Score impact and effort 1-3 (effort 1 = 15 minutes, 2 = 45 minutes, 3 = 2+ hours) and fit them to my time. Reference existing ids (jobId/contactId/companyId) where relevant, and leave "" otherwise. Don't duplicate pending actions.
Show a table (#, type, action, impact, effort, suggested day), then end with one json block: {"summary":"2 sentences","actions":[{"type","title","detail","jobId","contactId","companyId","impact","effort"}]}
```

**JSON:** the "Plan my week" action shape. Import it in **Plan my week**, tick the actions you want, and they appear in your **Approval Queue**.

## 19. Skill-gap learning plan

```text
Here are the jobs I'm targeting: {{2-5 JDs or job titles}}, and my profile: {{my_profile}}.
Find the skills that appear repeatedly but that I don't have (say how often each appears). For the top 3-5, suggest one reputable, preferably free, resource each, with rough hours to job-ready basics, and a small portfolio project that would prove the skill honestly. Don't suggest adding anything to my resume until I've actually done it.
End with one json block: {"summary":"","actions":[{"type":"learn-skill","title":"Learn: <skill>","detail":"<resource, hours, project idea>","jobId":"","contactId":"","companyId":"","impact":2,"effort":3}]}
```

**JSON:** the "Plan my week" action shape, with `type: "learn-skill"`. Keep the title as `Learn: <skill>` exactly, because the app reads the skill name from the text after the colon. Import it in **Plan my week**.

## 20. Fix a JSON block that won't import (`/sync`)

```text
The Waypoint app couldn't import your last JSON block. The error was: {{error message, or "no JSON block found"}}. Here is the block: {{paste JSON}}.
Re-output it as exactly one valid json block, in the same shape you were asked for: no comments, no trailing commas, straight double quotes, "" / 0 / [] for unknown values. Change only what's needed to make it valid; never drop or invent data.
```

**Expected output:** one corrected JSON block. Paste the reply into the same import box again.
