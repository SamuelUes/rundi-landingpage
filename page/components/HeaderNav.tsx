'use client';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { usePathname, useRouter } from 'next/navigation';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { logo } from '../assets/map_icons';
import { useThemeLanguage } from '../theme/ThemeContext';

type NavCopy = {
  tracking: string;
  gallery: string;
  contact: string;
  terms: string;
};

const navCopy: Record<'es' | 'en' | 'zh', NavCopy> = {
  es: {
    tracking: 'Tracking',
    gallery: 'Galería',
    contact: 'Contacto',
    terms: 'Términos',
  },
  en: {
    tracking: 'Tracking',
    gallery: 'Gallery',
    contact: 'Contact',
    terms: 'Terms',
  },
  zh: {
    tracking: '行程追踪',
    gallery: '图库',
    contact: '联系',
    terms: '条款',
  },
};

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

const HeaderNav: React.FC = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, language, setLanguage, colors: themeColors } = useThemeLanguage();
  const nav = navCopy[language];

  const brandLogoSource: any = toImageSource(logo as any);

  const goTo = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: themeColors.background, borderBottomColor: themeColors.border },
      ]}
    >
      <View style={[styles.content, isNarrow && styles.contentNarrow]}>
        <TouchableOpacity
          style={styles.brandRow}
          activeOpacity={0.8}
          onPress={() => goTo('/')}
        >
          <Image source={brandLogoSource} style={styles.brandLogo as any} resizeMode="contain" />
        </TouchableOpacity>

        <View style={[styles.rightRow, isNarrow && styles.rightRowNarrow]}>
          <View style={[styles.linksRow, isNarrow && styles.linksRowNarrow]}>
            <TouchableOpacity
              style={[
                styles.linkButton,
                isActive('/tracking') && styles.linkButtonActive,
                isNarrow && styles.linkButtonNarrow,
              ]}
              activeOpacity={0.85}
              onPress={() => goTo('/tracking')}
            >
              <Text
                style={[
                  styles.linkText,
                  { color: themeColors.textSecondary },
                  isActive('/tracking') && styles.linkTextActive,
                  isActive('/tracking') && { color: themeColors.text },
                ]}
              >
                {nav.tracking}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.linkButton,
                isActive('/galeria') && styles.linkButtonActive,
                isNarrow && styles.linkButtonNarrow,
              ]}
              activeOpacity={0.85}
              onPress={() => goTo('/galeria')}
            >
              <Text
                style={[
                  styles.linkText,
                  { color: themeColors.textSecondary },
                  isActive('/galeria') && styles.linkTextActive,
                  isActive('/galeria') && { color: themeColors.text },
                ]}
              >
                {nav.gallery}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.linkButton,
                isActive('/contacto') && styles.linkButtonActive,
                isNarrow && styles.linkButtonNarrow,
              ]}
              activeOpacity={0.85}
              onPress={() => goTo('/contacto')}
            >
              <Text
                style={[
                  styles.linkText,
                  { color: themeColors.textSecondary },
                  isActive('/contacto') && styles.linkTextActive,
                  isActive('/contacto') && { color: themeColors.text },
                ]}
              >
                {nav.contact}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.linkButton,
                isActive('/terminos') && styles.linkButtonActive,
                isNarrow && styles.linkButtonNarrow,
              ]}
              activeOpacity={0.85}
              onPress={() => goTo('/terminos')}
            >
              <Text
                style={[
                  styles.linkText,
                  { color: themeColors.textSecondary },
                  isActive('/terminos') && styles.linkTextActive,
                  isActive('/terminos') && { color: themeColors.text },
                ]}
              >
                {nav.terms}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.controlsRow, isNarrow && styles.controlsRowNarrow]}>
            <TouchableOpacity
              style={styles.themeToggle}
              activeOpacity={0.85}
              onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Text style={[styles.controlText, { color: themeColors.text }]}>
                {theme === 'light' ? '🌙' : '☀️'}
              </Text>
            </TouchableOpacity>

            <View style={[styles.languageRow, isNarrow && styles.languageRowNarrow]}>
              {(
                [
                  { code: 'es', label: 'ES' },
                  { code: 'en', label: 'EN' },
                  { code: 'zh', label: '中文' },
                ] as const
              ).map((item) => (
                <TouchableOpacity
                  key={item.code}
                  style={[
                    styles.languageButton,
                    language === item.code && styles.languageButtonActive,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => setLanguage(item.code)}
                >
                  <Text
                    style={[
                      styles.languageText,
                      language !== item.code && { color: themeColors.textSecondary },
                      language === item.code && styles.languageTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: layout.horizontalPadding,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
    width: '100%',
    flexWrap: 'wrap',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 110,
    height: 40,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linkButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  linkButtonActive: {
    borderBottomColor: colors.gold,
  },
  linkText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  linkTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    flexWrap: 'wrap',
  },
  themeToggle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  controlText: {
    fontSize: 14,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 4,
  },
  languageButtonActive: {
    backgroundColor: colors.card,
    borderColor: colors.gold,
  },
  languageText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  languageTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  contentNarrow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightRowNarrow: {
    marginTop: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  linksRowNarrow: {
    flexWrap: 'wrap',
  },
  linkButtonNarrow: {
    paddingHorizontal: 10,
    marginLeft: 0,
    marginRight: 12,
    marginBottom: 4,
  },
  controlsRowNarrow: {
    marginLeft: 0,
    marginTop: 8,
  },
  languageRowNarrow: {
    marginTop: 4,
  },
});

export default HeaderNav;
