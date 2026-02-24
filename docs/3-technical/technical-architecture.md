# Technical Architecture Doc

## Platform
- Web app first (responsive, mobile-friendly), with planned iOS migration later.
- All design decisions should assume eventual mobile migration.
- Built for the Gemini Live Agent Challenge — deployed on Google Cloud, powered by Gemini.

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
- **Cloud SQL (PostgreSQL)** — users, progress, notes, onboarding data, session metadata.

### Content
- **MDX files in repo** — lesson content with React component support. Requires deploy to update lessons.

### Auth
- **Google OAuth** — single sign-on via Google Identity Platform.

### AI
- **Gemini 2.0 Flash** — coaching analysis, NPC roleplay behavior, reflection prompt generation (quality-critical tasks).
- **Gemini 2.0 Flash Lite** — lesson suggestions, affirmation screen copy, simple classification tasks (cost-optimized).
- **Google GenAI SDK** (`@google/genai`) — SDK for all Gemini API calls.

### Voice AI
- **Gemini Live API** — real-time bidirectional voice (STT + TTS) with natural conversation and interruption handling. Voice and reasoning are unified — no separate voice + LLM integration needed.
- Connects via WebSocket from the browser.

### Agent Framework
- **Google Agent Development Kit (ADK)** — orchestrates the dual-agent architecture (Character Agent + Coach Agent). Provides built-in tool use, agent handoff, and conversation management.

### Audio/Video Storage
- **Cloud Storage** — store roleplay recordings. S3-compatible.

### Hosting
- **Cloud Run** — containerized Next.js app, auto-scaling, optimized for Google Cloud deployment.

## System Diagram (Phase 1)

```
User (Browser)
  │
  ├── Next.js Frontend (Cloud Run)
  │     ├── Lesson pages (MDX)
  │     ├── Dashboard
  │     ├── Onboarding flow
  │     └── Roleplay entry UI (placeholder)
  │
  ├── Next.js API Routes (Cloud Run)
  │     ├── Auth (Google OAuth)
  │     ├── User progress CRUD
  │     ├── Notes CRUD
  │     ├── Lesson metadata
  │     └── AI endpoints (Gemini Flash / Flash Lite via GenAI SDK)
  │
  └── Cloud SQL (PostgreSQL)
        ├── Users
        ├── Onboarding responses
        ├── Lesson progress
        ├── Notes
        ├── XP / levels
        └── Streaks
```

## System Diagram (Phase 2 additions)

```
  ├── Gemini Live API (WebSocket)
  │     ├── NPC voice (scenario-aware, real-time conversation)
  │     └── Coach voice (analytical, instructive)
  │
  ├── Google ADK
  │     ├── Character Agent — NPC roleplay persona
  │     └── Coach Agent — analysis, feedback, scoring
  │
  └── Cloud Storage
        └── Audio recordings (roleplay attempts)
```
