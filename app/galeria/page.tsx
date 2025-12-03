'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import GalleryScreen from '../../components/GalleryScreen';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import HeaderNav from '../../components/HeaderNav';

export default function GalleryPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, 350);

    return () => clearTimeout(timeout);
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={colors.gold} />
          <Text style={styles.loadingText}>Cargando Rundi…</Text>
        </View>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex' }}>
      <GalleryScreen />
    </div>
  );
}

const styles = StyleSheet.create({
  loadingCard: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
});
