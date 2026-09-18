# Runner — PRIME without you present

The framework describes what PRIME does. This is what *runs* it when you're not
in a Claude app.

## The idea

PRIME's memory is files in git. That makes the runner almost trivial: a
scheduled job checks out the repo, runs the agent with filesystem and web tools,
and commits what changed. Every run is a commit you can read, diff and revert —
the audit trail comes free.

```
  cron ──▶ checkout ──▶ Claude Agent SDK ──▶ writes to memory/ + profile/
                             │                        │
                       web search,               commit + push
                       file read/write                 │
                                                  your repo
```

## Why the Agent SDK and not the raw API

`@anthropic-ai/claude-agent-sdk` ships the harness Claude Code itself uses: the
agent loop, context management, and built-in Read / Write / Edit / Glob / Grep /
WebSearch / WebFetch tools. PRIME's protocols are written for exactly those
primitives — read the profile, search, write an episode file. Using the raw
Messages API would mean reimplementing all of it.

It is a **harness**, not a deployment: you still host it. That's what the
workflow below is for.

## Three ways to host it

| | Where | Cost | Real-time? | Setup |
|---|---|---|---|---|
| **GitHub Actions** *(start here)* | GitHub's runners | ~free | No — ~5 min granularity | One workflow file |
| **Managed Agents** | Anthropic-hosted | API + platform | Yes — scheduled deployments, vault credentials | Agent config |
| **Your own box** | VPS / Raspberry Pi | ~$5/mo | Yes | You maintain it |

**Start with Actions.** It matches the git-as-memory design exactly, costs
nothing, and the only thing it can't do is react within seconds. Move to Managed
Agents when you want price alerts that fire in minutes rather than on a cadence —
it runs the loop *and* hosts the sandbox, and its vault credentials solve the
secrets problem properly (substituted at egress, never visible to the agent).

## What runs on a schedule

Two jobs, deliberately separate because they have different costs:

- **`watch`** (daily) — check watchlist prices and stock against their triggers.
  Mechanical, no judgment. Runs on `claude-haiku-4-5`.
- **`audit`** (monthly) — the falsification pass from `protocols/06-audit.md`,
  plus the metrics review. Needs real judgment. Runs on `claude-opus-5`.

Research episodes stay **on demand** — they start with a request from you, so
there's nothing to schedule.

## Cost

At roughly 20 episodes a month, `claude-opus-5` at $5/$25 per million tokens in
and out, web-search results dominating input:

- episodes: ~$15/mo
- daily watch job on Haiku: ~$1/mo
- monthly audit: ~$1/mo

**~$15–20/month.** The split matters: the watch job is a loop that compares
numbers, so paying Opus rates for it is waste. Judgment work stays on Opus —
that's the part where being wrong is expensive.

## Setup

1. `ANTHROPIC_API_KEY` as a repository secret
2. Optionally `BRAVE_API_KEY` / `KEEPA_API_KEY` for better search and price history
3. Commit `.github/workflows/prime.yml`
4. Give Actions write permission: Settings → Actions → General → Workflow
   permissions → Read and write

Then `watch` runs daily, `audit` monthly, and you can fire either by hand from
the Actions tab.

## The permission model — read this before changing it

The runner grants exactly seven tools:

```
Read · Write · Edit · Glob · Grep · WebSearch · WebFetch
```

and explicitly denies `Bash`, `Task`, and `NotebookEdit`.

It deliberately does **not** set `permissionMode: "bypassPermissions"`. That
setting auto-approves *any* tool, including ones a future SDK version adds. The
allowlist is the approval mechanism instead: listed tools run unprompted,
everything else is refused. **An unattended agent should be able to do less than
an attended one, not more** — nobody is watching, so the blast radius has to be
bounded by configuration rather than by judgment.

Consequences worth knowing:

- **No shell.** PRIME cannot run commands, install anything, or touch the
  network except through WebSearch/WebFetch.
- **The commit step is scoped** to `agent/memory` and `agent/profile` in the
  workflow, so even a misbehaving run cannot commit code changes.
- **Profile writes are proposals.** The episode job writes `learned.md`; it does
  not edit `profile/` directly. The audit job may adjust confidence, and every
  change lands as a reviewable diff you can revert.

If you ever find yourself wanting to add `Bash` to get something done, that's a
signal the task belongs in a normal session with you present, not in a cron job.
