import type {
  Change,
  ClassificationResult,
  Diagnosis,
  DiagnosisStats,
  Impact,
  Mode,
} from './types';

const IMPACT_WEIGHT: Record<Impact, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Build a DiagnosisStats object from classification results.
 */
function computeStats(
  elements: ClassificationResult[]
): DiagnosisStats {
  const total = elements.length;
  let living = 0;
  let dead = 0;
  let dormant = 0;
  let duplicated = 0;
  let decorative = 0;
  let parasitic = 0;

  for (const { classification } of elements) {
    switch (classification) {
      case 'living':
        living++;
        break;
      case 'dead':
        dead++;
        break;
      case 'dormant':
        dormant++;
        break;
      case 'duplicated':
        duplicated++;
        break;
      case 'decorative':
        decorative++;
        break;
      case 'parasitic':
        parasitic++;
        break;
    }
  }

  const healthScore =
    total > 0 ? Math.round((living / total) * 100) : 100;

  return {
    total,
    living,
    dead,
    dormant,
    duplicated,
    decorative,
    parasitic,
    healthScore,
  };
}

/**
 * Assemble a complete Diagnosis from classification results and changes.
 *
 * @param system   - Name of the analyzed system
 * @param mode     - Analysis mode that was used
 * @param elements - Classification results for all elements
 * @param changes  - Recommended changes
 * @returns A fully populated Diagnosis
 */
export function createDiagnosis(
  system: string,
  mode: Mode,
  elements: ClassificationResult[],
  changes: Change[]
): Diagnosis {
  const stats = computeStats(elements);
  const timestamp = new Date().toISOString();

  const parts: string[] = [
    `${stats.total} elements analyzed.`,
  ];
  if (stats.dead > 0) parts.push(`${stats.dead} dead.`);
  if (stats.duplicated > 0)
    parts.push(`${stats.duplicated} duplicated.`);
  if (stats.parasitic > 0)
    parts.push(`${stats.parasitic} parasitic.`);
  if (stats.dormant > 0) parts.push(`${stats.dormant} dormant.`);
  if (stats.decorative > 0)
    parts.push(`${stats.decorative} decorative.`);
  parts.push(`Health: ${stats.healthScore}%.`);

  const summary = parts.join(' ');

  return {
    system,
    mode,
    timestamp,
    elements,
    changes: rankChanges(changes),
    summary,
    stats,
  };
}

/**
 * Rank changes by descending impact, then ascending effort.
 *
 * @param changes - Unordered list of changes
 * @returns A new array sorted by priority
 */
export function rankChanges(changes: Change[]): Change[] {
  return [...changes].sort((a, b) => {
    const impactDiff =
      IMPACT_WEIGHT[b.impact] - IMPACT_WEIGHT[a.impact];
    if (impactDiff !== 0) return impactDiff;
    return IMPACT_WEIGHT[a.effort] - IMPACT_WEIGHT[b.effort];
  });
}
