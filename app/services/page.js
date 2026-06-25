'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Coins, Gem, TestTube2, Banknote, LineChart, FileSearch, UserCheck, ArrowRight, Phone } from 'lucide-react';

const services = [
  { icon: Coins, title: 'Gold Buying', desc: 'We purchase gold ornaments, coins, bars, and bullion at the best market rates. All purities accepted.', tag: 'Most Popular' },
  { icon: Gem, title: 'Silver Buying', desc: 'Sell your silver jewelry, utensils, and coins for fair, transparent prices based on live market.' },
  { icon: TestTube2, title: 'Gold Purity Testing', desc: 'Certified XRF & acid testing to determine exact karat purity — done in your presence.' },
  { icon: Banknote, title: 'Instant Cash Payment', desc: 'Walk in with gold, walk out with cash or instant bank transfer. No delays, no excuses.' },
  { icon: LineChart, title: 'Market Price Evaluation', desc: 'Daily-updated rates tied to the live international gold market — always competitive.' },
  { icon: FileSearch, title: 'Transparent Assessment', desc: 'Every weighing and calculation is done openly. You see the same numbers we see.' },
  { icon: UserCheck, title: 'Professional Consultation', desc: 'Not sure if you should sell? Our experts give honest, no-pressure advice.' },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#faf7f0]">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#fdfaf0] via-[#faf3e0] to-[#f5e9c8]">
        <div className="absolute top-10 left-0 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— What We Offer —</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-maroon mt-4 leading-tight">
              Premium <span className="gold-gradient-text">Services</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Comprehensive gold buying solutions, designed to give you maximum value with complete
              peace of mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative bg-white rounded-3xl p-8 border border-gold/20 luxe-shadow hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/15 transition-colors" />
              {s.tag && (
                <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-maroon text-gold text-[10px] font-bold tracking-wider uppercase">
                  {s.tag}
                </span>
              )}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center gold-shadow mb-6 group-hover:scale-110 transition-transform">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-maroon">{s.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center text-gold text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECONDARY – IMAGE + COPY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[5/4] rounded-[2rem] overflow-hidden luxe-shadow border-4 border-white">
            <Image src="https://images.pexels.com/photos/14355033/pexels-photo-14355033.jpeg" alt="Premium gold service" fill className="object-cover" />
          </motion.div>
          <div>
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— Why Our Services Stand Out —</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3 leading-tight">
              More Than a Service. <br />A <span className="gold-gradient-text">Promise.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'Certified weighing scales calibrated regularly',
                'XRF + acid testing for accurate purity',
                'Live, market-linked pricing — updated daily',
                'Private consultation rooms for confidentiality',
                'Instant payment via cash or bank transfer',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">{t}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full gold-gradient text-white font-semibold gold-shadow hover:scale-105 transition-transform">
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden maroon-gradient p-12 md:p-16 luxe-shadow text-center">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
                Have Gold to Sell? <br /><span className="gold-gradient-text">Let's Talk.</span>
              </h2>
              <p className="mt-5 text-white/70 max-w-xl mx-auto">No appointment needed. Walk in any day Monday – Saturday, 9 AM – 8 PM.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a href="tel:8884848204" className="inline-flex items-center gap-2 px-7 py-4 rounded-full gold-gradient text-white font-semibold gold-shadow">
                  <Phone className="w-4 h-4" /> Call 8884848204
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-gold/60 text-white font-semibold hover:bg-gold/10">
                  Visit Contact Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
