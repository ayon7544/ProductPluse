import React from 'react';
import { Link } from 'wouter';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage, truncateText } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/redux/slices/cartSlice';

// Define a temporary getImageUrl function until the import issue is fixed
const getImageUrl = (imagePath: string): string => {
  // If the image path already starts with http, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, prepend the base URL
  return `https://admin.refabry.com/storage/product/${imagePath}`;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  
  const hasDiscount = product.sell_price && product.sell_price < product.price;
  const displayPrice = product.sell_price || product.price;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );
  };
  
  return (
    <Link href={`/product/${product.id}`}>
      <a className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 block">
        <div className="relative pb-[100%] overflow-hidden bg-gray-100">
          <img 
            src={getImageUrl(product.img)} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.is_featured && (
            <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {hasDiscount && product.sell_price && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {getDiscountPercentage(product.price, product.sell_price)}% Off
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-gray-800 font-semibold text-lg mb-1 truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-1">
            {product.short_description ? truncateText(product.short_description, 60) : ''}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary font-bold">{formatPrice(displayPrice)}</span>
              {hasDiscount && (
                <span className="text-gray-400 text-sm line-through ml-1">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <button 
              className="bg-primary text-white rounded-full h-9 w-9 flex items-center justify-center hover:bg-indigo-700 transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <i className="fas fa-shopping-cart text-sm"></i>
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
