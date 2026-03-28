/** Classification of a system element's health status */
export type Classification =
  | 'living'
  | 'dead'
  | 'dormant'
  | 'duplicated'
  | 'decorative'
  | 'parasitic';

/** Operational mode for system analysis */
export type Mode = 'audit' | 'simplify' | 'design' | 'refine';

/** Type of recommended change action */
export type ChangeType =
  | 'remove'
  | 'merge'
  | 'rename'
  | 'simplify'
  | 'extract'
  | 'inline';

/** Impact and effort levels for prioritizing changes */
export type Impact = 'high' | 'medium' | 'low';

/** A discrete unit within a system under analysis */
export interface SystemElement {
  /** Unique name identifying the element */
  name: string;
  /** Kind of element (e.g. 'component', 'module', 'token') */
  type: string;
  /** Human-readable description of the element's purpose */
  description?: string;
  /** Names of elements this element depends on */
  dependencies?: string[];
  /** Names of elements that depend on this element */
  dependents?: string[];
  /** ISO date string of last modification */
  lastModified?: string;
  /** Total lines of code in the element */
  linesOfCode?: number;
  /** Cyclomatic or cognitive complexity score */
  complexity?: number;
  /** Arbitrary metadata for custom analysis */
  metadata?: Record<string, unknown>;
}

/** Result of applying the 5 filters to an element */
export interface FilterResult {
  /** Whether the element can be safely removed */
  removable: boolean;
  /** Whether the element is essential to the system */
  essential: boolean;
  /** Whether the element is connected in both directions */
  symbiotic: boolean;
  /** Whether the element has adequate documentation */
  traceable: boolean;
  /** Aggregate score (0-4) of passing filters */
  score: number;
  /** Human-readable reasoning for each filter result */
  reasoning: string[];
}

/** Result of classifying a system element */
export interface ClassificationResult {
  /** The original element that was classified */
  element: SystemElement;
  /** The assigned classification */
  classification: Classification;
  /** Confidence level from 0.0 to 1.0 */
  confidence: number;
  /** Evidence strings supporting the classification */
  evidence: string[];
}

/** A recommended change to the system */
export interface Change {
  /** The type of change to perform */
  type: ChangeType;
  /** The element targeted by this change */
  target: string;
  /** Human-readable description of the change */
  description: string;
  /** Expected impact of the change */
  impact: Impact;
  /** Estimated effort to implement the change */
  effort: Impact;
  /** Why this change is recommended */
  reasoning: string;
}

/** Complete diagnosis of a system analysis */
export interface Diagnosis {
  /** Name of the system that was analyzed */
  system: string;
  /** Mode used for the analysis */
  mode: Mode;
  /** ISO timestamp of when the diagnosis was created */
  timestamp: string;
  /** Classification results for every analyzed element */
  elements: ClassificationResult[];
  /** Prioritized list of recommended changes */
  changes: Change[];
  /** One-line summary of the diagnosis */
  summary: string;
  /** Statistical breakdown of classifications */
  stats: DiagnosisStats;
}

/** Statistical breakdown of a diagnosis */
export interface DiagnosisStats {
  /** Total number of elements analyzed */
  total: number;
  /** Count of elements classified as living */
  living: number;
  /** Count of elements classified as dead */
  dead: number;
  /** Count of elements classified as dormant */
  dormant: number;
  /** Count of elements classified as duplicated */
  duplicated: number;
  /** Count of elements classified as decorative */
  decorative: number;
  /** Count of elements classified as parasitic */
  parasitic: number;
  /** Overall health score as a percentage (0-100) */
  healthScore: number;
}

/** Configuration for running an audit */
export interface AuditConfig {
  /** Name of the system being audited */
  system: string;
  /** Elements to analyze */
  elements: SystemElement[];
  /** Analysis mode (defaults to 'audit') */
  mode?: Mode;
  /** Stricter thresholds when true */
  strict?: boolean;
  /** Custom threshold override (0.0-1.0) */
  threshold?: number;
  /** Only include elements matching these names */
  include?: string[];
  /** Exclude elements matching these names */
  exclude?: string[];
}
