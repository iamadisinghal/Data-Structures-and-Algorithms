---
description: Deep-dive a company - mission, products, recent news, culture, interview process, salary signals, key people, and how your background maps
argument-hint: "<company name or co_ id>"
---

# /research-company: company deep dive

Company: $ARGUMENTS

Follow CLAUDE.md for the approval protocol, honesty rules, privacy rules and data file rules.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Resolve `$ARGUMENTS` to an existing Company by id, name or domain. If there are several matches, ask. If there's no match, you'll propose adding the company in step 4.
- Collect related jobs (`job.companyId` or the company name) and contacts at this company. Their job descriptions help identify team pain points.

## 2. Research (Tier 1: needs `settings.autonomy.research` = "auto", otherwise ask)

Delegate to the `company-researcher` subagent with the company name and domain, the target role(s) from related jobs or `profile.targetTitles`, and the region. Don't pass personal data beyond the role and a skills summary. You can also research directly with WebSearch and WebFetch.

Required content (cite a URL and date for every non-obvious fact):

| Field | What to find |
|---|---|
| mission | One or two sentences in the company's own words, plus your plain-English take |
| products | Main products and services, customers, business model, rough size and funding or listing status |
| news | 3-6 items from the last 6-12 months (launches, funding, layoffs, leadership changes, acquisitions, earnings), each dated |
| culture | Values, work-mode policy, review-site themes (Glassdoor, AmbitionBox, Blind; describe patterns and note the sample size), engineering or company blog signals |
| interviewProcess | Stages, typical duration, and question themes from public interview reports |
| salaryRange | Ranges for the target role at this company, in `settings.currency` where possible, with source and date. Label estimates. |
| keyPeople | Leaders relevant to the target team (name, title, public profile URL). Public professional info only. |

Then analyze:
- **Likely team pain points:** 3-5 inferred from job descriptions, news and products, each labelled "inference".
- **How the user maps:** for each pain point, the user's matching experience from `profile` or `stories`, or "gap".
- **Talking points:** 3 specific hooks for a cover letter or outreach.
- **Watch-outs:** red flags such as layoffs, poor review trends or unclear funding.

## 3. Write the report (Tier 1 draft)

Save to `output/research/<company>.md` (add a `-v2` suffix if the file exists). Use these sections: Snapshot, Mission, Products, Recent news, Culture, Interview process, Salary signals, Key people, Pain points and your fit, Talking points, Watch-outs, Sources.

## 4. Update the data (Tier 2)

Prepare these changes and show them in one APPROVAL CHECKPOINT:

1. **Existing company:** fill `research` (`mission`, `products`, `news`, `culture`, `interviewProcess`, `salaryRange`, `keyPeople`, `sources[]`) with concise summaries of 1-4 sentences each. Merge `sources` without duplicates. Optionally suggest a `fit` or `tier` change with the reason. Record this as a `custom` action (`payload.instructions` describes the update) or apply it after the checkpoint yes.
2. **New company:** a pending `add-company` action whose payload is a full Company object with `research` already filled.
3. **Key people who are good contacts:** don't add them here. Suggest `/find-people <company>`.
4. If a pending `research-company` action exists for this company, mark it `done` once the research is saved.

On approval:
- write the changes
- bump `updatedAt` on the company and `meta.updatedAt`
- append activity `{type: "research", ref: "<co_id>", note: "Company research"}`

## 5. Finish

End with `STATUS` and `NEXT BEST ACTION` (e.g. `/find-people <company> <team>` or `/tailor-resume <job_id>`).
