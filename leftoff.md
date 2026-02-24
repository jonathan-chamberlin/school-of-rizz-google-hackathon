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

1[done]. Set up Next.js project with Google GenAI SDK (`@google/genai`)
2. Build tracer bullet
1) Read 3-technical\database-schema.md and 2-product-definition\ux-spec.md 2) The watch app mafia video on design\wireframing 3) Then create user flow charts. Like each screen, where the buttons are, and where they go.
3. Single NPC roleplay: user talks, Gemini responds in character
5. Deploy to Cloud Run + Cloud SQL
