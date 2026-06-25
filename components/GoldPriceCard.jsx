'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, RefreshCw } from 'lucide-react';

function formatTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${date} • ${time}`;
}

export default function GoldPriceCard({ compact = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const r = await fetch('/api/gold-price', { cache: 'no-store' });
      const j = await r.json();
      setData(j);
    } catch (e) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30000); // refresh every 30s
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* outer glow */}
      <div className="absolute -inset-1 gold-gradient rounded-3xl blur-xl opacity-40" />

      <div className="relative bg-white rounded-3xl p-7 luxe-shadow border border-gold/30 overflow-hidden">
        {/* shimmer line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />

        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-maroon">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-xs tracking-[0.3em] font-semibold uppercase">Live Rate</span>
          </div>
          <button
            onClick={load}
            className="text-gold/70 hover:text-gold transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <h3 className="font-display text-3xl text-maroon mt-1 mb-6">Today's Gold Rate</h3>

        <div className="space-y-4">
          <PriceRow
            label="24K Gold"
            sub="99.9% Pure"
            value={data?.price_24k}
            loading={loading}
            highlight
          />
          <div className="gold-divider opacity-40" />
          <PriceRow
            label="22K Gold"
            sub="91.6% Pure"
            value={data?.price_22k}
            loading={loading}
          />
        </div>

        <div className="mt-6 pt-5 border-t border-gold/15 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span className="font-medium">Last Updated:</span>
          <span className="text-maroon font-semibold">{formatTime(data?.updated_at)}</span>
        </div>

        {!compact && (
          <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-500">
            <TrendingUp className="w-3.5 h-3.5 text-gold" />
            Rates auto-refresh every 30 seconds
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PriceRow({ label, sub, value, loading, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-display text-xl text-maroon font-semibold">{label}</p>
        <p className="text-[11px] text-gray-500 tracking-wider uppercase">{sub}</p>
      </div>
      <div className="text-right">
        {loading ? (
          <div className="h-8 w-32 bg-gold/10 animate-pulse rounded-md" />
        ) : (
          <p
            className={`font-display font-bold ${
              highlight ? 'text-3xl gold-gradient-text' : 'text-2xl text-maroon'
            }`}
          >
            ₹{(value || 0).toLocaleString('en-IN')}
            <span className="text-xs text-gray-500 font-medium ml-1">/ gram</span>
          </p>
        )}
      </div>
    </div>
  );
}
