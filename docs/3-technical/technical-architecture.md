# Technical Architecture Doc

## Platform
- Web app first (responsive, mobile-friendly), with planned iOS migration later.
- All design decisions should assume eventual mobile migration.

## Tech Stack

### Frontend
- **Next.js** — full-stack React framework (routing, SSR, API routes).
- **React** — component-based UI.
- **TypeScript** — type safety across frontend and backend.
- **Tailwind CSS** — utility-first styling.

### Backend
- **Next.js API Routes** — server-side logic.
- **Prisma** — type-safe ORM for PostgreSQL.

### Database
- **PostgreSQL (Vercel Postgres / Neon)** — users, progress, notes, onboarding data, session metadata.

### Content
- **MDX files in repo** — lesson content with React component support. Requires deploy to update lessons.

### Auth
- **Google OAuth** — single sign-on.

### AI
- **Claude Sonnet 4.5** — coaching analysis, NPC roleplay behavior, reflection prompt generation (quality-critical tasks).
- **Claude Haiku 4.5** — lesson suggestions, affirmation screen copy, simple classification tasks (cost-optimized).

### Voice AI (Phase 2)
- **Hume AI EVI 3** — voice roleplay (STT + TTS with emotional expressiveness). Needs separate LLM integration (Claude) for reasoning.

### Audio Storage (Phase 2)
- **Cloudflare R2** — zero egress fees, S3-compatible. Store roleplay recordings.

### Hosting
- **Vercel** — optimized for Next.js, CI/CD from GitHub, free hobby tier to start.

## System Diagram (Phase 1)

```
User (Browser)
  │
  ├── Next.js Frontend (Vercel)
  │     ├── Lesson pages (MDX)
  │     ├── Dashboard
  │     ├── Onboarding flow
  │     └── Roleplay entry UI (placeholder)
  │
  ├── Next.js API Routes (Vercel)
  │     ├── Auth (Google OAuth)
  │     ├── User progress CRUD
  │     ├── Notes CRUD
  │     ├── Lesson metadata
  │     └── AI endpoints (Claude Haiku/Sonnet)
  │
  └── PostgreSQL (Vercel Postgres / Neon)
        ├── Users
        ├── Onboarding responses
        ├── Lesson progress
        ├── Notes
        ├── XP / levels
        └── Streaks
```

## System Diagram (Phase 2 additions)

```
  ├── Hume AI EVI 3 (WebSocket)
  │     ├── NPC voice (emotional, scenario-aware)
  │     └── Coach voice (analytical, instructive)
  │
  ├── Claude Sonnet API
  │     ├── NPC reasoning / persona
  │     └── Coach analysis / feedback
  │
  └── Cloudflare R2
        └── Audio recordings (roleplay attempts)
```
