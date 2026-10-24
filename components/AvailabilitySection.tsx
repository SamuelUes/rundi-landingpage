import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { MapPin } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const coverageAsset = require('../assets/images/campaña2/safe_ride.png');

type AvailabilityCopy = {
  headerTitle: string;
  headerSubtitle: string;
  tag: string;
  cardTitle: string;
  body: string;
  cities: string;
};

const availabilityCopy: Record<LanguageCode, AvailabilityCopy> = {
  es: {
    headerTitle: 'Construida para ti',
    headerSubtitle: 'Toda la experiencia está optimizada para las ciudades y necesidades de Nicaragua.',
    tag: 'Cobertura',
    cardTitle: 'Disponible solo en Nicaragua',
    body: 'Rundi está diseñada exclusivamente para operar en Nicaragua, adaptando todos los metodos y funcionalidades.',
    cities: 'Foco en Managua y principales ciudades, expandiéndose progresivamente.',
  },
  en: {
    headerTitle: 'Built for you',
    headerSubtitle: 'The whole experience is optimized for Nicaraguan cities and needs.',
    tag: 'Coverage',
    cardTitle: 'Available only in Nicaragua',
    body: 'Rundi is designed exclusively to operate in Nicaragua, adapting all methods and features.',
    cities: 'Focus on Managua and main cities, expanding progressively.',
  },
  zh: {
    headerTitle: '为你而建',
    headerSubtitle: '整体体验针对尼加拉瓜的城市与出行需求进行优化。',
    tag: '覆盖范围',
    cardTitle: '目前仅在尼加拉瓜提供服务',
    body: 'Rundi 专为尼加拉瓜运营而设计，并针对当地习惯调整功能与流程。',
    cities: '重点覆盖马那瓜和主要城市，并将逐步扩展。',
  },
};

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

interface AvailabilitySectionProps {
  scrollY?: any;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ scrollY }) => {
  const coverageSource: any = toImageSource(coverageAsset as any);
  const { theme, language, colors: themeColors } = useThemeLanguage();
  const { width } = useWindowDimensions();
  const isDark = theme === 'dark';
  const isNarrow = width < 900;
  const copy = availabilityCopy[language];
  return (
    <View style={[styles.root, { backgroundColor: themeColors.background }]}>
      <SectionHeader
        title={copy.headerTitle}
        subtitle={copy.headerSubtitle}
        align="center"
      />

      <View style={[styles.band, isDark && styles.bandDark, { backgroundColor: themeColors.background }]}>
        <Reveal style={styles.cardReveal}>
          <View
            style={[
              styles.card,
              isDark && styles.cardDark,
              { borderColor: themeColors.border, backgroundColor: themeColors.surface },
            ]}
          >
          <div style={cardGlowStyle} />
          <View style={[styles.cardContentRow, isNarrow && styles.cardContentColumn]}>
            <View style={[styles.textColumn, isNarrow && styles.textColumnNarrow]}>
              <View
                style={[
                  styles.tagChip,
                  { backgroundColor: themeColors.goldSoft, borderColor: themeColors.goldBorder },
                ]}
              >
                <MapPin size={11} color={themeColors.gold} strokeWidth={2.2} style={{ marginRight: 5 }} />
                <Text style={[styles.tag, { color: themeColors.goldLight }]}>{copy.tag}</Text>
              </View>
              <Text style={[styles.title, { color: themeColors.text }]}>{copy.cardTitle}</Text>
              <Text style={[styles.text, { color: themeColors.textSecondary }]}>{copy.body}</Text>
              <Text style={[styles.cities, { color: themeColors.textSecondary }]}>{copy.cities}</Text>
            </View>
            <View style={[styles.imageColumn, isNarrow && styles.imageColumnNarrow]}>
              <View
                style={[
                  styles.imageFrame,
                  { backgroundColor: '#F4EFE3', borderColor: themeColors.goldBorder },
                ]}
              >
                <Image
                  source={coverageSource}
                  style={styles.coverageImage as any}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          </View>
        </Reveal>
      </View>
    </View>
  );
};

const cardGlowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-30%',
  right: '-8%',
  width: '55%',
  height: '130%',
  background: 'radial-gradient(closest-side, rgba(212, 175, 55, 0.13), transparent)',
  pointerEvents: 'none',
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: layout.horizontalPadding,
    marginBottom: layout.sectionVerticalPadding,
    backgroundColor: colors.background,
  },
  band: {
    marginTop: 8,
    paddingVertical: 24,
  },
  bandDark: {
    // banda ligeramente más clara que el fondo global para suavizar el contraste
    backgroundColor: colors.background,
  },
  cardReveal: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: 34,
    paddingHorizontal: 34,
    overflow: 'hidden',
    position: 'relative',
  },
  cardDark: {
    shadowColor: '#020617',
    shadowOpacity: 0.3,
    shadowRadius: 38,
    shadowOffset: { width: 0, height: 28 },
    elevation: 18,
  },
  cardContentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cardContentColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textColumn: {
    flex: 1,
    minWidth: 220,
    paddingRight: 12,
  },
  textColumnNarrow: {
    paddingRight: 0,
  },
  imageColumn: {
    flex: 2,
    maxWidth: 300,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  imageFrame: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 260,
    aspectRatio: 1,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: colors.card,
    overflow: 'hidden',
    shadowColor: colors.gold,
    shadowOpacity: 0.18,
    shadowRadius: 44,
    shadowOffset: { width: 0, height: 20 },
    elevation: 12,
  },
  imageColumnNarrow: {
    minWidth: 0,
    width: '100%',
    marginTop: 20,
  },
  coverageImage: {
    width: '100%',
    height: '100%',
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 12,
  },
  tag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.goldLight,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: typography.fontDisplay,
    letterSpacing: -0.4,
    color: colors.text,
    marginBottom: 10,
  },
  text: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  cities: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});

export default AvailabilitySection;
