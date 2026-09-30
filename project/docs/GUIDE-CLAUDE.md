# Waypoint with Claude guide

Claude can do the heavy lifting: live web research on markets, companies, openings, people and
salaries; tailoring your resume; drafting letters and messages; planning your week; and
preparing you for interviews and negotiations. Every result comes back to Waypoint as a
**proposal** for you to approve.

> In the app, switch to the **With Claude** tab at the top. Every page then shows a
> **"Do this with Claude"** panel, and the **Claude Hub** appears in the sidebar.

---

## Choose how you use Claude

You can mix these. All three share the same data.

| | **A. Claude.ai** | **B. API key in Waypoint** | **C. Claude Code** |
|---|---|---|---|
| Needs | Any Claude.ai plan (web, desktop or mobile) | Anthropic Console account with billing | Claude Pro, Max, Team or Enterprise, or a Console account |
| Setup | None | 3 minutes | About 10 minutes |
| How it works | Waypoint writes the prompt (with your data); you paste Claude's reply back | "Run with Claude" button on every page; results stream in live | Slash commands in a terminal or IDE; outputs saved as files |
| Web research | Yes, if web search is on in Claude.ai | Yes (server-side web search tool) | Yes (WebSearch / WebFetch) |
| Results into Waypoint | Paste reply, then **Import** | Automatic, after your approval | Import the shared JSON file |
| Fills application forms | No | No | Optional, in your browser. Stops before Submit |
| Cost | Included in your plan | Pay per use: typically a few cents per task, plus about $0.01 per web search | Your plan or Console usage |

### A. Claude.ai (easiest)

1. **Claude Hub > Claude.ai.** Create a Claude **Project** named "Job Search Copilot" (paid
   plans) and paste the **project instructions** shown there.
2. **Download the Context Pack** (your profile, goals, pipeline, network, stories and saved job
   descriptions, without email or phone) and add it to the project knowledge. Re-upload weekly.
   *Free plan:* paste the Context Pack at the start of a chat instead.
3. On any Waypoint page, click **Copy prompt for Claude.ai**, or use **Claude Hub > Prompt
   library**. Paste it into a chat in your project. Turn on web search for research tasks, if
   your plan includes it.
4. Copy Claude's **full reply** and click **Import Claude's reply** on the same page. You'll see a
   review screen: pick what to save (jobs, contacts, companies, a resume version, message drafts,
   approval cards...).

More prompts: [`claude-workspace/claude-ai/PROMPTS.md`](../claude-workspace/claude-ai/PROMPTS.md).

### B. Your API key inside Waypoint (one click)

1. Create a key at **console.anthropic.com** (API keys). Consider setting a spending limit.
2. **Claude Hub > API key**: paste it. Choose whether to remember it on this device or only for
   this session. Click **Test connection**.
3. Optional: choose the model (Claude Opus 5.5 by default, or Claude Sonnet 5.5 for lower cost),
   the effort level, and whether web search is allowed.
4. Click **Run with Claude** on any page. You'll see live progress ("Searching the web: ...")
   and the token usage and approximate cost of each run. Then approve what to keep.

Security notes:
- The key is stored only in this browser and is never included in exports or the Context Pack.
- Requests go directly from your browser to the Anthropic API, using the official SDK loaded
  from a CDN.
- Use this only on a personal, trusted device.
- Requests enable automatic fallback: if Claude declines a request for safety reasons,
  Anthropic may retry it on another Claude model.

### C. Claude Code (most autonomous)

1. Install Claude Code by following the official guide (docs.claude.com > Claude Code). It runs
   in a terminal and in VS Code / JetBrains.
2. In Waypoint: **Claude Hub > Claude Code > Export for Claude Code** (also in Data & Settings).
   Save the file as `claude-workspace/data/waypoint-data.json`.
3. Open a terminal in `claude-workspace/` and run `claude`.
4. Type `/start`, then `/weekly-plan`. Claude shows **APPROVAL CHECKPOINTS**; reply with
   `approve all`, `approve 1,3`, `reject 2` or `edit 4: ...`.
5. Outputs land in `claude-workspace/output/` (resumes as Markdown + print-ready HTML, cover
   letters, outreach, research briefs, interview prep).
6. Run `/sync`, then in Waypoint click **Import from Claude Code** and choose the same file.
   New proposals appear in your **Approval Queue** (labeled "Claude Code"). Newer changes win;
   nothing is deleted.

All commands: [`claude-workspace/README.md`](../claude-workspace/README.md).

---

## The complete process with Claude

| Step | Where in Waypoint | Claude task | Claude Code |
|---|---|---|---|
| 1. Connect | Claude Hub | Choose A, B or C | `claude` in `claude-workspace/` |
| 2. Profile | Profile > Import resume | **Parse my resume**, approve the structured profile | `/profile` (drop your resume in `inbox/`) |
| 3. Polish | Profile > Experience | **Rewrite my weakest bullets** (facts only; `[add metric]` placeholders) | `/profile` |
| 4. Market | Market > Market insights | **Scan the job market**: demand, salaries (with sources), top skills, companies hiring. Approve companies to add | `/market-scan "Data Analyst" Bengaluru` |
| 5. Research | Market > Company research | **Research a company**, saved into your research notes | `/research-company "Acme"` |
| 6. Switch (optional) | Market > Career switch | **Plan my career switch** | `/market-scan` |
| 7. Find jobs | Job Discovery | **Find live job openings**: career sites and ATS boards, scored. Pick which to save | `/find-jobs` |
| 8. Analyze | Job page | **Deep-analyze this job**: must-haves, gaps and mitigation, red flags | `/analyze-job job_...` |
| 9. People | People & Network > Find people | **Find people at a company**: recruiters, hiring managers, alumni, ex-colleagues (public info only) | `/find-people "Acme"` |
| 10. Plan | Approval Queue | **Plan my week**: prioritized approval cards | `/weekly-plan`, `/approve` |
| 11. Tailor | Resume Studio | **Tailor my resume**: truthful, job-specific, with a change log. Approve to save a version | `/tailor-resume job_...` |
| 12. Letter | Resume Studio > Cover letter | **Write a cover letter** (uses your company research) | `/cover-letter job_...` |
| 13. Outreach | Outreach | **Draft personalized outreach**: 3 options. You send them | `/outreach "Name"` |
| 14. Apply | Apply Wizard | Everything assembled; autofill bookmarklet | `/apply job_...` (optional browser form-fill, stops before Submit) |
| 15. Follow up | Approval Queue | Planner and Claude propose follow-ups | `/follow-ups` |
| 16. Interview | Interview Prep > Company prep | **Build an interview prep sheet** (maps your STAR stories to likely questions) | `/interview-prep job_...` |
| 17. Negotiate | Offers | **Plan my salary negotiation**: market data, counter range, scripts | `/negotiate` |
| 18. Review | Command Center | Weekly review | `/status` |

---

## What Claude will and won't do

**Will:**
- use only facts from your profile. It selects, reorders and rephrases, and marks missing numbers
  as `[add metric]`
- cite sources (with dates) for market, company and salary facts
- research companies, roles and people's public professional information
- return everything as proposals for you to approve

**Won't:**
- invent titles, dates, degrees, metrics or skills
- search for your personal details, or collect anyone's personal contact information
- scrape logged-in sites (like LinkedIn) or bypass logins, paywalls or CAPTCHAs
- send a message or submit an application on your behalf. In Claude Code, only if you
  explicitly ask for that specific item, and browser form-filling always stops before Submit

---

## Privacy

- **Claude.ai / API:** prompts include your profile (without email or phone) and the job,
  company or contact you choose. Review the prompt preview in the Prompt library if you want to
  see exactly what is sent.
- **Claude Code:** your data file stays in `claude-workspace/data/` on your computer. The
  included `.gitignore` keeps personal files out of git.
- **At work:** follow your organization's AI policy and avoid sharing confidential employer or
  client information.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Could not load the Anthropic SDK" | The API-key mode loads the SDK from cdn.jsdelivr.net (or esm.sh). Allow it, or use Claude.ai / Claude Code instead |
| "Your API key was rejected" | Check the key in the Console; paste it again in Claude Hub |
| Web search errors | Your organization's admin may need to enable web search in the Claude Console. Or turn off web search in Claude Hub (research tasks then use Claude's own knowledge) |
| "No JSON block found" when importing | Ask Claude: "Please end your reply with the JSON block in the shape I asked for." Then paste the full reply again |
| Import from Claude Code added nothing | Make sure you picked `claude-workspace/data/waypoint-data.json` after Claude saved it; run `/sync` to validate it |
| Claude Code can't find my data | Export from Waypoint again and save it exactly as `claude-workspace/data/waypoint-data.json` |
