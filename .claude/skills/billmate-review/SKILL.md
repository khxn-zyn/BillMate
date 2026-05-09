---
name: billmate-review
description: Full audit of the BillMate codebase — reads project context, audits all pages for bugs, UI inconsistencies, theme compliance (dark + #7c5cfc), mobile responsiveness, and performance issues, then saves a prioritized review report to C:\Obsidian\BillMate\Reviews\. Trigger when the user says "review the app", "review billmate", or "do a code review".
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash(git log *)
  - Bash(git diff *)
---

# /billmate-review — BillMate Codebase Auditor

Full audit of the BillMate app: context → codebase scan → theme audit → mobile check → performance check → prioritized report → save to vault.

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

### Pages to audit (read every one)

```
app/layout.js
app/globals.css
app/page.js                    — landing
app/dashboard/page.js          — main authenticated view
app/invoice/new/page.js        — invoice creation
app/invoice/new/[id]/page.js   — edit invoice
app/invoice/[id]/page.js       — view/print invoice
app/login/page.js
app/signup/page.js
app/forgot-password/page.js
app/reset-password/page.js
app/api/checkout/route.js
app/api/support-chat/route.js
app/components/SupportChat.jsx
```

---

## Procedure

### Step 1 — Load project context

Read `C:\Obsidian\BillMate\log.md` in full. Note:
- What has been recently built or changed (regression risk areas)
- Previously logged bugs (check if they've actually been fixed)
- Known blockers and outstanding work

Also run `git log --oneline -15` to see recent commits — these point to the highest-risk areas.

### Step 2 — Codebase audit

Read every file in the pages list above. For each file, check:

**Correctness**
- Unhandled promise rejections or missing `await`
- Missing null/undefined guards on data from Supabase or props
- `console.log` or debug statements left in
- Hardcoded values that should come from env vars (URLs, keys, amounts)
- Auth bypass risk: client components that render sensitive data without verifying session
- Stripe Pro gating: any Pro features that render without checking subscription status

**Code quality**
- Unused imports or variables
- Dead code (unreachable branches, commented-out blocks)
- Duplicate logic that could share a utility or component
- Magic numbers or strings without a named constant

**API routes** (`app/api/*`)
- Missing error handling for failed Supabase or Stripe calls
- No input validation on POST bodies
- Secrets exposed to the client (should only be in server-side code)

### Step 3 — Theme audit

For each page file, verify:

| Check | What to look for |
|---|---|
| Dark background | All containers use a dark bg class or `globals.css` var — no `bg-white`, `bg-gray-50`, `bg-slate-100` |
| Purple accent | Primary buttons, active nav items, links, focus rings use `#7c5cfc` or the Tailwind class mapped to it |
| Text contrast | Body text is light (`text-white`, `text-gray-100`, `text-gray-200`) — no dark text on dark background |
| Inline style overrides | Flag any `style={{ background: '...' }}` or `style={{ color: '...' }}` that could break the theme |
| Consistency | All pages feel like the same app — same button shape, same card style, same spacing rhythm |

### Step 4 — Mobile responsiveness audit

For each page, check:

- Fixed pixel widths (`w-[600px]`, `min-w-[500px]`) without responsive overrides — flag any that would overflow on a 375px screen
- Tables or wide layouts — must use horizontal scroll or stack vertically on mobile
- Font sizes — body text must be readable without zoom (`text-sm` minimum on mobile)
- Touch targets — buttons and links must be at least 44×44px equivalent
- Missing `sm:` / `md:` breakpoint prefixes on layout-critical classes
- `overflow-x-hidden` hacks — flag these as symptoms of a wider layout problem

### Step 5 — Performance audit

- `"use client"` directives — flag any component using `"use client"` that doesn't actually need browser APIs or event handlers (should be a server component)
- Missing `loading.js` or `Suspense` boundaries on pages with async data fetching
- Images — any `<img>` tags that should use Next.js `<Image>` for optimization
- Large inline data — any page that fetches and renders a very large dataset without pagination
- Unnecessary re-renders — any state that gets set on every render or in a loop

### Step 6 — Compile the report

Produce a structured review with three priority tiers:

**🔴 P1 — Fix immediately** (broken functionality, auth issues, data leaks, Stripe misconfiguration)
**🟡 P2 — Fix soon** (UI inconsistencies, mobile breaks, unhandled errors, dead code)
**🟢 P3 — Nice to fix** (performance, code quality, minor style drift)

Format each finding as:

```
### [PRIORITY] Finding title
- **File:** `path/to/file.js` (line N if known)
- **Issue:** What is wrong
- **Impact:** Who is affected and how
- **Fix:** Concrete suggestion — what to change
```

End the report with a **Summary** section:
- Total findings by tier (P1 / P2 / P3 count)
- One sentence on the overall health of the codebase
- Top 3 recommended next actions

### Step 7 — Save the report

Create `C:\Obsidian\BillMate\Reviews\` if it does not exist.

Save the report to `C:\Obsidian\BillMate\Reviews\YYYY-MM-DD.md` with this frontmatter:

```markdown
---
date: YYYY-MM-DD
type: review
tags:
  - review
  - billmate
ai-first: true
p1-count: N
p2-count: N
p3-count: N
---

> For future Claude: BillMate codebase review conducted YYYY-MM-DD. Contains prioritized findings across correctness, theme, mobile, and performance. P1 items are blocking; P2 are important but not blocking; P3 are improvements.

# BillMate Review — YYYY-MM-DD

[full report body]
```

Also append a one-line entry to `C:\Obsidian\BillMate\log.md`:

```
## [YYYY-MM-DD] Review | Codebase audit — N P1, N P2, N P3 findings. Report saved to Reviews/YYYY-MM-DD.md.
```

Tell the user the report is saved and show the finding counts.
