import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, MapPin, Route, ShieldCheck } from 'lucide-react';
import { colors, gradients } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
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

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const buttonSpring = { type: 'spring', stiffness: 400, damping: 24 } as const;

const gridPatternStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
  backgroundSize: '46px 46px',
  maskImage: 'radial-gradient(ellipse 90% 75% at 50% 0%, black 30%, transparent 100%)',
  WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 0%, black 30%, transparent 100%)',
  pointerEvents: 'none',
};

const bloomStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-10%',
  left: '52%',
  width: '58%',
  height: '75%',
  background: 'radial-gradient(closest-side, rgba(212,175,55,0.15), transparent)',
  filter: 'blur(30px)',
  pointerEvents: 'none',
};

const HeroSection: React.FC = () => {
  const heroRSource: any = toImageSource(heroRAsset as any);
  const { colors: themeColors, language } = useThemeLanguage();
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;
  const copy = heroCopy[language];
  const reduceMotion = useReducedMotion();
  const titleParts = copy.title.split('Rundi');

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: themeColors.background },
        !isNarrow && ({ minHeight: '78vh' } as any),
      ]}
    >
      <div style={gridPatternStyle} />
      <div style={bloomStyle} />

      <View style={styles.container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ flex: 1.15, minWidth: 300, paddingRight: 24 }}
        >
          <motion.div variants={itemVariants}>
            <View
              style={[
                styles.eyebrow,
                { backgroundColor: themeColors.goldSoft, borderColor: themeColors.goldBorder },
              ]}
            >
              <View style={[styles.eyebrowDot, { backgroundColor: themeColors.gold }]} />
              <Text style={[styles.eyebrowText, { color: themeColors.goldLight }]}>
                {copy.subtitle}
              </Text>
            </View>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text
              style={[
                styles.title,
                { color: themeColors.text },
                { fontSize: isNarrow ? 36 : 56, lineHeight: isNarrow ? 42 : 62 },
              ]}
            >
              {titleParts[0]}
              <Text style={{ color: themeColors.gold }}>Rundi</Text>
              {titleParts[1] ?? ''}
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <ShieldCheck size={13} color="#000" strokeWidth={2.2} style={{ marginRight: 5 }} />
                <Text style={styles.badgeText}>{copy.primaryBadge}</Text>
              </View>
              <View
                style={[
                  styles.badgeOutline,
                  { backgroundColor: themeColors.goldSoft, borderColor: themeColors.goldBorder },
                ]}
              >
                <Route size={13} color={themeColors.gold} strokeWidth={2.2} style={{ marginRight: 5 }} />
                <Text style={[styles.badgeOutlineText, { color: themeColors.goldLight }]}>
                  {copy.secondaryBadge}
                </Text>
              </View>
            </View>
          </motion.div>

          <motion.div variants={itemVariants}>
            <View style={styles.actionsRow}>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={buttonSpring}
                style={{ marginRight: 10, marginBottom: 10, display: 'flex' }}
              >
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundImage: gradients.gold } as any]}
                  activeOpacity={0.85}
                >
                  <Download size={15} color="#000" style={{ marginRight: 7 }} />
                  <Text style={styles.primaryButtonText}>{copy.primaryCta}</Text>
                </TouchableOpacity>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={buttonSpring}
                style={{ marginBottom: 10, display: 'flex' }}
              >
                <TouchableOpacity
                  style={[styles.secondaryButton, { borderColor: themeColors.goldBorder }]}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.secondaryButtonText, { color: themeColors.text }]}>
                    {copy.secondaryCta}
                  </Text>
                  <ArrowRight size={15} color={themeColors.gold} style={{ marginLeft: 7 }} />
                </TouchableOpacity>
              </motion.div>
            </View>
          </motion.div>

          <motion.div variants={itemVariants}>
            <View style={styles.noteRow}>
              <MapPin size={12} color={themeColors.textSecondary} style={{ marginRight: 5 }} />
              <Text style={[styles.locationNote, { color: themeColors.textSecondary }]}>
                {copy.locationNote}
              </Text>
            </View>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            minWidth: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginTop: isNarrow ? 28 : 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(closest-side, rgba(212,175,55,0.34), transparent)',
              filter: 'blur(26px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 460,
              height: 460,
              borderRadius: 230,
              border: '1px solid rgba(212, 175, 55, 0.22)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <View
              style={[
                styles.posterFrame,
                { backgroundColor: '#F4EFE3', borderColor: themeColors.goldBorder },
              ]}
            >
              <Image source={heroRSource} style={styles.posterImage as any} resizeMode="contain" />
            </View>
          </motion.div>
        </motion.div>
      </View>

      {!isNarrow && !reduceMotion && (
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 18, left: '50%', marginLeft: -9 }}
        >
          <ArrowDown size={18} color={themeColors.textSecondary} />
        </motion.div>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: layout.horizontalPadding,
    marginBottom: layout.sectionVerticalPadding,
    backgroundColor: colors.background,
    paddingTop: 64,
    paddingBottom: 110,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
    width: '100%',
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 26,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 7,
  },
  eyebrowText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
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
  title: {
    fontWeight: '800',
    fontFamily: typography.fontDisplay,
    letterSpacing: -1.4,
    color: colors.text,
    marginBottom: 24,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  badge: {
    backgroundColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  badgeOutline: {
    borderWidth: 1,
    borderColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeOutlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gold,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    borderColor: colors.gold,
    borderWidth: 1,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationNote: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  posterFrame: {
    width: '100%',
    maxWidth: 480,
    aspectRatio: 1152 / 896,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
});

export default HeroSection;
