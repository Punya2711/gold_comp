'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Phone, MapPin, Mail, Clock, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }
    setLoading(true);
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (r.ok) {
        toast.success('Thank you! We will contact you shortly.');
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        const j = await r.json();
        toast.error(j.error || 'Something went wrong');
      }
    } catch (e) {
      toast.error('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#faf7f0]">
      <Navbar />

      <section className="relative pt-36 pb-16 bg-gradient-to-br from-[#fdfaf0] via-[#faf3e0] to-[#f5e9c8]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— Get In Touch —</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-maroon mt-4 leading-tight">
            Visit, Call or <span className="gold-gradient-text">Write to Us</span>
          </h1>
          <p className="mt-5 text-lg text-gray-700 max-w-2xl mx-auto">
            We'd love to help you with a transparent gold evaluation. Reach out any time.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* INFO CARDS */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-5">
            <InfoCard icon={Phone} title="Phone Numbers" lines={[<a key="1" href="tel:8884848204" className="hover:text-gold">8884848204</a>, <a key="2" href="tel:8951401751" className="hover:text-gold">8951401751</a>]} />
            <InfoCard icon={MapPin} title="Showroom Address" lines={['Site No. 1624, 50 Feet Road,', 'Kumaraswamy Layout 1st Stage,', 'Near Dayananda Sagar College,', 'Bangalore – 560078']} />
            <InfoCard icon={Clock} title="Working Hours" lines={['Monday – Saturday', '9:00 AM – 8:00 PM', 'Sunday: Closed']} />
            <InfoCard icon={Mail} title="Email" lines={['info@rayarugold.com']} />
          </motion.div>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-white rounded-[2rem] p-8 md:p-10 luxe-shadow border border-gold/20 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-maroon">Send Us a Message</h2>
              <p className="text-gray-600 mt-2">Fill in your details and we will get back to you within 24 hours.</p>
              <form onSubmit={submit} className="mt-8 space-y-5">
                <Field label="Full Name *" name="name" value={form.name} onChange={onChange} placeholder="Your name" />
                <Field label="Phone Number *" name="phone" value={form.phone} onChange={onChange} placeholder="10-digit phone number" type="tel" />
                <Field label="Email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" type="email" />
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-maroon mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={4} placeholder="Tell us about the gold you'd like to sell..." className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-[#fdfaf0]/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition" />
                </div>
                <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full gold-gradient text-white font-semibold gold-shadow hover:scale-[1.01] transition-transform disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="relative rounded-[2rem] overflow-hidden luxe-shadow border border-gold/30 aspect-[16/8]">
            <iframe
              title="Rayaru Gold Location"
              src="https://www.google.com/maps?q=Kumaraswamy+Layout+1st+Stage+Dayananda+Sagar+College+Bangalore&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoCard({ icon: Icon, title, lines }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gold/20 luxe-shadow flex gap-5 items-start">
      <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center gold-shadow shrink-0">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-maroon">{title}</h3>
        <div className="mt-2 text-gray-700 text-sm leading-relaxed space-y-1">
          {lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-semibold text-maroon mb-2">{label}</label>
      <input {...props} className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-[#fdfaf0]/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition" />
    </div>
  );
}
