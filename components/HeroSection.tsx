import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { logo } from '../assets/map_icons';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const heroRAsset = require('../assets/images/campaña2/poster_1.png');

type HeroCopy = {
  title: string;
  subtitle: string;
  primaryBadge: string;
  secondaryBadge: string;
  primaryCta: string;
  secondaryCta: string;
  locationNote: string;
};

const heroCopy: Record<LanguageCode, HeroCopy> = {
  es: {
    title: 'Todo en un solo lugar, Todo siempre con Rundi!',
    subtitle: 'Ya en Managua Nicaragua!!',
    primaryBadge: 'Conductor designado',
    secondaryBadge: 'Viajes multi-destino',
    primaryCta: 'Descargar app',
    secondaryCta: 'Ver cómo funciona',
    locationNote: 'Disponible solo en Nicaragua.',
  },
  en: {
    title: 'Everything in one place, always with Rundi!',
    subtitle: 'Now available in Managua, Nicaragua!',
    primaryBadge: 'Designated driver',
    secondaryBadge: 'Multi-destination trips',
    primaryCta: 'Download app',
    secondaryCta: 'See how it works',
    locationNote: 'Available only in Nicaragua.',
  },
  zh: {
    title: '一切尽在 Rundi，一键安心出行！',
    subtitle: '现已登陆尼加拉瓜马那瓜！',
    primaryBadge: '指定司机',
    secondaryBadge: '多目的地行程',
    primaryCta: '下载应用',
    secondaryCta: '了解如何运作',
    locationNote: '目前服务仅在尼加拉瓜提供。',
  },
};

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
  const { colors: themeColors, language } = useThemeLanguage();
  const copy = heroCopy[language];
  return (
    <View style={[styles.root, { backgroundColor: themeColors.background }]}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.logoRow}>
            {/*<Image source={logoSource} style={styles.logo as any} resizeMode="contain" />*/}
          </View>

          <Text style={[styles.title, { color: themeColors.text }]}>{copy.title}</Text>

          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{copy.subtitle}</Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{copy.primaryBadge}</Text>
            </View>
            <View style={styles.badgeOutline}>
              <Text style={styles.badgeOutlineText}>{copy.secondaryBadge}</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
              <Text style={styles.primaryButtonText}>{copy.primaryCta}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
              <Text style={[styles.secondaryButtonText, { color: themeColors.text }]}>
                {copy.secondaryCta}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.locationNote, { color: themeColors.textSecondary }]}>
            {copy.locationNote}
          </Text>
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
    backgroundColor: colors.background,
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
    width: 400,
    height: 400,
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
