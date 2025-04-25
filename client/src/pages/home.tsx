import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { fetchProducts } from '@/lib/redux/slices/productSlice';
import ProductFilter from '@/components/ProductFilter';
import ProductGrid from '@/components/ProductGrid';
import MainLayout from '@/components/layouts/MainLayout';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <MainLayout>
      <div id="productsView">
        <ProductFilter productCount={filteredProducts.length} />
        
        <ProductGrid 
          products={filteredProducts} 
          isLoading={loading} 
          error={error} 
        />
        
        {/* Pagination */}
        {filteredProducts.length > 0 && !loading && !error && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
              <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <i className="fas fa-chevron-left text-sm"></i>
              </a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-primary text-white hover:bg-indigo-700">1</a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</a>
              <span className="px-4 py-2 border border-gray-300 bg-white text-gray-700">...</span>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">8</a>
              <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <i className="fas fa-chevron-right text-sm"></i>
              </a>
            </nav>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
