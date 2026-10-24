import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { colors, gradients } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const year = new Date().getFullYear();

type FooterCopy = {
  main: string;
  disclaimer: string;
  linksTitle: string;
  links: { label: string; path: string }[];
  techLine: string;
  copy: string;
};

const footerCopy: Record<LanguageCode, FooterCopy> = {
  es: {
    main: 'Movilidad segura y conductor designado para Nicaragua.',
    disclaimer: 'Servicio disponible únicamente en Nicaragua.',
    linksTitle: 'Producto',
    links: [
      { label: 'Tracking', path: '/tracking' },
      { label: 'Galería', path: '/galeria' },
      { label: 'Contacto', path: '/contacto' },
      { label: 'Términos', path: '/terminos' },
    ],
    techLine: 'Construido con React Native, Firebase, Supabase, Bancos Locales y más.',
    copy: 'Todos los derechos reservados.',
  },
  en: {
    main: 'Safe mobility and designated driver service for Nicaragua.',
    disclaimer: 'Service available only in Nicaragua.',
    linksTitle: 'Product',
    links: [
      { label: 'Tracking', path: '/tracking' },
      { label: 'Gallery', path: '/galeria' },
      { label: 'Contact', path: '/contacto' },
      { label: 'Terms', path: '/terminos' },
    ],
    techLine: 'Built with React Native, Firebase, Supabase, local banks and more.',
    copy: 'All rights reserved.',
  },
  zh: {
    main: '为尼加拉瓜提供安全出行与指定司机服务。',
    disclaimer: '目前服务仅在尼加拉瓜提供。',
    linksTitle: '产品',
    links: [
      { label: '行程追踪', path: '/tracking' },
      { label: '图库', path: '/galeria' },
      { label: '联系', path: '/contacto' },
      { label: '条款', path: '/terminos' },
    ],
    techLine: '基于 React Native、Firebase、Supabase、本地银行等技术构建。',
    copy: '保留所有权利。',
  },
};

const Footer: React.FC = () => {
  const { colors: themeColors, language } = useThemeLanguage();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const isNarrow = width < 768;
  const copy = footerCopy[language];

  return (
    <View style={[styles.root, { backgroundColor: themeColors.background }]}>
      <div style={{ height: 1, width: '100%', background: gradients.goldHairline }} />
      <View style={[styles.container, isNarrow && styles.containerNarrow]}>
        <View style={[styles.left, isNarrow && styles.leftNarrow]}>
          <Text style={[styles.brand, { color: themeColors.gold }]}>Rundi</Text>
          <Text style={[styles.text, { color: themeColors.textSecondary }]}>{copy.main}</Text>
          <View style={styles.disclaimerRow}>
            <MapPin
              size={12}
              color={themeColors.textSecondary}
              strokeWidth={2.2}
              style={{ marginRight: 5 }}
            />
            <Text style={[styles.disclaimer, { color: themeColors.textSecondary }]}>
              {copy.disclaimer}
            </Text>
          </View>
        </View>

        <View style={[styles.middle, isNarrow && styles.middleNarrow]}>
          <Text style={[styles.columnTitle, { color: themeColors.gold }]}>{copy.linksTitle}</Text>
          {copy.links.map((link) => (
            <TouchableOpacity
              key={link.path}
              activeOpacity={0.7}
              onPress={() => router.push(link.path)}
              style={styles.linkItem}
            >
              <Text style={[styles.linkText, { color: themeColors.textSecondary }]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.right, isNarrow && styles.rightNarrow]}>
          <Text style={[styles.techLine, { color: themeColors.textSecondary }]}>{copy.techLine}</Text>
          <Text style={[styles.copy, { color: themeColors.textSecondary }]}>
            {year} Rundi. {copy.copy}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingBottom: 24,
    paddingHorizontal: layout.horizontalPadding,
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: layout.contentMaxWidth,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 28,
  },
  containerNarrow: {
    flexDirection: 'column',
  },
  left: {
    flex: 1.4,
    minWidth: 240,
    marginBottom: 16,
    paddingRight: 16,
  },
  leftNarrow: {
    paddingRight: 0,
  },
  middle: {
    flex: 0.8,
    minWidth: 160,
    marginBottom: 16,
  },
  middleNarrow: {
    marginTop: 4,
  },
  right: {
    flex: 1,
    minWidth: 240,
  },
  rightNarrow: {
    marginTop: 8,
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: typography.fontDisplay,
    letterSpacing: -0.4,
    color: colors.gold,
    marginBottom: 6,
  },
  text: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disclaimer: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  columnTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 10,
  },
  linkItem: {
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  techLine: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  copy: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});

export default Footer;
