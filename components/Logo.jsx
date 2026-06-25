'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ variant = 'dark', size = 'md' }) {
  const sizes = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-28',
  };
  const h = sizes[size] || sizes.md;

  return (
    <Link href="/" className="flex items-center group" aria-label="Rayaru Gold Buying Company">
      <div
        className={`relative ${h} aspect-square rounded-xl overflow-hidden ring-2 ring-gold/40 group-hover:ring-gold transition-all gold-shadow`}
      >
        <Image
          src="/logo.jpeg"
          alt="Rayaru Gold Buying Company"
          fill
          sizes="160px"
          className="object-cover"
          priority
        />
      </div>
    </Link>
  );
}
