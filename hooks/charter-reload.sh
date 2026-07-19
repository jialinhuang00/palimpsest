#!/usr/bin/env bash
# Palimpsest — charter reload.
# On a random fraction of prompts, re-injects CHARTER.md so the agent re-reads
# its own law and drift surfaces before it compounds. Runs on UserPromptSubmit;
# whatever this prints on stdout is added to the model's context for that turn.

CHARTER="${CLAUDE_HOME:-$HOME/.claude}/rules/CHARTER.md"
[ -f "$CHARTER" ] || exit 0

# 1-in-20 turns. Raise the divisor to fire less often.
r=$(od -An -N1 -tu1 /dev/urandom | tr -d ' ')
if [ $((r % 20)) -eq 0 ]; then
  printf 'DRIFT CHECK — re-read your CHARTER below and confirm your behavior still matches it.\n\n'
  cat "$CHARTER"
fi
exit 0
