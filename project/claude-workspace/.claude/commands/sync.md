---
description: Validate data/waypoint-data.json (schema sanity, unique ids, required fields, references), fix issues with approval, and explain how to import it into the web app
argument-hint: "[optional: 'check-only']"
---

# /sync: validate and hand back to the web app

Mode: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

If it doesn't parse, report the position of the error and the likely cause (a trailing comma, an unescaped quote, a truncated file). Offer to restore from `data/waypoint-data.backup.json`, or to fix the syntax without changing any values (Tier 2).

If `node` is available, you may use it for mechanical checks (the user will be asked to allow the command). Otherwise, check by reading.

## 2. Validate (Tier 1, read-only)

Report findings as **errors** (the web app may reject or misread them) and **warnings**:

1. **Structure:** `version` is 1. `meta.createdAt` and `meta.updatedAt` exist. All top-level keys exist with the right type (lists are arrays, and `settings`, `profile` and `answers` are objects). Unknown keys are fine: keep them. For example, the web app's `reports` list uses `rep_` ids.
2. **IDs:** every item in `companies`, `jobs`, `contacts`, `outreach`, `resumes`, `coverLetters`, `stories`, `offers` and `actions` has an `id` with the right prefix (`co_`, `job_`, `ct_`, `out_`, `res_`, `cl_`, `st_`, `off_`, `act_`). IDs are unique across the whole file.
3. **Timestamps:** `createdAt` and `updatedAt` exist and are ISO-8601. `updatedAt` is not before `createdAt`. `meta.updatedAt` is not older than the newest item. No dates are in the future beyond today, except planned ones like `nextActionDate`, `nextFollowUp` or `deadline`.
4. **Enums:** `job.status`, `workMode`, `priority` (1-3), `match` (0-100); `company.tier`, `status`, `interest` and `fit` (1-5); `contact.relationship`, `status`, `warmth` (1-5); `outreach.type`, `channel`, `status`; `action.type`, `status`, `source`, `impact` and `effort` (1-3); `activity.type`; `learning.status`. All must use the values in the CLAUDE.md cheat sheet.
5. **Required content:** jobs have `title` and `company`; contacts have `name`; companies have `name`; actions have `type`, `title` and `status`.
6. **References:** `job.companyId`, `job.contactIds[]`, `job.resumeId`, `job.coverLetterId`, `contact.companyId`, `outreach.contactId` and `jobId`, `resume.jobId`, `coverLetter.jobId`, and `action.ref.*` must point to existing items. For pending or approved `save-job`, `add-contact` and `add-company` actions, the ref may point to the payload's own id.
7. **Action payloads:**
   - `save-job`, `add-contact` and `add-company` payloads are full objects with the right id prefix and status
   - `send-outreach` has `type`, `channel`, `subject` and `body`
   - `follow-up` has `body`, and `learn-skill` has `skill` and `resource`
   - `done` actions have `doneAt`, and approved or rejected actions have `decidedAt`
8. **Duplicates:** jobs with the same `url`, or the same company, title and location; contacts with the same `linkedin` or email; companies with the same name or domain.
9. **Safety:** no API keys or secrets anywhere (e.g. strings starting `sk-ant-`), and `meta.demo` is `false` for real data.

Show a summary table: the check, the result, and the count, followed by the numbered issues.

## 3. Fix (Tier 2, unless `$ARGUMENTS` is `check-only`)

Propose numbered fixes in an APPROVAL CHECKPOINT:
- add missing empty lists or timestamps
- replace an invalid enum value with the closest valid one (say which)
- regenerate a colliding id and update every reference to it
- clear or repair a broken reference
- merge duplicates (keep the newer `updatedAt` and combine events, interactions and notes; never silently drop data)
- add `doneAt` or `decidedAt`

Deleting anything needs explicit per-item approval. Copy the file to `data/waypoint-data.backup.json` before writing. After fixing, bump `meta.updatedAt` and re-validate.

## 4. Explain how to import into the web app

Tell the user exactly:

1. Open the Waypoint web app (`index.html`) in the same browser you normally use. Your data lives in that browser.
2. Go to **Data & Settings**, click **Import from Claude Code**, and choose `claude-workspace/data/waypoint-data.json`.
3. The import merges by id, and the newer `updatedAt` wins. New pending actions (source `claude-code`) appear in the **Approval Queue**, where you can approve or reject each card with one click.
4. To bring decisions back here, click **Export for Claude Code** and replace `claude-workspace/data/waypoint-data.json` with the new download. Then run `/approve` to carry out the approved items.
5. Tip: avoid editing the same job or contact on both sides between syncs. The copy with the newer `updatedAt` replaces the other.

Show the counts that will come across: new or updated jobs, contacts and companies, and pending actions.

## 5. Finish

End with `STATUS` (valid / N issues fixed / N remaining) and `NEXT BEST ACTION`.
