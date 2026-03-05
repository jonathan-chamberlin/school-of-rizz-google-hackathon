# Voice Model Selection: OpenAI Realtime API

## Decision
Use OpenAI Realtime API as the primary voice AI model for School of Rizz.

## Requirements

1. Model must be able to use webhooks or send both voice and text outputs
2. Model must be very good at detecting the tonality of the user
3. Model must be very good at using certain tonalities itself
4. Model must be good at following complex prompts

## All companies offering voice AI models (March 2026)

### End-to-end voice AI platforms
- Retell AI, PolyAI, ElevenLabs Agents, Vapi.ai, Bland AI, Synthflow, Lindy, Thoughtly, Hume AI, Ultravox, Cognigy.AI, Dasha, Voximplant, Siro

### Enterprise contact center platforms
- Five9, Replicant, Google Contact Center AI, IBM Watson Assistant, Amazon Connect + Lex, Nuance Mix, NICE CXone, Genesys AI, Twilio Flex, Dialpad AI, CallHippo

### Voice agent orchestration platforms
- Deepgram, AssemblyAI, LiveKit, Telnyx, Daily/PipeCat, Vocode

### Native audio LLMs (speech-to-speech)
- OpenAI GPT-Realtime, Google Gemini 2.5 Flash Native Audio, Alibaba Qwen 2.5-Omni, Qwen3-TTS, Moshi, NVIDIA PersonaPlex

### Expressive/emotional TTS providers
- Cartesia Sonic-3, Hume AI Octave, Rime (Arcana/Mist v2), ElevenLabs, Murf AI, Inworld TTS, Google Cloud TTS, PlayHT, Soul Machines

### Open-source frameworks
- Pipecat, LiveKit Agents, Vocode Core, RoomKit, TEN Framework, Rasa

## Comparison against requirements

| Platform | 1. Webhooks / text+voice | 2. Detect user tonality | 3. Express tonality | 4. Complex prompts | Fit |
|---|---|---|---|---|---|
| **OpenAI Realtime** | Native function calling; text+audio stream in parallel on same WebSocket | Implicit — adapts responses to detected emotion, but no structured emotion data exposed | Strong — instruction-based control ("speak sympathetically"), laughing, whispering, 7 voices | Best — GPT-4o reasoning, best at complex multi-turn instructions | **3.5/4** |
| **Hume AI (EVI)** | Webhooks + tool use | Best in class — dedicated Expression Measurement, returns structured emotion data | Best in class — Octave TTS, granular control ("sound sarcastic", "whisper fearfully") | Weak — failed our actual roleplay prompt test, emotion-optimized model not instruction-optimized | 3/4 |
| **Gemini Live API** | Partial — function calling works, but no simultaneous text+audio output | Good — processes raw audio directly, "affective dialogue" | Weak — context-aware but no explicit emotional instruction controls | Good — solid instruction following but struggled in our testing | 2/4 |
| **ElevenLabs Agents** | Yes — webhooks, 400+ integrations, MCP servers | Secondary — detects stress markers for turn-taking, not primary feature | Good — Audio Tags ([sigh], [excited]), best raw voice quality, conservative | Depends on underlying LLM (pluggable) | 2.5/4 |
| **Vapi.ai** | Yes — 4 tool types | Depends on underlying STT+LLM | Depends on underlying TTS | Depends on underlying LLM | Orchestrator only |
| **LiveKit Agents** | Yes — callback-based metadata extraction | Depends on underlying LLM | Depends on underlying TTS | Depends on underlying LLM | Framework only |
| **Retell.ai** | Yes — webhook events | Depends on underlying LLM | Depends on underlying voice engine | Depends on underlying LLM | Orchestrator only |
| **Bland AI** | Yes — webhooks | Depends on underlying model | Depends on underlying model | Depends on underlying model | Orchestrator only |
| **Cartesia Sonic-3** | TTS only | N/A | Strong — emotion modulation, 40-90ms latency, laughter/breathing | N/A | Component only |
| **Deepgram** | Yes — unified API | Good STT with diarization | Basic TTS | Depends on LLM layer | Infrastructure |

## Pricing comparison

| Platform | $/min | Notes |
|---|---|---|
| Gemini Live API | ~$0.03-0.04 | Cheapest by far, token-based |
| ElevenLabs | $0.08-0.10 | Voice only, LLM costs not yet included |
| Retell.ai | $0.13-0.31 | Modular, enterprise discounts available |
| Vapi.ai | $0.25-0.33 | Advertised $0.05 is just platform fee |
| **OpenAI Realtime** | **~$0.30** | $0.06 input + $0.24 output per minute |
| LiveKit | Variable | Free framework, pay for underlying services |

## Emotion detection comparison

| Platform | Capability |
|---|---|
| **Hume AI** | Best — dedicated Expression Measurement tech, structured emotion data. Google licensed their tech in Jan 2026. |
| **Gemini 2.5** | Good — raw audio processing, captures tone/emotion/pace. No structured metrics exposed. |
| **OpenAI Realtime** | Implicit — detects emotion, adapts responses. No structured emotion scores accessible. |
| **ElevenLabs** | Secondary — stress markers for turn-taking only. |

## Emotional expression comparison

| Platform | Capability |
|---|---|
| **Hume AI Octave** | Most granular — ~10 adjustable dimensions, "sound sarcastic", "whisper fearfully". |
| **OpenAI Realtime** | Strong — instruction-based ("speak sympathetically", "speak quickly"), laughing, whispering. |
| **ElevenLabs** | High quality but conservative — Audio Tags, best raw voice quality. |
| **Gemini 2.5** | Context-aware empathy, no explicit emotional instruction controls. |

## Why OpenAI Realtime

**It's the only platform that scores well on all four requirements natively:**

1. **Webhooks / dual output**: Native function calling streams structured JSON alongside audio on the same WebSocket. The model can call tools mid-conversation without interrupting speech. This solves our warmth score extraction problem cleanly — no regex parsing of transcripts, no hoping the model says the right words.

2. **Tonality detection**: While not as specialized as Hume, GPT-4o processes audio directly and adapts to detected emotional state. For a coaching app, implicit detection that influences response quality matters more than raw emotion metrics we'd need to build UI for.

3. **Tonality expression**: Instruction-based control fits our architecture perfectly. System prompts can say "when the user sounds nervous, respond warmly and encouragingly" and the model follows. Supports laughing, whispering, and tonal variation.

4. **Complex prompt following**: This is the decisive factor. School of Rizz requires a model that can play a character, track conversation turns, switch to coach mode, give specific feedback, and resume the roleplay. Hume AI failed this exact test. OpenAI's GPT-4o reasoning is the strongest available for multi-turn, multi-mode instruction following.

## Why not the alternatives

**Gemini Live API** (current): Cannot output text+audio simultaneously. Function calling exists but we confirmed the native audio model rejects mixed modalities. Audio playback required significant debugging (sample rate mismatch, chunk queuing). Cheapest option but weakest on expressiveness and prompt complexity.

**Hume AI**: Best emotion detection and expression, but failed our actual roleplay prompt — confused "cool person at a college club" with "coach of a club". Their model is optimized for empathic response, not complex multi-turn state management. Would be ideal as a component in a composable stack, not as the sole model.

**ElevenLabs Agents**: Strong voice quality but emotion detection is secondary. Relies on pluggable LLMs for reasoning, so prompt-following quality depends on which LLM you choose. Adds orchestration complexity.

**Composable stack (LiveKit/Pipecat + Hume + OpenAI + Cartesia)**: Theoretically optimal — best emotion detection (Hume) + best reasoning (OpenAI) + best TTS (Cartesia). But adds significant integration complexity, multiple vendor dependencies, and higher total cost. Better for Phase 2+ after the core product is validated.

## Cost justification

OpenAI Realtime at ~$0.30/min is ~8x more expensive than Gemini at ~$0.04/min. For a 3-minute session, that's ~$0.90 vs ~$0.12.

This is acceptable because:
- Free tier is one 3-min session = $0.90 max cost per free user
- Paid sessions generate revenue that covers the cost
- The alternative (Gemini) doesn't meet requirements 1 and 3, meaning the product doesn't work
- Cost optimization is a Phase 5 concern; product-market fit is the current concern

## Migration path

- **Phase 0 (tracer)**: Keep Gemini for basic voice connection proof-of-concept
- **Phase 2 (voice roleplay)**: Switch to OpenAI Realtime for production voice
- **Future**: Evaluate composable stack (Hume emotion + OpenAI reasoning + Cartesia TTS) if granular emotion scoring becomes a core differentiator
