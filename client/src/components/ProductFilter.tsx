import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortOption } from '@/lib/redux/slices/productSlice';
import { RootState } from '@/lib/redux/store';
import { SortOption } from '@/types';

interface ProductFilterProps {
  productCount: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ productCount }) => {
  const dispatch = useDispatch();
  const { searchQuery, sortOption } = useSelector((state: RootState) => state.products);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  // Update local search query when redux state changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);
  
  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        dispatch(setSearchQuery(localSearchQuery));
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, dispatch, searchQuery]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value as SortOption));
  };
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">All Products</h1>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-gray-600">
          Showing <span id="productCount">{productCount}</span> products
        </p>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={localSearchQuery}
              onChange={handleSearchChange}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
