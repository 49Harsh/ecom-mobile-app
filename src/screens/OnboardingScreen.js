import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >

        {/* Main Content Area with Background */}
        <View style={styles.mainContent}>
          {/* This area will have the background image */}
        </View>
      </ImageBackground>

      {/* Bottom Content - Outside background image */}
      <View style={styles.bottomSection}>
        <Text style={styles.logo}>Viorra</Text>
        <Text style={styles.tagline}>Your Beauty, Delivered.</Text>

        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9A7A2',
  },
  backgroundImage: {
    flex: 1, // Takes 70% of screen height, stops before Viorra text
    width: '100%',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  mainContent: {
    flex: 1,
    // This area will show the background image
  },
  bottomSection: {
    flex: 0.10, // Takes 30% of screen height for Viorra text and button
    backgroundColor: '#C9A7A2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    paddingHorizontal: 24,
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
  wifi: {
    marginRight: 8,
  },
  wifiIcon: {
    fontSize: 16,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 2,
  },



  logo: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 40,
    fontWeight: '300',
  },
  getStartedButton: {
    backgroundColor: '#C85A5A',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default OnboardingScreen;