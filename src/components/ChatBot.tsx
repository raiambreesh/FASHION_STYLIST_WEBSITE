import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Upload, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { allProducts, getProductsByCategory } from '@/data/products';
import { Product } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: Product[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: "Hello! I'm your MODERNHUB fashion assistant. How can I help you today? You can ask about products, styles, or upload an image for recommendations.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (chatContainerRef.current) {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * 0.7;
        chatContainerRef.current.style.maxHeight = `${maxHeight}px`; // Corrected here
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const generateResponse = (userMessage: string): Message => {
    const lower = userMessage.toLowerCase();
    if (lower.includes('men')) {
      const menProducts = getProductsByCategory('men').slice(0, 4);
      return {
        id: Date.now().toString(),
        text: "Here are some men's fashion items you might like:",
        sender: 'bot',
        timestamp: new Date(),
        products: menProducts
      };
    } else if (lower.includes('women')) {
      const womenProducts = getProductsByCategory('women').slice(0, 4);
      return {
        id: Date.now().toString(),
        text: "Here are some women's fashion items you might like:",
        sender: 'bot',
        timestamp: new Date(),
        products: womenProducts
      };
    } else if (lower.includes('kids') || lower.includes('children')) {
      const kidsProducts = getProductsByCategory('kids').slice(0, 4);
      return {
        id: Date.now().toString(),
        text: "Here are some kids' fashion items you might like:",
        sender: 'bot',
        timestamp: new Date(),
        products: kidsProducts
      };
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return {
        id: Date.now().toString(),
        text: "Hello! How can I help you with your fashion needs today?",
        sender: 'bot',
        timestamp: new Date()
      };
    } else if (lower.includes('help')) {
      return {
        id: Date.now().toString(),
        text: "I can help you find clothing items, recommend styles, answer questions about our products, or even suggest items based on images you upload. What are you looking for today?",
        sender: 'bot',
        timestamp: new Date()
      };
    } else if (lower.includes('recommend') || lower.includes('suggest')) {
      const randomProducts = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 4);
      return {
        id: Date.now().toString(),
        text: "Based on current trends, here are some recommendations for you:",
        sender: 'bot',
        timestamp: new Date(),
        products: randomProducts
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "I'm here to help with your fashion needs. You can ask about specific categories like 'men's clothing', 'women's dresses', or 'kids' shoes'. You can also upload an image for style suggestions.",
        sender: 'bot',
        timestamp: new Date()
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !fileUpload) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: fileUpload ? `[Image Upload: ${fileUpload.name}] ${inputMessage}` : inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setFileUpload(null);

    setTimeout(() => {
      const botResponse = generateResponse(userMessage.text);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileUpload(file);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      text: "Hello! I'm your MODERNHUB fashion assistant. How can I help you today? You can ask about products, styles, or upload an image for recommendations.",
      sender: 'bot',
      timestamp: new Date()
    }]);
    setFileUpload(null);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1], boxShadow: isOpen ? '0 0 0 0' : '0 0 0 10px rgba(168, 85, 247, 0.5)' }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] max-h-[70vh] bg-white rounded-xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <div className="bg-white flex items-center justify-center w-full h-full text-purple-600 font-bold">M</div>
                </Avatar>
                <div>
                  <h3 className="font-medium">MODERNHUB Assistant</h3>
                  <p className="text-xs text-white/80">Fashion Expert</p>
                </div>
              </div>
              {messages.length > 1 && (
                <Button variant="ghost" size="icon" onClick={handleClearChat}>
                  <Trash2 className="h-5 w-5 text-white" />
                </Button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.products && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {message.products.map(product => (
                          <Link key={product.id} to={`/product/${product.id}`} onClick={() => setIsOpen(false)}>
                            <Card className="overflow-hidden hover:shadow-md transition-shadow">
                              <div className="aspect-square overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-2">
                                <p className="text-xs font-medium truncate text-black">{product.name}</p>
                                <p className="text-xs text-black/70">₹{product.price.toLocaleString()}</p>
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
                    <span className="block text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {fileUpload && (
              <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <Upload className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="text-sm truncate">{fileUpload.name}</div>
                </div>
              </div>
            )}

            <div className="p-4 border-t flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
