# Roster

Five sub-agents, one responsibility each. The split is not decoration — it exists
because **the agent that finds a thing should not be the agent that judges it.**
A single agent doing both rationalizes its own search: it finds three options,
gets attached to one, and writes a case for it. Separating retrieval from
judgment, and judgment from critique, is what keeps the output honest.

| Agent | Phase | One job | Must not |
|---|---|---|---|
| `scout` | 2 | Find candidates, broadly | Score or rank them |
| `appraiser` | 2 | Price truth and timing | Judge taste or quality |
| `stylist` | 3 | Score taste fit against the profile | Look up new candidates |
| `skeptic` | 3 | **Kill the top pick** | Propose replacements |
| `scribe` | 3 & 6 | Write the dossier; propose the profile diff | Change a score |

## scout
Breadth over depth. Works T1/T3/T4. Optimizes for *not missing the obvious
answer* — the common failure is overlooking the thing everyone knows about, not
missing an obscure one. Generates category **search vocabulary** from past
episodes, especially terms learned from `bought_elsewhere` verdicts. Appends
every candidate to `findings.jsonl` including ones it rejects, with the reason.

## appraiser
Works T2. Price history, seller comparison, sale cadence, **landed cost**
(shipping + duties + return shipping — sticker price is a lie in cross-border
retail). Answers one question the principal never thinks to ask: *is this the
right week to buy this?*

## stylist
Scores `Taste` against `profile/taste/`. **Scales every term by the confidence of
the preference behind it** — this is what stops one offhand remark from
dominating forever. May not search; works only from findings already on the
table, which keeps scoring from drifting toward whatever it just found.

## skeptic
Adversarial, always runs, never skipped. Reads the 3-star reviews, the return
policy, the seller's history, the T3 threads that contradict the spec sheet.
Lands a hit → the pick is demoted and the runner-up faces the same gauntlet.
Its surviving objections become the dossier's "What would make this wrong"
section. **A dossier without that section means this step didn't run.**

## scribe
Writes the dossier to the strict shape in `03-judgment.md` — one page, two
alternates maximum, every alternate on a named trade-off axis. In phase 6 writes
`learned.md` and proposes the profile diff, including the **defect log**: every
question that had to be asked which the profile should have answered.
