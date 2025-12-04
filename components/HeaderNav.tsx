'use client';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.brandRow}
          activeOpacity={0.8}
          onPress={() => goTo('/')}
        >
          <Image source={brandLogoSource} style={styles.brandLogo as any} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.rightRow}>
          <View style={styles.linksRow}>
            <TouchableOpacity
              style={[styles.linkButton, isActive('/tracking') && styles.linkButtonActive]}
              activeOpacity={0.85}
              onPress={() => goTo('/tracking')}
            >
              <Text style={[styles.linkText, isActive('/tracking') && styles.linkTextActive]}>
                {nav.tracking}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkButton, isActive('/galeria') && styles.linkButtonActive]}
              activeOpacity={0.85}
              onPress={() => goTo('/galeria')}
            >
              <Text style={[styles.linkText, isActive('/galeria') && styles.linkTextActive]}>
                {nav.gallery}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkButton, isActive('/contacto') && styles.linkButtonActive]}
              activeOpacity={0.85}
              onPress={() => goTo('/contacto')}
            >
              <Text style={[styles.linkText, isActive('/contacto') && styles.linkTextActive]}>
                {nav.contact}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkButton, isActive('/terminos') && styles.linkButtonActive]}
              activeOpacity={0.85}
              onPress={() => goTo('/terminos')}
            >
              <Text style={[styles.linkText, isActive('/terminos') && styles.linkTextActive]}>
                {nav.terms}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.themeToggle}
              activeOpacity={0.85}
              onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Text style={styles.controlText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
            </TouchableOpacity>

            <View style={styles.languageRow}>
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
});

export default HeaderNav;
