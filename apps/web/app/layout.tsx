import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import './globals.css';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PRUNE.SYSTEMS — Subtractive Systems Discipline',
    template: '%s | PRUNE.SYSTEMS',
  },
  description:
    'A subtractive systems discipline and minimal agent runtime for '
    + 'auditing, simplifying, and refining systems before complexity '
    + 'hardens into debt.',
  keywords: [
    'systems',
    'subtraction',
    'pruning',
    'simplification',
    'agent runtime',
    'zengineer',
    'technical debt',
    'software architecture',
  ],
  authors: [{ name: 'PRUNE.SYSTEMS' }],
  openGraph: {
    title: 'PRUNE.SYSTEMS — Subtractive Systems Discipline',
    description:
      'A subtractive systems discipline and minimal agent runtime for '
      + 'auditing, simplifying, and refining systems before complexity '
      + 'hardens into debt.',
    url: 'https://prune.systems',
    siteName: 'PRUNE.SYSTEMS',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRUNE.SYSTEMS — Subtractive Systems Discipline',
    description:
      'A subtractive systems discipline and minimal agent runtime for '
      + 'auditing, simplifying, and refining systems before complexity '
      + 'hardens into debt.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="font-sans bg-surface-void text-white min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
