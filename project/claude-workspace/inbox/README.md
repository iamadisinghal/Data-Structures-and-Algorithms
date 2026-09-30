# inbox/

Drop files here for Claude to read. Claude treats everything in this folder as read-only.

| Drop this | Then run |
|---|---|
| Your resume (PDF, DOCX, TXT or MD) | `/profile <file name>` |
| A job description you copied (TXT or MD), or a screenshot converted to text | `/analyze-job <file name>` |
| Offer letters or compensation summaries | `/negotiate` |
| Notes from a recruiter call or interview | `/interview-prep <job_id>` or `/follow-ups` |

**Tips**
- Plain text and Markdown work best. If a PDF or DOCX comes out garbled, open it, copy all the text, and save it as `resume.txt`.
- Use clear names, e.g. `resume-2026.pdf` or `jd-acme-data-analyst.txt`.
- You can also skip the inbox and paste text straight into the chat after a command.

**Privacy:** everything here except this README is ignored by git (see `../.gitignore`). Delete old files when you no longer need them.
