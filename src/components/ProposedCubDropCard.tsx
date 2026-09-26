import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Tag } from 'lucide-react';

interface ProposedCubDropCardProps {
  className?: string;
  onSuccess?: (code: string) => void;
}

/**
 * Proposed Compact Boutique Postcard / Mini-Card for "Never Miss a Cub Drop"
 * 
 * Design elements:
 * - Constrained boutique postcard width (max-w-[320px] ~ 340px)
 * - MZC Brand Palette: Plum (#624150), Teal (#669199), Soft Peach/Pink (#fbceca)
 * - Quirky yet sophisticated editorial microcopy ("MZC Early Sniff" kicker)
 * - Cute "10% OFF" boutique stamp badge
 * - Single compact email form with code reveal: CUB10
 */
export const ProposedCubDropCard: React.FC<ProposedCubDropCardProps> = ({
  className = '',
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      if (onSuccess) {
        onSuccess('CUB10');
      }
    }
  };

  return (
    <div
      className={`relative w-full max-w-[320px] sm:max-w-[340px] bg-white border border-[#624150]/20 p-5 shadow-xs font-sans text-left transition-all ${className}`}
      style={{
        // Subtle dual-tone postcard inner border or warm boutique backdrop
        boxShadow: '0 2px 12px rgba(98, 65, 80, 0.05)',
      }}
    >
      {/* Top boutique stamp / kicker row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Playful & sophisticated MZC Early Sniff badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fbceca]/50 border border-[#fbceca] text-[#624150]">
          <span className="text-xs">🐾</span>
          <span className="text-[10px] font-semibold tracking-wider uppercase font-sans">
            MZC Early Sniff
          </span>
        </div>

        {/* 10% Off Stamp */}
        <div className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#669199] uppercase bg-[#669199]/10 px-2 py-0.5">
          <Tag className="w-2.5 h-2.5 stroke-[2.5]" />
          <span>10% OFF</span>
        </div>
      </div>

      {/* Title with MZC Editorial Typography */}
      <h3 className="text-sm font-semibold tracking-[0.14em] text-[#624150] uppercase leading-snug">
        Never Miss A Cub Drop
      </h3>

      {/* Warm boutique description */}
      <p className="mt-1 text-[11px] text-slate-500 font-normal leading-relaxed">
        Fresh pre-loved gems land regularly. Get alerts and take 10% off your first order.
      </p>

      {/* Form / Success State */}
      <div className="mt-3.5">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-[#faf9f8] border border-slate-200 focus:outline-none focus:border-[#624150] focus:bg-white text-[#624150] placeholder-slate-400 font-sans transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3 bg-[#624150] hover:bg-[#4a313d] text-white text-[11px] font-medium tracking-[0.16em] uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>GET 10% OFF</span>
              <Sparkles className="w-3 h-3 text-[#fbceca]" />
            </button>
          </form>
        ) : (
          <div className="p-3 bg-[#faf9f8] border border-[#624150]/20 text-[#624150] text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#624150]">
              <CheckCircle2 className="w-4 h-4 text-[#669199] shrink-0" />
              <span>You're on the Cub Drop list!</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Use code <strong className="text-[#624150] font-bold tracking-wider">CUB10</strong> at checkout for 10% off.
            </p>
          </div>
        )}
      </div>

      {/* Quiet bottom detail */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-widest">
        <span>No spam · Just good drops</span>
        <span className="text-[#8a5e71]">✦ MZC</span>
      </div>
    </div>
  );
};
