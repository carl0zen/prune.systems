/**
 * PRUNE CLI — ANSI color helpers and formatting utilities.
 * Zero external dependencies.
 */

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';

/** Wrap text in ANSI dim. */
export function dim(text: string): string {
  return `${DIM}${text}${RESET}`;
}

/** Wrap text in ANSI green. */
export function green(text: string): string {
  return `${GREEN}${text}${RESET}`;
}

/** Wrap text in ANSI red. */
export function red(text: string): string {
  return `${RED}${text}${RESET}`;
}

/** Wrap text in ANSI yellow. */
export function yellow(text: string): string {
  return `${YELLOW}${text}${RESET}`;
}

/** Wrap text in ANSI bold. */
export function bold(text: string): string {
  return `${BOLD}${text}${RESET}`;
}

/** Horizontal rule of repeated characters. */
export function line(char = '─', width = 30): string {
  return char.repeat(width);
}

/** Uppercase bold label. */
export function label(text: string): string {
  return bold(text.toUpperCase());
}

/**
 * Show a before → after delta with percentage change and color.
 * Negative changes are green (reduction), positive are red (growth).
 */
export function delta(
  before: number,
  after: number
): string {
  const diff = after - before;
  const pct = before === 0
    ? 0
    : Math.round((diff / before) * 100);
  const sign = pct > 0 ? '+' : '';
  const formatted = `${sign}${pct}%`;
  const colored = pct <= 0 ? green(formatted) : red(formatted);
  return `${before.toLocaleString()} → ${after.toLocaleString()} (${colored})`;
}

/** Simple two-column aligned output. */
export function table(rows: [string, string][]): string {
  const maxLeft = rows.reduce(
    (max, [left]) => Math.max(max, left.length),
    0
  );
  return rows
    .map(([left, right]) =>
      `  ${left.padEnd(maxLeft + 2)}${right}`
    )
    .join('\n');
}
