'use client';
import Link from 'next/link';

export default function Logo({ variant = 'dark', size = 'md' }) {
  const isLight = variant === 'light';
  const sizes = {
    sm: { circle: 'w-9 h-9', text: 'text-lg', sub: 'text-[9px]' },
    md: { circle: 'w-12 h-12', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { circle: 'w-16 h-16', text: 'text-3xl', sub: 'text-xs' },
  };
  const s = sizes[size] || sizes.md;
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div
        className={`${s.circle} rounded-full gold-gradient flex items-center justify-center gold-shadow group-hover:scale-105 transition-transform duration-500 relative overflow-hidden`}
      >
        <div className="absolute inset-0 shimmer opacity-60" />
        <span className="font-display font-bold text-white text-xl drop-shadow-md relative">R</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-display ${s.text} font-bold tracking-wide ${
            isLight ? 'text-white' : 'text-maroon'
          }`}
        >
          RAYARU
        </span>
        <span
          className={`${s.sub} tracking-[0.25em] uppercase ${
            isLight ? 'text-gold' : 'text-gold'
          } font-semibold`}
        >
          Gold Buying Co.
        </span>
      </div>
    </Link>
  );
}
