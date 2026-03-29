import type {
  SystemAnalysis,
  ClassifiedNode,
  Reduction,
} from './types';

/**
 * Propose concrete reductions (remove, merge, inline) for
 * every non-living classified node in the system.
 * Returns proposals sorted by impact descending, deduplicated
 * so each target file appears at most once.
 */
export function proposeReductions(
  analysis: SystemAnalysis,
  classified: ClassifiedNode[],
): Reduction[] {
  const { graph } = analysis;
  const proposals: Reduction[] = [];
  const handled = new Set<string>();

  const exportIndex = buildExportIndex(analysis);

  for (const { file, classification } of classified) {
    if (handled.has(file)) continue;

    switch (classification) {
      case 'dead': {
        proposals.push({
          type: 'remove',
          targets: [file],
          reason: 'Dead module — not imported anywhere',
          impact: 0.9,
        });
        handled.add(file);
        break;
      }

      case 'duplicated': {
        const other = findDuplicatePeer(
          file,
          graph.nodes.get(file)!.exports,
          exportIndex,
        );
        if (other && !handled.has(other)) {
          const fileDeps = graph.reverse.get(file)?.size ?? 0;
          const otherDeps = graph.reverse.get(other)?.size ?? 0;
          const keepFile = otherDeps >= fileDeps ? other : file;
          const mergeFile = keepFile === file ? other : file;

          proposals.push({
            type: 'merge',
            targets: [file, other],
            into: keepFile,
            reason: `Merge duplicate into ${keepFile}`,
            impact: 0.7,
          });
          handled.add(file);
          handled.add(mergeFile);
        }
        break;
      }

      case 'decorative': {
        const dependents = graph.reverse.get(file);
        const dependent = dependents?.size
          ? [...dependents][0]
          : undefined;

        proposals.push({
          type: 'inline',
          targets: [file],
          into: dependent,
          reason: 'Inline thin wrapper into consumer',
          impact: 0.5,
        });
        handled.add(file);
        break;
      }

      case 'parasitic': {
        const dependents = graph.reverse.get(file)?.size ?? 0;
        if (dependents === 0) {
          proposals.push({
            type: 'remove',
            targets: [file],
            reason: 'Parasitic module with no dependents',
            impact: 0.6,
          });
          handled.add(file);
        }
        break;
      }

      default:
        break;
    }
  }

  deduplicateByTarget(proposals);

  proposals.sort((a, b) => b.impact - a.impact);

  return proposals;
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

function findDuplicatePeer(
  file: string,
  exports: string[],
  index: Map<string, string[]>,
): string | null {
  for (const name of exports) {
    if (name === 'default') continue;
    const owners = index.get(name);
    if (owners && owners.length >= 2) {
      const other = owners.find((f) => f !== file);
      if (other) return other;
    }
  }
  return null;
}

/**
 * If a target file appears in multiple proposals,
 * keep only the highest-impact one.
 */
function deduplicateByTarget(proposals: Reduction[]): void {
  const bestByTarget = new Map<string, number>();

  for (let i = 0; i < proposals.length; i++) {
    for (const target of proposals[i].targets) {
      const existing = bestByTarget.get(target);
      if (
        existing === undefined ||
        proposals[i].impact > proposals[existing].impact
      ) {
        bestByTarget.set(target, i);
      }
    }
  }

  const keepIndices = new Set(bestByTarget.values());
  let writeIdx = 0;

  for (let i = 0; i < proposals.length; i++) {
    if (keepIndices.has(i)) {
      proposals[writeIdx++] = proposals[i];
    }
  }

  proposals.length = writeIdx;
}
