# Interface — minimum viable, speak or type

You want one surface where you can either **talk to him or type at him**, your
choice in the moment. Nothing more. This is the spec for that, and it is
deliberately small — the framework is still the product; this is a door into it.

One decision worth flagging up front: **a minimal UI meaningfully fixes the
feedback problem.** You chose to tell him outcomes yourself rather than have him
schedule check-ins (`protocols/05-verdict.md`). In a chat window that means
typing a sentence, which you mostly won't. With a UI, a past dossier can carry
three taps — **kept it · sent it back · never bought it** — and that's a
`kept_and_reused` signal at a cost of half a second. It turns the weakest part of
the design into the cheapest interaction in the app.

## The whole interface — four surfaces

```
┌──────────────────────────────────────────┐
│  ASK                                     │   1. Ask
│  ┌────────────────────────────────┐ ┌──┐ │      One input. Type or hold to
│  │ what are you looking for?      │ │🎤│ │      talk. Mic is a peer of the
│  └────────────────────────────────┘ └──┘ │      keyboard, not a mode you
│                                          │      switch into.
├──────────────────────────────────────────┤
│  ● thinking — checking 3 sellers…        │   2. Live state
│    ✓ brief   ✓ 12 found   ● skeptic      │      He's slow by design. Show
├──────────────────────────────────────────┤      which phase, and let it be
│  DOSSIER                                 │      interrupted.
│  Pick: Northmoor Waxed  €210        [→]  │
│  ├ cheaper, but unwaxed      €140   [→]  │   3. Dossier
│  └ better shell, +€85        €295   [→]  │      The output shape from
│  ⚠ wax transfers for a month             │      03-judgment.md, rendered.
├──────────────────────────────────────────┤      Nothing new to design.
│  PAST                                    │
│  Fall jacket · 12d ago                   │   4. Past + verdict
│     kept it  ·  sent it back  ·  didn't  │      Three taps. This is the
│  Standing desk · 40d ago         ✓ kept  │      highest-value pixel in the
└──────────────────────────────────────────┘      entire app.
```

That's it. No dashboard, no settings screen, no charts. If a fifth surface
appears, something has gone wrong.

## Voice: what to actually use

Two real options, and the trade is clear.

| | **Web Speech API** | **Record → transcription API** |
|---|---|---|
| Setup | Zero. Built into the browser | Audio capture + an API key |
| Cost | Free | ~$0.006/min |
| Accuracy | Decent; weak on brand names | Strong, handles accents and proper nouns |
| Browsers | Chrome/Edge/Safari. **Not Firefox** | Everywhere |
| Latency | Live, streams as you speak | 1–2s after you stop |
| Offline | No | No |

**Recommendation: Web Speech API first.** It works today, costs nothing, and for
"find me a fall jacket under 250" it is entirely good enough. Its real weakness
is brand names and model numbers — exactly the words that matter most here — so
put it behind a one-function interface:

```ts
// lib/voice.ts — the whole abstraction
interface VoiceInput {
  start(): void
  stop(): Promise<string>
  onPartial?: (text: string) => void   // live caption while speaking
}
```

Swapping to server-side transcription later is then a single file, not a refactor.
Build it that way from the first commit and the decision stays cheap.

**Non-negotiable UX detail: always show the transcript before sending, editable.**
Voice input that fires straight into a search is infuriating the first time it
mishears a brand, and you stop using the mic permanently. Transcript → glance →
send. One extra beat, and it's what makes the feature survive contact.

## What it's built on

The repo already runs React 19 + Vite + Tailwind 4 + Supabase. Nothing new is
needed:

| Need | Use | Note |
|---|---|---|
| Shell | Existing React + Tailwind | Components and routing already there |
| Voice | Web Speech API | Behind `lib/voice.ts` |
| Episode storage | **Keep it in git** | See below — this matters |
| Live phase state | Supabase realtime, or polling | Polling is fine at this volume |

**The memory stays in git even once a UI exists.** The UI *reads* episodes and
*writes verdicts*; it is not where the taste model lives. Moving `profile/` into
Postgres would trade away versioning, diffing, audit and `git revert` — the four
properties the whole design rests on — for query speed you don't need at this
volume. Supabase's job is session state and the verdict queue, not memory.

## Build order

1. **Static shell** — the four surfaces against a hardcoded dossier. Proves the
   layout before any wiring. Half a day, and buildable right now.
2. **Text input → a real session** — the loop runs, a real dossier comes back.
3. **Voice** — mic button, live caption, editable transcript.
4. **Verdict taps** — writes to the episode. *Do this before it feels optional:
   it's the piece that makes him learn.*

## Explicitly not in v1

Accounts and login (one user), notifications (he doesn't interrupt you), a
watchlist screen, spend tracking (you're at L1 — he doesn't spend), settings
(the profile is text files you can edit directly), and anything resembling
analytics. Each of these is a real feature. None of them is why you wanted this.
