import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SectionHeader from './SectionHeader';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const coverageAsset = require('../assets/images/camapaña/ride_2.png');

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
  const { theme, language } = useThemeLanguage();
  const isDark = theme === 'dark';
  const copy = availabilityCopy[language];
  return (
    <View style={styles.root}>
      <SectionHeader
        title={copy.headerTitle}
        subtitle={copy.headerSubtitle}
        align="center"
      />

      <View style={[styles.band, isDark && styles.bandDark]}>
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.cardContentRow}>
            <View style={styles.textColumn}>
              <Text style={styles.tag}>{copy.tag}</Text>
              <Text style={styles.title}>{copy.cardTitle}</Text>
              <Text style={styles.text}>{copy.body}</Text>
              <Text style={styles.cities}>{copy.cities}</Text>
            </View>
            <View style={styles.imageColumn}>
              <View style={styles.imageFrame}>
                <Image
                  source={coverageSource}
                  style={styles.coverageImage as any}
                  resizeMode="contain"
                />
              </View>
            </View>
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
  band: {
    marginTop: 8,
    paddingVertical: 24,
  },
  bandDark: {
    // banda ligeramente más clara que el fondo global para suavizar el contraste
    backgroundColor: '#111827',
  },
  card: {
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  cardDark: {
    borderColor: 'rgba(148,163,184,0.35)',
    backgroundColor: '#f9fafb',
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
  textColumn: {
    flex: 1,
    minWidth: 220,
    paddingRight: 12,
  },
  imageColumn: {
    flex: 2,
    minWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  imageFrame: {
    width: '100%',
    height: '100%',
    maxWidth: 320,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  coverageImage: {
    width: '100%',
    height: '100%',
  },
  tag: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '600',
    color: colors.goldLight,
    marginBottom: 6,
  },
  title: {
    fontSize: typography.sectionTitle,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
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
