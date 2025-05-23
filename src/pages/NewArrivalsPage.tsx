
import React from 'react';
import { getNewArrivals } from '@/data/products';
import CategorySection from '@/components/CategorySection';

const NewArrivalsPage = () => {
  const newArrivals = getNewArrivals(50); // Get more products for this page
  
  return (
    <div className="page-transition-container">
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium text-center mb-6">
            New Arrivals
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our latest collections and stay ahead of the fashion curve.
          </p>
        </div>
      </div>
      
      <CategorySection 
        title="New Arrivals" 
        products={newArrivals}
        limit={50} // Show more products
      />
    </div>
  );
};

export default NewArrivalsPage;
