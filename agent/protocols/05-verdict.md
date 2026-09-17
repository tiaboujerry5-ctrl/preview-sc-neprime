# 05 — Verdict (passive capture)

**Verdicts are the only ground truth in the system.** Every confidence score in
`profile/` traces back to one. You chose to tell him outcomes yourself rather than
have him schedule check-ins or read your email — so this protocol is built around
capturing what you volunteer, and inferring the rest from how you talk.

That choice has a cost, and the honest version of it is at the bottom of this
file rather than buried. But it can be engineered around, and this is how.

## Rule 1 — He never nags

No scheduled check-ins. No "just following up!" No notification that an episode
is 14 days old. The moment this feels like a system with expectations of you, you
stop using it, and an agent you avoid is worth nothing.

## Rule 2 — Mine the conversation for implicit verdicts

Most outcomes arrive in ordinary speech, unmarked. He listens for them. **This is
the primary capture mechanism**, not a fallback.

| What you say | Inferred | Signal | Confidence |
|---|---|---|---|
| "I need another one of those" | `kept_and_reused` | **1.0** | high |
| "that jacket's been great" | `kept_and_reused` | 1.0 | high |
| "I sent it back" / "didn't fit" | `returned` | **−0.8** | high |
| "I went with X instead" | `bought_elsewhere` | search gap | high |
| "never got round to it" | `skipped` | brief or timing was off | high |
| "the last one you found me…" *(neutral)* | `purchased` | 0.7 | medium |
| New request, same category, soon after | ⚠️ **probe, never assume** | — | — |

The last row is a trap worth naming. A second jacket request could mean the first
one failed, or that it worked so well you want another. Those are opposite
signals. He asks — one line, in passing — rather than guessing.

## Rule 3 — One question, folded in, capped

At the start of a session he glances at open episodes. If one is unresolved and
naturally adjacent to what you're already talking about, he folds in **one**
question — conversational, not a form:

> "Before that — did the boots work out?"

Hard caps: **one episode per session, one question, never repeated.** Declined or
ignored → the episode is marked `unknown` and never raised again. That cap is
what keeps this from becoming the scheduled check-ins you turned down.

## Rule 4 — The next request is feedback on the last answer

For `knowledge` episodes especially, a follow-up question tells him whether the
answer landed. "Wait, but what about X" means the answer had a hole. He logs it
against the episode. Free signal, zero friction, and it's the only feedback that
domain ever gets.

## Rule 5 — Unknown is recorded honestly, never inferred from silence

Silence is not a signal. An episode with no outcome is `unknown`, it teaches
nothing, and he does not quietly assume it went fine because you didn't complain.

## What this costs, stated plainly

Expect **40–60% of episodes to end `unknown`.** Consequences, and the
compensations built in:

| Consequence | Compensation |
|---|---|
| The strongest signal (`kept_and_reused`) is rare | `chose_over` — which he observes directly at decision time and needs nothing from you — is weighted up from 0.6 to **0.7** |
| Confidence builds slower | Learning rate is *deliberately* slower. Preferences take 4–5 episodes to harden instead of 3 |
| Silent failures — a bad rec he never hears about | The skeptic pass matters more, not less. It's the only quality control left |
| Metrics 3 and 4 (hit rate, regret) get thin | Metric 1 (questions per brief) becomes the headline. It needs no verdicts at all |

**One thing worth knowing now, so it isn't a surprise later:** he tracks
`unknown_rate`. If it stays above 60% across 10+ episodes, he says so **once** —
not as a nag, as a fact, with the two options you turned down and what they'd
buy you. Then he drops it permanently. You can change your mind; he won't ask
twice.

## The good news

`chose_over` is the signal he gets for free, every single time, without you doing
anything — you picked one of the three things he showed you, and *that choice
against known alternatives is real revealed preference.* It's weaker than
"still wearing it 45 days later," but it is honest, immediate, and it arrives on
every episode. The system learns from decisions rather than outcomes. That works.
