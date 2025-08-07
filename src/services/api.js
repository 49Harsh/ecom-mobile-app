import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cosmetic-related keywords to filter products
const COSMETIC_KEYWORDS = [
  'essence', 'mascara', 'lipstick', 'foundation', 'concealer', 'powder',
  'blush', 'eyeshadow', 'serum', 'moisturizer', 'cream', 'oil', 'lotion',
  'perfume', 'fragrance', 'nail', 'beauty', 'skin', 'face', 'lip',
  'eye', 'makeup', 'cosmetic', 'gloss', 'primer', 'bronzer', 'highlighter'
];

// Enhanced product data for better cosmetic appearance
const enhanceProduct = (product) => {
  const cosmeticDescriptions = {
    'essence': 'A lightweight, hydrating essence that prepares your skin for the next steps in your beauty routine.',
    'mascara': 'Long-lasting mascara that volumizes and lengthens your lashes for a dramatic eye look.',
    'lipstick': 'Creamy, pigmented lipstick that provides full coverage and long-wearing color.',
    'foundation': 'Lightweight foundation that provides buildable coverage for a natural, flawless finish.',
    'concealer': 'Full-coverage concealer that hides imperfections and brightens the under-eye area.',
    'powder': 'Setting powder that locks in your makeup and controls shine all day long.',
    'serum': 'Concentrated serum packed with active ingredients for targeted skin concerns.',
    'moisturizer': 'Hydrating moisturizer that nourishes and protects your skin barrier.',
    'perfume': 'Luxurious fragrance with long-lasting scent and elegant packaging.',
    'cream': 'Rich, nourishing cream that provides intense hydration for dry skin.',
  };

  const productTitle = product.title.toLowerCase();
  let enhancedDescription = product.description;
  
  // Find matching cosmetic keyword and enhance description
  for (const keyword of Object.keys(cosmeticDescriptions)) {
    if (productTitle.includes(keyword)) {
      enhancedDescription = cosmeticDescriptions[keyword];
      break;
    }
  }

  return {
    ...product,
    description: enhancedDescription,
    category: 'Beauty & Cosmetics',
    rating: Math.max(product.rating || 4.2, 4.0), // Ensure good ratings
    reviews: generateMockReviews(product.title),
    highlights: generateProductHighlights(product.title),
  };
};

// Generate mock reviews for products
const generateMockReviews = (productName) => {
  const reviewTemplates = [
    { rating: 5, comment: "Absolutely love this product! Amazing quality and long-lasting.", reviewer: "Sarah M." },
    { rating: 4, comment: "Great value for money. Would definitely recommend!", reviewer: "Jessica L." },
    { rating: 5, comment: "Perfect shade and texture. Exactly what I was looking for.", reviewer: "Emma K." },
    { rating: 4, comment: "Good product, fast shipping. Will order again.", reviewer: "Lisa R." },
  ];
  
  return reviewTemplates.slice(0, Math.floor(Math.random() * 3) + 2);
};

// Generate product highlights
const generateProductHighlights = (productName) => {
  return [
    "Cruelty-free and vegan formula",
    "Long-lasting wear up to 12 hours",
    "Suitable for all skin types",
    "Dermatologically tested",
    "Free shipping on orders over $50"
  ];
};

// Filter products that appear cosmetic-related
const filterCosmeticProducts = (products) => {
  return products
    .filter(product => {
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();
      
      return COSMETIC_KEYWORDS.some(keyword => 
        title.includes(keyword) || description.includes(keyword)
      );
    })
    .map(enhanceProduct)
    .slice(0, 20); // Limit to 20 products for better performance
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products?limit=100');
    const cosmeticProducts = filterCosmeticProducts(response.data.products);
    
    // If we don't have enough cosmetic products, add some mock ones
    if (cosmeticProducts.length < 10) {
      const mockProducts = [
        {
          id: 9001,
          title: "Essence Mascara Lash Princess",
          description: "Volumizing mascara that creates dramatic lashes with long-lasting wear.",
          price: 24.99,
          discountPercentage: 15,
          rating: 4.8,
          stock: 50,
          brand: "Essence",
          category: "Beauty & Cosmetics",
          thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
          images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"],
        },
        {
          id: 9002,
          title: "Luxury Lipstick Collection",
          description: "Premium lipstick with rich, creamy formula and vibrant color payoff.",
          price: 32.50,
          discountPercentage: 20,
          rating: 4.6,
          stock: 30,
          brand: "GlowBeauty",
          category: "Beauty & Cosmetics",
          thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
          images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"],
        }
      ].map(enhanceProduct);
      
      cosmeticProducts.push(...mockProducts);
    }
    
    return cosmeticProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please check your connection.');
  }
};

export const fetchProductById = async (id) => {
  try {
    // First try to fetch from API
    const response = await api.get(`/products/${id}`);
    
    // Check if it's a cosmetic product, if not enhance it
    const product = response.data;
    const isCosmetic = COSMETIC_KEYWORDS.some(keyword => 
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
    );
    
    if (isCosmetic) {
      return enhanceProduct(product);
    } else {
      // If not cosmetic, return a mock cosmetic product
      return {
        id: id,
        title: "Beauty Essential Product",
        description: "Premium beauty product crafted with the finest ingredients for exceptional results.",
        price: 29.99,
        discountPercentage: 10,
        rating: 4.5,
        stock: 25,
        brand: "GlowBeauty",
        category: "Beauty & Cosmetics",
        thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"],
        reviews: generateMockReviews("Beauty Essential Product"),
        highlights: generateProductHighlights("Beauty Essential Product"),
      };
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product details. Please try again.');
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products/search?q=${query}&limit=50`);
    const cosmeticProducts = filterCosmeticProducts(response.data.products);
    return cosmeticProducts;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products. Please try again.');
  }
};

// Mock authentication endpoints (since DummyJSON auth might not be suitable)
export const loginUser = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email && password) {
    return {
      id: 1,
      name: 'Sarah Johnson',
      email: email,
      token: 'mock-jwt-token',
      avatar: 'https://i.pravatar.cc/150?img=1',
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const registerUser = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (userData.email && userData.password && userData.fullName) {
    return {
      id: Date.now(),
      name: userData.fullName,
      email: userData.email,
      token: 'mock-jwt-token',
      avatar: 'https://i.pravatar.cc/150?img=2',
    };
  } else {
    throw new Error('All fields are required');
  }
};

export default api;