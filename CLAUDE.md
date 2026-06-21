# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build
npm run lint     # run eslint
```

There is no test suite. Verification is manual via the running app.

## Architecture

BillMate is a **Next.js 16 App Router** invoicing SaaS for Australian tradies. All code is **JavaScript — no TypeScript**. Deployed on Vercel, backed by Supabase (Sydney region, project ID `bbxlmoadcfelgwanhvcw`).

### Auth middleware

The auth guard lives in **`proxy.js`** (root level), not `middleware.js`. This was a deliberate rename during a Next.js 16 migration (`SESSIONS.md` session .03). It exports a named `proxy` function and a `config` matcher — standard Next.js middleware shape but from a non-standard filename. Protected routes: `/dashboard/**` and `/invoice/**`. Unauthenticated users redirect to `/login`; authenticated users on `/login` or `/signup` redirect to `/dashboard`.

### Supabase client pattern

Two wrappers exist:
- `lib/supabase/client.js` — `createBrowserClient` for `'use client'` components
- `lib/supabase/server.js` — `createServerClient` for API routes and Server Components

Always import from these wrappers; never instantiate Supabase directly. API routes that need auth verification must use the server client and call `supabase.auth.getUser()` to verify ownership before touching data.

### Database schema

Two tables (see `supabase/schema.sql` and `supabase/schema-additions.sql`):

**`profiles`** — one row per user. Stores `business_name`, `abn`, `logo_url`, `payment_terms`, `next_invoice_num`. RLS: users can only touch their own row.

**`invoices`** — `id` (UUID, PK), `user_id`, `status` (`unpaid`/`paid`), `data` (JSONB blob containing all invoice fields: `num`, `bizName`, `clientName`, `clientEmail`, `due`, `lines[]`, `total`, `gst`, `notes`, `logoUrl`). RLS: authenticated users manage their own rows; anonymous users can SELECT any row by UUID (enables the public share portal — UUID entropy acts as the access control).

Schema changes go in `supabase/schema-additions.sql` and are applied via the Supabase SQL Editor. There is no migration CLI workflow.

### Theming

Every page component defines a local `themes` object with `dark` and `light` keys holding colour tokens. The active theme is read from `localStorage` on mount:
- Dashboard / invoice pages: key `billmate-theme`
- Landing page: key `billmate-lp-theme`

Primary purple accent: `#7c5cfc`. Secondary/muted purple: `#a78bfa`. Background dark: `#0a0a0f`. All new UI must support both themes using the same token pattern.

Styling is predominantly **inline style objects** driven by the local theme token (`const t = themes[theme]`), not Tailwind utility classes. Tailwind v4 is a dependency but used mainly in `globals.css` for the base reset. Match whichever approach the file you're editing uses.

### API routes

| Route | What it does |
|---|---|
| `app/api/checkout/route.js` | Creates a Stripe Checkout session for the A$7/month Pro subscription |
| `app/api/remind/route.js` | Sends a payment reminder email via Resend; verifies invoice ownership via server Supabase client before sending |
| `app/api/support-chat/route.js` | Proxies messages to Claude Sonnet 4.6 (`claude-sonnet-4-6`) — BillMate-aware system prompt |
| `app/api/og/route.js` | Generates the OG social preview image (edge runtime, `next/og`) |
| `app/auth/callback/route.js` | Handles Google OAuth redirect and exchanges the code for a Supabase session |

### Public invoice share

`/share/[id]/page.js` is a public page that reads an invoice from Supabase using the anon key. Access control relies entirely on UUID unguessability (per `schema-additions.sql`). This page always renders in light mode.

### Payments (Stripe)

`NEXT_PUBLIC_STRIPE_PRICE_ID` is the recurring price ID. The checkout route creates a session and returns its URL; the client redirects to it. Success redirects to `/dashboard?upgraded=true`. Pro features are gated by checking subscription status — pattern TBD (not yet implemented in all planned features).

### AI support chat

`SupportChat.jsx` is the floating chat widget rendered on the dashboard. It calls `/api/support-chat` which calls the Anthropic API directly (not the SDK — raw `fetch` to `https://api.anthropic.com/v1/messages`). Requires `ANTHROPIC_API_KEY` env var.

## Required environment variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PRICE_ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL            # e.g. https://bill-mate.com.au
RESEND_API_KEY
RESEND_FROM_EMAIL              # defaults to invoices@bill-mate.com.au
ANTHROPIC_API_KEY
NEXT_PUBLIC_SITE_URL           # used by /api/remind for share link base URL
```

## Key conventions

- **JavaScript only** — no `.ts`/`.tsx` files, no type annotations.
- **`'use client'` at the top** for any component using hooks, `localStorage`, or browser APIs. Server Components are the default; switch to client only when necessary.
- **Invoice `data` JSONB** — all invoice field reads/writes go through `invoice.data.*`. The top-level `status` column is the only field stored outside JSONB.
- **`next_invoice_num` on profiles** — increment this in the same transaction whenever a new invoice is saved to keep invoice numbers sequential.
- **Print styles** — `globals.css` has `@media print` rules that force white backgrounds. Invoice view pages (`/invoice/[id]`) must not break these.
- **No new dependencies** without explicit user approval — keep the bundle lean for a mobile-first app.

## Custom skills

Invoke these via `/skill-name` in Claude Code:

- `/billmate-feature` — guided feature build (plan → approve → build → log)
- `/billmate-bugfix` — guided bug diagnosis (trace root cause before touching code)
- `/billmate-review` — full codebase audit
- `/billmate-session-log` — append a session entry to the Obsidian log

## Business context

- Live at `bill-mate.com.au` (GoDaddy DNS → Vercel)
- ABN: 46 849 678 875 (Sole Trader, NSW)
- Free plan: unlimited invoices, PDF export, GST calc, payment tracking
- Pro plan: A$7/month — custom logo/branding, overdue reminders, client portal link
- Target users: Australian tradies and small business owners
