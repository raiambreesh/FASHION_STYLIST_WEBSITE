
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { allProducts } from '@/data/products';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from '@/context/CartContext';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Handle search input
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(query.toLowerCase())
    );

    setResults(searchResults.slice(0, 6)); // Limit to 6 results
  }, [query]);

  const handleProductClick = (productId: number) => {
    onClose();
    setQuery('');
    navigate(`/product/${productId}`);
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm animate-fade-in">
      <div className="container max-w-3xl mx-auto px-4 pt-16 sm:pt-20">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-fade-up">
          <div className="p-4 flex items-center border-b border-gray-100">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="Search for products..."
              className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {results.length > 0 && (
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Search Results
              </h3>
              <ul className="space-y-3">
                {results.map(product => (
                  <li 
                    key={product.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {product.category} / {product.subcategory}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found matching your search.</p>
            </div>
          )}

          {!query && (
            <div className="p-8 text-center">
              <p className="text-gray-500">Type something to search for products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
