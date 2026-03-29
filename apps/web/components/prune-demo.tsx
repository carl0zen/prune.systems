'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CopyButton } from '@/components/copy-button';

const SAMPLE_INPUT = `src/
  components/
    Header.tsx
    HeaderWrapper.tsx       ← wraps Header, adds nothing
    Footer.tsx
    FooterLegacy.tsx        ← unused since redesign
    Button.tsx
    ButtonV2.tsx            ← duplicate of Button
  utils/
    format.ts
    formatHelpers.ts        ← duplicates format.ts exports
    validate.ts
    validateInput.ts        ← duplicates validate.ts exports
    legacy.ts               ← dead import, nobody uses this
    unused.ts               ← dead, no imports
  api/
    client.ts
    clientV2.ts             ← started migration, never finished
    endpoints.ts
  config/
    settings.ts
    constants.ts`;

type Phase = 'idle' | 'scanning' | 'done';

interface MetricPair {
  label: string;
  before: number;
  after: number;
  format?: (n: number) => string;
}

interface Classification {
  type: string;
  count: number;
  color: string;
}

interface ReductionRow {
  type: 'remove' | 'merge' | 'inline';
  target: string;
  reason: string;
}

interface Constraint {
  name: string;
  pass: boolean;
  score?: number;
}

const METRICS: MetricPair[] = [
  { label: 'Files', before: 18, after: 12 },
  {
    label: 'Lines',
    before: 2400,
    after: 1650,
    format: (n) => n.toLocaleString(),
  },
  { label: 'Dependencies', before: 14, after: 8 },
];

const CLASSIFICATIONS: Classification[] = [
  { type: 'dead', count: 3, color: 'text-red-400' },
  { type: 'duplicated', count: 4, color: 'text-yellow-400' },
  { type: 'decorative', count: 1, color: 'text-white/40' },
  { type: 'living', count: 10, color: 'text-accent' },
];

const REDUCTIONS: ReductionRow[] = [
  { type: 'remove', target: 'FooterLegacy.tsx', reason: 'Dead — not imported' },
  { type: 'remove', target: 'legacy.ts', reason: 'Dead — not imported' },
  { type: 'remove', target: 'unused.ts', reason: 'Dead — not imported' },
  { type: 'merge', target: 'ButtonV2 → Button', reason: 'Duplicate exports' },
  { type: 'merge', target: 'formatHelpers → format', reason: 'Duplicate exports' },
  { type: 'merge', target: 'validateInput → validate', reason: 'Duplicate exports' },
  { type: 'merge', target: 'clientV2 → client', reason: 'Duplicate exports' },
  { type: 'inline', target: 'HeaderWrapper → Header', reason: 'Thin wrapper' },
];

const CONSTRAINTS: Constraint[] = [
  { name: 'Function preserved', pass: true },
  { name: 'Irreducible', pass: true },
  { name: 'No duplication', pass: true },
  { name: 'Local reasoning', pass: true, score: 0.82 },
  { name: 'Traceability', pass: true, score: 0.91 },
];

function pct(before: number, after: number): string {
  const p = Math.round(((after - before) / before) * 100);
  return p <= 0 ? `${p}%` : `+${p}%`;
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    remove: 'text-red-400/80 border-red-400/20 bg-red-400/5',
    merge: 'text-yellow-400/80 border-yellow-400/20 bg-yellow-400/5',
    inline: 'text-white/50 border-white/10 bg-white/[0.02]',
  };
  return (
    <span
      className={`text-xs font-mono px-2 py-0.5 rounded border ${
        colors[type] ?? colors.inline
      }`}
    >
      {type}
    </span>
  );
}

export function PruneDemo() {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [phase, setPhase] = useState<Phase>('idle');
  const resultRef = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    if (phase === 'scanning') return;
    setPhase('scanning');
    setTimeout(() => setPhase('done'), 1600);
  }, [phase]);

  useEffect(() => {
    if (phase === 'done' && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [phase]);

  return (
    <div className="space-y-4">
      {/* Input area */}
      <div className="rounded-lg border border-white/[0.06] bg-surface-void overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <span className="text-sm font-mono text-white/40">
            your system
          </span>
          <span className="text-xs text-white/20">
            paste your own or use example
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          className="w-full bg-transparent p-5 font-mono text-sm text-white/60 resize-none focus:outline-none leading-relaxed"
          placeholder="Paste your file tree, module list, or system description..."
          spellCheck={false}
        />
      </div>

      {/* Run button */}
      <button
        type="button"
        onClick={run}
        disabled={phase === 'scanning' || !input.trim()}
        className={`
          w-full py-4 rounded-lg font-medium text-lg transition-all
          ${phase === 'scanning'
            ? 'bg-accent/20 text-accent/60 cursor-wait'
            : 'bg-accent text-[#030303] hover:bg-accent-hover'}
          ${!input.trim() ? 'opacity-30 cursor-not-allowed' : ''}
        `}
      >
        {phase === 'scanning' ? (
          <span className="flex items-center justify-center gap-3">
            <span className="inline-block w-4 h-4 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
            Scanning structure...
          </span>
        ) : phase === 'done' ? (
          'Run PRUNE Again'
        ) : (
          'Run PRUNE'
        )}
      </button>

      {/* Results */}
      {phase === 'done' && (
        <div ref={resultRef} className="space-y-3 pt-4">
          {/* Delta metrics */}
          <div className="rounded-lg border border-accent/20 bg-surface-primary overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-accent tracking-wider uppercase">
                Delta
              </span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
              {METRICS.map((m) => {
                const fmt = m.format ?? String;
                return (
                  <div key={m.label} className="p-5 text-center">
                    <div className="text-xs text-white/30 mb-2">
                      {m.label}
                    </div>
                    <div className="font-mono text-white/50 text-sm">
                      <span>{fmt(m.before)}</span>
                      <span className="text-white/20 mx-1.5">&rarr;</span>
                      <span className="text-accent">{fmt(m.after)}</span>
                    </div>
                    <div className="font-mono text-accent text-lg mt-1">
                      {pct(m.before, m.after)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classifications */}
          <div className="rounded-lg border border-white/[0.06] bg-surface-primary overflow-hidden animate-fade-in-delay-1">
            <div className="px-5 py-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                Classifications
              </span>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CLASSIFICATIONS.map((c) => (
                <div key={c.type} className="text-center">
                  <div className={`font-mono text-2xl font-light ${c.color}`}>
                    {c.count}
                  </div>
                  <div className="text-xs text-white/30 mt-1">{c.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reductions */}
          <div className="rounded-lg border border-white/[0.06] bg-surface-primary overflow-hidden animate-fade-in-delay-2">
            <div className="px-5 py-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                Reductions
              </span>
              <span className="text-xs text-white/20 ml-2">
                {REDUCTIONS.length} proposed
              </span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {REDUCTIONS.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3"
                >
                  <span className="text-xs font-mono text-white/20 w-5 text-right shrink-0">
                    {i + 1}.
                  </span>
                  <TypeBadge type={r.type} />
                  <span className="font-mono text-sm text-white/70 truncate">
                    {r.target}
                  </span>
                  <span className="text-xs text-white/30 ml-auto shrink-0 hidden sm:block">
                    {r.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div className="rounded-lg border border-white/[0.06] bg-surface-primary overflow-hidden animate-fade-in-delay-3">
            <div className="px-5 py-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                Constraints
              </span>
            </div>
            <div className="p-5 space-y-3">
              {CONSTRAINTS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={c.pass ? 'text-accent' : 'text-red-400'}>
                      {c.pass ? '✓' : '✗'}
                    </span>
                    <span className="text-sm text-white/60">{c.name}</span>
                  </div>
                  {c.score !== undefined && (
                    <span className="font-mono text-sm text-white/40">
                      {c.score.toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verdict */}
          <div className="rounded-lg border border-accent/30 bg-accent/[0.04] p-6 text-center glow-accent animate-fade-in-delay-3">
            <div className="text-xs font-mono text-white/30 mb-2 uppercase tracking-wider">
              Verdict
            </div>
            <div className="font-mono text-3xl text-accent font-light">
              SUCCESS
            </div>
            <div className="text-sm text-white/40 mt-2">
              8 reductions accepted. All constraints passed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PromptCopyBlock() {
  const prompt = `You are PRUNE, a constraint-based system analyzer.

Audit the system I describe:

1. Scan every module, file, component, and dependency
2. Build the dependency graph
3. Classify each element:
   - living (actively used, connected)
   - dead (no imports, no dependents)
   - duplicated (same exports as another module)
   - decorative (thin wrapper, <15 lines)
   - parasitic (high deps, low value)
4. Propose reductions:
   - remove dead modules
   - merge duplicates (keep the one with more dependents)
   - inline decorative wrappers
5. Validate against constraints:
   - Function preserved (no broken imports)
   - Irreducible (nothing else can be removed)
   - No duplication (no shared exports remain)
   - Local reasoning (low coupling score)
   - Traceability (short dependency chains)
6. Output:
   - Before/after metrics (files, lines, deps)
   - Delta percentages
   - Constraint results (✓/✗)
   - Verdict: SUCCESS / PARTIAL / FAILURE

Be precise. Be severe. Default to removal.

Here is my system:`;

  return (
    <div className="rounded-lg border border-white/[0.06] bg-surface-void overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <span className="text-sm font-mono text-white/60">
          Run this in Claude, ChatGPT, or Cursor
        </span>
        <CopyButton text={prompt} />
      </div>
      <pre className="p-5 text-sm font-mono text-white/40 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
        {prompt}
      </pre>
    </div>
  );
}
