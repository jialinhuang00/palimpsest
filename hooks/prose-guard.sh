#!/usr/bin/env bash
# Palimpsest — prose guard.
# Denies a Write/Edit when the outgoing text matches one of your blocklist
# patterns. This is how STYLE.md grows teeth: a banned phrase never reaches
# disk, no matter how the model rationalizes it in the moment.
#
# Add your tells to the PATTERNS block below, one `grep -E` regex per line.
# It ships empty — every line commented — so a fresh clone is a no-op and never
# surprises you. Uncomment or add your own, then it starts biting.

INPUT=$(cat)
CONTENT=$(printf '%s' "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // ""')
[ -z "$CONTENT" ] && exit 0

hits=""
while IFS= read -r pat; do
  case "$pat" in ''|\#*) continue ;; esac
  m=$(printf '%s' "$CONTENT" | grep -oE "$pat" | head -1)
  [ -n "$m" ] && hits="$hits $m"
done <<'PATTERNS'
# one grep -E regex per line. use \b for word boundaries. examples:
# \bvery\b
# \bleverage\b
# in order to
PATTERNS

if [ -n "$hits" ]; then
  reason="prose-guard hit:$hits — blocklisted phrase, rewrite before writing. list in hooks/prose-guard.sh"
  jq -n --arg r "$reason" '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":$r}}'
fi
exit 0
