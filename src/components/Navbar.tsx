
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import MobileMenu from './MobileMenu';
import SearchDialog from './SearchDialog';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-sm' 
            : 'bg-white/0'
        }`}
      >
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <Link 
                to="/" 
                className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
              >
                MODERNHUB
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/men" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/men') ? 'text-primary' : 'text-black/70'
                }`}
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/women') ? 'text-primary' : 'text-black/70'
                }`}
              >
                Women
              </Link>
              <Link 
                to="/kids" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/kids') ? 'text-primary' : 'text-black/70'
                }`}
              >
                Kids
              </Link>
              <Link 
                to="/new-arrivals" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/new-arrivals') ? 'text-primary' : 'text-black/70'
                }`}
              >
                New Arrivals
              </Link>
              <Link 
                to="/collections" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/collections') ? 'text-primary' : 'text-black/70'
                }`}
              >
                Collections
              </Link>
            </nav>

            <div className="flex items-center space-x-1 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              
              <Link to="/favorites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Heart className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative"
                >
                  <ShoppingBag className="h-[1.2rem] w-[1.2rem]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium h-5 w-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <User className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
