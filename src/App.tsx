import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import AccountPage from "./pages/AccountPage";
import CollectionsPage from "./pages/CollectionsPage";
import ContactPage from "./pages/ContactPage"; // ✅ Import your new Contact Page

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/men" element={<CategoryPage defaultCategory="men" />} />
                <Route path="/women" element={<CategoryPage defaultCategory="women" />} />
                <Route path="/kids" element={<CategoryPage defaultCategory="kids" />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/contact" element={<ContactPage />} /> {/* ✅ New Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
            <Toaster />
            <Sonner position="top-right" />
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
