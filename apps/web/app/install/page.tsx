import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';
import { CopyButton } from '@/components/copy-button';

export const metadata: Metadata = {
  title: 'Install',
  description:
    'Install PRUNE — constraint-based system analyzer. CLI and TypeScript API.',
};

const programmaticCode = `import { analyzeSystem, classifyComponents, runPrune } from 'prune-systems';

// Option 1: Full automated run
const result = runPrune('./src');
console.log(result.verdict);         // → SUCCESS
console.log(result.before.files);    // → 42
console.log(result.after.files);     // → 19
console.log(result.reductions);      // → [{ type: 'remove', targets: [...] }, ...]

// Option 2: Step by step
const analysis = analyzeSystem('./src');
const classified = classifyComponents(analysis);

for (const node of classified) {
  if (node.classification !== 'living') {
    console.log(\`\${node.classification}: \${node.file} — \${node.reason}\`);
  }
}`;

const cliCode = `# Analyze: scan files, build graph, detect smells
$ prune analyze ./src

# Reduce: classify + propose reductions
$ prune reduce ./src

# Benchmark: full before/after with constraint validation
$ prune benchmark ./src`;

const apiExports = [
  { name: 'analyzeSystem', desc: 'Scan filesystem, build dependency graph, detect smells.' },
  { name: 'classifyComponents', desc: 'Classify nodes: living, dead, duplicated, decorative, parasitic.' },
  { name: 'proposeReductions', desc: 'Generate ranked reduction proposals.' },
  { name: 'evaluateConstraints', desc: 'Validate removals against 5 structural constraints.' },
  { name: 'runPrune', desc: 'Full loop: analyze → classify → propose → validate → verdict.' },
];

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
        <div className="inline-flex items-center gap-4 font-mono bg-surface-primary border border-accent/20 rounded-lg px-8 py-4 text-accent text-lg glow-accent">
          <span>npm install prune-systems</span>
          <CopyButton text="npm install prune-systems" />
        </div>
        <p className="text-sm text-white/30 mt-4">
          Node.js 18+. TypeScript. Zero external dependencies. 21KB.
        </p>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          CLI
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Three commands.
        </h2>
        <div className="max-w-4xl">
          <CodeBlock code={cliCode} language="bash" filename="terminal" />
        </div>
      </Section>

      <Section>
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          API
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Programmatic usage.
        </h2>
        <div className="max-w-4xl">
          <CodeBlock
            code={programmaticCode}
            language="typescript"
            filename="analyze.ts"
          />
        </div>
      </Section>

      <Section className="bg-surface-primary">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          EXPORTS
        </p>
        <h2 className="text-3xl font-light tracking-tight mb-8">
          Five functions. That&apos;s the API.
        </h2>
        <div className="space-y-3 max-w-3xl">
          {apiExports.map((fn) => (
            <div
              key={fn.name}
              className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.06] bg-surface-void"
            >
              <code className="font-mono text-sm text-accent shrink-0 w-48">
                {fn.name}
              </code>
              <span className="text-sm text-white/50">{fn.desc}</span>
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
              Full Docs
            </Link>
            <Link
              href="/examples"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
