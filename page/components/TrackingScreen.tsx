import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TripTrackingSection from './TripTrackingSection';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

const TrackingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerWrapper}>
        <TripTrackingSection />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerWrapper: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default TrackingScreen;
