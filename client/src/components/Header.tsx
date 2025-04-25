import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '@/lib/redux/slices/cartSlice';
import { RootState } from '@/lib/redux/store';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleCartClick = () => {
    dispatch(toggleCart());
  };
  
  const isActiveLink = (path: string) => {
    return location === path;
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="text-xl font-bold text-gray-800">Refabry</span>
            </a>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <a className={`font-medium ${isActiveLink('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Home
            </a>
          </Link>
          <Link href="/products">
            <a className={`font-medium ${isActiveLink('/products') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Products
            </a>
          </Link>
          <Link href="/categories">
            <a className={`font-medium ${isActiveLink('/categories') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Categories
            </a>
          </Link>
          <Link href="/about">
            <a className={`font-medium ${isActiveLink('/about') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              About
            </a>
          </Link>
          <Link href="/contact">
            <a className={`font-medium ${isActiveLink('/contact') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Contact
            </a>
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
        
        {/* Cart and User */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={handleCartClick}
              className="text-gray-600 hover:text-primary focus:outline-none"
              aria-label="Shopping cart"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
          <button className="text-gray-600 hover:text-primary" aria-label="User account">
            <i className="fas fa-user-circle text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2">
          <nav className="flex flex-col space-y-3 py-3">
            <Link href="/">
              <a className={`py-2 font-medium ${isActiveLink('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Home
              </a>
            </Link>
            <Link href="/products">
              <a className={`py-2 font-medium ${isActiveLink('/products') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Products
              </a>
            </Link>
            <Link href="/categories">
              <a className={`py-2 font-medium ${isActiveLink('/categories') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Categories
              </a>
            </Link>
            <Link href="/about">
              <a className={`py-2 font-medium ${isActiveLink('/about') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                About
              </a>
            </Link>
            <Link href="/contact">
              <a className={`py-2 font-medium ${isActiveLink('/contact') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Contact
              </a>
            </Link>
            <div className="flex items-center space-x-4 py-2">
              <div className="relative">
                <button
                  onClick={handleCartClick}
                  className="text-gray-600 focus:outline-none"
                  aria-label="Shopping cart"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              </div>
              <button className="text-gray-600" aria-label="User account">
                <i className="fas fa-user-circle text-xl"></i>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
