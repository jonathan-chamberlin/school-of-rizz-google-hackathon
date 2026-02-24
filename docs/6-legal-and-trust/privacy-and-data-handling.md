# Privacy & Data Handling Doc

## Data Collected

### Phase 1
- Google account info (name, email, avatar).
- Onboarding responses (age, city, social snapshot, goals).
- Lesson progress and reflection text.
- Notes (free-text situation descriptions).
- XP and streak data.

### Phase 2
- Voice recordings (roleplay audio).
- Transcripts of roleplay sessions.
- Scoring data per attempt.

## Storage
- User data and metadata: Cloud SQL (PostgreSQL).
- Audio recordings (Phase 2): Cloud Storage, encrypted at rest.

## Data Retention
- User data retained while account is active.
- Audio recordings: retained until user deletes, or auto-delete after configurable period (user sets in settings).
- Deleted account: all data purged within 30 days.

## Server-Side Audio Access
- Founder retains access to anonymized audio recordings to review and improve the voice agent.
- This is disclosed in the consent flow and terms of service.
- Audio is never shared with third parties for advertising or identification.

## User Rights
- View all stored data.
- Delete individual recordings or notes.
- Delete entire account and all associated data.
- Export data (transcripts, progress) on request.

## iOS App Store Compliance (Apple Guideline 5.1.2(i))
- Must declare "Audio Data" in App Store privacy details.
- Must disclose that voice data is sent to server and to third-party AI services (Google Gemini).
- Must obtain explicit permission before any data transmission.
- Must provide granular user control (opt-in/out).

## GDPR / CCPA Considerations
- Deletion request flow required.
- Data portability (export) required.
- Clear privacy policy linked in app and App Store listing.
