# Waypoint data schema (v1)

Waypoint keeps **all** data in one JSON document. The web app stores it in the browser
(`localStorage` key `waypoint.v1`) and exports/imports it as `waypoint-data.json`.
The Claude Code workspace reads and writes the same file at
`claude-workspace/data/waypoint-data.json`, so both sides stay in sync.

The Claude API key (if any) is **never** part of this document.

## Conventions

- IDs are short strings: `<prefix>_<base36 timestamp><random>`, e.g. `job_lx2k9a7f3`.
  Prefixes: `job_`, `co_`, `ct_`, `out_`, `res_`, `cl_`, `st_`, `off_`, `act_`.
- Dates are ISO-8601 strings (`2026-09-30` or `2026-09-30T10:15:00.000Z`).
- Every top-level list item carries `createdAt` and `updatedAt`. When merging two copies of the
  document, the item with the newer `updatedAt` wins (matched by `id`).
- Unknown fields must be preserved by both sides (forward compatibility).

## Top level

```jsonc
{
  "version": 1,
  "meta":      { "createdAt": "...", "updatedAt": "...", "demo": false },
  "settings":  { ... },
  "profile":   { ... },
  "companies": [ Company ],
  "jobs":      [ Job ],
  "contacts":  [ Contact ],
  "outreach":  [ Outreach ],
  "resumes":   [ ResumeVersion ],
  "coverLetters": [ CoverLetter ],
  "stories":   [ Story ],
  "answers":   { "<questionKey>": "<answer>" },
  "offers":    [ Offer ],
  "actions":   [ Action ],
  "activity":  [ Activity ],
  "learning":  [ LearningItem ]
}
```

## settings

```jsonc
{
  "region": "global",            // global | india | us | uk | eu | canada | australia | mena | sea
  "currency": "USD",             // ISO code used for salary display
  "weeklyGoals": { "applications": 10, "outreach": 15, "followups": 5, "learningHours": 3 },
  "autonomy": {                   // what the copilot may do without asking (see "Permissions")
    "research":     "auto",       // auto | ask
    "drafts":       "auto",       // auto | ask   (resume / cover letter / message drafts)
    "saveItems":    "ask",        // auto | ask   (adding jobs, contacts, companies it found)
    "outreach":     "ask",        // always "ask" - nothing is ever sent without approval
    "applications": "ask",        // always "ask" - nothing is ever submitted without approval
    "followups":    "ask"
  },
  "claude": { "model": "claude-opus-5-5", "effort": "medium", "webSearch": true }
}
```

## profile

```jsonc
{
  "name": "", "headline": "", "email": "", "phone": "", "location": "",
  "linkedin": "", "github": "", "website": "",
  "currentTitle": "", "currentCompany": "", "yearsExperience": 0,
  "targetTitles": ["Data Analyst"], "targetLocations": ["Bengaluru", "Remote"],
  "workModes": ["remote", "hybrid"],                 // remote | hybrid | onsite
  "salary": { "current": 0, "expected": 0, "minimum": 0, "currency": "USD" },
  "noticePeriod": "30 days", "workAuth": "", "relocate": false,
  "summary": "",
  "skills": ["SQL", "Python"],                        // canonical skill names
  "experience": [ { "id": "", "title": "", "company": "", "location": "",
                    "start": "2021-04", "end": "", "current": true, "bullets": [""] } ],
  "education":  [ { "id": "", "degree": "", "school": "", "year": "", "details": "" } ],
  "projects":   [ { "id": "", "name": "", "link": "", "description": "", "bullets": [""] } ],
  "certifications": [""], "achievements": [""], "languages": [""],
  "rawResume": "",                                    // original pasted resume text
  "careerSwitch": { "active": false, "fromFamily": "", "toFamily": "", "motivation": "" }
}
```

## Company

```jsonc
{ "id": "co_...", "name": "", "domain": "acme.com", "industry": "", "size": "", "location": "",
  "tier": "A",                  // A (dream) | B (strong) | C (backup)
  "status": "researching",      // researching | targeting | applied | connected | paused
  "interest": 4, "fit": 3,      // 1-5
  "notes": "",
  "research": { "mission": "", "products": "", "news": "", "culture": "",
                "interviewProcess": "", "salaryRange": "", "keyPeople": "", "sources": [""] },
  "createdAt": "", "updatedAt": "" }
```

## Job

```jsonc
{ "id": "job_...", "title": "", "company": "", "companyId": "co_...", "location": "",
  "workMode": "hybrid", "url": "", "source": "LinkedIn",
  "salaryMin": 0, "salaryMax": 0, "currency": "USD",
  "description": "",           // full job description text
  "status": "saved",           // saved | applying | applied | screening | interview | offer | rejected | withdrawn
  "match": 0,                  // 0-100 match score (computed)
  "priority": 2,               // 1 high | 2 normal | 3 low
  "resumeId": "", "coverLetterId": "",
  "appliedAt": "", "nextAction": "", "nextActionDate": "",
  "contactIds": [""],
  "events": [ { "date": "", "type": "applied", "note": "" } ],   // status changes, calls, emails
  "notes": "", "createdAt": "", "updatedAt": "" }
```

## Contact

```jsonc
{ "id": "ct_...", "name": "", "title": "", "company": "", "companyId": "",
  "relationship": "recruiter", // colleague | alumni | recruiter | hiring-manager | employee | friend | mentor | other
  "warmth": 2,                 // 1 cold - 5 close
  "linkedin": "", "email": "", "source": "",
  "status": "to-contact",      // to-contact | requested | connected | replied | meeting | referred | no-response
  "lastContacted": "", "nextFollowUp": "",
  "interactions": [ { "date": "", "channel": "linkedin", "note": "" } ],
  "notes": "", "createdAt": "", "updatedAt": "" }
```

## Outreach

```jsonc
{ "id": "out_...", "contactId": "", "jobId": "",
  "type": "connection",        // connection | referral | recruiter | hiring-manager | informational | follow-up | thank-you | reconnect
  "channel": "linkedin",       // linkedin | email | other
  "subject": "", "body": "",
  "status": "draft",           // draft | approved | sent | replied
  "sentAt": "", "createdAt": "", "updatedAt": "" }
```

## ResumeVersion / CoverLetter

```jsonc
{ "id": "res_...", "name": "Acme - Data Analyst", "jobId": "", "template": "classic",
  "data": { "name": "", "headline": "", "contact": [""], "summary": "", "skills": [""],
            "experience": [ { "title": "", "company": "", "location": "", "dates": "", "bullets": [""] } ],
            "projects": [ ... ], "education": [ ... ], "certifications": [""] },
  "matchScore": 0, "atsScore": 0, "createdAt": "", "updatedAt": "" }

{ "id": "cl_...", "jobId": "", "tone": "professional", "body": "", "createdAt": "", "updatedAt": "" }
```

## Story (STAR bank) / Offer / LearningItem / Activity

```jsonc
{ "id": "st_...", "title": "", "situation": "", "task": "", "action": "", "result": "",
  "competencies": ["leadership"], "createdAt": "", "updatedAt": "" }

{ "id": "off_...", "company": "", "role": "", "base": 0, "bonus": 0, "equity": 0, "signing": 0,
  "benefits": 0, "location": "", "growth": 3, "wlb": 3, "deadline": "", "notes": "",
  "createdAt": "", "updatedAt": "" }

{ "skill": "Terraform", "resource": "", "status": "todo", "hours": 0 }   // todo | doing | done

{ "date": "2026-09-30", "type": "applied", "ref": "job_...", "note": "" }
// type: applied | outreach | followup | interview | research | resume | learning | offer
```

## Action (the approval queue)

Every step the copilot wants to take becomes an **Action**. Nothing that leaves your
computer (a message, an application) happens until an action is approved **and** you
carry it out (or, in Claude Code, explicitly tell Claude to carry it out).

```jsonc
{ "id": "act_...",
  "type": "apply",
  "title": "Apply to Acme - Data Analyst (82% match)",
  "detail": "Why this is suggested / what will happen",
  "ref": { "jobId": "", "contactId": "", "companyId": "" },
  "payload": { },              // type-specific data, see below
  "impact": 3, "effort": 2,    // 1 low - 3 high
  "status": "pending",         // pending | approved | rejected | done
  "source": "planner",         // planner | claude | claude-code | user
  "createdAt": "", "decidedAt": "", "doneAt": "", "updatedAt": "" }
```

| type | meaning | payload |
|---|---|---|
| `save-job` | add a job the copilot found | a full Job object |
| `add-contact` | add a person the copilot found | a full Contact object |
| `add-company` | add a target company | a full Company object |
| `research-company` | research a company | `{}` |
| `find-people` | find recruiters / hiring managers / alumni at a company | `{}` |
| `tailor-resume` | build a tailored resume for a job | `{}` |
| `apply` | submit an application (human does the final submit) | `{}` |
| `send-outreach` | send a message | `{ "type", "channel", "subject", "body" }` |
| `follow-up` | follow up on an application or message | `{ "body" }` |
| `interview-prep` | prepare for an interview | `{}` |
| `learn-skill` | close a skill gap | `{ "skill", "resource" }` |
| `custom` | anything else | `{ "instructions" }` |

## Extra fields written by the web app

Both sides must preserve these (see "Unknown fields must be preserved" above). Claude Code may read
them for context and may write `job.aiAnalysis` and `job.prep`.

| Where | Field | Meaning |
|---|---|---|
| top level | `reports: [ { id: "rep_...", kind, title, markdown, ref, createdAt, updatedAt } ]` | Saved Markdown briefs (market scans, company briefs, negotiation plans) |
| `meta` | `onboarded`, `visited{route: date}`, `practice[{date, q, rating}]`, `lastClaudeExport`, `lastClaudeImport` | UI state and mock-interview log |
| `settings` | `mode` (`standalone` \| `claude`), `theme` (`system` \| `light` \| `dark`), `matchThreshold` (0-100) | Preferences |
| `profile` | `updatedAt` | Used when merging two copies of the profile |
| Job | `aiAnalysis: { at, score, summary, mustHave[], niceToHave[], matched[], gaps[{skill, mitigation}], redFlags[], keywords[], interviewFocus[] }` | Claude's analysis, shown on the job page |
| Job | `prep` (Markdown) | Interview prep sheet, shown under Interview Prep > Company prep |
| Job | `screening{question: answer}`, `answersReviewed`, `skipLetter`, `skipReferral` | Apply Wizard state |
| Job | `prepChecklist{item: bool}`, `plan306090` (text) | Interview readiness checklist and 30-60-90 plan |
| ResumeVersion | `source` (`claude` when produced by Claude) | Badge in Resume Studio |
| Action | `autoApproved` (bool) | Approved automatically by the permission settings |

`job.match` is always recomputed by the web app's offline scorer when data loads, so put any
richer scoring from Claude in `job.aiAnalysis`.
