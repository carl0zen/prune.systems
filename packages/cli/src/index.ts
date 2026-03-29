/**
 * PRUNE CLI — Constraint-based system analyzer.
 * No external arg parsing dependencies.
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  analyzeSystem,
  classifyComponents,
  proposeReductions,
  runPrune,
} from 'prune-systems';
import type {
  SystemAnalysis,
  ClassifiedNode,
  Reduction,
  PruneResult,
  ConstraintResult,
  Metrics,
} from 'prune-systems';
import {
  bold,
  dim,
  green,
  red,
  yellow,
  line,
  label,
  table,
} from './format';

const USAGE = `
${bold('PRUNE')} ${dim('— Constraint-based system analyzer')}

${label('Usage')}:
  prune analyze <path>     Analyze system structure
  prune reduce <path>      Propose reductions
  prune benchmark <path>   Simulate and benchmark

${dim('https://prune.systems')}
`.trim();

/** Resolve a path argument relative to cwd. */
function resolvePath(pathArg: string): string {
  return path.resolve(process.cwd(), pathArg);
}

/** Validate that a path exists on disk. */
function assertPathExists(resolved: string): void {
  if (!fs.existsSync(resolved)) {
    console.error(red('Error: path does not exist'));
    process.exit(1);
  }
}

/** Format a number with right-alignment for metric rows. */
function metric(value: number): string {
  return value.toLocaleString();
}

/** Print a section header. */
function header(title: string): void {
  console.log();
  console.log(`${bold('PRUNE')} ${dim('—')} ${title}`);
  console.log(dim(line('─', title.length + 10)));
}

/** Map smell type to a human-readable prefix. */
function smellLabel(type: string): string {
  const labels: Record<string, string> = {
    dead: 'Dead file',
    circular: 'Circular',
    large: 'Large file',
    duplicate: 'Duplicate',
  };
  return labels[type] ?? type;
}

/** Print system metrics in aligned two-column format. */
function printMetrics(metrics: Metrics): void {
  console.log();
  console.log(`  ${label('Metrics')}:`);
  console.log(table([
    ['Files', metric(metrics.files)],
    ['Lines', metric(metrics.totalLoc)],
    ['Dependencies', metric(metrics.dependencies)],
    ['Avg deps', metrics.avgDepsPerFile.toFixed(1)],
    ['Max deps', metric(metrics.maxDepsPerFile)],
  ]));
}

// ── Commands ──────────────────────────────────────────

function cmdAnalyze(pathArg: string): void {
  const resolved = resolvePath(pathArg);
  assertPathExists(resolved);

  const analysis: SystemAnalysis = analyzeSystem(resolved);

  header('System Analysis');
  console.log();
  console.log(`  ${dim('Path:')} ${resolved}`);
  printMetrics(analysis.metrics);

  if (analysis.smells.length > 0) {
    console.log();
    console.log(`  ${label('Smells')}:`);
    for (const smell of analysis.smells) {
      const targets = smell.targets.join(' → ');
      const prefix = yellow('⚠');
      const lbl = smellLabel(smell.type);
      const msg = smell.message
        ? ` — ${smell.message}`
        : '';
      console.log(`    ${prefix} ${lbl}: ${targets}${msg}`);
    }
  }

  console.log();
  console.log(
    dim(`  Found ${analysis.smells.length} smell${analysis.smells.length === 1 ? '' : 's'} in ${analysis.metrics.files} files.`)
  );
  console.log();
}

function cmdReduce(pathArg: string): void {
  const resolved = resolvePath(pathArg);
  assertPathExists(resolved);

  const analysis: SystemAnalysis = analyzeSystem(resolved);
  const classified: ClassifiedNode[] =
    classifyComponents(analysis);
  const reductions: Reduction[] =
    proposeReductions(analysis, classified);

  header('Reduction Proposals');

  // Tally classifications
  const counts: Record<string, number> = {};
  for (const node of classified) {
    counts[node.classification] =
      (counts[node.classification] ?? 0) + 1;
  }

  console.log();
  console.log(`  ${label('Classifications')}:`);
  const classOrder = [
    'dead', 'duplicated', 'decorative',
    'parasitic', 'living',
  ];
  const classRows: [string, string][] = classOrder
    .filter((c) => counts[c] !== undefined)
    .map((c) => [
      c,
      `${counts[c]} file${counts[c] === 1 ? '' : 's'}`,
    ]);
  console.log(table(classRows));

  if (reductions.length > 0) {
    console.log();
    console.log(`  ${label('Proposals')}:`);
    const padIdx = String(reductions.length).length;
    for (let i = 0; i < reductions.length; i++) {
      const r = reductions[i];
      const idx = String(i + 1).padStart(padIdx);
      const targets = r.targets.join(', ');
      const into = r.into ? ` into ${r.into}` : '';
      console.log(
        `    ${dim(idx + '.')} ${bold(r.type.padEnd(8))}${targets}${into}`
      );
      console.log(
        `       ${dim(r.reason)}`
      );
    }
  }

  console.log();
  console.log(
    dim(`  ${reductions.length} reduction${reductions.length === 1 ? '' : 's'} proposed. Run \`prune benchmark <path>\` to simulate.`)
  );
  console.log();
}

function cmdBenchmark(pathArg: string): void {
  const resolved = resolvePath(pathArg);
  assertPathExists(resolved);

  const result: PruneResult = runPrune(resolved);

  header('Benchmark');

  const sections: [string, Metrics][] = [
    ['Before', result.before],
    ['After', result.after],
  ];

  for (const [name, m] of sections) {
    console.log();
    console.log(`  ${label(name)}:`);
    console.log(table([
      ['Files', metric(m.files)],
      ['Lines', metric(m.totalLoc)],
      ['Dependencies', metric(m.dependencies)],
    ]));
  }

  // Delta section
  console.log();
  console.log(`  ${label('Δ')}:`);
  const pctFiles = pctChange(result.before.files, result.after.files);
  const pctLines = pctChange(result.before.totalLoc, result.after.totalLoc);
  const pctDeps = pctChange(result.before.dependencies, result.after.dependencies);
  console.log(table([
    ['Files', colorPct(pctFiles)],
    ['Lines', colorPct(pctLines)],
    ['Dependencies', colorPct(pctDeps)],
  ]));

  // Constraints
  console.log();
  console.log(`  ${label('Constraints')}:`);
  const c = result.constraints;
  const check = (v: boolean | number): string => {
    if (typeof v === 'boolean') {
      return v ? green('✓') : red('✗');
    }
    return v.toFixed(2);
  };
  console.log(table([
    ['Function preserved', check(c.functionPreserved)],
    ['Irreducible', check(c.irreducible)],
    ['No duplication', check(c.noDuplication)],
    ['Local reasoning', check(c.localReasoning)],
    ['Traceability', check(c.traceability)],
  ]));

  // Verdict
  console.log();
  const verdictColor =
    result.verdict === 'SUCCESS' ? green :
    result.verdict === 'PARTIAL' ? yellow : red;
  console.log(`  ${bold('Verdict:')} ${verdictColor(result.verdict)}`);
  console.log();
}

// ── Helpers ───────────────────────────────────────────

function pctChange(before: number, after: number): number {
  if (before === 0) return 0;
  return Math.round(((after - before) / before) * 100);
}

function colorPct(pct: number): string {
  const formatted = `${pct > 0 ? '+' : ''}${pct}%`;
  return pct <= 0 ? green(formatted) : red(formatted);
}

// ── Main ──────────────────────────────────────────────

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];
  const pathArg = args[1];

  if (!command || command === 'help' || command === '--help') {
    console.log(USAGE);
    process.exit(0);
  }

  const commands: Record<string, (p: string) => void> = {
    analyze: cmdAnalyze,
    reduce: cmdReduce,
    benchmark: cmdBenchmark,
  };

  const handler = commands[command];
  if (!handler) {
    console.error(red(`Unknown command: ${command}`));
    console.log();
    console.log(USAGE);
    process.exit(1);
  }

  if (!pathArg) {
    console.error(red(`Missing path argument for "${command}"`));
    console.log();
    console.log(USAGE);
    process.exit(1);
  }

  handler(pathArg);
}

try {
  main();
} catch (err: unknown) {
  const message = err instanceof Error
    ? err.message
    : String(err);
  console.error(red(`Error: ${message}`));
  process.exit(1);
}
