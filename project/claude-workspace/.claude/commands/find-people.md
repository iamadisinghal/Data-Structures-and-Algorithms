---
description: Find recruiters, likely hiring managers, team members, alumni and ex-colleagues at a company (public professional info only) and propose add-contact actions
argument-hint: "<company or co_ id> [team or role, e.g. 'data platform']"
---

# /find-people: people to talk to at a company

Company and team: $ARGUMENTS

Follow CLAUDE.md. **The privacy rules are strict here:** public professional information only. Never home addresses, personal phone numbers, family, or private social accounts. Don't fetch or scrape LinkedIn pages; use search-result snippets and public company pages.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Resolve the company, whether it's an existing `co_` record or a name, and the team or role (from `$ARGUMENTS`, or from the related jobs' titles).
- Note the user's **schools** (`profile.education[].school`) and **past employers** (`profile.experience[].company`) for alumni and ex-colleague matching.
- List the contacts already known at this company so you don't duplicate them.

## 2. Search (Tier 1: needs `settings.autonomy.research` = "auto", otherwise ask)

Delegate to the `people-scout` subagent, or use WebSearch directly. The queries name the company, the team and job titles. The user's name never goes in a query. Schools and past employers may be used as search terms, since they are the point of alumni matching, but never together with the user's name.

Suggested queries:
```
site:linkedin.com/in "<Company>" ("talent acquisition" OR recruiter) "<team or location>"
site:linkedin.com/in "<Company>" ("head of" OR director OR manager) "<team>"
site:linkedin.com/in "<Company>" "<School>"
site:linkedin.com/in "<Company>" "<Past employer>"
"<Company>" "<team>" engineering blog OR talk OR podcast
```

Also check the company team or about page, its engineering or product blog authors, conference speaker pages, press releases, and the GitHub org.

Find, where possible:
- 1-3 recruiters or talent partners (ideally covering this function or region)
- 1-2 likely hiring managers (team leads for the role; label as "likely", since you can't be sure)
- 2-3 team members in the target role or adjacent to it
- alumni of the user's schools
- ex-colleagues from the user's past employers (people who share a past employer, not necessarily someone the user knows)

## 3. Present

| # | Name | Title | Relationship | Why relevant | Suggested approach | Public source |
|---|---|---|---|---|---|---|

- **Relationship** uses the schema values: `recruiter`, `hiring-manager`, `employee`, `alumni`, `colleague`, `other`.
- **Suggested approach** examples: "connection note mentioning the shared school, then referral ask after reply", or "recruiter email with the job link".
- **Warmth:** default 1. Use 2 for alumni or a shared past employer. Use higher only if the user says they know the person.

Then give **ready-made search links** the user can open while logged in (URL-encode the terms):
- `https://www.linkedin.com/search/results/people/?keywords=<Company>%20recruiter`
- `https://www.linkedin.com/search/results/people/?keywords=<Company>%20<team>%20manager`
- `https://www.linkedin.com/search/results/people/?keywords=<Company>%20<School>` (one per school)
- `https://www.google.com/search?q=site%3Alinkedin.com%2Fin+%22<Company>%22+%22<team>%22`

## 4. Propose contacts (Tier 2)

For each person the user may want to track, create a pending `add-contact` action:
- `title: "Add <Name> (<Title>, <Company>)"`, `detail`: the reason it's relevant
- `ref.contactId`, `ref.companyId` and `ref.jobId` if it's tied to a job
- `payload`: a **full Contact object**:
  - `id` (`ct_`), `name`, `title`, `company`, `companyId`, `relationship`, `warmth`
  - `linkedin` (the public profile URL from search results, if available)
  - `email: ""` (unless it's published for professional contact)
  - `source` (e.g. "Web search: site:linkedin.com/in Acme recruiter")
  - `status: "to-contact"`, `lastContacted: ""`, `nextFollowUp: ""`, `interactions: []`
  - `notes` (why relevant plus the suggested approach), `createdAt`, `updatedAt`

Show the APPROVAL CHECKPOINT. On approval:
- append the contacts and link them to relevant jobs (`job.contactIds`)
- set the company `status` to `"connected"` only after a real connection exists (not now)
- mark any pending `find-people` action for this company `done`
- append activity `{type: "research", ref: "<co_id>", note: "Found N people"}`, and bump `meta.updatedAt`

## 5. Finish

End with `STATUS` and `NEXT BEST ACTION` (usually `/outreach <contact> <job_id>` for the warmest contact).
