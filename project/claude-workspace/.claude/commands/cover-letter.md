---
description: Write a specific 250-350 word cover letter for a job using company research and true profile facts
argument-hint: "<job_id> [tone: professional | warm | direct | enthusiastic]"
---

# /cover-letter: tailored cover letter

Job and tone: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Resolve the job id. If there's no id, ask, and show the saved or applying jobs.
- Tone comes from `$ARGUMENTS`. The default is `professional`.
- Gather the inputs:
  - the job description
  - the linked company and its `research` fields
  - `output/research/<company>.md` if it exists
  - `profile`, `stories`, and the tailored resume (`job.resumeId`) if there is one
  - any contact at the company who referred the user (only mention them if the contact's status is `referred` or the user confirms)
- If the company research is thin, do a quick Tier 1 search (mission, 1-2 recent news items) or suggest `/research-company` first.

## 2. Draft (Tier 1: needs `settings.autonomy.drafts` = "auto", otherwise ask)

Start from `templates/cover-letter-template.md`. Rules:

- **250-350 words.** Report the word count.
- **Opening:** why this company and role specifically. Use one concrete, cited fact about the company (product, news, mission). No clichés like "I am writing to express my interest".
- **Body (1-2 paragraphs):** the 2-3 strongest true matches between the JD's must-haves and the user's experience, each backed by a real result from `profile` or `stories`. Keep `[add metric]` where a number is missing.
- **Gap handling (optional, one sentence):** acknowledge the most visible gap honestly and point to adjacent experience or active learning.
- **Close:** a confident, specific call to action, availability, and thanks.
- Never claim skills, titles or results that aren't in the data. Don't copy JD sentences word for word.
- Address it to a named person only if you know them from contacts or research. Otherwise use "Dear <Company> hiring team".

Show the letter, the word count, the company facts used (with source links), and any placeholders.

## 3. Save

- Write `output/cover-letters/<company>-<role>-<date>.md` (Tier 1 draft).
- APPROVAL CHECKPOINT: "Save as a CoverLetter in your data and link it to the job?" On approval:
  - append `{id: "cl_...", jobId, tone, body, createdAt, updatedAt}` to `coverLetters`
  - set `job.coverLetterId` and add a job event `{type: "cover-letter", note: "cl_..."}`
  - append activity `{type: "resume", ref: "<job_id>", note: "Cover letter drafted"}`, and bump `updatedAt` and `meta.updatedAt`
- If the user asks for changes ("shorter", "warmer", "mention X"), revise and show the result again before saving.

## 4. Finish

End with `STATUS` and `NEXT BEST ACTION` (usually `/apply <job_id>`, or `/find-people <company>` for a referral first).
