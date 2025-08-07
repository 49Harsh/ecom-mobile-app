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

  // Cosmetic product images from Unsplash
  const cosmeticImages = [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583241800698-9c2e8b2b3b8e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
  ];

  const productTitle = product.title.toLowerCase();
  let enhancedDescription = product.description;
  let brand = product.brand || 'Beauty Brand';
  
  // Find matching cosmetic keyword and enhance description
  for (const keyword of Object.keys(cosmeticDescriptions)) {
    if (productTitle.includes(keyword)) {
      enhancedDescription = cosmeticDescriptions[keyword];
      break;
    }
  }

  // Assign cosmetic brands based on product type
  if (productTitle.includes('essence') || productTitle.includes('mascara')) {
    brand = 'Essence';
  } else if (productTitle.includes('lipstick') || productTitle.includes('lip')) {
    brand = 'GlowLips';
  } else if (productTitle.includes('foundation') || productTitle.includes('concealer')) {
    brand = 'FlawlessBase';
  } else if (productTitle.includes('serum') || productTitle.includes('moisturizer')) {
    brand = 'SkinGlow';
  } else if (productTitle.includes('perfume') || productTitle.includes('fragrance')) {
    brand = 'LuxeScent';
  }

  // Use a cosmetic image based on product ID
  const imageIndex = product.id % cosmeticImages.length;
  const cosmeticImage = cosmeticImages[imageIndex];

  return {
    ...product,
    description: enhancedDescription,
    category: 'Beauty & Cosmetics',
    brand: brand,
    rating: Math.max(product.rating || 4.2, 4.0), // Ensure good ratings
    thumbnail: cosmeticImage,
    images: [cosmeticImage, ...cosmeticImages.slice(0, 3)],
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
    if (cosmeticProducts.length < 15) {
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
        },
        {
          id: 9002,
          title: "Luxury Lipstick Collection",
          description: "Premium lipstick with rich, creamy formula and vibrant color payoff.",
          price: 32.50,
          discountPercentage: 20,
          rating: 4.6,
          stock: 30,
          brand: "GlowLips",
          category: "Beauty & Cosmetics",
        },
        {
          id: 9003,
          title: "Hydrating Face Serum",
          description: "Concentrated serum with hyaluronic acid for intense hydration.",
          price: 45.00,
          discountPercentage: 10,
          rating: 4.7,
          stock: 25,
          brand: "SkinGlow",
          category: "Beauty & Cosmetics",
        },
        {
          id: 9004,
          title: "Matte Foundation SPF 30",
          description: "Full coverage foundation with sun protection for all-day wear.",
          price: 38.99,
          discountPercentage: 25,
          rating: 4.5,
          stock: 40,
          brand: "FlawlessBase",
          category: "Beauty & Cosmetics",
        },
        {
          id: 9005,
          title: "Rose Gold Eyeshadow Palette",
          description: "12-shade eyeshadow palette with matte and shimmer finishes.",
          price: 52.00,
          discountPercentage: 30,
          rating: 4.9,
          stock: 20,
          brand: "GlowBeauty",
          category: "Beauty & Cosmetics",
        },
        {
          id: 9006,
          title: "Vitamin C Brightening Cream",
          description: "Anti-aging moisturizer with vitamin C for radiant skin.",
          price: 41.50,
          discountPercentage: 12,
          rating: 4.4,
          stock: 35,
          brand: "SkinGlow",
          category: "Beauty & Cosmetics",
        },
        {
          id: 9007,
          title: "Waterproof Eyeliner Pen",
          description: "Precision eyeliner pen with long-lasting, smudge-proof formula.",
          price: 18.99,
          discountPercentage: 5,
          rating: 4.6,
          stock: 60,
          brand: "Essence",
          category: "Beauty & Cosmetics",
        },
        {
          id: 9008,
          title: "Luxury Perfume Eau de Parfum",
          description: "Elegant floral fragrance with notes of jasmine and vanilla.",
          price: 89.99,
          discountPercentage: 18,
          rating: 4.8,
          stock: 15,
          brand: "LuxeScent",
          category: "Beauty & Cosmetics",
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