'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoldPriceCard from '@/components/GoldPriceCard';
import {
  ShieldCheck,
  Banknote,
  TrendingUp,
  Users,
  Lock,
  Award,
  Coins,
  TestTube,
  Calculator,
  HandCoins,
  ArrowRight,
  Phone,
  Star,
  Quote,
} from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Transparent Evaluation', desc: 'Every gram is tested openly in front of you with certified equipment.' },
  { icon: Banknote, title: 'Instant Payment', desc: 'Walk out with cash or bank transfer the moment we agree on the price.' },
  { icon: TrendingUp, title: 'Best Market Price', desc: 'We track live market rates so you always get the most competitive offer.' },
  { icon: Users, title: 'Trusted Professionals', desc: 'Certified gold evaluators with thousands of satisfied customers.' },
  { icon: Lock, title: 'Secure Transactions', desc: 'Private rooms, secure handling and complete confidentiality, always.' },
  { icon: Award, title: '5+ Years Experience', desc: 'A legacy of trust built one honest transaction at a time.' },
];

const steps = [
  { icon: Coins, title: 'Bring Your Gold', desc: 'Visit our showroom with your gold ornaments, coins or bars.' },
  { icon: TestTube, title: 'Gold Testing', desc: 'We perform certified purity testing using XRF & acid tests.' },
  { icon: Calculator, title: 'Price Evaluation', desc: 'Live market rate applied with transparent calculation in front of you.' },
  { icon: HandCoins, title: 'Instant Payment', desc: 'Receive your cash or bank transfer instantly. No waiting.' },
];

const testimonials = [
  { name: 'Ramesh K.', city: 'Bangalore', text: 'Got the best rate in Bangalore. The team explained every step of the evaluation. Highly trustworthy.' },
  { name: 'Lakshmi P.', city: 'Kumaraswamy Layout', text: 'I was nervous about selling my mother’s jewelry, but Mangala ma’am made me feel completely at ease. Honest people.' },
  { name: 'Suresh M.', city: 'JP Nagar', text: 'Walked in at 11 AM, walked out with cash by 11:25. Transparent rates, no hidden deductions. Excellent service.' },
  { name: 'Pooja R.', city: 'Banashankari', text: 'Rayaru Gold is now my family’s go-to place. Fair, fast and friendly. Five stars.' },
];

export default function HomePage() {
  return (
    <main className="bg-[#faf7f0] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16">
        {/* gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf0] via-[#faf3e0] to-[#f5e9c8]" />
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-maroon/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-gold/40 text-xs tracking-[0.25em] uppercase text-maroon font-semibold mb-6">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" /> Trusted Since 2019
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-maroon">
              Sell Your Gold <br />
              With <span className="gold-gradient-text">Confidence</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl">
              We provide transparent gold evaluation, instant payments, fair pricing, and complete
              customer trust — backed by 5+ years of honest service in Bangalore.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#gold-price"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full gold-gradient text-white font-semibold gold-shadow hover:scale-[1.03] transition-transform"
              >
                Get Today's Gold Price
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-maroon text-white font-semibold hover:bg-[#3a1010] transition-colors"
              >
                <Phone className="w-4 h-4" /> Contact Us
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <Stat number="5+" label="Years Experience" />
              <div className="w-px h-12 bg-gold/30" />
              <Stat number="10K+" label="Happy Customers" />
              <div className="w-px h-12 bg-gold/30" />
              <Stat number="100%" label="Transparency" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden luxe-shadow border-4 border-white">
              <Image
                src="https://images.pexels.com/photos/8706563/pexels-photo-8706563.jpeg"
                alt="Luxury gold jewelry"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-maroon/30 via-transparent to-gold/20" />
            </div>
            {/* floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 luxe-shadow border border-gold/30 max-w-[220px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-display text-maroon font-bold text-lg leading-none">100%</p>
                  <p className="text-xs text-gray-600 mt-1">Certified Pure Testing</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GOLD PRICE – MOST IMPORTANT */}
      <section id="gold-price" className="relative py-24 bg-gradient-to-b from-[#faf7f0] to-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Live Pricing</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon leading-tight mt-3">
              Today's Gold Rate, <br />
              Updated <span className="gold-gradient-text">In Real Time</span>
            </h2>
            <p className="mt-5 text-gray-700 text-lg leading-relaxed max-w-lg">
              Our rates are updated daily by our certified evaluators and reflect the most
              competitive market price in Bangalore. What you see here is exactly what we offer at
              the counter — no hidden deductions.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              {[
                'Live market-linked pricing',
                'Transparent calculation in front of you',
                'Instant cash or bank transfer',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <GoldPriceCard />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3">
              The Rayaru <span className="gold-gradient-text">Promise</span>
            </h2>
            <div className="gold-divider mt-6 max-w-xs mx-auto" />
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-[#fdfaf0] rounded-2xl p-7 border border-gold/20 hover:border-gold transition-all hover:-translate-y-2 hover:luxe-shadow"
              >
                <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center gold-shadow mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-maroon mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-[#faf3e0] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3">
              Our Simple <span className="gold-gradient-text">4-Step Process</span>
            </h2>
          </div>
          <div className="mt-16 grid md:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-7 luxe-shadow border border-gold/15 text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-maroon text-gold flex items-center justify-center font-display font-bold text-sm border-2 border-gold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-3 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#fdfaf0] to-[#f5e9c8] flex items-center justify-center mb-4 border border-gold/30">
                  <s.icon className="w-8 h-8 text-maroon" />
                </div>
                <h3 className="font-display text-lg font-bold text-maroon">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3">
              Words From Our <span className="gold-gradient-text">Customers</span>
            </h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-[#fdfaf0] rounded-2xl p-8 border border-gold/20"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/30" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center text-white font-display font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-bold text-maroon">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden maroon-gradient p-12 md:p-16 luxe-shadow">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #D4AF37 0%, transparent 50%)' }} />
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <SectionLabel light>Ready When You Are</SectionLabel>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
                  Ready to Sell <br />
                  Your <span className="gold-gradient-text">Gold?</span>
                </h2>
                <p className="mt-5 text-white/75 text-lg max-w-md">
                  Visit our Kumaraswamy Layout showroom or give us a call. Get an honest evaluation
                  in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:items-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gold-gradient text-white font-semibold gold-shadow hover:scale-[1.03] transition-transform"
                >
                  Contact Us Today <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:8884848204"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold/60 text-white font-semibold hover:bg-gold/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" /> 8884848204
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <p className="font-display text-3xl md:text-4xl font-bold text-maroon">{number}</p>
      <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function SectionLabel({ children, light }) {
  return (
    <span
      className={`inline-block text-xs tracking-[0.35em] uppercase font-semibold ${
        light ? 'text-gold' : 'text-gold'
      }`}
    >
      — {children} —
    </span>
  );
}
