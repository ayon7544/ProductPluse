import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="text-xl font-bold">Refabry</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for high-quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-400 hover:text-white">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-white">Blog</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account">
                  <a className="text-gray-400 hover:text-white">My Account</a>
                </Link>
              </li>
              <li>
                <Link href="/track-order">
                  <a className="text-gray-400 hover:text-white">Track Your Order</a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="text-gray-400 hover:text-white">Shipping Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="text-gray-400 hover:text-white">Returns & Exchanges</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-gray-400 hover:text-white">FAQs</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1 text-gray-400"></i>
                <span className="text-gray-400">123 Main Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone-alt text-gray-400"></i>
                <span className="text-gray-400">+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope text-gray-400"></i>
                <span className="text-gray-400">info@refabry.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary flex-grow"
                />
                <button className="bg-primary hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors" aria-label="Subscribe">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Refabry. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/privacy">
                <a className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              </Link>
              <div className="flex items-center space-x-2 ml-4">
                <svg className="h-6 w-auto" viewBox="0 0 40 25" fill="currentColor">
                  <rect width="40" height="25" rx="3" fill="#3C53AC" />
                  <path d="M15 17h10M10 8h10M12 12h16" stroke="white" strokeWidth="2" />
                </svg>
                <svg className="h-6 w-auto" viewBox="0 0 40 25" fill="currentColor">
                  <rect width="40" height="25" rx="3" fill="#EB4B39" />
                  <circle cx="15" cy="12" r="5" fill="#FFCC00" />
                  <circle cx="25" cy="12" r="5" fill="#FFCC00" />
                </svg>
                <svg className="h-6 w-auto" viewBox="0 0 40 25" fill="currentColor">
                  <rect width="40" height="25" rx="3" fill="#0F72B5" />
                  <path d="M20 5v15M10 12h20" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
