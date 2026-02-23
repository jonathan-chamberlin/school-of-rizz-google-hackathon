# Voice Roleplay System Spec

## Scenarios

### Casual / Low Stakes
- Coffee shop small talk
- Grocery store cashier
- Waiting in line at a bar or club
- Calling up a friend you haven't talked to in a while

### Social / Medium Stakes
- House party
- Classroom — meet a cool confident guy, get his contact, suggest hitting the gym sometime
- Classroom — meet a girl, invite her to study later
- Walking by a girl in a club with a country band playing, want to say hi
- Networking event
- While talking to someone you just met, you find out they work at a company you're interested in — get their contact and ask for a referral

### Emotionally Complex / High Stakes
- First date — ask questions without being analytical, use "0 IQ" style: point out stuff you see, tell absurd stories/implications (e.g., "you ever think dogs are going to take over the world?"), keep it light and fun
- Talking to your parents
- Having a difficult conversation with a male friend who just broke up with his girlfriend
- A high ego guy tries making fun of you at a house party
- A highly emotional and irrational person gets mad at you for making an offensive joke (scenario starts assuming the user already made the joke)

### Impromptu Roleplays (Phase 2)
- Generated from user's Notes — real situations they logged that become practice scenarios independent from lessons.

## Scenario Design Principles
- Templates only (no freeform generation for now).
- This app isn't woke — communication as a man with women is different from communication with men. Scenarios reflect that reality.
- At harder levels, sometimes the best answer is to walk away and end the interaction (especially when someone is rude when you first meet them).

## Difficulty Tiers

### Easy
- NPC is friendly, cooperative, responsive.
- Designed to build confidence and make the user feel like they can do this.

### Medium
- NPC is distracted, somewhat challenging, not fully engaged.
- Requires more effort to hold attention and steer the conversation.

### Hard
- NPC is rude, dismissive, skeptical, or high-status.
- Realistic friction. Sometimes the correct move is to disengage.

## Voices

### NPC (Social Character)
- Realistic persona matching the scenario.
- Behavior changes by difficulty level.
- Uses social dynamics principles to model realistic outcomes.

### Coach
- Analytical, specific, instructive.
- Gives one prioritized change per iteration.
- Enforces repetition: pauses simulation, instructs user to rephrase, requires 2-3 repeats.
- Two modes configurable in Settings:
  - **Soft Coach**: Praise heavy, language softened, but precise instruction remains.
  - **No-BS Coach**: Direct, analytical, still constructive.
- Default picked based on onboarding personality question.

## Scoring Categories (per attempt)
1. Application of Principle (primary — listed first)
2. Warmth
3. Clarity
4. Confidence
5. Humor
6. Listening

## Session Lengths
- Premium: 3 min, 5 min, 8 min, 15 min (user selects before starting).
- Free tier: limited session length.

## Session Flow
1. Pre-session: objective shown (e.g., "Apply mirroring once during a checkout conversation").
2. User chooses scenario, difficulty, and session length.
3. Simulation round 1: user speaks (audio recorded). NPC responds naturally.
4. Coach analyzes — gives concise analysis (what worked, one prioritized change, and why).
5. Coach pauses simulation and instructs user to rephrase. User repeats improved line 2-3 times.
6. Simulation round 2: re-recorded, coach compares attempts, highlights improvements, updates scores.
7. End session: save audio + transcript to library.

## Recording & Playback
- Save full audio of each attempt and full transcript.
- Users can replay audio of their roleplay attempts before starting another attempt, and after the roleplay is over.
- No side-by-side comparison — just list out the improvements between attempts.
- Filter by tag, lesson, scenario, date.

## Free vs Premium Behavior

### Free Trial (7 days)
- 5-minute roleplays with coach agent giving live feedback.

### Free Tier (after trial)
- Roleplay with person agent only (no live coach).
- Feedback only at end of attempt; must complete another full attempt for more feedback.
- Some feedback blurred out (Grammarly-style: identifies improvements but requires upgrade to see full details).

### Premium
- Live coach feedback during roleplays.
- All session lengths available.
- Full feedback visibility.
