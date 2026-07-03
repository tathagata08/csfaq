# CSFAQ — Discussion Forum Module

Implementation of the **Discussion Forum** page from `PRODUCT.md`, built with
the specified stack:

| Layer    | Technology                     |
| -------- | ------------------------------- |
| Frontend | React + TypeScript + Tailwind   |
| Backend  | Node.js + Express + TypeScript  |
| Database | MongoDB (via Mongoose)          |

The wider CSFAQ project also has an **FAQ page**, **Admin Dashboard**,
**Query Resolution page**, and **Escalation page**. Those are separate
modules owned by other workstreams — this build only implements the
Discussion Forum, but wires up **placeholder routes/pages** for the other
four so the app's navigation and API surface are complete end-to-end.
Future-enhancement items from `PRODUCT.md` (rich text editor, nested
replies, reputation system, WebSockets, etc.) are intentionally **not**
built.

```
csfaq-discussion-forum/
├── backend/     Express + TypeScript API, MongoDB models
└── frontend/    React + TypeScript + Tailwind SPA
```

## What's implemented (Discussion Forum)

- Navigation bar linking to FAQ / Discussion Forum / Escalation / Admin
- Search bar to find existing discussions before posting
- New Discussion button + submission form (title, description, category,
  optional tags), with client- and server-side validation
- Discussion feed: title, description preview, category, reply count,
  upvote count, accepted-answer indicator, creation date
- Discussion detail page: full question, author, timestamp, replies,
  accepted answer
- Reply section: add reply, chronological order, accepted answer pinned
  to the top
- Upvote system (one upvote per user per reply)
- Accepted answer: only the discussion's original author can mark one
  reply as accepted; only one accepted answer per discussion
- Admin approval: mark a reply as approved (badge shown to all users)
- MongoDB collections matching the spec: `Discussion`, `Reply`
- REST API matching the spec exactly (see below)

## What's a placeholder

`backend/src/routes/{faqRoutes,adminRoutes,escalationRoutes,queryResolutionRoutes}.ts`
and `frontend/src/pages/{FaqPage,AdminDashboardPage,EscalationPage,QueryResolutionPage}.tsx`
exist only so the app is fully wired and navigable. They return `501 Not
Implemented` from the API and a "Coming soon" screen in the UI. Replace
them when those modules are built.

## Getting started

### Backend

```bash
cd backend
cp .env.example .env   # adjust MONGODB_URI / PORT if needed
npm install
npm run dev             # http://localhost:5000
```

Requires a running MongoDB instance (local or Atlas) at the `MONGODB_URI`
in `.env`.

### Frontend

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000`, so no CORS
setup is needed in development (see `frontend/vite.config.ts`).

## API Reference

| Method | Endpoint                          | Description                                   |
| ------ | ---------------------------------- | ---------------------------------------------- |
| POST   | `/api/discussions`                 | Create a new discussion                        |
| GET    | `/api/discussions`                 | List discussions (`?search=&category=&tag=`)   |
| GET    | `/api/discussions/:id`             | Get one discussion with its replies            |
| POST   | `/api/discussions/:id/replies`     | Add a reply to a discussion                    |
| PATCH  | `/api/replies/:replyId/upvote`     | Upvote a reply (`{ userId }`)                  |
| PATCH  | `/api/replies/:replyId/accept`     | Mark a reply accepted (`{ userId }`, author-only) |
| PATCH  | `/api/replies/:replyId/approve`    | Admin: approve a reply                         |
| *      | `/api/faq/*`                       | Placeholder — FAQ module                       |
| *      | `/api/admin/*`                     | Placeholder — Admin Dashboard module           |
| *      | `/api/escalations/*`               | Placeholder — Escalation module                |
| *      | `/api/query-resolution/*`          | Placeholder — Query Resolution module          |

## Notes

- There is no Auth module in this build yet. The frontend generates and
  persists a lightweight local user id (`frontend/src/hooks/useCurrentUser.ts`)
  so "who's the discussion author" / "did this user already upvote" /
  "only the author can accept" can be demonstrated. Swap this out for real
  auth when that module exists — the API already expects an `authorId` /
  `userId` on the relevant requests, so the contract won't need to change.
- The detail page has a "View as admin" checkbox as a stand-in for a real
  role check, so the reply-approval control can be exercised without an
  Admin Dashboard yet.
