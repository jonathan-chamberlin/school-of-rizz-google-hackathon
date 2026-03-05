# CONTEXT

Build a tracer bullet, the thinnest slice of this project. Prioritize code simplicity. Security isn't important.

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
        - geminiSystemPrompt.ts
            - geminiSystemPrompt(user_name: string): string
                - "You are a social skills coach. The user's name is {tracer_user.name}. Have a brief conversation with them."
        - transcriptReportingPrompt.ts
            - transcriptReportingPrompt(): string
                - 'For each turn of this conversation, generate and output JSON including the role of the speaker and the content of what they said. - Example: if the user says "My name is Steven", then gemini would output text of {role: "user", content: "My name is Steven"}. - Example: If the coach voice agent says "Try mirroring", then gemini would output text of {role: "coach", content: "Try mirroring."}.'

## API routes
With examples.

- POST /api/tracer/user — create a new row in tracer_user
    - Body: {"name": "John"}
    - Response: {"data": {"id": 1, "name": "John", "createdAt": "2026-03-02T12:27:45.123Z", "warmthScore": null}, "error": null}
- GET /api/tracer/user/1 — read the user's name (for the system prompt)
    - Body: (none)
    - Response: {"data": {"name": "John"}, "error": null}
- POST /api/tracer/transcript — insert a transcript turn
    - Body: {"userId": 2, "role": "user", "content": "What's up. I hope you're doing well. How are you?"}
    - Response: {"data": {"id": 1, "userId": 2, "createdAt": "2026-03-02T12:27:45.123Z", "role": "user", "content": "What's up. I hope you're doing well. How are you?"}, "error": null}
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

## Create 3 pages inside the app folder: tracer_onboarding, tracer_voice, and tracer_scores. Here is the flow:

### tracer_onboarding
-  A page at app > tracer_onboarding is where the text box lives and it has a hook (or something like that) which sends the name to the database. Once the 'submit' button is clicked:
- The user is redirected to the page at app > tracer_voice

### tracer_voice
- The tracer_voice page tells the browser to request mic permission from the user, then it uses a websocket to connect the user's browser (and therefore audio) to establish connection with the Google Gemini Live API. 
- This page needs a onclose for if the Gemini Live API fails to connect. If this happens, display an error message at the top like "Error establishing connection with Google Gemini Live API. Error Code: {error_code}" 
- As the conversation goes, Google Gemini is outputting a transcript. For the transcript, the google gemini live api sends text representation of each turn as they happen using transcriptReportingPrompt: 
    - Generating a transcript line and warmth score are functional.
    - The procedures on top of it: For each the transcript and warmth score, the browser revires each turn from the websocket and POSTs it to an api route in app/api route, with inserts a new row into tracer_trascript table. For now we'll hardcode id = 1, but 'role' column should be the role value of the json, and the 'content' should be the content value of the json.
- The tracer_voice has a button which says "End Roleplay". Once the button is clicked, it tells the browser to send a message to gemini via websocket: "Evaluate the user based on how warm their tone was in that conversation. Output text (not audio) of a warmth score in json format. Example: {warmth_score: 50}. This is a function since it's just generating an output.
- Gemini sends this message via a websocket to the browser. Then the browser makes a seperate POST HTTP request, updating the row of table tracer_user with ID=1, and putting the warmth_score int into the column 'warmth_score'. We can actually find the correct row to update later. Note a comment next to the line that we only set it to be so simple for the tracer and that is should be updated in the full version to update something different (no need to be specifc on that yet). 
- Once the database is updated, the user gets redirected to the page tracer_scores

### tracer_scores
- This page displays the following:
    - the values in the table tracer_user and just prints out the value for every column in the format "{column name}: {value} <br></br>". Recall the columns are 'name' 'warmth_score'. 
    - The raw SQL output of every row in the table tracer_transcript for:
        `SELECT * 
        FROM tracer_transcript
        WHERE user_id = 1; `

# Requirements

## Websocket
SDK @google/genai does support the Gemini Live API directly without needing a raw Websocket. 
The installed @google/genai SDK (v1.42.0) has a built in Geimini Live API support via live.conect(). Use this. Don't write raw websocket code. Reference the  starter app at github.com/google-gemini/live-api-web-console for browser-based patterns.

Key details for the implementing agent:
- GoogleGenAI → live.connect() establishes the WebSocket session
- sendRealtimeInput() sends audio/video/text
- Callbacks: onopen, onmessage, onerror, onclose
- Audio format: input PCM 16-bit 16kHz mono, output PCM 16-bit 24kHz mono

Do NOT use direct API key. Use ephemeral tokens. 

## Code survival
I expect the pattern of the gemimi connection code to survive, and the code to display scores to the screen, and save scores to the database, and save the transcript, and display it, and the pattern of the 3 pages in this flow, specifically that once the session ends the user should be redirected to a score page. Also the functionality of how the session ends. I DO NOT Expect the table tracer_onboarding to survive. The rules for valiadting with zod and never import prisma client directly are to be used on this tracer.

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
- Chunk 3: Voice page + Gemini Live API
    - Build page tracer_voice, epemeral token endpoint, websocket connection, audio pipeline, transcript streaming, warmth score flow
    - Test:
        - Test 1: On tracer_onboarding, type a name "Marcus" into the box, click submit, and verify that user is temporarily redirected to the tracer_scores page.
        - Test 2: user audibly hears the agent correctly answer the question of "what's my name"
        - Test 3: the warmth scores upserted into the row of database table tracer_user where ID=1. Right now we will just deal with one row and not worry about identifying the signed in user and finding their database row. 
        - Test 4: On the tracer_scores page, from the tracer_user table: each column and it's value in tracer_user is rendered on the tracer_scores page
        - Test 5: On the tracer_scores page, from the tracer_tracript table: JSON of all rows is rendered.
            Depends on: chunks 1 and 2

## Anti-patterns — what would a wrong-but-plausible implementation look like?
- building a server-side websocket between the browser and gemini (Wrong because the browser connects to it directly)
- The agent inserting rows into tracer_transcript with content that wasn't actually said, like maybe Gemini's internal reasoning (Wrong because content must have been words actually said out loud, either by the user or the Gemini voice)
- Skipping Zod validation because "security isn't important" (wrong — you explicitly said to use Zod)
- Putting Gemini API keys directly in react components (wrong because you are to use ephemeral tokens)
- Creating one monolothic api route that has all CRUD operations (wrong because I specified these in the API routes heading)