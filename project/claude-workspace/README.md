# Waypoint Claude workspace 🧭

This folder turns Claude Code into your job-search copilot. It can research markets and companies, find live openings and the people behind them, tailor your resume, draft messages, and plan your week. It works from the same data file as the Waypoint web app, and **it never sends a message or submits an application for you**: it prepares everything and asks first.

## Pick your path

| You have | Use | Where |
|---|---|---|
| No Claude account | The Waypoint web app. It works fully offline. | `index.html` |
| Claude.ai (web, desktop or mobile, any plan) | Copy-ready prompts from the web app's **With Claude** tab, or a Claude Project | `claude-ai/PROJECT-INSTRUCTIONS.md`, `claude-ai/PROMPTS.md` |
| Your own Anthropic API key | Optional in-app Claude features in the web app (**With Claude** tab) | the web app |
| **Claude Code** | **This folder:** slash commands, subagents, files on your computer | you're here |

---

## 1. Prerequisites

- [ ] **A Claude plan that includes Claude Code** (Pro, Max, Team or Enterprise), **or** an Anthropic Console account with API billing.
- [ ] **Claude Code installed.** Follow the official instructions at <https://docs.claude.com/en/docs/claude-code/overview>. Install commands change over time, so use that page rather than a copied command.
- [ ] **Optional: VS Code.** Install the Claude Code extension from the VS Code Marketplace (search "Claude Code"). Open the `claude-workspace` folder in VS Code and use the Claude panel, or run `claude` in VS Code's built-in terminal. The slash commands work the same way.
- [ ] **Optional: Node.js.** Claude uses it to get exact timestamps and to validate your data file, and the Playwright browser tool needs it.
- [ ] **The Waypoint web app** (`index.html`), if you want to move your data between the two.

## 2. First run (about 10 minutes)

1. **Export your data from the web app.** Open **Data & Settings** and click **Export for Claude Code**. This downloads `waypoint-data.json`.
2. **Copy it into `claude-workspace/data/`.** The final path must be `claude-workspace/data/waypoint-data.json`. Rename it if your browser added `(1)`.
3. **Open a terminal in this folder and start Claude:**
   ```
   cd path/to/project/claude-workspace
   claude
   ```
   Always start from `claude-workspace`. That's how Claude finds `CLAUDE.md` and the slash commands. If Claude asks whether you trust this folder, say yes.
4. **Run `/start`.** Claude checks your profile, pipeline, pending approvals and weekly goals, asks 3-5 questions, and proposes a first plan.

**No web-app data yet?** Just run `/start` and choose "interview now", or drop your resume into `inbox/` and run `/profile`. Claude creates `data/waypoint-data.json` for you once you confirm.

**Just want to look around?** Copy `data/waypoint-data.example.json` to `data/waypoint-data.json` to try the commands on a fictional profile (Alex Rivera).

## 3. The recommended loop

**Daily, 15-30 minutes**

1. `/status`: see what's overdue and what's waiting for you.
2. `/approve`: decide on pending actions, and send or submit the prepared items yourself.
3. `/follow-ups`: see who's due a nudge (drafted for you).
4. Work one or two top jobs: `/analyze-job`, then `/tailor-resume`, then `/cover-letter`, then `/apply`.

**Weekly, about 60 minutes (Monday works well)**

1. `/weekly-plan`: goals vs actuals, and a prioritized action list to approve.
2. `/find-jobs` to refill the pipeline, then `/find-people` at your tier A companies.
3. `/research-company` for new targets. `/market-scan` once a month or when you change direction.
4. `/sync`, then import into the web app if you also use it there.

**When things move:** `/interview-prep <job>` before interviews, and `/negotiate` when an offer arrives.

## 4. Slash commands

Type `/` in Claude Code to see them. Arguments in `<>` are required and arguments in `[]` are optional. IDs like `job_...` and `ct_...` come from your data. You can also just describe the job or person, and Claude will find the match.

"You approve" is the Waypoint approval checkpoint. "Claude Code asks" is the tool permission prompt from Claude Code itself (see section 5).

| Command | What it does | You approve (checkpoint) | Claude Code asks to |
|---|---|---|---|
| `/start [focus]` | Onboarding and health check: profile completeness, pipeline, queue, goals vs this week, 3-5 questions, first plan | Profile changes; the first-plan actions | Write the data file |
| `/profile [file or text]` | Builds or refines your master profile from `inbox/` or pasted text; flags weak bullets and missing metrics | All profile changes (shown as a diff) | Write the data file |
| `/market-scan <role> <location>` | Demand, salary ranges (cited), top skills, hiring companies, remote share, trends | Adding companies; learning items | Write the report and data file |
| `/research-company <company>` | Mission, products, news, culture, interview process, salary signals, public key people, your fit | Saving research to the company, or adding it | Write the report and data file |
| `/find-jobs [role] [location]` | Live openings via ATS x-ray and job boards; dedupes, scores and ranks | Saving each job (`save-job`) | Write the data file |
| `/analyze-job <job id, URL or JD>` | Must-haves vs nice-to-haves, keywords, match score, gaps, red flags, verdict | Storing the match; saving a new job | Write the analysis and data file |
| `/tailor-resume <job id>` | ATS-friendly tailored resume (MD + HTML) from true facts; change log; keyword coverage before and after | Saving it as a resume version linked to the job | Write the resume files and data file |
| `/cover-letter <job id> [tone]` | A specific 250-350 word letter using company research | Saving it and linking it to the job | Write the letter and data file |
| `/find-people <company> [team]` | Recruiters, likely hiring managers, team members, alumni, ex-colleagues (public info), plus search links | Adding each contact (`add-contact`) | Write the data file |
| `/outreach <contact> [job] [type]` | Connection notes (300/200 characters), referral ask, recruiter email, informational request, follow-up | Which messages you'll send (`send-outreach`). **You send them.** | Write drafts and data file |
| `/apply <job id>` | Application package: resume, letter, answers, screening drafts, checklist. Can fill the form if you ask, stopping before Submit | The `apply` action; answer-bank updates. **You submit.** | Write the package and data file; browser tool use |
| `/follow-ups [filter]` | Finds overdue applications, messages and thank-yous; drafts each | Each follow-up and close-out. **You send them.** | Write drafts and data file |
| `/interview-prep <job id> [stage]` | Briefing, likely questions, STAR story map and gaps, questions to ask, 30-60-90 plan, mock interview | New stories; job updates | Write the briefing and data file |
| `/negotiate [offer]` | Offer comparison, cited market data, counter range, walk-away point, email and phone scripts | Offer records; the counter email. **You send it.** Claude never contacts employers. | Write the plan and data file |
| `/weekly-plan [hours, focus]` | Goals vs activity; a prioritized action list with impact and effort | Each planned action | Write the plan and data file |
| `/approve [filter]` | Lists pending actions from any source; bulk approve or reject; carries out approved items; prepares packages for the ones you send | Everything in the queue | Write the data file |
| `/status [section]` | Terminal dashboard: funnel bars, response rate, week vs goals, top jobs, overdue, queue | Nothing (read-only) | Nothing |
| `/sync [check-only]` | Validates the data file and explains how to import it into the web app | Each fix | Write the data file; run `node` checks |

**Subagents** (Claude uses these automatically): `company-researcher`, `job-scout`, `people-scout`, `resume-tailor` (no web access) and `interview-coach`. They return findings, and only the main Claude session edits your data file.

## 5. How approval works

There are two separate safety layers.

**Layer 1: Claude Code's own permission prompts.** This folder pre-allows only reading files and web search/fetch (`.claude/settings.json`). Claude Code asks before it writes a file or runs a command (like `node`). When you're comfortable, you can choose "Yes, and don't ask again" for file edits in the session. `.env` files are blocked from being read.

**Layer 2: Waypoint's approval checkpoints.** Every step Claude proposes is saved as a **pending action** in your data file (source `claude-code`), then shown as a numbered list:

```
APPROVAL CHECKPOINT: 3 items
1. [save-job]      Acme - Data Analyst (Remote), match 82
2. [add-contact]   Priya N., Talent Partner at Acme
3. [send-outreach] LinkedIn note to Priya (212 chars). Tier 3: you send it
Reply: approve all | approve 1,3 | reject 2 | edit 3: make it shorter | later
```

| Tier | Examples | What happens |
|---|---|---|
| 1. Automatic | Research, analysis, drafts in `output/` | Runs without asking if your autonomy settings allow it (default: yes) |
| 2. Confirm | Adding jobs, contacts or companies; changing statuses; saving resume versions | Claude waits for your reply |
| 3. You do it | Sending messages, submitting applications, anything that costs money or creates accounts | Claude prepares a ready-to-send package. You send or submit it yourself. Claude acts only if you explicitly ask for that specific item in this session, and even then stops before the final Submit. |

Decisions are recorded on each action (`approved`, `rejected` or `done`, with timestamps), so nothing gets lost. Reply `later` and the item stays in the queue: decide with `/approve`, or visually in the web app's **Approval Queue**. Your autonomy settings are stored in the data file (`settings.autonomy`). Change them in the web app's settings, or ask Claude to update them (it shows a diff first). Sending and submitting always need you, whatever they say.

## 6. Where things go

| Folder | Contents |
|---|---|
| `data/` | `waypoint-data.json` (your data), an automatic backup, and the fictional example |
| `inbox/` | Files you drop in: resumes, job descriptions, offer letters |
| `output/` | Everything Claude drafts: `resumes/`, `cover-letters/`, `outreach/`, `research/`, `interview/`, `applications/`, `plans/`, `offers/` (see `output/README.md`) |
| `templates/` | Resume (MD + print-ready HTML), cover letter and outreach templates |
| `claude-ai/` | Setup and prompts for Claude.ai users without Claude Code |

**Resume to PDF:** open the `.html` resume in your browser, choose Print, then Save as PDF, and turn off headers and footers.

## 7. Syncing with the web app

**Web app to Claude Code:** Data & Settings, then **Export for Claude Code**, then replace `claude-workspace/data/waypoint-data.json`.

**Claude Code to web app:** run `/sync` (it validates the file), then in the web app go to Data & Settings, click **Import from Claude Code**, and pick `claude-workspace/data/waypoint-data.json`.
- The import merges by id, and the copy with the newer `updatedAt` wins.
- New pending actions appear in the **Approval Queue** as cards you approve or reject with one click.
- To bring those decisions back, export again and run `/approve`. Claude carries out what you approved.

**Tip:** avoid editing the same job or contact in both places between syncs. The newer edit replaces the older one.

## 8. Optional: browser help with application forms

Claude can fill application forms field by field, but **only when you ask** (e.g. "`/apply job_123` and fill the form"). It **always stops before the final Submit** so you can review and submit yourself.

Choose one tool:
- **Claude in Chrome:** Anthropic's browser extension. See the Claude Code docs (link above) for how to connect it to Claude Code.
- **Playwright MCP** (needs Node.js). Run this once in a terminal:
  ```
  claude mcp add playwright -- npx @playwright/mcp@latest
  ```
  Restart Claude Code and check with `claude mcp list`.

**Ground rules:**
- You log in yourself.
- Claude never creates accounts, types passwords, solves CAPTCHAs, pays fees or accepts legal terms for you.
- Voluntary demographic questions stay blank for you to decide.
- Claude doesn't automate LinkedIn or other logged-in sites for research.

## 9. Privacy

- **Your data stays in this folder.** `.gitignore` keeps `data/waypoint-data.json`, `inbox/` and `output/` out of git. Run `git status` before committing anything.
- **What Claude sees:** the files it reads are sent to Anthropic to process your requests, under your plan's terms. Don't put information here you aren't allowed to share, such as confidential details from your current employer.
- **Web searches** are about companies, roles and markets. Claude is instructed never to put your name or contact details into a search.
- **People research** uses public professional information only: no personal addresses, family or private accounts. It doesn't scrape logged-in LinkedIn pages. Claude gives you search links to open yourself instead.
- **API keys** never go into the data file, and `.env` files are blocked from being read.
- **Cloud-synced folders** (OneDrive, Dropbox) sync your data file too. Choose a location you're comfortable with.

## 10. Troubleshooting

| Problem | Fix |
|---|---|
| Slash commands don't appear | Start `claude` from inside `claude-workspace/`. Type `/` and look for the project commands. Restart Claude Code after adding files. |
| "Data file missing" | The file must be exactly `claude-workspace/data/waypoint-data.json`. Rename browser duplicates like `waypoint-data (1).json`. |
| Claude asks permission for every file write | This is expected (layer 1). Allow edits for the session when prompted. |
| Web search isn't available | It depends on your account type and setup. Paste job descriptions or URLs yourself: every command also works with pasted text. |
| My PDF or DOCX resume reads badly | Copy the text into `inbox/resume.txt` and run `/profile resume.txt`. |
| The data file is broken or invalid | Run `/sync`. It explains the error and can restore `data/waypoint-data.backup.json`. |
| Import changed nothing in the web app | Run `/sync` first. You may have edited the same item in the web app after exporting (the newer edit wins), or picked the wrong file. |
| Playwright tools missing | Install Node.js, run the `claude mcp add` command above, restart Claude Code, then check `claude mcp list`. |
| Long sessions get slow or forgetful | Use `/clear` between big tasks. Your progress is saved in the data file and `output/`, not in the chat. |
| Hitting usage limits | Deep research is the most expensive. Narrow the scope (one company, one role) and run `/market-scan` rarely. |

Questions about Claude Code itself: <https://docs.claude.com/en/docs/claude-code/overview>.
