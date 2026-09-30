---
description: Build an ATS-friendly resume tailored to one job from TRUE profile facts, with change log and keyword coverage before/after
argument-hint: "<job_id> [notes, e.g. 'one page, emphasize SQL']"
---

# /tailor-resume: tailored resume for one job

Job and notes: $ARGUMENTS

Follow CLAUDE.md. **The honesty rules are non-negotiable here:** tailoring means selecting, reordering and rephrasing true facts. No new employers, titles, dates, degrees, metrics or skills.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively (run `/profile` first).

- Resolve the job id. If there's no id, list the top saved jobs by `match` and ask which one.
- The job needs a `description`. If it's missing, fetch `url` or ask for the JD.
- Read `templates/resume-template.md` and `templates/resume-template.html`.
- If `output/research/<company>.md` exists, read it for terminology.

## 2. Prepare (Tier 1: needs `settings.autonomy.drafts` = "auto", otherwise ask)

You may delegate the drafting to the `resume-tailor` subagent. Pass it the job description, the profile, the stories and the template paths. Then review its output against the checks in step 3.

1. **Keywords:** extract the top 20 JD keywords, as in `/analyze-job`. Mark each one:
   - *supported*: true per `profile` or `stories`
   - *unsupported*: a gap, never to be added
2. **Baseline coverage:** the share of supported and unsupported keywords present in the untailored master profile.
3. **Build the resume data** (matches `ResumeVersion.data`):
   - `name`, `headline` (the target title, when it is truthful to the user's level), `contact[]` (email, phone, location, LinkedIn, GitHub or website if present)
   - `summary`: 2-3 lines using the JD's language for real strengths
   - `skills[]`: only skills in `profile.skills`, ordered by JD relevance, grouped if helpful
   - `experience[]`: `{title, company, location, dates, bullets[]}`, reverse-chronological. Keep every role and its true dates and titles. For recent roles use 3-6 bullets chosen and reordered by relevance, rephrased to lead with impact and mirror JD terms. Compress older roles.
   - `projects[]` and `education[]` (profile shapes), plus `certifications[]`
   - Missing metrics: keep `[add metric]` in the text. Don't invent numbers.
4. **Length:** 1 page if under about 7 years of experience, otherwise at most 2.
5. **ATS format checks:**
   - standard headings (Summary, Skills, Experience, Projects, Education, Certifications)
   - single column, no tables, images or text boxes
   - dates in a consistent format
   - no header or footer content that parsers may skip

## 3. Self-check before showing it

For **every** bullet, confirm it traces back to a source bullet or story, and that no number, tool, scope or title was added. Fix anything that fails. List any `[add metric]` placeholders.

## 4. Show it to the user

1. **Change log:**

   | Section | Change | Before (short) | After (short) | Why |
   |---|---|---|---|---|

   Change types: reordered / reworded / added-keyword (a true skill in the JD's wording) / trimmed / removed-for-length.
2. **Keyword coverage:** before X% and after Y%, a table of the top 20 keywords (present before / present after), and the unsupported keywords listed as **gaps, not added**.
3. **Scores:** `atsScore` = the percentage of top keywords present, minus 5 per format issue. `matchScore` = the job's rubric match (tailoring doesn't change the real fit much, so say that honestly).
4. **Placeholders** the user needs to fill.

## 5. Save (Tier 1 files, Tier 2 data)

- Write `output/resumes/<company>-<role>-<date>.md` (from the markdown template).
- Write `output/resumes/<company>-<role>-<date>.html` (from the HTML template: fill the placeholders, repeat the blocks, delete unused sections, and escape `&`, `<` and `>`).
- Tell the user they can open the HTML in a browser and use Print, then Save as PDF.

APPROVAL CHECKPOINT: "Save as ResumeVersion in your data and link it to the job?" On approval:
- append a ResumeVersion to `resumes`: `id` (`res_`), `name: "<Company> - <Title>"`, `jobId`, `template: "classic"`, `data`, `matchScore`, `atsScore`, `createdAt`, `updatedAt`
- set `job.resumeId`, add a job event `{type: "resume", note: "Tailored resume res_..."}`, and set `job.status` to `"applying"` only if the user agrees
- mark any pending `tailor-resume` action for this job `done`
- append activity `{type: "resume", ref: "<job_id>"}`, and bump `updatedAt` and `meta.updatedAt`

## 6. Finish

End with `STATUS` and `NEXT BEST ACTION` (usually `/cover-letter <job_id>` or `/apply <job_id>`).
