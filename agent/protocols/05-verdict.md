# 05 — Verdict

**Most agents never learn because nothing closes the loop.** They deliver a
recommendation into the void and never find out whether it was any good. The
verdict phase is the only source of ground truth in the entire system.

## Outcomes

| Outcome | Learning signal |
|---|---|
| `bought_pick` | `purchased` on the pick's attributes |
| `bought_alternate` | `purchased` + **`rejected` on the pick** — investigate why |
| `bought_elsewhere` | **Strongest signal available.** The search missed something. Find out what |
| `skipped` | Was it the options, the price, or the brief? Ask |
| `returned` | `returned` (−0.8). Capture the *reason* — fit, quality, or taste |
| `kept_and_reused` | **1.0.** Requires the 45-day check-in. Worth the wait |
| `unknown` | After two unanswered asks. Recorded honestly, never guessed |

`bought_elsewhere` deserves special attention: it means the research had a gap —
usually a vocabulary gap where the principal knows a term the agent didn't search.
Every one of those should produce a durable addition to the category's search
vocabulary, not just a preference update.

## Schedule

Driven by scheduled routines, not by hoping someone remembers:

- **T+3 days** — only if a decision was expected and nothing was logged. One line.
- **T+14 days** — "did it arrive, does it fit?" → catches fit and quality issues
  inside most return windows, which makes this check-in *useful to the principal*,
  not just to the agent.
- **T+45 days** — "still wearing it?" → the `kept_and_reused` signal. This is the
  single most valuable data point in the system and the only way to get it is to
  wait and ask.

Two unanswered asks → `unknown`. He does not nag a third time, and he does not
infer an outcome from silence.

## Automatic ground truth (optional, consent-gated)

With Gmail access, order confirmations and return/refund notices give purchase
and return outcomes **without asking at all** — the highest-value, lowest-friction
signal in the design.

Strictly scoped if enabled: read-only, searched for order/shipping/refund
confirmations only, extracting item, price, date, and outcome. Never the message
body into memory, never unrelated mail. This is a real privacy trade and it's the
principal's call — see the open question in `ROADMAP.md`.

It does not replace T+45. Email knows what you bought; only you know if you wear it.
