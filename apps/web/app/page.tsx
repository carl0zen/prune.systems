import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';
import { CopyButton } from '@/components/copy-button';

export const metadata: Metadata = {
  title: 'PRUNE.SYSTEMS — Remove what should not exist',
  description:
    'A subtractive systems discipline and minimal agent runtime for '
    + 'auditing, simplifying, and refining systems before complexity '
    + 'hardens into debt.',
};

const problemItems = [
  'Dead code',
  'Dormant features',
  'Duplicated logic',
  'Decorative abstractions',
  'Parasitic dependencies',
  'Uninspected complexity',
];

const steps = [
  {
    number: '01',
    name: 'Observe',
    description: 'Map the system without judgment.',
  },
  {
    number: '02',
    name: 'Diagnose',
    description: 'Classify every element.',
  },
  {
    number: '03',
    name: 'Decide',
    description: 'Apply the filters.',
  },
  {
    number: '04',
    name: 'Act',
    description: 'Remove, merge, rename, simplify.',
  },
  {
    number: '05',
    name: 'Reflect',
    description: 'Verify coherence.',
  },
];

const filters = [
  { number: '0', question: 'Can this be removed entirely?' },
  { number: '1', question: 'Is this essential?' },
  {
    number: '2',
    question: 'Is this symbiotic with the rest of the system?',
  },
  { number: '3', question: 'Is this traceable to a clear purpose?' },
  {
    number: '4',
    question:
      'Can this be removed later without cascading damage?',
  },
];

const usageCode = `import { audit, classify, applyFilters, formatDiagnosis } from 'prune-systems';

const diagnosis = audit({
  system: 'my-app',
  elements: modules,
  mode: 'audit',
});

console.log(formatDiagnosis(diagnosis));
// → System Diagnosis: my-app
// → Health: 57% | 14 elements | 3 dead | 2 duplicated | 1 parasitic`;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-void" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Systems grow.
            <br />
            <span className="text-gradient-accent">
              Good systems prune.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12">
            A subtractive systems discipline and minimal agent runtime
            for auditing, simplifying, and refining systems before
            complexity hardens into debt.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/install"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Install Package
            </Link>
            <Link
              href="/method"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors"
            >
              Read the Method
            </Link>
          </div>
          <div className="mt-12 font-mono text-sm text-white/30">
            npm install prune-systems
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4 text-center">
          THE PROBLEM
        </p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-center max-w-3xl mx-auto">
          The problem isn&apos;t building.
          <br />
          It&apos;s that we never stop.
        </h2>
        <p className="text-lg text-white/50 text-center max-w-3xl mx-auto mt-6">
          Systems accumulate. Features compound. Abstractions layer.
          And nobody is accountable for what should not exist.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
          {problemItems.map((item) => (
            <div
              key={item}
              className="px-4 py-3 rounded border border-white/[0.06] bg-white/[0.02] text-sm text-white/40 text-center"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-sm mt-8">
          They persist because removal is never the default action.
        </p>
      </Section>

      {/* Method */}
      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4 text-center">
          THE METHOD
        </p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-center">
          A five-step subtractive discipline.
        </h2>
        <div className="grid gap-6 md:grid-cols-5 mt-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <div className="text-3xl font-light text-accent mb-3">
                {step.number}
              </div>
              <div className="text-sm font-medium text-white/90 mb-2">
                {step.name}
              </div>
              <div className="text-sm text-white/40">
                {step.description}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/method"
            className="text-accent text-sm hover:underline"
          >
            Learn the full method &rarr;
          </Link>
        </div>
      </Section>

      {/* Agents */}
      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4 text-center">
          THE AGENTS
        </p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-center">
          Two agents. One discipline.
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="p-8 rounded-lg border border-white/[0.06] bg-surface-primary">
            <div className="font-mono text-accent text-lg mb-1">
              zengineer
            </div>
            <div className="text-sm text-white/40 mb-6">
              The Auditor
            </div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>Observes and maps system structure</li>
              <li>
                Classifies elements: living, dead, dormant,
                duplicated, decorative, parasitic
              </li>
              <li>Produces compressed system diagnosis</li>
              <li>
                Recommends exact removal, merge, and rename actions
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/zengineer"
                className="text-accent text-sm hover:underline"
              >
                Learn about zengineer &rarr;
              </Link>
            </div>
          </div>
          <div className="p-8 rounded-lg border border-white/[0.06] bg-surface-primary">
            <div className="font-mono text-accent text-lg mb-1">
              zendev
            </div>
            <div className="text-sm text-white/40 mb-6">
              The Builder
            </div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>
                Builds only from essential surviving elements
              </li>
              <li>Composes from existing primitives</li>
              <li>Refuses abstraction unless justified</li>
              <li>
                Implements only what passes all filters
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/zendev"
                className="text-accent text-sm hover:underline"
              >
                Learn about zendev &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Filters */}
      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4 text-center">
          THE FILTERS
        </p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-center">
          Five questions. Before anything is kept.
        </h2>
        <div className="space-y-4 mt-16 max-w-3xl mx-auto">
          {filters.map((filter) => (
            <div
              key={filter.number}
              className="flex items-start gap-6 p-6 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <span className="text-2xl font-mono text-accent font-light w-8 shrink-0">
                {filter.number}
              </span>
              <span className="text-white/80">
                {filter.question}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Package */}
      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4 text-center">
          THE PACKAGE
        </p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-center">
          Install the runtime.
        </h2>
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-4 font-mono bg-surface-primary border border-white/[0.06] rounded-lg px-8 py-4 text-accent">
            <span>npm install prune-systems</span>
            <CopyButton text="npm install prune-systems" />
          </div>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <CodeBlock
            code={usageCode}
            language="typescript"
            filename="example.ts"
          />
        </div>
      </Section>

      {/* Manifesto Strip */}
      <div className="py-24 bg-gradient-to-r from-accent/5 to-transparent border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-3xl md:text-4xl font-light tracking-tight">
            &ldquo;Subtraction is a feature.&rdquo;
          </p>
          <div className="mt-8">
            <Link
              href="/manifesto"
              className="text-accent text-sm hover:underline"
            >
              Read the full manifesto &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Start pruning.
          </h2>
          <p className="text-lg text-white/50 mt-4">
            Remove what should not exist.
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center gap-4 font-mono bg-surface-primary border border-white/[0.06] rounded-lg px-8 py-4 text-accent">
              <span>npm install prune-systems</span>
              <CopyButton text="npm install prune-systems" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
            <Link
              href="/docs"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              Read the Docs
            </Link>
            <Link
              href="/examples"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              View Examples
            </Link>
            <Link
              href="/docs#prompts"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              Copy Audit Prompt
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
