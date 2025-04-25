import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { Product } from '@/types';
import { formatPrice, getImageUrl } from '@/lib/utils';
import { Link } from 'wouter';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(product.img);
  
  const dispatch = useDispatch();
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };
  
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
  };
  
  // Generate thumbnail images (for demo, we'll use the same image with different suffixes)
  const thumbnails = [
    product.img,
    `${product.img}_alt1`,
    `${product.img}_alt2`,
    `${product.img}_alt3`,
  ];
  
  return (
    <div>
      <div className="mb-6">
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:text-indigo-700">
            <i className="fas fa-arrow-left mr-2"></i> Back to Products
          </a>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={getImageUrl(activeImage)} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map((thumb, index) => (
              <div 
                key={index}
                className={`bg-gray-100 rounded-lg overflow-hidden cursor-pointer ${
                  thumb === activeImage ? 'border-2 border-primary' : ''
                }`}
                onClick={() => setActiveImage(thumb)}
              >
                <img 
                  src={getImageUrl(thumb)} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-auto object-cover aspect-square" 
                  onError={(e) => {
                    // If image fails to load, use the main product image
                    (e.target as HTMLImageElement).src = getImageUrl(product.img);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="text-gray-600 text-sm">(24 reviews)</span>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.sell_price || product.price)}
              </span>
              {product.sell_price && product.sell_price < product.price && (
                <span className="text-gray-500 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-6">
              {product.description || product.short_description || 'No description available.'}
            </p>
            
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'border-primary bg-primary bg-opacity-10 text-primary'
                          : 'border-gray-300 text-gray-700 hover:border-primary'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                      aria-pressed={selectedColor === color}
                    >
                      {selectedColor === color && (
                        <span className="ring-2 ring-offset-2 ring-white h-full w-full block rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-2 text-gray-600 hover:text-primary"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  min="1" 
                  className="w-12 text-center border-0 focus:ring-0 focus:outline-none"
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                />
                <button 
                  className="px-3 py-2 text-gray-600 hover:text-primary"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <button 
                className="flex-grow px-6 py-3 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </button>
              <button 
                className="px-3 py-3 border border-gray-300 rounded-md text-gray-600 hover:text-primary hover:border-primary"
                aria-label="Add to wishlist"
              >
                <i className="far fa-heart"></i>
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <i className="fas fa-truck text-primary"></i>
                  <span className="text-gray-600 text-sm">Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-undo text-primary"></i>
                  <span className="text-gray-600 text-sm">30-day returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-shield-alt text-primary"></i>
                  <span className="text-gray-600 text-sm">Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12 mb-16">
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap -mb-px">
            <button 
              className={`inline-block py-4 px-4 text-sm font-medium text-center border-b-2 ${
                activeTab === 'description' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`inline-block py-4 px-4 text-sm font-medium text-center border-b-2 ${
                activeTab === 'specifications' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`inline-block py-4 px-4 text-sm font-medium text-center border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (24)
            </button>
          </div>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description || 'No detailed description available for this product.'}</p>
              
              {/* Default content if no description is available */}
              {!product.description && (
                <>
                  <p>This premium quality product is designed to provide both comfort and style. Crafted from high-quality materials, it offers durability and a refined finish.</p>
                  
                  <h3>Key Features:</h3>
                  <ul>
                    <li>Made from high-quality materials</li>
                    <li>Designed for comfort and durability</li>
                    <li>Classic styling that works for any occasion</li>
                    <li>Easy to care for and maintain</li>
                  </ul>
                  
                  <p>Whether you're looking for everyday use or a special occasion, this product will exceed your expectations in quality and style.</p>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="prose max-w-none">
              <h3>Product Specifications</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">Product ID</td>
                    <td className="px-4 py-3">{product.id}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">Category</td>
                    <td className="px-4 py-3">{product.category || 'General'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">Stock Status</td>
                    <td className="px-4 py-3">{product.stock_status || 'In Stock'}</td>
                  </tr>
                  {product.sizes && (
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">Available Sizes</td>
                      <td className="px-4 py-3">{product.sizes.join(', ')}</td>
                    </tr>
                  )}
                  {product.colors && (
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-700 bg-gray-50">Available Colors</td>
                      <td className="px-4 py-3">{product.colors.join(', ')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="prose max-w-none">
              <h3>Customer Reviews</h3>
              <p>Customer reviews will be displayed here.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg my-4">
                <p className="italic text-gray-600">
                  "Great product, exactly as described! The quality exceeded my expectations."
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">- Sarah J.</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg my-4">
                <p className="italic text-gray-600">
                  "Good value for money. Would recommend to others!"
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">- Michael T.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <a className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                    <img 
                      src={getImageUrl(relatedProduct.img)} 
                      alt={relatedProduct.name} 
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold text-lg mb-1 truncate">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-primary font-bold">
                          {formatPrice(relatedProduct.sell_price || relatedProduct.price)}
                        </span>
                        {relatedProduct.sell_price && relatedProduct.sell_price < relatedProduct.price && (
                          <span className="text-gray-400 text-sm line-through ml-1">
                            {formatPrice(relatedProduct.price)}
                          </span>
                        )}
                      </div>
                      <button 
                        className="bg-primary text-white rounded-full h-9 w-9 flex items-center justify-center hover:bg-indigo-700 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(addToCart({
                            product: relatedProduct,
                            quantity: 1
                          }));
                        }}
                        aria-label="Add to cart"
                      >
                        <i className="fas fa-shopping-cart text-sm"></i>
                      </button>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
