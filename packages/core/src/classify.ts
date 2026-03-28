import type {
  SystemElement,
  ClassificationResult,
  Classification,
} from './types';

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;
const DECORATIVE_TYPES = ['wrapper', 'decorator', 'helper'];
const DUPLICATE_KEYWORDS = ['copy', 'duplicate', 'v2'];

/**
 * Determines how many milliseconds have elapsed since a given ISO date.
 * Returns Infinity when the date is missing or unparseable.
 */
function daysSinceModified(lastModified?: string): number {
  if (!lastModified) return Infinity;
  const parsed = Date.parse(lastModified);
  if (Number.isNaN(parsed)) return Infinity;
  return Date.now() - parsed;
}

/**
 * Classify a system element using heuristic analysis.
 *
 * Evaluates staleness, dependency graph shape, complexity, metadata,
 * and naming patterns to assign one of six classifications.
 *
 * @param element - The system element to classify
 * @returns A classification result with confidence and evidence
 */
export function classify(
  element: SystemElement
): ClassificationResult {
  const evidence: string[] = [];
  let classification: Classification = 'living';
  let confidence = 0.5;

  const dependentsCount = element.dependents?.length ?? 0;
  const dependenciesCount = element.dependencies?.length ?? 0;
  const elapsed = daysSinceModified(element.lastModified);

  // --- Dead: no dependents AND stale ---
  if (dependentsCount === 0 && elapsed > NINETY_DAYS_MS) {
    classification = 'dead';
    confidence = 0.9;
    evidence.push('No dependents found.');
    evidence.push(
      element.lastModified
        ? `Last modified over 90 days ago (${element.lastModified}).`
        : 'No lastModified date recorded.'
    );
    return { element, classification, confidence, evidence };
  }

  // --- Duplicated: metadata hint or naming pattern ---
  const hasSimilarTo = element.metadata?.['similarTo'] !== undefined;
  const descLower = (element.description ?? '').toLowerCase();
  const hasDuplicateKeyword = DUPLICATE_KEYWORDS.some((kw) =>
    descLower.includes(kw)
  );

  if (hasSimilarTo || hasDuplicateKeyword) {
    classification = 'duplicated';
    confidence = hasSimilarTo ? 0.9 : 0.7;
    if (hasSimilarTo) {
      evidence.push(
        `Metadata "similarTo" points to "${String(element.metadata!['similarTo'])}".`
      );
    }
    if (hasDuplicateKeyword) {
      evidence.push(
        'Description contains duplication keyword ' +
          `("${DUPLICATE_KEYWORDS.find((kw) => descLower.includes(kw))}").`
      );
    }
    return { element, classification, confidence, evidence };
  }

  // --- Decorative: tiny, disconnected, wrapper-like ---
  const typeLower = element.type.toLowerCase();
  const isDecorativeType = DECORATIVE_TYPES.some((t) =>
    typeLower.includes(t)
  );

  if (
    (element.linesOfCode ?? Infinity) < 10 &&
    dependentsCount === 0 &&
    isDecorativeType
  ) {
    classification = 'decorative';
    confidence = 0.9;
    evidence.push(
      `Lines of code (${element.linesOfCode}) below threshold of 10.`
    );
    evidence.push('No dependents.');
    evidence.push(`Type "${element.type}" matches decorative pattern.`);
    return { element, classification, confidence, evidence };
  }

  // --- Parasitic: high complexity or heavy consumer ---
  const isHighComplexity = (element.complexity ?? 0) > 15;
  const isHeavyConsumer =
    dependenciesCount > 5 && dependentsCount < 2;

  if (isHighComplexity || isHeavyConsumer) {
    classification = 'parasitic';
    confidence = isHighComplexity ? 0.9 : 0.7;
    if (isHighComplexity) {
      evidence.push(
        `Complexity (${element.complexity}) exceeds threshold of 15.`
      );
    }
    if (isHeavyConsumer) {
      evidence.push(
        `High dependency count (${dependenciesCount}) with few dependents (${dependentsCount}).`
      );
    }
    return { element, classification, confidence, evidence };
  }

  // --- Dormant: low activity or low usage ---
  if (
    (dependentsCount > 0 && dependentsCount < 2) ||
    elapsed > SIXTY_DAYS_MS
  ) {
    classification = 'dormant';
    confidence = 0.7;
    if (dependentsCount > 0 && dependentsCount < 2) {
      evidence.push(
        `Only ${dependentsCount} dependent(s) — low usage.`
      );
    }
    if (elapsed > SIXTY_DAYS_MS) {
      evidence.push(
        element.lastModified
          ? `Last modified over 60 days ago (${element.lastModified}).`
          : 'No lastModified date recorded; assumed stale.'
      );
    }
    return { element, classification, confidence, evidence };
  }

  // --- Living: default ---
  evidence.push('Element is actively used and maintained.');
  return { element, classification, confidence, evidence };
}
