/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Route, ProductItem, CartItem } from './types';
import { Header } from './components/Header';
import { ShopPage } from './components/ShopPage';
import { DropPage } from './components/DropPage';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import NeverMissACubDropTest from './components/NeverMissACubDropTest';

export default function App() {
  // Client-side routing: initialize from current window path, query, hash, or default to '/shop'
  const [currentRoute, setCurrentRoute] = useState<Route>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/test') || search.includes('test') || hash.includes('test')) {
        return '/test';
      }
      if (path.startsWith('/drop')) {
        return '/drop';
      }
    }
    return '/shop';
  });

  const [activeShopTab, setActiveShopTab] = useState<'active' | 'archive'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  // Sync route changes with Browser History API (back/forward & URL display)
  const navigateTo = useCallback((route: Route, shopTab?: 'active' | 'archive') => {
    setCurrentRoute(route);
    if (route === '/shop' && shopTab) {
      setActiveShopTab(shopTab);
    }
    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState(null, '', route);
    }
    // Scroll smoothly to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser back/forward and hash changes
  useEffect(() => {
    const handleRoutingChange = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/test') || search.includes('test') || hash.includes('test')) {
        setCurrentRoute('/test');
      } else if (path.startsWith('/drop')) {
        setCurrentRoute('/drop');
      } else {
        setCurrentRoute('/shop');
      }
    };

    window.addEventListener('popstate', handleRoutingChange);
    window.addEventListener('hashchange', handleRoutingChange);

    // Keyboard shortcut (Alt+T or Option+T) to quickly toggle test route preview
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 't') {
        setCurrentRoute((prev) => {
          const next = prev === '/test' ? '/shop' : '/test';
          if (typeof window !== 'undefined') {
            window.history.pushState(null, '', next);
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleRoutingChange);
      window.removeEventListener('hashchange', handleRoutingChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // When user types in search from header while on /drop, switch to /shop
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentRoute !== '/shop') {
      navigateTo('/shop');
    }
  };

  // Cart operations for testing storefront shell
  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#fbceca] selection:text-[#624150]">
      {/* Standalone Boutique Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeShopTab={activeShopTab}
        onSelectShopTab={(tab) => {
          setActiveShopTab(tab);
          navigateTo('/shop', tab);
        }}
      />

      {/* Main Content Area: Responsive & Full-Width */}
      <main className="flex-1 w-full bg-white">
        {currentRoute === '/test' ? (
          <div>
            <div className="bg-[#624150] text-white text-xs px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between font-sans border-b border-[#fbceca]/20 sticky top-0 z-50">
              <span className="font-semibold text-[#fbceca] flex items-center gap-2">
                <span>🐾</span>
                <span>Visual Test Preview: NeverMissACubDropTest (/test)</span>
              </span>
              <button
                onClick={() => navigateTo('/shop')}
                className="text-white hover:text-[#fbceca] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Back to Storefront</span>
              </button>
            </div>
            <NeverMissACubDropTest />
          </div>
        ) : currentRoute === '/shop' ? (
          <ShopPage
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            activeShopTab={activeShopTab}
            onSelectShopTab={setActiveShopTab}
            onNavigateToDrop={() => navigateTo('/drop')}
          />
        ) : (
          <DropPage
            onNavigateToShop={() => navigateTo('/shop')}
          />
        )}
      </main>

      {/* Boutique Footer */}
      <Footer currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Interactive Cart / Bag Preview Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToShop={() => navigateTo('/shop')}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
