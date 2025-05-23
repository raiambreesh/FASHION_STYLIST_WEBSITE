
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import CategorySection from '@/components/CategorySection';
import Newsletter from '@/components/Newsletter';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="page-transition-container">
      <Hero />
      <FeaturedCategories />
      
      <CategorySection 
        title="New Arrivals" 
        subtitle="Discover our latest additions"
        products={newArrivals}
        link="/new-arrivals"
      />
      
      <CategorySection 
        title="Featured Products" 
        subtitle="Handpicked selections for you"
        products={featuredProducts}
        link="/collections"
      />
      
      <Newsletter />
    </div>
  );
};

export default Index;
