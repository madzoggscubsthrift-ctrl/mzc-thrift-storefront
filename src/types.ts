export type Route = '/shop' | '/drop' | '/test';

export interface ProductItem {
  id: string;
  name: string;
  category: 'Baby' | 'Toddler' | 'Little Kids' | 'Big Kids' | 'Outerwear' | 'Footwear' | 'Toys & Books';
  size: string;
  condition: 'Brand New with Tags' | 'Like New' | 'Excellent Pre-Loved' | 'Vintage Gem' | 'Gently Loved';
  originalPrice: number;
  thriftPrice: number;
  colorScheme: 'plum' | 'teal' | 'pink' | 'neutral';
  shortDesc: string;
  details: string[];
  inStock: boolean;
  featured?: boolean;
  isArchived?: boolean;
}

export interface DropItem {
  id: string;
  dropNumber: number;
  name: string;
  size: string;
  category: string;
  condition: string;
  price: number;
  status: 'Available Now' | 'Reserved' | 'Dropping Soon' | 'Exclusive';
  shortDesc: string;
  colorScheme: 'plum' | 'teal' | 'pink';
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
