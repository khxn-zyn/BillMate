---
name: billmate-bugfix
description: Diagnose and fix a BillMate bug end-to-end. Reads project context, asks for the bug or error, traces the root cause before touching code, fixes step by step, explains the cause, and logs the fix. Use when something is broken, throwing an error, or not working in BillMate.
user-invocable: true
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
  - Bash(npm run *)
  - Bash(git *)
  - Bash(git log *)
  - Bash(git diff *)
---

# /billmate-bugfix — BillMate Bug Fixer

Diagnose and fix a BillMate bug end-to-end: context → symptom → root cause → fix → explanation → log.

Arguments passed: `$ARGUMENTS`

---

## Stack Reference

| Layer | Technology |
|---|---|
| Framework | Next.js App Router (JavaScript, no TypeScript) |
| Styling | Tailwind CSS — dark theme, purple accent `#7c5cfc` |
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

Read `C:\Obsidian\BillMate\log.md` in full. Pay attention to:
- Recently built features (likely suspects for regressions)
- Previously logged bugs (the same issue may have appeared before)
- Known blockers (pre-existing issues not to confuse with the current bug)

### Step 2 — Get the bug report

If `$ARGUMENTS` is non-empty, treat it as the bug description and skip asking.

Otherwise ask the user:

> **What's broken?** Paste the full error message, stack trace, or describe what you expected vs. what actually happened. Include the page or action where it occurs if you know it.

Wait for their response before proceeding.

### Step 3 — Trace the root cause (mandatory — no code changes yet)

Before touching any file, investigate:

1. **Locate the symptom** — identify which file(s) and line(s) are closest to the error
2. **Read the relevant code** — read the full context of any suspect file, not just the erroring line
3. **Check recent changes** — run `git log --oneline -10` and `git diff HEAD~3` to see what changed recently; regressions usually live in the last few commits
4. **Grep for related code** — if the error references a variable, function, or route, grep for all usages to understand the full call chain
5. **State the root cause** — write a clear one-paragraph diagnosis:
   - What the code is doing
   - Why it's wrong (bad assumption, missing null check, env var not set, wrong import, etc.)
   - Why it broke now (new code, missing migration, env change, etc.)

Present the diagnosis to the user and confirm it matches what they're seeing before writing any fix.

### Step 4 — Fix step by step

Apply the minimal fix that resolves the root cause. Do not refactor surrounding code or fix unrelated issues in the same pass.

For each change:
- State in one sentence what you're changing and why
- Make the edit
- Note the result

**Fix rules:**
- Fix the root cause, not the symptom — no `try/catch` that swallows errors or conditional guards that paper over the real issue
- Preserve the dark theme and `#7c5cfc` purple accent if touching UI files
- Keep JavaScript (no TypeScript); match the existing code style exactly
- Do not add new dependencies without asking
- Do not alter unrelated code — smallest possible diff wins
- If the fix requires a Supabase migration or Stripe config change, state it explicitly and ask before running anything destructive

### Step 5 — Explain the fix

After applying the fix, write a clear post-mortem:

```
**Root cause:** [one sentence — what was actually wrong]
**Why it happened:** [one sentence — what triggered or introduced the bug]
**What was fixed:** [bullet list of every file changed and what changed in it]
**How to verify:** [one or two manual steps the user can take to confirm it's resolved]
```

### Step 6 — Log the bug and fix

Append an entry to `C:\Obsidian\BillMate\log.md`:

```
## [YYYY-MM-DD] Bugfix: <short bug description>

### Root Cause
[One sentence]

### Fixed
- File: `path/to/file.js` — description of change
- (repeat per file)

### Blocked / Broken
- Any remaining known issues related to this bug, or "None"

### Next
- Follow-up tasks if any, or "None"

---
```

Echo the appended log entry to the user as confirmation.
