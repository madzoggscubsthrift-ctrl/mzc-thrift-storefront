import React from 'react';
import { Route } from '../types';
import { ShoppingBag, Sparkles, Heart, RefreshCw, Shield, MapPin, Mail, Archive } from 'lucide-react';

interface FooterProps {
  currentRoute: Route;
  onNavigate: (route: Route, shopTab?: 'active' | 'archive') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentRoute, onNavigate }) => {
  return (
    <footer className="w-full bg-[#624150] text-white pt-16 pb-12 border-t border-[#4a313d] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center font-black text-white text-base border border-white/15">
                MZC
              </div>
              <div>
                <span className="text-xl font-black tracking-tight block">
                  Mad Zoggs Cubs Thrift
                </span>
                <span className="text-xs text-[#fbceca] font-bold tracking-wider uppercase block">
                  Children's Boutique Thrift
                </span>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Sustainable, hand-curated pre-loved childrenswear and boutique finds.
              Giving gently outgrown apparel, footwear, and woodland gear a brand-new adventure.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/70">
              <span className="text-base">🐾</span>
              <span>Mad Zoggs Cubs Thrift · Established Visual Identity</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#fbceca]">
              Storefront Sections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/90">
              <li>
                <button
                  onClick={() => onNavigate('/shop', 'active')}
                  className={`hover:text-[#fbceca] transition-colors flex items-center gap-2 cursor-pointer ${
                    currentRoute === '/shop' ? 'text-[#fbceca] font-bold' : ''
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#669199]" />
                  <span>Shop Cubs Thrift (/shop)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop', 'archive')}
                  className="hover:text-[#fbceca] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5 text-[#fbceca]" />
                  <span>Shop Archive (Past Drops)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/drop')}
                  className={`hover:text-[#fbceca] transition-colors flex items-center gap-2 cursor-pointer ${
                    currentRoute === '/drop' ? 'text-[#fbceca] font-bold' : ''
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#669199]" />
                  <span>The Drop Spot (/drop)</span>
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                Drop Spot Notice
              </h5>
              <p className="text-xs text-white/75 leading-relaxed">
                Weekly scheduled batch drops on Friday evenings at 7:00 PM. Local drop-offs welcome at designated hubs.
              </p>
            </div>
          </div>

          {/* Boutique Ethos */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#fbceca]">
              The MZC Promise
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-[#669199] shrink-0 mt-0.5" />
                <span>Circular fashion keeping childrenswear out of landfill.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#fbceca] shrink-0 mt-0.5" />
                <span>Multi-point quality & honest condition grading inspection.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-[#8a5e71] shrink-0 mt-0.5" />
                <span>Family run, community focused, and environmentally conscious.</span>
              </div>
            </div>
          </div>

          {/* Stage 1 Integration Status */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#fbceca]">
              Stage 1 Status
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/10 text-xs text-white/90 space-y-1.5 border border-white/10">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Storefront Shell</span>
              </div>
              <div className="text-[11px] text-white/80 leading-relaxed">
                Frontend-only shell ready for Firebase Hosting deployment.
              </div>
              <div className="text-[10px] text-white/60 pt-2 border-t border-white/10">
                Plum #624150 · Teal #669199 · Pink #fbceca
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Mad Zoggs Cubs Thrift (MZC). All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Shop</span>
            <span>·</span>
            <span>Shop Archive</span>
            <span>·</span>
            <span>Drop Spot</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
