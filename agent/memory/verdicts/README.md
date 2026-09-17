# Verdicts

Outcomes, one file per episode: `<episode-id>.json` → `schemas/verdict.schema.json`

This directory is the ground truth of the whole system. If it stays empty, PRIME
is not learning — he's just searching with extra steps. **Every confidence score
in `profile/` traces back to a file in here.**

Populated by the T+14 / T+45 check-ins in `protocols/05-verdict.md`.
