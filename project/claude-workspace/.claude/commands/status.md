---
description: Terminal dashboard - funnel with ASCII bars, response rate, this week vs goals, top jobs, overdue follow-ups, pending approvals (read-only)
argument-hint: "[optional: 'week' | 'funnel' | 'jobs' | 'queue']"
---

# /status: dashboard

Focus: $ARGUMENTS

Follow CLAUDE.md. This command is **read-only**: don't change the data file.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively with `/start`.

## 2. Compute

- **Funnel (reached at least this stage):** decide each job's furthest stage from its current `status`, `appliedAt` and `events`. Rejected or withdrawn jobs count up to the furthest stage their events show. Stages: saved, applied, screening, interview, offer. (`applying` counts as saved.)
- **Response rate:** of the applied jobs, the share with any employer response (screening, interview, offer, or a rejection event). Also show the positive rate (screening or beyond). Mark it "too early" if fewer than 5 applications are older than 7 days.
- **Week:** Monday to today. Count `activity` by type against `settings.weeklyGoals`.
- **Top 5 open jobs** by `match` (status saved, applying, applied, screening or interview), with `nextAction` and `nextActionDate`.
- **Overdue:** jobs with `nextActionDate` before today; applied jobs 7 or more days old with no response; contacts with `nextFollowUp` before today; contacts `requested` 5 or more days ago with no reply.
- **Queue:** pending actions by type and source, plus approved-not-done actions.

## 3. Render

Use fixed-width text with bars scaled to the largest count (at most 30 characters). Example:

```
WAYPOINT STATUS - Wed 30 Sep 2026                        profile 85% complete

FUNNEL (reached)
Saved       ############################## 24
Applied     ###############                12
Screening   #####                           4
Interview   ###                             2
Offer       #                               1
Response rate: 42% any / 33% positive (12 applied)

THIS WEEK (Mon 28 Sep - today)        goal
Applications  ####------   4 / 10
Outreach      ###-------   5 / 15
Follow-ups    ##########   5 / 5   done
Learning hrs  ?            - / 3

TOP MATCHES                          match  status     next
1. Acme - Data Analyst                  82  saved      Tailor resume (Oct 1)
...

OVERDUE (3)
- Globex - BI Analyst: applied 9 days ago, no response -> /follow-ups
...

APPROVAL QUEUE: 5 pending (3 claude-code, 2 planner), 1 approved-not-done -> /approve
```

Keep it to about one screen. Omit empty sections, but always show the funnel and this week. If `$ARGUMENTS` names a section, show only that section in more detail.

## 4. Finish

End with `STATUS` (one line: the biggest risk or win) and `NEXT BEST ACTION`, chosen by this priority:
1. overdue follow-ups
2. an interview within 3 days
3. pending approvals older than 2 days
4. the goal with the biggest gap
5. a top match without a tailored resume
