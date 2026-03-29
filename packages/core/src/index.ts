export type {
  FileNode,
  ImportRef,
  DependencyGraph,
  Smell,
  Metrics,
  SystemAnalysis,
  Classification,
  ClassifiedNode,
  ReductionType,
  Reduction,
  ConstraintResult,
  PruneResult,
} from './types';

export { analyzeSystem } from './analyzer';
export { classifyComponents } from './classifier';
export { proposeReductions } from './reducer';
export { evaluateConstraints } from './constraints';
export { runPrune } from './loop';
