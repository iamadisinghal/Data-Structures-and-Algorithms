---
description: Onboarding and health check - profile completeness, pipeline, pending approvals, goals vs this week, first plan
argument-hint: "[optional focus, e.g. 'switching to product management']"
---

# /start: onboarding and health check

Extra context from the user (may be empty): $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it doesn't exist, this is a first run. Offer three options and wait:

- **a) Import from the web app:** Data & Settings, then **Export for Claude Code**, then copy `waypoint-data.json` into `claude-workspace/data/`, then run `/start` again.
- **b) From a resume:** drop it into `inbox/` and run `/profile`.
- **c) Interview now:** ask in two short rounds.
  - Round 1: name, email, phone, location, LinkedIn, current title and company, years of experience, target titles, target locations, work modes, region, currency, expected and minimum salary, notice period, work authorization.
  - Round 2: each role (title, company, dates, 2-5 bullets), education, skills.
  - Show the draft profile and ask "create `data/waypoint-data.json`?". On yes, write the complete top-level structure: `version: 1`, `meta` with `createdAt`, `updatedAt` and `demo: false`, and default `settings` (`region`, `currency`, `weeklyGoals {applications:10, outreach:15, followups:5, learningHours:3}`). Use the autonomy defaults from the schema: research and drafts `"auto"`, everything else `"ask"`. Every list starts empty and `answers` is `{}`.

If the file has `meta.demo: true`, warn that it's demo data and ask whether to continue.

## 2. Health check (Tier 1, read-only)

Show a compact report:

1. **Profile completeness** as a checklist with an overall percentage. Check:
   - contact (name, email, location, LinkedIn)
   - `targetTitles`
   - `targetLocations` and `workModes`
   - `salary.expected`, `salary.minimum` and currency
   - `summary`
   - at least 8 `skills`
   - every role has 2 or more bullets
   - share of bullets that contain a number
   - `education`
   - at least 5 `stories`
   - `answers` for the common screening questions (work authorization, notice period, salary expectation, relocation, why you're leaving)
2. **Pipeline:** job counts per status, companies per tier, contacts per status.
3. **Approval queue:** pending actions grouped by type and source, plus the age of the oldest one.
4. **This week vs goals:** the week runs Monday to today. Count `activity` by type against `settings.weeklyGoals`, e.g. `Applications 3/10  Outreach 4/15  Follow-ups 1/5`. For learning hours, use what you can infer from activity notes, or say "unknown".
5. **Overdue:** jobs whose `nextActionDate` has passed, and contacts whose `nextFollowUp` has passed.
6. **Settings:** region, currency and autonomy, in one plain sentence (e.g. "I can research and draft on my own; I ask before saving anything; I never send or submit").

## 3. Ask 3-5 targeted questions

Ask only about the missing essentials that most limit results. Common ones: target role and location, salary floor, work authorization, metrics for the three strongest bullets, dream (tier A) companies, and whether this is a career switch. Put them in one numbered message and wait.

## 4. Apply answers (Tier 2)

Turn the answers into proposed changes to the profile, answers or settings. Show a before/after diff, write on "yes", then append a `research` activity entry noting the onboarding.

## 5. Propose a first 7-day plan

Propose 5-8 concrete steps and record each one as a pending action (`source: "claude-code"`). Use types like:

- `research-company` for tier A companies
- `find-people` at a target company
- `tailor-resume` or `apply` for the best saved jobs
- `learn-skill` for the top gap
- `custom` with the command to run (e.g. `{"instructions": "Run /find-jobs Data Analyst Bengaluru"}`)

Show them as a table (#, type, title, impact, effort, command to run), then an APPROVAL CHECKPOINT. Mark decisions per the protocol.

## 6. Finish

End with `STATUS` and `NEXT BEST ACTION` as defined in CLAUDE.md. The next action is usually the highest impact-to-effort step that was approved.
