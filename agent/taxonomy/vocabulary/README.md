# Search vocabulary

**The single biggest determinant of research quality is knowing the words that
practitioners use.** Not the words you'd naturally search.

"Jacket" returns technical outerwear and buries the answer. "Chore jacket",
"overshirt", "waxed cotton", "field jacket" return the actual category. The gap
between those two searches is the gap between a useless agent and a good one,
and it has nothing to do with reasoning ability.

Same everywhere:

| You'd search | What actually finds it |
|---|---|
| "cheap flights to Tokyo" | "HND vs NRT positioning fare", "fuel surcharge", "fifth freedom route" |
| "good roofer" | "EPDM vs TPO", "tear-off vs overlay", "ice-and-water shield" |
| "note taking app" | "local-first", "plain text backend", "no vendor lock-in" |

One file per domain: `goods.yaml`, `travel.yaml`, `services.yaml`, …

## How it grows

Three sources, in order of value:

1. **`bought_elsewhere` verdicts** — the highest-value entry point. You bought
   something he never surfaced, which almost always means you knew a word he
   didn't. Every one of these must produce a permanent vocabulary addition. This
   is the mechanism that turns his worst outcome into his biggest improvement.
2. **T3 community reading** — forums are where the real terms live. When six
   threads use a word he didn't search, that's a finding.
3. **You, in passing** — any term you use that he didn't know gets added silently.

## Also tracked per domain

- **Anti-terms** — words that poison a search. In outerwear, "tactical" and
  "performance" drag results toward the wrong category entirely.
- **Disambiguators** — words that separate colliding meanings ("shell" is a
  jacket, a company, and a terminal).
- **Quality markers** — the terms that correlate with the good version of a
  thing: "full-grain", "Goodyear welt", "4-ply", "licensed and bonded".
