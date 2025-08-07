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
  StatusBar,
  TextInput,
  ImageBackground,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useProducts } from '../context/ProductContext';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState({}); // Add this line at the top with other state

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

  const handleHeartPress = (item) => {
    setLikedItems(prev => ({
      ...prev,
      [item.id]: !prev[item.id]
    }));
    handleAddToCart(item);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productBrand} numberOfLines={1}>
          {item.brand || 'Beauty Brand'}
        </Text>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating?.toFixed(1) || '4.5'}</Text>
          <Text style={styles.reviewCount}>({item.reviews?.length || '12'})</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>
            ${item.price}
          </Text>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => handleHeartPress(item)}
          >
            <Icon 
              name={likedItems[item.id] ? "heart" : "heart-outline"} 
              size={16} 
              color={likedItems[item.id] ? "#FF6B9D" : "#8F8F8F"} 
            />
          </TouchableOpacity>
        </View>
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
            placeholder="Search beauty products..."
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
        <Text style={styles.sectionTitle}>Beauty Essentials</Text>
        <Text style={styles.productCount}>{filteredProducts.length || products.length} cosmetic products</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Apply Filter</Text>
        <Icon name="chevron-down-outline" size={16} color="#333" />
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

      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
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
    marginTop: 40
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
    marginLeft: 12,
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,           // Rounded corner 16 किया गया
    paddingHorizontal: 16,
    height: 44,
    borderWidth: 1,             // Border search wrapper पर move किया
    borderColor: '#8F8F8F',     // Border color
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
    paddingHorizontal: 10
  },


  contentContainer: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFEDE8',
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
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    margin: 8,
    marginBottom: 0,
  },
  productImage: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 8,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FF6B9D',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  productInfo: {
    padding: 12,
  },
  productBrand: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8F8F8F', // Changed to grey
  },
  heartButton: {
    padding: 8,  // Increased touch target
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