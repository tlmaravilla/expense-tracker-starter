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

React app with no routing, no external state management, and no backend. `transactions` state (and the `categories` list) lives in `App` (`src/App.jsx`) and is passed down as props; each child component owns its own local UI state.

- `src/App.jsx` — top-level state (`transactions`) and the `handleAddTransaction` updater; composes `Summary`, `TransactionForm`, and `TransactionList`.
- `src/Summary.jsx` — takes `transactions` as a prop and derives `totalIncome`, `totalExpenses`, and `balance` internally.
- `src/TransactionForm.jsx` — owns its own form field state (`description`, `amount`, `type`, `category`) and calls the `onAddTransaction` prop with the new transaction on submit.
- `src/TransactionList.jsx` — owns its own filter state (`filterType`, `filterCategory`) and renders the filtered transaction table; takes `transactions` and `categories` as props.

**Data model** — each transaction has: `id`, `description`, `amount` (number), `type` (`"income"` | `"expense"`), `category`, `date`.

**Known issues (intentional, part of the course):**

- The UI needs styling improvements
