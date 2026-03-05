# Tracer Bullet Tests

Derived from tracer_prompt.md. Run in order — each chunk depends on the previous.

Note: API accepts camelCase field names (userId, warmthScore) per CLAUDE.md convention. The tracer_scores page requires `?userId=` query param.

## Chunk 1: Database & API Routes

Prereq: `npm run dev` running, database connected.

### 1.1 POST /api/tracer/user — create user
```
curl -X POST http://localhost:3000/api/tracer/user -H "Content-Type: application/json" -d "{\"name\": \"John\"}"
```
- [x] Returns `{"data": {"id": ..., "name": "John", "createdAt": "...", "warmthScore": null}, "error": null}`
- [x] Response is JSON, not HTML

### 1.2 GET /api/tracer/user/1 — read user name
```
curl http://localhost:3000/api/tracer/user/1
```
- [x] Returns `{"data": {"name": "..."}, "error": null}`
- [x] Only returns `name`, not the full row

### 1.3 POST /api/tracer/transcript — insert transcript turn
```
curl -X POST http://localhost:3000/api/tracer/transcript -H "Content-Type: application/json" -d "{\"userId\": 1, \"role\": \"user\", \"content\": \"What's up. I hope you're doing well. How are you?\"}"
```
- [x] Returns `{"data": {"id": ..., "userId": 1, "createdAt": "...", "role": "user", "content": "What's up. I hope you're doing well. How are you?"}, "error": null}`

### 1.4 PATCH /api/tracer/user/1 — update warmth score
```
curl -X PATCH http://localhost:3000/api/tracer/user/1 -H "Content-Type: application/json" -d "{\"warmthScore\": 56}"
```
- [x] Returns `{"data": {"id": 1, "name": "...", "createdAt": "...", "warmthScore": 56}, "error": null}`

### 1.5 GET /api/tracer/scores/1 — read user for scores page
```
curl http://localhost:3000/api/tracer/scores/1
```
- [x] Returns `{"data": {"id": 1, "name": "...", "createdAt": "...", "warmthScore": 56}, "error": null}`
- [x] Returns the full row (id, name, createdAt, warmthScore) — required a fix to add id and createdAt to select

### 1.6 GET /api/tracer/transcripts/1 — read transcripts for scores page
```
curl http://localhost:3000/api/tracer/transcripts/1
```
- [x] Returns `{"data": [...], "error": null}`
- [x] Returns an array of transcript rows filtered by userId

---

## Chunk 2: Frontend Without Voice

Prereq: Chunk 1 passes.

### 2.1 Onboarding page — submit name
1. Open `http://localhost:3000/tracer_onboarding`
2. Type "Steven" into the text box
3. Click Submit
- [x] User is redirected to `/tracer_voice?userId=...`
- [x] Page has a text input and a submit button

### 2.2 Verify DB insert
```
curl http://localhost:3000/api/tracer/user/<id>
```
- [x] Returns `{"data": {"name": "Steven"}, "error": null}`

### 2.3 Manually set warmth score
```
curl -X PATCH http://localhost:3000/api/tracer/user/1 -H "Content-Type: application/json" -d "{\"warmthScore\": 43}"
```
- [x] Returns updated row with warmthScore: 43

### 2.4 Verify scores API
```
curl http://localhost:3000/api/tracer/scores/1
```
- [x] Returns row with warmthScore: 43

### 2.5 Scores page renders
1. Open `http://localhost:3000/tracer_scores?userId=1`
- [x] Displays name value
- [x] Displays warmth_score: 43
- [x] Displays transcript rows as JSON from tracer_transcript where userId = 1

---

## Chunk 3: Voice Page + Gemini Live API

Prereq: Chunks 1 and 2 pass. GEMINI_API_KEY is set in .env.

### 3.1 Full flow — onboarding to voice
1. Open `http://localhost:3000/tracer_onboarding`
2. Type "Marcus" into the text box
3. Click Submit
- [x] Redirected to `/tracer_voice` (confirmed in 2.1)

### 3.2 Mic permission and connection
- [x] Browser prompts for microphone permission
- [ ] After allowing, Gemini Live API connection is established (no error banner)

### 3.3 Voice conversation — name recall
1. Speak to the agent: "What's my name?"
- [ ] User audibly hears Gemini respond
- [ ] Gemini correctly says "Marcus"

### 3.4 Error handling — connection failure
- [x] If Gemini fails to connect, page displays: "Error establishing connection with Google Gemini Live API. Error Code: 1006" (confirmed when no valid API key)

### 3.5 End Roleplay — warmth score flow
1. Click the "End Roleplay" button
- [ ] Button exists and is labeled "End Roleplay"
- [ ] Gemini is asked to evaluate warmth and output a JSON warmth_score
- [ ] Browser PATCHes /api/tracer/user with the warmthScore
- [ ] User is redirected to `/tracer_scores?userId=...`

### 3.6 Verify warmth score in DB
```
curl http://localhost:3000/api/tracer/scores/<userId>
```
- [ ] warmthScore is populated (integer 1-100)

### 3.7 Transcript persistence
```
curl http://localhost:3000/api/tracer/transcripts/<userId>
```
- [ ] Returns array of transcript rows
- [ ] Each row has role ("user" or "coach") and content (actual words spoken)
- [ ] Content is real speech, not Gemini internal reasoning

### 3.8 Scores page — final render
1. Open `http://localhost:3000/tracer_scores?userId=<id>`
- [ ] name and warmthScore values from tracer_user are displayed
- [ ] All transcript rows from tracer_transcript are displayed as JSON

---

## Code Quality Checks

These are not runtime tests — verify by reading the code.

- [x] All API routes use Zod validation (schema.ts next to each route)
- [x] All routes use Prisma singleton from lib/db.ts (never import PrismaClient directly)
- [x] All routes return `{ data, error }` response shape
- [x] Each API route is a separate file (not one monolithic route)
- [x] Prompt templates live in lib/prompts/ as typed functions
- [x] Ephemeral token endpoint exists (not direct API key in client code)
- [x] No existing pages (home, about, users) were modified
- [x] GEMINI_API_KEY is not committed to client-side code

---

## Issues Found

### Prompt gaps (fix the prompt)
1. **camelCase vs snake_case in API examples** — prompt used snake_case (`user_id`, `warmth_score`) but CLAUDE.md convention is camelCase (`userId`, `warmthScore`). Fixed in prompt.
2. **GET /api/tracer/scores missing fields** — route only returned name and warmthScore, missing id and createdAt. Fixed in code (added to select).

### Project gaps (fix CLAUDE.md)
None found so far.
