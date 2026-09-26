import React, { useState, useEffect, useRef } from 'react';
import { Route } from '../types';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentRoute: Route;
  onNavigate: (route: Route, shopTab?: 'active' | 'archive') => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeShopTab?: 'active' | 'archive';
  onSelectShopTab?: (tab: 'active' | 'archive') => void;
}

// Real MZC inventory photography loaded for the Shop header banner
const REAL_MZC_HEADER_IMAGES = [
  'https://www.appsheet.com/template/gettablefileurl?appName=MZCOperationsHub-407613797-25-10-06&tableName=inventory&fileName=MZC_Inventory%2FOuterwear%2F%2F00016.Item_Image.143736.webp',
  'https://www.appsheet.com/template/gettablefileurl?appName=MZCOperationsHub-407613797-25-10-06&tableName=inventory&fileName=MZC_Inventory%2FTops%2F%2F00027.Item_Image.105535.jpg',
  'https://www.appsheet.com/template/gettablefileurl?appName=MZCOperationsHub-407613797-25-10-06&tableName=inventory&fileName=MZC_Inventory%2FMZC%20Item%20Add%20Images%2F%2F00016.Add_Image_1.143736.webp',
  'https://www.appsheet.com/template/gettablefileurl?appName=MZCOperationsHub-407613797-25-10-06&tableName=inventory&fileName=MZC_Inventory%2FMZC%20Item%20Add%20Images%2F%2F00027.Add_Image_2.105535.webp',
];

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectShopTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Subtle MZC peach/pink highlight/pulse around the bag/count when an item is added
  const [isPulsing, setIsPulsing] = useState(false);
  const prevCountRef = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setIsPulsing(true);
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  // Gentle subtle crossfade between real MZC photography
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % REAL_MZC_HEADER_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Expandable compact search state with relaxed left-to-right unfold (toggled by magnifying glass)
  const [isSearchExpanded, setIsSearchExpanded] = useState(Boolean(searchQuery));
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggleSearch = () => {
    if (isSearchExpanded) {
      setIsSearchExpanded(false);
      onSearchChange('');
      searchInputRef.current?.blur();
    } else {
      setIsSearchExpanded(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 120);
    }
  };

  const handleBlurSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  const handleNavClick = (route: Route, shopTab?: 'active' | 'archive') => {
    onNavigate(route, shopTab);
    if (route === '/shop' && shopTab && onSelectShopTab) {
      onSelectShopTab(shopTab);
    }
    setMobileMenuOpen(false);
  };

  const isShopActive = currentRoute === '/shop';
  const isDropSpotActive = currentRoute === '/drop';

  return (
    <header className="w-full font-sans bg-white">
      {/* 1. Pale Turquoise Announcement Bar (#D4EFEC) - Full-bleed, 50px fixed height, flex centered */}
      <div className="w-full h-[50px] bg-[#D4EFEC] text-[#2e282a] px-4 flex items-center justify-center text-center">
        <p className="text-xs sm:text-[13px] font-light tracking-normal text-[#2e282a] font-sans whitespace-nowrap">
          FREE shipping for orders over R750 📦
        </p>
      </div>

      {/* 2. Photographic Shop Header Banner - Standard Google Sites Banner (240px desktop / 160px mobile, bg-cover center) */}
      <div className="relative w-full h-[160px] md:h-[240px] overflow-hidden bg-[#2e282a]">
        {/* Real MZC photography background with gentle crossfade matching Google Sites banner */}
        {REAL_MZC_HEADER_IMAGES.map((imgSrc, idx) => (
          <div
            key={imgSrc}
            role="img"
            aria-label="Mad Zoggs Cubs Storefront Banner"
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              idx === activeImageIdx ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url("${imgSrc}")` }}
          />
        ))}

        {/* Subtle dark tint overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-95" />

        {/* MZC Site Navigation Over the Header Image */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
          <div className="flex items-center justify-end relative">
            {/* Desktop Navigation Links aligned toward the right */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
              <button
                onClick={() => handleNavClick('/shop', 'active')}
                className="text-xs lg:text-[13px] font-normal tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1"
              >
                HOME
              </button>

              <button
                onClick={() => handleNavClick('/drop')}
                className={`text-xs lg:text-[13px] tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1 ${
                  isDropSpotActive ? 'font-bold' : 'font-normal'
                }`}
              >
                DROP SPOT
              </button>

              <button
                onClick={() => handleNavClick('/shop', 'active')}
                className={`text-xs lg:text-[13px] tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1 ${
                  isShopActive ? 'font-bold' : 'font-normal'
                }`}
              >
                SHOP
              </button>

              <button
                onClick={() => handleNavClick('/shop', 'active')}
                className="text-xs lg:text-[13px] font-normal tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1"
              >
                OUR STORY
              </button>

              <button
                onClick={() => handleNavClick('/shop', 'active')}
                className="text-xs lg:text-[13px] font-normal tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1"
              >
                THRIFT NOTES
              </button>

              <button
                onClick={() => handleNavClick('/shop', 'active')}
                className="text-xs lg:text-[13px] font-normal tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1"
              >
                CONTACT
              </button>

              <button
                onClick={() => handleNavClick('/shop', 'active')}
                className="text-xs lg:text-[13px] font-normal tracking-normal whitespace-nowrap uppercase text-white hover:opacity-75 transition-opacity cursor-pointer py-1"
              >
                FAQ
              </button>
            </nav>

            {/* Mobile hamburger menu toggle */}
            <div className="flex md:hidden items-center justify-end w-full">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-white cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* SHOP Title Over Header Image (Clean, prominent, restrained white typography) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-6 sm:pt-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.25em] text-white uppercase font-sans select-none">
            {currentRoute === '/drop' ? 'DROP SPOT' : 'SHOP'}
          </h1>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2e282a] text-white px-6 py-4 space-y-3 font-sans border-b border-white/10">
          <button
            onClick={() => handleNavClick('/shop', 'active')}
            className="block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase font-normal py-1 text-white hover:opacity-75 transition-opacity"
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('/drop')}
            className={`block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase py-1 text-white hover:opacity-75 transition-opacity ${
              isDropSpotActive ? 'font-bold' : 'font-normal'
            }`}
          >
            DROP SPOT
          </button>
          <button
            onClick={() => handleNavClick('/shop', 'active')}
            className={`block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase py-1 text-white hover:opacity-75 transition-opacity ${
              isShopActive ? 'font-bold' : 'font-normal'
            }`}
          >
            SHOP
          </button>
          <button
            onClick={() => handleNavClick('/shop', 'active')}
            className="block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase font-normal py-1 text-white hover:opacity-75 transition-opacity"
          >
            OUR STORY
          </button>
          <button
            onClick={() => handleNavClick('/shop', 'active')}
            className="block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase font-normal py-1 text-white hover:opacity-75 transition-opacity"
          >
            THRIFT NOTES
          </button>
          <button
            onClick={() => handleNavClick('/shop', 'active')}
            className="block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase font-normal py-1 text-white hover:opacity-75 transition-opacity"
          >
            CONTACT
          </button>
          <button
            onClick={() => handleNavClick('/shop', 'active')}
            className="block w-full text-left text-xs tracking-normal whitespace-nowrap uppercase font-normal py-1 text-white hover:opacity-75 transition-opacity"
          >
            FAQ
          </button>
        </div>
      )}

      {/* 3. Clean Product Search / Bag Row Immediately Below Header Image */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
          {/* LEFT: Compact Editorial Expandable Search (toggled by magnifying glass) */}
          <div className="relative flex items-center">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToggleSearch}
              className="flex items-center justify-center text-[#624150] hover:text-[#4a313d] p-1.5 transition-colors cursor-pointer shrink-0 z-10"
              aria-label={isSearchExpanded ? 'Close search' : 'Open search'}
              title={isSearchExpanded ? 'Close search' : 'Search products'}
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
            </button>

            {/* Left-to-right expansion & underline draw */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${
                isSearchExpanded
                  ? 'w-48 sm:w-60 md:w-72 opacity-100 ml-1.5'
                  : 'w-0 opacity-0 ml-0 pointer-events-none'
              }`}
            >
              <div className="w-full flex items-center border-b border-[#624150] pb-0.5">
                <input
                  ref={searchInputRef}
                  id="mzc-primary-search-input"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={handleBlurSearch}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      onSearchChange('');
                      setIsSearchExpanded(false);
                      searchInputRef.current?.blur();
                    }
                  }}
                  className="w-full py-1 text-xs sm:text-sm bg-transparent focus:outline-none text-[#624150] placeholder-[#624150]/40 font-sans tracking-wide"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Shopping Bag Icon + Numeric Count (existing pink pull tab visible when cartCount > 0, hidden when cartCount === 0) */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 transition-all duration-300 cursor-pointer py-1 px-2.5 rounded-full ${
              cartCount > 0
                ? `bg-[#fbceca] text-[#624150] ${isPulsing ? 'scale-105' : 'scale-100'}`
                : 'text-[#624150] hover:text-[#4a313d] bg-transparent'
            }`}
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            <span className="text-xs sm:text-sm font-semibold text-[#624150]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
