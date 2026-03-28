import type { Metadata } from 'next';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'PRUNE.SYSTEMS privacy policy. We do not collect personal '
    + 'data, use cookies, or run analytics tracking.',
};

export default function PrivacyPage() {
  return (
    <Section className="pt-32">
      <div className="max-w-3xl">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          PRIVACY POLICY
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-white/30 mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-8 text-white/60 leading-relaxed">
          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Overview
            </h2>
            <p>
              PRUNE.SYSTEMS is a static website. We are committed to
              protecting your privacy and being transparent about
              what we do — and do not — collect.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Data Collection
            </h2>
            <p>
              We do not collect personal data. This website does not
              use cookies, analytics tracking, third-party scripts,
              or any form of user monitoring. No information about
              your visit is stored, transmitted, or shared.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              The npm Package
            </h2>
            <p>
              The <code className="font-mono text-accent text-sm">prune-systems</code> npm
              package runs entirely locally on your machine. It does
              not send data to any external server. It does not
              phone home. It does not collect usage metrics. Your
              code and system data never leave your environment.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Communication
            </h2>
            <p>
              If you contact us directly via email, we may store
              your email address for the sole purpose of responding
              to your inquiry. We will never share your email with
              third parties or use it for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Changes
            </h2>
            <p>
              We reserve the right to update this privacy policy. Any
              changes will be reflected on this page with an updated
              date.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Contact
            </h2>
            <p>
              For questions about this policy, contact us at{' '}
              <a
                href="mailto:hello@prune.systems"
                className="text-accent hover:underline"
              >
                hello@prune.systems
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
