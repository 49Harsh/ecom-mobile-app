import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const menuItems = [
    { icon: 'location-outline', title: 'Address', subtitle: 'Manage your saved address' },
    { icon: 'bag-outline', title: 'Order History', subtitle: 'View your past orders' },
    { icon: 'language-outline', title: 'Language' },
    { icon: 'notifications-outline', title: 'Notifications' },
    { icon: 'chatbubble-outline', title: 'Contact Us' },
    { icon: 'help-circle-outline', title: 'Get Help' },
    { icon: 'shield-outline', title: 'Privacy Policy' },
    { icon: 'document-text-outline', title: 'Terms and Conditions' },
  ];

  const handleMenuPress = (title) => {
    if (title === 'Log Out') {
      handleLogout();
    } else {
      Alert.alert('Feature', `${title} will be available soon!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image
              source={{ 
                uri: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
              }}
              style={styles.avatar}
            />
            
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name || 'Olivia'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'Oliva@gmail.com'}</Text>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Icon name="pencil-outline" size={18} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}>
              
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  <Icon name={item.icon} size={20} color="#666" />
                </View>
                
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>
              
              <Icon name="chevron-forward" size={16} color="#999" />
            </TouchableOpacity>
          ))}
          
          {/* Logout Item */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}>
            
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Icon name="log-out-outline" size={20} color="#FF6B6B" />
              </View>
              
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuTitle, { color: '#FF6B6B' }]}>Log Out</Text>
              </View>
            </View>
            
            <Icon name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F0',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
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
    backgroundColor: '#000',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  icon: {
    marginRight: 8,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  moreButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  menuContainer: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default ProfileScreen;