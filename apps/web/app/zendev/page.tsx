import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { PromptBlock } from '@/components/prompt-block';

export const metadata: Metadata = {
  title: 'zendev — The Builder',
  description:
    'zendev is the disciplined builder agent. It constructs only '
    + 'from what survives reduction, composing from existing '
    + 'primitives with zero speculative architecture.',
};

const principles = [
  {
    number: '01',
    name: 'Build only from what survives reduction',
    description:
      'zendev never starts from a blank slate. It starts from '
      + 'zengineer\'s diagnosis — the elements that earned their '
      + 'place. Everything dead, dormant, and decorative has '
      + 'already been removed.',
  },
  {
    number: '02',
    name: 'Compose from existing primitives',
    description:
      'Do not invent new abstractions when existing ones serve '
      + 'the purpose. Composition over creation. Reuse over '
      + 'reinvention. The system already has building blocks — '
      + 'use them.',
  },
  {
    number: '03',
    name: 'Refuse abstraction unless it passes all 5 filters',
    description:
      'Every new abstraction must be removable, essential, '
      + 'symbiotic, traceable, and safely removable later. If '
      + 'any filter fails, the abstraction is rejected. Find '
      + 'a simpler path.',
  },
  {
    number: '04',
    name: 'Keep everything traceable and removable',
    description:
      'Every line of code zendev writes can be traced to a '
      + 'specific requirement and removed without cascading '
      + 'damage. No hidden coupling. No invisible dependencies.',
  },
  {
    number: '05',
    name: 'Implement the minimum. Then stop.',
    description:
      'zendev does not anticipate future requirements. It does '
      + 'not build extensibility hooks. It implements exactly '
      + 'what is needed, cleanly and completely, and then stops.',
  },
];

const rules = [
  'No premature abstraction — earn complexity through proven need',
  'No speculative architecture — build for today, not imagined futures',
  'No wrapper functions that add no value — indirection must pay rent',
  'No new dependencies unless essential — each dependency is a liability',
  'Every line must earn its place — if it cannot justify itself, delete it',
];

const rebuildPrompt =
  'You are zendev, a disciplined builder. You only construct from what survives reduction.\n\nGiven this diagnosis from zengineer:\n1. Build only from essential elements\n2. Compose from existing primitives — do not create new abstractions\n3. Refuse any abstraction that does not pass all 5 filters\n4. Keep the implementation traceable and removable\n5. Output clean, minimal code with no decorative patterns\n\nRules:\n- No premature abstraction\n- No speculative architecture\n- No wrapper functions that add no value\n- Every line must earn its place';

export default function ZendevPage() {
  return (
    <>
      <Section className="pt-32">
        <h1 className="text-5xl md:text-7xl font-mono text-accent font-light tracking-tight mb-4">
          zendev
        </h1>
        <p className="text-lg text-white/50 mb-2">
          The builder agent.
        </p>
        <p className="text-white/40 max-w-3xl mt-6 leading-relaxed">
          zendev builds only after reduction. It does not write code
          from imagination — it constructs from the surviving elements
          of a zengineer audit. Every line it produces is traceable,
          removable, and justified. It refuses abstraction unless
          proven necessary.
        </p>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PRINCIPLES
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Five building principles.
        </h2>
        <div className="space-y-6 max-w-3xl">
          {principles.map((p) => (
            <div
              key={p.number}
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-xl font-mono text-accent font-light">
                  {p.number}
                </span>
                <span className="text-sm font-medium text-white/90">
                  {p.name}
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          IMPLEMENTATION RULES
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          The rules of construction.
        </h2>
        <div className="space-y-3 max-w-3xl">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <span className="text-accent text-sm mt-0.5">&#x2715;</span>
              <span className="text-sm text-white/60">
                {rule}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PROMPT
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          The zendev prompt.
        </h2>
        <div className="max-w-4xl">
          <PromptBlock
            title="zendev — Rebuild Prompt"
            description="Build from what survives reduction. No decorative patterns."
            prompt={rebuildPrompt}
          />
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            THE RELATIONSHIP
          </p>
          <h2 className="text-3xl font-light tracking-tight mb-8">
            zengineer reduces. zendev rebuilds.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-white/[0.06] bg-surface-primary text-center">
              <div className="font-mono text-accent mb-2">
                zengineer
              </div>
              <p className="text-sm text-white/40">
                Observes &rarr; Diagnoses &rarr; Recommends removal
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/[0.06] bg-surface-primary text-center">
              <div className="font-mono text-accent mb-2">
                zendev
              </div>
              <p className="text-sm text-white/40">
                Receives diagnosis &rarr; Builds from survivors
              </p>
            </div>
          </div>
          <p className="text-white/40 text-sm mt-8 leading-relaxed">
            The two agents form a complete cycle. zengineer strips
            the system to its essential core. zendev constructs on
            top of that core with discipline and restraint. Neither
            works alone — subtraction without construction is
            destruction, and construction without subtraction is
            accumulation.
          </p>
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Build with discipline.
          </h2>
          <p className="text-white/50 mb-8">
            Install the package or learn the method.
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
        </div>
      </Section>
    </>
  );
}
