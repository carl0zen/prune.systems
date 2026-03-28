import type { Metadata } from 'next';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'PRUNE.SYSTEMS terms of service. Open-source software '
    + 'under the MIT License.',
};

export default function TermsPage() {
  return (
    <Section className="pt-32">
      <div className="max-w-3xl">
        <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">
          TERMS OF SERVICE
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-white/30 mb-12">
          Last updated: March 2026
        </p>

        <div className="space-y-8 text-white/60 leading-relaxed">
          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Software License
            </h2>
            <p>
              The <code className="font-mono text-accent text-sm">prune-systems</code> npm
              package is open-source software released under the MIT
              License. You are free to use, copy, modify, merge,
              publish, distribute, sublicense, and sell copies of the
              software, subject to the conditions of the MIT License.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Disclaimer of Warranty
            </h2>
            <p>
              The software is provided &ldquo;as is&rdquo;, without
              warranty of any kind, express or implied, including but
              not limited to the warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
              In no event shall the authors or copyright holders be
              liable for any claim, damages, or other liability
              arising from the use of the software.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Usage
            </h2>
            <p>
              You may use, modify, and distribute the software under
              the terms of the MIT License. There are no restrictions
              on commercial or personal use. Attribution is
              appreciated but not required beyond what the MIT
              License specifies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Website Content
            </h2>
            <p>
              The content of this website — including text, design,
              methodology descriptions, and prompt templates — is
              copyright PRUNE.SYSTEMS. You may reference and quote
              this content with attribution. The prompts provided on
              this site are free to use in any context.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Limitation of Liability
            </h2>
            <p>
              We are not liable for any direct, indirect, incidental,
              special, consequential, or exemplary damages arising
              from your use of the software, the website, or the
              methodology described herein.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white/90 mb-3">
              Contact
            </h2>
            <p>
              For questions about these terms, contact us at{' '}
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
