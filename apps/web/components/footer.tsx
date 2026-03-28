import Link from 'next/link';

const columns = [
  {
    title: 'Product',
    links: [
      { href: '/method', label: 'Method' },
      { href: '/zengineer', label: 'zengineer' },
      { href: '/zendev', label: 'zendev' },
      { href: '/install', label: 'Install' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs', label: 'Docs' },
      { href: '/examples', label: 'Examples' },
      { href: '/manifesto', label: 'Manifesto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-mono text-sm font-bold tracking-wider text-accent"
            >
              PRUNE.SYSTEMS
            </Link>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              A subtractive systems discipline. Remove what
              doesn&apos;t serve the system.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-white/30">
            &copy; 2026 PRUNE.SYSTEMS. Built with subtraction.
          </p>
        </div>
      </div>
    </footer>
  );
}
