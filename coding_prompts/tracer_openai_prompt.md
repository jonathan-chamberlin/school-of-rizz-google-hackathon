# CONTEXT

Build a tracer bullet, the thinnest slice of this project. The goal is to make it so a human can have a voice conversation with the agent and get a warmth score at the end. Prioritize code simplicity.

Tracer has no authentication. No auth middleware, no session cookies, no login. Acceptable for tracer.

# SPEC

DATABASE_URL is in .env

## Create these tables
tracer_user
    - id (PK, auto increment, int, not null)
    - name (varchar(100), not null)
    - created_at (timestamp([3]))
    - warmth_score (int with range 1-100). 

tracer_transcript
    - id (PK, auto increment, int, not null)
    - user_id (int, FK to tracer_user.id)
    - created_at (timestamp[(3)])
    - role (varchar(100))
    - content (TEXT).

## Folder for System Prompts
- All AI hardcoded AI prompts are to live hardcoded in the client side code in lib/prompts/ as .ts files.  
    Files and their contents:
        - openai-system-prompt.ts
            - openai_system_prompt(user_name: string): string
                - "You are a social skills coach. The user's name is {user_name}. Have a brief conversation with them."
        - report-warmth-score.ts
            - report_warmth_score(): string
                - "Based on the conversation so far, silently return a warmth score of the user. The warmer their tone, the higher the value. The meaner and ruder and more closed off their tone, the lower. Requirement: output ONLY an integer between 1 and 100 inclusive."
        -build-prompt_tool_config.ts
            - build_prompt_tools_config(system_prompt: string, coach_agent_voice, tools: list):
                - Pure function, returns the correct shape for this. 

## Constants
- Lives in lib/constants/models.ts
    - COACH_AGENT_VOICE = "ash"
    - OPENAI_MODEL = "gpt-4o-realtime-preview-2024-12-17"

## API routes
With examples.

- POST /api/tracer/session
    - Body: { userId: 1 }
    - Response: { date: { clientSecret: "ek_...", expiresAt: 1767225600 }, error: null}
    - Error Handling. 
        - If openai returns a rate limit, session route should return an error in the response.
        - If openai returns that your api key is invalid, session route should return an error in the response.
        - If openai returns that your api key fails to connect for a different reason, session route should return an error in the response.
        - any other potential errors, do research so if one happens, the error message is included in the session route's response
        - When the browser gets those errors back, they should display a notification on the browser for the user to see. 

- POST /api/tracer/user — create a new row in tracer_user
    - Body: {"name": "John"}
    - Response: {"data": {"id": 1, "name": "John", "createdAt": "2026-03-02T12:27:45.123Z", "warmthScore": null}, "error": null}

- GET /api/tracer/user/1 — fetch the whole user row
    - Body: (none)
    - Response: {"data": {"name": "John"}, "error": null}

POST https://api.openai.com/v1/realtime/sessions - start openai realtime session for calls
    - Body: {{
  "model": OPENAI_MODEL,
  "modalities": ["text", "audio"],
  "instructions": openAiSystemPrompt(),
  "voice": COACH_AGENT_VOICE,
  "tools": [
    {
      "type": "function",
      "name": "reportWarmthScore",
      "description": "Based on the conversation so far, silently return a warmth score of the user. The warmer their tone, the higher the value. The meaner and ruder and more closed off their tone, the lower.",
      "parameters": {
        "type": "object",
        "properties": {},
        "required": []
      }
    }
  ],
  "tool_choice": "auto"
}
}
    - Response: {
  "id": "sess_abc123",
  "object": "realtime.session",
  "model": "gpt-4o-realtime-preview-2024-12-17",
  "modalities": ["text", "audio"],
  "instructions": "You are a helpful assistant...",
  "voice": "ash",
  "tools": [ /* your tools echoed back */ ],
  "client_secret": {
    "value": "ek_def456",
    "expires_at": 1767225600
  }
}


- POST /api/tracer/transcript — insert a transcript turn
    - Body: {"userId": 2, "role": "user", "content": "What's up. I hope you're doing well. How are you?"}
    - Response: {"data": {"id": 1, "userId": 2, "createdAt": "2026-03-02T12:27:45.123Z", "role": "user", "content": "What's up. I hope you're doing well. How are you?"}, "error": null}
    Error handling:
        - If a transcript POST fails, log the error to console and continue. Do not retry. Acceptable data loss for tracer

- PATCH /api/tracer/user/1 — update warmthScore
    - Body: {"warmthScore": 56}
    - Response: {"data": {"id": 1, "name": "John", "createdAt": "2026-03-02T12:27:45.123Z", "warmthScore": 56}, "error": null}

- GET /api/tracer/scores/1 — read user for the scores page
    - Body: (none)
    - Response: {"data": {"id": 1, "name": "John", "createdAt": "2026-03-02T12:27:45.123Z", "warmthScore": 56}, "error": null}

- GET /api/tracer/transcripts/1 — read transcript for the scores page
    - Body: (none)
    - Response: {"data": [
  {"id": 1, "userId": 1, "createdAt": "...", "role": "user", "content": "Hello, how are you?"},
  {"id": 2, "userId": 1, "createdAt": "...", "role": "coach", "content": "I'm fine, thank you."}
], "error": null}

## Voice pipeline
- WebRTC connection via RTCPeerConnection
- Audio: browser handles via <audio> element with srcObject = e.streams[0]. No manual AudioContext, no PCM conversion.
- Data channel (pc.createDataChannel("oai-events")) handles all events
- Transcription: built in events, no self reporting prompt
    - conversation.item.input_audio_transcription.completed -> POST as role "user"
    - response.audio_transcript.done -> POST as role "coach"
    - Save everything, including empty transcripts

- Connection lifecycle: wait for BOTH data channel open AND audio track before considering connection established
- End Roleplay flow: response.cancel -> text message (conversation.item.create event) asking for evaluation -> response.create -> listen for function call -> 5s timeout -> retry once -> default to 50 -> PATCH -> redirect.
    - Track the end-roleplay flow as a sequence of states: cancelling → evaluating → scoring → redirecting. Log transitions. If any step hangs past its timeout, fall through to the next step with defaults.
    - Error 
Error handling:
    - connection failure shows error banner, SDP failure shows error, mid-conversation drop,' -> show banner with desciprtive error message from response of session route.
    - data channel closed when user clicks 'end roleplay' -> in that case, grey out the 'end roleplay' button so the user can't click it and display an erro banner
- Function calling: report_warmth_score tool with { warmthScore: integer, 1-100}.
- report_warmth_score should only be fired when the button to 'End Roleplay' is clicked. 

## Create 3 pages inside the app folder: tracer_onboarding, tracer_voice, and tracer_scores. Here is the flow:

### tracer_onboarding
-  A page at app > tracer_onboarding is where the text box lives and it has a hook (or something like that) which sends the name to the database. Once the 'submit' button is clicked:
- POST create teh user, get back the ID, and then redirect to /tracer_voice

### tracer_voice
- This page recieves the user ID from tracer_onboarding. It's url should be in the format of /tracer_voice?userId=2
- The tracer_voice page tells the browser to request mic permission from the user, then it uses a webrtc to connect the user's browser (and therefore audio) to establish connection with the OpenAI Realtime API. Here are the exact steps:
    - Browser-side WebRTC setup (after getting clientSecret from POST /api/tracer/session):
    1. Create RTCPeerConnection
    2. Create data channel: pc.createDataChannel("oai-events")
    3. Add mic audio track
    4. pc.createOffer() -> pc.setLocalDescription(offer)
    5. POST https://api.openai.com/v1/realtime?model=OPENAI_MODEL with Authorization: Bearer <clientSecret>, body = offer.sdp
    6. Set answer: pc.setRemoteDescription({ type: "answer", sdp: response })

- This page needs a onclose for if the OpenAI Realtime fails to connect. If this happens, display an error message at the top like "Error establishing connection with OpenAI Realtime Live API. Error Code: {error_code}" 

- The tracer_voice has a button which says "End Roleplay". Once the button is clicked, it tells the browser to send a message to OpenAI Realtime via webrtc to use the tool warmth_score: "Evaluate the user based on how warm their tone was in that conversation. Output text (not audio) of a warmth score in json format. Example: {warmth_score: 50}. This is a function since it's just generating an output.
    - For the tracer, success looks like the user doing roleplay session 1 in a warm tone, and getting a high warmth score. Then user does roleplay session 2 in a mean, sassy tone, and getting a low warmth score.
- OpenAI Realtime sends this message via a webrtc to the browser. Then the browser makes a seperate POST HTTP request, updating the row of table tracer_user with ID that is in the URL param (the user id is in the format of /tracer_voice?userId=2)
, and putting the warmth_score int into the column 'warmth_score'. We can actually find the correct row to update later. Note a comment next to the line that we only set it to be so simple for the tracer and that is should be updated in the full version to update something different (no need to be specifc on that yet). 
- Once the database is updated, the user gets redirected to the page tracer_scores with the url param containing the userId, for example: /tracer_scores?userId=2

### tracer_scores
- The page gets the userId from tracer_voice in it's URL. For example: tracer_scores?userId=2
- This page displays the following:
    - the values in the table tracer_user and just prints out the value for every column in the format "{column name}: {value} <br></br>". Recall the columns are 'name' 'warmth_score'. 
    - The raw SQL output of every row in the table tracer_transcript for:
        `SELECT * 
        FROM tracer_transcript
        WHERE user_id = <value_from_url_param>; `

# Requirements

## webrtc
Model ID: gpt-realtime
Voice: ash
SDK: none
Never build a Websocket connection, use WebRTC. Never manually process PCM audio.
Ephemeral keys via POST /v1/realtime/client_secrets
Session config passed server-side at connection time (not client-side session.update)
OPENAI_API_KEY never in client code
Do NOT use direct API key. Use ephemeral tokens. 

# Boundaries
- Always
    - Always follow conventions in CLAUDE.md
    - use Prisma singleton from lib/db.ts
    - validate with Zod
- Ask
    - before installing new dependencies beyond what's in package.json
- Never
    - modify existing pages (home, about, users)
    - commit API keys to client-side code

# TESTS

## Decomposition
- Chunk 1: Build and test databases and API routes.
    - Build: prism schema, lib/db.ts, all 6 API routes, and zod schemas
    - Test:
        - curl POST /api/tracer/user with {"name": "John"} -> verify row created
        curl GET /api/tracer/user/1 -> verify name returned.
        - Also do these verification steps for transcript and PATCH routes.
    - Depends on :nothing
- Chunk 2: Frontend without voice
    - Build: tracer_onboarding page, tracer_scores page.
    - Test:
        - On tracer_onboarding, type a name "Steven" into the box, click submit, and verify that user is temporarily redirected to the tracer_scores page.
        - Check table tracer_user to verify that a row with the name "Steven" was inserted.
        - Use PATCH /api/tracer/user/1 — update warmth_score to have a value of 43. 
        - Use GET /api/tracer/scores/1 — read user for the scores page to verify that the scores were inserted into the database
        - Reload tracer_scores page to ensure the scores have rendered
    - Depends on: chunk 1
- Chunk 3: Voice page + OpenAI Realtime API
    - Build page tracer_voice, epemeral token endpoint, webrtc connection, audio pipeline, transcript streaming, warmth score flow
    - Test:
        - Test 1: On tracer_onboarding, type a name "Marcus" into the box, click submit, and verify that user is temporarily redirected to the tracer_scores page.
        - Test 2: user audibly hears the agent correctly answer the question of "what's my name"
        - Test 3: the warmth scores upserted into the row of database table tracer_user where the user Id is in the url param . Right now we will just deal with one row and not worry about identifying the signed in user and finding their database row. 
        - Test 4: On the tracer_scores page, from the tracer_user table: each column and it's value in tracer_user is rendered on the tracer_scores page
        - Test 5: On the tracer_scores page, from the tracer_tracript table: JSON of all rows is rendered.
            Depends on: chunks 1 and 2

## Anti-patterns — what would a wrong-but-plausible implementation look like?
- building a server-side webrtc between the browser and OpenAI Realtime (Wrong because the browser connects to it directly)
- The agent inserting rows into tracer_transcript with content that wasn't actually said, like maybe OpenAI Realtime's internal reasoning (Wrong because content must have been words actually said out loud, either by the user or the OpenAI Realtime voice)
- Skipping Zod validation because "security isn't important" (wrong — you explicitly said to use Zod)
- Putting OpenAI Realtime API keys directly in react components (wrong because you are to use ephemeral tokens)
- Creating one monolothic api route that has all CRUD operations (wrong because I specified these in the API routes heading)

# Survivability
The data flow, pages, API routes, tech stack, voice pipeline, and system prompts will survive. But the tracer_ tables are throwaway and just for valiadation.