# Metrics — is he actually getting better?

"Evolves with every request" has to be measurable or it's a feeling. Five
numbers, reviewed monthly. Computed from episode files — no extra bookkeeping.

## The five

| # | Metric | Definition | Direction | Why it's the right measure |
|---|---|---|---|---|
| 1 | **Questions per brief** | `questions_asked.length` | ↓ toward 0–1 | The clearest proof the profile is absorbing knowledge. This is *the* headline number |
| 2 | **Zero-question coverage** | % of briefs needing no questions | ↑ | Same thing from the other side, and it's the one you'll *feel* |
| 3 | **Hit rate** | `bought_pick` ÷ **known** outcomes | ↑ toward 0.6+ | Was the *first* recommendation right. Thin under passive capture — read with #6 |
| 4 | **Regret rate** | (`returned` + `kept_and_regret`) ÷ known purchases | ↓ under 0.1 | Catches an agent optimizing for agreement over fit |
| 5 | **Defect count** | questions flagged `profile_should_have_known` | ↓ to 0 | Direct measure of memory failure |
| 6 | **Unknown rate** | episodes with no outcome ÷ all | — *(expect 0.4–0.6)* | **The cost of passive capture, made visible.** Not a failure — a known trade |

**On #6:** you chose to volunteer outcomes rather than be asked, so a high unknown
rate is the expected price, not a bug. It's tracked because it silently weakens #3
and #4 — a hit rate computed on 4 of 11 episodes is not a hit rate, it's a rumor,
and metrics 3 and 4 should always be read with the denominator visible. If #6
holds above 0.6 across 10+ episodes, he says so **once**, with what the
alternatives would buy, and then drops it for good.

Under passive capture, **metric #1 is the one that matters** — it needs no
verdicts at all and it measures the thing you actually care about: how much less
you have to explain yourself each time.

## Watch metrics

- **Time to dossier** — should fall, but never at the cost of #3 and #4.
- **Price accuracy** — was the quoted price still valid at purchase? Decaying
  accuracy means the re-verification window (72h) is too loose.
- **Alternate uptake** — if `bought_alternate` is high, ranking is miscalibrated:
  he's finding the right *set* and picking wrong within it. Different bug than a
  low hit rate, different fix.
- **`bought_elsewhere` rate** — the search-gap metric. Each one should produce a
  permanent addition to the category's search vocabulary.
- **Cross-domain transfer** — when he enters a domain for the first time, how
  many questions does he need? A general researcher earning its keep asks *fewer*
  questions in a brand-new domain at episode 20 than it did at episode 5, because
  `decision-profile.yaml` already knows how you trade time against money. **This
  is the metric that proves the general-researcher choice was right.** If it's
  flat, the decision traits aren't transferring and the profile split isn't
  earning its complexity.
- **Depth calibration** — share of episodes resolved at `quick` tier. If it's
  near zero he's over-researching cheap reversible things and wasting your time
  in a different way than doing nothing would.

## The trap

**Hit rate is gameable, and the agent has an incentive to game it.** He can
maximize it by only recommending things the principal already named — high hit
rate, zero value, and it looks like success on the dashboard.

Guard: track **discovery rate** — the share of accepted picks the principal had
not heard of. A healthy system has a *rising* hit rate and a *non-zero* discovery
rate. Hit rate rising while discovery falls to zero means he's stopped doing
research and started doing agreement. That's the failure mode to watch for, and
it will look like success until you look at this number.

## Review ritual

Monthly, he writes `memory/reviews/<month>.md`: the five numbers with deltas, the
defect log, contested preferences awaiting resolution, and one proposed change to
his own protocols. That last item is where the framework evolves — the protocols
in this repo are version 1, not scripture.
