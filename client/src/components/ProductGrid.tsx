import React from 'react';
import ProductCard from '@/components/ui/product-card';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 inline-flex items-center">
          <i className="fas fa-exclamation-circle text-2xl mr-3"></i>
          <span>Unable to load products: {error}</span>
        </div>
        <button 
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gray-100 text-gray-700 p-4 rounded-lg mb-4 inline-flex items-center">
          <i className="fas fa-search text-2xl mr-3"></i>
          <span>No products found matching your criteria.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
