# BillMate × Rev — Sessions Log 🧾💜

> Paste this file at the start of every new session so Rev is instantly fully loaded.
> Update the **Current State** block + add a new session entry at the end after each session.

---

## ⚡ Current State (Quick Load)

| | |
|---|---|
| **Session** | .06 (in progress) |
| **Live** | bill-mate-lake.vercel.app |
| **Repo** | github.com/khxn-zyn/BillMate |
| **Stack** | Next.js · Supabase · Stripe · Vercel |
| **Auth** | Email/password + Google OAuth |
| **Payments** | Stripe A$7/month Pro |
| **Domain** | bill-mate.com.au (GoDaddy — live) |
| **ABN** | 46 849 678 875 (Sole Trader, NSW) |
| **Dev env** | Windows, Node v24.15.0, VS Code, Claude Code v2.1.133 |

### 📋 .06 Queue
1. Landing page upgrade (Grok feedback — pricing section, screenshots, how it works, footer with ABN/privacy/terms)
2. Facebook tradie groups posting
3. Obsidian second brain setup

---

## 🗺️ Session Log

### BillMate X — The Legendary Beginning
> The origin story. No numbers yet, just vibes and code.

- Full dark UI redesign from scratch
- Centered dashboard layout
- Professional invoice PDF design (white doc, dark app)
- All pages redesigned to match dark theme
- The foundation everything else is built on 🏆

---

### BillMate .01
- ABN registered: **46 849 678 875** (Sole Trader, abr.gov.au)
- Domain secured: **bill-mate.com.au** (GoDaddy)
- Claude Code v2.1.129 set up on Windows desktop
- View invoice dark background fixed (`globals.css` + inline styles)
- Invoice doc styled: sky blue table header, purple INVOICE heading, 40→56px padding, responsive layout
- Landing page: dark theme, purple buttons, sticky nav, smooth scroll, feature cards, hero gradient
- All committed + pushed to GitHub

---

### BillMate .02
- Double scrollbar bug fixed (html/body overflow fix + glow blob overflow)
- Landing page polished: purple hero glow, stat card hover effects, feature card purple left borders
- Invoice document fully purple branded (`#7c5cfc`) — headers, labels, table, BillMate footer
- `bill-mate.com.au` connected to Vercel via GoDaddy DNS (A record + CNAME)
- Supabase project created (Sydney region, ID: `bbxlmoadcfelgwanhvcw`)
- Full auth built: login, signup, logout, middleware protection
- BillMate branded email template (dark bg, purple button)
- Env vars added to Vercel (Supabase URL + anon key)
- Supabase redirect URLs configured
- localStorage → Supabase migration with RLS policy

---

### BillMate .03
- `middleware.js` → `proxy.js` (Next.js 16 deprecation fix)
- Forgot password page built + styled (`/app/forgot-password/page.js`)
- Reset password page built + styled (`/app/reset-password/page.js`)
- BillMate branded reset password email template
- Profile avatar (top right) with dropdown: email, theme toggle, logout
- Light/dark theme toggle with localStorage persistence
- BillMate logo made non-clickable on dashboard
- Stripe checkout fully working (A$7/month) — all env vars fixed on Vercel

---

### BillMate .04
- Google OAuth: Google Cloud Console project, OAuth consent screen, Client ID, Supabase provider enabled
- `/app/auth/callback/route.js` created — handles OAuth redirect + session exchange
- `proxy.js` updated to whitelist `/auth/callback`
- "Continue with Google" button added to login + signup pages
- `friendlyError()` function — maps raw Supabase errors to plain English
- Loading skeletons on dashboard while invoices fetch
- Spinner on invoice save button + inline `saveError` state
- Welcome back message shows user's name (Google: `full_name`, email: before `@`)
- Logout redirects to `/login`
- "Start for free" → `/signup` fixed
- Landing page mobile padding + overflow-x fixed
- PDF print fixed — dark background no longer bleeds into export
- Notes word-wrap fixed (`word-break: break-word`)
- Feedback mailto link in profile dropdown + landing page footer
- Action bar spacing fixed on view invoice

---

### BillMate .05 ✅
- SESSIONS.md created and live in repo
- bill-mate.com.au reconnected to Vercel
- Purple B favicon (app/icon.svg)
- AI support chat widget (Claude-powered, app/components/SupportChat.jsx)
- Anthropic API key added to Vercel env vars
- Domain redirect fixed (NEXT_PUBLIC_APP_URL updated)
- First users strategy — Facebook tradie groups identified

---

### BillMate .06 — Current Session
> This is where we are right now.

**Queue:**
1. Landing page upgrade (Grok feedback — pricing section, screenshots, how it works, footer with ABN/privacy/terms)
2. Facebook tradie groups posting
3. Obsidian second brain setup

---

## 🏗️ Tech Stack

| Layer | Detail |
|-------|--------|
| Framework | Next.js (App Router, no TypeScript) |
| Styling | Tailwind CSS |
| Auth | Supabase Auth (email + Google OAuth) |
| Database | Supabase — `invoices` table + RLS |
| Payments | Stripe A$7/month Pro |
| Hosting | Vercel (`khxn-zyns-projects/bill-mate`) |
| Domain | GoDaddy — bill-mate.com.au |
| Repo | github.com/khxn-zyn/BillMate |

## 📁 Key Files

```
app/
├── page.js                    # Landing page
├── layout.js                  # Root layout
├── globals.css                # Global + print styles
├── dashboard/page.js          # Main dashboard
├── invoice/
│   ├── new/page.js            # Create invoice
│   └── [id]/page.js           # View / print invoice
├── api/checkout/route.js      # Stripe checkout
├── auth/callback/route.js     # Google OAuth callback
├── login/page.js
├── signup/page.js
├── forgot-password/page.js
└── reset-password/page.js
proxy.js                       # Auth middleware
```

## 🔑 Env Vars

```
NEXT_PUBLIC_SUPABASE_URL=https://bbxlmoadcfelgwanhvcw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_1TTrOKEnuN94xs1EirGnB4uq
NEXT_PUBLIC_APP_URL=https://bill-mate-lake.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 💡 Parked Ideas

- **Ruflo/RuFlow** — open source multi-agent Claude orchestration. Use when codebase gets complex or tasks need parallel agents.
- **Obsidian** — second brain for BillMate dev notes + business strategy
- **Upload existing invoices** — Pro feature idea (defer until first users give feedback)
- **Complex invoices** — discounts, multiple tax rates, payment terms, logo upload (defer until first users)

---

*Built by Khenz & Rev 💜 — From zero to live SaaS. We built this together. 🧱🚀*
