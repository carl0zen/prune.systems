import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { CodeBlock } from '@/components/code-block';

export const metadata: Metadata = {
  title: 'Examples',
  description:
    'Real-world examples of PRUNE.SYSTEMS audits: React dashboards, '
    + 'CI/CD pipelines, design systems, and startup architectures.',
};

const dashboardElements = `const elements = [
  { name: 'DashboardLayout', type: 'component', dependents: ['App'], dependencies: ['Sidebar', 'Header'] },
  { name: 'UserProfile', type: 'component', dependents: ['Header'], dependencies: ['AuthModule'] },
  { name: 'LegacyChart', type: 'component', dependents: [], lastModified: '2023-06-14' },
  { name: 'ChartV2', type: 'component', dependents: ['AnalyticsPanel'], dependencies: ['DataFetcher'] },
  { name: 'AnalyticsWrapper', type: 'wrapper', dependents: [], linesOfCode: 12, wraps: 'ChartV2' },
  { name: 'DataFetcher', type: 'utility', dependents: ['ChartV2', 'UserProfile'], dependencies: ['API'] },
  { name: 'UnusedModal', type: 'component', dependents: [], lastModified: '2023-09-22' },
  { name: 'MetricsHelper', type: 'utility', dependents: ['ChartV2'], linesOfCode: 180, functions: 14 },
];`;

const dashboardDiagnosis = `System Diagnosis: react-dashboard
═══════════════════════════════════

Health: 43% | 8 elements | 2 dead | 1 dormant | 1 duplicated | 1 decorative

Classification Table:
  DashboardLayout   living       ✓ Essential layout container
  UserProfile       living       ✓ Active, connected
  LegacyChart       dead         ✗ Zero dependents, 2+ years stale
  ChartV2           living       ✓ Active replacement for LegacyChart
  AnalyticsWrapper  decorative   ✗ 12-line wrapper adds no value
  DataFetcher       living       ✓ Shared utility, 2 dependents
  UnusedModal       dead         ✗ Zero dependents, 18 months stale
  MetricsHelper     dormant      ~ 180 lines, 14 functions, only 3 used

Recommended Changes (ranked):
  1. REMOVE  LegacyChart        Impact: high   Effort: low
  2. REMOVE  UnusedModal         Impact: high   Effort: low
  3. INLINE  AnalyticsWrapper    Impact: med    Effort: low
  4. RENAME  ChartV2 → Chart    Impact: low    Effort: low
  5. SIMPLIFY MetricsHelper      Impact: med    Effort: med

Expected: Health 43% → 85% | 8 → 5 elements | -37% surface area`;

const cicdElements = `pipeline:
  steps:
    - name: "Install dependencies"
      uses: npm ci
      status: active

    - name: "Run ESLint"
      uses: eslint .
      status: active

    - name: "Run Prettier check"
      uses: prettier --check .
      status: active

    - name: "Run legacy linter"
      uses: tslint --project .
      status: abandoned (TSLint deprecated 2019)

    - name: "Build application"
      uses: next build
      status: active

    - name: "Run unit tests"
      uses: jest --ci
      status: active

    - name: "Generate coverage badge"
      uses: coverage-badge-action
      status: unused (badge not displayed anywhere)`;

const cicdDiagnosis = `System Diagnosis: ci-cd-pipeline
═══════════════════════════════════

Health: 57% | 7 steps | 1 dead | 1 dead | 1 duplicated

Classification Table:
  Install dependencies    living       ✓ Required first step
  Run ESLint              living       ✓ Active linter
  Run Prettier check      duplicated   ~ Overlaps with ESLint formatting rules
  Run legacy linter       dead         ✗ TSLint deprecated, superseded by ESLint
  Build application       living       ✓ Essential build step
  Run unit tests          living       ✓ Essential quality gate
  Generate coverage badge decorative   ✗ Output not used anywhere

Recommended Changes:
  1. REMOVE  "Run legacy linter"       Impact: high   Effort: low
  2. REMOVE  "Generate coverage badge"  Impact: med    Effort: low
  3. MERGE   Prettier → ESLint config  Impact: med    Effort: low
  4. SIMPLIFY Build caching             Impact: med    Effort: med

Expected: 7 → 4 steps | Pipeline time -40% | Maintenance -50%`;

const designElements = `tokens:
  - name: "color-primary"          status: active, used in 42 components
  - name: "color-primary-old"      status: abandoned, 0 references
  - name: "color-accent"           status: active, used in 18 components
  - name: "spacing-base"           status: active, used globally
  - name: "spacing-legacy"         status: dormant, 2 references in deprecated views
  - name: "font-heading"           status: active, used in all headings
  - name: "font-body"              status: active, used globally
  - name: "font-mono-alt"          status: dormant, 1 reference in admin panel
  - name: "shadow-card"            status: active, used in 8 components
  - name: "shadow-card-v2"         status: duplicated, identical to shadow-card`;

const designDiagnosis = `System Diagnosis: design-system-tokens
═══════════════════════════════════

Health: 50% | 10 tokens | 1 dead | 2 dormant | 1 duplicated | 1 decorative

Classification Table:
  color-primary       living       ✓ 42 component references
  color-primary-old   dead         ✗ Zero references
  color-accent        living       ✓ 18 component references
  spacing-base        living       ✓ Global usage
  spacing-legacy      dormant      ~ 2 references in deprecated views
  font-heading        living       ✓ Used in all headings
  font-body           living       ✓ Global usage
  font-mono-alt       dormant      ~ 1 reference in admin panel
  shadow-card         living       ✓ 8 component references
  shadow-card-v2      duplicated   ✗ Identical to shadow-card

Recommended Changes:
  1. REMOVE  color-primary-old     Impact: high   Effort: low
  2. REMOVE  shadow-card-v2        Impact: med    Effort: low
  3. REMOVE  spacing-legacy        Impact: med    Effort: low
  4. MERGE   font-mono-alt → remove Impact: low   Effort: low

Expected: 10 → 6 tokens | Token count -40% | Zero dead references`;

const startupElements = `services:
  - name: "api-gateway"
    type: service
    traffic: 12,000 req/day
    team: 1 engineer (part-time)

  - name: "auth-service"
    type: service
    traffic: 800 req/day
    dependencies: [api-gateway, user-db]

  - name: "user-service"
    type: service
    traffic: 600 req/day
    dependencies: [api-gateway, user-db]
    note: "90% overlap with auth-service"

  - name: "notification-service"
    type: service
    traffic: 50 req/day
    dependencies: [api-gateway, email-provider, sms-provider]
    cost: $340/month for 50 daily notifications

  - name: "analytics-service"
    type: service
    traffic: 200 req/day
    note: "Custom analytics, team uses Mixpanel instead"

  - name: "billing-service"
    type: service
    traffic: 30 req/day
    dependencies: [stripe-api]`;

const startupDiagnosis = `System Diagnosis: startup-architecture
═══════════════════════════════════

Health: 33% | 6 services | 1 duplicated | 1 parasitic | 1 dead | 1 decorative

Classification Table:
  api-gateway            living       ✓ Central routing, essential
  auth-service           living       ✓ Core authentication
  user-service           duplicated   ✗ 90% overlap with auth-service
  notification-service   parasitic    ✗ $340/month for 50 notifications
  analytics-service      dead         ✗ Team uses Mixpanel, not this
  billing-service        living       ✓ Essential Stripe integration

Recommended Changes:
  1. REMOVE  analytics-service                  Impact: high  Effort: low
  2. MERGE   user-service → auth-service       Impact: high  Effort: med
  3. SIMPLIFY notification-service → function   Impact: high  Effort: med
  4. KEEP    api-gateway, billing-service       No change needed

Expected Architecture: 6 → 3 services (gateway, auth+user, billing)
  + 1 serverless function (notifications via email API)
  Infra cost: -60% | Deploy time: -70% | Cognitive load: -50%`;

export default function ExamplesPage() {
  return (
    <>
      <Section className="pt-32">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          EXAMPLES
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Real-world audits.
        </h1>
        <p className="text-lg text-white/50 max-w-3xl">
          Four complete examples showing the PRUNE method applied to
          codebases, pipelines, design systems, and startup
          architectures. Each shows the before state, diagnosis, and
          expected outcome.
        </p>
      </Section>

      {/* Example 1 */}
      <Section className="bg-surface-primary">
        <div className="max-w-4xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sm font-mono text-accent">01</span>
            <h2 className="text-2xl font-light tracking-tight">
              React Dashboard Audit
            </h2>
          </div>
          <p className="text-white/50 mb-8">
            A dashboard with 8 components — some legacy, some
            redundant, some decorative. The audit reveals that nearly
            half the surface area can be removed.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Before — Element definitions
              </p>
              <CodeBlock
                code={dashboardElements}
                language="typescript"
                filename="elements.ts"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Diagnosis output
              </p>
              <CodeBlock
                code={dashboardDiagnosis}
                filename="diagnosis.txt"
              />
            </div>
            <div className="p-6 rounded-lg border border-accent/20 bg-accent/5">
              <p className="text-sm font-medium text-accent mb-2">
                Result
              </p>
              <p className="text-sm text-white/60">
                Remove 3 components (LegacyChart, UnusedModal,
                AnalyticsWrapper). Rename ChartV2 to Chart. Simplify
                MetricsHelper from 14 functions to 3. System health
                improves from 43% to 85%.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Example 2 */}
      <Section>
        <div className="max-w-4xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sm font-mono text-accent">02</span>
            <h2 className="text-2xl font-light tracking-tight">
              CI/CD Pipeline Simplification
            </h2>
          </div>
          <p className="text-white/50 mb-8">
            A 7-step pipeline with a deprecated linter, a redundant
            formatter step, and a badge generator nobody uses. The
            audit cuts it to 4 steps and reduces pipeline time by 40%.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Before — Pipeline configuration
              </p>
              <CodeBlock
                code={cicdElements}
                language="yaml"
                filename="pipeline.yml"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Diagnosis output
              </p>
              <CodeBlock
                code={cicdDiagnosis}
                filename="diagnosis.txt"
              />
            </div>
            <div className="p-6 rounded-lg border border-accent/20 bg-accent/5">
              <p className="text-sm font-medium text-accent mb-2">
                Result
              </p>
              <p className="text-sm text-white/60">
                Remove 2 dead steps (legacy linter, coverage badge).
                Merge Prettier into ESLint config. Pipeline reduces
                from 7 to 4 steps. Execution time drops 40%.
                Maintenance burden halved.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Example 3 */}
      <Section className="bg-surface-primary">
        <div className="max-w-4xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sm font-mono text-accent">03</span>
            <h2 className="text-2xl font-light tracking-tight">
              Design System Cleanup
            </h2>
          </div>
          <p className="text-white/50 mb-8">
            A design system with 10 tokens that accumulated over
            multiple redesigns. Dead tokens, dormant tokens, and an
            exact duplicate hiding in plain sight.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Before — Token definitions
              </p>
              <CodeBlock
                code={designElements}
                language="yaml"
                filename="tokens.yml"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Diagnosis output
              </p>
              <CodeBlock
                code={designDiagnosis}
                filename="diagnosis.txt"
              />
            </div>
            <div className="p-6 rounded-lg border border-accent/20 bg-accent/5">
              <p className="text-sm font-medium text-accent mb-2">
                Result
              </p>
              <p className="text-sm text-white/60">
                Remove 4 tokens (1 dead, 2 dormant, 1 duplicate).
                Token count drops from 10 to 6. Zero dead references
                remain. Every surviving token has clear, active usage.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Example 4 */}
      <Section>
        <div className="max-w-4xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sm font-mono text-accent">04</span>
            <h2 className="text-2xl font-light tracking-tight">
              Startup Architecture Reduction
            </h2>
          </div>
          <p className="text-white/50 mb-8">
            A seed-stage startup running 6 microservices for a product
            with 200 daily active users. Over-engineered by at least
            3x. The audit collapses it to 3 services and a serverless
            function.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Before — Service topology
              </p>
              <CodeBlock
                code={startupElements}
                language="yaml"
                filename="services.yml"
              />
            </div>
            <div>
              <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-wider">
                Diagnosis output
              </p>
              <CodeBlock
                code={startupDiagnosis}
                filename="diagnosis.txt"
              />
            </div>
            <div className="p-6 rounded-lg border border-accent/20 bg-accent/5">
              <p className="text-sm font-medium text-accent mb-2">
                Result
              </p>
              <p className="text-sm text-white/60">
                Remove analytics-service entirely (team uses
                Mixpanel). Merge user-service into auth-service.
                Replace notification-service with a single serverless
                function. Architecture collapses from 6 services to
                3 + 1 function. Infrastructure cost drops 60%.
                Deployment time drops 70%.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-surface-primary">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Audit your own system.
          </h2>
          <p className="text-white/50 mb-8">
            Install the package or copy a prompt to get started.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/install"
              className="bg-accent text-[#030303] font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
            >
              Install Package
            </Link>
            <Link
              href="/docs#prompts"
              className="border border-white/10 text-white/80 px-6 py-3 rounded hover:border-white/20 transition-colors"
            >
              Copy a Prompt
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
