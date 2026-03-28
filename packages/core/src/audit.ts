import type {
  AuditConfig,
  Change,
  ClassificationResult,
  Diagnosis,
  Impact,
  SystemElement,
} from './types';
import { classify } from './classify';
import { applyFilters } from './filters';
import { createDiagnosis } from './diagnosis';

/**
 * Derive a recommended change from a classification result.
 * Maps each non-living classification to a concrete action.
 */
function deriveChange(
  result: ClassificationResult,
  strict: boolean
): Change | null {
  const { element, classification } = result;

  switch (classification) {
    case 'dead':
      return {
        type: 'remove',
        target: element.name,
        description: `Remove dead element "${element.name}".`,
        impact: 'high',
        effort: 'low',
        reasoning:
          'Element has no dependents and has not been modified recently.',
      };

    case 'dormant':
      return {
        type: 'simplify',
        target: element.name,
        description: `Evaluate dormant element "${element.name}" — simplify or remove.`,
        impact: 'medium',
        effort: 'medium',
        reasoning:
          'Element shows low activity; determine if it is still needed.',
      };

    case 'duplicated':
      return {
        type: 'merge',
        target: element.name,
        description: `Merge duplicated element "${element.name}" with its counterpart.`,
        impact: 'high',
        effort: 'medium',
        reasoning:
          'Duplicate elements increase maintenance burden without adding value.',
      };

    case 'decorative':
      return {
        type: 'remove',
        target: element.name,
        description: `Remove decorative element "${element.name}".`,
        impact: strict ? 'high' : 'low',
        effort: 'low',
        reasoning:
          'Element is a thin wrapper with no dependents and minimal code.',
      };

    case 'parasitic': {
      const highComplexity = (element.complexity ?? 0) > 15;
      return {
        type: highComplexity ? 'extract' : 'simplify',
        target: element.name,
        description: highComplexity
          ? `Extract and decompose parasitic element "${element.name}".`
          : `Simplify parasitic element "${element.name}" to reduce coupling.`,
        impact: 'high',
        effort: 'high',
        reasoning:
          'Element consumes many dependencies or has excessive complexity.',
      };
    }

    case 'living':
    default:
      return null;
  }
}

/**
 * Filter elements by include/exclude name lists.
 */
function filterElements(
  elements: SystemElement[],
  include?: string[],
  exclude?: string[]
): SystemElement[] {
  let filtered = elements;

  if (include && include.length > 0) {
    const set = new Set(include);
    filtered = filtered.filter((el) => set.has(el.name));
  }

  if (exclude && exclude.length > 0) {
    const set = new Set(exclude);
    filtered = filtered.filter((el) => !set.has(el.name));
  }

  return filtered;
}

/**
 * Run a full system audit.
 *
 * Classifies every element, applies filters, generates recommended
 * changes, and assembles a complete diagnosis.
 *
 * @param config - Audit configuration with system name, elements, and options
 * @returns A complete Diagnosis object
 */
export function audit(config: AuditConfig): Diagnosis {
  const {
    system,
    mode = 'audit',
    strict = false,
    elements: rawElements,
    include,
    exclude,
  } = config;

  const elements = filterElements(rawElements, include, exclude);

  const classificationResults: ClassificationResult[] =
    elements.map((el) => classify(el));

  elements.forEach((el) => applyFilters(el, elements));

  const changes: Change[] = classificationResults
    .map((result) => deriveChange(result, strict))
    .filter((c): c is Change => c !== null);

  return createDiagnosis(system, mode, classificationResults, changes);
}
