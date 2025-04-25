import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, SortOption, ApiResponse } from '@/types';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortOption: SortOption;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
  searchQuery: '',
  sortOption: 'latest',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://admin.refabry.com/api/all/product/get'
      );
      
      // The API returns a nested structure with data.data array
      if (response.data?.status && response.data?.data?.data) {
        // Map the API response to our Product interface
        const products = response.data.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          sell_price: item.discount_amount ? (item.price - parseInt(item.discount_amount)) : undefined,
          description: item.short_desc,
          short_description: item.short_desc,
          img: item.image,
          category: item.category?.name,
          stock_status: item.stock > 0 ? 'In Stock' : 'Out of Stock',
          is_featured: item.is_published === 1,
          discount_percentage: item.discount_amount ? Math.round((parseInt(item.discount_amount) / item.price) * 100) : undefined,
          colors: [],
          sizes: [],
          tags: [],
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        return products;
      }
      
      return [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      // First check if the product is already in state
      const state = getState() as { products: ProductState };
      const existingProduct = state.products.products.find(
        (p) => p.id.toString() === id
      );
      
      if (existingProduct) {
        return existingProduct;
      }
      
      // If not found in state, fetch it from the API
      const response = await axios.get(
        'https://admin.refabry.com/api/all/product/get'
      );
      
      // The API returns a nested structure with data.data array
      if (response.data?.status && response.data?.data?.data) {
        // Map the API response to our Product interface
        const products = response.data.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          sell_price: item.discount_amount ? (item.price - parseInt(item.discount_amount)) : undefined,
          description: item.short_desc,
          short_description: item.short_desc,
          img: item.image,
          category: item.category?.name,
          stock_status: item.stock > 0 ? 'In Stock' : 'Out of Stock',
          is_featured: item.is_published === 1,
          discount_percentage: item.discount_amount ? Math.round((parseInt(item.discount_amount) / item.price) * 100) : undefined,
          colors: [],
          sizes: [],
          tags: [],
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        const product = products.find((p: Product) => p.id.toString() === id);
        
        if (!product) {
          return rejectWithValue('Product not found');
        }
        
        return product;
      }
      
      return rejectWithValue('Product not found');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        action.payload,
        state.sortOption
      );
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        state.searchQuery,
        action.payload
      );
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = filterAndSortProducts(
          action.payload,
          state.searchQuery,
          state.sortOption
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to filter and sort products
const filterAndSortProducts = (
  products: Product[],
  searchQuery: string,
  sortOption: SortOption
): Product[] => {
  // First filter products by search query
  let filtered = products;
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.short_description && product.short_description.toLowerCase().includes(query))
    );
  }

  // Then sort the filtered products
  return [...filtered].sort((a, b) => {
    switch (sortOption) {
      case 'price_low':
        return (a.sell_price || a.price) - (b.sell_price || b.price);
      case 'price_high':
        return (b.sell_price || b.price) - (a.sell_price || a.price);
      case 'popularity':
        // If there's a popularity metric, sort by it (for now, use id as placeholder)
        return b.id - a.id;
      case 'latest':
      default:
        // Sort by newest (assuming higher ID means more recent)
        return b.id - a.id;
    }
  });
};

export const { setSearchQuery, setSortOption, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
