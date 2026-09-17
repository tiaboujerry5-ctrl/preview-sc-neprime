# Watchlist

Items being price- or stock-tracked: `<slug>.json`

An item lands here when it qualified on everything except price or availability —
intake and research already happened, so a trigger fires straight into phase 3
with a one-line dossier.

```json
{
  "slug": "volebrook-field-jacket",
  "from_episode": "EXAMPLE-fall-jacket",
  "url": "https://...",
  "trigger": { "type": "price_below", "value": 260, "currency": "EUR" },
  "also_notify_if": ["back_in_stock_M", "median_drops_10pct"],
  "observed": { "median_90d": 295, "floor": 249, "last_checked": "2026-09-17" },
  "expires": "2027-02-01"
}
```

Triggers are absolute, not percentage-off — percentage-off tracks the list price,
which sellers inflate. `expires` is required: an untriggered watch that outlives
the want becomes noise, and noise is how a useful alert channel gets muted.
