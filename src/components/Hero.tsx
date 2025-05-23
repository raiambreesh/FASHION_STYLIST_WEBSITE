
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-32">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50" />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="max-w-lg mx-auto md:mx-0 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Elevate Your <br className="hidden md:block" />
              <span className="text-balance text-primary">Style Experience</span>
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Discover curated collections that blend timeless elegance with contemporary design. Every piece tells a story of craftsmanship and attention to detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Link to="/new-arrivals">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Collection
                </Button>
              </Link>
              
              <Link to="/men">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Shop Men
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] opacity-0 animate-blur-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute top-0 right-0 w-[85%] h-[85%] z-10">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Fashion model"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-[60%] h-[65%] bg-primary/10 rounded-lg overflow-hidden z-0">
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Fashion details"
                className="w-full h-full object-cover rounded-lg opacity-90"
              />
            </div>
            
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg z-20 text-sm font-medium">
              New Season Collection
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
