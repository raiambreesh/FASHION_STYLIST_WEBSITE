
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// Step information
enum CheckoutStep {
  CART,
  SHIPPING,
  PAYMENT,
  CONFIRMATION
}

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.CART);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const isShippingFormValid = () => {
    return Object.values(shippingInfo).every(value => value.trim() !== '');
  };
  
  const handleProceedToShipping = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCurrentStep(CheckoutStep.SHIPPING);
  };
  
  const handleProceedToPayment = () => {
    if (!isShippingFormValid()) {
      toast.error('Please fill in all shipping details');
      return;
    }
    setCurrentStep(CheckoutStep.PAYMENT);
  };
  
  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!', {
      description: 'Thank you for your purchase.',
    });
    setCurrentStep(CheckoutStep.CONFIRMATION);
  };
  
  if (currentStep === CheckoutStep.CONFIRMATION) {
    return (
      <div className="page-transition-container">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-transition-container">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-medium mb-8">
          {currentStep === CheckoutStep.CART && 'Shopping Cart'}
          {currentStep === CheckoutStep.SHIPPING && 'Shipping Information'}
          {currentStep === CheckoutStep.PAYMENT && 'Payment Method'}
        </h1>
        
        {/* Progress Indicator */}
        <div className="flex items-center mb-10 max-w-3xl mx-auto">
          <div className={`flex flex-col items-center ${currentStep >= CheckoutStep.CART ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= CheckoutStep.CART ? 'bg-black text-white' : 'bg-gray-200'}`}>
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-sm">Cart</span>
          </div>
          
          <div className={`flex-1 h-0.5 mx-2 ${currentStep >= CheckoutStep.SHIPPING ? 'bg-black' : 'bg-gray-200'}`} />
          
          <div className={`flex flex-col items-center ${currentStep >= CheckoutStep.SHIPPING ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= CheckoutStep.SHIPPING ? 'bg-black text-white' : 'bg-gray-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm">Shipping</span>
          </div>
          
          <div className={`flex-1 h-0.5 mx-2 ${currentStep >= CheckoutStep.PAYMENT ? 'bg-black' : 'bg-gray-200'}`} />
          
          <div className={`flex flex-col items-center ${currentStep >= CheckoutStep.PAYMENT ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= CheckoutStep.PAYMENT ? 'bg-black text-white' : 'bg-gray-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-sm">Payment</span>
          </div>
        </div>
        
        {/* Cart Items Step */}
        {currentStep === CheckoutStep.CART && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 pb-6 border-b">
                      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        
                        <div className="text-sm text-gray-500 mt-1">
                          {item.size && <span className="mr-2">Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            <Button
                              variant="ghost" 
                              size="icon" 
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border rounded">
                  <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
                  <Link to="/">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleProceedToShipping}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Shipping Info Step */}
        {currentStep === CheckoutStep.SHIPPING && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="9876543210"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    placeholder="123 Main St, Apartment 4B"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      placeholder="Mumbai"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input 
                      id="pincode" 
                      name="pincode" 
                      placeholder="400001"
                      value={shippingInfo.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    placeholder="Maharashtra"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(CheckoutStep.CART)}>
                    Back to Cart
                  </Button>
                  <Button onClick={handleProceedToPayment}>
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          Qty: {item.quantity}
                          {item.size && `, Size: ${item.size}`}
                          {item.color && `, Color: ${item.color}`}
                        </div>
                        <div className="text-sm mt-1">₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Payment Step */}
        {currentStep === CheckoutStep.PAYMENT && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-6 max-w-lg">
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-2 border p-4 rounded cursor-pointer data-[state=checked]:border-black">
                      <RadioGroupItem value="card" id="payment-card" />
                      <Label htmlFor="payment-card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-gray-200 rounded" />
                        <div className="w-10 h-6 bg-gray-200 rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-4 rounded cursor-pointer data-[state=checked]:border-black">
                      <RadioGroupItem value="upi" id="payment-upi" />
                      <Label htmlFor="payment-upi" className="flex-1 cursor-pointer">UPI Payment</Label>
                      <div className="w-10 h-6 bg-gray-200 rounded" />
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-4 rounded cursor-pointer data-[state=checked]:border-black">
                      <RadioGroupItem value="netbanking" id="payment-netbanking" />
                      <Label htmlFor="payment-netbanking" className="flex-1 cursor-pointer">Net Banking</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-4 rounded cursor-pointer data-[state=checked]:border-black">
                      <RadioGroupItem value="cod" id="payment-cod" />
                      <Label htmlFor="payment-cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="John Doe" />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="yourname@upi" />
                      <p className="text-xs text-gray-500 mt-1">Enter your UPI ID in the format username@bankname</p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">Select Bank</Label>
                      <select id="bank" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}>
                    Back to Shipping
                  </Button>
                  <Button onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Shipping Address</h3>
                  <div className="text-sm text-gray-600">
                    <p>{shippingInfo.name}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.pincode}</p>
                    <p>Phone: {shippingInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
