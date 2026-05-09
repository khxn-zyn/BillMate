---
name: billmate-feature
description: Plan and build a new BillMate feature end-to-end. Reads project context, asks for a feature description, plans before coding, builds step by step, then logs what shipped. Use when the user wants to add or build a new feature in BillMate.
user-invocable: true
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
  - Bash(npm run *)
  - Bash(git *)
---

# /billmate-feature — BillMate Feature Builder

Build a new BillMate feature end-to-end: context → description → plan → build → log.

Arguments passed: `$ARGUMENTS`

---

## Stack Reference

| Layer | Technology |
|---|---|
| Framework | Next.js App Router (JavaScript, no TypeScript) |
| Styling | Tailwind CSS |
| Theme | Dark background, purple accents — primary `#7c5cfc` |
| Auth + DB | Supabase (Sydney region) |
| Payments | Stripe (A$7/month Pro gating) |
| Hosting | Vercel |
| Target market | Australian freelancers, tradies, SMBs |

### Key file map

```
app/
  layout.js          — root layout, global providers
  globals.css        — Tailwind base + custom dark-theme vars
  page.js            — landing page
  dashboard/page.js  — main authenticated view
  invoice/
    new/page.js      — invoice creation
    new/[id]/page.js — edit existing invoice
    [id]/page.js     — view/print invoice
  login/page.js
  signup/page.js
  forgot-password/page.js
  reset-password/page.js
  api/
    checkout/route.js      — Stripe checkout session
    support-chat/route.js  — Claude-powered support chat
  components/
    SupportChat.jsx        — support chat widget
```

---

## Procedure

### Step 1 — Load project context

Read `C:\Obsidian\BillMate\log.md` in full. This is the authoritative record of what has been built, what is broken, and what is planned. Do not skip this — it prevents duplicate work and surfaces known blockers.

### Step 2 — Get the feature description

If `$ARGUMENTS` is non-empty, treat it as the feature description and skip asking.

Otherwise ask the user one question:

> **What feature do you want to build?** Describe it in plain English — what it does, who uses it, and any constraints you already know.

Wait for the answer before proceeding.

### Step 3 — Plan (mandatory — no code yet)

Before writing a single line of code, produce a written plan:

1. **Feature summary** — one sentence
2. **User flow** — numbered steps from the user's perspective
3. **Files to create or modify** — list every file with a one-line note on what changes
4. **Data / API changes** — any new Supabase tables, columns, RLS policies, or Stripe products needed
5. **Edge cases** — at least three: unauthenticated access, empty/error states, mobile layout
6. **Open questions** — anything that needs a decision before coding starts

Present the plan to the user. Ask:

> Does this plan look right, or do you want to adjust anything before I start building?

Wait for approval or revision. Revise and re-present if needed. Do not proceed to Step 4 until the user confirms.

### Step 4 — Build step by step

Work through the plan in logical order. For each step:

- State what you're about to do in one sentence
- Make the change
- Note the result (file written, route added, etc.)

**Design rules (non-negotiable):**
- Dark theme by default — match existing `globals.css` variables
- Purple accent `#7c5cfc` for all primary buttons, active states, and highlights
- All new UI must be mobile-responsive (use Tailwind responsive prefixes)
- Tailwind utility classes only — no inline style objects unless unavoidable
- Follow existing component patterns (look at `dashboard/page.js` for reference)
- Stripe-gate Pro features: check the user's subscription status before rendering
- Never expose Supabase service role key or Stripe secret key in client code

**Code rules:**
- JavaScript only (no TypeScript, no `.ts`/`.tsx`)
- Next.js App Router conventions: server components by default, `"use client"` only when needed
- Supabase client: use `createClient` from `@/lib/supabase` or whichever pattern is already in use
- No new dependencies without asking first

### Step 5 — Log the session

When the feature is fully built (or the session ends), append an entry to `C:\Obsidian\BillMate\log.md` using this format:

```
## [YYYY-MM-DD] Feature: <feature name>

### Built
- Bullet summary of every file created or modified
- Any Supabase schema changes
- Any Stripe config changes

### Blocked / Broken
- Known issues, limitations, or follow-up work needed
- "None" if clean

### Next
- Immediate follow-up tasks inferred from what was built

---
```

Echo the appended log entry to the user as confirmation.
