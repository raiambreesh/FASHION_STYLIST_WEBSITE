
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden animate-fade-in">
      <div className="container px-4 py-4">
        <div className="flex justify-end mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-6">
          <Link 
            to="/" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Home</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/men" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Men</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/women" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Women</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/kids" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Kids</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/new-arrivals" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>New Arrivals</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/favorites" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Favorites</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/cart" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Cart</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <Link 
            to="/account" 
            className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
            onClick={onClose}
          >
            <span>Account</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
