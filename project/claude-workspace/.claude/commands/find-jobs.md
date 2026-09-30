---
description: Search live openings (ATS x-ray + job boards), dedupe, score vs your profile, and propose save-job actions
argument-hint: "[role] [location] [extra filters, e.g. 'remote only, fintech']"
---

# /find-jobs: find and rank live openings

Search request: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively. Without a profile, jobs can't be scored.

Build the search brief:
- **Role:** `$ARGUMENTS`, or else `profile.targetTitles`.
- **Location:** `$ARGUMENTS`, or else `profile.targetLocations` and `profile.workModes`.
- **Region and currency:** from `settings`.
- **Tier A and B companies:** from `companies`.
- **Salary floor:** `profile.salary.minimum`.

Confirm the brief in one line if `$ARGUMENTS` is empty.

## 2. Search (Tier 1: needs `settings.autonomy.research` = "auto", otherwise ask)

Delegate to the `job-scout` subagent, or search directly with WebSearch and WebFetch. Queries contain only the role, location, skills and companies, never the user's personal details. Run a mix of the following.

**ATS x-ray queries** (swap in the role and location):
```
site:boards.greenhouse.io "Data Analyst" (Bengaluru OR Remote)
site:jobs.lever.co "Data Analyst" Bengaluru
site:myworkdayjobs.com "Data Analyst" Bengaluru
site:jobs.ashbyhq.com "Data Analyst" Remote
site:smartrecruiters.com "Data Analyst" Bengaluru
```

**Target companies:** the careers page of each tier A or B company (e.g. `<company> careers "Data Analyst"`, or the `domain/careers` page).

**Region boards** (use the public listing pages only):
- India: Naukri, foundit, LinkedIn public job pages, Instahyre, Wellfound for startups
- US, UK, Canada and Australia: Indeed, LinkedIn public job pages, Wellfound, government boards where relevant
- EU and MENA: LinkedIn public job pages, StepStone, Bayt, local boards

**Rules:**
- Open each promising posting (WebFetch) to confirm it's live and to read the full description. Don't scrape logged-in pages. If a page needs a login, keep the search-result snippet and mark it "description not verified".
- Skip postings older than about 30 days when the date is visible, plus agencies reposting the same role and obvious scams (fees, requests for personal documents up front, pay that's too good to be true).

## 3. Dedupe

Drop results already in `jobs`: the same `url`, or the same company, a similar title and the same location. Also merge duplicates across boards and keep the canonical ATS URL. Report how many were dropped.

## 4. Score (Tier 1)

Score each job 0-100 with the CLAUDE.md rubric. For each one, write a one-line reason, e.g. "82: covers 7/9 must-haves (missing dbt, Looker); title match; hybrid in target city; salary not listed". Never raise a score because a company is famous.

## 5. Present

Show a ranked table (top 10-20):

| # | Match | Title | Company | Location / mode | Salary | Posted | Source | Why (1 line) |
|---|---|---|---|---|---|---|---|---|

Include links below the table. Note any tier A companies with no current openings.

## 6. Propose saves (Tier 2)

For every job scoring at least 50 (or the ones the user picks), create a pending `save-job` action:
- `title`: `"Save <Company> - <Title> (<match>% match)"`
- `detail`: the reason line plus the source
- `ref.jobId` and `ref.companyId` set; `impact` from the match (70+ = 3, 50-69 = 2); `effort: 1`
- `payload`: a **full Job object**:
  - `id` (`job_` prefix)
  - `title`, `company`, `companyId` (the existing company id, if known), `location`, `workMode`
  - `url`, `source` (e.g. "Greenhouse", "Naukri")
  - `salaryMin`, `salaryMax` and `currency` (0 when unknown)
  - `description` (the full JD text when available, otherwise the snippet plus "[partial]")
  - `status: "saved"`, `match`, `priority` (1 if match 80+, 2 if 60-79, 3 otherwise)
  - `resumeId: ""`, `coverLetterId: ""`, `appliedAt: ""`
  - `nextAction: "Analyze and tailor resume"`, `nextActionDate` (today + 2 days)
  - `contactIds: []`, `events: [{date, type: "saved", note: "Found via <source>"}]`
  - `notes` (the scoring breakdown), `createdAt`, `updatedAt`

If a company is new and looks promising, add an `add-company` action under the same checkpoint.

Show the APPROVAL CHECKPOINT. On approval:
- append each Job to `jobs` (and approved companies to `companies`)
- mark the actions `done`
- append one activity `{type: "research", note: "Saved N jobs from /find-jobs"}`
- bump `meta.updatedAt`

## 7. Finish

End with `STATUS` and `NEXT BEST ACTION` (usually `/analyze-job <best job_id>` or `/tailor-resume <best job_id>`).
