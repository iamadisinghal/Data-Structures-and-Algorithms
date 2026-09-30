---
description: Interview briefing - company and role, likely questions, STAR story mapping and gaps, questions to ask, 30-60-90 plan
argument-hint: "<job_id> [stage, e.g. 'recruiter screen' | 'hiring manager' | 'technical' | 'panel'] [date]"
---

# /interview-prep: interview briefing

Job, stage and date: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Resolve the job. Gather:
  - the company and its `research`, plus `output/research/<company>.md`
  - the JD analysis, if saved
  - the tailored resume (`job.resumeId`)
  - the cover letter
  - contacts at the company, especially the interviewers if the user names them
  - `stories`
- Ask for the stage, the interviewer names and the format if they aren't given and matter. One question round at most.

## 2. Research (Tier 1: needs `settings.autonomy.research` = "auto", otherwise ask)

If the company research is thin or older than about 30 days, refresh it. Delegate to the `interview-coach` subagent for question research and story mapping. For interviewers the user names, look up only their public professional background (role, tenure, public talks or posts).

## 3. Build the briefing (Tier 1 draft)

Save to `output/interview/<company>-<role>.md` (add a `-v2` suffix if the file exists), with these sections:

1. **One-page cheat sheet:** the company in 3 lines, the role in 3 lines, the 3 things they most need (from the JD), the user's 3 strongest proof points, and a 60-second "tell me about yourself" built from true profile facts.
2. **Company and role briefing:** products, recent news (dated), culture signals, team pain points (labelled as inference), and the interview process for this company if publicly reported (cited).
3. **Likely questions,** 15-25, grouped:
   - behavioral (leadership, conflict, failure, ambiguity, prioritization, influence)
   - role-specific and technical (from the JD's must-haves)
   - company-specific ("why us", product questions)
   - tricky ones (gaps, career switch, salary, notice period)

   Each question gets a short note on what the interviewer is testing for.
4. **Story map:**

   | Question / competency | Best story (`st_` id, title) | Key result | Strength (strong / ok / weak) |
   |---|---|---|---|

   Then **missing stories:** competencies with no story, each with a prompt to help the user recall one (e.g. "Think of a time a stakeholder disagreed with your analysis: what happened?"). Never invent a story.
5. **Gap answers:** honest framing for each gap from the JD analysis.
6. **Questions to ask,** 8-10, tailored to the stage (recruiter: process, team, timeline; manager: success in 90 days, challenges; peers: workflow, tooling). Avoid questions the research already answers.
7. **30-60-90 plan outline:** learn, contribute, lead. Tie it to the team's pain points, and keep it modest and specific.
8. **Logistics checklist:** time zone, link, test the setup, a copy of the resume version sent, a notebook, water, a thank-you draft ready.

## 4. Update the data (Tier 2)

In one APPROVAL CHECKPOINT, propose:
- **New or refined stories:** only from facts the user supplies in this session (offer a short Q&A to turn their answers into STAR format). Add them as `Story` objects (`st_`), with `competencies` filled.
- **Job updates:** add an event `{type: "interview", note: "<stage> on <date>"}`, set `nextAction: "Send thank-you"` and `nextActionDate` = interview date + 1, and set `status: "interview"` if it isn't already.
- **Prep sheet in the web app:** copy the prep sheet Markdown into `job.prep` so it appears under Interview Prep > Company prep in the web app.
- Mark any pending `interview-prep` action for this job `done`.
- Append activity `{type: "interview", ref: "<job_id>", note: "Prep for <stage>"}`, and bump `meta.updatedAt`.

Offer a mock interview. Ask one question at a time, wait for the answer, then give brief feedback on structure (STAR), specificity, metrics and length.

## 5. Finish

End with `STATUS` and `NEXT BEST ACTION` (e.g. "Practice the 3 weakest story mappings" or `/follow-ups interviews` after the interview).
