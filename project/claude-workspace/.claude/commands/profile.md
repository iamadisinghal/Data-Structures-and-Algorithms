---
description: Build or refine the master profile from a resume in inbox/ or pasted text; flag weak bullets and missing metrics
argument-hint: "[file name in inbox/ | pasted resume text | 'review']"
---

# /profile: build or refine the master profile

Input: $ARGUMENTS

Follow CLAUDE.md, especially the honesty rules. The master profile is the single source of truth that every resume, letter and message is built from, so accuracy matters more than polish.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy the file to `claude-workspace/data/`), or offer to create a fresh file from this resume (full top-level structure per CLAUDE.md, created after the user confirms).

## 2. Find the source

- If `$ARGUMENTS` names a file, read `inbox/<name>`.
- If `$ARGUMENTS` is pasted text, use it.
- If it's empty or says `review`, list the files in `inbox/`. If there's exactly one resume-like file, confirm it. If there are none, refine the existing `profile` (skip to step 4).
- For PDF or DOCX files you can't read cleanly, ask the user to paste the text or save the file as .txt or .md.

## 3. Extract (Tier 1)

Map the source onto the `profile` shape: contact fields, `headline`, `currentTitle`, `currentCompany`, `yearsExperience` (computed from dates, and say how), `summary`, `skills` (canonical names, deduplicated, e.g. "Postgres" and "PostgreSQL" become "PostgreSQL"), `experience[]` (`id`, `title`, `company`, `location`, `start`/`end` as `yyyy-mm`, `current`, `bullets[]`), `education[]`, `projects[]`, `certifications`, `achievements`, `languages`. Put the original text in `rawResume`.

- Copy facts exactly. If something is ambiguous (a date, a title), ask. Don't guess.
- Give new experience, education and project items an `id` if they don't have one (e.g. `exp_<base36>`).

## 4. Review quality (Tier 1)

Show a table of bullets that need work:

| Role | Bullet (short) | Issue | Suggested rewrite |
|---|---|---|---|

Issues to flag:
- no metric (suggest a rewrite with an `[add metric]` placeholder)
- duty rather than impact ("responsible for...")
- vague verb
- too long (over 2 lines)
- jargon without context
- duplicates

Rewrites may only rephrase what is already there. Never add a number, tool or outcome the source doesn't state.

Also list:
- skills that appear in bullets but are missing from `skills`, and the reverse
- gaps in dates longer than 6 months (just note them; the user decides whether to explain them)
- missing essentials: target titles, locations, salary, work authorization
- 3-5 questions to recover metrics, e.g. "Roughly how many dashboards or users? What changed after the migration: time saved, cost, errors?"

## 5. Merge and confirm (Tier 2)

If a profile already exists, show a diff grouped as **added**, **changed** and **unchanged-but-flagged**. Never drop existing roles, skills or fields silently. Removals need an explicit yes per item.

Ask: "Write these profile changes? (yes / edit ... / no)". On yes:
- update `profile`
- bump `meta.updatedAt`
- append activity `{type: "resume", note: "Master profile updated from <source>"}`

If the user supplies metrics later, update only those bullets and repeat the diff step.

## 6. Optional extras (Tier 2, ask first)

- Offer to draft 3-5 STAR `stories` from the strongest bullets. Leave situation, task, action and result fields as `[ask user]` wherever the source lacks the detail, and save them only after approval.
- Offer to pre-fill `answers` for standard questions (`workAuth`, `noticePeriod`, `relocate`, `salaryExpectation`) from what the user has told you.

## 7. Finish

Show the profile completeness percentage before and after. End with `STATUS` and `NEXT BEST ACTION` (usually `/market-scan <target role> <location>` or `/find-jobs`).
