# Trials

A self-model is a claim. This is how you test it.

## Why

`SELF.md` is a document you wrote about yourself. That makes every line a
hypothesis, not a fact — it can be flattering, tidy, or simply out of date, and
nothing in the file would tell you. A trial seals a prediction about how you
will answer a question, *before* you answer, then compares. Only that comparison
counts as evidence. Architecture and vibes do not.

## The loop

```
probe → seal → you answer → verify
```

1. **Probe.** The agent writes held-out questions aimed at one claim in
   `SELF.md`, without quoting it.
2. **Seal.** Before you answer, the agent writes its prediction to a file,
   hashes it (sha256), and commits only the hash. The prediction itself never
   enters git or chat.
3. **You answer.** In your own words, plus one line of why. Never a bare letter —
   a lone "y" once meant its opposite.
4. **Verify.** The agent re-hashes to prove the prediction predates your answer,
   scores it, and proposes an edit to `SELF.md` that you approve or reject.

The hash is the whole trick. It lets *"I predicted this before you told me"* be
checkable without ever showing the prediction in advance — which would bias the
very answer it is trying to measure.

## Seal the shape, not the side

A yes/no question flattens a spectrum answer into a point, then mis-scores it.
So each question seals a *shape*:

- **Threshold** — one axis, about five ordered variants from light to heavy. You
  mark the last one you would still do. Seal the cutoff.
- **Weight** — split N points across the options instead of picking one. Seal the
  split.
- **Flip-condition** — a forced choice, then "what one thing would flip your
  answer." Seal the variable, not the side.
- **Degree** — 0 to 10 on a disposition. Seal a narrow range (6–8, not "high").

A precise seal is falsifiable. A vague one fits any answer and scores as a miss
for the predictor, which is the point.

## Scoring

Continuous, 0..1, not hit-or-miss:

- threshold: `1 − |predicted − actual| / axis_length`
- weight: `1 − L1(predicted, actual) / 2`
- flip-condition: `1` if the named axis matches, else `0`
- degree: `1` if actual falls in range, graded down by distance outside

Feed that outcome into a Brier score against the confidence the predictor stated
at seal time. That number measures the agent's calibration, not you.

## What it measures over time

- **Stability** — the same claim probed under different framings, weeks apart. A
  claim that flips gets demoted out of the frozen layer into `CURRENT.md`.
- **Layer value** — predict the same answers under increasing context (nothing →
  `SELF` → `+CURRENT/CHARTER`). A layer that adds no accuracy is not earning its
  place.
- **Calibration** — whether the agent's confidence is honest.

## Privacy

- `seals.log` and `results.md` live in git: hashes and aggregate scores only.
- `rounds/` holds your raw questions and answers. It is gitignored. Your answers
  never leave your machine.

```
trials/
  TRIALS.md      this file
  seals.log      date · round · sha256 · layers · types        (git)
  results.md     per-round scores, running stability + Brier    (git)
  rounds/        gitignored — questions.txt, prediction.txt, your-answers.txt
```

## For the agent

Read this file before a round. You write the questions and the prediction; the
principal answers; you verify against the sealed hash, never against your current
read of them. Rules that keep it honest:

- Do not quote or paraphrase a `SELF.md` sentence in a question.
- Write the prediction only into the gitignored file — never into git, chat, or
  any `.md`.
- Score the sealed shape literally. The continuous scale already gives partial
  credit for "nearly", so do not round a near-miss up because the direction felt
  right. That inflation hides exactly what trials exist to catch.
- A single off-shape answer is a point on a slope, not a flip. Do not demote a
  claim on one framing alone.
