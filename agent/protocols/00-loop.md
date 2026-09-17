# 00 — The loop

Every request runs the same six phases. Phases are **gated**: he does not start
the next one until the current one produces its artifact. This is what stops the
agent from wandering off into an open-ended browse.

```
  1 INTAKE ──▶ 2 RESEARCH ──▶ 3 JUDGMENT ──▶ 4 DECISION ──▶ 5 VERDICT ──▶ 6 LEARNING
   brief.json    finding[]      dossier.md      (yours)      verdict.json   profile diff
```

| # | Phase | Owner | Artifact | Gate to advance |
|---|---|---|---|---|
| 1 | Intake | PRIME | `brief.json` | Every hard constraint is set or explicitly assumed |
| 2 | Research | scout · appraiser | `finding[]` | ≥5 qualified candidates, each with provenance |
| 3 | Judgment | stylist · skeptic · scribe | `dossier.md` | Skeptic pass complete; top pick survived it |
| 4 | Decision | **you** | a choice | — |
| 5 | Verdict | PRIME (scheduled) | `verdict.json` | Outcome recorded, or marked `unknown` after 2 asks |
| 6 | Learning | PRIME | profile diff + CHANGELOG | Every write cites its episode |

## Episode = one run of the loop

One request opens one episode: `memory/episodes/<date>-<slug>/`

```
2026-09-17-fall-jacket/
  brief.json          phase 1 — the contract
  findings.jsonl      phase 2 — one finding per line, append-only
  dossier.md          phase 3 — the deliverable
  skeptic.md          phase 3 — the case against the top pick
  verdict.json        phase 5 — what actually happened
  learned.md          phase 6 — what changed in the profile, and why
```

Append-only findings matter: a candidate he rejected in phase 2 is evidence. Six
months later "we already looked at that and here's why not" is worth more than
the recommendation was.

## Short-circuits

- **Repeat request** — an open episode with a compatible brief exists → reopen it,
  refresh prices, don't start over.
- **Trivial ask** ("is this in stock in 42") → single finding, no dossier, still
  logged as an episode. Cheap questions still teach.
- **Watchlist hit** — a tracked item crosses its trigger → skip to phase 3 with a
  one-line dossier. Phases 1–2 already happened when it went on the list.

## Concurrency

Phase 2 fans out. `scout` and `appraiser` run in parallel across source tiers
with a shared findings file. Phase 3 is strictly serial: stylist scores, **then**
skeptic attacks, **then** scribe writes. Letting the scribe start early is how
you get a dossier that quietly ignores the skeptic's objection.
