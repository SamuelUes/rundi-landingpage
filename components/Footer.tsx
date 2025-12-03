import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.brand}>Rundi</Text>
          <Text style={styles.text}>
            Movilidad segura y conductor designado para Nicaragua.
          </Text>
          <Text style={styles.disclaimer}>Servicio disponible únicamente en Nicaragua.</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.techLine}>
            Construido con React Native, Firebase, Supabase, Bancos Locales y más.
          </Text>
          <Text style={styles.copy}>© {year} Rundi. Todos los derechos reservados.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: layout.horizontalPadding,
    backgroundColor: colors.surface,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
  },
  left: {
    flex: 1,
    minWidth: 240,
    marginBottom: 10,
    paddingRight: 16,
  },
  right: {
    flex: 1,
    minWidth: 240,
  },
  brand: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gold,
    marginBottom: 4,
  },
  text: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  techLine: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  copy: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});

export default Footer;
