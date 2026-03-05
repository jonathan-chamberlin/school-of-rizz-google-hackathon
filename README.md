# 🏫 School of Rizz

🎤 AI rizz coach. Practice talking to people, get scored, get better.

## 🎯 What It Does

Open the app, pick a scenario, and talk your way through it — on camera, with live AI feedback. You get a rizz score at the end. Share it, screenshot it, flex on your friends, or learn from it.

**The core loop:**
1. 🎬 Pick a scenario (realistic or absurd)
2. 🗣️ Talk through it on camera with the AI character
3. 🧠 Get live coaching feedback as you go
4. 📊 After ~3 minutes, get your rizz score + breakdown (warmth, confidence, wit, etc.)
5. 📲 Share the screenshot or video

## 💡 Why It Exists

Most guys know they could be better socially — with girls, with friends, in groups — but there's no way to actually practice. You can watch Hamza videos all day, but when the moment comes, you freeze. Information doesn't change behavior. Reps do.

Every other option gives information. School of Rizz gives reps. It's a personal rizz coach that actually listens to you talk, watches your face, and tells you what's working and what's not — in real time.

## ⚙️ How It Works

### 🎭 Scenarios
Realistic scenarios guys actually face (approaching at a party, first dates, networking events) plus absurd viral scenarios designed to be shared ("You ran over someone's grandma" 👵💀, "Your discord kitten got a bad test grade" 😿📉).

### 🤖 Two AI Agents
- **🎭 Character** — plays the person in the scenario. Behavior scales by difficulty: friendly → distracted → rude/dismissive.
- **🏋️ Coach** — gives live feedback during the session. One prioritized change at a time. Two modes: Soft Coach or No-BS Coach.

### 📈 Scoring (per attempt)
Warmth, Confidence, Clarity, Humor, Listening, and Application of Principle — each rated 1-10. Combined into an overall rizz score.

### 🔗 Shareable Output
- **📸 Screenshot** — Umax-style results screen with your face, rizz score, category breakdown, and a highlight descriptor. One-tap share to TikTok, IG Reels, IG Stories, Snapchat, iMessage.
- **🎥 Video** — full recording with your face, both AI voices, live feedback overlay, and rizz meter. One-tap share to all platforms.

## 💰 Monetization

🆓 **Free:** One roleplay with live coaching (~3 min) → rizz score + shareable screenshot.

🔒 **Paywall:** Detailed feedback breakdown, unlimited sessions, all scenarios, all session lengths (3/5/8/15 min), progress tracking.

## 📚 Content Method

Lessons are drawn from books and content on social dynamics, communication, and psychology:
- 📖 How to Win Friends & Influence People
- 🤝 Never Split the Difference
- 👑 48 Laws of Power
- 🧬 The Laws of Human Nature
- ♂️ Rational Male
- 💬 Super Communicators
- 🎙️ Content from creators like Hamza, Michael Sartain, Owen Cook, Playing with Fire
- ➕ And more

Each lesson follows the Book Absorption Method (BAM): read a principle → reflect on past situations where it applies → practice it in a roleplay. The app also supports a Social Achievement Method (SAM): visualize social situations → mentally rehearse → practice with the AI.

## 🗺️ Phasing

### 🔫 Phase 0 — Tracer Bullet
Prove the full path works end-to-end with the simplest possible version:
- 👋 Onboarding: single question ("What's your name?"), saved to database
- 🤖 Reasoning agent reads database and sends prompt to the Gemini Live API voice agent ("the user's name is {name}"). Launches voice mode.
- 🎭 Ask the voice agent "What's my name?". Verifying Gemini Live API → Browser audio connection. Voice agent should answer correctly.
- 📝 Session ends, voice agent generates a warmth score, sends it and the transcript to the database.
- 📊 Reasoning agent reads the database row of the transcript, generates a "warmth" score, which is sent to the database
- 💖 Then both the warmth score and humor score are displayed on the frontend.

### 📝 Phase 1 — Lessons & Onboarding
- 👋 Full onboarding flow (name, age, goals, identity tier, environment)
- 📚 Lesson pages: text + reflection prompt + AI-generated suggestions + "Practice Now" CTA
- 🏠 Dashboard with lesson feed
- 🗒️ Notes feature (log real-world situations)

### 🎤 Phase 2 — Voice Roleplay
- 🎭 Voice roleplay with character agent (scenario templates, difficulty tiers)
- 🏋️ Live coach agent feedback during sessions (Soft Coach / No-BS Coach)
- 🔁 Repeat-and-rephrase loop (coach pauses, user repeats improved line 2-3x)
- ⏱️ Session lengths: 3 min, 5 min, 8 min, 15 min

### 📹 Phase 3 — Video & Scoring
- 📹 On-camera recording (front camera) with live feedback overlay and rizz meter
- 📊 Real scoring engine: warmth, confidence, clarity, humor, listening, application of principle (1-10 each)
- Scores appear on screen live.
- 🏆 Rizz score calculation from category scores
- 🗃️ Recording & transcript library with playback

### 📲 Phase 4 — Shareability
- 📸 Umax-style shareable screenshot with rizz score, category breakdown, highlight descriptor
- 🎥 Downloadable video with face + AI audio + live feedback overlay + rizz meter
- 🔗 One-tap share to TikTok, IG Reels, IG Stories, Snapchat, Snapchat Story, iMessage
- 🏷️ School of Rizz branding/watermark on all shared content

### 💰 Phase 5 — Monetization
- 💳 Freemium gating and subscription billing
- 🆓 Free hook: one roleplay → rizz score + screenshot, detailed feedback behind paywall
- 🔔 Push notifications (Duolingo-style)

### Phase 6 - Impromtu Roleplays
- 🎲 Impromptu roleplays generated from Notes
- At end of lesson, there is a reflection section which informs what scenario the lesson will be roleplayed in. Add AI scenario suggestions based off reading the notes.

### 🏆 Phase 7 — XP & Analytics
- ⭐ XP and leveling system
- 📈 Analytics dashboard (progress over time)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| 🖥️ Frontend | Next.js, React, TypeScript, Tailwind CSS |
| ⚡ Backend | Next.js API Routes, Prisma |
| 🗄️ Database | Cloud SQL (PostgreSQL) |
| 🔐 Auth | Google OAuth |
| 🧠 AI (reasoning) | Gemini 2.0 Flash (coaching, NPC behavior), Gemini 2.0 Flash Lite (suggestions, simple tasks) |
| 🗣️ Voice AI | Gemini Live API (real-time bidirectional voice — STT + TTS + reasoning unified) |
| 🤖 Agent Framework | Google Agent Development Kit (ADK) |
| 📦 Audio/Video Storage | Cloud Storage |
| ☁️ Hosting | Cloud Run |
| 📄 Content | MDX files in repo |

## 📂 Docs

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
