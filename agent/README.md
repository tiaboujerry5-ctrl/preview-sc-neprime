# PRIME — a research alter ego

> Codename `PRIME` is a placeholder. Rename in `IDENTITY.md` when you pick one.

PRIME exists for one reason: **you don't have time to research, and you have taste
that is expensive to explain twice.** He does the looking. He remembers what you
decided and why. Every request makes the next one cheaper.

He is not a search engine with a personality. The difference is the **profile** —
a durable, versioned, human-readable model of your taste that he writes back to
after every interaction, and that you can read, edit, and roll back.

## The whole system in one diagram

```
  YOU                    PRIME                         ARTIFACT
  ───                    ─────                         ────────
  request  ──────────▶  01 INTAKE      ──────────────▶  brief.json
             ◀────────  (≤3 questions, then assumes)    (the contract)
                              │
                              ▼
                        02 RESEARCH    ──────────────▶  finding[]
                        (scout · appraiser)              (with provenance)
                              │
                              ▼
                        03 JUDGMENT    ──────────────▶  dossier.md
                        (stylist · skeptic · scribe)     (1 pick, 2 alts,
                              │                           the "why not" list)
  decision ◀─────────────────┘
      │
      ▼
  04 VERDICT             (14d / 45d check-in)  ──────▶  verdict.json
      │                                                  (ground truth)
      ▼
  05 LEARNING            ─────────────────────────────▶  profile/ + CHANGELOG
                         (confidence math, not overwrite)   ← git-versioned
```

## Why git is the memory substrate

The taste model lives as plain text in `profile/`. That is deliberate:

- **Versioned** — `git log profile/taste/palette.yaml` is the literal history of
  your taste. Nothing else gives you that for free.
- **Auditable** — every learned preference cites the episode that taught it. You
  can ask "why does he think I hate beige" and get a commit and a date.
- **Reversible** — he learned something wrong? `git revert`. No retraining.
- **Diffable** — a PR that changes your profile is reviewable before it lands.

This is the single most important structural decision in the design. Memory that
you cannot inspect and correct is memory that silently rots.

## Map

| Path | What it is |
|---|---|
| `IDENTITY.md` | Who he is, how he talks, what he refuses to do |
| `CHARTER.md` | Autonomy ceiling, spend rules, escalation triggers |
| `ACCESS.md` | Accounts, API keys, data sources — the honest version |
| `METRICS.md` | How we prove he's getting better, not just busier |
| `ROADMAP.md` | Build order, phase 0 → 3 |
| `profile/` | The taste model. The actual product. |
| `protocols/` | The loop, step by step. Read `00-loop.md` first. |
| `schemas/` | Machine-checkable shapes: brief, finding, preference, verdict |
| `roster/` | The five sub-agents and their single responsibilities |
| `memory/` | Episodes (case files), verdicts (outcomes), watchlist (price tracking) |

## Reading order

1. `protocols/00-loop.md` — the spine
2. `protocols/01-intake.md` — why he asks few questions and they get fewer
3. `protocols/04-learning.md` — the anti-drift machinery, the hard part
4. `CHARTER.md` — what he's allowed to do without asking
