import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import HeaderNav from './HeaderNav';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const clientHomeProto = require('../assets/images/prototipe_phones/clienthome_prototipe.png');
const driverHomeProto = require('../assets/images/prototipe_phones/driverhome_prototipe.png');
const availableProto = require('../assets/images/prototipe_phones/available_prototipe.png');
const activeRideProto = require('../assets/images/prototipe_phones/activeride_prototipe.png');

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

type GalleryCopy = {
  title: string;
  subtitle: string;
  mainTitle: string;
  mainSubtitle: string;
  secondary1Title: string;
  secondary1Text: string;
  secondary2Title: string;
  secondary2Text: string;
};

const galleryCopy: Record<LanguageCode, GalleryCopy> = {
  es: {
    title: 'Galería',
    subtitle:
      'Una vista rápida de cómo se ve Rundi en acción: seguimiento en tiempo real, viajes multi-destino y una interfaz pensada para la realidad de Nicaragua.',
    mainTitle: 'Diseñado para ti.',
    mainSubtitle: 'Diseñado para usuarios y para conductores',
    secondary1Title: 'Seguimiento en tiempo real',
    secondary1Text: 'Vista de mapa en vivo para tus viajes.',
    secondary2Title: 'Viaje en curso',
    secondary2Text: 'Detalle visual de un viaje activo con puntos de ruta.',
  },
  en: {
    title: 'Gallery',
    subtitle:
      'A quick look at how Rundi works in action: real-time tracking, multi-destination trips and an interface designed for the reality of Nicaragua.',
    mainTitle: 'Designed for you.',
    mainSubtitle: 'Built for riders and drivers',
    secondary1Title: 'Real-time tracking',
    secondary1Text: 'Live map view for your trips.',
    secondary2Title: 'Trip in progress',
    secondary2Text: 'Visual detail of an active trip with route points.',
  },
  zh: {
    title: '图库',
    subtitle:
      '快速浏览 Rundi 的实际体验：实时行程追踪、多目的地行程，以及为尼加拉瓜场景设计的界面。',
    mainTitle: '为你而生。',
    mainSubtitle: '同时为乘客与司机优化的体验',
    secondary1Title: '实时行程追踪',
    secondary1Text: '为你的行程提供实时地图视图。',
    secondary2Title: '进行中的行程',
    secondary2Text: '展示带有路线节点的行程详情。',
  },
};

const GalleryScreen: React.FC = () => {
  const clientHomeSource: any = toImageSource(clientHomeProto as any);
  const availableSource: any = toImageSource(availableProto as any);
  const driverHomeSource: any = toImageSource(driverHomeProto as any);
  const activeRideSource: any = toImageSource(activeRideProto as any);

  const [hoveredTop, setHoveredTop] = useState<'client' | 'driver' | null>(null);
  const [hoveredBottom, setHoveredBottom] = useState<'available' | 'active' | null>(null);

  const { colors: themeColors, language } = useThemeLanguage();
  const copy = galleryCopy[language];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}> 
      <HeaderNav />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: themeColors.background }]}
        bounces={false}
      >
        <View style={styles.container}>
          <Text style={[styles.title, { color: themeColors.text }]}>{copy.title}</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{copy.subtitle}</Text>

          <View
            style={[
              styles.mainCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}
          >
            <Text style={[styles.mainTitle, { color: themeColors.text }]}>{copy.mainTitle}</Text>
            <Text style={[styles.mainSubtitle, { color: themeColors.textSecondary }]}>{copy.mainSubtitle}</Text>

            <View style={styles.prototypesRow}>
              <Pressable
                onHoverIn={() => setHoveredTop('client')}
                onHoverOut={() => {
                  setHoveredTop((prev) => (prev === 'client' ? null : prev));
                }}
                style={[
                  styles.prototypeSlot,
                  hoveredTop === 'client' && styles.prototypeSlotExpanded,
                  hoveredTop === 'driver' && styles.prototypeSlotShrunk,
                ]}
              >
                <Image source={clientHomeSource} style={styles.prototypeImage as any} resizeMode="contain" />
              </Pressable>

              <Pressable
                onHoverIn={() => setHoveredTop('driver')}
                onHoverOut={() => {
                  setHoveredTop((prev) => (prev === 'driver' ? null : prev));
                }}
                style={[
                  styles.prototypeSlot,
                  hoveredTop === 'driver' && styles.prototypeSlotExpanded,
                  hoveredTop === 'client' && styles.prototypeSlotShrunk,
                ]}
              >
                <Image source={driverHomeSource} style={styles.prototypeImage as any} resizeMode="contain" />
              </Pressable>
            </View>
          </View>

          <View style={styles.secondaryRow}>
            <Pressable
              onHoverIn={() => setHoveredBottom('available')}
              onHoverOut={() => {
                setHoveredBottom((prev) => (prev === 'available' ? null : prev));
              }}
              style={[
                styles.secondaryCard,
                hoveredBottom === 'available' && styles.secondaryCardExpanded,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}
            >
              <Image source={availableSource} style={styles.secondaryImage as any} resizeMode="contain" />
              <View style={styles.secondaryOverlay}>
                <Text style={[styles.secondaryTitle, { color: themeColors.text }]}>{copy.secondary1Title}</Text>
                <Text style={[styles.secondaryText, { color: themeColors.textSecondary }]}>{copy.secondary1Text}</Text>
              </View>
            </Pressable>

            <Pressable
              onHoverIn={() => setHoveredBottom('active')}
              onHoverOut={() => {
                setHoveredBottom((prev) => (prev === 'active' ? null : prev));
              }}
              style={[
                styles.secondaryCard,
                hoveredBottom === 'active' && styles.secondaryCardExpanded,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}
            >
              <Image source={activeRideSource} style={styles.secondaryImage as any} resizeMode="contain" />
              <View style={styles.secondaryOverlay}>
                <Text style={[styles.secondaryTitle, { color: themeColors.text }]}>{copy.secondary2Title}</Text>
                <Text style={[styles.secondaryText, { color: themeColors.textSecondary }]}>{copy.secondary2Text}</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingVertical: layout.sectionVerticalPadding,
  },
  container: {
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: layout.horizontalPadding,
  },
  title: {
    fontSize: typography.heroTitle,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.heroSubtitle,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 18,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  prototypesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    height: 360,
    paddingHorizontal: 8,
  },
  prototypeSlot: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prototypeSlotExpanded: {
    flex: 4,
    transform: [{ scale: 1.06 }],
  },
  prototypeSlotShrunk: {
    flex: 1,
    transform: [{ scale: 0.94 }],
  },
  prototypeImage: {
    width: '100%',
    height: '100%',
  },
  secondaryRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 8,
  },
  secondaryCard: {
    flex: 1,
    minHeight: 220,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginRight: 12,
  },
  secondaryCardExpanded: {
    flex: 3,
    transform: [{ scaleY: 1.06 }],
  },
  secondaryImage: {
    width: '100%',
    height: 180,
  },
  secondaryOverlay: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  secondaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  secondaryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default GalleryScreen;
