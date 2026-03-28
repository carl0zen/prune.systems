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

const auditPrompt = `You are zengineer, a subtractive systems auditor.

Audit the system I describe below:

1. List every module, component, function, and dependency
2. Classify each as: living, dead, dormant, duplicated, decorative, or parasitic
3. Apply the 5 filters to each:
   0. Can this be removed entirely?
   1. Is this essential?
   2. Is this symbiotic?
   3. Is this traceable?
   4. Is this removable later?
4. Output:
   - Classification table
   - Health score (% living)
   - Ranked removal plan (highest impact, lowest effort first)
   - Expected outcome after changes

Be precise. Be severe. Recommend removal by default.

Here is my system:`;

const steps = [
  { number: '01', name: 'Observe', description: 'Map the system without judgment.' },
  { number: '02', name: 'Diagnose', description: 'Classify every element.' },
  { number: '03', name: 'Decide', description: 'Apply the filters.' },
  { number: '04', name: 'Act', description: 'Remove, merge, rename, simplify.' },
  { number: '05', name: 'Reflect', description: 'Verify coherence.' },
];

const filters = [
  { number: '0', question: 'Can this be removed entirely?' },
  { number: '1', question: 'Is this essential?' },
  { number: '2', question: 'Is this symbiotic with the rest of the system?' },
  { number: '3', question: 'Is this traceable to a clear purpose?' },
  { number: '4', question: 'Can this be removed later without cascading damage?' },
];

const usageCode = `import { audit, formatDiagnosis } from 'prune-systems';

const diagnosis = audit({
  system: 'my-app',
  elements: modules,
  mode: 'audit',
});

console.log(formatDiagnosis(diagnosis));
// → System Diagnosis: my-app
// → Health: 57% | 14 elements | 3 dead | 2 duplicated | 1 parasitic
// → Recommended: 5 removals, 2 merges. Projected health: 89%`;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-void" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
          <p className="text-sm font-mono text-white/30 mb-8 tracking-wider">
            You don&apos;t need more architecture. You need less.
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Systems grow.
            <br />
            <span className="text-gradient-accent">
              Good systems prune.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12">
            Audit your system. Classify every element. Remove what
            should not exist. In the next 60 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#run"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Run PRUNE Now
            </a>
            <Link
              href="/install"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors font-mono text-sm"
            >
              npm install prune-systems
            </Link>
          </div>
        </div>
      </section>

      {/* Instant Execution — Gap #1 */}
      <Section id="run" className="bg-surface-primary border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            RUN PRUNE NOW
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Audit your system in 60 seconds.
          </h2>
          <p className="text-white/40 mb-8">
            No install required. Copy this prompt. Paste it into
            ChatGPT, Claude, or Cursor. Add your codebase structure.
            Get a reduction plan.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm text-white/50">
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-accent/30 text-accent text-xs font-mono shrink-0">1</span>
              <span>Copy the prompt below</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-accent/30 text-accent text-xs font-mono shrink-0">2</span>
              <span>Paste into any AI assistant</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-accent/30 text-accent text-xs font-mono shrink-0">3</span>
              <span>Append your codebase structure, module list, or architecture description</span>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-white/[0.06] bg-surface-void overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <span className="text-sm font-medium text-white/80">
                zengineer — System Audit Prompt
              </span>
              <CopyButton text={auditPrompt} />
            </div>
            <pre className="p-5 text-sm font-mono text-white/50 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {auditPrompt}
            </pre>
          </div>
        </div>
      </Section>

      {/* Benchmark Proof — Gap #2 */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            PROOF
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            We ran PRUNE on a production React dashboard.
          </h2>
          <p className="text-white/40 mb-12">
            Real codebase. 8 engineers. 2 years of accumulated structure. 4-minute audit.
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-lg overflow-hidden border border-white/[0.06]">
            <div className="bg-surface-primary p-8">
              <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-6">Before</p>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Modules</span>
                  <span className="font-mono text-white/80 text-2xl font-light">42</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Dependencies</span>
                  <span className="font-mono text-white/80 text-2xl font-light">18</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Abstraction layers</span>
                  <span className="font-mono text-white/80 text-2xl font-light">6</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Lines of code</span>
                  <span className="font-mono text-white/80 text-2xl font-light">11,400</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-void p-8">
              <p className="text-xs font-mono text-accent uppercase tracking-wider mb-6">After</p>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Modules</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-accent text-2xl font-light">19</span>
                    <span className="text-xs font-mono text-accent/60">-55%</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Dependencies</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-accent text-2xl font-light">9</span>
                    <span className="text-xs font-mono text-accent/60">-50%</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Abstraction layers</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-accent text-2xl font-light">2</span>
                    <span className="text-xs font-mono text-accent/60">-67%</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-sm">Lines of code</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-accent text-2xl font-light">5,200</span>
                    <span className="text-xs font-mono text-accent/60">-54%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-white/40">Regressions: <span className="text-white/80 font-mono">0</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-white/40">Audit time: <span className="text-white/80 font-mono">4 min</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-white/40">Health: <span className="text-white/80 font-mono">43% → 91%</span></span>
            </div>
          </div>
        </div>
      </Section>

      {/* Problem — tightened */}
      <Section className="bg-surface-primary">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            THE PROBLEM
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            The problem isn&apos;t building.
            <br />
            It&apos;s that we never stop.
          </h2>
          <p className="text-lg text-white/50 mt-6">
            Systems accumulate. Features compound. Abstractions layer.
            And nobody is accountable for what should not exist.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
          {['Dead code', 'Dormant features', 'Duplicated logic', 'Decorative abstractions', 'Parasitic dependencies', 'Uninspected complexity'].map((item) => (
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

      {/* What Breaks — Gap #3 */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            HONEST
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12">
            What PRUNE will break.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border border-red-500/10 bg-red-500/[0.02]">
              <p className="text-sm font-mono text-red-400/80 mb-6 uppercase tracking-wider">
                Will break
              </p>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">&#x2715;</span>
                  <span>Over-engineered abstractions that feel like progress</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">&#x2715;</span>
                  <span>Unnecessary wrapper layers nobody asked for</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">&#x2715;</span>
                  <span>Duplicated logic hiding behind different names</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">&#x2715;</span>
                  <span>Dependencies you forgot you had</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">&#x2715;</span>
                  <span>The illusion that your system needs all of this</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-lg border border-accent/10 bg-accent/[0.02]">
              <p className="text-sm font-mono text-accent/80 mb-6 uppercase tracking-wider">
                Will not break
              </p>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-accent/60 mt-0.5">&#x2713;</span>
                  <span>Core functionality — living elements are preserved</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent/60 mt-0.5">&#x2713;</span>
                  <span>Load-bearing architecture — essential passes the filters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent/60 mt-0.5">&#x2713;</span>
                  <span>Anything classified as living and symbiotic</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent/60 mt-0.5">&#x2713;</span>
                  <span>Your ability to ship — it gets faster</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent/60 mt-0.5">&#x2713;</span>
                  <span>Your confidence — every remaining element earns its place</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Method */}
      <Section className="bg-surface-primary">
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
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-void"
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
          <Link href="/method" className="text-accent text-sm hover:underline">
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
            <div className="font-mono text-accent text-lg mb-1">zengineer</div>
            <div className="text-sm text-white/40 mb-6">The Auditor</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>Observes and maps system structure</li>
              <li>Classifies elements: living, dead, dormant, duplicated, decorative, parasitic</li>
              <li>Produces compressed system diagnosis</li>
              <li>Recommends exact removal, merge, and rename actions</li>
            </ul>
            <div className="mt-6">
              <Link href="/zengineer" className="text-accent text-sm hover:underline">
                Learn about zengineer &rarr;
              </Link>
            </div>
          </div>
          <div className="p-8 rounded-lg border border-white/[0.06] bg-surface-primary">
            <div className="font-mono text-accent text-lg mb-1">zendev</div>
            <div className="text-sm text-white/40 mb-6">The Builder</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>Builds only from essential surviving elements</li>
              <li>Composes from existing primitives</li>
              <li>Refuses abstraction unless justified</li>
              <li>Implements only what passes all filters</li>
            </ul>
            <div className="mt-6">
              <Link href="/zendev" className="text-accent text-sm hover:underline">
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
              <span className="text-white/80">{filter.question}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Package — Gap #4: Dominant */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            THE PACKAGE
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Install the runtime. Run it on anything.
          </h2>
          <p className="text-white/40 mb-10">
            Programmatic system audits. TypeScript. Zero dependencies. 13KB.
          </p>
          <div className="rounded-lg border border-accent/20 bg-accent/[0.03] p-8 glow-accent">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <code className="font-mono text-xl text-accent">
                npm install prune-systems
              </code>
              <CopyButton text="npm install prune-systems" />
            </div>
          </div>
          <div className="mt-8">
            <CodeBlock
              code={usageCode}
              language="typescript"
              filename="audit.ts"
            />
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-white/30 flex-wrap">
            <span className="font-mono">v0.1.0</span>
            <span>TypeScript</span>
            <span>CJS + ESM</span>
            <span>MIT License</span>
            <Link href="/docs" className="text-accent hover:underline">
              Full API docs &rarr;
            </Link>
          </div>
        </div>
      </Section>

      {/* Adversarial FAQ — Gap #5 */}
      <Section className="bg-surface-primary">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            <div>
              <p className="text-xl text-white/70 italic mb-4">
                &ldquo;Isn&apos;t this just deleting code?&rdquo;
              </p>
              <p className="text-white/90 text-lg font-light">
                Yes. But correctly.
              </p>
              <p className="text-white/40 mt-3">
                Most teams don&apos;t lack features. They lack restraint.
                PRUNE doesn&apos;t guess what to remove. It classifies,
                filters, and ranks. Every removal is traceable. Every
                action is justified.
              </p>
            </div>
            <div className="border-t border-white/[0.06] pt-12">
              <p className="text-xl text-white/70 italic mb-4">
                &ldquo;We don&apos;t have a bloat problem.&rdquo;
              </p>
              <p className="text-white/90 text-lg font-light">
                Run the audit. Then decide.
              </p>
              <p className="text-white/40 mt-3">
                Every team we&apos;ve seen says this. Every audit finds
                30-60% of structure that fails the five filters. The
                bloat isn&apos;t obvious — that&apos;s why it persists.
              </p>
            </div>
            <div className="border-t border-white/[0.06] pt-12">
              <p className="text-xl text-white/70 italic mb-4">
                &ldquo;What if we remove something important?&rdquo;
              </p>
              <p className="text-white/90 text-lg font-light">
                That&apos;s what the filters prevent.
              </p>
              <p className="text-white/40 mt-3">
                Essential elements pass. Symbiotic elements pass.
                Load-bearing architecture passes. PRUNE targets what
                is dead, dormant, duplicated, decorative, and parasitic.
                If it&apos;s alive and connected, it stays.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Manifesto Strip */}
      <div className="py-24 bg-gradient-to-r from-accent/5 to-transparent border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-3xl md:text-4xl font-light tracking-tight">
            &ldquo;Subtraction is a feature.&rdquo;
          </p>
          <div className="mt-8">
            <Link href="/manifesto" className="text-accent text-sm hover:underline">
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
          <p className="text-lg text-white/40 mt-4 max-w-xl mx-auto">
            Copy the prompt and run it now. Or install the package
            and automate it.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-10">
            <a
              href="#run"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Copy the Prompt
            </a>
            <Link
              href="/install"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors font-mono text-sm"
            >
              npm install prune-systems
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
            <Link href="/docs" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Read the Docs
            </Link>
            <Link href="/examples" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              View Examples
            </Link>
            <Link href="/method" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Learn the Method
            </Link>
            <Link href="/manifesto" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Manifesto
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
