# Palimpsest

This repo gives an AI agent a governed self. When a user is setting it up, walk
them through it in order:

1. Copy the templates to real names:
   `cp self/SELF.template.md self/SELF.md`
   `cp self/CURRENT.template.md self/CURRENT.md`
2. Fill `self/SELF.md` and `self/CURRENT.md` with who the user actually is. Tune
   `agent/CHARTER.md` and `agent/STYLE.md` only where the defaults don't fit.
3. Strip every example first. Any block marked `<!-- example, delete this: ... -->`
   is a placeholder. Delete all of them before install — nothing marked "example"
   should survive into a live setup.
4. Run `./install.sh`. It symlinks the files into `~/.claude` and refuses to run
   until `SELF.md` and `CURRENT.md` exist.

The user's filled `SELF.md` and `CURRENT.md` are their private self, not part of
the framework. Do not commit them to a public fork.
