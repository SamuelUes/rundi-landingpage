import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { reactLogo, expoLogo, firebaseLogo, gcpLogo, supabaseLogo } from '../assets/techs';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

type TechGroup = {
  title: string;
  items: string[];
};

const groups: TechGroup[] = [
  {
    title: 'Tecnologías',
    items: ['React', 'Expo', 'Firebase', 'Google Cloud Platform', 'Supabase'],
  },
];

const techItems: string[] = groups.flatMap((group) => group.items);

type TechStackCopy = {
  title: string;
  subtitle: string;
};

const techCopy: Record<LanguageCode, TechStackCopy> = {
  es: {
    title: 'Tecnología Sólida, Experiencia Fluida',
    subtitle: 'Una arquitectura moderna y segura para ofrecer la mejor experiencia.',
  },
  en: {
    title: 'Solid Technology, Fluid Experience',
    subtitle: 'A modern, secure architecture to deliver the best experience.',
  },
  zh: {
    title: '坚实技术，流畅体验',
    subtitle: '现代且安全的架构，为你提供最佳出行体验。',
  },
};

const getLogoForItem = (item: string): any | null => {
  const name = item.toLowerCase();

  if (name.includes('react')) return reactLogo;
  if (name.includes('expo')) return expoLogo;
  if (name.includes('firebase')) return firebaseLogo;
  if (name.includes('google cloud')) return gcpLogo;
  if (name.includes('supabase')) return supabaseLogo;

  return null;
};

const getLogoStyle = (item: string) => {
  const name = item.toLowerCase();

  if (name.includes('react')) return styles.logoReact;
  if (name.includes('expo')) return styles.logoExpo;
  if (name.includes('firebase')) return styles.logoFirebase;
  if (name.includes('google cloud')) return styles.logoGcp;
  if (name.includes('supabase')) return styles.logoSupabase;

  return styles.marqueeIcon;
};

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

interface TechStackSectionProps {
  scrollY?: Animated.Value;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ scrollY }) => {
  const [offset, setOffset] = useState(0);
  const marqueeAnim = useRef(new Animated.Value(0)).current;
  const [rowWidth, setRowWidth] = useState(0);

  useEffect(() => {
    if (!rowWidth) return;

    marqueeAnim.setValue(0);

    const animation = Animated.loop(
      Animated.timing(marqueeAnim, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [rowWidth, marqueeAnim]);

  const animatedStyle = undefined;

  const marqueeStyle =
    rowWidth > 0
      ? {
          transform: [
            {
              translateX: marqueeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -rowWidth],
              }),
            },
          ],
        }
      : undefined;

  const { theme, language, colors: themeColors } = useThemeLanguage();
  const isDark = theme === 'dark';
  const copy = techCopy[language];

  // Franja clara intencional: los logos están pensados para fondo claro
  // y leen mejor sobre una "cinta" blanca dentro del dark premium.
  const bandBg = isDark ? 'rgba(242,244,248,0.96)' : '#FFFFFF';

  return (
    <View style={[styles.root, { backgroundColor: themeColors.background }]}>
      <View style={styles.headerWrapper}>
        <SectionHeader title={copy.title} subtitle={copy.subtitle} align="center" />
      </View>

      <View style={styles.marqueeContainer}>
        <Reveal delay={0.1}>
        <div style={{ position: 'relative' }}>
        <View
          style={[
            styles.marqueeMask,
            {
              backgroundColor: bandBg,
              borderTopColor: themeColors.border,
              borderBottomColor: themeColors.border,
            },
          ]}
        >
          <Animated.View style={[styles.marqueeTrack, marqueeStyle]}>
            <View
              style={styles.marqueeRow}
              onLayout={(e) => setRowWidth(e.nativeEvent.layout.width)}
            >
              {techItems.map((item, index) => {
                const logoAsset = getLogoForItem(item);
                const logoSource = logoAsset ? toImageSource(logoAsset) : null;

                return (
                  <View key={`row1-${item}-${index}`} style={styles.marqueeItem}>
                    {logoSource ? (
                      <Image
                        source={logoSource}
                        style={[styles.marqueeIcon, getLogoStyle(item)] as any}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.marqueeLabel}>{item}</Text>
                    )}
                  </View>
                );
              })}
            </View>

            <View style={styles.marqueeRow}>
              {techItems.map((item, index) => {
                const logoAsset = getLogoForItem(item);
                const logoSource = logoAsset ? toImageSource(logoAsset) : null;

                return (
                  <View key={`row2-${item}-${index}`} style={styles.marqueeItem}>
                    {logoSource ? (
                      <Image
                        source={logoSource}
                        style={[styles.marqueeIcon, getLogoStyle(item)] as any}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.marqueeLabel}>{item}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          </Animated.View>
        </View>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 90,
            zIndex: 2,
            pointerEvents: 'none',
            background: `linear-gradient(90deg, ${bandBg}, transparent)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 90,
            zIndex: 2,
            pointerEvents: 'none',
            background: `linear-gradient(270deg, ${bandBg}, transparent)`,
          }}
        />
        </div>
        </Reveal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 24,
    marginBottom: layout.sectionVerticalPadding,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    paddingHorizontal: layout.horizontalPadding,
  },
  marqueeContainer: {
    marginTop: 40,
    alignSelf: 'stretch',
    width: '100%',
  },
  marqueeMask: {
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  marqueeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeItem: {
    paddingHorizontal: 34,
    paddingVertical: 22,
  },
  marqueeIcon: {
    height: 58,
  },
  logoReact: {
    width: 58,
    height: 58,
  },
  logoExpo: {
    width: 83,
    height: 58,
  },
  logoFirebase: {
    width: 75,
    height: 58,
  },
  logoGcp: {
    width: 123,
    height: 58,
  },
  logoSupabase: {
    width: 58,
    height: 58,
  },
  marqueeLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginRight: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default TechStackSection;
