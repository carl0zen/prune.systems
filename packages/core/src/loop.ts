import type {
  Metrics,
  Reduction,
  PruneResult,
} from './types';
import { analyzeSystem } from './analyzer';
import { classifyComponents } from './classifier';
import { proposeReductions } from './reducer';
import { evaluateConstraints } from './constraints';

/**
 * Execute the full PRUNE loop: analyze → classify → propose
 * reductions → validate each against constraints → return
 * the final result with before/after metrics and verdict.
 */
export function runPrune(rootPath: string): PruneResult {
  const analysis = analyzeSystem(rootPath);
  const before: Metrics = { ...analysis.metrics };

  const classified = classifyComponents(analysis);
  const proposals = proposeReductions(analysis, classified);

  const accepted: Reduction[] = [];
  const removed = new Set<string>();

  for (const proposal of proposals) {
    const candidateRemoved = new Set([
      ...removed,
      ...proposal.targets,
    ]);
    const result = evaluateConstraints(analysis, candidateRemoved);

    if (result.functionPreserved) {
      accepted.push(proposal);
      for (const t of proposal.targets) {
        removed.add(t);
      }
    }
  }

  const finalConstraints = evaluateConstraints(analysis, removed);
  const after = computeRemainingMetrics(analysis, removed);

  let verdict: PruneResult['verdict'];
  if (proposals.length === 0) {
    verdict = 'SUCCESS';
  } else if (
    accepted.length > 0 &&
    finalConstraints.functionPreserved
  ) {
    verdict = 'SUCCESS';
  } else if (
    accepted.length > 0 &&
    !finalConstraints.functionPreserved
  ) {
    verdict = 'PARTIAL';
  } else {
    verdict = 'FAILURE';
  }

  return {
    before,
    after,
    reductions: accepted,
    constraints: finalConstraints,
    verdict,
  };
}

/**
 * Recompute metrics for the subset of files not in the
 * removed set.
 */
function computeRemainingMetrics(
  analysis: import('./types').SystemAnalysis,
  removed: Set<string>,
): Metrics {
  const { graph } = analysis;
  let files = 0;
  let totalLoc = 0;
  let dependencies = 0;
  let maxDepsPerFile = 0;

  for (const [file, node] of graph.nodes) {
    if (removed.has(file)) continue;
    files++;
    totalLoc += node.loc;

    const forward = graph.forward.get(file);
    if (forward) {
      let depCount = 0;
      for (const dep of forward) {
        if (!removed.has(dep)) depCount++;
      }
      dependencies += depCount;
      if (depCount > maxDepsPerFile) maxDepsPerFile = depCount;
    }
  }

  const avgDepsPerFile = files > 0
    ? dependencies / files
    : 0;

  return {
    files,
    totalLoc,
    dependencies,
    avgDepsPerFile,
    maxDepsPerFile,
  };
}
