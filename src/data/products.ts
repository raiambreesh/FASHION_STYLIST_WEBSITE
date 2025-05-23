
import { Product } from '../context/CartContext';

// Helper function to generate a large number of products
const generateProducts = (
  baseProducts: Product[], 
  multiplier: number,
  categoryFilter?: string
): Product[] => {
  const filtered = categoryFilter 
    ? baseProducts.filter(p => p.category === categoryFilter)
    : baseProducts;
    
  return Array(multiplier)
    .fill(null)
    .flatMap((_, i) => 
      filtered.map((product, j) => ({
        ...product,
        id: product.id + (i * filtered.length) + j,
        name: `${product.name} ${i > 0 ? `- Style ${i + 1}` : ''}`,
      }))
    );
};

// Base products
const baseProducts: Product[] = [
  {
    id: 1,
    name: "Slim Fit Cotton Shirt",
    price: 2499,
    category: "men",
    subcategory: "topwear",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A premium slim-fit cotton shirt that offers both comfort and style. Perfect for formal occasions or business meetings.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Black"]
  },
  {
    id: 2,
    name: "Classic Denim Jeans",
    price: 3499,
    category: "men",
    subcategory: "bottomwear",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Classic denim jeans featuring a comfortable fit and durable material. A wardrobe essential for every man.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black", "Grey"]
  },
  {
    id: 3,
    name: "Leather Oxford Shoes",
    price: 5999,
    category: "men",
    subcategory: "footwear",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1614252369475-531eba7d9bud?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Premium leather oxford shoes crafted with attention to detail. Perfect for formal events and business settings.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    colors: ["Brown", "Black"]
  },
  {
    id: 4,
    name: "Minimalist Watch",
    price: 4999,
    category: "men",
    subcategory: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A sleek minimalist watch with a leather strap. Adds a touch of sophistication to any outfit.",
    sizes: ["One Size"],
    colors: ["Black", "Brown"]
  },
  {
    id: 5,
    name: "Floral Print Dress",
    price: 3999,
    category: "women",
    subcategory: "dresses",
    image: "https://images.unsplash.com/photo-1568252542512-9fe8fe4c50a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1568252542512-9fe8fe4c50a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A beautiful floral print dress made from lightweight fabric. Perfect for summer days and special occasions.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Pink", "Yellow"]
  },
  {
    id: 6,
    name: "High-Waisted Jeans",
    price: 2999,
    category: "women",
    subcategory: "bottomwear",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1548615661-4f21765d8d7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1605503062071-d29f73bc5166?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Stylish high-waisted jeans that offer both comfort and a flattering fit. A versatile addition to any wardrobe.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Blue", "Black", "Light Wash"]
  },
  {
    id: 7,
    name: "Elegant Heels",
    price: 4499,
    category: "women",
    subcategory: "footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1581101767113-7b8d98b906d1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Elegant heels designed for both style and comfort. Perfect for formal events or adding sophistication to any outfit.",
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6"],
    colors: ["Black", "Red", "Nude"]
  },
  {
    id: 8,
    name: "Statement Earrings",
    price: 1499,
    category: "women",
    subcategory: "accessories",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Eye-catching statement earrings that add a touch of glamour to any outfit. Perfect for elevating your style.",
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"]
  },
  {
    id: 9,
    name: "Dinosaur Print T-Shirt",
    price: 899,
    category: "kids",
    subcategory: "topwear",
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Fun dinosaur print t-shirt made from soft cotton. Perfect for your little one's everyday adventures.",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Blue", "Green", "Red"]
  },
  {
    id: 10,
    name: "Comfortable Joggers",
    price: 1299,
    category: "kids",
    subcategory: "bottomwear",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1565084882333-62466b929d52?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Comfortable joggers with an elastic waistband. Ideal for active kids who love to play and explore.",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Grey", "Navy", "Black"]
  },
  {
    id: 11,
    name: "Kids Sneakers",
    price: 1799,
    category: "kids",
    subcategory: "footwear",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549298916-b21f9d981c78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Comfortable and stylish sneakers for kids. Designed with both fashion and functionality in mind.",
    sizes: ["UK 10K", "UK 11K", "UK 12K", "UK 13K"],
    colors: ["Blue", "Pink", "White"]
  },
  {
    id: 12,
    name: "Colorful Backpack",
    price: 1499,
    category: "kids",
    subcategory: "accessories",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1588625500630-9b1b3433c3d1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A colorful backpack with multiple compartments. Perfect for school days or weekend adventures.",
    sizes: ["One Size"],
    colors: ["Blue", "Pink", "Yellow"]
  },
  // Additional products for men
  {
    id: 101,
    name: "Casual Polo Shirt",
    price: 1999,
    category: "men",
    subcategory: "topwear",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589902860314-e910697dea18?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A comfortable casual polo shirt perfect for everyday wear. Made from breathable cotton fabric.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "White", "Red"]
  },
  {
    id: 102,
    name: "Formal Blazer",
    price: 6999,
    category: "men",
    subcategory: "topwear",
    image: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598808503479-76b37714216a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A sophisticated formal blazer crafted from premium materials. Essential for business and formal events.",
    sizes: ["38", "40", "42", "44"],
    colors: ["Navy", "Black", "Grey"]
  },
  {
    id: 103,
    name: "Chino Pants",
    price: 2499,
    category: "men",
    subcategory: "bottomwear",
    image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1510298899979-a2a93b864cd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Versatile chino pants that transition seamlessly from casual to semi-formal settings.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Beige", "Navy", "Olive", "Grey"]
  },
  // Additional products for women
  {
    id: 201,
    name: "Elegant Blouse",
    price: 2799,
    category: "women",
    subcategory: "topwear",
    image: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600574691453-499962cc0611?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "An elegant blouse with delicate details. Perfect for both office wear and evening outings.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Blue", "Pink"]
  },
  {
    id: 202,
    name: "Pleated Skirt",
    price: 2299,
    category: "women",
    subcategory: "bottomwear",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A stylish pleated skirt that adds a touch of elegance to your wardrobe. Versatile and comfortable.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Beige", "Plaid"]
  },
  // Additional products for kids
  {
    id: 301,
    name: "Cartoon Character T-Shirt",
    price: 999,
    category: "kids",
    subcategory: "topwear",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "A fun t-shirt featuring popular cartoon characters. Made from soft cotton for maximum comfort.",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Blue", "Red", "Yellow", "Green"]
  },
  {
    id: 302,
    name: "Denim Dungarees",
    price: 1599,
    category: "kids",
    subcategory: "bottomwear",
    image: "https://images.unsplash.com/photo-1541580621-cb65cc53084b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1541580621-cb65cc53084b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502451885777-16c98b07834a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description: "Adorable denim dungarees for kids. Durable, comfortable, and perfect for playtime.",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Blue", "Light Blue"]
  }
];

// Generate more products for each category (at least 50 per category)
export const menProducts = generateProducts(baseProducts, 13, "men");
export const womenProducts = generateProducts(baseProducts, 13, "women");
export const kidsProducts = generateProducts(baseProducts, 13, "kids");

// Combine all products
export const allProducts = [...menProducts, ...womenProducts, ...kidsProducts];

// Get products by category and subcategory
export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category);
};

export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return allProducts.filter(
    product => product.category === category && product.subcategory === subcategory
  );
};

// Get product by ID
export const getProductById = (id: number): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

// Get related products
export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return allProducts
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.subcategory === product.subcategory)
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

// Get featured products
export const getFeaturedProducts = (limit = 8): Product[] => {
  return allProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

// Get new arrivals
export const getNewArrivals = (limit = 8): Product[] => {
  return [...allProducts]
    .sort((a, b) => b.id - a.id)
    .slice(0, limit);
};
