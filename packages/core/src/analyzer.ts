import * as fs from 'node:fs';
import * as path from 'node:path';
import type {
  FileNode,
  ImportRef,
  DependencyGraph,
  Smell,
  Metrics,
  SystemAnalysis,
} from './types';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

const IGNORE = new Set([
  'node_modules',
  '.git',
  'dist',
  '.next',
  'out',
  'coverage',
  '__tests__',
  '__mocks__',
]);

const LARGE_FILE_THRESHOLD = 300;

const ENTRY_PATTERNS = /^(index|main|app|server|cli)\./i;

/**
 * Recursively scan a directory and return parsed FileNode
 * objects for every source file found.
 */
function scanFiles(root: string): FileNode[] {
  const results: FileNode[] = [];

  function walk(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (!IGNORE.has(entry.name)) {
          walk(full);
        }
        continue;
      }

      const ext = path.extname(entry.name);
      if (!EXTENSIONS.includes(ext)) continue;

      const content = fs.readFileSync(full, 'utf-8');
      const lines = content.split('\n');
      const relativePath = path.relative(root, full);

      results.push({
        path: full,
        relativePath,
        imports: extractImports(content).map((raw) => ({
          raw,
          resolved: null,
        })),
        exports: extractExports(content),
        loc: lines.length,
      });
    }
  }

  walk(root);
  return results;
}

/**
 * Extract raw import source strings from file content.
 * Catches import...from, require(), dynamic import(),
 * and export...from patterns.
 */
function extractImports(content: string): string[] {
  const results: string[] = [];
  const re = /(?:from|require\s*\()\s*['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(content)) !== null) {
    results.push(match[1]);
  }

  return results;
}

/**
 * Extract exported symbol names from file content.
 * Handles named exports, default exports, module.exports,
 * and re-exports.
 */
function extractExports(content: string): string[] {
  const names = new Set<string>();

  const namedRe =
    /export\s+(?:default\s+)?(?:const|let|var|function\s*\*?|class|type|interface|enum)\s+(\w+)/g;
  let match: RegExpExecArray | null;

  while ((match = namedRe.exec(content)) !== null) {
    names.add(match[1]);
  }

  if (/export\s+default\b/.test(content)) {
    names.add('default');
  }

  const cjsObjRe = /module\.exports\s*=\s*\{([^}]+)\}/;
  const cjsMatch = cjsObjRe.exec(content);
  if (cjsMatch) {
    for (const key of cjsMatch[1].split(',')) {
      const trimmed = key.trim().split(/\s*:\s*/)[0].trim();
      if (trimmed) names.add(trimmed);
    }
  } else if (/module\.exports/.test(content)) {
    names.add('default');
  }

  const bracketExportRe =
    /export\s+(?:type\s+)?\{([^}]+)\}(\s*from\s*['"][^'"]+['"])?/g;
  while ((match = bracketExportRe.exec(content)) !== null) {
    if (match[2]) continue;
    const inner = match[1];
    for (const name of inner.split(',')) {
      const trimmed = name.trim().split(/\s+as\s+/).pop()!.trim();
      if (trimmed) names.add(trimmed);
    }
  }

  return [...names];
}

/**
 * Resolve a raw import specifier to a relative file path
 * within the project. Returns null for external packages.
 */
function resolveImport(
  raw: string,
  fromFilePath: string,
  rootDir: string,
): string | null {
  if (!raw.startsWith('.')) return null;

  const base = path.resolve(path.dirname(fromFilePath), raw);

  if (fs.existsSync(base) && fs.statSync(base).isFile()) {
    return path.relative(rootDir, base);
  }

  for (const ext of EXTENSIONS) {
    const withExt = base + ext;
    if (fs.existsSync(withExt)) {
      return path.relative(rootDir, withExt);
    }
  }

  for (const ext of EXTENSIONS) {
    const indexPath = path.join(base, 'index') + ext;
    if (fs.existsSync(indexPath)) {
      return path.relative(rootDir, indexPath);
    }
  }

  return null;
}

/**
 * Build a directed dependency graph from parsed file nodes.
 * Resolves import specifiers and populates forward/reverse
 * adjacency maps.
 */
function buildGraph(
  files: FileNode[],
  rootDir: string,
): DependencyGraph {
  const nodes = new Map<string, FileNode>();
  const forward = new Map<string, Set<string>>();
  const reverse = new Map<string, Set<string>>();

  for (const file of files) {
    nodes.set(file.relativePath, file);
    forward.set(file.relativePath, new Set());
    reverse.set(file.relativePath, new Set());
  }

  for (const file of files) {
    const resolvedImports: ImportRef[] = [];

    for (const imp of file.imports) {
      const resolved = resolveImport(
        imp.raw,
        file.path,
        rootDir,
      );
      resolvedImports.push({ raw: imp.raw, resolved });

      if (resolved && nodes.has(resolved)) {
        forward.get(file.relativePath)!.add(resolved);
        reverse.get(resolved)!.add(file.relativePath);
      }
    }

    file.imports = resolvedImports;
  }

  return { nodes, forward, reverse };
}

/**
 * Compute aggregate metrics from a dependency graph.
 */
function computeMetrics(graph: DependencyGraph): Metrics {
  const files = graph.nodes.size;
  let totalLoc = 0;
  let dependencies = 0;
  let maxDepsPerFile = 0;

  for (const [, node] of graph.nodes) {
    totalLoc += node.loc;
  }

  for (const [, deps] of graph.forward) {
    dependencies += deps.size;
    if (deps.size > maxDepsPerFile) {
      maxDepsPerFile = deps.size;
    }
  }

  const avgDepsPerFile = files > 0
    ? dependencies / files
    : 0;

  return { files, totalLoc, dependencies, avgDepsPerFile, maxDepsPerFile };
}

/**
 * Detect code smells: circular deps, dead files,
 * large files, and duplicate exports.
 */
function detectSmells(graph: DependencyGraph): Smell[] {
  const smells: Smell[] = [];

  detectCircularDeps(graph, smells);
  detectDeadFiles(graph, smells);
  detectLargeFiles(graph, smells);
  detectDuplicateExports(graph, smells);

  return smells;
}

function detectCircularDeps(
  graph: DependencyGraph,
  smells: Smell[],
): void {
  const visited = new Set<string>();
  const inStack = new Set<string>();
  const pathStack: string[] = [];
  const seen = new Set<string>();

  function dfs(node: string): void {
    if (visited.has(node)) return;

    visited.add(node);
    inStack.add(node);
    pathStack.push(node);

    const deps = graph.forward.get(node);
    if (deps) {
      for (const dep of deps) {
        if (inStack.has(dep)) {
          const cycleStart = pathStack.indexOf(dep);
          const cycle = pathStack.slice(cycleStart);
          const key = [...cycle].sort().join('|');

          if (!seen.has(key)) {
            seen.add(key);
            const chain = [...cycle, cycle[0]].join(' → ');
            smells.push({
              type: 'circular-dep',
              targets: [...cycle],
              message: `Circular dependency: ${chain}`,
            });
          }
        } else if (!visited.has(dep)) {
          dfs(dep);
        }
      }
    }

    pathStack.pop();
    inStack.delete(node);
  }

  for (const node of graph.nodes.keys()) {
    dfs(node);
  }
}

function detectDeadFiles(
  graph: DependencyGraph,
  smells: Smell[],
): void {
  for (const [file] of graph.nodes) {
    const rev = graph.reverse.get(file);
    if (
      (!rev || rev.size === 0) &&
      !ENTRY_PATTERNS.test(path.basename(file))
    ) {
      smells.push({
        type: 'dead-file',
        targets: [file],
        message: 'Not imported by any file',
      });
    }
  }
}

function detectLargeFiles(
  graph: DependencyGraph,
  smells: Smell[],
): void {
  for (const [file, node] of graph.nodes) {
    if (node.loc > LARGE_FILE_THRESHOLD) {
      smells.push({
        type: 'large-file',
        targets: [file],
        message: `${node.loc} lines`,
      });
    }
  }
}

function detectDuplicateExports(
  graph: DependencyGraph,
  smells: Smell[],
): void {
  const exportMap = new Map<string, string[]>();

  for (const [file, node] of graph.nodes) {
    for (const name of node.exports) {
      if (name === 'default') continue;
      const list = exportMap.get(name);
      if (list) {
        list.push(file);
      } else {
        exportMap.set(name, [file]);
      }
    }
  }

  for (const [name, files] of exportMap) {
    if (files.length >= 2) {
      smells.push({
        type: 'duplicate-export',
        targets: files,
        message: `"${name}" exported by multiple files`,
      });
    }
  }
}

/**
 * Analyze a codebase rooted at `rootPath`.
 * Scans files, builds a dependency graph, computes metrics,
 * and detects code smells.
 */
export function analyzeSystem(rootPath: string): SystemAnalysis {
  const root = path.resolve(rootPath);
  const files = scanFiles(root);
  const graph = buildGraph(files, root);
  const metrics = computeMetrics(graph);
  const smells = detectSmells(graph);

  return { root, graph, metrics, smells };
}
