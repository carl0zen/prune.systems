/** Parsed source file */
export interface FileNode {
  path: string;
  relativePath: string;
  imports: ImportRef[];
  exports: string[];
  loc: number;
}

/** Import reference */
export interface ImportRef {
  raw: string;
  resolved: string | null;
}

/** Directed dependency graph */
export interface DependencyGraph {
  nodes: Map<string, FileNode>;
  forward: Map<string, Set<string>>;
  reverse: Map<string, Set<string>>;
}

/** Detected code smell */
export interface Smell {
  type: 'circular-dep' | 'dead-file' | 'large-file' | 'duplicate-export';
  targets: string[];
  message: string;
}

/** Aggregate metrics */
export interface Metrics {
  files: number;
  totalLoc: number;
  dependencies: number;
  avgDepsPerFile: number;
  maxDepsPerFile: number;
}

/** Full system analysis */
export interface SystemAnalysis {
  root: string;
  graph: DependencyGraph;
  metrics: Metrics;
  smells: Smell[];
}

export type Classification =
  | 'living'
  | 'dead'
  | 'duplicated'
  | 'decorative'
  | 'parasitic';

/** Classified node */
export interface ClassifiedNode {
  file: string;
  classification: Classification;
  reason: string;
}

export type ReductionType = 'remove' | 'merge' | 'inline';

/** Proposed reduction */
export interface Reduction {
  type: ReductionType;
  targets: string[];
  into?: string;
  reason: string;
  impact: number;
}

/** Constraint evaluation result */
export interface ConstraintResult {
  functionPreserved: boolean;
  irreducible: boolean;
  noDuplication: boolean;
  localReasoning: number;
  traceability: number;
  valid: boolean;
}

/** Final PRUNE result */
export interface PruneResult {
  before: Metrics;
  after: Metrics;
  reductions: Reduction[];
  constraints: ConstraintResult;
  verdict: 'SUCCESS' | 'PARTIAL' | 'FAILURE';
}
