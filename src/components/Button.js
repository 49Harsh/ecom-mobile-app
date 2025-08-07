import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ionicons';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${size}Button`]];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButton);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    return [...baseStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineText);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryText);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }
    
    return [...baseStyle, textStyle];
  };

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#FF6B9D' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon 
              name={icon} 
              size={20} 
              color={variant === 'outline' ? '#FF6B9D' : '#FFFFFF'} 
              style={styles.iconLeft} 
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Icon 
              name={icon} 
              size={20} 
              color={variant === 'outline' ? '#FF6B9D' : '#FFFFFF'} 
              style={styles.iconRight} 
            />
          )}
        </>
      )}
    </View>
  );

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={getButtonStyle()}
        activeOpacity={0.8}>
        <View style={[styles.gradient, { backgroundColor: '#FF6B9D' }]}>
          {renderContent()}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
      activeOpacity={0.8}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  
  // Size variants
  smallButton: {
    height: 36,
    paddingHorizontal: 16,
  },
  mediumButton: {
    height: 48,
    paddingHorizontal: 24,
  },
  largeButton: {
    height: 56,
    paddingHorizontal: 32,
  },
  
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Color variants
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  outlineText: {
    color: '#FF6B9D',
  },
  
  secondaryButton: {
    backgroundColor: '#4ECDC4',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  
  // Disabled state
  disabledButton: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});

export default Button;