import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, downloadImage } = useFavorites();
  const { addToCart } = useCart();

  const handleDownloadAll = () => {
    favorites.forEach((product) => {
      downloadImage(product);
    });
  };

  const handleAddAllToCart = () => {
    favorites.forEach((product) => {
      addToCart(product);
    });
  };

  return (
    <div className="page-transition-container">
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium text-center mb-6">
            Your Favorites
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Items you've saved for later. Add them to your cart or download images.
          </p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-10">
        {favorites.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  // You can optionally add remove from favorites functionality here
                />
              ))}
            </div>

            <div className="mt-12 border-t pt-6">
              <h2 className="text-xl font-medium mb-4">Quick Actions</h2>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="group"
                  onClick={handleDownloadAll}
                >
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download All Images
                </Button>

                <Button
                  variant="outline"
                  className="group"
                  onClick={handleAddAllToCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Add All to Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Add products to your favorites by clicking the heart icon on any
              product.
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
