# 02 — Research

**Goal:** produce qualified candidates with provenance, not a pile of links.

## Source tiers

Findings are tagged with the tier they came from. Tier drives how much a claim is
trusted — and the tiers disagree with each other in predictable, useful ways.

| Tier | Source | Trust it for | Never trust it for |
|---|---|---|---|
| **T0** | Own memory — past episodes, verdicts | What was already rejected and why | Current price or stock |
| **T1** | Brand / official retailer | Specs, materials, official sizing | Whether it actually fits |
| **T2** | Marketplaces, price aggregators, price history | Street price, stock, price floor | Quality, authenticity |
| **T3** | Community — forums, Reddit, review threads | **Real sizing, durability, regret** | Price, availability |
| **T4** | Editorial — "best of" guides, reviews | Discovering candidates | Anything evaluative |

**T3 is the highest-value tier and the one most agents skip.** Official sizing
charts lie by omission; a forum thread where six people say "runs a full size
small in the shoulders" is worth more than the spec sheet. Search T3 with the
product name plus the words people actually use when disappointed: *sizing,
shrunk, returned, after a year, pilling, true to size.*

**T4 is a lead generator, not evidence.** Most "best of" content is affiliate-
driven. Take the candidate names, discard the verdicts, re-derive from T1–T3.

## Evidence rules

1. **Three independent sources before a price claim.** Independent means different
   ownership — three sites running the same affiliate feed is one source.
2. **Every finding carries `retrieved_at`.** A price without a timestamp is a
   rumor. Anything older than 72h gets re-verified before it enters a dossier.
3. **Anchor on street price history, not MSRP.** "40% off" against an inflated
   list price is discount theater. Value is measured against the item's own
   90-day median and its observed floor.
4. **Record the rejects.** A candidate eliminated in phase 2 is appended to
   `findings.jsonl` with its rejection reason. That's the "why not" list later,
   and it's what keeps him from re-suggesting a thing you already turned down.
5. **Never fabricate a spec to fill a field.** Unknown is `null`, and `null` in a
   field that matters is itself a finding — it usually means a thin seller.

## Fan-out

`scout` and `appraiser` run in parallel and append to the same `findings.jsonl`.

- **scout** — breadth. Discover candidates across T1/T3/T4. Optimizes for *not
  missing the obvious answer*, which is the more common failure than missing an
  obscure one.
- **appraiser** — depth on price. Price history, seller comparison, sale cadence,
  total landed cost (**shipping + duties + return shipping**, not sticker).

Stop when: ≥5 candidates pass every hard gate, **or** two consecutive search
rounds surface nothing new. Diminishing returns is a reason to stop, not to
broaden the query — broadening at that point usually means drifting off-brief.

## Timing intelligence

Consumer categories have sale cadences. Before recommending a buy, the appraiser
checks: is this within a few weeks of a known seasonal low for the category? If
so the dossier says **buy now / wait until ~X** with the reason. "Wait three
weeks" is frequently the most valuable output of the whole run.

## Access reality

Some retailers block automation. In order of preference: official API or
affiliate feed → price-history service → real browser session (Playwright is
available in this environment) → ask the principal to grab the page. Never
attempt to defeat a site's access controls; when a source is closed, record it
as `blocked` in the finding and move on.
