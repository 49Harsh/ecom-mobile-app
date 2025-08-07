import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Color palette
export const Colors = {
  // Primary colors
  primary: '#FF6B9D',
  primaryDark: '#ED64A6',
  secondary: '#4ECDC4',
  secondaryDark: '#44B3A7',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F7FAFC',
  backgroundTertiary: '#FFF5F8',
  
  // Text colors
  textPrimary: '#2D3748',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  textLight: 'rgba(255, 255, 255, 0.9)',
  
  // Status colors
  success: '#4ECDC4',
  warning: '#FFB74D',
  error: '#E53E3E',
  info: '#3182CE',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F7FAFC',
  gray200: '#E5E5E5',
  gray300: '#CBD5E0',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#2D3748',
  gray900: '#1A202C',
  
  // Special colors
  gold: '#FFD700',
  transparent: 'transparent',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.3)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
};

// Typography
export const Typography = {
  // Font sizes
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xl2: 24,
  xl3: 28,
  xl4: 32,
  xl5: 36,
  xl6: 40,
  
  // Font weights
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  
  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
  loose: 1.8,
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xl2: 32,
  xl3: 40,
  xl4: 48,
  xl5: 56,
  xl6: 64,
};

// Border radius
export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xl2: 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  pink: {
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};

// Screen dimensions
export const Layout = {
  screenWidth,
  screenHeight,
  cardWidth: (screenWidth - 48) / 2, // For 2-column grid with margins
  isSmallDevice: screenWidth < 375,
  isTablet: screenWidth >= 768,
};

// Common styles
export const CommonStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadow: Shadows.medium,
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.base,
    ...Shadows.medium,
  },
  gradient: {
    flex: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: Typography.bold,
  },
  textMedium: {
    fontWeight: Typography.medium,
  },
  textSemiBold: {
    fontWeight: Typography.semiBold,
  },
  marginBottom: {
    marginBottom: Spacing.base,
  },
  marginTop: {
    marginTop: Spacing.base,
  },
  paddingHorizontal: {
    paddingHorizontal: Spacing.base,
  },
  paddingVertical: {
    paddingVertical: Spacing.base,
  },
  fullWidth: {
    width: '100%',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

// Animation durations
export const Animations = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
};

// API Constants
export const API = {
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  endpoints: {
    products: '/products',
    productById: (id) => `/products/${id}`,
    search: (query) => `/products/search?q=${query}`,
  },
};

// App Constants
export const AppConstants = {
  appName: 'GlowCart',
  version: '1.0.0',
  supportEmail: 'support@glowcart.com',
  termsURL: 'https://glowcart.com/terms',
  privacyURL: 'https://glowcart.com/privacy',
  
  // Pagination
  productsPerPage: 20,
  reviewsPerPage: 5,
  
  // Validation
  minPasswordLength: 6,
  maxNameLength: 50,
  maxCommentLength: 500,
  
  // Currency
  currency: 'USD',
  currencySymbol: '$',
  
  // Social login providers
  socialProviders: ['google', 'apple', 'facebook'],
  
  // Categories
  categories: [
    'All',
    'Makeup',
    'Skincare',
    'Fragrance',
    'Hair',
    'Nails',
    'Body Care',
    'Tools'
  ],
};

// Helper functions
export const Helpers = {
  // Format currency
  formatCurrency: (amount, currency = AppConstants.currencySymbol) => {
    return `${currency}${parseFloat(amount).toFixed(2)}`;
  },
  
  // Format rating
  formatRating: (rating) => {
    return parseFloat(rating).toFixed(1);
  },
  
  // Truncate text
  truncateText: (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  },
  
  // Generate random ID
  generateId: () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // Validate email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  // Calculate discount percentage
  calculateDiscount: (originalPrice, currentPrice) => {
    if (originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  },
  
  // Get discounted price
  getDiscountedPrice: (price, discountPercentage) => {
    return price - (price * discountPercentage / 100);
  },
  
  // Format date
  formatDate: (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  },
  
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

// Export all constants as default
export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
  CommonStyles,
  Animations,
  API,
  AppConstants,
  Helpers,
};