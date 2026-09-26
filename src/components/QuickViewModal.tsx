import React from 'react';
import { ProductItem } from '../types';
import { ProductVisual } from './ProductVisual';
import { X, Check, ShoppingBag, Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#624150]/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#624150]/15 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-[#624150] transition-colors shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase */}
          <div
            className={`p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 ${
              product.colorScheme === 'plum'
                ? 'bg-gradient-to-b from-[#624150]/5 to-white'
                : product.colorScheme === 'teal'
                ? 'bg-gradient-to-b from-[#669199]/10 to-white'
                : 'bg-gradient-to-b from-[#fbceca]/25 to-white'
            }`}
          >
            <div className="p-4">
              <ProductVisual
                category={product.category}
                colorScheme={product.colorScheme}
                itemId={product.id}
                className="w-40 h-40"
              />
            </div>
            <span className="mt-4 text-[10px] font-extrabold uppercase tracking-widest text-[#8a5e71] bg-white px-3 py-1 rounded-full border border-[#fbceca] shadow-2xs">
              MZC Pre-Loved Gem
            </span>
            <div className="mt-2 text-xs text-slate-600">
              Condition Grade: <span className="font-bold text-[#624150]">{product.condition}</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Size */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#669199] uppercase tracking-wider">
                <span>{product.category}</span>
                <span>·</span>
                <span>Size: {product.size}</span>
              </div>

              {/* Title */}
              <h2 className="mt-2 text-lg sm:text-xl font-extrabold text-[#624150] leading-snug">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#624150]">
                  £{product.thriftPrice.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  RRP £{product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Save {Math.round((1 - product.thriftPrice / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {product.shortDesc}
              </p>

              {/* Bullet Details */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3.5">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-[#669199] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              {!product.isArchived ? (
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#624150] hover:bg-[#4a313d] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#fbceca]" />
                  <span>Add to Test Bag</span>
                </button>
              ) : (
                <div className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 text-slate-500 text-xs sm:text-sm font-bold text-center">
                  Sold in Previous Drop (Archived)
                </div>
              )}

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
