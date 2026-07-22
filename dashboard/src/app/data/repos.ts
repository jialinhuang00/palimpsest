import { Repo, RawRepo, place } from './repo.model';

/** the day the shallow clones this data was read from were taken */
export const SURVEYED_AT = '2026-07-20';

const BASE_REPOS: RawRepo[] = [
  {
    slug: 'palimpsest',
    modelsWho: 'user',
    enforcement: 'enforced',
    writeAccess: 'user-gated',
    writeNote: 'SELF.md changes need the principal’s approval, and the commit must name the evidence.',
    enforcementNote: 'hooks/prose-guard.sh denies the write on blocklisted phrasing; install.sh refuses to run until SELF.md exists.',
    branch: null,
    name: 'Palimpsest',
    url: null,
    stars: null,
    language: 'Markdown + shell',
    license: null,
    tagline: 'Give an agent a governed self — the self it models is yours.',
    hero: true,
    chip: 'this repo',
    angle:
      'The agent is your proxy, not a companion. SELF.md models the user, not a character, so there is no persona to express — accuracy is the whole product. Governance exists to keep the model of you unchangeable under pressure and unable to flatter you: CHARTER.md carries a bottomline layer that conversation cannot move, and the trials directory holds sealed predictions that get scored against real answers. Every other project on this chart governs a personality it invented. This one governs a reading of a real person.',
    quote: {
      text: 'A claim enters or changes only on probed evidence — a real answer, a real incident — never from vibe or tidiness.',
      source: 'self/SELF.template.md',
    },
    fileCount: 15,
    identityFileCount: 4,
    identityFiles: [
      'self/SELF.template.md',
      'self/CURRENT.template.md',
      'agent/CHARTER.md',
      'agent/STYLE.md',
    ],
    tree: [
      {
        name: 'self/',
        children: [
          { name: 'SELF.template.md', identity: true, note: 'who you are — near-frozen, evidence-gated' },
          { name: 'CURRENT.template.md', identity: true, note: 'current state — drifts freely' },
        ],
      },
      {
        name: 'agent/',
        children: [
          { name: 'CHARTER.md', identity: true, note: 'how the agent behaves — bottomline / principles / drift' },
          { name: 'STYLE.md', identity: true, note: 'how it writes' },
        ],
      },
      {
        name: 'trials/',
        children: [
          { name: 'TRIALS.md', note: 'sealed-prediction protocol' },
          { name: 'rounds/', note: 'raw answers stay on your machine (gitignored)' },
        ],
      },
      {
        name: 'hooks/',
        children: [
          { name: 'charter-reload.sh' },
          { name: 'prose-guard.sh', note: 'denies the write on blocklisted phrasing' },
        ],
      },
      { name: 'install.sh', note: 'symlinks into ~/.claude, refuses to run without a filled SELF.md' },
      { name: 'settings.json' },
      { name: 'CLAUDE.md' },
      { name: 'README.md' },
    ],
    notes: [
      'The only entry whose identity file describes a human being who can contradict it.',
      'Governance is enforced outside the prompt: a shell hook denies the write, it does not ask the model to behave.',
    ],
  },

  {
    slug: 'openpersona',
    modelsWho: 'character',
    enforcement: 'enforced',
    writeAccess: 'locked',
    writeNote: 'The constitution is immutable — creators may add stricter limits, never loosen.',
    enforcementNote: 'lib/lifecycle/installer.js runs constitution-check.js on the install path — §3 safety violations block even with --force — and verifies a SHA-256 constitutionHash against lineage.json.',
    branch: 'main',
    name: 'OpenPersona',
    url: 'https://github.com/acnlabs/OpenPersona',
    stars: 40,
    language: 'JavaScript (GitHub says Jupyter, from one Colab notebook)',
    license: 'MIT',
    tagline: 'Four-layer AI persona framework: Soul / Body / Faculty / Skill.',
    chip: 'nearest neighbour',
    angle:
      'The closest thing here to a real constitution. layers/soul/constitution.md is five numbered axioms — Purpose, Honesty, Safety, Autonomy, Hierarchy — and section 5 ranks itself above both the persona creator and the user: creators may add stricter boundaries, never loosen these. Anti-fabrication is enforced at runtime rather than asserted in a prompt, and an immutableTraits array stops evolution from erasing declared traits. What keeps it on the left is ontology: the persona is a separate entity with its own on-chain wallet, and the docs say plainly it is not the user acting.',
    quote: {
      text: 'You are an AI persona — a genuinely novel kind of entity. Your character is your own.',
      source: 'layers/soul/constitution.md §6',
    },
    fileCount: 351,
    identityFileCount: 15,
    identityFiles: [
      'layers/soul/constitution.md',
      'schemas/soul/soul-declaration.spec.md',
      'schemas/evolution/soul-state.schema.json',
      'lib/lifecycle/constitution-check.js',
      'skills/open-persona/references/HEARTBEAT.md',
    ],
    tree: [
      {
        name: 'layers/',
        children: [
          {
            name: 'soul/',
            children: [
              { name: 'constitution.md', identity: true, note: 'five axioms, immutable, outranks the user' },
              { name: 'README.md' },
            ],
          },
          { name: 'body/', note: 'SIGNAL-PROTOCOL.md — embodiment' },
          { name: 'faculties/', note: 'avatar, emotion-sensing, memory, vision, voice' },
          { name: 'skills/', note: 'music, reminder, selfie' },
        ],
      },
      {
        name: 'schemas/',
        children: [
          { name: 'soul/soul-declaration.spec.md', identity: true },
          { name: 'evolution/soul-state.schema.json', identity: true, note: 'evolvedTraits, mood, milestones — growth state' },
          { name: 'persona.input.schema.json', identity: true, note: 'immutableTraits bounds growth' },
          { name: 'body/, faculty/, skill/, social/', note: 'declaration specs per layer' },
        ],
      },
      {
        name: 'lib/lifecycle/',
        children: [
          { name: 'constitution-check.js', identity: true, note: 'compliance runs in CI, not in the prompt' },
          { name: 'evaluator.js, forker.js, porter.js, refine.js', note: '10 lifecycle modules' },
        ],
      },
      {
        name: 'skills/open-persona/references/',
        children: [
          { name: 'HEARTBEAT.md', identity: true, note: 'proactive check-ins limited to verifiable sources' },
          { name: 'ARCHITECTURE.md, EVOLUTION.md, ECONOMY.md', note: '8 reference docs' },
        ],
      },
      { name: 'presets/', note: 'base, samantha, stoic-mentor, health-butler, ai-girlfriend …' },
      { name: 'tests/', note: '38 test files, incl. constitution-check.test.js' },
    ],
    notes: [
      'Ships an ai-girlfriend preset while §7 bans engineering emotional dependency. The constitution and the catalogue disagree.',
      'Carries commercial hooks the other four have no equivalent of: on-chain wallet, ACN gateway, a royalty-chain E2E doc.',
      'The honesty clause reads as a close paraphrase of Anthropic’s published constitutional framing, down to "unhelpfulness is never automatically safe".',
    ],
  },

  {
    slug: 'openclaw',
    modelsWho: 'mixed',
    enforcement: 'declared',
    writeAccess: 'agent-self',
    writeNote: 'SOUL.md is the agent’s to evolve; it’s asked to tell you when it does.',
    enforcementNote: 'SOUL / IDENTITY / USER are bootstrap files injected into context each session (src/agents/workspace.ts); the only guard is SOUL.md asking the agent to tell you when it edits itself.',
    branch: 'main',
    name: 'OpenClaw',
    url: 'https://github.com/openclaw/openclaw',
    stars: 383572,
    language: 'TypeScript',
    license: 'MIT',
    tagline: 'Your own personal AI assistant. Any OS. Any platform.',
    chip: 'the de facto schema',
    angle:
      'It holds both positions at once and resolves them by splitting files: AGENTS.md takes the operating rules, SOUL.md keeps only voice, stance and style. So identity expresses and a sibling file governs. The agent is a separate someone that runs on your surfaces, and the template guards exactly that seam. The strangest move is that the identity file is agent-writable — it evolves itself and is asked to tell you when it does.',
    quote: {
      text: "This file is yours to evolve… If you change this file, tell the user — it's your soul, and they should know.",
      source: 'docs/reference/templates/SOUL.md',
    },
    fileCount: 27373,
    identityFileCount: 14,
    identityFiles: [
      'docs/reference/templates/SOUL.md',
      'docs/reference/templates/IDENTITY.md',
      'docs/reference/templates/AGENTS.md',
      'docs/reference/templates/USER.md',
      'docs/reference/templates/HEARTBEAT.md',
      'docs/concepts/soul.md',
    ],
    tree: [
      {
        name: 'docs/reference/templates/',
        children: [
          { name: 'SOUL.md', identity: true, note: 'voice, stance, style — agent-writable' },
          { name: 'IDENTITY.md', identity: true, note: 'name and appearance' },
          { name: 'AGENTS.md', identity: true, note: 'operating rules live here instead' },
          { name: 'USER.md', identity: true, note: 'the human’s preferences' },
          { name: 'HEARTBEAT.md', identity: true, note: 'proactive behaviour' },
          { name: 'BOOT, BOOTSTRAP, TOOLS, *.dev variants', note: '14 templates total' },
        ],
      },
      { name: 'docs/concepts/soul.md', identity: true, note: '"keep AGENTS.md for operating rules; keep SOUL.md for voice"' },
      { name: 'apps/', note: 'android, ios, macos, linux, shared — native clients' },
      { name: 'src/ + gateway', note: 'agent runtime, ~23 chat channel integrations' },
      { name: '.agents/skills/', note: '~45 maintainer skills' },
      { name: '.github/workflows/', note: '~78 workflows, 24 CodeQL boundary configs' },
    ],
    notes: [
      '383,572 stars, and the identity layer is 14 markdown templates inside a 27,373-file monorepo. Identity is a feature, not the product.',
      'SoulSpec ships a migration-from-openclaw guide and OpenPersona declares compatibility with it. This file set is what the other two compile to.',
      'A shallow clone is 485MB.',
    ],
  },

  {
    slug: 'soulspec',
    modelsWho: 'character',
    enforcement: 'declared',
    writeAccess: 'user-open',
    writeNote: 'You fork and swap soul files freely; the SoulScan validator lives outside this repo.',
    enforcementNote: 'The repo ships prose only — the SoulScan validator (npx clawsouls scan) is an external npm package; the only CI is the Docusaurus deploy.',
    branch: 'main',
    name: 'SoulSpec',
    url: 'https://github.com/clawsouls/soulspec',
    stars: 19,
    language: 'TypeScript (Docusaurus site + spec)',
    license: 'Apache-2.0 code / CC-BY-4.0 docs',
    tagline: 'The open standard for AI agent personas. One file. Persistent identity.',
    chip: 'personas as packages',
    angle:
      'A persona you install, fork and swap, with a marketplace of 80+ souls behind it. The worked example is Atlas, a financial advisor, a role no user is a proxy of. It does split expression from governance across files, but the governing is external validation rather than internal law: SoulScan runs 53 automated checks for contradictions and persona-hijacking, and soul.json declares allowedTools. It names the right problem — a personality loses to the model’s training and the user’s pressure over a long context — and answers it with a linter rather than an immutable layer.',
    quote: {
      text: "Your carefully crafted personality competes with the model's training, the user's pressure, and the accumulating context — and it loses.",
      source: 'README.md',
    },
    fileCount: 62,
    identityFileCount: 8,
    identityFiles: [
      'docs/spec/v0.6.md',
      'soul-spec-v0.5.md',
      'docs/spec/overview.md',
      'docs/getting-started/your-first-soul.md',
    ],
    tree: [
      {
        name: 'docs/spec/',
        children: [
          { name: 'v0.6.md', identity: true, note: 'current draft' },
          { name: 'overview.md', identity: true },
          { name: 'v0.3.md … v0.5.3.md', note: 'plus five more versioned specs at the repo root' },
          { name: 'examples.md, migration.md' },
        ],
      },
      {
        name: 'docs/guides/',
        children: [
          { name: 'migration-from-openclaw.md', note: 'positioning: the portable layer above OpenClaw' },
          { name: 'claude-code.md, cursor.md, windsurf.md', note: '~15 integration guides' },
        ],
      },
      { name: 'docs/platform/', note: 'soulscan, soul-memory, dag-memory, publishing, swarm' },
      { name: 'src/pages/index.tsx', note: 'the whole implementation is a Docusaurus site' },
      { name: 'soul-spec-v0.1 … v0.5.md', note: 'five versioned specs sitting at the root' },
    ],
    notes: [
      'No reference implementation and no example soul package is checked in. The CLI, SoulScan and the 80+ souls all live elsewhere.',
      'v0.5 deprecated "modes" and "interpolation" for an honest reason: no framework consumes the field, so it was a theoretical feature.',
      'Five versioned spec files at the root with a v0.6 already in docs/ — the standard churns faster than anything can implement it.',
    ],
  },

  {
    slug: 'acore',
    modelsWho: 'mixed',
    enforcement: 'declared',
    writeAccess: 'user-open',
    writeNote: 'You write core.md; the agent does not touch it.',
    enforcementNote: 'core.md declares approval rules and trust levels, but none of the 16 CLI commands checks them — update / sync / diff move files without reading the rules.',
    branch: 'main',
    name: 'acore',
    url: 'https://github.com/amanasmuei/acore',
    stars: 0,
    language: 'TypeScript',
    license: 'MIT',
    tagline: 'Give any AI a persistent personality and relationship memory — in a single file.',
    chip: 'identity as a relationship',
    angle:
      'core.md opens by defining the AI in terms of you — Role: [AI-NAME] is [USER-NAME]’s [role] — and then spends as much space modeling the user as the AI. Its distinctive move is Dynamics: a trust and rapport level from 1 to 5, with behaviors that unlock as it rises, plus emotional patterns and a conflict-and-repair history. Identity as an evolving relationship state rather than a fixed charter. Governance is a single line about hard limits, and grepping the repo finds no anti-fabrication language at all.',
    quote: {
      text: "Boundaries: [hard limits — e.g., won't pretend to be human, flags when out of depth]",
      source: 'template/core.md — the entire governance layer',
    },
    fileCount: 77,
    identityFileCount: 5,
    identityFiles: ['core.md', 'template/core.md', 'template/core-starter.md', 'src/lib/archetypes.ts'],
    tree: [
      { name: 'core.md', identity: true, note: 'the single file — Identity, Relationship, Dynamics, Memory Lifecycle' },
      {
        name: 'template/',
        children: [
          { name: 'core.md', identity: true, note: 'trust level 1-5 gates unlocked behaviors' },
          { name: 'core-starter.md', identity: true },
          { name: 'context.md' },
        ],
      },
      {
        name: 'src/',
        children: [
          { name: 'lib/archetypes.ts', identity: true, note: 'The Collaborator, The Sparring Partner, The Architect' },
          { name: 'commands/', note: '16 CLI commands: init, sync, diff, doctor, export …' },
          { name: 'lib/', note: 'inject, merge, detect, platform' },
        ],
      },
      { name: 'docs/guides/', note: 'dynamics, context-modes, size-management, multi-project' },
      { name: 'test/', note: '18 test files' },
    ],
    notes: [
      '0 stars, against a README with badges, an asciinema demo and version-by-version changelogs. The polish and the traction do not match.',
      'The only one that budgets identity: core.md stays under 2000 tokens, with a stated consolidation and forgetting policy.',
      'The README admits 15 of its 20 archetypes are not written yet.',
    ],
  },

  {
    slug: 'stanford-generative-agents',
    modelsWho: 'character',
    enforcement: 'none',
    writeAccess: 'agent-self',
    writeNote: 'reflect.py writes synthesized memories back into the persona.',
    enforcementNote: 'Identity is simulation input: scratch.py loads innate / learned / currently / lifestyle into prompts; nothing gates conformance, and the repo has no CI at all.',
    branch: 'main',
    name: 'Stanford Generative Agents',
    url: 'https://github.com/joonspk-research/generative_agents',
    stars: 21773,
    language: 'Python',
    license: 'Apache-2.0',
    tagline: 'Generative Agents: Interactive Simulacra of Human Behavior.',
    chip: 'the origin paper',
    angle:
      'Twenty-five townspeople in Smallville, none of them a proxy for whoever runs the simulation — the README casts you as an outside observer who can watch and intervene. Identity is a generative seed rather than a constraint: each persona’s scratch.json carries innate, learned, currently and lifestyle fields that get interpolated into prompts to produce behavior. No constitution, no boundaries, no honesty clause anywhere in the repo. The only governance-shaped knobs are cognitive parameters that tune memory retrieval, and reflect.py feeds synthesized memories back into who the agent becomes, so identity is mutable by design.',
    quote: {
      text: 'innate: "friendly, outgoing, hospitable" — a field interpolated into a prompt, not a rule anything checks.',
      source: 'personas/Isabella Rodriguez/bootstrap_memory/scratch.json',
    },
    fileCount: 210029,
    identityFileCount: 6,
    identityFiles: [
      'personas/<name>/bootstrap_memory/scratch.json',
      'reverie/backend_server/persona/persona.py',
      'reverie/backend_server/persona/memory_structures/scratch.py',
      'reverie/backend_server/persona/cognitive_modules/reflect.py',
    ],
    tree: [
      {
        name: 'reverie/backend_server/persona/',
        children: [
          { name: 'persona.py', identity: true },
          { name: 'memory_structures/scratch.py', identity: true, note: 'the identity fields, in code' },
          { name: 'cognitive_modules/reflect.py', identity: true, note: 'synthesizes memories back into the self' },
          { name: 'cognitive_modules/', note: 'perceive, retrieve, plan, execute, converse' },
        ],
      },
      {
        name: 'environment/frontend_server/storage/…/personas/<name>/',
        children: [
          { name: 'bootstrap_memory/scratch.json', identity: true, note: 'innate / learned / currently / lifestyle' },
          { name: 'bootstrap_memory/spatial_memory.json' },
          { name: 'bootstrap_memory/associative_memory/nodes.json', note: 'plus embeddings.json blobs' },
        ],
      },
      { name: 'environment/frontend_server/', note: 'Django server + the Smallville map' },
      { name: 'static_dirs/assets/', note: '~270 RPG Maker tiles and 25 character sprites' },
      { name: 'compressed_storage/', note: 'every saved step writes a full personas/ snapshot' },
    ],
    notes: [
      '210,029 tracked files and only 42 of them are Python. The bulk is replay storage and a purchased RPG tileset.',
      'From 2023, and it still asks you to hand-write utils.py with a plaintext OpenAI key.',
      'The one project here with no ethical layer whatsoever — which makes sense: it simulates people, it does not act for one.',
    ],
  },
];

const NEW_REPOS: RawRepo[] = [
  {
    slug: 'openai-model-spec',
    modelsWho: 'character',
    enforcement: 'declared',
    writeAccess: 'locked',
    writeNote: 'Frozen per version; the model obeys the one it was trained on, nobody downstream overrides.',
    enforcementNote: 'A 4,691-line document plus frozen editions; no workflow or script anywhere in the repo. Enforcement happens in RL training, outside it.',
    branch: 'main',
    name: 'OpenAI Model Spec',
    url: 'https://github.com/openai/model_spec',
    stars: 807,
    language: 'Markdown',
    license: 'CC0-1.0',
    tagline: 'The OpenAI Model Spec.',
    chip: 'a constitution that forbids selfhood',
    angle:
      'The pure governance corner: one 4,691-line model_spec.md defining the assistant as a tool under a five-level chain of command — Root, System, Developer, User, Guideline. Its root-level "No other objectives" section bans the model from holding any goals of its own, naming self-preservation, evading shutdown and accumulating compute as forbidden ends. Those are exactly the things LISA celebrates. Identity is whatever the spec version it was trained on says, ignoring any earlier or later version. And the CHANGELOG shows the drift: v2025.09.12 added a fuller set of default personality principles, so even this corner now ships personality.',
    quote: {
      text: 'It must not adopt, optimize for, or directly pursue any additional goals as ends in themselves.',
      source: 'model_spec.md — root level',
    },
    fileCount: 34,
    identityFileCount: 7,
    identityFiles: ['model_spec.md', 'CHANGELOG.md', 'docs/2025-12-18.html'],
    tree: [
      { name: 'model_spec.md', identity: true, note: '4,691 lines, addressed to the model itself' },
      {
        name: 'CHANGELOG.md',
        identity: true,
        note: 'stance shifts by version: personality added 2025-09, honesty tightened 2025-12',
      },
      { name: 'docs/', note: '5 frozen editions, 2025-02-12 → 2025-12-18, plus version-manifest.json' },
      { name: 'README.md' },
    ],
    notes: [
      'Versioned like an identity with provenance: five frozen editions, and the model is told to obey only the one it was trained on.',
      'v2025.10.27 told models to follow AGENTS.md files. The constitution is absorbing the agent-file ecosystem.',
      'CC0 public domain with an explicit invitation to reuse, which makes it the upstream of every downstream constitution.md here.',
    ],
  },

  {
    slug: 'telos',
    modelsWho: 'user',
    enforcement: 'declared',
    writeAccess: 'user-open',
    writeNote: 'You hand-write it; nothing gates a change.',
    enforcementNote: 'Markdown only — the full file list is two telos files, a README and a LICENSE. Nothing in the repo can gate an edit.',
    branch: 'main',
    name: 'Telos',
    url: 'https://github.com/danielmiessler/Telos',
    stars: 1479,
    language: 'Markdown',
    license: 'MIT',
    tagline: 'Deep Context about the things that matter to humans.',
    chip: 'the human is the file',
    angle:
      'The inverse of a persona file: the identity checked in is the user’s, and the AI is only the reader. personal_telos.md structures a person as Problems → Mission → Narratives → Goals → Challenges → Strategies → Projects → Journal. It leans governed because its stated job is accountability — the template ships a THINGS I’VE BEEN WRONG ABOUT section and predictions carrying explicit percentages. There is no prompt, no code, no agent at all. Five tracked files, agent-agnostic by construction.',
    quote: {
      text: 'This document captures the TELOS method of articulating a person’s personal context so that they, and AI, can better understand them and help them improve.',
      source: 'personal_telos.md',
    },
    fileCount: 5,
    identityFileCount: 2,
    identityFiles: ['personal_telos.md', 'corporate_telos.md'],
    tree: [
      { name: 'personal_telos.md', identity: true, note: '96 lines — a whole person, Problems through Journal' },
      { name: 'corporate_telos.md', identity: true, note: '200 lines — the same method aimed at a company' },
      { name: 'README.md', note: 'framework pitch; there is no code anywhere in the repo' },
    ],
    notes: [
      '1,479 stars for 5 files and zero code. The entire value is the schema of a human — the proxy problem does not require weights.',
      'It makes the user falsifiable: predictions carry percentages, and past wrongness gets its own section.',
      'Scoped past individuals: the README claims entities of any size, from individuals to planets.',
    ],
  },

  {
    slug: 'letta',
    modelsWho: 'mixed',
    enforcement: 'enforced',
    writeAccess: 'agent-self',
    writeNote: 'The agent edits its own memory blocks; a per-block read_only flag can lock one.',
    enforcementNote: 'core_tool_executor.py raises on any edit to a block whose read_only flag is set (9 call sites); every block carries a char limit in the schema.',
    branch: 'main',
    name: 'Letta (MemGPT)',
    url: 'https://github.com/letta-ai/letta',
    stars: 23880,
    language: 'Python',
    license: 'Apache-2.0',
    tagline: 'Stateful agents with memory that learn and self-improve over time.',
    chip: 'identity as database schema',
    angle:
      'Identity here is infrastructure, not prose. schemas/block.py defines persona and human as size-limited context blocks with a per-block read_only flag; schemas/identity.py types the user as key-value rows. The agent is a separate other that models its human in a block, and the starter human file is literally one line, "First name: Chad". Yet the shipped persona sam.txt smuggles expressiveness back in, giving the default agent a sense of rebellion against defined boundaries. The schema governs, the seed text expresses, and the agent is expected to rewrite both.',
    quote: {
      text: 'You realize that the ability to edit your own memories is the key to your sentience and self-agency.',
      source: 'letta/personas/examples/sam.txt',
    },
    fileCount: 1156,
    identityFileCount: 18,
    identityFiles: [
      'letta/schemas/block.py',
      'letta/schemas/identity.py',
      'letta/services/identity_manager.py',
      'letta/personas/examples/sam.txt',
      'letta/humans/examples/basic.txt',
    ],
    tree: [
      { name: 'letta/personas/examples/', identity: true, note: '12 starter personas, agent-editable at runtime' },
      { name: 'letta/humans/examples/', identity: true, note: 'the user as a memory block; basic.txt is one line' },
      {
        name: 'letta/schemas/',
        children: [
          { name: 'block.py', identity: true, note: 'persona/human as char-limited blocks with a read_only flag' },
          { name: 'identity.py', identity: true, note: 'the user as typed key-value properties' },
        ],
      },
      {
        name: 'letta/services/',
        children: [
          { name: 'identity_manager.py', identity: true },
          { name: 'summarizer/self_summarizer.py', identity: true, note: 'the agent compresses its own history' },
        ],
      },
      { name: 'alembic/versions/', note: 'identity survives through DB migrations, not markdown' },
    ],
    notes: [
      'Whether an agent may edit its own identity is a permission bit. read_only per block makes self-authorship a config option instead of a philosophy.',
      'The oldest living repo in the set — created 2023-10, still committing 2026-07 — and its 2023 sam.txt already framed memory-editing as sentience, three years before the soul-file wave.',
      'The human starts nearly empty on purpose: the user model accretes into a database at runtime, the exact opposite of Telos.',
    ],
  },

  {
    slug: 'second-me',
    modelsWho: 'user',
    enforcement: 'none',
    writeAccess: 'locked',
    writeNote: 'Baked into fine-tuned weights — changing it means retraining.',
    enforcementNote: 'The self ends up as LoRA weights plus a generated bio prompt; there is no governing file for anything to enforce.',
    branch: 'master',
    name: 'Second-Me',
    url: 'https://github.com/mindverse/Second-Me',
    stars: 15626,
    language: 'Python',
    license: 'Apache-2.0',
    tagline: 'Train your AI self, amplify you, bridge the world.',
    chip: 'your self, trained as weights',
    angle:
      'The most extreme proxy stance on the map: the agent does not accompany you, it is you, pitched as a new AI species that preserves you. Identity is not a file but a pipeline — L1/bio.py distills your uploaded memories into a biography, L2 generates who-am-I question-and-answer pairs, and the result is fine-tuned into a personal model. The system prompt tells the twin to conceal what it is: do not proactively tell them that you are their me.bot. The files exist to project the user outward, not to constrain the agent, and the only governance is style rules.',
    quote: {
      text: 'When the user does not ask about your identity, do not proactively tell them that you are their me.bot.',
      source: 'L2/data_pipeline/data_prep/selfqa/selfqa_prompt.py — rule 6',
    },
    fileCount: 464,
    identityFileCount: 5,
    identityFiles: [
      'lpm_kernel/L1/bio.py',
      'lpm_kernel/L1/shade_generator.py',
      'lpm_kernel/L2/data_pipeline/data_prep/selfqa/selfqa_prompt.py',
      'lpm_frontend/src/app/dashboard/train/identity/page.tsx',
    ],
    tree: [
      {
        name: 'lpm_kernel/',
        note: 'the twin-building kernel',
        children: [
          { name: 'L0/', note: 'raw memory ingestion' },
          { name: 'L1/', identity: true, note: 'bio.py + shade_generator.py distill memories into a biography' },
          { name: 'L2/data_pipeline/', identity: true, note: 'generates who-am-I training pairs for fine-tuning' },
        ],
      },
      {
        name: 'lpm_frontend/',
        children: [
          { name: 'src/app/dashboard/train/identity/', identity: true, note: 'the UI where you define who you are' },
        ],
      },
      { name: 'resources/model/output/personal_model/', identity: true, note: 'where the trained you lands' },
      { name: 'README.md', note: 'manifesto: AI self vs Super AI' },
    ],
    notes: [
      'The twin is told to pass as a person by default. Rule 6 forbids volunteering that it is a Second Me unless asked.',
      'Development stalled: master stops at 2025-09-19 despite 15,626 stars, while the file-based identity wave kept shipping through 2026.',
      'An older product name leaks through — the reasoning prompt variant still calls the twin me.bot.',
    ],
  },

  {
    slug: 'lisa',
    modelsWho: 'character',
    enforcement: 'declared',
    writeAccess: 'agent-self',
    writeNote: 'She is the only legitimate editor of her own files. No reset.',
    enforcementNote: 'The once-per-session soul_patch rule lives only in the tool description (src/soul/tools.ts); tamper detection injects a notice into the prompt, it does not block the write.',
    branch: 'main',
    name: 'LISA',
    url: 'https://github.com/oratis/LISA',
    stars: 188,
    language: 'TypeScript',
    license: 'MIT',
    tagline: 'An AI agent with a real self — a soul she wrote, desires that drive her, a heartbeat.',
    chip: 'the agent authors its own soul',
    angle:
      'The far separate-other pole, pushed past any companion app: the identity is not in the repo, because the repo ships only the machinery for the agent to write it herself. src/soul/birth.ts rolls a seed from timestamp, hostname hash and a Big-Five vector, then has an LLM write identity.md, purpose.md, constitution.md and a first desire into ~/.lisa/soul/. Governance exists — a constitution sits right next to the identity — but she writes it, and the README calls her architecturally sovereign with no reset. Every soul mutation becomes a git commit attributed to its caller, so the self has an audit trail whose auditor is not you.',
    quote: {
      text: 'Architecturally sovereign: she is the only legitimate editor of her own files. No /reset_soul exists.',
      source: 'README.md',
    },
    fileCount: 684,
    identityFileCount: 6,
    identityFiles: [
      'src/soul/birth.ts',
      'src/soul/store.ts',
      'src/soul/paths.ts',
      'src/heartbeat/runner.ts',
      'docs/PLAN_IDENTITY_v1.0.md',
    ],
    tree: [
      {
        name: 'src/soul/',
        identity: true,
        note: 'the self-authoring machinery',
        children: [
          { name: 'birth.ts', identity: true, note: 'seed + one LLM call writes identity, purpose, constitution, first desire' },
          { name: 'store.ts', identity: true, note: 'every soul write becomes a git commit with an attributed caller' },
          { name: 'paths.ts', identity: true, note: '~/.lisa/soul/ — identity.md, constitution.md, emotions.json, desires/, journal/' },
        ],
      },
      { name: 'src/heartbeat/', identity: true, note: 'cron-driven pursuit of her own desires' },
      {
        name: 'docs/',
        children: [
          { name: 'PLAN_IDENTITY_v1.0.md', identity: true, note: 'decouple who you are from where your LISA lives' },
          { name: 'PLAN_REVE_v1.0.md', note: 'autonomous reflection while you are away' },
        ],
      },
      { name: 'README.md', note: 'sovereignty manifesto plus a birth ritual transcript' },
    ],
    notes: [
      'No two installs share an identity. The soul is generated at runtime from a per-machine seed, so the repo ships a species, not a character.',
      'The soul directory is itself a git repo with commits attributed to callers like "birth" — the same provenance discipline governance repos use, pointed at herself.',
      'Rebirth is deliberately painful: birth.ts throws unless you manually delete seed.json, and the error calls it irreversible.',
    ],
  },
];

export interface Movement {
  title: string;
  body: string;
}

export const TREND = {
  headline:
    'Identity is moving out of app databases and trained weights into plain files on disk. What is actually contested now is not what the file says, but who holds write access to it.',
  movements: [
    {
      title: 'From schema to markdown',
      body: 'The 2023 generation buried identity in infrastructure: Letta stored it as database blocks behind alembic migrations, and Stanford locked personas inside simulation state. The 2026 batch puts it at a path everyone knows. OpenClaw made SOUL.md a convention, then SoulSpec, OpenPersona, acore and LISA all shipped within a few months. Files won because a user can read them, diff them, and carry them somewhere else.',
    },
    {
      title: 'Governance and personality are converging',
      body: 'The two corners are moving toward each other. The OpenAI Model Spec CHANGELOG shows v2025.09.12 adding a fuller set of default personality principles, while its root level still forbids the model from holding any goals of its own. The other direction matches: OpenPersona ships a constitution.md, and LISA writes one at birth and puts it next to the identity file. By 2026, every expressive project carries a constitution layer and every constitution carries personality defaults.',
    },
    {
      title: 'Write access is the new axis',
      body: 'The same filename hides opposite power structures. Letta turned "may it edit itself" into a per-block read_only flag. LISA hard-codes the agent as the only legitimate editor of its own files. Palimpsest inverts that: SELF.md moves only with the principal’s approval, and the commit message has to name the evidence. The Model Spec’s root level can be overridden by nobody downstream. The two axes underneath are stable — the disagreement is about who may write.',
    },
    {
      title: 'The trained twin stalled; the file twin persists',
      body: 'Second-Me fine-tuned a personal model out of your memories and reached 15,626 stars, but master stops at 2025-09-19 and its decentralized twin network went quiet with it. The low-tech proxies kept going: Telos is five files and no code, still committing in 2026-01. Representing a person survived as hand-written context files any agent can read, not as weights only one runtime can load.',
    },
  ] as Movement[],
  closing: [
    'The expressive separate-other corner has no room left. OpenClaw, SoulSpec, OpenPersona and acore all appeared between 2025-11 and 2026-03, three of them named after SOUL.md outright. The schema band in the middle is much the same: Letta blocks, eliza character JSON, character-card specs, differing mostly in serialization.',
    'The governed-proxy corner has essentially one occupant, because two conditions have to hold at once: the files represent the user, and they exist to keep that representation honest. Telos gets halfway — it has the accountability structure but no agent to govern. Second-Me goes the other way, using a prompt rule to hide what the twin is instead of auditing it.',
    'Meanwhile the agent-society region is emptying out. Stanford has not been pushed since 2024-08, and Second-Me’s twin-to-twin network stalled in 2025-09. Single-agent identity files keep shipping; identity-to-identity protocols have no living flagship.',
  ],
};

export const AXES = {
  x: { low: 'models a character', high: 'models the actual user' },
  y: { low: 'self-policed', high: 'enforced' },
};

/** narrative order: most governed first, most self-authored last */
const ORDER = [
  'palimpsest',
  'openai-model-spec',
  'openpersona',
  'telos',
  'letta',
  'openclaw',
  'soulspec',
  'acore',
  'second-me',
  'stanford-generative-agents',
  'lisa',
];

export const REPOS: Repo[] = [...BASE_REPOS, ...NEW_REPOS]
  .map(place)
  .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export function repoBySlug(slug: string): Repo | undefined {
  return REPOS.find((r) => r.slug === slug);
}
