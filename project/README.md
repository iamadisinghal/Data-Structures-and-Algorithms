# Waypoint: your job search, co-piloted

Waypoint is a private, all-in-one command center for finding a job or switching careers. It
helps you with every step: researching the market, choosing target companies, finding
openings and the right people, tailoring your resume, writing cover letters and outreach,
filling applications, tracking everything, preparing for interviews and negotiating offers.

You stay in control. Waypoint **proposes** each next step as a card in an **Approval Queue**,
showing the reason, expected impact and effort. You approve, edit or dismiss it. Nothing is
ever sent or submitted without your final click.

It works in two ways, each with its own tab at the top of the app:

| | **Standalone** (no Claude needed) | **With Claude** |
|---|---|---|
| Who it's for | Anyone. No account, no AI, no install | People with Claude.ai, an Anthropic API key, or Claude Code |
| Research | One-click research links: news, reviews, salaries, interview questions | Live web research by Claude, with sources |
| Jobs | Pre-filtered searches on 25+ boards and a "hidden jobs" search of company hiring systems (Greenhouse, Lever, Workday...) | Claude finds and scores live openings for you |
| People | Ready-made LinkedIn and Google searches for recruiters, hiring managers, alumni and ex-colleagues | Claude researches the right people (public info only) |
| Resumes and letters | An offline engine tailors, scores (ATS) and writes from your real experience | Claude rewrites and tailors, with a change log |
| Planning | A rule-based planner fills your Approval Queue | Claude plans your week and creates approval cards |
| Cost | Free | Your Claude plan, or a few cents per task with an API key |

---

## Quick start

1. **Get the folder** (download or clone this repository).
2. **Open `index.html`** in Chrome, Edge, Firefox or Safari. Double-clicking it works: no
   server and no install.
3. Choose **Explore with sample data** to see everything filled in, or **Start with my own data**.
4. Pick your tab at the top: **Standalone** or **With Claude**. The **Start Here** page walks you
   through the complete process for the tab you chose.

> To share Waypoint with others, send them the folder (zip it), or host it for free on GitHub
> Pages (Settings > Pages > deploy from the main branch). Each person's data stays in their own
> browser.

---

## What it does, phase by phase

| Phase | Where | What you get |
|---|---|---|
| **1. Prepare** | Profile & Resume | Paste or upload your resume (.pdf/.txt/.md). It is parsed into roles, bullets, skills and education. A bullet coach flags weak phrases and missing numbers, and a profile-strength meter shows what's left |
| **2. Target** | Market & Targets | Target companies in tiers (A/B/C) on an interest-vs-fit map. Market insights built from your saved jobs: skill demand vs. your skills, work modes, seniority, locations, salary ranges. A company research workspace. A **career-switch planner**: skill overlap, gaps, bridge roles, a 12-week roadmap and your "why I'm switching" story |
| **3. Discover** | Job Discovery | A search builder for global and regional boards (LinkedIn, Indeed, Naukri, Reed, SEEK, StepStone...). A hidden-jobs search of company hiring systems. Each saved job gets an instant **match score** with a breakdown, must-have vs. nice-to-have skills, red flags and the description highlighted |
| **4. Network** | People & Network, Outreach | A contacts CRM with warmth levels, LinkedIn connections import (CSV), people-search builders per company, a **network map**, **warm paths** into each company, and 9 message types (connection note, referral ask, recruiter, hiring manager, informational, follow-up, thank-you...) with character limits |
| **5. Apply** | Resume Studio, Apply Wizard, Autofill Kit, Applications | Tailored ATS-safe resumes (3 templates) with an ATS score, an honesty check for missing skills, and PDF/Word/HTML/text export. Cover letters in 5 tones. A 6-step **Apply Wizard** (fit, resume, letter, referral, answers, submit). An **autofill bookmarklet** that fills standard form fields on job sites (you click Submit). A drag-and-drop kanban tracker with automatic follow-up reminders |
| **6. Win** | Interview Prep, Offers | A STAR story bank with competency coverage, timed mock practice for 26 role families, per-company prep sheets, a 30-60-90 plan, an offer comparison (total comp, weighted score) and a negotiation calculator with email and phone scripts |
| **Everything** | Command Center, Approval Queue | KPIs, funnel, weekly goals, activity chart, consistency heatmap, skill demand, and the queue where every proposed step waits for you |

---

## How permissions work

| Tier | What | Default |
|---|---|---|
| **1. Prepares** | Research, drafts (resumes, letters, messages), scoring | Can run automatically; your choice in Data & Settings |
| **2. Changes records** | Adding jobs, contacts or companies found by Claude; status changes | Asks you first |
| **3. Leaves your computer** | Sending any message; submitting any application | **Locked:** you approve, then you do the final step yourself |

---

## Guides

- **[Standalone guide](docs/GUIDE-STANDALONE.md)**: the complete process without Claude, with a daily routine.
- **[With Claude guide](docs/GUIDE-CLAUDE.md)**: three ways to use Claude (Claude.ai, API key, Claude Code) and the full process.
- **[Claude Code workspace](claude-workspace/README.md)**: slash commands (`/start`, `/weekly-plan`, `/find-jobs`, `/tailor-resume`, `/apply`...).
- **[Data schema](docs/DATA-SCHEMA.md)**: the shared JSON format used by the web app and Claude Code.

---

## Privacy and honesty

- **Local-first.** There is no server, account, tracking or analytics. Your data lives in your
  browser (localStorage) until you export it. Use **Data & Settings > Export backup** regularly,
  and to move between computers.
- **Your API key** (optional) is stored only in your browser and is never exported.
- **Honest by design.** Tailoring only selects, reorders and rephrases what is in your profile.
  Missing skills are shown as gaps; you confirm any you genuinely have. Claude is instructed to
  use `[add metric]` instead of inventing numbers.
- **Plays by the rules.** Waypoint never scrapes logged-in sites, never auto-submits
  applications and never sends messages. It builds links, drafts and checklists, and you act.
- **At work?** Follow your employer's policies on AI tools, and don't share confidential
  employer or client information in prompts.

---

## For developers

Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies. The only runtime
downloads are optional: the Anthropic SDK (for API-key mode) and pdf.js (for PDF import), both
from public CDNs, and only when used.

```
index.html                 app shell (classic scripts, works from file://)
assets/css/app.css         design system (light/dark tokens, components, print styles)
assets/js/core.js          DOM helpers, icons, UI primitives, markdown, dates
assets/js/knowledge.js     1,191 skills (~4,170 aliases), 26 role families, 373 interview questions, 52 application questions
assets/js/store.js         state, persistence, merge import/export, demo data
assets/js/engine.js        offline engine: parsing, JD analysis, match scoring, tailoring, ATS checks,
                           cover letters, outreach, search links, planner, insights, autofill
assets/js/charts.js        SVG/HTML charts (funnel, stacked bars, donut, gauge, heatmap, scatter, network...)
assets/js/claude.js        Claude task library (API via the official TypeScript SDK, Claude.ai prompts, Context Pack)
assets/js/views/*.js       one file per page
claude-workspace/          Claude Code kit: CLAUDE.md, slash commands, subagents, templates, Claude.ai prompts
docs/                      guides and data schema
```

With an API key, requests use `claude-opus-5-5` by default (Claude Sonnet 5.5 is selectable),
streaming, adaptive thinking with effort control, the server-side web search tool for research
tasks, structured JSON outputs for importable results, and automatic safety fallback
(`fallbacks: "default"`).
