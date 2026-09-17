# Roadmap

Deliberately no interface work. The framework has to be right first — an
interface over a bad memory model just makes the bad model faster.

## Phase 0 — Cold start *(one sitting, with you)*

The profile is empty and that's correct: invented taste is confident fiction.
But three things can only come from you, and everything else depends on them.

1. **`profile/identity.yaml`** — sizes, locale, climate, known fit issues. The
   fit issues ("sleeves always long") are worth more than any size label.
2. **`profile/constraints.yaml`** — budget bands for your top 3 categories. Rough
   is fine; verdicts sharpen them.
3. **Charter level** — confirm L1, or state the cap if you want L2.

Then **one real request**, run manually end to end, to pressure-test the loop
before anything is automated.

## Phase 1 — Manual loop *(~5 episodes)*

Run the protocols by hand in sessions like this one. No automation. The goal is
finding out where the framework is wrong while it's still cheap to change — the
protocols are v1, not scripture.

**Exit when:** questions-per-brief has dropped from ~4 to ~2, and the dossier
shape hasn't needed changing for two episodes running.

## Phase 2 — Wire the tiers

- Search API + Playwright fetching (**already installed here**)
- **Price history — the highest-leverage single addition.** Without it, "good
  price" is guesswork and the `Value` score is decorative
- T3 community search (Reddit/forums) — where real sizing truth lives
- Sub-agents as actual parallel agents rather than sequential passes

## Phase 3 — Close the loop automatically

- Scheduled T+14 / T+45 verdict check-ins
- Watchlist price monitoring with trigger thresholds
- Monthly metrics review, self-written
- *(Optional, consent-gated)* Gmail order-confirmation parsing for automatic
  purchase/return ground truth

## Phase 4 — Interface

Only now. And by this point you'll know what it needs to show, because you'll
have five months of dossiers telling you what you actually reach for.

Note: this repo already runs React + Supabase. If the memory layer ever outgrows
flat files, Supabase is the path already wired — but **flat files in git for as
long as possible.** Git gives versioning, diffing, audit and rollback on the taste
model for free, and those are the properties that matter most here. Moving to a
database trades all of them for query speed you probably don't need.

---

# Open questions — these fork the design

Four decisions that change the structure, roughly in order of impact.

### 1. Autonomy ceiling
Does he ever **act** — buy, subscribe, message a seller — or stay advisory
forever? Determines whether we build the credential, spend-cap and audit layer at
all. Currently **L1**: holds accounts, builds carts, never submits.

### 2. Scope
Clothes and physical products only, or **everything you'd otherwise research** —
travel, tech, services, contractors? A general researcher needs a category
taxonomy and per-category scoring weights; the narrow version can hardcode one
good clothing rubric and be better at it sooner.

### 3. How he learns outcomes
The verdict loop is the only ground truth in the system, and it's the thing most
likely to quietly not happen. Options: you tell him, scheduled check-ins, or
Gmail parsing of order confirmations. Gmail is by far the strongest signal and
the most invasive — a real trade, and your call.

### 4. Where he lives
Sessions in this repo (works today, zero infrastructure, git-native memory) or a
standalone always-on service (needed for real-time price alerts, but you're
maintaining infrastructure). **Recommendation: repo-native through Phase 3.** The
only thing it can't do is wake up on its own — and scheduled routines cover most
of that.
