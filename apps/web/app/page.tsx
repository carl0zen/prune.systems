import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CopyButton } from '@/components/copy-button';
import { CodeBlock } from '@/components/code-block';
import { PruneDemo, PromptCopyBlock } from '@/components/prune-demo';

export const metadata: Metadata = {
  title: 'PRUNE.SYSTEMS — Audit, reduce, verify. Without breaking function.',
  description:
    'Constraint-based system analyzer. Scan your codebase, classify every '
    + 'module, propose reductions, validate against 5 structural constraints. '
    + 'Without breaking function.',
};

const cliExample = `$ prune benchmark ./src

Before:
  Files         42
  Lines         11,400
  Dependencies  18

After:
  Files         19
  Lines         5,200
  Dependencies  9

Δ:
  Files         -55%
  Lines         -54%
  Dependencies  -50%

Constraints:
  Function preserved   ✓
  Irreducible          ✓
  No duplication       ✓
  Local reasoning      0.82
  Traceability         0.91

Verdict: SUCCESS`;

const apiExample = `import { runPrune } from 'prune-systems';

const result = runPrune('./src');

console.log(result.verdict);
// → SUCCESS

console.log(result.reductions);
// → [
//   { type: 'remove', targets: ['unused.ts'], impact: 0.9 },
//   { type: 'merge',  targets: ['helpers.ts', 'utils.ts'], impact: 0.7 },
//   { type: 'inline', targets: ['wrapper.tsx'], impact: 0.5 },
// ]

console.log(result.constraints);
// → { functionPreserved: true, irreducible: true, ... }`;

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="min-h-[90vh] flex items-center justify-center relative bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-void" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Most systems are
            <br />
            <span className="text-gradient-accent">overbuilt.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-4">
            Audit, reduce, verify — without breaking function.
          </p>
          <p className="text-sm text-white/25 max-w-xl mx-auto mb-12 font-mono">
            Constraint-based system analyzer. Scans your codebase. Classifies
            every module. Proposes reductions. Validates against 5 structural
            constraints. Ships as a CLI and TypeScript API.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#run"
              className="bg-accent text-[#030303] font-medium px-8 py-3.5 rounded hover:bg-accent-hover transition-colors text-lg"
            >
              Run PRUNE Now
            </a>
            <div className="border border-white/10 text-white/70 px-5 py-3 rounded font-mono text-sm flex items-center gap-3">
              <span>npm i prune-systems</span>
              <CopyButton text="npm install prune-systems" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── RUN PRUNE ─── */}
      <Section id="run" className="bg-surface-primary border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            TRY IT
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
            Run PRUNE on a system. Right now.
          </h2>
          <p className="text-white/40 mb-8">
            Paste your file tree or use the example. See what should not exist.
          </p>
          <PruneDemo />
        </div>
      </Section>

      {/* ─── PROOF ─── */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            PROOF
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
            We removed 55% of a system. Nothing broke.
          </h2>
          <p className="text-white/40 mb-12">
            Real codebase. 42 modules. 18 dependencies. 4-minute audit.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-lg overflow-hidden border border-white/[0.06]">
            <div className="bg-surface-primary p-8">
              <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-6">Before</p>
              <div className="space-y-4">
                {[
                  ['Modules', '42'],
                  ['Dependencies', '18'],
                  ['Lines of code', '11,400'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-baseline">
                    <span className="text-white/50 text-sm">{label}</span>
                    <span className="font-mono text-white/80 text-2xl font-light">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-void p-8">
              <p className="text-xs font-mono text-accent uppercase tracking-wider mb-6">After</p>
              <div className="space-y-4">
                {([
                  ['Modules', '19', '-55%'],
                  ['Dependencies', '9', '-50%'],
                  ['Lines of code', '5,200', '-54%'],
                ] as const).map(([label, value, delta]) => (
                  <div key={label} className="flex justify-between items-baseline">
                    <span className="text-white/50 text-sm">{label}</span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-accent text-2xl font-light">{value}</span>
                      <span className="text-xs font-mono text-accent/60">{delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Constraint results */}
          <div className="mt-6 rounded-lg border border-white/[0.06] bg-surface-primary p-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              {[
                { label: 'Function', pass: true },
                { label: 'Irreducible', pass: true },
                { label: 'No duplication', pass: true },
                { label: 'Coupling', pass: true, score: '0.82' },
                { label: 'Traceability', pass: true, score: '0.91' },
              ].map((c) => (
                <div key={c.label}>
                  <div className="text-accent text-lg mb-1">
                    {c.score ?? '✓'}
                  </div>
                  <div className="text-xs text-white/30">{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-white/30">
            <span>Regressions: <span className="text-white/70 font-mono">0</span></span>
            <span>Audit time: <span className="text-white/70 font-mono">4 min</span></span>
            <span>Verdict: <span className="text-accent font-mono">SUCCESS</span></span>
          </div>
        </div>
      </Section>

      {/* ─── CONSTRAINTS ─── */}
      <Section className="bg-surface-primary border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            THE SYSTEM
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Every reduction is constraint-verified.
          </h2>
          <p className="text-white/40 mb-12">
            PRUNE does not guess. It evaluates every proposed change against
            5 structural constraints. If any fails, the change is rejected.
          </p>

          <div className="space-y-3">
            {[
              {
                name: 'Function Preserved',
                desc: 'No remaining module has a broken import. Every dependency chain stays intact.',
              },
              {
                name: 'Irreducible',
                desc: 'Nothing more can be removed. Every remaining element is necessary.',
              },
              {
                name: 'No Duplication',
                desc: 'No two modules export the same symbol. Each responsibility exists once.',
              },
              {
                name: 'Local Reasoning',
                desc: 'Low coupling. Each module has minimal fan-in × fan-out. Changes stay local.',
              },
              {
                name: 'Traceability',
                desc: 'Short dependency chains. Any element can be traced to its purpose in one pass.',
              },
            ].map((c) => (
              <div
                key={c.name}
                className="flex items-start gap-4 p-5 rounded-lg border border-white/[0.06] bg-surface-void"
              >
                <span className="text-accent mt-0.5 text-lg shrink-0">✓</span>
                <div>
                  <span className="text-white/80 font-medium text-sm">
                    {c.name}
                  </span>
                  <p className="text-white/35 text-sm mt-1">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/25 text-sm mt-8 font-mono">
            If ANY constraint fails → the reduction is rejected.
          </p>
        </div>
      </Section>

      {/* ─── INSTALL ─── */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            INSTALL
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            A real engine. Not a wrapper.
          </h2>
          <p className="text-white/40 mb-10">
            TypeScript. Zero external dependencies. 21KB. Scans your filesystem,
            builds a dependency graph, proposes constraint-verified reductions.
          </p>

          {/* Primary: npm install */}
          <div className="rounded-lg border border-accent/30 bg-accent/[0.04] p-8 glow-accent mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <code className="font-mono text-xl md:text-2xl text-accent">
                npm install prune-systems
              </code>
              <CopyButton text="npm install prune-systems" />
            </div>
          </div>

          {/* CLI + API tabs */}
          <div className="grid md:grid-cols-2 gap-4">
            <CodeBlock
              code={cliExample}
              language="bash"
              filename="CLI"
            />
            <CodeBlock
              code={apiExample}
              language="typescript"
              filename="API"
            />
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm text-white/30 flex-wrap">
            <span className="font-mono">v0.2.0</span>
            <span>TypeScript</span>
            <span>CJS + ESM</span>
            <span>Zero deps</span>
            <span>21KB</span>
            <Link href="/docs" className="text-accent hover:underline">
              API docs &rarr;
            </Link>
          </div>
        </div>
      </Section>

      {/* ─── PROMPT ─── */}
      <Section className="bg-surface-primary border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            NO INSTALL REQUIRED
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
            Copy. Paste. Audit.
          </h2>
          <p className="text-white/40 mb-8">
            Run this in Claude, ChatGPT, or Cursor. Add your system description.
            Get a reduction plan.
          </p>
          <PromptCopyBlock />
        </div>
      </Section>

      {/* ─── WHEN PRUNE FAILS ─── */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-red-400/60 tracking-wider uppercase mb-4">
            HONEST
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            When PRUNE fails.
          </h2>
          <p className="text-white/40 mb-12">
            Subtraction has failure modes. We designed constraints
            specifically to catch them.
          </p>

          <div className="space-y-6">
            {[
              {
                failure: 'Over-pruning',
                desc: 'Removing a module that other modules silently depend on.',
                constraint: 'Function Preserved',
                fix: 'Every remaining import is validated. If any breaks, the removal is rejected.',
              },
              {
                failure: 'Hidden coupling',
                desc: 'Two modules appear independent but share implicit state.',
                constraint: 'Local Reasoning',
                fix: 'Fan-in × fan-out coupling score catches high-connectivity modules. Score must exceed 0.3.',
              },
              {
                failure: 'False simplification',
                desc: 'Merging modules that serve different purposes.',
                constraint: 'No Duplication + Traceability',
                fix: 'Only modules with identical exports are merge candidates. Traceability ensures clear paths remain.',
              },
              {
                failure: 'Premature reduction',
                desc: 'Removing code that isn\'t dead — just dormant.',
                constraint: 'Irreducibility',
                fix: 'The engine simulates removal of every remaining node. If any can still be safely removed, the system is not irreducible.',
              },
            ].map((f) => (
              <div
                key={f.failure}
                className="p-6 rounded-lg border border-white/[0.06] bg-surface-primary"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-red-400/70 text-sm font-mono">
                      {f.failure}
                    </span>
                    <p className="text-white/50 text-sm mt-1">{f.desc}</p>
                  </div>
                  <span className="text-xs font-mono text-accent/60 border border-accent/20 px-2 py-1 rounded shrink-0">
                    {f.constraint}
                  </span>
                </div>
                <p className="text-white/30 text-sm">
                  <span className="text-accent mr-1">→</span> {f.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PRODUCT HUNT ─── */}
      <Section className="bg-surface-primary border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            LAUNCHING
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Launching on Product Hunt.
          </h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">
            The first constraint-based system analyzer.
            Scan. Classify. Reduce. Verify. Without breaking function.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-left mb-10">
            <div className="p-5 rounded-lg border border-white/[0.06] bg-surface-void">
              <p className="text-sm text-white/70 font-medium mb-2">What it is</p>
              <p className="text-sm text-white/35">
                A CLI and TypeScript API that scans codebases, builds dependency
                graphs, proposes reductions, and validates them against
                5 structural constraints.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-white/[0.06] bg-surface-void">
              <p className="text-sm text-white/70 font-medium mb-2">Who it&apos;s for</p>
              <p className="text-sm text-white/35">
                Engineers who suspect their system has grown beyond what it needs.
                Tech leads managing accumulated complexity. Founders who want
                less, not more.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-white/[0.06] bg-surface-void">
              <p className="text-sm text-white/70 font-medium mb-2">Try it now</p>
              <p className="text-sm text-white/35">
                Use the interactive demo above. Copy the prompt into Claude.
                Or install the package and run{' '}
                <code className="text-accent/70">prune analyze ./src</code>{' '}
                on your codebase.
              </p>
            </div>
          </div>

          <a
            href="#run"
            className="inline-block bg-accent text-[#030303] font-medium px-8 py-3.5 rounded hover:bg-accent-hover transition-colors"
          >
            Try PRUNE Now
          </a>
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-3xl md:text-4xl font-light tracking-tight">
            &ldquo;Subtraction is a feature.&rdquo;
          </p>
          <p className="text-white/30 text-sm mt-6 mb-10">
            Other tools help you build more. PRUNE helps you decide what
            should not exist.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#run"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Run PRUNE
            </a>
            <div className="border border-white/10 text-white/70 px-5 py-3 rounded font-mono text-sm flex items-center gap-3">
              <span>npm i prune-systems</span>
              <CopyButton text="npm install prune-systems" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            <Link href="/docs" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Docs
            </Link>
            <Link href="/method" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Method
            </Link>
            <Link href="/examples" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Examples
            </Link>
            <Link href="/manifesto" className="text-white/40 text-sm hover:text-white/70 transition-colors">
              Manifesto
            </Link>
            <a
              href="https://github.com/carl0zen/prune.systems"
              className="text-white/40 text-sm hover:text-white/70 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
