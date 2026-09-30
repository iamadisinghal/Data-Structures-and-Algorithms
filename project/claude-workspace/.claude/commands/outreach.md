---
description: Draft personalized outreach (connection note, referral ask, recruiter email, informational interview, follow-up) and queue send-outreach actions - never sends
argument-hint: "<ct_ id or contact name> [job_id] [type: connection | referral | recruiter | informational | follow-up]"
---

# /outreach: personalized message drafts

Contact, job and type: $ARGUMENTS

Follow CLAUDE.md. **Sending is Tier 3.** You draft and queue messages. The user sends them from their own LinkedIn or email. Never send, connect or email on your own.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Resolve the contact by `ct_` id or name. If they aren't in `contacts`, offer to add them first (an `add-contact` action) or draft anyway from details the user gives.
- Resolve the job (`job_` id from `$ARGUMENTS`, or the contact's linked jobs via `job.contactIds`).
- Gather the context:
  - the contact's `relationship`, `warmth`, `status`, `interactions` and `notes`
  - the company's `research`
  - shared schools and past employers with the user
  - any earlier `outreach` to this contact (don't repeat yourself)
- Read `templates/outreach-templates.md`.

## 2. Choose the messages

If the type isn't given, pick based on the relationship and status:

| Situation | Messages to draft |
|---|---|
| Cold, not connected | Connection note (300 and 200 character versions), then a referral or informational ask to send after they accept |
| Recruiter | Connection note plus a recruiter email |
| Likely hiring manager | Connection note plus a short value-focused message (type `hiring-manager`) |
| Alumni or ex-colleague | A warm connection note (`reconnect` if they know each other) plus a referral ask |
| Already connected, no reply for 5 days or more | A follow-up |
| After a call | Thank-you (type `thank-you`) |

## 3. Draft (Tier 1: needs `settings.autonomy.drafts` = "auto", otherwise ask)

Rules for every message:

- Use one specific, true personal hook (a shared school or employer, their public talk or post, a company news item) and one specific ask.
- Mention only facts from the user's profile. No flattery that isn't grounded, no guilt-tripping, no "just checking in" without adding value.
- **Character and word limits:**
  - LinkedIn connection note: at most **300** characters, plus a variant of at most **200** characters (free accounts often get 200). Show the exact character count for each.
  - LinkedIn message: under 600 characters.
  - Recruiter email: subject under 60 characters, body 90-150 words, the job link or id, and a note that the resume is attached.
  - Referral ask: under 120 words. Make it easy: include the job link, a 2-line pitch they can forward, and an explicit "no worries if not".
  - Informational interview request: 15-20 minutes, 2-3 time options, a clear topic.
  - Follow-up: 2-4 sentences that add something new (a relevant article, an update, a portfolio link).
- Use the contact's first name only. Keep the tone human and concise.

Save all drafts for this contact to `output/outreach/<company>-<contact>-<date>.md` (Tier 1 file).

## 4. Queue (pending actions)

For each message the user may send, create a pending `send-outreach` action:
- `title: "Send <type> to <Name> (<channel>)"`
- `detail`: the goal plus when to send it (e.g. "after connection accepted")
- `ref.contactId`, `ref.jobId`, `ref.companyId`
- `payload: {type, channel, subject, body}`, where `type` is an Outreach type, `channel` is `linkedin` or `email`, and `subject` is `""` for LinkedIn
- `impact` and `effort`, `source: "claude-code"`

Show the APPROVAL CHECKPOINT. Label each item "Tier 3: you send it". Approving means "this is the version I'll send". For approved items, mark the action `approved` and print the final text in a clean copy block, with the recipient's LinkedIn URL or email.

## 5. After the user says they sent it

Only when the user confirms (e.g. "sent 1 and 2"):
- append an Outreach record to `outreach`: `id` (`out_`), `contactId`, `jobId`, `type`, `channel`, `subject`, `body`, `status: "sent"`, `sentAt`, `createdAt`, `updatedAt`
- update the contact:
  - `status`: `requested` after a connection note; otherwise keep it or move it forward
  - `lastContacted` = today, `nextFollowUp` = today + 5 days
  - add an `interactions` entry `{date, channel, note}`
- mark the action `done` with `doneAt`
- append activity `{type: "outreach", ref: "<ct_id>"}`, and bump `updatedAt` and `meta.updatedAt`

## 6. Finish

End with `STATUS` (drafted N, approved N, awaiting your send) and `NEXT BEST ACTION`.
