---
name: billmate-session-log
description: Append a structured BillMate session entry to C:\Obsidian\BillMate\log.md — date, what was built, what's blocked/broken, and what's next. Use at the end of any BillMate dev session, or when the user says "log the session", "save the session", or "end of session".
user-invocable: true
allowed-tools:
  - Read
  - Edit
  - Write
---

# /billmate-session-log — BillMate Session Logger

Append a structured dev session entry to `C:\Obsidian\BillMate\log.md`.

Arguments passed: `$ARGUMENTS`

---

## Steps

1. Read `C:\Obsidian\_CLAUDE.md` to orient to vault conventions.
2. Read `C:\Obsidian\BillMate\log.md` to see current entries and determine next session number.
3. Synthesize the entry from conversation context — do NOT ask the user to summarize. Infer:
   - **Date:** today in `YYYY-MM-DD` format
   - **Session N:** last session number in the log + 1; fall back to `_CLAUDE.md` Session History table if log has no numbered sessions
   - **Theme:** one-line description of the session's main focus
   - **Built:** bullet list — features shipped, bugs fixed, decisions made, config changes
   - **Blocked / Broken:** bullet list — known issues, open blockers, things that failed; write "None" if clean
   - **Next:** bullet list — immediate next steps inferred from the conversation
4. Append the new entry to `C:\Obsidian\BillMate\log.md`. Preserve all existing content.
5. Echo the appended block to the user as confirmation.

---

## Entry Format

```
## [YYYY-MM-DD] Session N | One-line session theme

### Built
- Item 1
- Item 2

### Blocked / Broken
- Item 1

### Next
- Item 1
- Item 2

---
```

---

## Rules

- **Append only.** Never rewrite or delete existing log entries.
- **Infer everything** from conversation context — never prompt the user for a summary.
- **Self-contained entries.** Each entry must make sense to future-Claude with no surrounding context.
- **Tight bullets.** One fact per line. No prose paragraphs inside bullets.
- If `$ARGUMENTS` contains extra context (e.g. a note the user typed), weave it into the entry.
- If no session number can be determined, use the current date as the identifier (e.g. `Session 2026-05-09`).
