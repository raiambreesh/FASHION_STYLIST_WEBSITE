
import React from 'react';
import { getFeaturedProducts } from '@/data/products';
import CategorySection from '@/components/CategorySection';

const CollectionsPage = () => {
  const featuredProducts = getFeaturedProducts(50); // Get more products for this page
  
  return (
    <div className="page-transition-container">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Collections
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover our carefully curated collections featuring the best designs from around the world.
          </p>
        </div>
      </div>
      
      <CategorySection 
        title="Featured Collections" 
        products={featuredProducts}
        limit={50} // Show more products
      />
    </div>
  );
};

export default CollectionsPage;
