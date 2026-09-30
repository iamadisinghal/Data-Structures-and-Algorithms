---
description: Break down a job description - must-haves vs nice-to-haves, keywords, match score with reasoning, honest gaps, red flags
argument-hint: "<job_id | job URL | pasted job description>"
---

# /analyze-job: job description analysis

Job: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively. Without a profile, the analysis covers the JD only, with no match score.

Resolve the job:
- **A `job_` id:** use `job.description`. If it's empty or marked `[partial]`, fetch `job.url` (public pages only) or ask the user to paste the JD.
- **A URL:** WebFetch it. If it's already in `jobs` (same URL), use that job. If the page needs a login, ask the user to paste the text.
- **Pasted text:** use it as is. Check whether it matches an existing job by company and title.
- **A file in `inbox/`:** read it.

## 2. Analyze (Tier 1)

1. **Snapshot:** title, company, level, location and work mode, salary if listed, team, reporting line if stated.
2. **Requirements table**, split into must-have and nice-to-have:

   | Requirement | Type | Evidence in profile (quote role or bullet) | Status |
   |---|---|---|---|

   Status is one of: covered / partial / gap. Evidence must come from `profile` or `stories`. If there's none, it's a gap.
3. **Keyword list:** 15-30 ATS keywords (tools, methods, domain terms, soft skills in the JD's exact wording), each marked present or absent in the profile. Highlight the 5 that matter most (repeated, or in the title or must-haves).
4. **Match score:** 0-100 using the CLAUDE.md rubric, with the breakdown per rubric line and one sentence of reasoning each.
5. **Gaps and honest mitigation:** for each gap, choose one:
   - adjacent true experience to emphasize
   - a quick way to learn it (course or project, with rough hours)
   - address it openly in the cover letter or interview
   - not worth it

   Never suggest claiming the skill.
6. **Red flags and questions:** unrealistic scope, a range far below `profile.salary.minimum`, "rockstar" or 24/7 language, reposted many times, vague role, signs of a scam (fees, crypto payment, chat-app-only interviews). List questions to ask the recruiter.
7. **Verdict:** apply now / apply after tailoring / network first / skip, with one line of reasoning.

Save the analysis to `output/research/<company>-<role>-jd-analysis.md` (a Tier 1 draft).

## 3. Update the data (Tier 2)

Propose in one APPROVAL CHECKPOINT:
- **Existing job:** set `match`, write `aiAnalysis` (shape below), fill `description` if it was empty, set `nextAction` and `nextActionDate` to match the verdict, and add an event `{date, type: "analyzed", note: "match <n>"}`.
- `aiAnalysis` is what the web app shows as "Claude's analysis" on the job page (the web app recomputes `match` with its own offline scorer, so this is where your reasoning survives): `{"at": "<ISO timestamp>", "score": <0-100>, "summary": "2-3 sentences", "mustHave": [], "niceToHave": [], "matched": [], "gaps": [{"skill": "", "mitigation": ""}], "redFlags": [], "keywords": [], "interviewFocus": []}`.
- **New job** (URL or pasted text): a pending `save-job` action whose payload is a full Job object with `status: "saved"` and the `match` filled.
- For important gaps, optional `learn-skill` actions (`payload: {skill, resource}`).
- If the verdict is "apply", optional `tailor-resume` and `apply` actions with `ref.jobId`.

On approval, write the changes, bump `updatedAt` and `meta.updatedAt`, and append activity `{type: "research", ref: "<job_id>", note: "JD analyzed"}`.

## 4. Finish

End with `STATUS` and `NEXT BEST ACTION` (usually `/tailor-resume <job_id>`, or `/find-people <company>` when the verdict is "network first").
