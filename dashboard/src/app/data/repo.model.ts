export interface TreeNode {
  /** file or directory name as it appears in the repo */
  name: string;
  children?: TreeNode[];
  /** collapsed sibling run, e.g. "25 character sprites" */
  note?: string;
  /** this path is where identity actually lives */
  identity?: boolean;
}

/**
 * The three axes of the map, each a checkable property read off the repo, not a
 * vibe. Coordinates are DERIVED from these — x = WHO_X[modelsWho],
 * y = ENF_Y[enforcement] — so a position is never a hand-tuned decimal. The
 * resolution is deliberately coarse (three steps per axis) because that is the
 * real resolution of the judgement: yes / partly / no.
 */

/** x axis — whose self does the identity file model? */
export type ModelsWho =
  | 'character' //  an invented persona (Lisa, Atlas, a townsperson)
  | 'mixed' //      part user, part character (Letta's human block + persona)
  | 'user'; //      the actual person (Telos, SELF.md, a trained twin)

/** y axis — does a mechanism outside the model enforce the constraint? */
export type Enforcement =
  | 'none' //      no governing layer, or a single line of it
  | 'declared' //  written down but self-policed; no hook, CI, or gate
  | 'enforced'; //  a shell hook / CI check / schema flag the model can't route around

/** the third property — who may write the record. Shown in the drawer, not on an axis,
 *  because it barely varies on the user side (nobody lets an agent freely rewrite a
 *  model of a real person). */
export type WriteAccess =
  | 'agent-self' //  the agent authors and rewrites it
  | 'user-open' //   the user writes it freely, no gate
  | 'user-gated' //  the user writes it, but changes pass a gate
  | 'locked'; //     frozen / immutable / baked into weights

export const WHO_X: Record<ModelsWho, number> = { character: 0, mixed: 0.5, user: 1 };
export const ENF_Y: Record<Enforcement, number> = { none: 0, declared: 0.5, enforced: 1 };

/** axis definitions, surfaced in the UI so the tiers aren't a black box */
export const WHO_DEF: Record<ModelsWho, string> = {
  character: 'an invented persona — a fictional agent, an assistant character, a townsperson',
  mixed: 'part user, part character — a persona file plus a structured model of the human',
  user: 'the actual person using it — the human is the thing modeled',
};
export const ENF_DEF: Record<Enforcement, string> = {
  none: 'no governing layer, or a single line of it',
  declared: 'written down but self-policed — no hook, CI check, or gate',
  enforced: 'a hook / CI check / schema flag the model cannot route around',
};

/** glyph + gloss for the writeAccess mark on matrix chips */
export const WA_GLYPH: Record<WriteAccess, string> = {
  'agent-self': 'A',
  'user-open': 'U',
  'user-gated': 'G',
  locked: 'L',
};

export interface Repo {
  slug: string;
  name: string;
  url: string | null;
  stars: number | null;
  language: string;
  license: string | null;
  tagline: string;
  modelsWho: ModelsWho;
  enforcement: Enforcement;
  writeAccess: WriteAccess;
  /** who-can-write, in one checkable line — shown in the drawer */
  writeNote: string;
  /** the mechanism (or its absence) behind the enforcement tier, naming the exact file — audited 2026-07-22 against local clones */
  enforcementNote: string;
  /** default branch, for building blob links into the repo */
  branch: string | null;
  /** derived: WHO_X[modelsWho]. 0 = models a character, 1 = models the user */
  x: number;
  /** derived: ENF_Y[enforcement]. 0 = no teeth, 1 = enforced */
  y: number;
  hero?: boolean;
  /** short label describing this project's distinct stance */
  chip: string;
  /** the stance, in her voice: 2-4 sentences */
  angle: string;
  /** the one line that gives the project away, quoted from its own files */
  quote: { text: string; source: string } | null;
  fileCount: number | null;
  identityFileCount: number | null;
  identityFiles: string[];
  tree: TreeNode[];
  /** what surprised me reading it */
  notes: string[];
}

/** a repo before its coordinates are computed from the semantic fields */
export type RawRepo = Omit<Repo, 'x' | 'y'>;

/** fill x/y from the semantic axes, so no coordinate is ever hand-typed */
export function place(r: RawRepo): Repo {
  return { ...r, x: WHO_X[r.modelsWho], y: ENF_Y[r.enforcement] };
}
