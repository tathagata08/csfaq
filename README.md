# FAQ Module — Vicharanashala Internship (VINS)

Owner: Vaishnav Gopale
Scope: FAQ page only (categories, search, cards) + stretch features

## What this is

A standalone React component (`faq-page.jsx`) implementing the FAQ page for the
Vicharanashala Internship portal. Built to be dropped into the team's shared
Next.js app once we consolidate, or demoed on its own.

## Features

| Feature | Status |
|---|---|
| Categories (5 drawers, filterable) | ✅ Working |
| Live fuzzy search (typo-tolerant) | ✅ Working |
| FAQ cards with deep-link anchors | ✅ Working |
| Upvote / downvote (toggle-able) | ✅ Working, in-memory only |
| Freshness badges ("updated Nd ago") | ✅ Working (static demo dates) |
| Voice search (mic → search box) | ✅ Working in Chrome-based browsers only |
| Related questions per card | ✅ Working (keyword + category overlap) |
| Trending / most-consulted strip | ✅ Working (sorted by votes) |
| Search-miss logging | ✅ Working, in-memory only |
| Insights panel (unanswered queries) | ✅ Working, in-memory only |
| Zero-result → escalation CTA | ⚠️ UI only — not wired to a real escalation queue |
| Data persistence | ❌ Not done — everything resets on page refresh |

## What's real vs. mocked

**Real and functional right now:**
Search, filtering, voting, voice input, related-question suggestions, and
search-miss tracking all work as actual interactive logic in the browser.

**Mocked / not yet connected:**
- The "Submit to escalation" button updates local UI state only — it does not
  send anything to the team's actual escalation/admin system yet.
- FAQ content is hardcoded in the `FAQS` array in the component, not pulled
  from a database.
- Votes and the search-miss log disappear on refresh (no backend).

## Next steps to make this submission-ready

1. **Move FAQ content into Supabase** (or whatever the team settles on) so
   non-technical teammates can edit questions/answers without touching code.
2. **Persist votes and search-miss logs** to the same backend.
3. **Wire the escalation button** to the team's actual escalation/admin
   dashboard flow (Ask Question → Admin Approval → FAQ pipeline).
4. **Confirm `lucide-react` is a dependency** in the main app before merging
   this component in — it's the only external package this file needs.

## Tech stack

- React (functional component, hooks only — `useState`, `useMemo`, `useEffect`, `useRef`)
- `lucide-react` for icons
- Inline styles (no CSS framework)
- Google Fonts: Source Serif 4, IBM Plex Sans, IBM Plex Mono
- Web Speech API (`SpeechRecognition`) for voice search — browser-native, no library

## How to use

Drop `faq-page.jsx` into the Next.js app (e.g. `app/faq/page.jsx`) and import
it as a page or component. No props required — it's self-contained.

