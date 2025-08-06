import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
    return (
        <AuthProvider>
            <ProductProvider>
                <NavigationContainer>
                    <StatusBar backgroundColor="#FF6B9D" barStyle="light-content" />
                    <AppNavigator />
                </NavigationContainer>
            </ProductProvider>
        </AuthProvider>
    );
};

export default App;