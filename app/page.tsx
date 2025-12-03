'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import App from '../App';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function Page() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Pequeño delay para evitar el flash de HTML sin estilos al hidratar
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

  return <App />;
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
