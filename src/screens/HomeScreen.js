import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Input from '../components/Input';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    products, 
    filteredProducts, 
    loading, 
    error, 
    getProducts, 
    searchProducts,
    addToCart,
    getCartItemsCount 
  } = useProducts();
  
  const { user } = useAuth();

  useEffect(() => {
    getProducts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getProducts();
    setRefreshing(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchProducts(query);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert('Success', `${product.title} added to your bag!`);
  };

  const renderProductCard = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.greeting}>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || 'Beauty Lover'} ✨</Text>
        </View>
        
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="bag-outline" size={24} color="#2D3748" />
          {getCartItemsCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getCartItemsCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for beauty products..."
          value={searchQuery}
          onChangeText={handleSearch}
          leftIcon="search-outline"
          style={styles.searchInput}
        />
        
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options-outline" size={20} color="#FF6B9D" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryList}>
          {['All', 'Makeup', 'Skincare', 'Fragrance', 'Hair'].map((category) => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.categoryItem,
                category === 'All' && styles.activeCategoryItem
              ]}>
              <Text style={[
                styles.categoryText,
                category === 'All' && styles.activeCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="bag-outline" size={64} color="#E5E5E5" />
      <Text style={styles.emptyStateTitle}>No Products Found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery 
          ? `No results for "${searchQuery}"`
          : 'Unable to load products at the moment'
        }
      </Text>
      <Button
        title="Try Again"
        onPress={getProducts}
        variant="outline"
        style={styles.retryButton}
      />
    </View>
  );

  if (error && !products.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle-outline" size={64} color="#E53E3E" />
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Retry"
            onPress={getProducts}
            style={styles.retryButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading ? renderEmptyState : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FF6B9D']}
            tintColor="#FF6B9D"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 2,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B9D',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginRight: 12,
    marginBottom: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categories: {
    marginBottom: 24,
  },
  categoryList: {
    flexDirection: 'row',
    marginTop: 12,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    marginRight: 12,
  },
  activeCategoryItem: {
    backgroundColor: '#FF6B9D',
  },
  categoryText: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B9D',
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
});

export default HomeScreen;