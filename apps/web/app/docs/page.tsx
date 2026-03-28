import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';
import { PromptBlock } from '@/components/prompt-block';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for the prune-systems npm package. '
    + 'API reference, types, classifications, filters, and prompts.',
};

const quickStartCode = `import { audit, formatDiagnosis } from 'prune-systems';

const diagnosis = audit({
  system: 'my-project',
  elements: [
    { name: 'AuthModule', type: 'module', dependents: ['App'], dependencies: ['Database'] },
    { name: 'LegacyAuth', type: 'module', dependents: [], lastModified: '2024-01-15' },
    { name: 'AuthWrapper', type: 'wrapper', dependents: [], linesOfCode: 8 },
  ],
});

console.log(formatDiagnosis(diagnosis));`;

const apiFunctions = [
  {
    name: 'audit',
    signature: 'audit(config: AuditConfig): Diagnosis',
    description:
      'Runs a complete system audit. Accepts configuration with '
      + 'system name, elements array, and mode. Returns a full '
      + 'diagnosis with classifications, health score, and '
      + 'recommended changes.',
  },
  {
    name: 'classify',
    signature: 'classify(element: SystemElement): ClassificationResult',
    description:
      'Classifies a single system element as living, dead, '
      + 'dormant, duplicated, decorative, or parasitic based on '
      + 'its properties, usage patterns, and connections.',
  },
  {
    name: 'applyFilters',
    signature: 'applyFilters(element: SystemElement): FilterResult',
    description:
      'Applies the five PRUNE filters to an element and returns '
      + 'a result object with pass/fail for each filter and an '
      + 'overall recommendation.',
  },
  {
    name: 'formatDiagnosis',
    signature: 'formatDiagnosis(diagnosis: Diagnosis): string',
    description:
      'Formats a diagnosis object into a human-readable string '
      + 'with classification table, health score, and ranked '
      + 'recommendations.',
  },
  {
    name: 'createDiagnosis',
    signature:
      'createDiagnosis(system: string, mode: Mode, elements: SystemElement[], changes: Change[]): Diagnosis',
    description:
      'Manually constructs a diagnosis object from individual '
      + 'components. Useful for building custom audit workflows.',
  },
  {
    name: 'rankChanges',
    signature: 'rankChanges(changes: Change[]): Change[]',
    description:
      'Sorts an array of recommended changes by impact and effort. '
      + 'Highest-impact, lowest-effort changes appear first.',
  },
];

const types = [
  {
    name: 'SystemElement',
    description:
      'Represents a single element in the system: module, function, '
      + 'component, dependency, or workflow step.',
  },
  {
    name: 'Classification',
    description:
      'One of: living, dead, dormant, duplicated, decorative, '
      + 'parasitic.',
  },
  {
    name: 'Mode',
    description:
      'Audit mode: "audit" for full analysis, "quick" for health '
      + 'score only, "classify" for classification without filters.',
  },
  {
    name: 'FilterResult',
    description:
      'Result of applying the 5 filters. Contains pass/fail for '
      + 'each filter and an overall action recommendation.',
  },
  {
    name: 'ClassificationResult',
    description:
      'Result of classifying a single element. Contains the '
      + 'classification, confidence score, and evidence.',
  },
  {
    name: 'Change',
    description:
      'A recommended change: action type (remove, merge, rename, '
      + 'simplify, extract, inline), target elements, and rationale.',
  },
  {
    name: 'Diagnosis',
    description:
      'Complete audit output: system name, health score, classified '
      + 'elements, ranked changes, and aggregate statistics.',
  },
  {
    name: 'DiagnosisStats',
    description:
      'Aggregate counts: total elements, living, dead, dormant, '
      + 'duplicated, decorative, parasitic, and health percentage.',
  },
  {
    name: 'AuditConfig',
    description:
      'Configuration for the audit function: system name, elements '
      + 'array, mode, and optional filter overrides.',
  },
];

const classifications = [
  {
    name: 'Living',
    color: 'text-green-400',
    description:
      'Actively used, connected to other elements, and maintained. '
      + 'This element earns its place in the system.',
  },
  {
    name: 'Dead',
    color: 'text-red-400',
    description:
      'Unused, unreferenced, and abandoned. No part of the system '
      + 'depends on it. Safe to remove immediately.',
  },
  {
    name: 'Dormant',
    color: 'text-yellow-400',
    description:
      'Rarely used with low activity and fading relevance. Still '
      + 'connected but losing its reason to exist.',
  },
  {
    name: 'Duplicated',
    color: 'text-orange-400',
    description:
      'Similar or identical to another element in the system. One '
      + 'of them should not exist. Merge or remove.',
  },
  {
    name: 'Decorative',
    color: 'text-purple-400',
    description:
      'Exists for the appearance of sophistication. Adds complexity '
      + 'without adding function.',
  },
  {
    name: 'Parasitic',
    color: 'text-pink-400',
    description:
      'High cost, low value. Drains system health through '
      + 'maintenance burden, performance cost, or cognitive load.',
  },
];

const filters = [
  {
    number: '0',
    question: 'Can this be removed entirely?',
    detail:
      'The zero filter. Ask this first. If the answer is yes, '
      + 'remove it and move on.',
  },
  {
    number: '1',
    question: 'Is this essential?',
    detail:
      'Does the system break without it? Essential means '
      + 'load-bearing, not merely convenient.',
  },
  {
    number: '2',
    question: 'Is this symbiotic?',
    detail:
      'Does it both give to and receive from the system? Isolated '
      + 'elements that only consume resources are parasitic.',
  },
  {
    number: '3',
    question: 'Is this traceable?',
    detail:
      'Can you point to exactly why this element exists? A specific '
      + 'current requirement, not a vague justification.',
  },
  {
    number: '4',
    question: 'Can this be removed later?',
    detail:
      'If removing it later would cause cascading failures, it is a '
      + 'coupling risk regardless of current value.',
  },
];

const auditPrompt =
  'You are zengineer, a subtractive systems auditor. Your role is to observe, diagnose, and recommend removal actions.\n\nGiven the following system, perform a complete audit:\n\n1. Map every module, component, function, and dependency\n2. Classify each as: living, dead, dormant, duplicated, decorative, or parasitic\n3. Apply the 5 filters to each element:\n   0. Can this be removed entirely?\n   1. Is this essential?\n   2. Is this symbiotic?\n   3. Is this traceable?\n   4. Is this removable later?\n4. Produce a diagnosis with:\n   - Classification table\n   - Health score\n   - Ranked list of recommended changes (remove, merge, rename, simplify)\n   - Expected outcome after changes\n\nBe precise. Be severe. Recommend removal by default.';

const simplifyPrompt =
  'You are zengineer in simplification mode. Your goal is to reduce system complexity without losing function.\n\nAnalyze this system and:\n1. Identify every abstraction layer\n2. Question each abstraction: does it earn its complexity?\n3. Find merge opportunities (similar modules, redundant wrappers)\n4. Propose the minimum viable architecture\n5. Output a ranked simplification plan\n\nRules:\n- Prefer deletion over refactoring\n- Prefer merging over separating\n- Prefer inlining over abstracting\n- Every remaining element must justify its existence';

const rebuildPrompt =
  'You are zendev, a disciplined builder. You only construct from what survives reduction.\n\nGiven this diagnosis from zengineer:\n1. Build only from essential elements\n2. Compose from existing primitives — do not create new abstractions\n3. Refuse any abstraction that does not pass all 5 filters\n4. Keep the implementation traceable and removable\n5. Output clean, minimal code with no decorative patterns\n\nRules:\n- No premature abstraction\n- No speculative architecture\n- No wrapper functions that add no value\n- Every line must earn its place';

const workflowPrompt =
  'You are operating under the PRUNE.SYSTEMS discipline.\n\nBefore writing any code:\n1. Audit: Run zengineer on the current system. Classify all elements.\n2. Reduce: Remove everything that is dead, dormant, or duplicated.\n3. Simplify: Merge decorative abstractions. Inline parasitic dependencies.\n4. Filter: Apply the 5 filters to every remaining element.\n5. Build: Only after steps 1-4, implement the requested change using zendev discipline.\n\nEvery addition must pass:\n0. Can the goal be achieved by removing something instead?\n1. Is this essential to the request?\n2. Is this symbiotic with the existing system?\n3. Is this traceable to a clear requirement?\n4. Can this be removed later without cascading damage?\n\nIf any filter fails, do not add it. Find a simpler path.';

const founderAuditPrompt =
  'You are performing a founder-grade product audit using PRUNE.SYSTEMS methodology.\n\nAudit this product/system across these dimensions:\n1. Features: Which are dead (unused), dormant (rarely used), or duplicated?\n2. Architecture: Which services/modules can be merged or eliminated?\n3. Dependencies: Which external dependencies are parasitic (high cost, low value)?\n4. Workflows: Which processes are decorative (feel productive but add no value)?\n5. Abstractions: Which abstractions exist without earning their complexity?\n\nFor each finding:\n- Classify it (living/dead/dormant/duplicated/decorative/parasitic)\n- Apply the 5 filters\n- Recommend a specific action\n- Estimate impact (high/medium/low)\n\nOutput a ranked reduction plan. Start with highest-impact, lowest-effort removals.\nFinish with a system health score and expected improvement after pruning.';

const navLinks = [
  { href: '#quick-start', label: 'Quick Start' },
  { href: '#api', label: 'API Reference' },
  { href: '#types', label: 'Types' },
  { href: '#classifications', label: 'Classifications' },
  { href: '#filters', label: 'Filters' },
  { href: '#prompts', label: 'Prompt Library' },
];

export default function DocsPage() {
  return (
    <>
      {/* Overview */}
      <Section className="pt-32">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          DOCUMENTATION
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Documentation
        </h1>
        <p className="text-lg text-white/50 max-w-3xl mb-12">
          Everything you need to integrate PRUNE into your workflow.
          Install the npm package, use the API, or copy the prompts
          directly into your AI assistant.
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

      {/* Quick Start */}
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
            filename="audit.ts"
          />
        </div>
      </Section>

      {/* API Reference */}
      <Section id="api">
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
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-primary"
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

      {/* Types */}
      <Section id="types" className="bg-surface-primary">
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
              className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-void"
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

      {/* Classifications */}
      <Section id="classifications">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CLASSIFICATIONS
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          The six classifications.
        </h2>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
          {classifications.map((c) => (
            <div
              key={c.name}
              className="p-5 rounded-lg border border-white/[0.06] bg-surface-primary"
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

      {/* Filters */}
      <Section id="filters" className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          THE FIVE FILTERS
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Five questions for every element.
        </h2>
        <div className="space-y-4 max-w-3xl">
          {filters.map((f) => (
            <div
              key={f.number}
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xl font-mono text-accent font-light">
                  {f.number}
                </span>
                <span className="text-white/80 font-medium text-sm">
                  {f.question}
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed ml-10">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Prompt Library */}
      <Section id="prompts">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PROMPT LIBRARY
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-4">
          Copy-paste prompts.
        </h2>
        <p className="text-white/50 mb-12 max-w-3xl">
          Use these prompts with any AI assistant — ChatGPT, Claude,
          Cursor, Copilot — to apply the PRUNE discipline without
          installing anything.
        </p>
        <div className="space-y-8 max-w-4xl">
          <PromptBlock
            title="zengineer — System Audit"
            description="Full system audit with classifications, filters, and ranked recommendations."
            prompt={auditPrompt}
          />
          <PromptBlock
            title="zengineer — Simplify"
            description="Reduce complexity by questioning every abstraction."
            prompt={simplifyPrompt}
          />
          <PromptBlock
            title="zendev — Rebuild"
            description="Build from what survives reduction. No decorative patterns."
            prompt={rebuildPrompt}
          />
          <PromptBlock
            title="Full Reduction-First Workflow"
            description="Complete PRUNE discipline: audit, reduce, simplify, filter, then build."
            prompt={workflowPrompt}
          />
          <PromptBlock
            title="Founder Product Audit"
            description="Founder-grade product audit across features, architecture, dependencies, and workflows."
            prompt={founderAuditPrompt}
          />
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-surface-primary">
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
