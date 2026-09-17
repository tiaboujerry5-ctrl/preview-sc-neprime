# Access — accounts, keys, and data sources

## On giving him his own account

Giving PRIME a dedicated account is the right instinct, and it's worth being
precise about *which* version of that idea actually works.

**Works — and is what you want:** a dedicated identity **in your name** — its own
email address (or a `+alias`), its own API keys on a paid tier, its own logins at
retailers you already use. Separate from your personal accounts so his activity is
isolated, his spend is legible, and you can revoke him without touching your own
life. Paid API tiers are what genuinely remove rate limits, and they are cheap at
this volume — tens of dollars a month, not hundreds.

**Doesn't work:** a fabricated identity to get around rate limits or ToS. It
fails on its own terms, not just on principle — fake accounts get flagged and
banned mid-task, usually at the worst moment, and every ban means rebuilding
session state and losing continuity. You'd be maintaining an infrastructure
problem instead of using a research agent. A real account on a paid tier gives
higher limits than any number of throwaways, and it doesn't evaporate.

Same line on retail: use the anti-bot-friendly path (official APIs, affiliate
feeds, price-history services, a real browser session logged into a real account).
Where a site is genuinely closed, he records `blocked` and routes around it. He
won't defeat access controls — not as a lecture, just as a scoping fact so you
know what he'll do when he hits a wall.

## What he needs, in build order

### Tier 1 — makes him work at all
| Need | Options | Notes |
|---|---|---|
| Web search API | Brave Search, Tavily, Exa | Brave is cheapest per query; Exa is better at semantic/"find me things like this" |
| Page fetching | Playwright (**already installed here**) | `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Don't run `playwright install` |
| Own email | Gmail alias or dedicated address | Account signups, order confirmations, seller contact |

### Tier 2 — makes him good
| Need | Options | Notes |
|---|---|---|
| Price history | Keepa (Amazon), camelcamelcamel, retailer feeds | **The single highest-leverage add.** Without it, "good price" is guesswork |
| Structured retail data | Affiliate feeds, Shopify JSON endpoints | Many Shopify stores expose `/products.json` publicly — clean, fast, legitimate |
| Community search | Reddit API, forum search | T3 tier. Where real sizing truth lives |

### Tier 3 — makes him autonomous
| Need | Notes |
|---|---|
| Retailer accounts | For carts, wishlists, stock alerts. L1 charter: he holds, never submits |
| Payment instrument | **Only at L2.** Use a virtual card with its own limit — the cap enforces itself |
| Scheduling | For watchlist checks and T+14/T+45 verdicts. Routines already available here |

## Secrets handling

Non-negotiable, and enforced by `.gitignore`:

- **Nothing secret in this repo.** Not keys, not cookies, not card numbers.
- Keys live in environment variables or the platform's secret store.
- `agent/.env.example` lists the variable *names*; `.env` is never committed.
- Episodes may cite public URLs freely. They may not embed logged-in page content
  carrying account identifiers.
- Payment credentials live in the account's own vault. **Never in agent memory** —
  this is the one rule with no exception and no convenience override.
