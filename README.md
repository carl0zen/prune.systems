# PRUNE.SYSTEMS

> A subtractive systems discipline and minimal agent runtime.

**Other tools help you build more. PRUNE helps you decide what should not exist.**

## What is PRUNE?

PRUNE.SYSTEMS is a methodology and toolkit for auditing, simplifying, and refining systems before complexity hardens into debt.

It includes two conceptual agents:

- **zengineer** — Audit, simplify, identify dead weight, produce compressed diagnosis
- **zendev** — Build only from essentials, compose from existing primitives, refuse unnecessary abstraction

## Quick Start

```bash
npm install prune-systems
```

```typescript
import { audit, classify, applyFilters } from 'prune-systems';

const diagnosis = audit({
  system: 'my-app',
  elements: modules,
  mode: 'audit',
});

console.log(diagnosis.summary);
```

## Repository Structure

```
prune.systems/
├── apps/web/          → Marketing & documentation site
├── packages/core/     → npm package (prune-systems)
└── README.md
```

## Links

- [Website](https://prune.systems)
- [Method](https://prune.systems/method)
- [Docs](https://prune.systems/docs)
- [Manifesto](https://prune.systems/manifesto)
- [npm Package](https://www.npmjs.com/package/prune-systems)

## License

MIT
