import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Animated } from 'react-native';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TripTrackingSection from './components/TripTrackingSection';
import AvailabilitySection from './components/AvailabilitySection';
import TechStackSection from './components/TechStackSection';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';
import { useThemeLanguage } from './theme/ThemeContext';
import { layout } from './theme/layout';

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { colors, theme } = useThemeLanguage();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Animated.ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
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
    // background color se aplica vía contexto
  },
  scrollContent: {
    flexGrow: 1,
    // background color se aplica vía contexto
    paddingVertical: layout.sectionVerticalPadding,
  },
});

export default App;
