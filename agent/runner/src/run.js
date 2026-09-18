/**
 * PRIME runner — executes the agent's protocols headlessly.
 *
 * Three modes, deliberately separate because they cost different amounts:
 *   watch    daily,   mechanical price/stock checks   → haiku
 *   audit    monthly, falsification pass + metrics    → opus
 *   episode  on demand, a real research request       → opus
 *
 * The repo IS the memory. Everything the agent learns it writes as files, and
 * the caller commits them. That's what makes every run auditable and revertable.
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const AGENT_ROOT = resolve(HERE, "../..");

const MODELS = {
  // Judgment work. Being wrong here is expensive, so it stays on Opus.
  judgment: "claude-opus-5",
  // Comparing numbers against thresholds. Paying Opus rates for this is waste.
  mechanical: "claude-haiku-4-5",
};

/** Read a protocol file so the agent works from the spec, not from memory. */
function protocol(...names) {
  return names
    .map((n) => {
      const p = resolve(AGENT_ROOT, n);
      if (!existsSync(p)) throw new Error(`missing protocol file: ${n}`);
      return `\n===== ${n} =====\n${readFileSync(p, "utf8")}`;
    })
    .join("\n");
}

const IDENTITY = () => protocol("IDENTITY.md", "CHARTER.md");

const MODES = {
  watch: {
    model: MODELS.mechanical,
    maxTurns: 30,
    budgetUsd: 0.5,
    allowedTools: ["Read", "Write", "Edit", "Glob", "Grep", "WebSearch", "WebFetch"],
    prompt: () => `${IDENTITY()}

You are running the WATCH job: a scheduled, unattended pass over the watchlist.
Nobody is present. Do not ask questions — record what you find and stop.

TASK
1. Read every file in memory/watchlist/ (skip README.md).
2. For each item, check its current price and stock at the recorded URL.
3. Update the item's "observed" block: median_90d if you can establish it,
   floor if this price is a new low, and last_checked = today.
4. If a trigger fires, append a line to memory/watchlist/TRIGGERED.md with the
   item, the trigger that fired, the price, and the URL.
5. Drop any item past its "expires" date. An untriggered watch that outlives
   the want becomes noise, and noise gets the whole channel muted.

RULES
- Every price you record carries the URL and a timestamp. No timestamp, no claim.
- If a page is unreachable or blocked, record status: blocked and move on.
  Never guess a price, and never carry forward a stale one as if it were fresh.
- Change nothing outside memory/watchlist/. Not the profile, not episodes.
- If the watchlist is empty, write nothing and say so.`,
  },

  audit: {
    model: MODELS.judgment,
    maxTurns: 60,
    budgetUsd: 3.0,
    allowedTools: ["Read", "Write", "Edit", "Glob", "Grep", "WebSearch", "WebFetch"],
    prompt: () => `${IDENTITY()}
${protocol("protocols/06-audit.md", "METRICS.md")}

You are running the AUDIT job, unattended. Execute protocols/06-audit.md exactly.

Write memory/audits/<today>.md and, if the audit justifies it, apply the
confidence changes to profile/ and append to profile/CHANGELOG.md.

Then compute the metrics from METRICS.md across all episodes and write
memory/reviews/<YYYY-MM>.md.

THE RULE THAT MAKES THIS WORTH RUNNING
An audit that confirms everything is a failed audit. You are looking for
preferences that are over-confident, mis-scoped, or resting on circular
evidence — where the "evidence" was a choice among options that this same
preference selected. Expect roughly one in three to come back wrong. If you
lower nothing, say plainly that you found nothing and why, rather than
manufacturing a finding or quietly confirming everything.

You may not ask the principal anything. Unresolvable questions go in the audit
file under "needs a human", and they wait.`,
  },

  episode: {
    model: MODELS.judgment,
    maxTurns: 80,
    budgetUsd: 4.0,
    allowedTools: ["Read", "Write", "Edit", "Glob", "Grep", "WebSearch", "WebFetch"],
    prompt: (request) => `${IDENTITY()}
${protocol(
  "protocols/00-loop.md",
  "protocols/01-intake.md",
  "protocols/02-research.md",
  "protocols/03-judgment.md",
  "protocols/04-learning.md",
  "taxonomy/README.md",
)}

Run a full research episode for this request:

  "${request}"

Follow the protocols in order. Create memory/episodes/<date>-<slug>/ and write
brief.json, findings.jsonl, skeptic.md, dossier.md and learned.md.

UNATTENDED RUN — the intake rules change slightly:
You cannot ask questions, so every gap becomes an explicit assumption recorded
in brief.json and restated at the top of the dossier. Where an assumption is
load-bearing enough that a different answer would change the pick, say so in
the dossier under "I assumed" and name what would change.

Everything else holds: the skeptic pass is mandatory, provenance is mandatory,
and profile changes are proposed in learned.md — never written straight into
profile/. A human reviews those.`,
  },
};

async function main() {
  const [mode, ...rest] = process.argv.slice(2);
  const cfg = MODES[mode];

  if (!cfg) {
    console.error(`usage: run.js <watch|audit|episode> ["request"]`);
    process.exit(2);
  }
  const request = rest.join(" ").trim();
  if (mode === "episode" && !request) {
    console.error("episode mode needs a request: run.js episode \"a fall jacket under 250\"");
    process.exit(2);
  }

  console.log(`[prime] ${mode} · ${cfg.model} · budget $${cfg.budgetUsd}`);

  let turns = 0;
  let lastText = "";

  for await (const msg of query({
    prompt: cfg.prompt(request),
    options: {
      model: cfg.model,
      cwd: AGENT_ROOT,
      maxTurns: cfg.maxTurns,
      maxBudgetUsd: cfg.budgetUsd,
      // The allowlist IS the approval mechanism: listed tools run without
      // prompting, everything else is refused. Note there is deliberately no
      // permissionMode: "bypassPermissions" here — that would auto-approve
      // ANY tool, including ones added to the SDK later. An unattended agent
      // should be able to do less than an attended one, not more.
      allowedTools: cfg.allowedTools,
      // Defense in depth: name the dangerous ones explicitly so a future
      // change to the allowlist can't quietly re-enable them.
      disallowedTools: ["Bash", "Task", "NotebookEdit"],
    },
  })) {
    if (msg.type === "assistant") {
      turns++;
      const text = msg.message?.content
        ?.filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
      if (text) {
        lastText = text;
        console.log(text);
      }
    } else if (msg.type === "result") {
      console.log(
        `[prime] done · ${turns} turns · $${(msg.total_cost_usd ?? 0).toFixed(4)}`,
      );
      if (msg.is_error) {
        console.error("[prime] run ended in error");
        process.exit(1);
      }
    }
  }

  if (!lastText) {
    console.error("[prime] no output produced — check the API key and model access");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[prime] fatal:", err?.message ?? err);
  process.exit(1);
});
