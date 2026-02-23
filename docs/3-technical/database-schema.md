# Database Schema Doc

## Core Tables

### users
- id (UUID, PK)
- email (unique)
- name
- google_id (unique)
- avatar_url
- created_at
- updated_at

### onboarding_responses
- id (UUID, PK)
- user_id (FK → users)
- age
- city
- environment (dense_city | suburban_school | college | rural_small_town)
- occupation (student | professional)
- close_friends_count
- acquaintances_count
- social_satisfaction (1-10)
- goals (JSON array: friends, dating, networking, presence, charisma)
- identity_tier (beginner | conversationalist | connector | room_leader)
- created_at

### lessons (metadata — content lives in MDX files)
- id (UUID, PK)
- slug (unique, maps to MDX filename)
- title
- source (book/content origin)
- category
- estimated_minutes
- order_index
- created_at

### lesson_progress
- id (UUID, PK)
- user_id (FK → users)
- lesson_id (FK → lessons)
- status (not_started | in_progress | completed)
- reflection_text
- completed_at
- created_at

### notes
- id (UUID, PK)
- user_id (FK → users)
- content (text — the situation description)
- created_at

### xp_events
- id (UUID, PK)
- user_id (FK → users)
- source (lesson_completed | reflection_submitted | note_logged | roleplay_completed | streak_bonus)
- xp_amount
- created_at

### streaks
- id (UUID, PK)
- user_id (FK → users, unique)
- current_streak
- longest_streak
- last_activity_date

## Phase 2 Tables

### roleplay_sessions
- id (UUID, PK)
- user_id (FK → users)
- lesson_id (FK → lessons, nullable — null for impromptu roleplays)
- scenario_template
- difficulty (easy | medium | hard)
- session_length_minutes
- coach_mode (soft | no_bs)
- created_at

### roleplay_attempts
- id (UUID, PK)
- session_id (FK → roleplay_sessions)
- attempt_number
- audio_url (Cloudflare R2 path)
- transcript (text)
- score_application (1-10)
- score_warmth (1-10)
- score_clarity (1-10)
- score_confidence (1-10)
- score_humor (1-10)
- score_listening (1-10)
- coach_feedback (text)
- improvements (text — compared to previous attempt)
- created_at

## Indexes
- users.email (unique)
- users.google_id (unique)
- lesson_progress (user_id, lesson_id) unique composite
- notes.user_id
- xp_events.user_id
- streaks.user_id (unique)
- roleplay_sessions.user_id
- roleplay_attempts.session_id
