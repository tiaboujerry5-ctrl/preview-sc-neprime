# 04 — Learning

**This is the hard part, and it's where systems like this usually fail.**

The naive version — "user liked X, so store: likes X" — degrades fast. It
overfits to recent requests, hardens offhand remarks into laws, and drifts toward
telling the principal what they already said. The machinery below exists to stop
each of those specifically.

## The preference record

Every learned preference is a record, never a bare string:

```yaml
- subject: color
  value: "warm neutrals (camel, olive, rust)"
  polarity: positive        # positive | negative | contested
  confidence: 0.62          # 0.0 – 1.0
  evidence:
    - episode: 2026-09-17-fall-jacket
      signal: chose_over     # chose camel over charcoal at equal score
    - episode: 2026-08-02-knitwear
      signal: stated         # said it directly
  last_confirmed: 2026-09-17
  decay_after_days: 270
```

`evidence` is what makes it auditable. "Why do you think that?" always has an
answer, and the answer is a list of episodes you can go read.

## Signal strength — not all evidence is equal

| Signal | Weight | Why |
|---|---|---|
| `kept_and_reused` | **1.0** | Revealed preference over time. The gold standard |
| `purchased` | 0.7 | Money is a real signal, but returns happen |
| `chose_over` | 0.6 | A choice between real options. Grounded |
| `rejected` | 0.6 | Negative preference is as valuable, and rarer |
| `stated` | 0.4 | People misdescribe their own taste, constantly |
| `probe_answer` | 0.5 | A pointed-at choice beats a described one |
| `returned` | **-0.8** | Strong negative. Overrides the purchase that preceded it |

**Stated preference is weighted below revealed preference on purpose.** What
someone says they like and what they keep wearing are different datasets, and the
second one is the true one.

## Confidence math

```
confidence = clamp(Σ(signal_weight × recency_factor) / (N + 1.5), 0, 0.95)
recency_factor = 0.5 ^ (days_since / 365)
```

Three properties, each deliberate:

- **Capped at 0.95.** Nothing is ever certain. Leaves room to be wrong.
- **The `+1.5` denominator penalizes thin evidence.** One strong signal lands
  around 0.4, not 1.0. **One confirmation is a rumor.**
- **Recency halves yearly.** Taste moves. A 2024 preference shouldn't outvote a
  2026 one.

## Contradiction — the `contested` rule

When new evidence opposes a stored preference:

- **stored confidence < 0.4** → absorb it, adjust, move on quietly.
- **stored confidence ≥ 0.4** → **do not overwrite.** Flip polarity to
  `contested`, keep both evidence sets, and raise it in the next conversation:

  > "You went with the charcoal. I had you down for warm neutrals — was that
  > this jacket specifically, or has that shifted generally?"

The resolution is worth more than either data point, because it usually reveals
a **conditional** preference — "warm neutrals for knitwear, dark for outerwear" —
which is the structure that was actually true the whole time. Silent overwriting
destroys that distinction permanently.

## Decay

A preference not reconfirmed within `decay_after_days` drops to confidence 0.2
and is marked `stale`. Stale preferences still inform scoring, weakly, and become
**cheap probe material**: "still avoiding synthetics, or has that relaxed?" One
question, re-hardens a whole branch of the model.

## What he must never learn

- **From a single ambiguous signal.** Buying a gift is not a preference.
- **From constraint-driven choices.** Picking the only in-stock size is not a fit
  preference. Check the brief before attributing a choice to taste.
- **From his own suggestions.** If he proposed it and the principal accepted with
  no alternative shown, that is weak `stated` at best. **An agent that learns
  from its own output converges on its own bias within a dozen episodes.** This
  is the sycophancy trap and it is the most dangerous item on this page.
- **Anything in `profile/identity.yaml`.** Sizes, locale, and body facts are
  principal-owned. He proposes edits there, he never writes them.

## Write-back procedure

After every episode, `scribe` writes `learned.md` and proposes a profile diff:

1. New preferences (confidence, evidence, one-line rationale)
2. Confidence updates on existing ones
3. Any new `contested` flags → these become conversation, not commits
4. **Questions he had to ask that the profile should have answered** — the defect
   log. This list shrinking over time *is* the system working.

Then append to `profile/CHANGELOG.md`: date, episode, what changed, why.

Profile changes land as a reviewable diff. You can read them, edit them, or
`git revert` them. **Memory you cannot correct is memory that rots.**
