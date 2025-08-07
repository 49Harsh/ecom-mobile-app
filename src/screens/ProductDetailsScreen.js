import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useProducts } from '../context/ProductContext';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { 
    currentProduct, 
    loading, 
    error, 
    getProductById, 
    addToCart 
  } = useProducts();

  useEffect(() => {
    getProductById(productId);
  }, [productId]);

  const handleAddToBag = () => {
    if (currentProduct) {
      addToCart({
        ...currentProduct,
        quantity
      });
      Alert.alert(
        'Added to Bag!',
        `${currentProduct.title} has been added to your bag.`,
        [
          { text: 'Continue Shopping', style: 'cancel' },
          { text: 'View Bag', onPress: () => {/* Navigate to cart */} }
        ]
      );
    }
  };

  const renderImageGallery = () => {
    const images = currentProduct?.images || [currentProduct?.thumbnail];
    
    return (
      <View style={styles.imageGallery}>
        <Image 
          source={{ uri: images[selectedImageIndex] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        {/* Action Buttons */}
        <View style={styles.imageActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={20} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {/* Share functionality */}}>
            <Icon name="share-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderViewSimilar = () => (
    <View style={styles.viewSimilarContainer}>
      <TouchableOpacity style={styles.viewSimilarButton}>
        <Text style={styles.viewSimilarText}>View Similar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Icon name="share-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      {/* Title */}
      <Text style={styles.title}>{currentProduct?.title}</Text>
      
      {/* Description */}
      <Text style={styles.description}>{currentProduct?.description}</Text>
      
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name={star <= Math.floor(currentProduct?.rating || 2.5) ? "star" : "star-outline"}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.ratingText}>
          {currentProduct?.rating?.toFixed(1) || '2.56'}/5
        </Text>
      </View>
      
      {/* Sold by */}
      <View style={styles.soldByContainer}>
        <Text style={styles.soldByLabel}>Sold by :</Text>
        <Text style={styles.soldByValue}>{currentProduct?.brand || 'Essence'}</Text>
      </View>
      
      {/* Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>
          ${currentProduct?.discountPercentage 
            ? (currentProduct.price - (currentProduct.price * currentProduct.discountPercentage / 100)).toFixed(2)
            : currentProduct?.price
          }
        </Text>
        {currentProduct?.discountPercentage > 0 && (
          <Text style={styles.originalPrice}>${currentProduct.price}</Text>
        )}
      </View>
    </View>
  );

  const renderHighlights = () => (
    <View style={styles.highlightsSection}>
      <Text style={styles.sectionTitle}>Highlights</Text>
      
      <View style={styles.highlightsGrid}>
        <View style={styles.highlightColumn}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Width</Text>
            <Text style={styles.highlightValue}>15.14</Text>
          </View>
          
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Warranty</Text>
            <Text style={styles.highlightValue}>1 week</Text>
          </View>
        </View>
        
        <View style={styles.highlightColumn}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Height</Text>
            <Text style={styles.highlightValue}>13.08</Text>
          </View>
          
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Shipping</Text>
            <Text style={styles.highlightValue}>In 3-5 business days</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.reviewsSection}>
      <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
      
      {/* Review Items */}
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c96c6f8c?w=40&h=40&fit=crop&crop=face' }}
            style={styles.reviewerAvatar}
          />
          <View style={styles.reviewerInfo}>
            <Text style={styles.reviewerName}>Eleanor Collins</Text>
            <Text style={styles.reviewerEmail}>eleanor.collins@gmail.com</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name={star <= 3 ? "star" : "star-outline"}
                size={14}
                color="#FFD700"
              />
            ))}
          </View>
        </View>
        <Text style={styles.reviewComment}>Would not recommend...</Text>
      </View>

      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' }}
            style={styles.reviewerAvatar}
          />
          <View style={styles.reviewerInfo}>
            <Text style={styles.reviewerName}>Lucas Gordon</Text>
            <Text style={styles.reviewerEmail}>lucas.gordon@gmail.com</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name={star <= 3 ? "star" : "star-outline"}
                size={14}
                color="#FFD700"
              />
            ))}
          </View>
        </View>
        <Text style={styles.reviewComment}>Very satisfied!</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingContainer}>
          <Text>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !currentProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.errorContainer}>
          <Icon name="alert-circle-outline" size={64} color="#E53E3E" />
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorText}>
            {error || 'Unable to load product details'}
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        
        {renderImageGallery()}
        {renderViewSimilar()}
        {renderProductInfo()}
        {renderHighlights()}
        {renderReviews()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Button
          title="Add to Bag"
          onPress={handleAddToBag}
          style={styles.addToBagButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  scrollView: {
    flex: 1,
  },
  imageGallery: {
    position: 'relative',
    width: width,
    height: width * 1.2,
    backgroundColor: '#E8BBE8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageActions: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewSimilarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  viewSimilarButton: {
    borderWidth: 1,
    borderColor: '#C4B5FD',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewSimilarText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
  productInfo: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  soldByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  soldByLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  soldByValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  highlightsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  highlightsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightColumn: {
    flex: 1,
    marginRight: 20,
  },
  highlightItem: {
    marginBottom: 20,
  },
  highlightLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  reviewsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reviewerEmail: {
    fontSize: 12,
    color: '#666',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addToBagButton: {
    backgroundColor: '#B91C7C',
    borderRadius: 25,
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  backButton: {
    paddingHorizontal: 32,
  },
});

export default ProductDetailsScreen;