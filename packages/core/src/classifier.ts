import type {
  SystemAnalysis,
  ClassifiedNode,
  Classification,
} from './types';

const CLASSIFICATION_PRIORITY: Record<Classification, number> = {
  dead: 0,
  duplicated: 1,
  decorative: 2,
  parasitic: 3,
  living: 4,
};

/**
 * Classify every node in the dependency graph as living,
 * dead, duplicated, decorative, or parasitic based on
 * structural properties.
 */
export function classifyComponents(
  analysis: SystemAnalysis,
): ClassifiedNode[] {
  const { graph, metrics } = analysis;
  const results: ClassifiedNode[] = [];

  const exportIndex = buildExportIndex(analysis);

  for (const [file, node] of graph.nodes) {
    const dependents = graph.reverse.get(file)?.size ?? 0;
    const dependencies = graph.forward.get(file)?.size ?? 0;
    const isEntry = isEntryPoint(file);
    const avgDeps = metrics.avgDepsPerFile;

    if (dependents === 0 && !isEntry) {
      results.push({
        file,
        classification: 'dead',
        reason: 'No files import this module',
      });
      continue;
    }

    const dupMatch = findDuplicateExport(file, node.exports, exportIndex);
    if (dupMatch) {
      results.push({
        file,
        classification: 'duplicated',
        reason: `Shares "${dupMatch.name}" with ${dupMatch.other}`,
      });
      continue;
    }

    if (
      node.loc < 15 &&
      node.exports.length > 0 &&
      dependents <= 1
    ) {
      results.push({
        file,
        classification: 'decorative',
        reason: `Thin module (${node.loc} lines, `
          + `${node.exports.length} exports)`,
      });
      continue;
    }

    if (!isEntry && dependencies > avgDeps * 2 && dependents <= 1) {
      results.push({
        file,
        classification: 'parasitic',
        reason: `High fan-out (${dependencies} deps) `
          + `with ${dependents} dependent(s)`,
      });
      continue;
    }

    results.push({
      file,
      classification: 'living',
      reason: 'Active and connected',
    });
  }

  results.sort(
    (a, b) =>
      CLASSIFICATION_PRIORITY[a.classification]
      - CLASSIFICATION_PRIORITY[b.classification],
  );

  return results;
}

/** Map each export name → list of files that export it. */
function buildExportIndex(
  analysis: SystemAnalysis,
): Map<string, string[]> {
  const index = new Map<string, string[]>();

  for (const [file, node] of analysis.graph.nodes) {
    for (const name of node.exports) {
      if (name === 'default') continue;
      const list = index.get(name);
      if (list) {
        list.push(file);
      } else {
        index.set(name, [file]);
      }
    }
  }

  return index;
}

function findDuplicateExport(
  file: string,
  exports: string[],
  index: Map<string, string[]>,
): { name: string; other: string } | null {
  for (const name of exports) {
    if (name === 'default') continue;
    const owners = index.get(name);
    if (owners && owners.length >= 2) {
      const other = owners.find((f) => f !== file);
      if (other) return { name, other };
    }
  }
  return null;
}

function isEntryPoint(file: string): boolean {
  const entryRe = /^(index|main|app|server|cli)\./i;
  const basename = file.split('/').pop() ?? file;
  return entryRe.test(basename);
}
