import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';
import { CopyButton } from '@/components/copy-button';
import { PromptBlock } from '@/components/prompt-block';

export const metadata: Metadata = {
  title: 'Install',
  description:
    'Install the prune-systems npm package. Get started in seconds '
    + 'with a subtractive audit of your system.',
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

console.log(formatDiagnosis(diagnosis));
// → System Diagnosis: my-project
// → Health: 33% | 3 elements | 1 dead | 1 decorative`;

const apiExports = [
  {
    name: 'audit',
    description: 'Run a complete system audit and get a diagnosis.',
  },
  {
    name: 'classify',
    description: 'Classify a single element by its system role.',
  },
  {
    name: 'applyFilters',
    description: 'Apply the 5 PRUNE filters to an element.',
  },
  {
    name: 'formatDiagnosis',
    description: 'Format a diagnosis as a readable string.',
  },
  {
    name: 'createDiagnosis',
    description: 'Build a diagnosis manually from components.',
  },
  {
    name: 'rankChanges',
    description: 'Sort changes by impact and effort.',
  },
];

const auditPrompt =
  'You are zengineer, a subtractive systems auditor. Your role is to observe, diagnose, and recommend removal actions.\n\nGiven the following system, perform a complete audit:\n\n1. Map every module, component, function, and dependency\n2. Classify each as: living, dead, dormant, duplicated, decorative, or parasitic\n3. Apply the 5 filters to each element:\n   0. Can this be removed entirely?\n   1. Is this essential?\n   2. Is this symbiotic?\n   3. Is this traceable?\n   4. Is this removable later?\n4. Produce a diagnosis with:\n   - Classification table\n   - Health score\n   - Ranked list of recommended changes (remove, merge, rename, simplify)\n   - Expected outcome after changes\n\nBe precise. Be severe. Recommend removal by default.';

const workflowPrompt =
  'You are operating under the PRUNE.SYSTEMS discipline.\n\nBefore writing any code:\n1. Audit: Run zengineer on the current system. Classify all elements.\n2. Reduce: Remove everything that is dead, dormant, or duplicated.\n3. Simplify: Merge decorative abstractions. Inline parasitic dependencies.\n4. Filter: Apply the 5 filters to every remaining element.\n5. Build: Only after steps 1-4, implement the requested change using zendev discipline.\n\nEvery addition must pass:\n0. Can the goal be achieved by removing something instead?\n1. Is this essential to the request?\n2. Is this symbiotic with the existing system?\n3. Is this traceable to a clear requirement?\n4. Can this be removed later without cascading damage?\n\nIf any filter fails, do not add it. Find a simpler path.';

export default function InstallPage() {
  return (
    <>
      <Section className="pt-32">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          INSTALL
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Get started in seconds.
        </h1>
        <div className="flex items-center gap-4 mt-8">
          <div className="inline-flex items-center gap-4 font-mono bg-surface-primary border border-white/[0.06] rounded-lg px-8 py-4 text-accent text-lg">
            <span>npm install prune-systems</span>
            <CopyButton text="npm install prune-systems" />
          </div>
        </div>
        <p className="text-sm text-white/30 mt-4">
          Requires Node.js 18+. TypeScript recommended.
        </p>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          QUICK START
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Your first audit.
        </h2>
        <div className="max-w-4xl">
          <CodeBlock
            code={quickStartCode}
            language="typescript"
            filename="audit.ts"
          />
        </div>
      </Section>

      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          API OVERVIEW
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Main exports.
        </h2>
        <div className="space-y-3 max-w-3xl">
          {apiExports.map((fn) => (
            <div
              key={fn.name}
              className="flex items-baseline gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <code className="font-mono text-sm text-accent w-36 shrink-0">
                {fn.name}
              </code>
              <span className="text-sm text-white/50">
                {fn.description}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/docs#api"
            className="text-accent text-sm hover:underline"
          >
            Full API reference &rarr;
          </Link>
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PREFER PROMPTS?
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-4">
          No install required.
        </h2>
        <p className="text-white/50 max-w-3xl mb-12">
          PRUNE also works as copy-paste prompts for any AI
          assistant. Paste these into ChatGPT, Claude, Cursor, or
          Copilot to apply the PRUNE discipline instantly.
        </p>
        <div className="space-y-8 max-w-4xl">
          <PromptBlock
            title="zengineer — System Audit"
            description="Paste into any AI assistant to audit a system."
            prompt={auditPrompt}
          />
          <PromptBlock
            title="Full Reduction-First Workflow"
            description="Complete PRUNE discipline: audit, reduce, simplify, filter, build."
            prompt={workflowPrompt}
          />
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Go deeper.
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
            <Link
              href="/docs"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Read the Full Docs
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
