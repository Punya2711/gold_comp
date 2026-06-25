'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  LogOut,
  Save,
  Sparkles,
  Coins,
  TrendingUp,
  Clock,
  Loader2,
  Eye,
  CheckCircle2,
  Inbox,
} from 'lucide-react';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [price24, setPrice24] = useState('');
  const [price22, setPrice22] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [saving, setSaving] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState('admin');

  useEffect(() => {
    const t = localStorage.getItem('rayaru_admin_token');
    if (!t) {
      router.replace('/admin');
      return;
    }
    fetch('/api/admin/verify', { headers: { 'x-admin-token': t } }).then(async (r) => {
      if (!r.ok) {
        localStorage.removeItem('rayaru_admin_token');
        router.replace('/admin');
        return;
      }
      const j = await r.json();
      setUser(j.username || 'admin');
      setToken(t);
      setAuthChecked(true);
      loadPrice();
      loadContacts(t);
    });
  }, [router]);

  const loadPrice = async () => {
    const r = await fetch('/api/gold-price', { cache: 'no-store' });
    const j = await r.json();
    setPrice24(j.price_24k || '');
    setPrice22(j.price_22k || '');
    setUpdatedAt(j.updated_at);
  };

  const loadContacts = async (t) => {
    const r = await fetch('/api/admin/contacts', { headers: { 'x-admin-token': t } });
    if (r.ok) {
      const j = await r.json();
      setContacts(j.contacts || []);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!price24 || !price22) {
      toast.error('Please enter both prices');
      return;
    }
    setSaving(true);
    try {
      const r = await fetch('/api/admin/gold-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ price_24k: Number(price24), price_22k: Number(price22) }),
      });
      const j = await r.json();
      if (!r.ok) {
        toast.error(j.error || 'Failed to save');
        return;
      }
      setUpdatedAt(j.updated_at);
      toast.success('Gold prices updated successfully!');
    } catch (e) {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', headers: { 'x-admin-token': token } });
    } catch (e) {}
    localStorage.removeItem('rayaru_admin_token');
    router.replace('/admin');
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center maroon-gradient text-gold">
        <Loader2 className="w-8 h-8 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      {/* TOPBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-sm text-gray-600">
              Signed in as <span className="font-semibold text-maroon">{user}</span>
            </span>
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-maroon text-sm font-medium hover:bg-gold/10"
            >
              <Eye className="w-4 h-4" /> View Site
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maroon text-white text-sm font-medium hover:bg-[#3a1010]"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">— Admin Dashboard —</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-maroon mt-2">
            Manage <span className="gold-gradient-text">Gold Prices</span>
          </h1>
          <p className="text-gray-600 mt-2">Update today's rate — it goes live on the website instantly.</p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* PRICE UPDATE FORM */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 relative bg-white rounded-3xl p-8 md:p-10 luxe-shadow border border-gold/20 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center gold-shadow">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-maroon">Today's Gold Rate</h2>
                  <p className="text-xs text-gray-500">Price per gram in INR (₹)</p>
                </div>
              </div>

              <form onSubmit={save} className="mt-8 space-y-6">
                <PriceInput
                  label="24K Gold (99.9% Pure)"
                  value={price24}
                  onChange={setPrice24}
                  highlight
                />
                <PriceInput
                  label="22K Gold (91.6% Pure)"
                  value={price22}
                  onChange={setPrice22}
                />

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Last updated:</span>
                  <span className="text-maroon font-semibold">
                    {updatedAt ? new Date(updatedAt).toLocaleString('en-IN') : '—'}
                  </span>
                </div>

                <button
                  disabled={saving}
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gold-gradient text-white font-semibold gold-shadow hover:scale-[1.01] transition-transform disabled:opacity-60"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save & Publish'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* LIVE PREVIEW */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
            <div className="sticky top-28 space-y-5">
              <div className="relative bg-white rounded-3xl p-7 luxe-shadow border border-gold/30 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />
                <div className="flex items-center gap-2 text-maroon mb-1">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Live Preview</span>
                </div>
                <h3 className="font-display text-xl text-maroon mb-5">Public View</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-sm text-maroon font-semibold">24K</span>
                    <span className="font-display text-2xl font-bold gold-gradient-text">
                      ₹{Number(price24 || 0).toLocaleString('en-IN')}<span className="text-xs text-gray-500">/g</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-sm text-maroon font-semibold">22K</span>
                    <span className="font-display text-xl font-bold text-maroon">
                      ₹{Number(price22 || 0).toLocaleString('en-IN')}<span className="text-xs text-gray-500">/g</span>
                    </span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-gold/15 text-[11px] text-gray-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  Auto-publishes to website
                </div>
              </div>

              <div className="bg-gradient-to-br from-maroon to-[#2a0a0a] rounded-3xl p-6 text-white">
                <TrendingUp className="w-5 h-5 text-gold" />
                <p className="font-display text-lg mt-2">Pro Tip</p>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">
                  Update prices each morning before opening hours to keep customer trust high.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CONTACTS */}
        {contacts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 bg-white rounded-3xl p-8 luxe-shadow border border-gold/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center gold-shadow">
                <Inbox className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-maroon">Recent Inquiries</h2>
                <p className="text-xs text-gray-500">{contacts.length} message{contacts.length > 1 ? 's' : ''} from your website</p>
              </div>
            </div>
            <div className="divide-y divide-gold/10">
              {contacts.slice(0, 10).map((c) => (
                <div key={c.id} className="py-4 grid md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="font-display font-bold text-maroon">{c.name}</p>
                    <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString('en-IN')}</p>
                  </div>
                  <a href={`tel:${c.phone}`} className="text-gold font-semibold">{c.phone}</a>
                  <span className="text-gray-600">{c.email || '—'}</span>
                  <span className="text-gray-700 truncate">{c.message || '—'}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

function PriceInput({ label, value, onChange, highlight }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-semibold text-maroon mb-2">{label}</label>
      <div className={`relative rounded-xl border-2 ${highlight ? 'border-gold' : 'border-gold/30'} bg-[#fdfaf0]/40 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition`}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-2xl text-gold font-bold">₹</span>
        <input
          type="number"
          inputMode="numeric"
          step="1"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-20 py-5 bg-transparent text-3xl font-display font-bold text-maroon focus:outline-none"
          placeholder="0"
          required
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">/ gram</span>
      </div>
    </div>
  );
}
