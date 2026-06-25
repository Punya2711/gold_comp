'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="relative bg-[#1a0a0a] text-white/80 mt-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #D4AF37 0%, transparent 40%), radial-gradient(circle at 80% 80%, #D4AF37 0%, transparent 40%)' }} />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo variant="light" size="lg" />
            <p className="mt-5 text-sm text-white/65 leading-relaxed max-w-md">
              Rayaru Gold Buying Company — Bangalore's trusted name for transparent gold evaluation,
              best market prices and instant payment.
            </p>
            <p className="mt-4 font-display text-gold italic">"Your Gold, Our Promise"</p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-maroon transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-gold text-lg mb-5 tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-3 text-sm">
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/services', 'Services'],
                ['/contact', 'Contact'],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-gold transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-gold text-lg mb-5 tracking-wider">CONTACT</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" /> <a href="tel:8884848204">8884848204</a></li>
              <li className="flex gap-2"><Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" /> <a href="tel:8951401751">8951401751</a></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" /><span>Site No. 1624, 50 Feet Road,<br />Kumaraswamy Layout 1st Stage,<br />Bangalore – 560078</span></li>
              <li className="flex gap-2"><Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" /><span>Mon – Sat • 9 AM – 8 PM</span></li>
            </ul>
          </div>
        </div>

        <div className="gold-divider my-10 opacity-50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Rayaru Gold Buying Company. All rights reserved.</p>
          <p>Crafted with elegance • Bangalore, India</p>
        </div>
      </div>
    </footer>
  );
}
