import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { logo } from '../assets/map_icons';

const heroRAsset = require('../assets/images/icons/icon_effect.png');

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

const HeroSection: React.FC = () => {
  const logoSource: any = toImageSource(logo as any);
  const heroRSource: any = toImageSource(heroRAsset as any);
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.logoRow}>
            <Image source={logoSource} style={styles.logo as any} resizeMode="contain" />
          </View>

          <Text style={styles.title}>
           Todo en un solo lugar, Todo siempre con Rundi!
          </Text>

          <Text style={styles.subtitle}>
            Ya en Managua Nicaragua!!
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Conductor designado</Text>
            </View>
            <View style={styles.badgeOutline}>
              <Text style={styles.badgeOutlineText}>Viajes multi-destino</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
              <Text style={styles.primaryButtonText}>Descargar app</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
              <Text style={styles.secondaryButtonText}>Ver cómo funciona</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.locationNote}>Disponible solo en Nicaragua.</Text>
        </View>

        <View style={styles.right}>
          <View style={styles.phoneMock}>
            <Image source={heroRSource} style={styles.phoneImage as any} resizeMode="contain" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: layout.horizontalPadding,
    marginBottom: layout.sectionVerticalPadding,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
  },
  left: {
    flex: 1,
    minWidth: 280,
    paddingRight: 16,
    marginBottom: 24,
  },
  right: {
    flex: 1,
    minWidth: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 150,
    height: 90,
    marginRight: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gold,
  },
  title: {
    fontSize: typography.heroTitle,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: typography.heroSubtitle,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  badgeOutline: {
    borderWidth: 1,
    borderColor: colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeOutlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gold,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    borderColor: colors.gold,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  locationNote: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  phoneMock: {
    width: 250,
    height: 250,
    borderRadius: 32,
    overflow: 'hidden',
   // backgroundColor: 'rgba(28, 55, 129, 0.04)',
   // borderColor: colors.gold,
   // borderWidth: 1,
  },
  phoneImage: {
    width: '100%',
    height: '100%',
  },
  phoneOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  phoneOverlayTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.goldLight,
    marginBottom: 4,
  },
  phoneOverlayText: {
    fontSize: 11,
    color: colors.text,
    lineHeight: 16,
  },
});

export default HeroSection;
