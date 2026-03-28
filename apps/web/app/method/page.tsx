import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'The Method',
  description:
    'The PRUNE method: a five-step subtractive discipline for '
    + 'auditing, simplifying, and refining systems.',
};

const classifications = [
  {
    name: 'Living',
    color: 'text-green-400',
    description:
      'Actively used, connected to other elements, maintained. '
      + 'This element earns its place.',
  },
  {
    name: 'Dead',
    color: 'text-red-400',
    description:
      'Unused, unreferenced, abandoned. No part of the system '
      + 'depends on it. Remove immediately.',
  },
  {
    name: 'Dormant',
    color: 'text-yellow-400',
    description:
      'Rarely used, low activity, fading relevance. Still '
      + 'connected but losing its reason to exist.',
  },
  {
    name: 'Duplicated',
    color: 'text-orange-400',
    description:
      'Similar or identical to another element. One of them '
      + 'should not exist. Merge or remove.',
  },
  {
    name: 'Decorative',
    color: 'text-purple-400',
    description:
      'Exists for appearance of sophistication. Adds complexity '
      + 'without adding function. The most dangerous kind.',
  },
  {
    name: 'Parasitic',
    color: 'text-pink-400',
    description:
      'High cost, low value. Drains system health through '
      + 'maintenance burden, performance cost, or cognitive load.',
  },
];

const filterDetails = [
  {
    number: '0',
    name: 'The Zero Filter',
    question: 'Can this be removed entirely?',
    explanation:
      'Ask this first. Always. Most elements were added with good '
      + 'intentions and never reconsidered. The zero filter forces '
      + 'the most important question: does this need to exist at all? '
      + 'If the answer is no, stop here. Remove it.',
  },
  {
    number: '1',
    name: 'Essential',
    question: 'Is this essential?',
    explanation:
      'Does the system break without this element? Not "would it '
      + 'be less convenient" — does it actually break? Essential '
      + 'means load-bearing. If the system functions without it, '
      + 'it is not essential.',
  },
  {
    number: '2',
    name: 'Symbiotic',
    question: 'Is this symbiotic with the rest of the system?',
    explanation:
      'Does this element both give to and receive from the system? '
      + 'Symbiotic elements are integrated — they connect, they '
      + 'depend, they are depended upon. Isolated elements that only '
      + 'take resources without contributing are parasitic.',
  },
  {
    number: '3',
    name: 'Traceable',
    question: 'Is this traceable to a clear purpose?',
    explanation:
      'Can you point to exactly why this element exists? Not a '
      + 'vague justification — a specific, current requirement. '
      + 'If nobody can explain why something exists, it probably '
      + 'should not.',
  },
  {
    number: '4',
    name: 'Removable',
    question: 'Can this be removed later without cascading damage?',
    explanation:
      'Even if an element passes all other filters today, if '
      + 'removing it later would cause cascading failures across '
      + 'the system, it is a risk. Good elements are loosely '
      + 'coupled — they can be extracted cleanly when their time comes.',
  },
];

const actionTypes = [
  {
    action: 'Remove',
    description:
      'Delete entirely. The element serves no current purpose.',
  },
  {
    action: 'Merge',
    description:
      'Combine with a similar element. Eliminate duplication.',
  },
  {
    action: 'Rename',
    description:
      'Clarify intent. Names should reveal purpose, not obscure it.',
  },
  {
    action: 'Simplify',
    description:
      'Reduce complexity. Strip unnecessary layers and indirection.',
  },
  {
    action: 'Extract',
    description:
      'Isolate a reusable core from a tangled element.',
  },
  {
    action: 'Inline',
    description:
      'Collapse an abstraction that does not earn its indirection.',
  },
];

export default function MethodPage() {
  return (
    <>
      <Section className="pt-32">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          THE METHOD
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Subtraction before construction.
        </h1>
        <p className="text-lg text-white/50 max-w-3xl">
          Most systems do not need more code. They need less
          duplication, less abstraction, less surface area, and more
          coherence. The PRUNE method is a five-step discipline for
          achieving this.
        </p>
      </Section>

      {/* Step 1 */}
      <Section>
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-light text-accent">
              01
            </span>
            <h2 className="text-3xl font-light tracking-tight">
              Observe
            </h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            Map the system as it exists. No opinions. No judgments.
            Just structure. Catalog every module, function,
            dependency, configuration, and workflow step. This is
            reconnaissance, not analysis. You cannot reduce what you
            have not seen. Observe the full topology before forming
            any conclusion about what should stay or go.
          </p>
        </div>
      </Section>

      {/* Step 2 */}
      <Section className="bg-surface-primary">
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-light text-accent">
              02
            </span>
            <h2 className="text-3xl font-light tracking-tight">
              Diagnose
            </h2>
          </div>
          <p className="text-white/60 leading-relaxed mb-12">
            Classify every element. Each component, module, function,
            and dependency receives one of six classifications based
            on its current state in the system.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </Section>

      {/* Step 3 */}
      <Section>
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-light text-accent">
              03
            </span>
            <h2 className="text-3xl font-light tracking-tight">
              Decide
            </h2>
          </div>
          <p className="text-white/60 leading-relaxed mb-12">
            Apply the filters. Every element that survived
            classification must now pass through five questions.
            These filters are ordered by severity — start from zero
            and work up.
          </p>
          <div className="space-y-6">
            {filterDetails.map((f) => (
              <div
                key={f.number}
                className="p-6 rounded-lg border border-white/[0.06] bg-surface-primary"
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-xl font-mono text-accent font-light">
                    {f.number}
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {f.name}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3 font-medium">
                  &ldquo;{f.question}&rdquo;
                </p>
                <p className="text-sm text-white/40 leading-relaxed">
                  {f.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Step 4 */}
      <Section className="bg-surface-primary">
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-light text-accent">
              04
            </span>
            <h2 className="text-3xl font-light tracking-tight">
              Act
            </h2>
          </div>
          <p className="text-white/60 leading-relaxed mb-4">
            Execute the changes. Each diagnosed element receives one
            of six actions. Prefer deletion. Prefer merging over
            separation. Prefer inlining over abstraction.
          </p>
          <div className="grid gap-3 mt-10">
            {actionTypes.map((a) => (
              <div
                key={a.action}
                className="flex items-baseline gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-void"
              >
                <span className="text-sm font-mono text-accent w-20 shrink-0">
                  {a.action}
                </span>
                <span className="text-sm text-white/50">
                  {a.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Step 5 */}
      <Section>
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-light text-accent">
              05
            </span>
            <h2 className="text-3xl font-light tracking-tight">
              Reflect
            </h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            Verify the outcome. Run the audit again. Compare before
            and after. Confirm nothing essential was lost. Document
            what was removed and why. Reflection closes the loop — it
            transforms a one-time cleanup into a repeatable
            discipline. The system should be measurably simpler,
            more coherent, and easier to reason about. If it is not,
            you removed too little or the wrong things.
          </p>
        </div>
      </Section>

      {/* Why subtraction comes first */}
      <Section className="bg-surface-primary">
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
            WHY THIS ORDER
          </p>
          <h2 className="text-3xl font-light tracking-tight mb-8">
            Why subtraction comes first.
          </h2>
          <div className="space-y-6 text-white/60 leading-relaxed">
            <p>
              Building on top of an unaudited system compounds debt.
              Every new feature inherits the weight of every
              unnecessary element beneath it. Every new abstraction
              must account for the decorative ones already in place.
            </p>
            <p>
              Subtraction reduces surface area. It makes the
              remaining system smaller, clearer, and more coherent.
              This makes subsequent construction cheaper, faster, and
              less likely to introduce new waste.
            </p>
            <p>
              The discipline is simple: reduce first, then build.
              Audit before architecture. Simplify before scaling.
              Remove before adding. This is not minimalism for its
              own sake — it is engineering discipline applied to the
              most neglected action in software: removal.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Apply the method.
          </h2>
          <p className="text-white/50 mb-8">
            Install the package or explore real-world examples.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
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
