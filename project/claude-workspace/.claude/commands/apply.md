---
description: Assemble the application package (resume, cover letter, answers, screening drafts, checklist); optionally fill the form and STOP before submit; log it after you submit
argument-hint: "<job_id> [fill-form]"
---

# /apply: application package

Job: $ARGUMENTS

Follow CLAUDE.md. **Submitting is Tier 3.** You prepare everything and may fill a form only if the user asks. The user always clicks the final Submit.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Resolve the job. If `job.status` is already `applied` or later, say so and ask whether this is a re-application or a mistake.
- Check the pieces:
  - `job.resumeId`, pointing to a `resumes` entry and its file in `output/resumes/`
  - `job.coverLetterId`
  - the `answers` bank
  - `profile` (`workAuth`, `noticePeriod`, `salary`, `relocate`)
  - related contacts: is a referral possible?

## 2. Fill the gaps (Tier 1)

- **No tailored resume:** offer to run the `/tailor-resume` steps now, or proceed with the master profile (not recommended).
- **No cover letter:** ask whether this application needs one (many ATS forms make it optional). Offer the `/cover-letter` steps.
- **Referral check:** if a contact at the company has status `connected`, `replied` or `meeting`, suggest asking for a referral before applying (`/outreach <contact> <job_id> referral`). Many referral programs need the referral submitted before the application.

## 3. Build the package (Tier 1 draft)

Write `output/applications/<company>-<role>-<date>.md` containing:

1. **Links:** the job URL, the resume files (.md, .html, and "print to PDF" instructions), and the cover letter file.
2. **Standard answers** from `answers` (plus `profile` fields). Use these keys where possible: `workAuth`, `sponsorship`, `noticePeriod`, `startDate`, `relocate`, `salaryExpectation`, `whyLeaving`, `whyThisCompany`, `aboutMe`, `strength`, `weakness`, `remotePreference`. Mark any that are missing.
3. **Salary answer:** base it on `profile.salary.expected` and the company or market research. Suggest a range, or "open to discussing" wording where the region norms favor it. Never go below `profile.salary.minimum` without the user deciding.
4. **Screening question drafts:** if the posting shows questions (from the fetched page or pasted by the user), draft each answer from true facts. Keep answers under the stated limits, and mark `[confirm]` wherever the user must verify.
5. **Checklist:**
   - [ ] resume tailored and exported to PDF
   - [ ] cover letter final (or not needed)
   - [ ] referral requested, or decided not to
   - [ ] answers reviewed
   - [ ] salary field decided
   - [ ] application portal account (the user creates it; Claude never creates accounts)
   - [ ] submitted by you
   - [ ] confirmation email saved

Offer to add new standard answers to the `answers` bank (Tier 2: show a diff and wait for yes).

Create a pending `apply` action (`ref.jobId`, `payload: {}`, `title: "Apply to <Company> - <Title> (<match>% match)"`) if none exists. Show it in an APPROVAL CHECKPOINT labelled "Tier 3: you submit".

## 4. Optional: fill the form (only if the user asks)

Only if the user explicitly asks (e.g. "fill the form") **and** a browser tool is available (Claude in Chrome, or the Playwright MCP):

- The user logs in themselves. Never enter passwords, create accounts, solve CAPTCHAs, pay fees, or accept legal terms for them.
- Fill the fields one at a time from the package. Upload the resume file only if the user points you to the PDF.
- For anything uncertain (demographic or EEO questions, legal attestations, salary, any field with no prepared answer), leave it blank and list it for the user. Voluntary demographic questions are always the user's choice.
- **Stop before the final Submit button.** Summarize what you filled, what's left blank, and say: "Please review every field and click Submit yourself."
- If no browser tool is available, give a field-by-field copy list instead.

## 5. After the user confirms they submitted

Only when the user says they submitted:
- set `job.status: "applied"` and `job.appliedAt` = today
- add a job event `{date, type: "applied", note: "via <portal>"}`
- set `job.nextAction: "Follow up"` and `job.nextActionDate` = today + 7 days
- update the company `status` to `"applied"` if it was `researching` or `targeting`
- mark the `apply` action `done` with `doneAt`
- append activity `{type: "applied", ref: "<job_id>"}`, and bump `updatedAt` and `meta.updatedAt`
- offer to queue a `follow-up` action for the follow-up date, and a thank-you or heads-up message to any referrer

## 6. Finish

End with `STATUS` (package path, what's pending) and `NEXT BEST ACTION`.
