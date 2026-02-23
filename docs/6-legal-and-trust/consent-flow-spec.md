# Consent Flow Spec

## First Launch (Phase 2 — when voice ships)

### Audio Recording Consent Modal
Triggered on first attempt to start a roleplay session.

**Modal content:**
> "Roomcraft records your voice during roleplay sessions. Your recordings are stored on our servers to help improve the AI coach. You can delete recordings anytime in Settings."
>
> [I Agree] [Not Now]

- "Not Now" prevents roleplay but doesn't block the rest of the app.
- Consent timestamp stored in database.
- Must be explicit YES/NO — not a ToS checkbox.

### Per-Session Indicator
- Persistent recording indicator visible during roleplay (small red dot or "Recording" label).
- No per-session consent prompt (covered by first-launch modal), but indicator is always visible.

## Settings
- Toggle: "Allow voice recording" (on/off).
- Button: "Delete all my recordings."
- Button: "Delete my account and all data."
- Link: "View Privacy Policy."
- Info: "Your recordings are stored on our servers and may be reviewed to improve the AI coach. They are never shared for advertising."

## Terms of Service
- Covers: audio recording, server-side storage, founder access for improvement purposes, third-party AI processing (Hume AI for voice, Anthropic for analysis).
- Linked during onboarding (Google OAuth screen) and in Settings.
