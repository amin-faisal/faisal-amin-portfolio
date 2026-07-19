# Case study content template

Fill this out once per project. Everything here maps 1:1 to a `CASE_STUDIES`
entry in `src/data/content.js`. Copy the **blank block** at the bottom for each
project, fill it in, and send it back — I'll wire it into the site.

Live reference of a filled-in template: `/work/modalys`

---

## Field guide

Every case study has these fields. Length hints are guidance, not hard limits —
the layout flexes.

### Header
| Field | What it is | Guidance |
|-------|-----------|----------|
| **slug** | URL id → `/work/<slug>` | lowercase, no spaces (e.g. `octilearn`) |
| **project** | Company / product name | e.g. `OctiLearn` |
| **tag** | Category chip | 1–3 words (e.g. `EdTech Platform`) |
| **title** | The headline of the study | ~5–10 words, outcome-oriented |
| **subtitle** | One-line summary under the title | ~15–30 words |
| **img** | Hero image | a URL, or upload a file to `/public` and tell me the name |
| **published** | Date shown in the author row | e.g. `July 2026` |
| **readTime** | e.g. `4 min read` | your call |

### Meta strip
| Field | What it is | Guidance |
|-------|-----------|----------|
| **role** | Your role on the project | e.g. `Product Designer` |
| **timeline** | When | e.g. `Aug 2024 — Jul 2025` |
| **scope** | List of what you did | 3–5 short items (chips) |

### The three pillars (required)

**1. Challenge** — what problem / constraints you walked into.
- `intro`: 2–4 sentences setting up the problem.
- `points`: 3–5 bullets of the specific hard parts.

**2. Solution** — what you did about it.
- `intro`: 2–4 sentences on your approach.
- `points`: 3–5 bullets of concrete design moves.

**3. Outcome** — what changed as a result.
- `intro`: 1–3 sentences on the result.
- `metrics`: exactly 3 tiles, each a big `value` + short `label`
  (e.g. value `3,000+`, label `pre-launch sign-ups`).
- `points`: 2–4 bullets of softer wins that aren't numbers.

---

## Blank block — copy one per project

```
PROJECT: 
SLUG: 
TAG: 
TITLE: 
SUBTITLE: 
HERO IMAGE: 
PUBLISHED: 
READ TIME: 

ROLE: 
TIMELINE: 
SCOPE: 
  - 
  - 
  - 

CHALLENGE
  Intro: 
  Points:
  - 
  - 
  - 

SOLUTION
  Intro: 
  Points:
  - 
  - 
  - 

OUTCOME
  Intro: 
  Metrics (exactly 3):
  - value:          label: 
  - value:          label: 
  - value:          label: 
  Points:
  - 
  - 
```

---

## Projects still needing content
- [x] Modalys — *draft in place, replace when ready*
- [ ] OctiLearn
- [ ] Alpherra
- [ ] Crop.photo
- [ ] Patient Portal
- [ ] Elements Learning
