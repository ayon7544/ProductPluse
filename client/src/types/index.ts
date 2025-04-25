export interface Product {
  id: number;
  name: string;
  price: number;
  sell_price?: number;
  description?: string;
  short_description?: string;
  img: string;
  category?: string;
  stock_status?: string;
  is_featured?: boolean;
  discount_percentage?: number;
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export type SortOption = 'latest' | 'price_low' | 'price_high' | 'popularity';

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
