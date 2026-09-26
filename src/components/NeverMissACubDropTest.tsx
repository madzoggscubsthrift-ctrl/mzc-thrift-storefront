import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

/* =========================================================================
   REFINED MZC EDITORIAL CUB DROP CARD
   -------------------------------------------------------------------------
   - Direction: Editorial, clean, modern, sleek, boutique, spacious, polished
   - Brand tokens: Deep plum #624150, soft peach #fbceca, teal #669199, white
   - Easter egg: Ultra-subtle tone-on-tone paw watermark (3.5% opacity)
   - Copy: Flexible schedule (no Friday, no 7 PM, no 15-minute promise)
   - Hierarchy: Kicker -> Headline -> Body -> Form (Input + CTA) -> Reassurance
   ========================================================================= */

interface CubDropEditorialCardProps {
  className?: string;
  isGridItem?: boolean;
}

export const CubDropEditorialCard: React.FC<CubDropEditorialCardProps> = ({
  className = '',
  isGridItem = false,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white border border-[#624150]/15 p-6 sm:p-7 font-sans flex flex-col justify-between transition-all duration-200 ${
        isGridItem ? 'h-full' : ''
      } ${className}`}
      style={{
        boxShadow: '0 2px 8px -2px rgba(98, 65, 80, 0.04)',
      }}
    >
      {/* Easter Egg: Ultra-restrained Tone-on-Tone Paw Watermark (3.5% opacity) */}
      <div
        className="absolute -right-5 -bottom-5 w-28 h-28 text-[#624150]/[0.035] pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="65" rx="22" ry="18" />
          <circle cx="26" cy="36" r="9" />
          <circle cx="43" cy="24" r="10" />
          <circle cx="63" cy="24" r="10" />
          <circle cx="80" cy="38" r="9" />
        </svg>
      </div>

      {/* Top Editorial Section: Kicker, Headline, Body */}
      <div className="relative z-10">
        {/* 1. Kicker */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#624150]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#669199]" />
          <span>MZC Early Sniff</span>
        </div>

        {/* 2. Headline */}
        <h3 className="mt-3 text-lg sm:text-[19px] font-bold text-[#624150] tracking-tight leading-snug">
          Never miss a cub drop.
        </h3>

        {/* 3. Short Body Copy */}
        <p className="mt-2 text-xs text-[#2e282a]/75 leading-relaxed font-normal">
          Get a friendly early alert when the next little batch of pre-loved gems is about to land.
        </p>
      </div>

      {/* Bottom Interactive Section: Form / Confirmation + Reassurance */}
      <div className="relative z-10 mt-6 pt-1">
        {submitted ? (
          <div className="p-3.5 rounded-xl bg-[#D4EFEC]/40 border border-[#669199]/30 text-[#2e282a] text-xs flex items-start gap-2.5 animate-in fade-in duration-300">
            <CheckCircle2 className="w-4 h-4 text-[#669199] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#624150]">You're on the early list! 🐾</p>
              <p className="text-[11px] text-[#2e282a]/70 mt-0.5 leading-normal">
                We'll notify you before our next drop goes live.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="cub-drop-email-input" className="sr-only">
                Email address
              </label>
              <input
                id="cub-drop-email-input"
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F7] border border-[#624150]/20 rounded-xl focus:outline-none focus:border-[#624150] focus:bg-white text-[#2e282a] placeholder-[#624150]/40 font-sans transition-all duration-150"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#624150] hover:bg-[#4d323e] active:scale-[0.99] text-white text-[11px] font-bold tracking-wider uppercase rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-none"
            >
              <span>JOIN THE DROP LIST</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#fbceca]" />
            </button>
          </form>
        )}

        {/* 5. Small Reassurance Text */}
        <p className="mt-3 text-[11px] text-[#624150]/65 leading-normal flex items-start gap-1.5 select-none">
          <span className="text-[#fbceca] text-xs shrink-0 select-none">🐾</span>
          <span>Zero spam. Just new drops, secret restocks & the occasional MZC surprise.</span>
        </p>
      </div>
    </div>
  );
};


/* =========================================================================
   TEST PREVIEW PAGE
   1. The refined single editorial card on its own
   2. The same card placed naturally between product cards in a 3-column grid
   ========================================================================= */

export const NeverMissACubDropTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2e282a] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#fbceca] selection:text-[#624150]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="border-b border-[#624150]/15 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#624150] text-[#fbceca] text-[11px] font-bold tracking-wider uppercase mb-3">
            <span>🐾</span>
            <span>MZC Editorial Prototype</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#624150] tracking-tight">
            Refined Cub Drop Editorial Card
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#2e282a]/70 max-w-2xl leading-relaxed">
            Final visual design refinement for the compact MZC Drop Card. Features clean editorial typography, restrained brand cues, an ultra-subtle tone-on-tone paw easter egg, and flexible drop schedule copy.
          </p>
        </div>

        {/* VIEW 1: Isolated Single Card */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#624150] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#669199]" />
                1. Refined Single Editorial Card (Isolated)
              </h2>
              <p className="text-xs text-[#2e282a]/60">
                Rendered at standard card width (~360px) to evaluate typography, breathing room, and form balance.
              </p>
            </div>
            <div className="text-[11px] text-[#624150] font-medium bg-[#fbceca]/30 border border-[#fbceca] px-3 py-1 rounded-full w-fit">
              Width: 360px · Mobile Responsive
            </div>
          </div>

          <div className="flex justify-center p-6 sm:p-10 bg-white rounded-2xl border border-[#624150]/10">
            <div className="w-full max-w-[360px]">
              <CubDropEditorialCard />
            </div>
          </div>
        </section>

        {/* VIEW 2: 3-Column Storefront Grid Context */}
        <section className="space-y-4 pt-4 border-t border-[#624150]/15">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#624150] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fbceca]" />
              2. Storefront Context (3-Column Catalog Grid)
            </h2>
            <p className="text-xs text-[#2e282a]/60 mt-1">
              Demonstration of how the card inserts seamlessly between genuine pre-loved clothing items without overpowering the shop layout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* Mock Product 1 */}
            <div className="rounded-2xl border border-[#624150]/15 bg-white p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="relative w-full aspect-square bg-[#FAF9F7] rounded-xl overflow-hidden flex items-center justify-center mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
                    alt="Vintage Corduroy Dungarees"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#624150] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Just Added
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#669199]">
                  12-18 Months
                </div>
                <h4 className="text-sm font-bold text-[#624150] mt-1 line-clamp-1">
                  Vintage Corduroy Dungarees
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Forest Green · Pristine Condition</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-sm text-[#624150]">R 185</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded-full">
                  1 in stock
                </span>
              </div>
            </div>

            {/* The Refined Editorial Card Placed In Center Slot */}
            <div className="flex">
              <CubDropEditorialCard isGridItem className="w-full" />
            </div>

            {/* Mock Product 2 */}
            <div className="rounded-2xl border border-[#624150]/15 bg-white p-4 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="relative w-full aspect-square bg-[#FAF9F7] rounded-xl overflow-hidden flex items-center justify-center mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
                    alt="Hand-Knitted Ochre Cardigan"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#624150] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    One of a Kind
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#669199]">
                  2-3 Years
                </div>
                <h4 className="text-sm font-bold text-[#624150] mt-1 line-clamp-1">
                  Hand-Knitted Ochre Cardigan
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Pure Wool · Pre-loved Treasure</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-sm text-[#624150]">R 210</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded-full">
                  1 in stock
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Refined Design Hierarchy Breakdown */}
        <section className="bg-white rounded-2xl border border-[#624150]/15 p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#624150]">
            Specification & Hierarchy Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs text-[#2e282a]/75">
            <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#624150]/10">
              <span className="font-bold text-[#624150] block text-[11px] uppercase tracking-wider mb-1">
                1. Kicker
              </span>
              <span>"MZC Early Sniff" with teal dot, 10-11px uppercase Poppins, 0.14em tracking.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#624150]/10">
              <span className="font-bold text-[#624150] block text-[11px] uppercase tracking-wider mb-1">
                2. Headline
              </span>
              <span>"Never miss a cub drop." in deep plum #624150 bold.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#624150]/10">
              <span className="font-bold text-[#624150] block text-[11px] uppercase tracking-wider mb-1">
                3. Body Copy
              </span>
              <span>"Get a friendly early alert when the next little batch of pre-loved gems is about to land."</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#624150]/10">
              <span className="font-bold text-[#624150] block text-[11px] uppercase tracking-wider mb-1">
                4. Input & CTA
              </span>
              <span>Off-white input & deep plum button with "JOIN THE DROP LIST" and peach arrow.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#624150]/10">
              <span className="font-bold text-[#624150] block text-[11px] uppercase tracking-wider mb-1">
                5. Reassurance
              </span>
              <span>"Zero spam. Just new drops, secret restocks & the occasional MZC surprise."</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NeverMissACubDropTest;
