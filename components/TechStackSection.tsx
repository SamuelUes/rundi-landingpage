import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import SectionHeader from './SectionHeader';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { reactLogo, expoLogo, firebaseLogo, gcpLogo, supabaseLogo } from '../assets/techs';

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
        duration: 12000,
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

  return (
    <View style={styles.root}>
      <View style={styles.headerWrapper}>
        <SectionHeader
          title="Tecnología Solida, Experiencia Fluida"
          subtitle="Una arquitectura moderna y segura para ofrecer la mejor experiencia."
          align="center"
        />
      </View>

      <View style={styles.marqueeContainer}>
        <View style={styles.marqueeMask}>
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
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    // franja gris translúcida detrás de los logos
    backgroundColor: 'rgba(56, 56, 99, 0.29)',
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
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  marqueeIcon: {
    height: 28,
  },
  logoReact: {
    width: 120,
    height: 120,
  },
  logoExpo: {
    width: 200,
    height: 140,
  },
  logoFirebase: {
    width: 180,
    height: 140,
  },
  logoGcp: {
    width: 340,
    height: 160,
  },
  logoSupabase: {
    width: 120,
    height: 120,
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
