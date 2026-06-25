'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ variant = 'dark', size = 'md' }) {
  const sizes = {
    sm: 'h-20',
    md: 'h-28',
    lg: 'h-40',
    xl: 'h-52',
    xxl: 'h-64',
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
