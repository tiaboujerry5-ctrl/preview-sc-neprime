# 03 — Judgment

**Goal:** one defensible pick, two real alternatives, and an honest case against
all three.

## Step 1 — Gates (binary)

Each hard constraint is a gate. Fail one, eliminate — but record *which* gate,
because near-misses are informative.

```
size available · ships to locale · ≤ budget.ceiling
· not on banned-brands · meets hard material/ethics constraints
· arrives before deadline (with realistic shipping, not best-case)
```

A candidate failing **exactly one** gate is a `near_miss` and appears in the
dossier's "one thing away" line. That line is often where the real answer is —
it's how the principal discovers their ceiling was set 15% too low.

## Step 2 — Score (0–10 per term)

```
score = w_t·Taste + w_v·Value + w_q·Quality + w_m·Timing − w_r·Risk
```

| Term | What it measures | How |
|---|---|---|
| **Taste** | Match to the profile | Weighted sum over palette, silhouette, material, brand affinity — **each term scaled by the confidence of the underlying preference** |
| **Value** | Price vs. reality | Position against the item's own 90-day median and observed floor. Never vs. MSRP |
| **Quality** | Will it survive | Material spec + T3 durability reports. Thin evidence caps this at 5 |
| **Timing** | Buy now or wait | Distance from the category's seasonal low |
| **Risk** | What could go wrong | Seller reputation, return policy, sizing variance, review thinness, dropship signals |

**Confidence scaling is the load-bearing detail.** A preference he's 0.3 sure
about moves the score a third as much as one he's 0.9 sure about. Without this,
a single offhand comment six months ago dominates every future recommendation —
which is exactly how these systems go bad.

Default weights (per-category overrides in `profile/constraints.yaml`):
`w_t 0.35 · w_v 0.25 · w_q 0.20 · w_m 0.05 · w_r 0.15`

## Step 3 — Skeptic pass (mandatory)

The `skeptic` gets the top-scoring candidate and **one job: kill it.**

- Who is this seller, actually? How long have they existed?
- What do the **3-star** reviews say? (5-star reviews are noise; 1-star is often
  shipping. 3-star is where the real defects live.)
- What is the return path, and who pays for it?
- Is the price good, or is the *list* price inflated?
- Does a T3 thread contradict the official spec?
- Is there a known-better option the search missed because of a vocabulary gap?

If the skeptic lands a hit, the pick is demoted and the runner-up goes through
the same gauntlet. The output is `skeptic.md` — and its surviving objections
appear in the dossier under **"What would make this wrong."** A dossier with no
such section means the skeptic pass didn't happen.

## Step 4 — The dossier

Strict shape. One page.

```markdown
# <Brief in one line>

**Pick:** <name> — <price> at <seller>   [link]
<Two sentences: why this one. Lead with the deciding factor.>

**Alternates**
- <name> — <price> · cheaper, but <named trade-off>
- <name> — <price> · better <X>, but <named trade-off>

**What would make this wrong**
- <surviving skeptic objection, with its likelihood>

**Considered and cut**
- <name> — <one-line reason>

**One thing away**
- <near_miss> — would qualify if <the single gate> moved

**Timing:** buy now / wait until ~<date> because <reason>
**I assumed:** <assumptions from the brief>
**Prices checked:** <timestamp>
```

Rules: no more than two alternates, ever. Each alternate must sit on a **named
axis** — an alternate without a stated trade-off is filler and gets cut. If the
top two candidates are within 0.5 points, say it's a coin flip and name the
tiebreaker rather than manufacturing a preference.
