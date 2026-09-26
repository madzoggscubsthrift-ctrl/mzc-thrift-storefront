import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface NeverMissACubDropProps {
  variant?: 'compact' | 'banner' | 'card';
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export const NeverMissACubDrop: React.FC<NeverMissACubDropProps> = ({
  variant = 'compact',
  title = 'Never miss a cub drop',
  description = 'New pieces land regularly.',
  buttonText = 'GET 10% OFF',
  className = '',
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
      }, 6000);
    }
  };

  // Compact editorial promo for the Shop page
  if (variant === 'compact') {
    return (
      <div className={`border border-[#624150]/15 bg-[#faf9f8] p-3 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 ${className}`}>
        <div>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#624150] block">
            {title.toUpperCase()}
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {description}
          </span>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 shrink-0">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-2.5 py-1 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#624150] text-slate-800 placeholder-slate-400 font-sans w-36 sm:w-44"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#624150] hover:bg-[#4a313d] text-white text-[10px] sm:text-[11px] font-medium tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
            >
              {buttonText}
            </button>
          </form>
        ) : (
          <div className="text-xs text-[#624150] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#669199] shrink-0" />
            <span>Use code <strong className="tracking-wide">CUB10</strong> for 10% off!</span>
          </div>
        )}
      </div>
    );
  }

  // Card variant for Drop Spot
  if (variant === 'card') {
    return (
      <div
        className={`relative overflow-hidden bg-white border border-[#624150]/15 p-6 ${className}`}
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8a5e71]">
          <span>MZC Drop Spot</span>
        </div>

        <h3 className="mt-2 text-lg font-bold text-[#624150] tracking-tight leading-snug uppercase">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-2 relative z-10">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#624150] text-slate-800 placeholder-slate-400 font-sans"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#624150] hover:bg-[#4a313d] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {buttonText}
          </button>
        </form>

        {submitted && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-medium">You're on the cub drop alert list!</span>
          </div>
        )}
      </div>
    );
  }

  // Banner variant
  return (
    <div
      className={`relative overflow-hidden border border-[#624150]/15 bg-[#faf9f8] p-5 sm:p-6 ${className}`}
    >
      <div className="relative z-10 max-w-xl">
        <h3 className="text-base sm:text-lg font-semibold text-[#624150] tracking-tight uppercase">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="mt-3 flex flex-col sm:flex-row items-stretch gap-2 max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#624150] text-slate-800 placeholder-slate-400 font-sans"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-[#624150] hover:bg-[#4a313d] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            {buttonText}
          </button>
        </form>

        {submitted && (
          <div className="mt-2.5 text-xs text-[#624150] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#669199]" />
            <span>You're on the list! Check your inbox for updates.</span>
          </div>
        )}
      </div>
    </div>
  );
};
