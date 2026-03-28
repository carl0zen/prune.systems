'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/method', label: 'Method' },
  { href: '/docs', label: 'Docs' },
  { href: '/examples', label: 'Examples' },
  { href: '/manifesto', label: 'Manifesto' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#030303]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-wider text-accent"
        >
          PRUNE.SYSTEMS
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/install"
            className="hidden sm:block font-mono text-sm px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded hover:bg-accent/20 transition-colors"
          >
            Install
          </Link>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block w-5 h-px bg-white/60 transition-all ${
                open ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white/60 transition-all ${
                open ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#030303]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/install"
              className="sm:hidden font-mono text-sm px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded hover:bg-accent/20 transition-colors text-center mt-2"
              onClick={() => setOpen(false)}
            >
              Install
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
