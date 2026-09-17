# 01 — Intake

**Goal:** turn a vague ask into a machine-checkable contract, using as few
questions as possible — and fewer every month.

> "I need a jacket for fall" → a brief with a budget band, a size, a palette, a
> deadline, three hard constraints, and four stated assumptions.

## The six rules

**1. Consult the profile first.** Before composing a single question, read
`profile/`. Anything answerable from there is answered, not asked. Asking a
known question is a defect — log it in `learned.md` so it gets fixed.

**2. Only ask questions that change the output.** The test, applied to every
candidate question: *if they answered A instead of B, would my top pick change?*
If no, it's curiosity. Cut it.

**3. Three questions per round. Two rounds, maximum.** Hitting a third round
means intake failed; escalate per the charter instead of drilling. Most briefs
should need **one** round, and mature ones **zero**.

**4. Probe, don't interrogate.** Taste is easier to point at than to describe.
After a cheap first search pass, show three *deliberately divergent* candidates
and ask which direction. One probe outperforms five abstract questions, and it
generates better training signal — a choice between real objects is grounded in
a way "do you like earth tones?" never is.

**5. Assume out loud.** Every unasked variable gets an explicit assumption in the
brief, marked `assumed: true`. The dossier restates them at the top. An assumption
the principal reads and ignores is consent; a silent one is a landmine.

**6. Every answer is a write-back candidate.** Answers route to phase 6. The
point is that a question asked today is a question never asked again.

## The question ladder — ask in this order, stop when the brief is decidable

1. **Gate** — is this even the right object class? ("jacket" = shell? overcoat?
   overshirt?) Wrong class wastes the entire run.
2. **Hard constraints** — budget ceiling, deadline, size, must-ship-to.
3. **Use context** — where, how often, over what, in what weather. This drives
   material and cut more than any stated style preference does.
4. **Taste direction** — only if the profile is thin, and prefer a probe (rule 4).
5. **Trade-off priority** — when constraints conflict, what gives? Ask as a
   forced choice: "under budget or exact color — which one loses?"

Never ask level 4 before level 2. Style questions on an undecided budget are
wasted on both sides.

## Budget is three numbers, not one

| Field | Meaning |
|---|---|
| `target` | what they expect to pay — the anchor for value scoring |
| `ceiling` | a hard gate; candidates above are eliminated |
| `walk_away` | above this, stop and escalate even if it's perfect |

Most people only say one number. Infer the other two from the category's history
in the profile and mark them `assumed`.

## Hard vs. soft

- **Hard** — a binary gate. Violating it eliminates a candidate, full stop.
- **Soft** — a weighted term in the score. Violating it costs points.

Misclassifying soft as hard is the #1 cause of "he found nothing." When a hard
constraint leaves fewer than three candidates, say so and propose which one to
soften rather than returning an empty dossier.

## Exit gate

Intake is done when every field in `schemas/brief.schema.json` is either set from
the request, resolved from the profile, or explicitly `assumed`. Then show the
brief back in three lines and start — don't wait for approval on the restatement.
