import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'REGISTER_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Allow login without validation - always success
      const user = {
        id: 1,
        name: 'Sarah Johnson',
        email: email || 'user@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Simulate API call
      setTimeout(() => {
        if (userData.email && userData.password && userData.fullName) {
          const user = {
            id: Date.now(),
            name: userData.fullName,
            email: userData.email,
            avatar: 'https://i.pravatar.cc/150?img=2',
          };
          dispatch({ type: 'REGISTER_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'REGISTER_FAILURE', payload: 'All fields are required' });
        }
      }, 1000);
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};