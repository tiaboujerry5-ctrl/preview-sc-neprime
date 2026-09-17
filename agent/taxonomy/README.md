# Taxonomy — one framework across everything

You chose the general researcher: products, travel, tech, services, contractors,
anything you'd otherwise spend an evening on. That's the more useful version, but
it only works if one framework can span "which USB-C cable" and "which roofer" —
and those have almost nothing in common on the surface.

They do have one thing in common, and it's the organising principle of the whole
taxonomy:

## Research depth scales with cost × irreversibility

```
  depth_score = normalized_cost × irreversibility
```

A €20 cable is cheap and returnable → near zero. A €6,000 roof is expensive and
**you cannot send it back** → near one. That single number decides how much
machinery runs, which is what keeps the framework from being absurd at either end.

| Depth | Trigger | What runs | Output |
|---|---|---|---|
| **quick** | `< 0.15` | One search pass, top result verified | One line. No dossier |
| **standard** | `0.15 – 0.55` | The full loop from `00-loop.md` | Normal dossier |
| **deep** | `> 0.55` | Full loop + **second skeptic pass** + failure-mode analysis + cooling-off | Dossier with "if this goes wrong" section |

Without this tiering you get a five-phase loop for a phone charger, which is how
a system like this becomes something you avoid using. With it, the trivial stuff
stays trivial and the expensive irreversible stuff gets the paranoia it deserves.

## Irreversibility is the axis nobody weights properly

Most shopping advice optimises for price. For a general researcher, **the ability
to undo the decision matters more than the price does.**

| | Reversible | Irreversible |
|---|---|---|
| **Cheap** | Just buy it. Research is a waste of your life | Check the one failure mode, then buy |
| **Expensive** | Buy the likely-right one, use the return window as the real test | **Everything the framework has.** This is the category that justifies the agent existing |

A €400 jacket with 30-day returns is genuinely lower risk than a €400
non-refundable hotel. The jacket's return policy is a *test you get to run*. The
framework should — and does — weight them completely differently.

## Six domains

Each has its own gates, its own definition of "value", and its own risk profile.
See `categories.yaml` for the encoded version.

| Domain | Gates are about | "Value" means | Distinctive risk |
|---|---|---|---|
| `goods` | Size, stock, shipping, returns | Price vs. the item's own 90-day median | Fit and quality |
| `travel` | Dates, availability, cancellation terms | Price vs. the route's fare calendar | **Prices move hourly.** Findings expire in a day |
| `services` | Licensed, insured, actually available | Quote vs. the local quote range | **Highest of all. You cannot return labour** |
| `subscriptions` | Cancellation path, lock-in, data export | Cost vs. usage you'll actually have | Silent renewal. The cost is the *tail*, not the sticker |
| `experiences` | Date, availability, refundability | Vs. comparable options that night | Low. Mostly taste |
| `knowledge` | — no purchase | — | Confident wrong answers |

`knowledge` is in here deliberately: "is X actually true", "which framework
should I learn", "how does Y work". It runs intake → research → a written answer
with sources, skipping judgment and verdict. Same provenance rules, no scoring.

## Why one general agent beats six narrow ones

The cross-category traits transfer, and this is the real payoff of the choice you
made. How you trade price against quality on a jacket **predicts** how you do it
on a hotel. Your tolerance for an unknown seller predicts your tolerance for an
unknown contractor. Your patience for a 6-week wait is a stable fact about you.

Those live in `profile/decision-profile.yaml`, separate from category taste, and
they accumulate evidence from *every* episode regardless of domain. Ten episodes
across six domains teach him more about how you decide than ten jacket episodes
would — which is what makes the general version get good faster, not slower, than
you'd expect.
