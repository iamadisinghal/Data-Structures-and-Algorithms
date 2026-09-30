---
description: Research the job market for a role and location - demand, salary ranges (cited), top skills, hiring companies, remote share, trends
argument-hint: "<role> <location>  e.g. Data Analyst Bengaluru"
---

# /market-scan: job market research

Role and location: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively. A market scan can still run without the file, but skip the profile comparison and the actions.

If `$ARGUMENTS` is empty, use the first entries of `profile.targetTitles` and `profile.targetLocations` and confirm them with the user. Use `settings.region` and `settings.currency` to choose sources and units.

## 2. Research (Tier 1: needs `settings.autonomy.research` = "auto", otherwise ask)

Use WebSearch and WebFetch. Search for the role, location and market, never for the user. Prefer sources from the last 12 months. For a deep scan you may delegate to the `job-scout` subagent for posting samples.

Cover:

1. **Demand:** approximate number of open postings on 2-3 major boards for the region (e.g. Naukri/foundit/LinkedIn for India; Indeed/LinkedIn for the US, UK and Canada), with the date checked. Say clearly that the counts are snapshots.
2. **Salary ranges:** junior / mid / senior, in `settings.currency`. Use 2-4 sources (e.g. Glassdoor, Levels.fyi, AmbitionBox for India, government statistics, salary guides from recruiting firms). Show every figure with its source, URL and date. Note whether it's base or total compensation, and where the sources disagree.
3. **Top skills:** the 10-15 skills and tools that appear most often, based on a sample of 15-30 recent postings you actually opened. Give the sample size, and split them into must-have and nice-to-have.
4. **Top hiring companies:** 10-15 employers posting this role in this location, each with a posting link and a one-line note (industry, size).
5. **Work mode:** the approximate remote / hybrid / onsite split in your sample.
6. **Trends:** 3-5 bullets (e.g. AI tooling in the role, title inflation, hiring slowdowns or surges), each cited.
7. **Fit vs the profile:** which top skills the user already has, which are gaps, and how the user's salary expectation compares with the ranges. Be honest.

## 3. Write the report (Tier 1 draft)

Save to `output/research/market-<role>-<location>.md` (slugged, with a `-v2` suffix if the file exists). Use these sections: Summary (5 bullets), Demand, Salary (table with sources), Skills (table with frequency), Hiring companies (table), Work mode, Trends, Your fit and gaps, Sources (numbered, with access dates).

## 4. Propose companies (Tier 2)

For the 3-8 most promising employers that are **not already in `companies`** (compare names and domains case-insensitively), create pending `add-company` actions. Each `payload` is a full Company object:
- `id` with the `co_` prefix
- `name`, `domain`, `industry`, `size`, `location`
- `tier` as your suggestion (A, B or C, with the reason in `notes`)
- `status: "researching"`
- `interest: 3` and a `fit` score of 1-5 with the reason
- `research` holding empty strings, with `sources` set to the URLs you used
- `createdAt` and `updatedAt`

Set `ref.companyId` to the same id, with `impact` and `effort`.

Show the APPROVAL CHECKPOINT. On approval, append the Company to `companies`, mark the action `done`, and log a `research` activity.

For skill gaps that show up in more than 40% of postings, offer `learn-skill` actions (`payload: {skill, resource}`, using a free or reputable resource you found) under the same checkpoint.

## 5. Finish

End with `STATUS` and `NEXT BEST ACTION` (usually `/find-jobs <role> <location>` or `/research-company <top company>`).
