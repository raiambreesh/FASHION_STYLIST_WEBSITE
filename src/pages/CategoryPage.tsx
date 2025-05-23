
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory, getProductsBySubcategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CategoryPageProps {
  defaultCategory?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ defaultCategory }) => {
  const navigate = useNavigate();
  const { category: urlCategory } = useParams<{ category: string }>();
  const category = urlCategory || defaultCategory || '';
  
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [products, setProducts] = useState(getProductsByCategory(category));
  
  // Redirect if invalid category
  useEffect(() => {
    const validCategories = ['men', 'women', 'kids'];
    if (category && !validCategories.includes(category)) {
      navigate('/');
    }
  }, [category, navigate]);
  
  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategory(null);
    setProducts(getProductsByCategory(category));
  }, [category]);
  
  // Filter products when subcategory changes
  const handleSubcategoryChange = (subcategory: string) => {
    if (activeSubcategory === subcategory) {
      setActiveSubcategory(null);
      setProducts(getProductsByCategory(category));
    } else {
      setActiveSubcategory(subcategory);
      setProducts(getProductsBySubcategory(category, subcategory));
    }
  };
  
  // Generate subcategories based on product data
  const subcategories = [...new Set(
    getProductsByCategory(category).map(product => product.subcategory)
  )];
  
  // Format text for display
  const formatText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="page-transition-container min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {formatText(category)} Collection
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover our premium selection of {category}'s fashion, designed with quality and style in mind.
          </p>
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
        {/* Subcategory filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {subcategories.map((subcategory) => (
            <Button
              key={subcategory}
              variant={activeSubcategory === subcategory ? "default" : "outline"}
              onClick={() => handleSubcategoryChange(subcategory)}
              className="capitalize"
            >
              {formatText(subcategory)}
            </Button>
          ))}
        </div>
        
        <Separator className="mb-8" />
        
        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
