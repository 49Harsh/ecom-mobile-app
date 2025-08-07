import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
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
          <View style={styles.wifi}>
            <Text style={styles.wifiIcon}>📶</Text>
          </View>
          <View style={styles.battery} />
        </View>
      </View>

      <View style={styles.gradient}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Product Arrangement */}
          <View style={styles.productContainer}>
            {/* Geometric Background Blocks */}
            <View style={[styles.geometricBlock, styles.block1]} />
            <View style={[styles.geometricBlock, styles.block2]} />
            <View style={[styles.geometricBlock, styles.block3]} />
            
            {/* Pencil 1 - Top left diagonal */}
            <View style={[styles.pencil, styles.pencil1]}>
              <View style={styles.pencilBody}>
                <View style={[styles.pencilTip, { backgroundColor: '#8B4513' }]} />
                <View style={styles.pencilTipPoint} />
                <Text style={styles.pencilText}>GLOSSIER</Text>
              </View>
            </View>

            {/* Pencil 2 - Main vertical pencil */}
            <View style={[styles.pencil, styles.pencil2]}>
              <View style={[styles.pencilBody, { width: 12, height: 160 }]}>
                <View style={[styles.pencilTip, { backgroundColor: '#8B4513', width: 12, height: 24 }]} />
                <View style={[styles.pencilTipPoint, { left: 2 }]} />
                <Text style={[styles.pencilText, { transform: [{ rotate: '90deg' }] }]}>GLOSSIER</Text>
              </View>
            </View>

            {/* Pencil 3 - Middle right */}
            <View style={[styles.pencil, styles.pencil3]}>
              <View style={[styles.pencilBody, { width: 12, height: 128 }]}>
                <View style={[styles.pencilTip, { backgroundColor: '#DC143C', width: 12, height: 24 }]} />
                <View style={[styles.pencilTipPoint, { left: 2, backgroundColor: '#8B0000' }]} />
                <Text style={[styles.pencilText, { transform: [{ rotate: '90deg' }] }]}>GLOSSIER</Text>
              </View>
            </View>

            {/* Pencil 4 - Bottom right diagonal */}
            <View style={[styles.pencil, styles.pencil4]}>
              <View style={styles.pencilBody}>
                <View style={[styles.pencilTip, { backgroundColor: '#DC143C' }]} />
                <View style={[styles.pencilTipPoint, { backgroundColor: '#8B0000' }]} />
                <Text style={styles.pencilText}>GLOSSIER</Text>
              </View>
            </View>

            {/* Pencil 5 - Bottom left diagonal */}
            <View style={[styles.pencil, styles.pencil5]}>
              <View style={styles.pencilBody}>
                <View style={[styles.pencilTip, { backgroundColor: '#000' }]} />
                <View style={styles.pencilTipPoint} />
                <Text style={styles.pencilText}>GLOSSIER</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomContent}>
          <Text style={styles.logo}>Viorra</Text>
          <Text style={styles.tagline}>Your Beauty, Delivered.</Text>
          
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          
          {/* Page Indicators */}
          <View style={styles.pageIndicators}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8C4C4',
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
  gradient: {
    flex: 1,
    backgroundColor: '#E8C4C4',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    width: width * 0.8,
    height: height * 0.5,
    position: 'relative',
  },
  geometricBlock: {
    position: 'absolute',
    backgroundColor: '#D4A5A5',
    opacity: 0.8,
  },
  block1: {
    width: 96,
    height: 160,
    top: 64,
    left: 48,
    transform: [{ rotate: '12deg' }],
  },
  block2: {
    width: 80,
    height: 128,
    top: 80,
    right: 32,
    transform: [{ rotate: '-6deg' }],
  },
  block3: {
    width: 64,
    height: 96,
    bottom: 64,
    left: 64,
    transform: [{ rotate: '45deg' }],
  },
  pencil: {
    position: 'absolute',
  },
  pencil1: {
    top: 32,
    left: 32,
    transform: [{ rotate: '45deg' }],
  },
  pencil2: {
    top: 16,
    left: width * 0.4 - 6,
  },
  pencil3: {
    top: 128,
    right: 48,
  },
  pencil4: {
    bottom: 32,
    right: 16,
    transform: [{ rotate: '-12deg' }],
  },
  pencil5: {
    bottom: 64,
    left: 24,
    transform: [{ rotate: '25deg' }],
  },
  pencilBody: {
    width: 128,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  pencilTip: {
    position: 'absolute',
    left: -8,
    top: 0,
    width: 24,
    height: 12,
    borderRadius: 6,
  },
  pencilTipPoint: {
    position: 'absolute',
    left: -12,
    top: 2,
    width: 8,
    height: 8,
    backgroundColor: '#654321',
    borderRadius: 4,
  },
  pencilText: {
    position: 'absolute',
    top: -2,
    left: 16,
    fontSize: 8,
    color: '#666',
    fontWeight: '600',
  },
  bottomContent: {
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 24,
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
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
});

export default OnboardingScreen;