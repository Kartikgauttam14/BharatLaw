# BharatLaw AI

A mobile app for Indian legal research — search Supreme Court & High Court judgments, browse Bare Acts, get AI-powered summaries, and bookmark cases.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo (React Native) + Expo Router
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mobile/` — Expo mobile app
- `artifacts/mobile/app/(tabs)/` — Tab screens (Home, Browse, Bookmarks, Settings)
- `artifacts/mobile/app/case/[id].tsx` — Judgment detail screen
- `artifacts/mobile/app/act/[id].tsx` — Bare Act detail screen
- `artifacts/mobile/app/search.tsx` — Full-text search screen
- `artifacts/mobile/constants/mockData.ts` — Mock judgments and bare acts
- `artifacts/mobile/constants/colors.ts` — Brand color tokens (navy + saffron)
- `artifacts/mobile/context/BookmarksContext.tsx` — Bookmarks & reading list (AsyncStorage)
- `artifacts/api-server/` — Express API server
- `lib/api-spec/openapi.yaml` — API contract source of truth

## Architecture decisions

- Frontend-only first build: all persistence via AsyncStorage (no backend DB needed for MVP)
- Brand palette: Deep Navy (#1A3A6B) + Saffron Gold (#C8810A) — Indian legal heritage colors
- Dark mode supported via colors.ts dual light/dark tokens + useColors() hook
- Mock data with 8 landmark Supreme Court judgments and 12 Bare Acts for the initial build
- Bookmarks and reading list are persisted independently via AsyncStorage keys

## Product

- Home: search bar + quick filters + stats + landmark cases feed
- Browse: Bare Acts by category, courts by state, topics grid
- Search: full-text search across judgments and acts with filter tabs
- Case Detail: citation, bench, AI summary, headnote, tags, full text excerpt, PDF download
- Act Detail: colored header card, key sections expandable accordion
- Saved: bookmarks + reading list tabs with AsyncStorage persistence
- Settings: profile, preferences, account sections

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Expo workflow name is `artifacts/mobile: expo`
- Do NOT run `npx expo start` directly — use `restart_workflow`
- Do NOT create app.config.ts — must use static app.json

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- SRS documents are in `attached_assets/srs_files/` (26 files covering full product spec)
