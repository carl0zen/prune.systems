import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';
import { CopyButton } from '@/components/copy-button';

export const metadata: Metadata = {
  title: 'Product Hunt Launch',
  description:
    'PRUNE.SYSTEMS on Product Hunt. A subtractive system for '
    + 'auditing and simplifying products, codebases, and workflows.',
};

const usageCode = `import { audit, formatDiagnosis } from 'prune-systems';

const diagnosis = audit({
  system: 'my-saas',
  elements: modules,
  mode: 'audit',
});

console.log(formatDiagnosis(diagnosis));
// → Health: 52% | 18 elements | 4 dead | 3 duplicated | 1 parasitic
// → Recommended: 6 removals, 2 merges, 1 simplification`;

const differentiators = [
  'Not a code generator — a code reducer',
  'Not AI that writes more — a discipline that removes more',
  'Works as an npm package, copy-paste prompts, or methodology',
  'Based on a 5-filter system: removable, essential, symbiotic, traceable, removable later',
];

const audience = [
  {
    who: 'Founders',
    use: 'auditing their own product for dead features and over-engineering',
  },
  {
    who: 'Engineers',
    use: 'fighting tech debt with a systematic removal discipline',
  },
  {
    who: 'Architects',
    use: 'simplifying over-engineered systems to their essential core',
  },
  {
    who: 'Teams',
    use: 'adopting subtraction as a first-class engineering practice',
  },
];

export default function ProductHuntPage() {
  return (
    <>
      <Section className="pt-32">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PRODUCT HUNT
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Launching on{' '}
          <span className="text-gradient-accent">Product Hunt</span>
        </h1>
        <p className="text-xl text-white/50 max-w-3xl mt-6">
          A subtractive system for auditing and simplifying products,
          codebases, and workflows.
        </p>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          WHAT IT IS
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Find and remove what should not exist.
        </h2>
        <div className="max-w-3xl space-y-6 text-white/60 leading-relaxed">
          <p>
            PRUNE.SYSTEMS is a methodology and toolkit for finding and
            removing what should not exist in your systems. It
            classifies every element as living, dead, dormant,
            duplicated, decorative, or parasitic — then recommends
            exact changes.
          </p>
          <p>
            Install the npm package for programmatic audits, copy the
            prompts into any AI assistant, or adopt the five-step
            method as a team practice. Every approach leads to the
            same outcome: a simpler, more coherent system.
          </p>
        </div>
      </Section>

      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          WHAT MAKES IT DIFFERENT
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Subtraction-first.
        </h2>
        <div className="space-y-3 max-w-3xl">
          {differentiators.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <span className="text-accent mt-0.5">&#x2713;</span>
              <span className="text-white/60 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          WHO IT&apos;S FOR
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Built for people who ship.
        </h2>
        <div className="grid gap-4 md:grid-cols-2 max-w-3xl">
          {audience.map((item) => (
            <div
              key={item.who}
              className="p-5 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <div className="text-sm font-mono text-accent mb-2">
                {item.who}
              </div>
              <p className="text-sm text-white/40">
                {item.use}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            FOUNDER NOTE
          </p>
          <div className="p-8 rounded-lg border border-white/[0.06] bg-surface-primary">
            <p className="text-white/70 leading-relaxed text-lg italic">
              &ldquo;I built PRUNE because every tool I use helps me
              add more. Nothing helps me subtract. Subtraction should
              be a first-class action, not an afterthought. This is
              the beginning of subtractive systems tooling.&rdquo;
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          QUICK START
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Try it now.
        </h2>
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-4 font-mono bg-surface-void border border-white/[0.06] rounded-lg px-8 py-4 text-accent">
              <span>npm install prune-systems</span>
              <CopyButton text="npm install prune-systems" />
            </div>
          </div>
          <CodeBlock
            code={usageCode}
            language="typescript"
            filename="audit.ts"
          />
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-8">
            Explore further.
          </h2>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/method"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              The Method
            </Link>
            <Link
              href="/docs"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/examples"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/manifesto"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              Manifesto
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
