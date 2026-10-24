import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import HeaderNav from './HeaderNav';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const promo1 = require('../assets/images/campaña2/promo_1.png');
const promo2 = require('../assets/images/campaña2/promo_2.png');
const promo3 = require('../assets/images/campaña2/promo_3.png');
const promo4 = require('../assets/images/campaña2/promo_4.png');
const promo5 = require('../assets/images/campaña2/promo_5.png');

const slideAssets = [promo1, promo2, promo3, promo4, promo5];

// Arte line-art sobre blanco → marco "print" crema sobre el fondo oscuro.
const ART_PRINT_BG = '#F4EFE3';

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

type SlideCopy = {
  title: string;
  text: string;
};

type GalleryCopy = {
  title: string;
  subtitle: string;
  mainTitle: string;
  mainSubtitle: string;
  slides: SlideCopy[];
};

const galleryCopy: Record<LanguageCode, GalleryCopy> = {
  es: {
    title: 'Galería',
    subtitle:
      'Rundi en la vida real: salidas de noche, universidad, trabajo y familia. Un mismo conductor designado para cada escenario.',
    mainTitle: 'Para cada plan, un Rundi.',
    mainSubtitle: 'Escenarios reales en Nicaragua',
    slides: [
      { title: 'Noches que terminan bien', text: 'Tu conductor te espera a la salida.' },
      { title: 'De la U a casa', text: 'Traslados seguros para estudiantes.' },
      { title: 'Planes con amigos', text: 'Todos llegan; nadie maneja cansado.' },
      { title: 'Días de trabajo', text: 'Movilidad confiable para tu agenda.' },
      { title: 'Para toda la familia', text: 'Viajes tranquilos para todos.' },
    ],
  },
  en: {
    title: 'Gallery',
    subtitle:
      'Rundi in real life: nights out, campus, work and family. One designated driver for every scenario.',
    mainTitle: 'A Rundi for every plan.',
    mainSubtitle: 'Real scenarios in Nicaragua',
    slides: [
      { title: 'Nights that end well', text: 'Your driver is waiting outside.' },
      { title: 'Campus to home', text: 'Safe rides for students.' },
      { title: 'Plans with friends', text: 'Everyone gets home; nobody drives tired.' },
      { title: 'Work days', text: 'Reliable mobility for your schedule.' },
      { title: 'For the whole family', text: 'Calm rides for everyone.' },
    ],
  },
  zh: {
    title: '图库',
    subtitle: 'Rundi 融入真实生活：夜晚出行、校园、工作与家庭，每个场景都有指定司机。',
    mainTitle: '每种计划，都有 Rundi。',
    mainSubtitle: '尼加拉瓜的真实出行场景',
    slides: [
      { title: '安心夜归', text: '司机在出口等你。' },
      { title: '从校园到家', text: '为学生提供安全接送。' },
      { title: '朋友聚会', text: '人人平安到家，无人疲劳驾驶。' },
      { title: '工作日', text: '为你的日程提供可靠出行。' },
      { title: '全家适用', text: '人人安心出行。' },
    ],
  },
};

const GalleryScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4200, stopOnInteraction: false })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => {
      setSlideCount(emblaApi.scrollSnapList().length);
      onSelect();
    };
    onInit();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInit);
    };
  }, [emblaApi]);

  const { colors: themeColors, language } = useThemeLanguage();
  const copy = galleryCopy[language];

  const slides = slideAssets.map((asset, index) => ({
    key: `promo-${index}`,
    source: toImageSource(asset),
    title: copy.slides[index]?.title ?? '',
    text: copy.slides[index]?.text ?? '',
  }));

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
            <Text style={[styles.mainSubtitle, { color: themeColors.textSecondary }]}>
              {copy.mainSubtitle}
            </Text>

            <View style={styles.carouselWrap}>
              <div ref={emblaRef} style={emblaViewportStyle}>
                <div style={emblaContainerStyle}>
                  {slides.map((slide) => (
                    <div
                      key={slide.key}
                      style={{
                        ...emblaSlideStyle,
                        flex: isNarrow ? '0 0 82%' : '0 0 44%',
                      }}
                    >
                      <div
                        style={{
                          ...slideFrameStyle,
                          border: `1px solid ${themeColors.goldBorder}`,
                        }}
                      >
                        <Image
                          source={slide.source}
                          style={styles.slideImage as any}
                          resizeMode="contain"
                        />
                      </div>
                      <Text style={[styles.slideTitle, { color: themeColors.text }]}>
                        {slide.title}
                      </Text>
                      <Text style={[styles.slideText, { color: themeColors.textSecondary }]}>
                        {slide.text}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  styles.arrowLeft,
                  { backgroundColor: themeColors.surface, borderColor: themeColors.border },
                ]}
                activeOpacity={0.85}
                onPress={() => emblaApi?.scrollPrev()}
              >
                <ChevronLeft size={20} color={themeColors.text} strokeWidth={2.2} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.arrowButton,
                  styles.arrowRight,
                  { backgroundColor: themeColors.surface, borderColor: themeColors.border },
                ]}
                activeOpacity={0.85}
                onPress={() => emblaApi?.scrollNext()}
              >
                <ChevronRight size={20} color={themeColors.text} strokeWidth={2.2} />
              </TouchableOpacity>

              <View style={styles.dotsRow}>
                {Array.from({ length: slideCount }).map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dot,
                      { backgroundColor: themeColors.border },
                      index === selectedIndex && { backgroundColor: themeColors.gold },
                    ]}
                    activeOpacity={0.85}
                    onPress={() => emblaApi?.scrollTo(index)}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const emblaViewportStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100%',
};

const emblaContainerStyle: React.CSSProperties = {
  display: 'flex',
};

const emblaSlideStyle: React.CSSProperties = {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
};

const slideFrameStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: ART_PRINT_BG,
  borderRadius: 18,
  padding: 14,
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
    width: '100%',
  },
  title: {
    fontSize: typography.heroTitle,
    fontWeight: '800',
    fontFamily: typography.fontDisplay,
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
    fontFamily: typography.fontDisplay,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  carouselWrap: {
    marginTop: 18,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: 320,
  },
  slideTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: typography.fontDisplay,
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  slideText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: 150,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  arrowLeft: {
    left: 6,
  },
  arrowRight: {
    right: 6,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: colors.border,
  },
});

export default GalleryScreen;
