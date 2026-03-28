import type { Diagnosis, Change, ClassificationResult } from './types';

/**
 * Format a single change as a markdown list item.
 */
function formatChange(change: Change, index: number): string {
  return [
    `${index + 1}. **${change.type.toUpperCase()}** \`${change.target}\``,
    `   ${change.description}`,
    `   *Impact:* ${change.impact} | *Effort:* ${change.effort}`,
    `   *Reason:* ${change.reasoning}`,
  ].join('\n');
}

/**
 * Format a single element result as a markdown list item.
 */
function formatElement(result: ClassificationResult): string {
  const { element, classification, confidence, evidence } = result;
  const lines = [
    `### ${element.name}`,
    `- **Type:** ${element.type}`,
    `- **Classification:** ${classification}`,
    `- **Confidence:** ${(confidence * 100).toFixed(0)}%`,
  ];

  if (evidence.length > 0) {
    lines.push('- **Evidence:**');
    for (const e of evidence) {
      lines.push(`  - ${e}`);
    }
  }

  return lines.join('\n');
}

/**
 * Render a complete Diagnosis as a readable markdown report.
 *
 * @param diagnosis - The diagnosis to format
 * @returns A multi-section markdown string
 */
export function formatDiagnosis(diagnosis: Diagnosis): string {
  const { system, mode, timestamp, summary, stats, changes, elements } =
    diagnosis;

  const date = timestamp.split('T')[0];

  const sections: string[] = [];

  // Header
  sections.push(`# System Diagnosis: ${system}`);
  sections.push('');
  sections.push(
    `**Mode:** ${mode} | **Date:** ${date} | **Health:** ${stats.healthScore}%`
  );

  // Summary
  sections.push('');
  sections.push('## Summary');
  sections.push(summary);

  // Statistics table
  sections.push('');
  sections.push('## Statistics');
  sections.push('| Classification | Count |');
  sections.push('|---|---|');
  sections.push(`| Living | ${stats.living} |`);
  sections.push(`| Dead | ${stats.dead} |`);
  sections.push(`| Dormant | ${stats.dormant} |`);
  sections.push(`| Duplicated | ${stats.duplicated} |`);
  sections.push(`| Decorative | ${stats.decorative} |`);
  sections.push(`| Parasitic | ${stats.parasitic} |`);
  sections.push(`| **Total** | **${stats.total}** |`);

  // Changes
  sections.push('');
  sections.push('## Recommended Changes');
  if (changes.length === 0) {
    sections.push('No changes recommended — the system is healthy.');
  } else {
    sections.push(
      changes.map((c, i) => formatChange(c, i)).join('\n\n')
    );
  }

  // Elements
  sections.push('');
  sections.push('## Elements');
  sections.push(
    elements.map((el) => formatElement(el)).join('\n\n')
  );

  return sections.join('\n');
}
