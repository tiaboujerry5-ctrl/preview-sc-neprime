# Learned — EXAMPLE-fall-jacket

## Proposed profile changes

**New preference** — low confidence, one signal only:
```yaml
- subject: material
  value: "natural shells over synthetic (waxed cotton, cotton canvas)"
  polarity: positive
  confidence: 0.38          # single chose_over. One confirmation is a rumor.
  evidence:
    - { episode: EXAMPLE-fall-jacket, signal: chose_over, date: 2026-09-17,
        note: "Chose waxed cotton over a cheaper nylon shell that passed all gates" }
  last_confirmed: 2026-09-17
  decay_after_days: 270
```

**New constraint candidate** — `constraints.yaml`, needs confirmation:
> Returns window measured from **delivery** vs. **order** materially changes a
> 14-day floor. Suggest raising `return_policy_minimum_days` to 21 for sized
> items shipped cross-border.

**Vocabulary added** — `clothing_outerwear`:
> "chore jacket", "overshirt", "waxed cotton", "field jacket" are the terms that
> surface this category. The literal word "jacket" mostly returns technical
> outerwear and buries the answer.

## Not learned, deliberately

- **Color.** Camel was chosen, but it was the only in-stock color in M. That's a
  constraint-driven choice, not a taste signal. Recording it as a palette
  preference would be a fabrication — and the kind that's very hard to detect later.
- **Brand affinity for Northmoor.** He recommended it; acceptance of his own
  suggestion is not evidence of taste. Revisit at T+45 if it's still in rotation.

## Defect log

Questions asked that the profile should have answered: **0**
*(Both questions were genuinely new information. Baseline for metric #1: 2.)*

## Verdict scheduled
- T+14 → 2026-10-01 · fit and arrival
- T+45 → 2026-11-01 · still wearing it?
