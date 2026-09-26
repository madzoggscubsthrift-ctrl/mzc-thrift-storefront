import React from 'react';
import { CartItem } from '../types';
import { ProductVisual } from './ProductVisual';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToShop,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.thriftPrice * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#624150]/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#624150]/15">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#624150]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#624150] text-[#fbceca] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#624150]">
                  Cubs Thrift Bag
                </h2>
                <span className="text-[11px] text-[#8a5e71] font-medium">
                  {items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'gem' : 'gems'} selected
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-[#624150] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Boutique Shell Notice */}
          <div className="px-6 py-2.5 bg-[#fbceca]/35 border-b border-[#fbceca] text-xs text-[#624150] flex items-center justify-between font-medium">
            <span>🐾 Stage 1 Storefront Shell</span>
            <span className="font-bold text-[#8a5e71]">Test Preview</span>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-3xl bg-[#fbceca]/30 flex items-center justify-center mx-auto mb-4 text-[#624150]">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">Your cub bag is empty</h3>
                <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  Browse the /shop catalogue and add some placeholder pre-loved pieces to test the bag experience.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="mt-6 px-6 py-3 bg-[#624150] hover:bg-[#4a313d] text-white text-xs font-bold rounded-2xl transition-colors shadow-xs cursor-pointer"
                >
                  Explore Shop Catalogue
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-2xl border-2 border-slate-150 bg-white shadow-2xs"
                >
                  <div className="w-18 h-18 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 p-1">
                    <ProductVisual
                      category={product.category}
                      colorScheme={product.colorScheme}
                      itemId={product.id}
                      className="w-14 h-14"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#8a5e71]">
                          {product.category} · {product.size}
                        </span>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                      <span className="text-sm font-extrabold text-[#624150]">
                        £{(product.thriftPrice * quantity).toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-0.5 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="text-slate-500 hover:text-slate-900 font-bold px-1 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-slate-800">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="text-slate-500 hover:text-slate-900 font-bold px-1 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Placeholder */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#624150]/10 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-600 font-medium">Estimated Subtotal</span>
                <span className="text-xl font-black text-[#624150]">
                  £{totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fbceca]/25 border border-[#fbceca] text-xs text-[#624150] mb-4">
                <p className="font-bold">Stage 1 Storefront Shell Notice:</p>
                <p className="mt-0.5 text-[11px] text-slate-600">
                  Payments and checkout are disabled in this initial shell. Your existing Google Sites / Apps Script systems remain untouched.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClearCart}
                  className="py-3 px-4 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
                >
                  Clear Bag
                </button>
                <button
                  disabled
                  className="flex-1 py-3 px-4 bg-[#624150]/60 text-white text-xs font-bold rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Checkout (Stage 2 Integration)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
