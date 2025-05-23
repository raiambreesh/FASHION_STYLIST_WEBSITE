
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  colors?: string[];
}

interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage and update totals
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCartItems(prevItems => {
      // Check if product is already in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
                item.size === size && 
                item.color === color
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Cart updated', {
          description: `${product.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        return updatedItems;
      } else {
        // Add new item
        toast.success('Added to cart', {
          description: `${product.name} added to your cart`,
        });
        return [...prevItems, { ...product, quantity, size, color }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === productId);
      if (removedItem) {
        toast.info('Removed from cart', {
          description: `${removedItem.name} removed from your cart`,
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared', {
      description: 'All items have been removed from your cart',
    });
  };

  const increaseQuantity = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => !(item.id === productId && item.quantity === 1))
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
