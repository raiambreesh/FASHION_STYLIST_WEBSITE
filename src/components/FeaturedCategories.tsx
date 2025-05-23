
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/men',
    bgColor: 'from-blue-500/80 to-blue-700/80'
  },
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/women',
    bgColor: 'from-pink-500/80 to-purple-600/80'
  },
  {
    id: 'kids',
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=972&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/kids',
    bgColor: 'from-green-500/80 to-teal-600/80'
  }
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-center">Shop By Category</h2>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={category.link}
              className="group relative rounded-lg overflow-hidden bg-gray-200 aspect-[3/4] opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{category.name}</h3>
                <span className="inline-block text-white/90 text-sm py-1 transition-all duration-300 group-hover:translate-x-2">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
