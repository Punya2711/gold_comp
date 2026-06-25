'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-20">
        <Logo size="md" />

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-colors ${
                  active ? 'text-maroon' : 'text-gray-700 hover:text-maroon'
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <a
          href="tel:8884848204"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full gold-gradient text-white text-sm font-semibold gold-shadow hover:scale-[1.03] transition-transform"
        >
          <Phone className="w-4 h-4" /> 8884848204
        </a>

        <button
          className="md:hidden p-2 text-maroon"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gold/20 px-5 py-6 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-base font-medium ${
                pathname === l.href ? 'text-gold' : 'text-gray-800'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:8884848204"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gold-gradient text-white text-sm font-semibold w-full justify-center"
          >
            <Phone className="w-4 h-4" /> Call 8884848204
          </a>
        </div>
      )}
    </header>
  );
}
