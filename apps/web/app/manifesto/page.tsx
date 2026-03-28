import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'The PRUNE.SYSTEMS manifesto. Subtraction is a feature. '
    + 'Most systems are never questioned.',
};

export default function ManifestoPage() {
  return (
    <>
      <Section className="pt-32 pb-0">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          MANIFESTO
        </p>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-16">
            Most systems are never questioned.
          </h1>

          <div className="space-y-8 text-white/60 leading-relaxed text-lg">
            <p>
              We add features. We add abstractions. We add
              dependencies, configurations, workflows, services. We
              celebrate what is new. We promote what is built. We
              measure output by what was created.
            </p>

            <p>
              Nobody gets promoted for removing a feature.
            </p>

            <p>
              Subtraction is the most underused action in
              engineering. It has no lobby, no conference talks, no
              metrics dashboard. Deletion does not appear in sprint
              velocity. Simplification is not a line item on a
              product roadmap. The absence of unnecessary code is
              invisible — and so it is never rewarded.
            </p>

            <p>
              And yet, subtraction is where coherence lives.
            </p>

            <p>
              Complexity is not a sign of sophistication. It is
              uninspected waste. A system with forty modules where
              twelve would suffice is not mature — it is neglected.
              The complexity was never questioned because questioning
              it was never anyone&apos;s job.
            </p>

            <p>
              PRUNE makes it someone&apos;s job.
            </p>

            <p>
              Coherence compounds. Every unnecessary element taxes
              every future decision. Every dormant feature confuses
              every new team member. Every decorative abstraction
              creates a false floor that the next developer must work
              around. The cost is not in the element itself — it is
              in the drag it creates across everything else.
            </p>

            <p>
              The best architecture is the one that survives its own
              audit.
            </p>

            <p>
              Elegance is not aesthetic. Elegance is operational. An
              elegant system is one where every element earns its
              place, every connection is symbiotic, and every
              abstraction can justify its cost. Elegance is the
              absence of waste, not the presence of beauty.
            </p>

            <p>
              Dead code is not harmless. It is a lie embedded in your
              system. It tells new developers that it matters. It
              occupies space in searches, in reviews, in mental
              models. It decays quietly until someone tries to change
              it and discovers it was never alive.
            </p>

            <p>
              Dormant features are promises your product no longer
              keeps. Users do not see them. The team does not maintain
              them. But they remain — consuming attention during
              audits, creating false complexity in planning, and
              giving the illusion that the system does more than it
              does.
            </p>

            <p>
              Decorative abstractions are the most dangerous — they
              feel like progress. A wrapper that wraps a wrapper. A
              service that delegates to another service. An interface
              that exists for theoretical extensibility that will
              never arrive. They pass code review because they look
              like engineering. They are not. They are weight.
            </p>

            <p>
              The five filters are not a framework. They are a habit.
              Can this be removed entirely? Is this essential? Is
              this symbiotic? Is this traceable? Can this be removed
              later? Ask these five questions of every element, every
              sprint, every quarter — and the system stays honest.
            </p>

            <p>
              Good systems can be traced, questioned, and removed
              cleanly. That is the standard. Not testability alone.
              Not performance alone. Traceability. Questionability.
              Removability. If you cannot explain why something
              exists, it probably should not.
            </p>

            <p>
              PRUNE exists because subtraction needs a discipline, a
              name, and a practice. It is not a tool for minimalism.
              It is a tool for honesty. It forces the question that
              systems are designed to avoid: what here should not
              exist?
            </p>

            <p className="text-white/80 text-xl font-light mt-12">
              Other tools help you build more. PRUNE helps you decide
              what should not exist.
            </p>
          </div>

          <div className="mt-16 pt-16 border-t border-white/[0.06]">
            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href="/method"
                className="text-accent text-sm hover:underline"
              >
                Read the method &rarr;
              </Link>
              <Link
                href="/install"
                className="text-accent text-sm hover:underline"
              >
                Install the package &rarr;
              </Link>
              <Link
                href="/docs"
                className="text-accent text-sm hover:underline"
              >
                Read the docs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
