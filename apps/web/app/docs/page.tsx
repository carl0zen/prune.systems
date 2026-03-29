import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';
import { PromptBlock } from '@/components/prompt-block';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for the prune-systems npm package. '
    + 'API reference, types, CLI usage, and constraint system.',
};

const quickStartCode = `import { analyzeSystem, classifyComponents, runPrune } from 'prune-systems';

// Full automated run
const result = runPrune('./src');
console.log(result.verdict);    // → SUCCESS
console.log(result.reductions); // → [{ type: 'remove', targets: [...] }, ...]
console.log(result.before);     // → { files: 42, totalLoc: 11400, ... }
console.log(result.after);      // → { files: 19, totalLoc: 5200, ... }

// Or step by step
const analysis = analyzeSystem('./src');
const classified = classifyComponents(analysis);
classified.forEach(c => {
  console.log(\`\${c.file}: \${c.classification} — \${c.reason}\`);
});`;

const cliCode = `# Analyze system structure
$ prune analyze ./src

# Propose reductions with classifications
$ prune reduce ./src

# Full benchmark with before/after delta
$ prune benchmark ./src`;

const apiFunctions = [
  {
    name: 'analyzeSystem',
    signature: 'analyzeSystem(rootPath: string): SystemAnalysis',
    description:
      'Scans a directory recursively. Extracts imports and exports from every '
      + 'source file (.ts, .tsx, .js, .jsx). Builds a directed dependency '
      + 'graph. Computes metrics (files, LOC, dependencies). Detects smells '
      + '(circular deps, dead files, large files, duplicate exports).',
  },
  {
    name: 'classifyComponents',
    signature: 'classifyComponents(analysis: SystemAnalysis): ClassifiedNode[]',
    description:
      'Classifies every node in the dependency graph as living, dead, '
      + 'duplicated, decorative, or parasitic. Uses graph topology: '
      + 'dependents count, fan-in/fan-out ratio, LOC, export overlap.',
  },
  {
    name: 'proposeReductions',
    signature:
      'proposeReductions(analysis: SystemAnalysis, classified: ClassifiedNode[]): Reduction[]',
    description:
      'Generates ranked reduction proposals. Dead modules → remove. '
      + 'Duplicated modules → merge (keep the one with more dependents). '
      + 'Decorative modules → inline into consumer. Parasitic → remove if orphaned.',
  },
  {
    name: 'evaluateConstraints',
    signature:
      'evaluateConstraints(analysis: SystemAnalysis, removed: Set<string>): ConstraintResult',
    description:
      'Validates a proposed removal set against 5 structural constraints: '
      + 'function preservation, irreducibility, no duplication, local '
      + 'reasoning (coupling score), traceability (path clarity).',
  },
  {
    name: 'runPrune',
    signature: 'runPrune(rootPath: string): PruneResult',
    description:
      'The full PRUNE loop. Analyze → classify → propose → validate each '
      + 'proposal against constraints → accept or reject → return before/after '
      + 'metrics, accepted reductions, constraint results, and verdict.',
  },
];

const types = [
  {
    name: 'SystemAnalysis',
    description:
      'Complete analysis: root path, dependency graph, aggregate metrics, '
      + 'detected smells.',
  },
  {
    name: 'DependencyGraph',
    description:
      'Directed graph with nodes (Map<string, FileNode>), forward edges '
      + '(file → imports), and reverse edges (file → dependents).',
  },
  {
    name: 'FileNode',
    description:
      'Parsed source file: path, relativePath, imports (ImportRef[]), '
      + 'exports (string[]), loc.',
  },
  {
    name: 'ClassifiedNode',
    description:
      'Classification result: file path, classification (living/dead/'
      + 'duplicated/decorative/parasitic), reason string.',
  },
  {
    name: 'Reduction',
    description:
      'Proposed change: type (remove/merge/inline), targets (file paths), '
      + 'optional into (merge target), reason, impact score (0-1).',
  },
  {
    name: 'ConstraintResult',
    description:
      'Five constraint checks: functionPreserved (bool), irreducible (bool), '
      + 'noDuplication (bool), localReasoning (0-1), traceability (0-1), '
      + 'valid (composite).',
  },
  {
    name: 'PruneResult',
    description:
      'Full result: before/after Metrics, accepted reductions, constraint '
      + 'results, verdict (SUCCESS/PARTIAL/FAILURE).',
  },
  {
    name: 'Metrics',
    description:
      'Aggregate numbers: files, totalLoc, dependencies, avgDepsPerFile, '
      + 'maxDepsPerFile.',
  },
  {
    name: 'Smell',
    description:
      'Detected issue: type (circular-dep/dead-file/large-file/duplicate-export), '
      + 'target files, message.',
  },
];

const classifications = [
  {
    name: 'Living',
    color: 'text-accent',
    description:
      'Actively used and connected. Has dependents and is imported by '
      + 'other modules. Earns its place in the system.',
  },
  {
    name: 'Dead',
    color: 'text-red-400',
    description:
      'Zero dependents and not an entry point. No other module imports '
      + 'it. Safe to remove immediately.',
  },
  {
    name: 'Duplicated',
    color: 'text-yellow-400',
    description:
      'Exports the same symbol names as another module. One should be '
      + 'removed or merged into the other.',
  },
  {
    name: 'Decorative',
    color: 'text-white/50',
    description:
      'Thin wrapper under 15 lines with 1 or fewer dependents. Should '
      + 'be inlined into its consumer.',
  },
  {
    name: 'Parasitic',
    color: 'text-pink-400',
    description:
      'High fan-out (imports many modules) but few or zero dependents. '
      + 'Consumes without contributing.',
  },
];

const constraints = [
  {
    name: 'Function Preserved',
    description:
      'Every remaining module\'s imports still resolve. No broken '
      + 'dependency chains after removal.',
  },
  {
    name: 'Irreducible',
    description:
      'Every remaining non-entry module is depended upon by at least '
      + 'one other remaining module.',
  },
  {
    name: 'No Duplication',
    description:
      'No two remaining modules export the same symbol name '
      + '(excluding default exports).',
  },
  {
    name: 'Local Reasoning',
    description:
      'Low coupling score. Computed as 1 - (avg fan-in × fan-out) / n². '
      + 'Must exceed 0.3.',
  },
  {
    name: 'Traceability',
    description:
      'Short dependency chains. Computed via BFS average shortest path. '
      + 'Must exceed 0.3.',
  },
];

const auditPrompt =
  'You are PRUNE, a constraint-based system analyzer.\n\nAudit the system I describe:\n\n1. Scan every module, file, component, and dependency\n2. Build the dependency graph\n3. Classify each element:\n   - living (actively used, connected)\n   - dead (no imports, no dependents)\n   - duplicated (same exports as another module)\n   - decorative (thin wrapper, <15 lines)\n   - parasitic (high deps, low value)\n4. Propose reductions:\n   - remove dead modules\n   - merge duplicates (keep the one with more dependents)\n   - inline decorative wrappers\n5. Validate against constraints:\n   - Function preserved (no broken imports)\n   - Irreducible (nothing else can be removed)\n   - No duplication (no shared exports remain)\n   - Local reasoning (low coupling score)\n   - Traceability (short dependency chains)\n6. Output:\n   - Before/after metrics (files, lines, deps)\n   - Delta percentages\n   - Constraint results (✓/✗)\n   - Verdict: SUCCESS / PARTIAL / FAILURE\n\nBe precise. Be severe. Default to removal.';

const simplifyPrompt =
  'You are PRUNE in simplification mode.\n\nAnalyze this system and:\n1. Identify every abstraction layer\n2. Question each: does it earn its complexity?\n3. Find merge opportunities (similar modules, redundant wrappers)\n4. Propose the minimum viable architecture\n5. Validate every proposal against the 5 constraints\n\nRules:\n- Prefer deletion over refactoring\n- Prefer merging over separating\n- Prefer inlining over abstracting\n- Every remaining element must justify its existence';

const rebuildPrompt =
  'You are PRUNE in build mode. You only construct from what survives reduction.\n\nGiven this system diagnosis:\n1. Build only from essential elements\n2. Compose from existing primitives\n3. Refuse any abstraction that doesn\'t pass all constraints\n4. Keep the implementation traceable and removable\n5. Output clean, minimal code\n\nRules:\n- No premature abstraction\n- No speculative architecture\n- No wrapper functions that add no value\n- Every line must earn its place';

const workflowPrompt =
  'You are operating under the PRUNE discipline.\n\nBefore writing any code:\n1. Audit: Scan the system. Classify all elements.\n2. Reduce: Remove everything dead, duplicated, or decorative.\n3. Validate: Check constraints — function preserved, irreducible, no duplication.\n4. Build: Only after steps 1-3, implement the requested change.\n\nEvery addition must pass:\n- Is this necessary or can the goal be achieved by removal?\n- Does this break any existing dependency?\n- Does this introduce duplication?\n- Can this be removed later without cascading damage?\n\nIf any check fails, find a simpler path.';

const navLinks = [
  { href: '#quick-start', label: 'Quick Start' },
  { href: '#cli', label: 'CLI' },
  { href: '#api', label: 'API' },
  { href: '#types', label: 'Types' },
  { href: '#classifications', label: 'Classifications' },
  { href: '#constraints', label: 'Constraints' },
  { href: '#prompts', label: 'Prompts' },
];

export default function DocsPage() {
  return (
    <>
      <Section className="pt-32">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          DOCUMENTATION
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Documentation
        </h1>
        <p className="text-lg text-white/50 max-w-3xl mb-12">
          CLI reference, TypeScript API, type definitions, constraint system,
          and copy-paste prompts.
        </p>
        <div className="flex flex-wrap gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded border border-white/[0.06] bg-surface-primary text-sm text-white/60 hover:text-white/90 hover:border-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Section>

      <Section id="quick-start" className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          QUICK START
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Up and running in 60 seconds.
        </h2>
        <div className="max-w-4xl space-y-6">
          <CodeBlock
            code="npm install prune-systems"
            language="bash"
            filename="terminal"
          />
          <CodeBlock
            code={quickStartCode}
            language="typescript"
            filename="analyze.ts"
          />
        </div>
      </Section>

      <Section id="cli">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CLI
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Command line interface.
        </h2>
        <div className="max-w-4xl">
          <CodeBlock
            code={cliCode}
            language="bash"
            filename="terminal"
          />
          <div className="mt-8 space-y-4">
            {[
              {
                cmd: 'prune analyze <path>',
                desc: 'Scan files, build dependency graph, report metrics and smells.',
              },
              {
                cmd: 'prune reduce <path>',
                desc: 'Classify components, propose ranked reductions.',
              },
              {
                cmd: 'prune benchmark <path>',
                desc: 'Full PRUNE loop: before/after metrics, constraint validation, verdict.',
              },
            ].map((c) => (
              <div
                key={c.cmd}
                className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-primary"
              >
                <code className="font-mono text-sm text-accent shrink-0">
                  {c.cmd}
                </code>
                <span className="text-sm text-white/50">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="api" className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          API REFERENCE
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Core functions.
        </h2>
        <div className="space-y-6 max-w-4xl">
          {apiFunctions.map((fn) => (
            <div
              key={fn.name}
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <code className="font-mono text-sm text-accent">
                {fn.signature}
              </code>
              <p className="text-sm text-white/50 mt-3 leading-relaxed">
                {fn.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="types">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          TYPES
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Type definitions.
        </h2>
        <div className="space-y-3 max-w-4xl">
          {types.map((t) => (
            <div
              key={t.name}
              className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <code className="font-mono text-sm text-accent shrink-0 w-44">
                {t.name}
              </code>
              <span className="text-sm text-white/50">
                {t.description}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="classifications" className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CLASSIFICATIONS
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Five classifications.
        </h2>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
          {classifications.map((c) => (
            <div
              key={c.name}
              className="p-5 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <div className={`text-sm font-mono mb-2 ${c.color}`}>
                {c.name}
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="constraints">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CONSTRAINT SYSTEM
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-4">
          Five structural constraints.
        </h2>
        <p className="text-white/50 mb-12 max-w-3xl">
          Every proposed reduction must pass all five constraints. If any
          fails, the reduction is rejected. This prevents over-pruning,
          broken imports, and false simplification.
        </p>
        <div className="space-y-4 max-w-3xl">
          {constraints.map((c) => (
            <div
              key={c.name}
              className="flex items-start gap-4 p-5 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <span className="text-accent text-lg mt-0.5 shrink-0">✓</span>
              <div>
                <span className="text-white/80 font-medium text-sm">
                  {c.name}
                </span>
                <p className="text-sm text-white/40 mt-1 leading-relaxed">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="prompts" className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PROMPT LIBRARY
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-4">
          Copy-paste prompts.
        </h2>
        <p className="text-white/50 mb-12 max-w-3xl">
          Use these with any AI assistant to apply the PRUNE discipline
          without installing anything.
        </p>
        <div className="space-y-8 max-w-4xl">
          <PromptBlock
            title="System Audit"
            description="Full analysis with classifications, reductions, and constraint validation."
            prompt={auditPrompt}
          />
          <PromptBlock
            title="Simplify"
            description="Reduce complexity by questioning every abstraction."
            prompt={simplifyPrompt}
          />
          <PromptBlock
            title="Build"
            description="Construct only from what survives reduction."
            prompt={rebuildPrompt}
          />
          <PromptBlock
            title="Full Workflow"
            description="Complete PRUNE discipline: audit → reduce → validate → build."
            prompt={workflowPrompt}
          />
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Ready to prune?
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
            <Link
              href="/install"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Install Package
            </Link>
            <Link
              href="/examples"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors"
            >
              View Examples
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
