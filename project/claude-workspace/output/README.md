# output/

Everything Claude drafts for you lands here. Nothing in this folder is sent anywhere: you review it, then use it yourself. Claude creates the subfolders the first time it needs them.

```
output/
  resumes/        <company>-<role>-<yyyy-mm-dd>.md and .html   (/tailor-resume)
  cover-letters/  <company>-<role>-<yyyy-mm-dd>.md              (/cover-letter)
  outreach/       <company>-<contact>-<yyyy-mm-dd>.md           (/outreach)
                  follow-ups-<yyyy-mm-dd>.md                    (/follow-ups)
  research/       <company>.md                                  (/research-company)
                  market-<role>-<location>.md                   (/market-scan)
                  <company>-<role>-jd-analysis.md               (/analyze-job)
  interview/      <company>-<role>.md                           (/interview-prep)
  applications/   <company>-<role>-<yyyy-mm-dd>.md              (/apply: package + checklist)
  plans/          week-<monday-date>.md                         (/weekly-plan)
  offers/         <company>-negotiation-<yyyy-mm-dd>.md         (/negotiate)
```

- Names are lowercase with hyphens, e.g. `acme-corp-data-analyst-2026-09-30.md`. Claude never overwrites a file. It adds `-v2`, `-v3` and so on instead.
- **Resume to PDF:** open the `.html` file in your browser, choose Print, then Save as PDF, and turn off "Headers and footers".
- Files that Claude also records in your data (a resume version, a cover letter) are saved to `data/waypoint-data.json` only after you approve.

**Privacy:** everything here except this README is ignored by git (see `../.gitignore`).
