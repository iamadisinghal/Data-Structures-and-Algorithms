---
description: Find applications, messages and interviews due for follow-up, draft each one, and queue follow-up actions - never sends
argument-hint: "[optional filter: job_id | ct_ id | 'applications' | 'contacts' | 'interviews']"
---

# /follow-ups: what's due, with drafts

Filter: $ARGUMENTS

Follow CLAUDE.md. **Sending is Tier 3.** Draft and queue follow-ups; the user sends them.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

## 2. Find what's due (Tier 1)

"Today" is the current date. Collect:

1. **Applications:** `status: "applied"` with `appliedAt` 7 or more days ago, and no later event showing a response (screening, interview, rejected). Also include any job whose `nextActionDate` is today or earlier.
2. **Messages:** contacts with `status` `requested` or `connected` whose `lastContacted` was 5 or more days ago with no reply (`status` not `replied`, `meeting` or `referred`). Also include any contact whose `nextFollowUp` is today or earlier. Cross-check `outreach` records with `status: "sent"`.
3. **Interviews:** jobs in `interview` status with an interview event in the last 2 days and no thank-you sent (no `thank-you` outreach for that job). Also flag interviews in the next 3 days as needing `/interview-prep`.
4. **Stale:** jobs `applied` 21 or more days ago with no response, and contacts with 2 or more unanswered follow-ups. Suggest closing these out (`job.status` to `rejected` or `withdrawn`, contact to `no-response`) rather than following up again. Status changes are Tier 2.

Skip anything with a pending `follow-up` action already in the queue.

## 3. Draft (Tier 1: needs `settings.autonomy.drafts` = "auto", otherwise ask)

For each item, draft a short message from `templates/outreach-templates.md`:
- **Application follow-up** (to the recruiter or hiring contact if known, otherwise through the portal or the careers email): 3-5 sentences, the role and date applied, one new piece of value, and a polite ask about the timeline.
- **Message follow-up:** 2-4 sentences that add something (a relevant update, article or question). Never guilt-trip.
- **Thank-you:** within 24 hours, specific to something discussed (ask the user for one detail if it isn't in `events`), and a restated fit in one line.
- A second follow-up only if the first got no reply after 7 or more days. Never a third. Close it out instead.

Present a table:

| # | Type | Who / job | Days since | Channel | Draft (first line) |
|---|---|---|---|---|---|

Save all drafts to `output/outreach/follow-ups-<date>.md`.

## 4. Queue (pending actions)

For each draft, create a pending `follow-up` action with `ref.jobId` and/or `ref.contactId`, `payload: {body}`, `title: "Follow up with <Name> re <Company> - <Title>"`, `detail` (why it's due, the channel and the recipient), `impact`, `effort: 1` and `source: "claude-code"`. Put the stale close-out status changes in the same APPROVAL CHECKPOINT, as `custom` actions with `payload.instructions`.

Label the follow-ups "Tier 3: you send it". For approved items, print clean copy blocks.

## 5. After the user says they sent them

Only when the user confirms:
- mark the actions `done` with `doneAt`
- update the contact's `lastContacted`, `nextFollowUp` (+7 days) and `interactions`
- update the job: add an event `{type: "follow-up"}`, and set `nextAction` and `nextActionDate` (+7 days)
- add an `outreach` record with `type: "follow-up"` (or `"thank-you"`) and `status: "sent"`
- append activity `{type: "followup", ref}`, and bump `updatedAt` and `meta.updatedAt`

## 6. Finish

End with `STATUS` (due N, drafted N, stale N) and `NEXT BEST ACTION`.
