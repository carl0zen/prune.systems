# prune-systems

> A subtractive systems discipline and minimal agent runtime.

Other tools help you build more. **PRUNE** helps you decide what should not exist.

## Install

```bash
npm install prune-systems
```

## Quick Start

```typescript
import { audit, formatDiagnosis } from 'prune-systems';

const result = audit({
  system: 'my-app',
  elements: [
    {
      name: 'AuthService',
      type: 'core',
      dependents: ['App', 'Dashboard', 'Settings'],
      dependencies: ['TokenStore'],
      description: 'Handles user authentication and session management.',
    },
    {
      name: 'LegacyLogger',
      type: 'module',
      dependents: [],
      dependencies: ['fs'],
      lastModified: '2023-01-15',
      description: 'Old logging module replaced by structured logger.',
    },
    {
      name: 'LoggerV2',
      type: 'module',
      dependents: ['App'],
      dependencies: ['fs'],
      description: 'Structured logger — duplicate of LegacyLogger.',
      metadata: { similarTo: 'LegacyLogger' },
    },
    {
      name: 'HelperUtils',
      type: 'helper',
      dependents: [],
      linesOfCode: 8,
      description: 'Thin wrapper around string utilities.',
    },
  ],
});

console.log(formatDiagnosis(result));
```

## API Reference

### `audit(config: AuditConfig): Diagnosis`

Run a full system audit. Classifies every element, applies filters, generates
ranked change recommendations, and returns a complete diagnosis.

### `classify(element: SystemElement): ClassificationResult`

Classify a single element into one of six health categories using heuristic
analysis of dependencies, staleness, complexity, and naming patterns.

### `applyFilters(element: SystemElement, allElements?: SystemElement[]): FilterResult`

Evaluate an element against the five subtractive filters, producing boolean
flags and an aggregate score.

### `formatDiagnosis(diagnosis: Diagnosis): string`

Render a diagnosis as a clean, readable markdown report with statistics,
recommended changes, and element details.

### `createDiagnosis(system, mode, elements, changes): Diagnosis`

Assemble a Diagnosis object from raw classification results and changes.
Computes statistics and generates a summary.

### `rankChanges(changes: Change[]): Change[]`

Sort changes by descending impact and ascending effort for prioritisation.

## Classifications

| Classification | Meaning |
|---|---|
| **living** | Actively used, maintained, and connected — the system needs it. |
| **dead** | No dependents and not recently modified — safe to remove. |
| **dormant** | Low activity or minimal usage — evaluate whether it is still needed. |
| **duplicated** | Functionally equivalent to another element — candidates for merging. |
| **decorative** | Thin wrappers or facades with no real consumers — visual weight only. |
| **parasitic** | High complexity or excessive dependencies that drain the system. |

## The Five Filters

Every element is evaluated against five subtractive filters:

0. **Can this be removed entirely?** — The zero filter. If yes, remove it.
1. **Is this essential?** — Does the system break without it?
2. **Is this symbiotic?** — Is it connected in both directions (gives and receives)?
3. **Is this traceable?** — Can you explain what it does and why it exists?
4. **Is this removable later?** — If you keep it now, can you safely remove it in the future?

An element that fails most filters is a strong candidate for pruning.

## Philosophy

Subtraction is harder than addition. Every system accumulates weight over
time — dead modules, duplicated logic, decorative wrappers that obscure
intent. PRUNE applies a disciplined, filter-based methodology to surface
what should not exist so you can act on it.

The goal is not minimalism for its own sake. The goal is **clarity**: a
system where every element earns its place.

## License

MIT
