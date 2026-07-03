# Escalation Module — CSFAQ

Scope: Escalation page only (submit, track, assign, filter/sort, analytics, reopen)

## What this is

Submit queries, track their status, route them to the right team, and manage
everything through an admin dashboard. Built to be merged into the shared
CSFAQ MERN app once the other modules (FAQ, Discussion Forum, Admin, Query
Resolution) come together.

## Features

| Feature | Status |
|---|---|
| Submit query (tagged to a team) | ✅ Working |
| Track query status | ✅ Working |
| Reopen a resolved/closed query | ✅ Working |
| Admin: assign/reassign to a team | ✅ Working (original category preserved separately) |
| Admin: filter/sort (status, priority, team, date) | ✅ Working |
| Admin: analytics dashboard | ✅ Working |
| Status lifecycle (Pending → In Progress → Resolved/Closed → Reopened) | ✅ Working |
| Link back to originating Discussion Forum thread | ✅ Working |
| Auth (real login + role check) | ❌ Not done — assumes a logged-in user and admin flag already exist |
| Database connection | ⚠️ Requires your own `MONGO_URI` — nothing works without it |

## What's real vs. mocked

**Real and functional right now:**
Submitting, tracking, reopening, admin assignment, filtering/sorting, and
analytics all work as actual logic against MongoDB once connected.

**Mocked / not yet connected:**
- Auth middleware is stubbed — the backend expects `req.user` to already be
  set, but no real login system is wired in.
- Admin dashboard visibility is a placeholder check (local storage), not a
  real role system.

## Next steps to make this submission-ready

1. **Connect MongoDB** — add `MONGO_URI` to `.env`, nothing runs without it.
2. **Wire in real auth** — swap the stubbed `req.user` / admin check for the
   team's actual auth system.
3. **Fix the admin role check** — replace the local storage placeholder with
   whatever the main app actually uses.
4. **Handle ports** — if frontend and backend run separately, add a proxy or
   point the frontend at the full backend URL.

## Tech stack

- React + Vite (frontend)
- Node.js + Express (backend)
- MongoDB via Mongoose
- Plain CSS, light theme (no Tailwind) — consistent with the rest of CSFAQ

## How to use

```bash
npm run install-all
npm run dev
```

Open **http://localhost:5173** and use the "Viewing as: user / admin" toggle
to switch views.
