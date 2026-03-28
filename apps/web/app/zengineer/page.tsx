import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { PromptBlock } from '@/components/prompt-block';

export const metadata: Metadata = {
  title: 'zengineer — The Auditor',
  description:
    'zengineer is the subtractive auditor agent. It observes, '
    + 'diagnoses, and recommends removal actions for any system.',
};

const capabilities = [
  {
    name: 'Audit',
    description:
      'Maps system structure and classifies every element as '
      + 'living, dead, dormant, duplicated, decorative, or parasitic.',
  },
  {
    name: 'Simplify',
    description:
      'Identifies merge and removal opportunities by questioning '
      + 'every abstraction layer and wrapper.',
  },
  {
    name: 'Diagnose',
    description:
      'Produces compressed analysis with classification tables, '
      + 'health scores, and evidence for each finding.',
  },
  {
    name: 'Recommend',
    description:
      'Outputs exact actions — remove, merge, rename, simplify — '
      + 'ranked by impact and effort.',
  },
];

const classifications = [
  {
    name: 'Living',
    color: 'text-green-400',
    description: 'Actively used, connected, maintained.',
  },
  {
    name: 'Dead',
    color: 'text-red-400',
    description: 'Unused, unreferenced, abandoned.',
  },
  {
    name: 'Dormant',
    color: 'text-yellow-400',
    description: 'Rarely used, low activity, fading relevance.',
  },
  {
    name: 'Duplicated',
    color: 'text-orange-400',
    description: 'Similar or identical to another element.',
  },
  {
    name: 'Decorative',
    color: 'text-purple-400',
    description: 'Exists for appearance, adds no function.',
  },
  {
    name: 'Parasitic',
    color: 'text-pink-400',
    description: 'High cost, low value, drains system health.',
  },
];

const auditPrompt =
  'You are zengineer, a subtractive systems auditor. Your role is to observe, diagnose, and recommend removal actions.\n\nGiven the following system, perform a complete audit:\n\n1. Map every module, component, function, and dependency\n2. Classify each as: living, dead, dormant, duplicated, decorative, or parasitic\n3. Apply the 5 filters to each element:\n   0. Can this be removed entirely?\n   1. Is this essential?\n   2. Is this symbiotic?\n   3. Is this traceable?\n   4. Is this removable later?\n4. Produce a diagnosis with:\n   - Classification table\n   - Health score\n   - Ranked list of recommended changes (remove, merge, rename, simplify)\n   - Expected outcome after changes\n\nBe precise. Be severe. Recommend removal by default.';

const simplifyPrompt =
  'You are zengineer in simplification mode. Your goal is to reduce system complexity without losing function.\n\nAnalyze this system and:\n1. Identify every abstraction layer\n2. Question each abstraction: does it earn its complexity?\n3. Find merge opportunities (similar modules, redundant wrappers)\n4. Propose the minimum viable architecture\n5. Output a ranked simplification plan\n\nRules:\n- Prefer deletion over refactoring\n- Prefer merging over separating\n- Prefer inlining over abstracting\n- Every remaining element must justify its existence';

export default function ZengineerPage() {
  return (
    <>
      <Section className="pt-32">
        <h1 className="text-5xl md:text-7xl font-mono text-accent font-light tracking-tight mb-4">
          zengineer
        </h1>
        <p className="text-lg text-white/50 mb-2">
          The auditor agent.
        </p>
        <p className="text-white/40 max-w-3xl mt-6 leading-relaxed">
          zengineer observes systems without judgment, classifies
          every element by its current contribution, and produces a
          precise diagnosis with ranked recommendations. It does not
          build. It does not suggest additions. Its only purpose is
          to find what should not exist and recommend its removal.
        </p>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CAPABILITIES
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          What zengineer does.
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((cap) => (
            <div
              key={cap.name}
              className="p-6 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <div className="text-sm font-mono text-accent mb-3">
                {cap.name}
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CLASSIFICATION OUTPUT
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          Six classifications.
        </h2>
        <div className="max-w-3xl space-y-3">
          {classifications.map((c) => (
            <div
              key={c.name}
              className="flex items-baseline gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-primary"
            >
              <span className={`text-sm font-mono w-24 shrink-0 ${c.color}`}>
                {c.name}
              </span>
              <span className="text-sm text-white/50">
                {c.description}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PROMPTS
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-12">
          The zengineer prompts.
        </h2>
        <div className="space-y-8 max-w-4xl">
          <PromptBlock
            title="zengineer — System Audit Prompt"
            description="Full system audit with classifications, filters, and ranked recommendations."
            prompt={auditPrompt}
          />
          <PromptBlock
            title="zengineer — Simplify Prompt"
            description="Reduce complexity by questioning every abstraction."
            prompt={simplifyPrompt}
          />
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Put zengineer to work.
          </h2>
          <p className="text-white/50 mb-8">
            Install the package or learn the method behind the agent.
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
