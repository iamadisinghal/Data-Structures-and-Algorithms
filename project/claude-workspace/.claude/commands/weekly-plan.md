---
description: Weekly planner - compare goals with this week's activity and generate a prioritized set of pending actions (impact/effort) for approval
argument-hint: "[optional: hours available this week, focus, e.g. '6 hours, focus on referrals']"
---

# /weekly-plan: plan the week

Constraints: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

## 2. Review the week (Tier 1)

The week runs from Monday to Sunday. It is "this week" unless it's Friday to Sunday, in which case offer to plan next week.

1. **Goals vs actuals:** count this week's `activity` by type against `settings.weeklyGoals`:
   ```
   Applications   ####------  4/10
   Outreach       ##--------  3/15
   Follow-ups     #####-----  3/5
   Learning hrs   ?           (not tracked in activity; ask)
   ```
2. **Pipeline health:** jobs per status. Flag stalled jobs (`saved` for 14 or more days, or `applied` for 21 or more days with no response).
3. **The pending queue:** existing pending actions from any source (`planner`, `claude`, `claude-code`, `user`). Carry these forward and don't duplicate them.
4. **Last week's lesson:** what worked. For example, the response rate by channel (referral vs cold apply), and which sources gave the best-matched jobs.

## 3. Generate candidates

Build up to about 15 candidate actions in this order:

1. **Follow-ups due** (see `/follow-ups` criteria): `follow-up` actions with draft `payload.body`.
2. **Apply to top matches:** jobs with `status` `saved` or `applying` and `match` of 70 or more, ordered by `priority` then `match`. Use `tailor-resume` first if there's no `resumeId`, then `apply`.
3. **People at tier A companies without contacts:** `find-people` (payload `{}`, `ref.companyId`).
4. **Outreach to known contacts** with status `to-contact`: `custom` with `payload.instructions: "Run /outreach <ct_id>"`, or `send-outreach` if a draft already exists.
5. **Research:** `research-company` for tier A or B companies with empty `research.mission`.
6. **Pipeline fill:** if there are fewer than about 10 active saved jobs, add `custom` with `payload.instructions: "Run /find-jobs <role> <location>"`.
7. **Interview prep:** `interview-prep` for any job in `interview` status.
8. **Skill gaps:** `learn-skill` (`payload: {skill, resource}`) for gaps that recur across top jobs. Also sync with the `learning` list.

Score each one on `impact` (1-3) and `effort` (1-3). Priority is roughly impact divided by effort, with ties broken by deadlines and weekly goal gaps. Fit the plan to the time the user has, if they gave it (use rough effort sizes: 1 = 15 minutes, 2 = 45 minutes, 3 = 2 hours or more).

## 4. Present and record

Write each candidate to `actions` as `status: "pending"` and `source: "claude-code"`, with `ref` set and a type-correct `payload` (see the CLAUDE.md cheat sheet). Then show:

| # | Type | Action | Impact | Effort | Suggested day | Command |
|---|---|---|---|---|---|---|

Save the same plan to `output/plans/week-<monday-date>.md`, including the goals snapshot.

Then show the APPROVAL CHECKPOINT (`approve all | approve 1,3,5 | reject 2 | edit 4: ... | later`). Remind the user they can also approve visually: sync the file into the web app (Data & Settings, then **Import from Claude Code**) and use the **Approval Queue**.

## 5. Act on approvals

- **Tier 1** (research, drafts): offer to start the first one now.
- **Tier 2** (save, status): carry them out.
- **Tier 3** (apply, outreach, follow-ups): prepare the packages and hand them over. The user sends and submits.

Update each action's `status`, `decidedAt` and `doneAt` as items complete. Bump `meta.updatedAt`.

## 6. Finish

End with `STATUS` (planned N, approved N, estimated hours) and `NEXT BEST ACTION` (the top approved item and its command).
