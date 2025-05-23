
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Product } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToFavorites, removeFromFavorites, isFavorite, downloadImage } = useFavorites();
  const isProductFavorite = isFavorite(product.id);
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    downloadImage(product);
  };

  // Color array for product backgrounds
  const bgColors = [
    "bg-pink-50", "bg-blue-50", "bg-purple-50", "bg-green-50", 
    "bg-yellow-50", "bg-orange-50", "bg-teal-50", "bg-indigo-50"
  ];
  
  // Select a background color based on product ID
  const bgColor = bgColors[product.id % bgColors.length];

  return (
    <div 
      className="product-card opacity-0 animate-fade-up group" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/product/${product.id}`}>
        <div className={`relative overflow-hidden rounded-lg mb-3 ${bgColor} transition-all duration-300 hover:shadow-lg`}>
          <div className="product-image-container aspect-[3/4]">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          </div>
          
          <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant={isProductFavorite ? "default" : "outline"}
              className={`h-8 w-8 rounded-full ${isProductFavorite ? 'text-white bg-primary hover:bg-primary/90' : 'bg-white text-primary hover:bg-white'}`}
              onClick={handleFavoriteToggle}
            >
              <Heart className="h-4 w-4" fill={isProductFavorite ? "currentColor" : "none"} />
            </Button>
            
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full bg-white text-primary hover:bg-white"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <h3 className="font-medium text-sm truncate">{product.name}</h3>
        <p className="text-sm font-medium mt-1">₹{product.price.toLocaleString()}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
