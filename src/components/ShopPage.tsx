import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ProductItem } from '../types';
import { NeverMissACubDrop } from './NeverMissACubDrop';
import { ChevronLeft, ChevronRight, Plus, ShoppingBag } from 'lucide-react';

export interface ShopPageProps {
  onQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  searchQuery: string;
  activeShopTab?: 'active' | 'archive';
  onSelectShopTab?: (tab: 'active' | 'archive') => void;
  onNavigateToDrop?: () => void;
}

const MZC_INVENTORY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwzZslw-hBQQuUNKBwYW8LjkTZ-Kc6e1UMhuM8XthqWY4fXgmS6-9FCZAPIRSLxFyl-WQ/exec';

/**
 * Normalized MZC product representation
 */
export interface MzcNormalizedProduct {
  id: string;
  name: string;
  category: string;
  ageGroup: string;
  brand: string;
  size: string;
  price: number;
  sku: string;
  images: string[];
  isSoldOut: boolean;
  productItemRef: ProductItem;
}

const AGE_GROUPS = ['All', 'Infant', 'Toddler', 'Preschooler', 'Kid', 'Teen'] as const;
type AgeGroup = typeof AGE_GROUPS[number];

/**
 * Clean Google Drive URLs using standard MZC logic:
 * 1. If contains /d/FILE_ID -> https://lh3.googleusercontent.com/d/FILE_ID
 * 2. If contains ?id=FILE_ID or &id=FILE_ID -> https://lh3.googleusercontent.com/d/FILE_ID
 * 3. Otherwise leave unchanged
 */
export function cleanGoogleDriveUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${dMatch[1]}`;
  }

  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }

  return trimmed;
}

/**
 * Extract and clean image URLs from fields containing image, thumbnail, or photo.
 * Handles comma-separated URLs.
 */
export function extractImageUrls(raw: Record<string, any>): string[] {
  const urls: string[] = [];
  const matchingKeys = Object.keys(raw)
    .filter((k) => {
      const lower = k.toLowerCase();
      return lower.includes('image') || lower.includes('thumbnail') || lower.includes('photo');
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  for (const key of matchingKeys) {
    const val = raw[key];
    if (typeof val === 'string' && val.trim()) {
      const parts = val.split(',').map((p) => p.trim()).filter(Boolean);
      for (const p of parts) {
        const cleaned = cleanGoogleDriveUrl(p);
        if (cleaned && !urls.includes(cleaned)) {
          urls.push(cleaned);
        }
      }
    }
  }
  return urls;
}

/**
 * Normalize a single raw inventory item from Google Apps Script.
 * Excludes sold or unavailable items.
 */
function normalizeRawItem(raw: Record<string, any>, index: number): MzcNormalizedProduct | null {
  // Exclude sold / unavailable items
  const rawStatus = String(raw.availabilityStatus || raw.Availability_Status || raw.AM || '').trim().toLowerCase();
  if (rawStatus === 'sold' || rawStatus === 'sold out' || rawStatus === 'unavailable') {
    return null;
  }

  // Real product name
  const name = String(raw.name || raw.Item_Name || raw.title || raw.productName || '').trim();
  if (!name) return null;

  // Real category
  const category = String(raw.category || raw.Item_Category || 'Other').trim();

  // Real age group (no guessing or inference)
  const ageGroup = String(raw.ageGroup || raw.Age_Group || raw.AgeGroup || raw['Age Group'] || raw.age_group || '').trim();

  // Real brand (leave blank if not available)
  const brand = String(raw.itemBrand || raw.Item_Brand || raw.brand || '').trim();

  // Real size
  const size = String(raw.size || raw.Size || raw.Labeled_Size || '').trim();

  // Real selling price
  const rawPrice = raw.price ?? raw.Selling_Price ?? raw.Price ?? 0;
  const price = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;

  // SKU / ID
  const sku = String(raw.Item_SKU || raw.SKU || raw.sku || `mzc-${index + 1}`).trim();
  const id = sku || `mzc-item-${index + 1}`;

  // Image extraction & Drive cleanup
  const images = extractImageUrls(raw);

  const productItemRef: ProductItem = {
    id,
    name,
    category: category as any,
    size,
    condition: 'Like New',
    originalPrice: price,
    thriftPrice: price,
    colorScheme: 'plum',
    shortDesc: name,
    details: [
      brand ? `Brand: ${brand}` : '',
      size ? `Size: ${size}` : '',
      category ? `Category: ${category}` : '',
    ].filter(Boolean),
    inStock: true,
  };

  return {
    id,
    name,
    category,
    ageGroup,
    brand,
    size,
    price,
    sku,
    images,
    isSoldOut: false,
    productItemRef,
  };
}

/**
 * Individual horizontal scrolling row for a category
 */
const CategoryRow: React.FC<{
  categoryName: string;
  products: MzcNormalizedProduct[];
  onQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
}> = ({ categoryName, products, onQuickView, onAddToCart }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, products]);

  // Translate vertical mouse wheel scrolling into horizontal row scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atLeft = el.scrollLeft <= 0 && e.deltaY < 0;
        const atRight = el.scrollLeft >= el.scrollWidth - el.clientWidth && e.deltaY > 0;
        if (!atLeft && !atRight) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
          checkScroll();
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [checkScroll]);

  const scrollBy = (amount: number) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="py-8 border-b border-slate-100 last:border-b-0">
      {/* Category Header with Title & Arrow Navigation */}
      <div className="flex items-center justify-between mb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-sm sm:text-base font-semibold text-[#624150] tracking-wider uppercase font-sans">
          {categoryName.toUpperCase()}
        </h2>

        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollBy(-320)}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${categoryName} left`}
            className={`p-1.5 rounded-full transition-colors ${
              canScrollLeft
                ? 'text-[#624150] hover:bg-[#624150]/10 cursor-pointer'
                : 'text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(320)}
            disabled={!canScrollRight}
            aria-label={`Scroll ${categoryName} right`}
            className={`p-1.5 rounded-full transition-colors ${
              canScrollRight
                ? 'text-[#624150] hover:bg-[#624150]/10 cursor-pointer'
                : 'text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 sm:gap-8 overflow-x-auto overflow-y-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-smooth scrollbar-none pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {products.map((item) => {
          const hasImage = item.images.length > 0;
          const primaryImage = item.images[0];
          // If only one image exists, use that same image for secondary
          const secondaryImage = item.images.length > 1 ? item.images[1] : primaryImage;

          return (
            <div
              key={item.id}
              onClick={() => onQuickView(item.productItemRef)}
              className="mzc-card w-[178px] sm:w-[230px] flex-none select-none group"
            >
              {/* Square (1:1) Product Image Hero Container */}
              <div className="mzc-card-img-wrap">
                {hasImage ? (
                  <>
                    <img
                      src={primaryImage}
                      alt={item.name}
                      loading="lazy"
                      className="mzc-card-img"
                    />
                    {secondaryImage && (
                      <img
                        src={secondaryImage}
                        alt={`${item.name} alternate view`}
                        loading="lazy"
                        className="mzc-card-img mzc-card-img-secondary"
                      />
                    )}
                  </>
                ) : (
                  /* Clean neutral square photo placeholder */
                  <div className="w-full h-full flex items-center justify-center p-4 bg-[#F9F9F9] text-slate-300">
                    <ShoppingBag className="w-8 h-8 text-slate-300 stroke-[1.25]" />
                  </div>
                )}

                {/* Original MZC Sold Out tag */}
                {item.isSoldOut && (
                  <div className="mzc-sold-out-tag">
                    SOLD OUT
                  </div>
                )}

                {/* Original MZC Quick View: Sharp-cornered rectangular tab with knockout text effect */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(item.productItemRef);
                  }}
                  className="mzc-quick-view-tab"
                  aria-label={`Quick view ${item.name}`}
                >
                  <span className="mzc-quick-view-text">QUICK VIEW</span>
                </button>
              </div>

              {/* Centered Editorial Product Information */}
              {item.brand && (
                <div className="mzc-card-brand truncate">
                  {item.brand}
                </div>
              )}

              <div className="mzc-card-title">
                {item.name}
              </div>

              {item.size && (
                <div className="mzc-card-size">
                  {item.size}
                </div>
              )}

              {/* Price and Quiet Plus (+) Action */}
              <div className="mzc-card-price-row">
                <span className="mzc-card-price">
                  R {item.price.toFixed(2)}
                </span>

                {!item.isSoldOut && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item.productItemRef);
                    }}
                    aria-label="Add to cart"
                    title="Add to cart"
                    className="mzc-card-add-btn"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ShopPage: React.FC<ShopPageProps> = ({
  onQuickView,
  onAddToCart,
  searchQuery,
}) => {
  // Live inventory state
  const [products, setProducts] = useState<MzcNormalizedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Read initial age filter from URL query parameter ?age=
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ageParam = params.get('age');
      if (ageParam) {
        const found = AGE_GROUPS.find(
          (a) => a.toLowerCase() === ageParam.toLowerCase()
        );
        if (found) return found;
      }
    }
    return 'All';
  });

  // Fetch real MZC inventory from live Google Apps Script endpoint
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(MZC_INVENTORY_ENDPOINT, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch inventory (HTTP ${res.status})`);
      }

      const rawJson = await res.json();
      const rawList: any[] = Array.isArray(rawJson)
        ? rawJson
        : rawJson?.items || rawJson?.data || [];

      const normalizedList = rawList
        .map((item, idx) => normalizeRawItem(item, idx))
        .filter((item): item is MzcNormalizedProduct => item !== null);

      setProducts(normalizedList);
    } catch (err: any) {
      console.error('Error loading MZC inventory from Apps Script:', err);
      setError('Unable to load live inventory right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Single unified search: uses the query passed down from Header
  const activeSearch = (searchQuery || '').trim().toLowerCase();

  // Listen to popstate to sync URL query parameter ?age= with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const ageParam = params.get('age');
      if (ageParam) {
        const found = AGE_GROUPS.find(
          (a) => a.toLowerCase() === ageParam.toLowerCase()
        );
        setSelectedAge(found || 'All');
      } else {
        setSelectedAge('All');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAgeChange = (age: AgeGroup) => {
    setSelectedAge(age);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (age === 'All') {
        url.searchParams.delete('age');
      } else {
        url.searchParams.set('age', age);
      }
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  };

  // Filter products by search and real age group (Age Group remains a filter)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Age group filtering: check real inventory ageGroup field directly
      if (selectedAge !== 'All') {
        if (!p.ageGroup || p.ageGroup.toLowerCase() !== selectedAge.toLowerCase()) {
          return false;
        }
      }

      // Search filtering by product name, category, and brand
      if (activeSearch) {
        const matchesName = p.name.toLowerCase().includes(activeSearch);
        const matchesCat = p.category.toLowerCase().includes(activeSearch);
        const matchesBrand = p.brand ? p.brand.toLowerCase().includes(activeSearch) : false;
        if (!matchesName && !matchesCat && !matchesBrand) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedAge, activeSearch]);

  // Group products into rows strictly by product category, preserving inventory appearance order
  const categorySections = useMemo(() => {
    const categoryOrder: string[] = [];
    const grouped: Record<string, MzcNormalizedProduct[]> = {};

    for (const prod of products) {
      if (!categoryOrder.includes(prod.category)) {
        categoryOrder.push(prod.category);
      }
    }

    for (const prod of filteredProducts) {
      if (!grouped[prod.category]) {
        grouped[prod.category] = [];
      }
      grouped[prod.category].push(prod);
    }

    // Only render categories containing products after filters are applied
    return categoryOrder
      .filter((cat) => grouped[cat] && grouped[cat].length > 0)
      .map((cat) => ({
        categoryName: cat,
        products: grouped[cat],
      }));
  }, [products, filteredProducts]);

  return (
    <div className="w-full bg-white pb-24 font-sans">
      {/* 1. Shop Top Area: Compact Cub Drop Promo + Boutique Age-Group Filters */}
      <section className="pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Compact Never Miss a Cub Drop Promo */}
        <div className="mb-4">
          <NeverMissACubDrop
            variant="compact"
            title="Never miss a cub drop"
            description="New pieces land regularly."
            buttonText="GET 10% OFF"
          />
        </div>

        {/* Age-Group Filter Controls (Restrained uppercase MZC boutique typography) */}
        <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto pb-1 scrollbar-none">
          {AGE_GROUPS.map((age) => {
            const isActive = selectedAge === age;
            return (
              <button
                key={age}
                type="button"
                onClick={() => handleAgeChange(age)}
                className={`text-xs tracking-[0.14em] uppercase transition-colors shrink-0 cursor-pointer py-1 border-b-2 font-sans ${
                  isActive
                    ? 'font-semibold text-[#624150] border-[#624150]'
                    : 'font-normal text-[#624150]/70 hover:text-[#624150] border-transparent'
                }`}
              >
                {age.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Category Row Architecture / Loading / Error States */}
      <section className="w-full">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="inline-block w-6 h-6 border-2 border-[#624150]/20 border-t-[#624150] rounded-full animate-spin mb-3" />
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
              Loading inventory...
            </p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto py-20 px-4 text-center">
            <p className="text-sm font-medium text-[#624150] mb-1">
              {error}
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Please check your connection and try again.
            </p>
            <button
              onClick={fetchInventory}
              className="px-4 py-1.5 text-xs font-medium text-white bg-[#624150] hover:bg-[#4a313d] transition-colors rounded-none cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : categorySections.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h3 className="text-sm font-medium text-[#624150] uppercase tracking-wider">
              No items found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No products match your current search or age filter.
            </p>
            {(selectedAge !== 'All' || activeSearch) && (
              <button
                type="button"
                onClick={() => {
                  handleAgeChange('All');
                }}
                className="mt-4 px-4 py-1.5 bg-[#624150] hover:bg-[#4a313d] text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          categorySections.map(({ categoryName, products }) => (
            <CategoryRow
              key={categoryName}
              categoryName={categoryName}
              products={products}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </section>
    </div>
  );
};
