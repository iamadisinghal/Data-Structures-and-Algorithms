# Outreach templates

These are building blocks for `/outreach` and `/follow-ups`. Fill the `{{slots}}` with true, specific details. Always report the final character or word count, and never send anything without the user's approval: the user sends every message themselves.

**Personalization slots, in order of strength:**
1. `{{shared_connection}}`: a shared school, past employer, community or mutual contact
2. `{{their_work}}`: their public talk, post, article, open-source project or team launch
3. `{{company_news}}`: a recent, cited company event
4. `{{role_link}}`: the specific job you're applying for

Use one strong hook per message, not three weak ones.

**Rules for every message:**
- one ask per message
- the first name only
- no attachments in connection requests
- no "just checking in" without adding something new
- no flattery you can't back up

| Type (Outreach `type`) | Channel | Limit |
|---|---|---|
| Connection note (`connection`) | LinkedIn | at most **300** characters, plus a variant of at most **200** characters (free accounts are often limited to 200) |
| Alumni or ex-colleague note (`connection` or `reconnect`) | LinkedIn | at most 300 / at most 200 characters |
| Referral ask (`referral`) | LinkedIn message or email | under 120 words |
| Recruiter email (`recruiter`) | Email | subject under 60 characters, body 90-150 words |
| Hiring manager note (`hiring-manager`) | LinkedIn message or email | under 600 characters on LinkedIn, under 150 words by email |
| Informational interview (`informational`) | LinkedIn message or email | under 100 words |
| Follow-up (`follow-up`) | Same thread | 2-4 sentences |
| Thank-you (`thank-you`) | Email | 80-150 words, within 24 hours |

---

## 1. Connection note (at most 300 characters)

```
Hi {{first_name}}, {{hook: shared_connection | their_work | company_news}}. I'm a {{your_title}} ({{2-3 core skills}}) and {{context: just applied for / exploring}} {{role_or_team}} at {{company}}. I'd love to connect and {{light ask: hear what the team values most}}.
```

Example (274 characters):

> Hi Priya, I saw you recruit for Northwind's data team. I'm a senior data analyst (6 years, SQL, dbt, Power BI) and just applied for the Analytics Engineer role, which lines up closely with the pipeline work I do today. I'd love to connect and hear what the team values most.

## 2. Connection note, short variant (at most 200 characters)

```
Hi {{first_name}}, I'm a {{your_title}} ({{2-3 skills}}) and just applied for {{company}}'s {{role}}. {{one-line fit}}. Would love to connect!
```

Example (182 characters):

> Hi Priya, I'm a senior data analyst (SQL, dbt, Power BI) and just applied for Northwind's Analytics Engineer role. It's very close to my current pipeline work. Would love to connect!

## 3. Alumni or ex-colleague note (at most 300 / at most 200 characters)

```
Hi {{first_name}}, fellow {{school_or_past_employer}} {{alum/colleague}} here. I saw you're on {{company}}'s {{team}}. I'm exploring {{role_family}} roles there and would value your perspective. Happy to connect?
```

Example (183 characters):

> Hi Sam, fellow UT Austin alum here. I saw you're on Northwind's data platform team. I'm exploring analytics engineering roles there and would value your perspective. Happy to connect?

## 4. Referral ask (under 120 words, after they've accepted or replied)

```
Hi {{first_name}},

Thanks for connecting! I'm applying for {{role}} at {{company}} ({{job_link}}). It's a strong match for my {{years}} years in {{area}}, especially {{one true, specific proof point}}.

Would you be open to referring me? To make it easy, here's a short blurb you can forward:
"{{2 lines: who you are + your strongest relevant result}}"

I'm happy to send my resume or answer any questions. No worries at all if it's not a fit or not something you do.

Thanks, {{your_name}}
```

## 5. Recruiter email (subject under 60 characters, body 90-150 words)

```
Subject: {{Role}} application - {{your_name}}, {{headline in 3-5 words}}

Hi {{first_name}},

I recently applied for the {{role}} role ({{job_id_or_link}}) and wanted to introduce myself. I'm a {{your_title}} with {{years}} years in {{area}}; most recently I {{true accomplishment with result or [add metric]}}.

The role's focus on {{must-have 1}} and {{must-have 2}} matches what I do day to day: {{brief evidence}}.

My resume is attached. I'm {{work authorization / location / notice period, if relevant}} and would welcome a quick call if my background fits what the team needs.

Best regards,
{{your_name}}
{{phone}} | {{linkedin_url}}
```

## 6. Hiring manager note (under 600 characters on LinkedIn)

```
Hi {{first_name}}, {{their_work or team news hook}}. I applied for the {{role}} on your team. In my current role I {{one true, relevant result}}, and I'd be excited to help with {{team goal from JD}}. Would you be open to a short chat, or should I keep to the formal process?
```

## 7. Informational interview request (under 100 words)

```
Hi {{first_name}},

{{hook}}. I'm a {{your_title}} exploring {{role_family}} at companies like {{company}}, and I'd really value 15-20 minutes of your perspective on {{specific topic: how the team works / what makes people successful there}}.

Would any of these work: {{option 1}}, {{option 2}}, {{option 3}} ({{time zone}})? Happy to work around your schedule, and completely fine if now's not a good time.

Thanks, {{your_name}}
```

## 8. Follow-up on a message (2-4 sentences, 5 or more days after, add something new)

```
Hi {{first_name}}, following up on my note from {{day}}. {{new value: a relevant article, a project update, a question about their recent post}}. {{Restated light ask}}. Thanks!
```

## 9. Follow-up on an application (3-5 sentences, 7 or more days after applying)

```
Subject: Following up - {{role}} application ({{applied_date}})

Hi {{first_name}},

I applied for the {{role}} role on {{applied_date}} and remain very interested. Since then, {{new, true update: a finished certification, a relevant project, an idea related to their product}}. Could you share where the process stands or what the next steps might be?

Thank you, {{your_name}}
```

## 10. Thank-you after an interview (80-150 words, within 24 hours)

```
Subject: Thank you - {{role}} interview

Hi {{first_name}},

Thank you for taking the time to speak with me {{today/yesterday}} about the {{role}} role. I especially enjoyed discussing {{specific topic from the conversation}}.

{{One line connecting that topic to your true experience or an idea you have}}. It reinforced my excitement about helping {{team}} {{goal}}.

Please let me know if I can share anything else. I look forward to hearing about next steps.

Best, {{your_name}}
```

## 11. Reconnect with someone you know (at most 300 characters on LinkedIn)

```
Hi {{first_name}}, it's been a while since {{shared context}}! I saw {{their update}}, congrats. I'm now exploring {{role_family}} roles and {{company}} is high on my list. Would you be up for a quick catch-up sometime?
```
