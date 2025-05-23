import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Assuming you have a Product type defined elsewhere
// Example:
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   // any other fields relevant to your product
// }

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  downloadImage: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Add product to favorites
  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(item => item.id === product.id)) {
        return prevFavorites; // Don't add if already in favorites
      }
      toast.success('Added to favorites', {
        description: `${product.name} added to your favorites`,
      });
      return [...prevFavorites, product];
    });
  };

  // Remove product from favorites
  const removeFromFavorites = (productId: number) => {
    setFavorites(prevFavorites => {
      const removedItem = prevFavorites.find(item => item.id === productId);
      if (removedItem) {
        toast.info('Removed from favorites', {
          description: `${removedItem.name} removed from your favorites`,
        });
      }
      return prevFavorites.filter(item => item.id !== productId);
    });
  };

  // Check if product is a favorite
  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  // Download image
  const downloadImage = (product: Product) => {
    const link = document.createElement('a');
    const imageUrl = product.image;
    link.href = imageUrl;
    link.download = `${product.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Image downloaded', {
      description: `${product.name} image saved to your device`,
    });
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      downloadImage
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
