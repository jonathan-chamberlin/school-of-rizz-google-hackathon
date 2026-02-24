## Competition

Gemini Live Agent Challenge — deadline March 16, 2026
Category: Live Agents
Repo: https://github.com/jonathan-chamberlin/school-of-rizz-google-hackathon

## What changed

Forked from social-skills-web-app. Swapped all AI/infra providers for Google stack:
- Claude → Gemini 2.0 Flash / Flash Lite
- Hume AI EVI 3 → Gemini Live API
- Vercel → Cloud Run
- Vercel Postgres → Cloud SQL
- Cloudflare R2 → Cloud Storage

## Next steps

1. Set up Next.js project with Google GenAI SDK (`@google/genai`)
2. Get Gemini Live API voice session working (browser ↔ Gemini bidirectional audio)
3. Single NPC roleplay: user talks, Gemini responds in character
4. Basic scoring: session ends, Gemini evaluates transcript, returns scores
5. Deploy to Cloud Run + Cloud SQL
