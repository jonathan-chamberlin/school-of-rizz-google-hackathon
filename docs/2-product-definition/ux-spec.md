# UX Specification

## Dashboard (Home Screen)
- Feed of next lessons (primary content).
- Streak bar at the top.
- XP level indicator.
- Plus button in bottom right corner — opens a panel with a text box to log a real-world situation (a "Note"). Notes are saved to database.

## Notes Feature
- Plus button (bottom right of home screen) → panel slides up → text box to describe a situation.
- Notes are used to:
  1. Generate impromptu roleplays independent from lessons (Phase 2).
  2. Inform the "Suggestions" section on lesson reflection prompts — suggests contexts where the lesson's principle could be applied based on situations the user has actually experienced.

## Lesson Page (BAM)
- Scrollable card with lesson text.
- Structure: Title → Principle → Explanation → Examples → Reflection Prompt → Practice Now CTA.
- Persistent "Practice Now" floating button visible regardless of scroll position.
- **Reflection prompt**: a text box where the user types in a situation they've been in where they could apply the principle. An AI uses this input to create prompts for the voice agent about how to behave, so the user can practice acting differently in that situation.
- **Suggestions section** (below reflection): options for what situations could be practiced. Informed by user's Notes — real situations they've logged.
- Lesson metadata: source, category, estimated time.

## Onboarding

### Data Collected
- Name, age, city
- Student or professional
- Current social circle size, satisfaction rating
- How many close friends, how many acquaintances
- Relationships with current friends
- Goal selection: friends, dating, networking, presence, general charisma
- Identity selection: Beginner / Conversationalist / Connector / Room Leader (defaults training path; user can change later)
- Environment: Dense city, suburban + school, college, rural / small town

### Affirmation Screens
After each answer, show a screen with a message communicating that Roomcraft helps with exactly that. Example: if the user selects "rural / small town," show a message like "Roomcraft helps people in small towns build real connections." These screens reinforce that the app understands the user's specific situation.

## Roleplay Entry UI (Phase 1 — UI only, no voice agent yet)
- Screen to select scenario, difficulty, and session length.
- Shows "Coming Soon" or similar for the actual roleplay experience.
- Entry points: from lesson "Practice Now" button, from Dashboard.

## Design Tone
Disciplined, performance-oriented, analytical, slightly premium — not gamey, not therapeutic, not dating-app.
