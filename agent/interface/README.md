# Interface — shell v1

`console.html` is the working shell from `../INTERFACE.md`, published at
https://claude.ai/artifact/DaMKUnMnRYJZRaw4uZJP6E

Single file, no build step, no dependencies beyond Google Fonts. Open it directly
in a browser or publish it as-is.

## What's real

- **Voice** — browser speech recognition behind `createVoice()`, the single
  abstraction from the spec. Swapping to server-side transcription touches that
  function and nothing else. No Web Speech API in Firefox; the mic disables
  itself rather than failing silently.
- **Editable transcript before send** — dictation lands in the field and waits.
  Non-negotiable: voice that mishears a brand name and fires anyway is voice you
  stop using after one try.
- **Verdict taps** — three taps write `kept_and_reused` / `returned` / `skipped`
  with their signal weights, persisted to localStorage (wrapped in try/catch;
  renders fine without it). Under passive capture this is the cheapest learning
  signal in the system, which is why it gets more visual weight than a
  three-button row normally earns.

## What's staged

- Phase strip animates on submit but isn't wired to a real loop.
- The dossier is the worked example from `../memory/episodes/`. Invented products
  and prices; the provenance footer shows the shape real findings carry.

## Next

Wire the input to a real session, so phases 2–3 reflect actual research rather
than a timer. Everything else in the shell is already doing its job.
