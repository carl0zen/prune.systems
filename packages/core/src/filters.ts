import type { SystemElement, FilterResult } from './types';

const ESSENTIAL_TYPES = ['core', 'entry'];

/**
 * Apply the five subtractive filters to a system element.
 *
 * Filters evaluate whether an element is essential, symbiotic,
 * traceable, and removable — producing an aggregate score.
 *
 * @param element     - The element to evaluate
 * @param allElements - Full list of elements (used for cross-reference)
 * @returns A FilterResult with boolean flags, score, and reasoning
 */
export function applyFilters(
  element: SystemElement,
  allElements?: SystemElement[]
): FilterResult {
  const reasoning: string[] = [];
  const dependentsCount = element.dependents?.length ?? 0;
  const typeLower = element.type.toLowerCase();

  // --- Filter 1: Essential ---
  const essential =
    dependentsCount >= 2 ||
    ESSENTIAL_TYPES.some((t) => typeLower.includes(t));

  if (essential) {
    reasoning.push(
      dependentsCount >= 2
        ? `Essential: ${dependentsCount} dependents rely on this element.`
        : `Essential: type "${element.type}" is a core/entry type.`
    );
  } else {
    reasoning.push(
      'Not essential: fewer than 2 dependents and not a core type.'
    );
  }

  // --- Filter 2: Symbiotic ---
  const hasDeps = (element.dependencies?.length ?? 0) > 0;
  const hasDependents = dependentsCount > 0;
  const symbiotic = hasDeps && hasDependents;

  reasoning.push(
    symbiotic
      ? 'Symbiotic: connected in both directions (has dependencies and dependents).'
      : 'Not symbiotic: missing inbound or outbound connections.'
  );

  // --- Filter 3: Traceable ---
  const traceable =
    !!element.description && element.description.length > 10;

  reasoning.push(
    traceable
      ? 'Traceable: has a meaningful description.'
      : 'Not traceable: description is missing or too short.'
  );

  // --- Filter 4: Removable ---
  const essentialDependents = allElements
    ? element.dependents?.some((depName) => {
        const dep = allElements.find((e) => e.name === depName);
        if (!dep) return false;
        const depDependents = dep.dependents?.length ?? 0;
        return (
          depDependents >= 2 ||
          ESSENTIAL_TYPES.some((t) =>
            dep.type.toLowerCase().includes(t)
          )
        );
      }) ?? false
    : false;

  const removable = dependentsCount < 3 && !essentialDependents;

  reasoning.push(
    removable
      ? 'Removable: few dependents and none are essential.'
      : 'Not removable: too many dependents or an essential element depends on it.'
  );

  // --- Score: count of positive filter results ---
  const score =
    (essential ? 0 : 1) +
    (symbiotic ? 0 : 1) +
    (traceable ? 0 : 1) +
    (removable ? 1 : 0);

  return {
    removable,
    essential,
    symbiotic,
    traceable,
    score,
    reasoning,
  };
}
