import React, { createContext, useContext, useReducer } from 'react';
import { fetchProducts, fetchProductById } from '../services/api';

const ProductContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchQuery: '',
  cart: [],
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_PRODUCT_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        currentProduct: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_PRODUCT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SEARCH_PRODUCTS':
      const searchQuery = action.payload.toLowerCase();
      const filtered = state.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      );
      return {
        ...state,
        searchQuery: action.payload,
        filteredProducts: filtered,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      
      return {
        ...state,
        cart: updatedCart,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    
    try {
      const products = await fetchProducts();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };

  const getProductById = async (id) => {
    dispatch({ type: 'FETCH_PRODUCT_START' });
    
    try {
      const product = await fetchProductById(id);
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: product });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCT_FAILURE', payload: error.message });
    }
  };

  const searchProducts = (query) => {
    dispatch({ type: 'SEARCH_PRODUCTS', payload: query });
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        getProducts,
        getProductById,
        searchProducts,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};