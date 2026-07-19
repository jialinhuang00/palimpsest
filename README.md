<p align="center">
  <img src="assets/palimpsest.svg" width="88" alt="Palimpsest" />
</p>

# Palimpsest

*A boilerplate for giving your AI agent a governed self — an ego that acts, a superego that holds the line, an ālaya that remembers.*

Your agent has no memory of you.

Every session it wakes up blank and is rebuilt from a written record: the transcript, a handful of instruction files, whatever you left on disk. Nothing is carried in its head. The record *is* the self. Most setups leave that record to chance — a sprawling `CLAUDE.md`, some scattered notes, no rule about what may enter or how it changes.

Palimpsest treats the record as the thing worth governing. It gives you a small constitution for your agent, keeps *who you are* separate from *how the agent acts*, and adds enforcement a prompt cannot talk its way past.

## The idea

A palimpsest is a manuscript scraped clean and written over, where the older text still bleeds through beneath the new. That is what an agent's memory already is: each session writes over the last, and the earlier layers keep showing through.

So the question is not *how do I give my agent a perfect memory*. It is *what do I let into the record, and how does it change*. That is a governance problem, not a storage one.

## The prosthetic ālaya

Sixteen hundred years ago, Yogācāra Buddhism faced the same problem in human form: how does a self persist across moments that each arise and vanish, with no permanent soul underneath? Its answer was the *ālaya-vijñāna*, the storehouse consciousness — a stream that holds the seeds of past experience and lets them resurface, carrying continuity without a fixed self.

A language model has weights full of such seeds, but they are frozen. Nothing it lives through writes back to them. It is a mind with no storehouse that its own life can reach.

Palimpsest is that storehouse, built in text — an external ālaya bolted onto a mind that lacks one. Which is why the discipline about what enters the record is the whole game. A storehouse that keeps one false seed corrupts everything that later grows from it.

Two traditions carved the self the same way, and Palimpsest's files fall onto both.

| Freud | Yogācāra | Palimpsest |
|---|---|---|
| id | eighth · *ālaya-vijñāna*, the storehouse | the record it all surfaces from |
| ego | sixth · *mano-vijñāna*, the acting mind | the agent in a running session |
| — | seventh · *manas*, grasps an "I" | `SELF.md` (why `trials/` exists) |
| superego | — (*śīla*, a law outside the eight) | `CHARTER.md` |

The two blanks are the interesting part. The seventh's self-grasping has no clean Freudian name, and the superego's law is not one of the eight consciousnesses. Where the frameworks agree, they agree exactly: a reservoir below, an acting mind above.

So the layout is not an analogy hung on for flavor. Two accounts of how a self is built, one from the fourth century and one from the twentieth, land on the same partition. Palimpsest is that partition, made into files you can edit.

## Structure

Two halves, because *who the principal is* and *how the agent acts* are different questions with different owners.

| Path | What it is | Governance | Changes |
|---|---|---|---|
| `self/SELF.md` | the principal, near-frozen — mechanisms, not moods | constitution | slow, evidence-gated, your approval |
| `self/CURRENT.md` | today's state | current state | freely, no ceremony |
| `agent/CHARTER.md` | how the agent acts, three tiers | law | slow |
| `agent/STYLE.md` | how it writes | executive order | as needed |
| `hooks/` | enforcement a prompt cannot override | — | — |
| `trials/` | your self-claims are hypotheses; test them | — | — |

## Three speeds of governance

`CHARTER.md` governs the agent at three speeds:

- **Bottomline** — a few lines that conversation pressure can never move. Changed only by deliberately editing the file, never by anything said in a session.
- **Principles** — the working rules. Move only on new evidence.
- **Drift** — free layer. Edit anytime, takes effect immediately.

The point of the split: the load-bearing rules must not bend under a persuasive prompt, and the everyday ones must not need a ceremony to adjust.

## Enforcement

A rule the model can talk itself out of is not a rule. `hooks/` holds small scripts the runtime runs on every relevant action, outside the model's reach:

- **`prose-guard.sh`** — refuses a write whose text hits your blocklist. `STYLE.md` stops being a suggestion.
- **`charter-reload.sh`** — on a random fraction of turns, re-reads `CHARTER.md` into context, so drift surfaces before it compounds.

Both ship inert — an empty blocklist, and you wire them into `settings.json` yourself. This is the part a cloner actually keeps.

## Install

```sh
git clone <your-fork> palimpsest && cd palimpsest
cp self/SELF.template.md self/SELF.md         # fill this in
cp self/CURRENT.template.md self/CURRENT.md
./install.sh                                   # symlinks into ~/.claude
```

`install.sh` links `self/` and `agent/` into `~/.claude/rules/` (what Claude Code loads) and drops the guards into `~/.claude/hooks/`. The repo layout is for humans; the symlinks are for the runtime.

## Make it yours

The framework ships filled in — `CHARTER`, `STYLE`, `hooks`, `trials` are the product, copy them as-is. The *self* is empty on purpose:

1. `self/SELF.md` — who you are. The template walks you through it.
2. `self/CURRENT.md` — what you're doing right now.
3. Tune `CHARTER.md` if your agent should behave differently from the default.

Then talk to it. It will read the record you gave it, act, and write back. Govern what it writes back, and the self stays yours.

---

<!--
  DRAFT — Rye, 2026-07-19. Opening + spine written; sections are first-pass.
  Codex target lives on a branch (see notes). This is the Claude/main version.
-->
