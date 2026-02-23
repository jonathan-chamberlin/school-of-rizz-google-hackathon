# School of Rizz

AI rizz coach. Practice talking to people, get scored, get better.

## What It Does

Open the app, pick a scenario, and talk your way through it — on camera, with live AI feedback. You get a rizz score at the end. Share it, screenshot it, flex on your friends, or learn from it.

**The core loop:**
1. Pick a scenario (realistic or absurd)
2. Talk through it on camera with the AI character
3. Get live coaching feedback as you go
4. After ~3 minutes, get your rizz score + breakdown (warmth, confidence, wit, etc.)
5. Share the screenshot or video

## Why It Exists

Most guys know they could be better socially — with girls, with friends, in groups — but there's no way to actually practice. You can watch Hamza videos all day, but when the moment comes, you freeze. Information doesn't change behavior. Reps do.

Every other option gives information. School of Rizz gives reps. It's a personal rizz coach that actually listens to you talk, watches your face, and tells you what's working and what's not — in real time.

## How It Works

### Scenarios
Realistic scenarios guys actually face (approaching at a party, first dates, networking events) plus absurd viral scenarios designed to be shared ("You ran over someone's grandma", "Your discord kitten got a bad test grade").

### Two AI Agents
- **Character** — plays the person in the scenario. Behavior scales by difficulty: friendly → distracted → rude/dismissive.
- **Coach** — gives live feedback during the session. One prioritized change at a time. Two modes: Soft Coach or No-BS Coach.

### Scoring (per attempt)
Warmth, Confidence, Clarity, Humor, Listening, and Application of Principle — each rated 1-10. Combined into an overall rizz score.

### Shareable Output
- **Screenshot** — Umax-style results screen with your face, rizz score, category breakdown, and a highlight descriptor. One-tap share to TikTok, IG Reels, IG Stories, Snapchat, iMessage.
- **Video** — full recording with your face, both AI voices, live feedback overlay, and rizz meter. One-tap share to all platforms.

## Monetization

**Free:** One roleplay with live coaching (~3 min) → rizz score + shareable screenshot.

**Paywall:** Detailed feedback breakdown, unlimited sessions, all scenarios, all session lengths (3/5/8/15 min), progress tracking.

## Content Method

Lessons are drawn from books and content on social dynamics, communication, and psychology:
- How to Win Friends & Influence People
- Never Split the Difference
- 48 Laws of Power
- The Laws of Human Nature
- Rational Male
- Super Communicators
- Content from creators like Hamza, Michael Sartain, Owen Cook, Playing with Fire
- And more

Each lesson follows the Book Absorption Method (BAM): read a principle → reflect on past situations where it applies → practice it in a roleplay. The app also supports a Social Achievement Method (SAM): visualize social situations → mentally rehearse → practice with the AI.

## Phasing

### Phase 1 (MVP)
- Lessons: text + reflection prompt + AI-generated suggestions + "Practice Now" CTA
- Roleplay entry UI (scenario/difficulty/length selection — voice not yet built)
- Onboarding flow
- Dashboard with lesson feed
- Notes feature (log real-world situations)
- XP and leveling system

### Phase 2
- Voice + video roleplay with two agents (character + coach)
- On-camera recording with live feedback overlay and rizz meter
- Rizz score + shareable screenshot generation
- One-tap sharing to TikTok, IG Reels, IG Stories, Snapchat, iMessage
- Scoring & analytics (6 categories per attempt)
- Recording & transcript library with playback
- Freemium gating and subscription billing
- Impromptu roleplays generated from Notes
- Push notifications

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, Prisma |
| Database | PostgreSQL (Vercel Postgres / Neon) |
| Auth | Google OAuth |
| AI (reasoning) | Claude Sonnet 4.5 (coaching, NPC behavior), Claude Haiku 4.5 (suggestions, simple tasks) |
| Voice AI (Phase 2) | Hume AI EVI 3 (STT + TTS with emotional expressiveness) |
| Audio/Video Storage (Phase 2) | Cloudflare R2 |
| Hosting | Vercel |
| Content | MDX files in repo |

## Docs

```
docs/
├── 1-vision-and-strategy/
│   ├── product-vision.md
│   ├── persona.md
│   ├── positioning-and-messaging.md
│   └── viral-content-playbook.md
├── 2-product-definition/
│   ├── product_requirements_doc.md
│   ├── ux-spec.md
│   ├── roleplay-feature-spec.md
│   └── user-flow-diagrams.md
├── 3-technical/
│   ├── technical-architecture.md
│   ├── ai-behavior-spec.md
│   ├── api-contract.md
│   └── database-schema.md
├── 4-design-system/
├── 5-growth-and-analytics/
└── 6-legal-and-trust/
```
