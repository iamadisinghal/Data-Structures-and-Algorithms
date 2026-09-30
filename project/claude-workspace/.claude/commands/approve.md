---
description: Review the approval queue (pending actions from any source), approve/reject in bulk, then carry out approved items or prepare packages for ones you send
argument-hint: "[optional filter: type | source | job_id | ct_ id | 'all']"
---

# /approve: the approval queue

Filter: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

Collect:
- **Pending:** `status: "pending"`, from any `source` (`planner`, `claude`, `claude-code`, `user`).
- **Approved, not done:** `status: "approved"` with no `doneAt`. These are often approved in the web app and waiting to be carried out.

Apply the filter from `$ARGUMENTS` if one was given.

## 2. Show the queue

Group by tier and sort by impact/effort:

```
APPROVAL CHECKPOINT: 7 pending, 2 approved-not-done
Tier 2 (adds to your data)
 1. [save-job]      Save Acme - Data Analyst (82% match)           impact 3 effort 1  claude-code  2d old
 2. [add-contact]   Add Priya N. (Talent Partner, Acme)             impact 2 effort 1  claude-code
Tier 1 (research / drafts)
 3. [research-company] Research Brightpath Health                    impact 2 effort 2  planner
Tier 3 (you send / submit)
 4. [send-outreach] LinkedIn note to Priya (212 chars)               impact 3 effort 1  claude-code
 5. [follow-up]     Follow up on Globex - BI Analyst (applied 9d ago) impact 2 effort 1  planner
Approved earlier, not done yet
 A. [apply]         Apply to Initech - Analytics Engineer
Reply: approve all | approve 1,3 | reject 2 | edit 4: <change> | details 4 | later
```

The tier of each type:
- **Tier 2:** `save-job`, `add-contact`, `add-company`
- **Tier 1:** `research-company`, `find-people`, `tailor-resume`, `interview-prep`, `learn-skill`
- **Tier 3:** `send-outreach`, `follow-up`, `apply`
- **`custom`:** judge from `payload.instructions`. If it sends, submits, pays or creates an account, it's Tier 3.

`details N` shows the full `detail` and `payload`: for `save-job`, the job with match reasoning and a JD excerpt; for messages, the full text with character count.

## 3. Record decisions

For each decision, set `status` (`approved` or `rejected`), `decidedAt` and `updatedAt`. For `edit N: ...`, update the payload and show the item again. Write the file once after the round of decisions, then bump `meta.updatedAt`.

## 4. Carry out approved items (including "approved, not done")

Work in this order and report progress per item.

1. **Tier 2 saves**, done immediately:
   - `save-job`: append `payload` to `jobs`. If the id already exists, keep the newer `updatedAt`. If the same URL already exists, merge instead of duplicating, and ask if they conflict. Append a `research` activity.
   - `add-contact`: append to `contacts`, and link to `job.contactIds` when `ref.jobId` is set.
   - `add-company`: append to `companies`.
   - Mark each action `done` with `doneAt`.
2. **Tier 1 work** (can take several minutes each): list them and ask "Run now: all, or which?" Then follow the matching command's steps:
   - `research-company` follows `/research-company`
   - `find-people` follows `/find-people`
   - `tailor-resume` follows `/tailor-resume`
   - `interview-prep` follows `/interview-prep`
   - `learn-skill` adds `{skill, resource, status: "todo", hours: 0}` to `learning` (with `createdAt` and `updatedAt`) and suggests a first session

   Those commands may raise their own checkpoints. Mark the action `done` when the work is saved.
3. **Tier 3 packages:** never send or submit yourself.
   - `send-outreach` and `follow-up`: print the final message in a copy block with the recipient (the LinkedIn URL or email from the contact) and the channel.
   - `apply`: build the package per `/apply` (resume, cover letter, answers, checklist). Offer to fill the form only if the user asks and a browser tool is available, and stop before Submit.
   - Leave the status `approved`. Ask the user to say "sent N" or "submitted N" when done.
4. When the user confirms "sent N" or "submitted N", apply the after-sending updates from `/outreach`, `/follow-ups` or `/apply`: set the action `done` with `doneAt`, update the contact or job, add an `outreach` record or job event, and append the activity.

Never delete actions. Rejected ones stay as history.

## 5. Finish

Summarize: approved N, rejected N, done N, and waiting for you to send or submit N. End with `STATUS` and `NEXT BEST ACTION`. If the user prefers visual approval, remind them how to sync to the web app (`/sync`).
