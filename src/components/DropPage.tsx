import React, { useState } from 'react';
import { DropItem } from '../types';
import { PLACEHOLDER_DROP_ITEMS } from '../data/placeholderData';
import { ProductVisual } from './ProductVisual';
import { NeverMissACubDrop } from './NeverMissACubDrop';
import { Sparkles, Clock, MapPin, ArrowRight, CheckCircle2, Bookmark, Heart, PackageCheck, Compass } from 'lucide-react';

interface DropPageProps {
  onNavigateToShop: () => void;
  onPreviewDropItem?: (item: DropItem) => void;
}

export const DropPage: React.FC<DropPageProps> = ({ onNavigateToShop }) => {
  const [reservedIds, setReservedIds] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'current' | 'schedule' | 'how-it-works'>('current');

  const handleToggleHold = (itemId: string) => {
    setReservedIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="w-full pb-20 bg-white">
      {/* Drop Spot Hero Header with Generous White Space */}
      <section className="bg-white border-b border-[#624150]/10 pt-12 sm:pt-16 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Quirky Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#669199]/15 border border-[#669199]/30 text-[#624150] text-xs font-bold tracking-wide mb-4">
                <span className="text-sm">✨</span>
                <span>MZC Drop Spot</span>
                <span className="text-[#8a5e71]">·</span>
                <span className="text-[#669199] font-medium">Weekly Themed Releases</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#624150] tracking-tight leading-tight">
                The MZC Drop Spot
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Weekly curated capsules, limited vintage pieces, and our community consignor hub.
                Every Friday at 7 PM, a fresh batch of pre-loved gems goes live.
              </p>

              {/* Status Tags */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#624150] text-white text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#fbceca]" />
                  <span>Drop Capsule #14 Active</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-[#669199]" />
                  <span>Next Batch: Friday 7:00 PM</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#fbceca]/40 text-[#624150] text-xs font-bold border border-[#fbceca]">
                  <MapPin className="w-3.5 h-3.5 text-[#8a5e71]" />
                  <span>Local Drop Spot & Pick-up</span>
                </div>
              </div>
            </div>

            {/* Right: Restyled MZC Signature Promotional Drop Alert Card */}
            <div className="lg:col-span-5">
              <NeverMissACubDrop variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* Segmented Controls with Boutique Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-center gap-1.5 p-1.5 bg-[#624150]/5 rounded-2xl border border-[#624150]/10 w-fit">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'current'
                ? 'bg-[#624150] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#624150]'
            }`}
          >
            Current Drop Capsule
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#624150] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#624150]'
            }`}
          >
            Drop Schedule
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'how-it-works'
                ? 'bg-[#624150] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#624150]'
            }`}
          >
            How Drop Spot Works
          </button>
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'current' && (
          <div>
            {/* Capsule header description */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#624150]/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#624150]">
                    Drop #14: The Autumn Woodland Capsule
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fbceca] text-[#624150] px-2.5 py-1 rounded-full shadow-2xs">
                    Live Now
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  6 clearly labelled placeholder drop items. Hand-selected knitwear, quilted jackets, and woodland toys.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateToShop}
                  className="text-xs sm:text-sm font-bold text-[#669199] hover:text-[#355f66] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Looking for regular catalogue? Browse /shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drop Grid: Letting Photography & Visuals Breathe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PLACEHOLDER_DROP_ITEMS.map((item) => {
                const isHeld = reservedIds[item.id];
                const isDropAvailable = item.status === 'Available Now' && !isHeld;

                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-3xl border-2 border-slate-150 hover:border-[#624150]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Visual Card Top */}
                    <div
                      className={`relative h-64 w-full flex items-center justify-center p-6 border-b border-slate-100 ${
                        item.colorScheme === 'plum'
                          ? 'bg-gradient-to-b from-[#624150]/5 to-white'
                          : item.colorScheme === 'teal'
                          ? 'bg-gradient-to-b from-[#669199]/10 to-white'
                          : 'bg-gradient-to-b from-[#fbceca]/25 to-white'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#624150] bg-white/95 border border-[#624150]/15 px-2.5 py-1 rounded-full shadow-2xs">
                          Drop #{item.dropNumber}
                        </span>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs ${
                            isHeld
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : item.status === 'Available Now'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : item.status === 'Reserved'
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-[#fbceca] text-[#624150] border border-[#624150]/15'
                          }`}
                        >
                          {isHeld ? 'Held by You (Test)' : item.status}
                        </span>
                      </div>

                      {/* Product Visual */}
                      <div className="p-4 transition-transform duration-300 group-hover:scale-105">
                        <ProductVisual
                          category={
                            item.name.toLowerCase().includes('shoe') || item.name.toLowerCase().includes('walker')
                              ? 'Footwear'
                              : item.name.toLowerCase().includes('toy')
                              ? 'Toys & Books'
                              : item.name.toLowerCase().includes('jacket')
                              ? 'Outerwear'
                              : item.colorScheme === 'pink'
                              ? 'Baby'
                              : 'Toddler'
                          }
                          colorScheme={item.colorScheme}
                          itemId={item.id}
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Metadata row */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                          <span className="font-bold text-[#8a5e71]">{item.category}</span>
                          <span>·</span>
                          <span>{item.size}</span>
                          <span>·</span>
                          <span className="text-[#669199] font-medium">Drop Exclusive</span>
                        </div>

                        {/* Drop Item Name */}
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#624150] transition-colors leading-snug">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                          {item.shortDesc}
                        </p>
                      </div>

                      {/* Drop Action bar */}
                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black text-[#624150]">
                            £{item.price.toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            Single unique pre-loved piece
                          </span>
                        </div>

                        <button
                          onClick={() => handleToggleHold(item.id)}
                          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                            isHeld
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                              : isDropAvailable
                              ? 'bg-[#624150] hover:bg-[#4a313d] text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {isHeld
                            ? 'Release Test Hold'
                            : isDropAvailable
                            ? 'Claim Test Hold'
                            : 'Preview Only'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-3xl border-2 border-slate-150 p-6 sm:p-10">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbceca]/40 text-[#624150] text-xs font-bold mb-3">
                <span>🗓️</span>
                <span>Friday 7 PM Release Calendar</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#624150]">Upcoming MZC Drop Calendar</h2>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Weekly scheduled themed drops. In later stages, this calendar will sync live with your MZC inventory database.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl border-2 border-[#624150]/20 bg-white hover:border-[#624150] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#624150] text-[#fbceca] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    #14
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-[#624150]">
                        The Autumn Woodland Capsule
                      </h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        Live Now
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Cosy knitwear, corduroy overalls, rainboots and forest storybooks.
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">Friday, 7:00 PM</span>
                  <span className="text-[11px] text-[#669199] font-medium">Available to browse</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border-2 border-slate-150 bg-white hover:border-[#669199] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#669199] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    #15
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-[#624150]">
                        Vintage Denim & Dungarees Special
                      </h4>
                      <span className="text-[10px] bg-[#fbceca] text-[#624150] font-bold px-2.5 py-0.5 rounded-full">
                        Next Week
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Hand-picked heritage dungarees, chore jackets, and overalls for ages 0-6Y.
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">Next Friday, 7:00 PM</span>
                  <span className="text-[11px] text-[#8a5e71] font-medium">Dropping in 7 days</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border-2 border-slate-150 bg-white hover:border-[#8a5e71] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#8a5e71] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                    #16
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-[#624150]">
                        Organic Sleepwear & Newborn Bundles
                      </h4>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-full">
                        In Curation
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Clean organic cotton rompers, sleeping bags, and delicate swaddles.
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">October 10th, 7:00 PM</span>
                  <span className="text-[11px] text-slate-400">Upcoming batch</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="bg-white rounded-3xl border-2 border-slate-150 p-6 sm:p-10">
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#669199]/15 text-[#624150] text-xs font-bold mb-3">
                <span>🔄</span>
                <span>Circular Children's Thrifting</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#624150]">How the MZC Drop Spot Works</h2>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                The Drop Spot makes thrifting children's clothing exciting, circular, and transparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#624150]/5 border border-[#624150]/15">
                <span className="text-3xl font-black text-[#669199]">01</span>
                <h4 className="mt-3 font-extrabold text-base text-[#624150]">Weekly Themed Drops</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Instead of endless cluttered racks, we photograph, measure, and drop curated batches
                  at scheduled drop times so you can easily spot your size.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#fbceca]/30 border border-[#fbceca]">
                <span className="text-3xl font-black text-[#8a5e71]">02</span>
                <h4 className="mt-3 font-extrabold text-base text-[#624150]">Fast Claim & Holds</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Every pre-loved item is one-of-a-kind. When a drop opens, items can be claimed
                  quickly or held for combined delivery with other orders.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#669199]/10 border border-[#669199]/20">
                <span className="text-3xl font-black text-[#624150]">03</span>
                <h4 className="mt-3 font-extrabold text-base text-[#624150]">Consignor Drop Spot</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Local parents drop off outgrown cubs wear. We sort, prep, and photograph everything,
                  giving you store credit or cash when items find their new home.
                </p>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-[#624150] text-white flex items-center justify-between flex-wrap gap-4 shadow-sm">
              <div>
                <span className="font-bold text-white text-sm block">Ready to explore the shop catalogue?</span>
                <span className="text-xs text-white/80">Browse available pre-loved sizes from newborn to 12 years.</span>
              </div>
              <button
                onClick={onNavigateToShop}
                className="px-5 py-2.5 bg-[#fbceca] hover:bg-white text-[#624150] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Go to /shop
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
