import type {
  SystemAnalysis,
  ConstraintResult,
} from './types';

const ENTRY_RE = /^(index|main|app|server|cli)\./i;

/**
 * Evaluate whether a proposed set of removals preserves the
 * five structural constraints: function preservation,
 * irreducibility, no duplication, local reasoning, and
 * traceability.
 */
export function evaluateConstraints(
  analysis: SystemAnalysis,
  removed: Set<string>,
): ConstraintResult {
  const { graph } = analysis;

  const remaining = new Set<string>();
  for (const file of graph.nodes.keys()) {
    if (!removed.has(file)) remaining.add(file);
  }

  const functionPreserved = checkFunctionPreserved(
    analysis,
    remaining,
    removed,
  );
  const irreducible = checkIrreducible(analysis, remaining);
  const noDuplication = checkNoDuplication(analysis, remaining);
  const localReasoning = computeLocalReasoning(
    analysis,
    remaining,
  );
  const traceability = computeTraceability(analysis, remaining);

  const valid =
    functionPreserved &&
    localReasoning >= 0.3 &&
    traceability >= 0.3;

  return {
    functionPreserved,
    irreducible,
    noDuplication,
    localReasoning,
    traceability,
    valid,
  };
}

/**
 * Every remaining file's imports must still resolve to a
 * file that hasn't been removed.
 */
function checkFunctionPreserved(
  analysis: SystemAnalysis,
  remaining: Set<string>,
  removed: Set<string>,
): boolean {
  const { graph } = analysis;

  for (const file of remaining) {
    const node = graph.nodes.get(file);
    if (!node) continue;

    for (const imp of node.imports) {
      if (imp.resolved && removed.has(imp.resolved)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * The system is irreducible if every non-entry remaining
 * file is depended upon by at least one other remaining file.
 */
function checkIrreducible(
  analysis: SystemAnalysis,
  remaining: Set<string>,
): boolean {
  const { graph } = analysis;

  for (const file of remaining) {
    const basename = file.split('/').pop() ?? file;
    if (ENTRY_RE.test(basename)) continue;

    const reverseSet = graph.reverse.get(file);
    if (!reverseSet) return false;

    let hasRemainingDependent = false;
    for (const dep of reverseSet) {
      if (remaining.has(dep)) {
        hasRemainingDependent = true;
        break;
      }
    }

    if (!hasRemainingDependent) return false;
  }

  return true;
}

/**
 * No export name should appear in more than one remaining
 * file (excluding 'default').
 */
function checkNoDuplication(
  analysis: SystemAnalysis,
  remaining: Set<string>,
): boolean {
  const counts = new Map<string, number>();

  for (const file of remaining) {
    const node = analysis.graph.nodes.get(file);
    if (!node) continue;

    for (const name of node.exports) {
      if (name === 'default') continue;
      const count = (counts.get(name) ?? 0) + 1;
      counts.set(name, count);
      if (count >= 2) return false;
    }
  }

  return true;
}

/**
 * Score how loosely coupled the remaining modules are.
 * Lower aggregate fan-in * fan-out coupling yields a higher
 * score (closer to 1).
 */
function computeLocalReasoning(
  analysis: SystemAnalysis,
  remaining: Set<string>,
): number {
  const { graph } = analysis;
  const count = remaining.size;
  if (count === 0) return 1;

  let coupling = 0;

  for (const file of remaining) {
    let fanIn = 0;
    const reverseSet = graph.reverse.get(file);
    if (reverseSet) {
      for (const dep of reverseSet) {
        if (remaining.has(dep)) fanIn++;
      }
    }

    let fanOut = 0;
    const forwardSet = graph.forward.get(file);
    if (forwardSet) {
      for (const dep of forwardSet) {
        if (remaining.has(dep)) fanOut++;
      }
    }

    coupling += fanIn * fanOut;
  }

  const maxCoupling = count * count;
  const score = 1 - coupling / maxCoupling;

  return clamp(score, 0, 1);
}

/**
 * Score how traceable the remaining graph is via average
 * shortest path length between connected pairs (BFS).
 * Shorter average paths → higher traceability.
 */
function computeTraceability(
  analysis: SystemAnalysis,
  remaining: Set<string>,
): number {
  const { graph } = analysis;
  const nodes = [...remaining];
  const count = nodes.length;

  if (count <= 1) return 1;

  let totalPathLength = 0;
  let pairCount = 0;

  for (const start of nodes) {
    const distances = bfs(start, remaining, graph.forward);

    for (const [target, dist] of distances) {
      if (target !== start && dist > 0) {
        totalPathLength += dist;
        pairCount++;
      }
    }
  }

  if (pairCount === 0) return 1;

  const avgPathLength = totalPathLength / pairCount;
  const maxPath = count - 1;

  const score = maxPath > 0
    ? 1 - avgPathLength / maxPath
    : 1;

  return clamp(score, 0, 1);
}

/**
 * BFS from `start` through the forward graph, considering
 * only nodes in the `remaining` set.
 */
function bfs(
  start: string,
  remaining: Set<string>,
  forward: Map<string, Set<string>>,
): Map<string, number> {
  const distances = new Map<string, number>();
  distances.set(start, 0);

  const queue: string[] = [start];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];
    const dist = distances.get(current)!;
    const neighbors = forward.get(current);

    if (!neighbors) continue;

    for (const neighbor of neighbors) {
      if (remaining.has(neighbor) && !distances.has(neighbor)) {
        distances.set(neighbor, dist + 1);
        queue.push(neighbor);
      }
    }
  }

  return distances;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
