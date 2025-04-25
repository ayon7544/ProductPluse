import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'wouter';
import { RootState } from '@/lib/redux/store';
import { fetchProductById, fetchProducts } from '@/lib/redux/slices/productSlice';
import MainLayout from '@/components/layouts/MainLayout';
import ProductDetail from '@/components/ProductDetail';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const { selectedProduct, products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    
    // Fetch all products if we don't have them yet (for related products)
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, id, products.length]);
  
  // Generate related products (exclude current product and limit to 4)
  const relatedProducts = products
    .filter((product) => product.id.toString() !== id)
    .slice(0, 4);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 inline-flex items-center">
            <i className="fas fa-exclamation-circle text-2xl mr-3"></i>
            <span>Unable to load product details: {error}</span>
          </div>
          <button 
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </MainLayout>
    );
  }
  
  if (!selectedProduct) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-4 inline-flex items-center">
            <i className="fas fa-exclamation-triangle text-2xl mr-3"></i>
            <span>Product not found</span>
          </div>
          <a 
            href="/"
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Products
          </a>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <ProductDetail product={selectedProduct} relatedProducts={relatedProducts} />
    </MainLayout>
  );
};

export default ProductDetailPage;
