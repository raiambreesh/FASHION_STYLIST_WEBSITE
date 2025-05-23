
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ProductCard from './ProductCard';
import { Product } from '@/context/CartContext';

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  limit?: number;
  link?: string;
  linkText?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  subtitle,
  products,
  limit = 8,
  link,
  linkText = "View All"
}) => {
  const displayProducts = products.slice(0, limit);

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          
          {link && (
            <Link to={link}>
              <Button variant="ghost" className="mt-4 sm:mt-0 group">
                {linkText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {link && displayProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
