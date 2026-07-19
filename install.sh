#!/usr/bin/env bash
set -euo pipefail

# Palimpsest installer.
# Symlinks this repo into ~/.claude so Claude Code loads the governed self.
# The repo layout is organized for humans (self/ vs agent/); the symlinks
# flatten it into the single rules/ directory the runtime reads.

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE="${CLAUDE_HOME:-$HOME/.claude}"
RULES="$CLAUDE/rules"

mkdir -p "$RULES" "$CLAUDE/hooks"

# Guard: the self must be filled in before linking.
for f in self/SELF.md self/CURRENT.md; do
  if [ ! -f "$REPO/$f" ]; then
    echo "missing $f — copy $f.template to $f and fill it in first." >&2
    exit 1
  fi
done

link() { ln -sf "$REPO/$1" "$RULES/$(basename "$1")"; }
link self/SELF.md
link self/CURRENT.md
link agent/CHARTER.md
link agent/STYLE.md

for h in "$REPO"/hooks/*.sh; do
  [ -e "$h" ] || continue
  ln -sf "$h" "$CLAUDE/hooks/$(basename "$h")"
done

echo "Palimpsest linked into $CLAUDE/rules and $CLAUDE/hooks."
echo "Wire the hooks in $CLAUDE/settings.json — see settings.json in this repo."
