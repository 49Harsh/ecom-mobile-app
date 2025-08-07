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
// import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

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
    {
      section: 'Account',
      items: [
        { icon: 'location-outline', title: 'My Address', subtitle: 'Manage delivery addresses' },
        { icon: 'bag-outline', title: 'Order History', subtitle: 'Track your orders' },
        { icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage payment options' },
      ]
    },
    {
      section: 'Preferences',
      items: [
        { icon: 'language-outline', title: 'Language', subtitle: 'English' },
        { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Push, SMS, Email' },
        { icon: 'moon-outline', title: 'Dark Mode', subtitle: 'Off', toggle: true },
      ]
    },
    {
      section: 'Support',
      items: [
        { icon: 'chatbubble-outline', title: 'Contact Us', subtitle: '24/7 customer support' },
        { icon: 'help-circle-outline', title: 'Get Help', subtitle: 'FAQ and troubleshooting' },
        { icon: 'shield-outline', title: 'Privacy Policy', subtitle: 'Your data protection' },
        { icon: 'document-text-outline', title: 'Terms & Conditions', subtitle: 'Service agreement' },
      ]
    }
  ];

  const renderProfileHeader = () => (
    <View style={[styles.profileHeader, { backgroundColor: '#FF6B9D' }]}>
      
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?img=1' }}
          style={styles.avatar}
        />
        
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user?.name || 'Beauty Lover'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.membershipBadge}>
            <Icon name="star" size={12} color="#FFD700" />
            <Text style={styles.membershipText}>Gold Member</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>$520</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>
    </View>
  );

  const renderMenuItem = (item, index, isLast) => (
    <TouchableOpacity 
      key={index}
      style={[styles.menuItem, isLast && styles.lastMenuItem]}
      onPress={() => Alert.alert('Feature', `${item.title} will be available soon!`)}>
      
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>
          <Icon name={item.icon} size={20} color="#FF6B9D" />
        </View>
        
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      
      <View style={styles.menuItemRight}>
        {item.toggle ? (
          <View style={styles.toggle}>
            <View style={styles.toggleInner} />
          </View>
        ) : (
          <Icon name="chevron-forward" size={16} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderMenuSection = (section, sectionIndex) => (
    <View key={sectionIndex} style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{section.section}</Text>
      
      <View style={styles.menuCard}>
        {section.items.map((item, index) => 
          renderMenuItem(item, index, index === section.items.length - 1)
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        
        {renderProfileHeader()}
        
        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionGradient, { backgroundColor: '#4ECDC4' }]}>
                <Icon name="gift-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Rewards</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionGradient, { backgroundColor: '#FFB74D' }]}>
                <Icon name="pricetag-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Coupons</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionGradient, { backgroundColor: '#9C27B0' }]}>
                <Icon name="people-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Referrals</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionGradient, { backgroundColor: '#F44336' }]}>
                <Icon name="chatbubble-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
          </View>
          
          {/* Menu Sections */}
          {menuItems.map((section, index) => renderMenuSection(section, index))}
          
          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              icon="log-out-outline"
              style={styles.logoutButton}
            />
          </View>
          
          {/* App Version */}
          <Text style={styles.appVersion}>GlowCart v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  content: {
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  menuItemRight: {
    marginLeft: 12,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    padding: 2,
    justifyContent: 'center',
  },
  toggleInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  logoutContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
  logoutButton: {
    borderColor: '#E53E3E',
  },
  appVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProfileScreen;