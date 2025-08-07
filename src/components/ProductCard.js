import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onPress }) => {
  // Dummy data in case product prop is not provided
  const productData = product || {
    id: 1,
    name: 'Sample Product',
    price: 99.99,
    image: 'https://via.placeholder.com/150x150/ff69b4/ffffff?text=Beauty',
    brand: 'Beauty Brand',
    rating: 4.5,
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(productData)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: productData.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.brand} numberOfLines={1}>
          {productData.brand}
        </Text>
        
        <Text style={styles.name} numberOfLines={2}>
          {productData.name}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${productData.price}
          </Text>
          
          {productData.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {productData.rating}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.44, // Takes about 44% of screen width
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProductCard;