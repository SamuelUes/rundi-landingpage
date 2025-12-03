import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Animated } from 'react-native';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TripTrackingSection from './components/TripTrackingSection';
import AvailabilitySection from './components/AvailabilitySection';
import TechStackSection from './components/TechStackSection';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';
import { colors } from './theme/colors';
import { layout } from './theme/layout';

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <HeaderNav />
        <HeroSection />
        <FeaturesSection scrollY={scrollY} />
        <TripTrackingSection scrollY={scrollY} />
        <AvailabilitySection scrollY={scrollY} />
        <TechStackSection scrollY={scrollY} />
        <Footer />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingVertical: layout.sectionVerticalPadding,
  },
});

export default App;
