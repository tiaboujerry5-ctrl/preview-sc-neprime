# Roadmap

All four framework questions are settled. This is the build order that follows.

| Decision | Choice | Consequence |
|---|---|---|
| **Autonomy** | L1 — holds accounts, never spends | No payment layer, no spend caps to build yet |
| **Scope** | Everything you'd otherwise research | Needs `taxonomy/` + `decision-profile.yaml` — both built |
| **Feedback** | You volunteer it; he never nags | Slower learning, `chose_over` weighted up, UI verdict taps matter |
| **Runtime** | Repo-native, git as memory | Zero infrastructure. Can't wake itself — acceptable at L1 |
| **Interface** | Minimal, type or speak | Moved up to Phase 2. See `INTERFACE.md` |

---

## Phase 0 — Cold start *(one sitting, with you)*

The profile is empty and that's correct — invented taste is confident fiction.
Three things can only come from you, and everything depends on them.

1. **`profile/identity.yaml`** — sizes, locale, climate, known fit issues. The
   fit issues ("sleeves always long") are worth more than any size label.
2. **`profile/constraints.yaml` + `taxonomy/categories.yaml` budget bands** —
   rough ceilings for the 3–4 domains you'll actually use. Verdicts sharpen them.
3. **Name him.** `PRIME` is a placeholder in `IDENTITY.md`.

Then **one real request**, run end to end in a session like this, to pressure-test
the loop before anything gets automated.

## Phase 1 — Manual loop *(~5 episodes, deliberately across different domains)*

Run the protocols by hand. No automation, no UI. The point is finding where the
framework is wrong while it's still cheap to change — these protocols are v1, not
scripture.

**Spread the episodes across domains on purpose** — one goods, one travel, one
service, one knowledge. That's what populates `decision-profile.yaml`, and those
traits are what make him useful in a domain he's never seen.

**Exit when:** questions-per-brief drops from ~4 to ~2, and the dossier shape
hasn't needed changing for two episodes running.

## Phase 2 — The interface *(moved up — you asked for it)*

Per `INTERFACE.md`, in this order:

1. Static shell — four surfaces, hardcoded dossier. **Buildable right now**, half
   a day, and it proves the layout before anything is wired.
2. Text input → real session → real dossier.
3. Voice — Web Speech API behind `lib/voice.ts`, live caption, **editable
   transcript before send** (non-negotiable; voice that mishears a brand name and
   fires anyway is voice you stop using).
4. **Verdict taps.** Don't defer this — given passive capture, three taps on a
   past dossier is the cheapest learning signal in the whole system, and the
   thing that keeps him from plateauing.

## Phase 3 — Wire the research tiers

- Search API + Playwright fetching (**already installed here**)
- **Price history — the single highest-leverage addition.** Without it, "good
  price" is guesswork and the `Value` score is decorative
- T3 community search (Reddit/forums) — where real sizing truth lives
- Domain-specific sources: fare calendars for `travel`, licence registries and
  quote-range data for `services`
- Sub-agents as genuinely parallel agents rather than sequential passes

## Phase 3.5 — The runner *(built)*

`runner/` plus `.github/workflows/prime.yml`. Scheduled jobs on GitHub Actions:
`watch` daily on Haiku, `audit` monthly on Opus, `episode` on demand. Memory is
git, so each run commits what it learned and any of it can be reverted.

Needs `ANTHROPIC_API_KEY` as a repo secret and Actions write permission. Seven
tools, no shell — see `runner/README.md` on why the permission model is tighter
than an attended session, not looser.

## Phase 4 — Depth and watchlists

- Watchlist price monitoring with absolute-value triggers
- Subscription renewal-date triggers (auto-added at recommendation time)
- `deep` tier machinery: second skeptic pass, failure-mode analysis, cooling-off
- Monthly self-written metrics review, including one proposed protocol change

---

## Known weak points

Worth naming now so they're not surprises later.

**1. Passive capture will plateau him.** Somewhere around 15–20 episodes,
confidence on most preferences stalls around 0.5–0.6, because hardening past
that needs outcome signals he isn't getting. The verdict taps in Phase 2 are the
mitigation, and they're why that phase shouldn't slip.

**2. `services` is the domain most likely to embarrass him.** Local contractors
are poorly indexed, quote ranges are opaque, and licence data is fragmented by
region. Irreversibility is 0.9 — the worst place to be wrong. Expect him to be
weakest exactly where the stakes are highest, and treat his services output as a
shortlist to call, never a recommendation to act on.

**3. Repo-native means he can't react in real time.** A fare drop at 3am goes
unnoticed until you open a session. Acceptable at L1, and the fix is a small
scheduled job, not the standalone service you turned down.

**4. Six domains at once risks being mediocre at all of them.** The depth tiering
and shared decision traits are the defence. If after ~10 episodes he's clearly
strong in `goods` and flailing in `travel`, the right move is to narrow the
taxonomy, not to add more machinery to it.
