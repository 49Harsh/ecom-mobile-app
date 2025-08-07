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
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
// import LinearGradient from 'react-native-linear-gradient';
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
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <View style={styles.imageNavigation}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.imageDot,
                  selectedImageIndex === index && styles.activeImageDot
                ]}
                onPress={() => setSelectedImageIndex(index)}
              />
            ))}
          </View>
        )}
        
        {/* Action Buttons */}
        <View style={styles.imageActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={20} color="#2D3748" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Icon 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#FF6B9D" : "#2D3748"} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProductInfo = () => (
    <View style={styles.productInfo}>
      {/* Brand and Title */}
      <Text style={styles.brand}>{currentProduct?.brand || 'GlowBeauty'}</Text>
      <Text style={styles.title}>{currentProduct?.title}</Text>
      
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name={star <= Math.floor(currentProduct?.rating || 4.5) ? "star" : "star-outline"}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.ratingText}>
          {currentProduct?.rating?.toFixed(1) || '4.5'} (247 reviews)
        </Text>
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
          <>
            <Text style={styles.originalPrice}>${currentProduct.price}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{Math.round(currentProduct.discountPercentage)}%
              </Text>
            </View>
          </>
        )}
      </View>
      
      {/* Description */}
      <Text style={styles.description}>{currentProduct?.description}</Text>
      
      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Icon name="remove" size={16} color="#2D3748" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}>
            <Icon name="add" size={16} color="#2D3748" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHighlights = () => (
    <View style={styles.highlightsSection}>
      <Text style={styles.sectionTitle}>Product Highlights</Text>
      {currentProduct?.highlights?.map((highlight, index) => (
        <View key={index} style={styles.highlightItem}>
          <Icon name="checkmark-circle" size={16} color="#4ECDC4" />
          <Text style={styles.highlightText}>{highlight}</Text>
        </View>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.reviewsSection}>
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {currentProduct?.reviews?.slice(0, 2).map((review, index) => (
        <View key={index} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewerInfo}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerInitial}>
                  {review.reviewer.charAt(0)}
                </Text>
              </View>
              <View>
                <Text style={styles.reviewerName}>{review.reviewer}</Text>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name={star <= review.rating ? "star" : "star-outline"}
                      size={12}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !currentProduct) {
    return (
      <SafeAreaView style={styles.container}>
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
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        
        {renderImageGallery()}
        {renderProductInfo()}
        {renderHighlights()}
        {renderReviews()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-outline" size={20} color="#2D3748" />
        </TouchableOpacity>
        
        <Button
          title="Add to Bag"
          onPress={handleAddToBag}
          icon="bag-add-outline"
          style={styles.addToBagButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  imageGallery: {
    position: 'relative',
    width: width,
    height: width,
    backgroundColor: '#F7FAFC',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageNavigation: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeImageDot: {
    backgroundColor: '#FFFFFF',
  },
  imageActions: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
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
  productInfo: {
    padding: 20,
  },
  brand: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3748',
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6B9D',
  },
  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  discountBadge: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    paddingHorizontal: 16,
  },
  highlightsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 14,
    color: '#2D3748',
    marginLeft: 12,
    flex: 1,
  },
  reviewsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B9D',
    fontWeight: '600',
  },
  reviewItem: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addToBagButton: {
    flex: 1,
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
  backButton: {
    paddingHorizontal: 32,
  },
});

export default ProductDetailsScreen;