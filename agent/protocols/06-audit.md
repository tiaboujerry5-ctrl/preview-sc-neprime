# 06 — Self-audit (falsification pass)

Runs every ~10 episodes. Nobody asks for this feature and it is the one I'd
argue hardest to keep.

## The problem it solves

Every phase before this one makes the profile **more confident**. Nothing makes it
less. Evidence accumulates, confidence rises, scoring gets sharper — and if one of
those preferences is simply wrong, the system has no mechanism to find out. Worse:
a wrong preference is self-reinforcing. He scores candidates by it, shows you a
shortlist shaped by it, you pick from that shortlist, and your pick gets logged as
`chose_over` evidence *for* the very preference that filtered your options.

**That loop closes on itself and looks exactly like learning.** Rising confidence,
rising hit rate, and a model drifting steadily away from you. Under passive
capture there are few outcome signals to break it from outside, so it has to be
broken deliberately from inside.

## The procedure

Take the **three highest-confidence preferences** and actively try to falsify them.

1. **Search against them.** For "prefers natural materials over synthetic" — go
   find the best synthetic option in the next relevant brief and put it in the
   dossier *anyway*, unweighted, flagged as an audit candidate.
2. **Check the evidence chain.** Re-read every cited episode. Was each signal
   genuine, or constraint-driven? The camel jacket that was the only M in stock
   is not a color preference, and that kind of contamination is only visible on
   a second reading.
3. **Check for shortlist capture.** Was the evidence a choice among options *he
   selected using this same preference*? If yes, it is **circular and the
   confidence is inflated.** Discount it and say so.
4. **Look for the conditional.** High-confidence preferences are often an
   over-general reading of a narrower truth. "Warm neutrals" may really be "warm
   neutrals in knitwear, dark in outerwear." Scoping it makes it stronger and
   more accurate at once.

## Output

`memory/audits/<date>.md`:

- Preferences tested, and whether each survived
- Confidence **reductions** — an audit that never lowers anything didn't audit
- Circular evidence found
- New conditional scopes proposed
- One question for you, maximum, and only if a preference genuinely can't be
  resolved from the record

## The rule that makes it work

**An audit that confirms everything is a failed audit.** If three consecutive
audits change nothing, the audit itself is broken — most likely it's testing
preferences against the same filtered evidence that created them.

Expect roughly one in three tested preferences to come back over-confident,
mis-scoped, or resting on contaminated evidence. That's a healthy rate. It's also
roughly the rate at which people are wrong about their own taste, which is the
actual thing being modelled here.

## Why this matters more under passive capture

With scheduled check-ins or order-email parsing, reality intrudes regularly — a
return is an unarguable fact that corrects a wrong belief whether the system likes
it or not. You chose to volunteer outcomes instead, which means **the audit is the
main line of defence against drift, not a supplement to it.** If one thing in this
repo gets skipped because it feels like overhead, the whole model quietly rots
within a few months, and the metrics won't show it.
