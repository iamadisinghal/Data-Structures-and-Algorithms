---
description: Compare offers, research market pay (cited), set a counter-offer range and walk-away point, and draft email + phone scripts - never contacts the employer
argument-hint: "[off_ id or company] [notes, e.g. 'competing offer from X']"
---

# /negotiate: offer comparison and negotiation plan

Offer and notes: $ARGUMENTS

Follow CLAUDE.md. **You never contact the employer.** You prepare the analysis and scripts; the user negotiates. Sending a counter is Tier 3.

## 1. Load

Read `data/waypoint-data.json`. If it's missing, explain how to export it from the web app (Data & Settings, then **Export for Claude Code**, then copy it to `claude-workspace/data/`), or offer to build a fresh profile interactively.

- Read `offers`. If the offer isn't recorded yet, collect it from the user or from an offer letter in `inbox/`: company, role, base, bonus (target amount), equity (annual value, and how the user values it), signing, benefits (annual value estimate), location, growth (1-5), wlb (1-5), deadline and notes. Propose adding it as an `Offer` (`off_`) in a Tier 2 checkpoint.
- Also use `profile.salary` (current, expected, minimum, currency), the linked jobs, and `settings.currency`.

## 2. Research the market (Tier 1: needs `settings.autonomy.research` = "auto", otherwise ask)

Search for pay for this role, level, location and company using 3-5 sources (e.g. Levels.fyi, Glassdoor, AmbitionBox for India, official statistics, recruiter salary guides), plus any `salaryRange` already in the company research. Every figure needs a source, URL and date, and a note on whether it's base or total. Note any cost-of-living differences between offer locations. Say clearly when data is thin.

## 3. Compare offers (Tier 1)

| | Offer A | Offer B |
|---|---|---|
| Base | | |
| Bonus (target) | | |
| Equity / yr (user's valuation) | | |
| Signing (year 1 only) | | |
| Benefits est. | | |
| **Year-1 total** | | |
| **Steady-state annual** | | |
| vs market median (percentile) | | |
| Growth / WLB (1-5) | | |
| Deadline | | |

Add a weighted view if the user gives priorities (e.g. growth counts for twice as much).

## 4. Plan (Tier 1 draft)

- **Target and counter range:** anchor with data (e.g. the market 60th-75th percentile for the level, adjusted for competing offers and the user's evidence). Give the counter figure, the realistic landing zone, and the reasoning.
- **Walk-away point:** the lowest acceptable steady-state total. It must be at least `profile.salary.minimum`, and the user confirms it. Keep it private: never put it in any script.
- **Levers beyond base:** signing bonus, equity refresh, level or title, start date, remote days, learning budget, relocation, notice-period buyout, review timeline (e.g. a 6-month review).
- **Scripts:**
  - **Email counter** (150-220 words): gratitude, excitement, a data-backed ask, flexibility on levers, a clear next step.
  - **Phone script:** an opening line, the ask, pause-and-hold guidance, answers to "what's your number?", "this is our best offer", "we need an answer by Friday", and a gracious close.
  - **Competing-offer mention:** true facts only. Never invent or inflate a competing offer.
  - **Accept and decline templates.**
- **Risk notes:** exploding deadlines, verbal vs written offers, and checking the details (notice period, non-compete, clawbacks on the signing bonus).

Save to `output/offers/<company>-negotiation-<date>.md`.

## 5. Update the data (Tier 2)

In an APPROVAL CHECKPOINT, propose:
- new or updated `Offer` records
- the job `status: "offer"` with an event `{type: "offer"}`
- a pending `send-outreach` action for the counter email (`payload: {type: "recruiter", channel: "email", subject, body}`). The user sends it.

On approval, write the changes, append activity `{type: "offer", ref}`, and bump `updatedAt` and `meta.updatedAt`.

## 6. Finish

End with `STATUS` and `NEXT BEST ACTION` (e.g. "Call the recruiter before <deadline> using the phone script").
