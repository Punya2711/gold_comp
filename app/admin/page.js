'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Lock, User, Loader2, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = typeof window !== 'undefined' ? localStorage.getItem('rayaru_admin_token') : null;
    if (token) {
      fetch('/api/admin/verify', { headers: { 'x-admin-token': token } }).then((r) => {
        if (r.ok) router.replace('/admin/dashboard');
      });
    }
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const j = await r.json();
      if (!r.ok) {
        toast.error(j.error || 'Invalid credentials');
        return;
      }
      localStorage.setItem('rayaru_admin_token', j.token);
      toast.success('Welcome back!');
      router.push('/admin/dashboard');
    } catch (e) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center px-5 overflow-hidden">
      <div className="absolute inset-0 maroon-gradient" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 70%, #D4AF37 0%, transparent 50%)' }} />
      <div className="absolute top-10 left-10">
        <Logo variant="light" size="md" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -inset-1 gold-gradient rounded-3xl blur-xl opacity-30" />
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-10 luxe-shadow border border-gold/30">
          <div className="text-center">
            <div className="inline-flex w-16 h-16 rounded-2xl gold-gradient items-center justify-center gold-shadow mb-5">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-gold">Admin Portal</span>
            <h1 className="font-display text-3xl font-bold text-maroon mt-2">Welcome Back</h1>
            <p className="text-sm text-gray-600 mt-2">Sign in to manage today's gold prices</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-maroon mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/30 bg-[#fdfaf0]/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="admin"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-maroon mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/30 bg-[#fdfaf0]/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl gold-gradient text-white font-semibold gold-shadow hover:scale-[1.01] transition-transform disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Authorized personnel only • Rayaru Gold Co.
          </div>
        </div>
      </motion.div>
    </main>
  );
}
