import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Social Login', `${provider} login will be implemented soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <View style={styles.signalBars}>
            <View style={[styles.bar, { height: 4 }]} />
            <View style={[styles.bar, { height: 6 }]} />
            <View style={[styles.bar, { height: 8 }]} />
            <View style={[styles.bar, { height: 10 }]} />
          </View>
          <Icon name="wifi" size={16} color="#FFFFFF" style={styles.icon} />
          <View style={styles.battery} />
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Hello Again!</Text>
            <Text style={styles.subtitle}>
              Welcome back you've{'\n'}been missed.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email Id"
                placeholderTextColor="#B0B0B0"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Icon name="mail-outline" size={20} color="#B0B0B0" style={styles.inputIcon} />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#B0B0B0"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIcon}>
                <Icon 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#B0B0B0" 
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={loading}>
              <Text style={styles.loginButtonText}>
                {loading ? 'Signing In...' : 'Log In'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or Continue With</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialLogin}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}>
                <Icon name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Apple')}>
                <Icon name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Facebook')}>
                <Icon name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Not a Member? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E0',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#E8C4C4',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  bar: {
    width: 3,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  icon: {
    marginRight: 8,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSection: {
    backgroundColor: '#E8C4C4',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B4B5C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#C85A5A',
    fontWeight: '500',
  },
  loginButton: {
    height: 56,
    backgroundColor: '#C85A5A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#C85A5A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0D0D0',
  },
  dividerText: {
    fontSize: 14,
    color: '#999999',
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#999999',
  },
  registerLink: {
    fontSize: 14,
    color: '#C85A5A',
    fontWeight: '600',
  },
});

export default LoginScreen;