This project is School of Rizz, a web application which uses lessons and voice AI agents to help users practice social skills via roleplay.

For openai realtime, refer to this site: https://developers.openai.com/api/docs/guides/realtime/

## 🛠️ Tech Stack

Frontend: Next.js, React, TypeScript, Tailwind CSS |
Backend: Next.js API Routes, Prisma |
Database | Cloud SQL (PostgreSQL) |
Auth | Google OAuth |
AI (reasoning) | gpt-realtime (coaching, NPC behavior) |
Voice AI |  OpenAI Realtime API (real-time bidirectional voice — STT + TTS + reasoning unified) |
Agent Framework | none |
Audio/Video Storage | Cloud Storage |
Hosting | Cloud Run |
Content | MDX files in repo |

## Agent Rules

### Files
- One exported component per file. File name matches component name in kebab-case.
- Co-locate tests: `voice-recorder.test.tsx` next to `voice-recorder.tsx`.
- Never put business logic in components. Extract to hooks or lib/.

### TypeScript
- No `any`. Ever. Use `unknown` + type guards if truly needed.
- Define return types on all functions except simple React components.
- Use `type` for unions/primitives, `interface` for object shapes.

### Components
- All components are functional. No class components.
- Props interface named `{ComponentName}Props`.
- Destructure props in the function signature.
- Default export for page components, named exports for everything else.

### API Routes
- All route handlers go in `app/api/{resource}/route.ts`.
- Always validate input with Zod schemas defined in a `schema.ts` file next to the route.
- Return consistent response shape: `{ data, error, status }`.
- When an API route returns HTML instead of JSON, check the dev server terminal output for the actual error message. Do not guess at fixes from the HTML response.

### Prisma
- Never import PrismaClient directly. Always use the singleton from `lib/db.ts`.
- Migrations get descriptive names: `add-session-feedback-relation`.

### OpenAI Realtime / ADK
- All prompt templates live in `lib/prompts/` as type safe functions with variables passed as arguements. Example: `OpenAiSystemPrompt(name: string): string`
- Never hardcode model names. Use constants from `lib/constants/models.ts`.
- Wrap all AI calls in try/catch with structured error logging.

### Styling
- Tailwind only. No inline styles. No CSS modules.
- Extract repeated class patterns into components, not utility classes.

### General
- No console.log in committed code. Use a logger utility.
- All async functions must handle errors explicitly.
- Comments explain WHY, not WHAT.
- Never ask the user if a file has something in it. Check yourself.

### Testing
- After every change, run `npm run dev` and verify the app compiles without errors.
- Tests must verify behavior a real user would encounter, not internal implementation details.
- Test WHAT a function returns or what the UI displays, not HOW it does it internally.
- If a change touches an API route, test the request/response cycle with realistic inputs.
- If a change touches a component, test that the correct content renders given specific props.

Example:
- Bad: "verify that `formatDuration` is called inside `SessionTimer`" — breaks if you refactor the internals, even if the output is identical.
- Good: "verify that `SessionTimer` displays `05:30` when elapsed time is 330 seconds" — tests real user-facing behavior, survives any internal refactor.

### Database
When creating tables, assume column can be null unless explicitly stated not null. Always assume primary keys are autoincrementing integers.

## Naming Conventions

| Thing                | Convention                    | Example                          |
|----------------------|-------------------------------|----------------------------------|
| Files (components)   | kebab-case.tsx                | voice-recorder.tsx               |
| Files (utils/lib)    | kebab-case.ts                 | oai-client.ts                 |
| React components     | PascalCase                    | VoiceRecorder                    |
| Hooks                | camelCase with `use` prefix   | useVoiceSession                  |
| Types/Interfaces     | PascalCase, no `I` prefix     | ScenarioConfig                   |
| Constants            | UPPER_SNAKE_CASE              | MAX_SESSION_DURATION             |
| API routes           | kebab-case folders            | api/voice-sessions/route.ts      |
| DB tables (Prisma)   | PascalCase singular           | model Session {}                 |
| DB columns (Prisma)  | camelCase                     | createdAt, userId                |
| Env variables        | UPPER_SNAKE_CASE              | OPENAI_API_KEY                   |
| CSS classes          | Tailwind only, no custom classes unless absolutely necessary | — |