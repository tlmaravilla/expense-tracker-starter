# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a single-file React app (`src/App.jsx`) with no routing, no external state management, and no backend. All state lives in `App` via `useState`.

**Data model** — each transaction has: `id`, `description`, `amount` (string), `type` (`"income"` | `"expense"`), `category`, `date`.

**Known issues (intentional, part of the course):**

- `amount` is stored as a string, causing the income/expense/balance summaries to concatenate instead of add
- The UI needs styling improvements
- Code is intentionally unrefactored — components have not been extracted yet
