---
name: research-save
description: Capture a link or article into the Obsidian vault. Fetches content, summarizes key insights, assigns a category, and saves an AI-first markdown note to C:\Obsidian\Research\{Category}\. Delegates YouTube URLs to the /youtube pipeline. Trigger when the user says "save this", "research save", shares a link, or pastes an article URL.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - WebFetch
  - Bash(uv run *)
---

# /research-save — Research Capture

Capture a link or article into the vault: fetch → summarize → categorize → save.

Arguments passed: `$ARGUMENTS`

---

## Categories and folders

| Category | Folder | Save when content is about… |
|---|---|---|
| AI Tools | `Research/AI Tools/` | AI products, models, tools, Claude, LLMs, agents, automation, prompting |
| Business | `Research/Business/` | Startups, SaaS, revenue, pricing, funding, founder strategy, indie hacking |
| Development | `Research/Development/` | Code, frameworks, Next.js, Supabase, APIs, databases, DevOps, architecture |
| Marketing | `Research/Marketing/` | Growth, SEO, copywriting, ads, social, email, content strategy, positioning |
| Productivity | `Research/Productivity/` | Workflows, tools, systems, focus, time management, PKM, second brain |

If the content clearly spans two categories, pick the one that is the **primary** focus.
If it does not fit any of the five, save to `Research/Misc/` and note the mismatch.

---

## Procedure

### Step 1 — Identify the input

If `$ARGUMENTS` is non-empty, treat it as the URL or article content. Otherwise check the conversation for a URL or pasted article.

If no input is found, ask: **What do you want to save? Paste the link or article.**

### Step 2 — YouTube check

If the URL matches any YouTube pattern:
- `youtube.com/watch?v=`
- `youtu.be/`
- `youtube.com/shorts/`

**Stop and route to the YouTube pipeline:**

```bash
uv run -m scripts.research.youtube_extract "<url>"
```

Run from `~/Projects/personal/obsidian-second-brain/`. Show output verbatim. Do not continue with steps below — the YouTube pipeline handles saving automatically to `Research/YouTube/`.

### Step 3 — Fetch the content

Use WebFetch to retrieve the full page content from the URL.

If fetch fails (paywall, 403, redirect loop), tell the user:
> "I couldn't fetch that page. Paste the article text directly and I'll process it."

Then proceed with whatever content the user provides.

### Step 4 — Extract and summarize

From the fetched content, extract:

1. **Title** — the article or page title
2. **Author** — name(s) if present, otherwise omit
3. **Published date** — if present, otherwise omit
4. **Source domain** — e.g. `vercel.com`, `paulgraham.com`
5. **TL;DR** — one sentence: what this is and why it matters
6. **Key insights** — 5–10 bullet points; each bullet is one concrete, reusable idea. No fluff, no restatements of the intro.
7. **Notable quotes** — up to 3 verbatim quotes worth preserving (skip if none are distinctive)
8. **Worth following up on** — 2–4 questions or threads this article opens that could be researched further

### Step 5 — Categorize

Choose the single best category from the table above. State your choice and the reasoning in one sentence before saving.

### Step 6 — Save the note

Generate a safe filename slug from the title: lowercase, hyphens instead of spaces, strip punctuation, max 60 chars.

File path: `C:\Obsidian\Research\{Category}\YYYY-MM-DD — {slug}.md`

Write the note with this structure:

```markdown
---
date: YYYY-MM-DD
type: research
category: {category}
source: {full URL}
source-domain: {domain}
author: {author or omit}
published: {date or omit}
tags:
  - research
  - {category-tag}
  - {topic-tag-1}
  - {topic-tag-2}
ai-first: true
confidence: stated
---

## For future Claude
Research note saved YYYY-MM-DD. Captures [{title}]({url}) from {source-domain}. Saved because: {one-sentence reason this is worth keeping}. Confidence: stated (direct source content, not synthesized).

## Source

- **Title:** {title}
- **Author:** {author}
- **Published:** {published date}
- **URL:** {full URL}
- **Saved:** YYYY-MM-DD

## TL;DR

{one-sentence summary}

## Key Insights

- Insight 1 (as of YYYY-MM, {source-domain})
- Insight 2 (as of YYYY-MM, {source-domain})
- ...

## Notable Quotes

> "Quote 1" — {author or source}

## Worth Following Up On

- Question or thread 1
- Question or thread 2

## Related

- [[BillMate]] — link if any insight is directly relevant to BillMate
- (other wikilinks to vault concepts, people, or projects if applicable)
```

**Recency markers are mandatory on every factual claim** — append `(as of YYYY-MM, source-domain)` per the AI-first rules.

**Wikilinks are mandatory** — if the article mentions a person, tool, company, or concept that exists or should exist as a vault note, use `[[wikilinks]]`. If the linked note doesn't exist, that's fine — the broken link is still valuable for future graph traversal.

### Step 7 — Confirm to the user

Tell the user:
- File saved to `Research/{Category}/YYYY-MM-DD — {slug}.md`
- Category assigned and why
- Number of key insights captured
- Any "Worth Following Up On" threads worth acting on now
