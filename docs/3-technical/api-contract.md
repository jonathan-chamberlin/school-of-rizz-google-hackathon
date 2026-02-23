# API Contract Doc

All endpoints require Google OAuth authentication unless noted.

## Auth
- `POST /api/auth/google` — Google OAuth callback. Creates or retrieves user. Returns session token.
- `GET /api/auth/me` — Returns current authenticated user.

## Users
- `GET /api/users/me` — Read current user profile (name, email, avatar, xp, level, streak).

## Onboarding
- `GET /api/onboarding` — Read current user's onboarding responses.
- `POST /api/onboarding` — Create onboarding responses (first time).
- `PUT /api/onboarding` — Update onboarding responses (user changes settings later).

## Lessons
- `GET /api/lessons` — List all lessons with metadata (title, source, category, estimated_minutes, order_index). Used by dashboard feed.
- `GET /api/lessons/[slug]` — Read single lesson metadata. Frontend loads MDX content from file.

## Lesson Progress
- `GET /api/lessons/[slug]/progress` — Read current user's progress for a lesson (status, reflection_text).
- `POST /api/lessons/[slug]/progress` — Create progress record (marks lesson as in_progress).
- `PUT /api/lessons/[slug]/progress` — Update progress (submit reflection, mark completed).

## Lesson Suggestions (AI-powered)
- `GET /api/lessons/[slug]/suggestions` — Sends the lesson's principle + user's Notes to Claude Haiku. Returns 3-5 suggested practice scenarios based on the user's real-world situations. Reads from `notes` and `lessons` tables.

## Notes
- `GET /api/notes` — List all notes for current user (sorted by created_at desc).
- `POST /api/notes` — Create a note (text content).

## XP & Streaks
- `GET /api/xp` — Read current user's total XP, current level, and XP to next level.
- `GET /api/xp/events` — List XP events for current user (for history/breakdown).
- `POST /api/xp/events` — Award XP (called internally by other endpoints on lesson completion, reflection submission, etc.).
- `GET /api/streaks` — Read current user's streak (current, longest, last_activity_date).
- `POST /api/streaks/checkin` — Update streak (called on any qualifying daily activity).

## Roleplay Templates (Phase 2)
- `GET /api/roleplay/templates` — List all roleplay templates (name, category, available levels).
- `GET /api/roleplay/templates/[id]` — Read single template with full details (personality, mood levels, objective).

## Roleplay Sessions (Phase 2)
- `POST /api/roleplay/sessions` — Create a new roleplay session. Requires: template_id, level, session_length_minutes, coach_mode. Backend validates that the selected level exists on the template (level_X_mood is not null).
- `GET /api/roleplay/sessions` — List user's past roleplay sessions.
- `GET /api/roleplay/sessions/[id]` — Read single session with all attempts.

## Roleplay Attempts (Phase 2)
- `POST /api/roleplay/sessions/[id]/attempts` — Create a new attempt (stores audio_url, transcript, scores, coach_feedback, improvements).
- `GET /api/roleplay/sessions/[id]/attempts` — List all attempts for a session.
- `GET /api/roleplay/sessions/[id]/attempts/[attemptId]` — Read single attempt with audio URL and transcript.

## Affirmation Screens
- No dedicated endpoint. Affirmation copy is hardcoded per onboarding answer option in the frontend. Reads from `onboarding_responses` already fetched during the onboarding flow.
