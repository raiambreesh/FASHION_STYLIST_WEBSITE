
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CategorySection from '@/components/CategorySection';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite, downloadImage } = useFavorites();
  
  const [product, setProduct] = useState(getProductById(parseInt(id || '0')));
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    const fetchedProduct = getProductById(parseInt(id || '0'));
    setProduct(fetchedProduct);
    
    if (fetchedProduct) {
      setRelatedProducts(getRelatedProducts(fetchedProduct));
      setSelectedSize(undefined);
      setSelectedColor(undefined);
      setQuantity(1);
      setActiveImage(0);
    }
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-6">Product not found</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    const requiredSize = product.sizes && product.sizes.length > 0;
    const requiredColor = product.colors && product.colors.length > 0;
    
    if (requiredSize && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (requiredColor && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  return (
    <div className="page-transition-container">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={product.images?.[activeImage] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      activeImage === index ? 'border-black' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
            <p className="text-xl font-medium mb-4">₹{product.price.toLocaleString()}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={isFavorite(product.id) ? 'bg-black text-white hover:bg-black/90' : ''}
                  onClick={toggleFavorite}
                >
                  <Heart className="h-4 w-4" fill={isFavorite(product.id) ? "white" : "none"} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => downloadImage(product)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-gray-500 capitalize">
                Category: <Link to={`/${product.category}`} className="hover:underline">{product.category}</Link>
              </div>
            </div>
            
            <Tabs defaultValue="details" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-4">
                {product.description && (
                  <p className="text-gray-600 mb-4">{product.description}</p>
                )}
                
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Size</h3>
                    <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                          <Label
                            htmlFor={`size-${size}`}
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 cursor-pointer peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white peer-data-[state=checked]:border-black"
                          >
                            {size}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Color</h3>
                    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                          <Label
                            htmlFor={`color-${color}`}
                            className="flex px-3 h-10 items-center justify-center rounded-md border border-gray-200 cursor-pointer peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white peer-data-[state=checked]:border-black"
                          >
                            {color}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                
                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <div className="w-12 h-10 flex items-center justify-center border-y border-gray-200">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </TabsContent>
              
              <TabsContent value="description" className="pt-4">
                <p className="text-gray-600">
                  {product.description || "No detailed description available for this product."}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Separator className="mb-16" />
        
        {/* Related Products Section */}
        <CategorySection 
          title="You May Also Like" 
          products={relatedProducts} 
          limit={4}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
