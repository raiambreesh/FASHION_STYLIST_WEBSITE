
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t border-gray-100">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 mb-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/men" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/kids" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-black transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-600 hover:text-black transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Stay Connected</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <a 
                href="https://www.instagram.com/__modernhub/?next=%2F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61576360102808" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/__modernhub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-medium tracking-tight">MODERNHUB</Link>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MODERNHUB. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
                                                               
 