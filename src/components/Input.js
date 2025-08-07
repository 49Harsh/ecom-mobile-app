import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  leftIcon,
  rightIcon,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getInputContainerStyle = () => {
    const baseStyle = [styles.inputContainer];
    
    if (isFocused) {
      baseStyle.push(styles.focusedContainer);
    }
    
    if (error) {
      baseStyle.push(styles.errorContainer);
    }
    
    if (!editable) {
      baseStyle.push(styles.disabledContainer);
    }
    
    return baseStyle;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, error && styles.errorLabel]}>
          {label}
        </Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Icon 
            name={leftIcon} 
            size={20} 
            color={isFocused ? '#FF6B9D' : '#9CA3AF'} 
            style={styles.leftIcon} 
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}>
            <Icon 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color="#9CA3AF" 
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <Icon 
            name={rightIcon} 
            size={20} 
            color={isFocused ? '#FF6B9D' : '#9CA3AF'} 
            style={styles.rightIcon} 
          />
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  errorLabel: {
    color: '#E53E3E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    minHeight: 48,
  },
  focusedContainer: {
    borderColor: '#FF6B9D',
    shadowColor: '#FF6B9D',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  errorContainer: {
    borderColor: '#E53E3E',
  },
  disabledContainer: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    marginLeft: 8,
  },
  inputWithRightIcon: {
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 4,
  },
  rightIcon: {
    marginLeft: 4,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#E53E3E',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;