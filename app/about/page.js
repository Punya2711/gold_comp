'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, Heart, Award, ShieldCheck, Sparkles, Users, ArrowRight } from 'lucide-react';

const values = [
  { icon: ShieldCheck, title: 'Trust', desc: 'Every transaction builds lasting relationships.' },
  { icon: Sparkles, title: 'Transparency', desc: 'Open evaluation in front of every customer.' },
  { icon: Award, title: 'Fair Pricing', desc: 'Live market rates with no hidden deductions.' },
  { icon: Heart, title: 'Customer Satisfaction', desc: 'Your peace of mind is our priority.' },
  { icon: Users, title: 'Integrity', desc: 'Honest dealings, always — no exceptions.' },
];

export default function AboutPage() {
  return (
    <main className="bg-[#faf7f0]">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#fdfaf0] via-[#faf3e0] to-[#f5e9c8]">
        <div className="absolute top-0 -right-32 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— Our Story —</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-maroon mt-4 leading-tight">
              A Legacy of <span className="gold-gradient-text">Trust & Transparency</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Rayaru Gold Buying Company has been serving customers with honesty, transparency, and
              fair gold valuation. Our mission is to provide the best value for every customer
              while ensuring complete trust throughout the selling process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY + IMAGE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative aspect-square rounded-[2rem] overflow-hidden luxe-shadow border-4 border-white">
            <Image
              src="https://images.pexels.com/photos/8442325/pexels-photo-8442325.jpeg"
              alt="Premium gold bars"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-maroon/30 via-transparent to-transparent" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— Established 2019 —</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3 leading-tight">
              Built on Honesty.<br /> Powered by <span className="gold-gradient-text">Experience.</span>
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              For over 5 years, Rayaru Gold Buying Company has stood as a beacon of integrity in
              Bangalore's gold trade. From the heart of Kumaraswamy Layout, we have helped
              thousands of families realize the true value of their gold — with no surprises, no
              hidden charges, and no compromises on fairness.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Stat n="5+" l="Years of Service" />
              <Stat n="10K+" l="Satisfied Customers" />
              <Stat n="100%" l="Transparent Rates" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          <Card icon={Target} title="Our Mission" text="To provide fair, transparent, and secure gold buying services that empower every customer with the true value of their gold." />
          <Card icon={Eye} title="Our Vision" text="To become Karnataka's most trusted gold buying company — setting the standard for honesty, integrity, and customer experience." />
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-[#faf3e0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— What We Stand For —</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3">Our Core <span className="gold-gradient-text">Values</span></h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 text-center border border-gold/20 hover:border-gold transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4 gold-shadow">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-maroon">{v.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— The Visionaries —</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-3">Meet Our <span className="gold-gradient-text">Leadership</span></h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <FounderCard name="Mangala H" role="Founder" initial="M" badge="5+ Years" desc="With deep expertise in gold valuation, Mangala founded Rayaru Gold with a single vision — to make gold selling an experience customers trust and enjoy." />
            <FounderCard name="Sunil Kumar" role="Co-Founder" initial="S" badge="Operations Lead" desc="Sunil ensures that every customer leaves our showroom completely satisfied. He oversees evaluations, payments, and customer relationships." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="relative rounded-[2rem] overflow-hidden maroon-gradient p-10 md:p-14 luxe-shadow text-center">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Experience the <span className="gold-gradient-text">Rayaru Difference</span>
              </h2>
              <p className="mt-4 text-white/70 max-w-xl mx-auto">Visit us today and discover why thousands of Bangaloreans trust us with their gold.</p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full gold-gradient text-white font-semibold gold-shadow hover:scale-105 transition-transform">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold gold-gradient-text">{n}</p>
      <p className="text-xs text-gray-600 mt-1 uppercase tracking-wider">{l}</p>
    </div>
  );
}

function Card({ icon: Icon, title, text }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-[#fdfaf0] rounded-3xl p-10 border border-gold/20 luxe-shadow overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/10 blur-2xl" />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center gold-shadow mb-5">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="font-display text-2xl font-bold text-maroon">{title}</h3>
        <p className="mt-3 text-gray-700 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function FounderCard({ name, role, initial, badge, desc }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-white rounded-[2rem] overflow-hidden luxe-shadow border border-gold/20">
      <div className="h-32 maroon-gradient relative">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #D4AF37 0%, transparent 60%)' }} />
      </div>
      <div className="px-8 pb-8 -mt-16 text-center">
        <div className="w-32 h-32 mx-auto rounded-full gold-gradient flex items-center justify-center text-white font-display font-bold text-5xl border-4 border-white gold-shadow">
          {initial}
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-maroon">{name}</h3>
        <p className="text-gold font-semibold text-sm tracking-wider uppercase mt-1">{role}</p>
        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gold/10 text-maroon text-xs font-semibold">{badge}</span>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
