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
  Image,
  ScrollView,
  StatusBar,
  TextInput,
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

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.image || item.thumbnail }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={() => {/* Add to wishlist logic */}}
        >
          <Icon name="heart-outline" size={16} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <Text style={styles.brandName}>Viorra</Text>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bag-outline" size={24} color="#333" />
            {getCartItemsCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemsCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for all products"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
    </View>
  );

  const renderSectionHeader = () => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Best Products</Text>
        <Text style={styles.productCount}>{filteredProducts.length || products.length} products</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Apply Filter</Text>
        <Icon name="chevron-down-outline" size={16} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" size={24} color="#FF6B9D" />
        <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Icon name="pricetag-outline" size={24} color="#999" />
        <Text style={styles.navText}>Offers</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Icon name="heart-outline" size={24} color="#999" />
        <Text style={styles.navText}>Wishlist</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Icon name="person-outline" size={24} color="#999" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
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
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {renderHeader()}
      
      <View style={styles.contentContainer}>
        {renderSectionHeader()}
        
        <FlatList
          data={filteredProducts.length > 0 ? filteredProducts : products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.productRow}
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
      </View>

      {renderBottomNav()}
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
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B9D',
    fontFamily: 'serif',
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B9D',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF0F5',
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B9D',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FF6B9D',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
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
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
});

export default HomeScreen;