'use client';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
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
  const isNarrow = width < 820;

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, language, setLanguage, colors: themeColors } = useThemeLanguage();
  const isDark = theme === 'dark';
  const nav = navCopy[language];

  const brandLogoSource: any = toImageSource(logo as any);

  const goTo = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  const renderLink = (path: string, label: string) => (
    <motion.div
      key={path}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={isNarrow ? styles.linkWrapNarrow : styles.linkWrap}
    >
      <TouchableOpacity
        style={[styles.linkButton, isNarrow && styles.linkButtonNarrow]}
        activeOpacity={0.85}
        onPress={() => goTo(path)}
      >
        <Text
          style={[
            styles.linkText,
            { color: themeColors.textSecondary },
            isActive(path) && { color: themeColors.text },
          ]}
        >
          {label}
        </Text>
        <View
          style={[
            styles.linkUnderline,
            { backgroundColor: themeColors.gold },
            !isActive(path) && styles.linkUnderlineHidden,
          ]}
        />
      </TouchableOpacity>
    </motion.div>
  );

  return (
    <div style={navWrapStyle}>
      <div
        style={{
          borderBottom: `1px solid ${
            isDark ? 'rgba(212, 175, 55, 0.14)' : themeColors.border
          }`,
          background: isDark ? 'rgba(8, 10, 14, 0.78)' : 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        }}
      >
        <View style={[styles.content, isNarrow && styles.contentNarrow]}>
          <TouchableOpacity
            style={styles.brandRow}
            activeOpacity={0.8}
            onPress={() => goTo('/')}
          >
            <Image
              source={brandLogoSource}
              style={styles.brandLogo as any}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={[styles.rightRow, isNarrow && styles.rightRowNarrow]}>
            <View style={[styles.linksRow, isNarrow && styles.linksRowNarrow]}>
              {renderLink('/tracking', nav.tracking)}
              {renderLink('/galeria', nav.gallery)}
              {renderLink('/contacto', nav.contact)}
              {renderLink('/terminos', nav.terms)}
            </View>

            <View style={[styles.controlsRow, isNarrow && styles.controlsRowNarrow]}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                style={{ marginRight: 10, display: 'flex' }}
              >
                <TouchableOpacity
                  style={[
                    styles.themeToggle,
                    { borderColor: themeColors.border, backgroundColor: themeColors.card },
                  ]}
                  activeOpacity={0.85}
                  onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? (
                    <Moon size={15} color={themeColors.text} strokeWidth={2} />
                  ) : (
                    <Sun size={15} color={themeColors.text} strokeWidth={2} />
                  )}
                </TouchableOpacity>
              </motion.div>

              <View
                style={[
                  styles.languageGroup,
                  { borderColor: themeColors.border, backgroundColor: themeColors.card },
                ]}
              >
                {(
                  [
                    { code: 'es', label: 'ES' },
                    { code: 'en', label: 'EN' },
                    { code: 'zh', label: '中文' },
                  ] as const
                ).map((item, index) => {
                  const active = language === item.code;
                  return (
                    <motion.div
                      key={item.code}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      style={{
                        display: 'flex',
                        marginLeft: index === 0 ? 0 : 2,
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.languageButton,
                          active && {
                            backgroundColor: themeColors.goldSoft,
                            borderColor: themeColors.goldBorder,
                          },
                        ]}
                        activeOpacity={0.85}
                        onPress={() => setLanguage(item.code)}
                      >
                        <Text
                          style={[
                            styles.languageText,
                            { color: themeColors.textSecondary },
                            active && { color: themeColors.gold, fontWeight: '700' },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    </motion.div>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </div>
    </div>
  );
};

const navWrapStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth + 80,
    width: '100%',
    paddingHorizontal: layout.horizontalPadding,
    paddingVertical: 14,
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
    width: 64,
    height: 56,
    borderRadius: 12,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linkWrap: {
    marginLeft: 26,
  },
  linkWrapNarrow: {
    marginRight: 16,
    marginBottom: 4,
  },
  linkButton: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  linkButtonNarrow: {
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  linkUnderline: {
    height: 2,
    width: '60%',
    marginTop: 5,
    borderRadius: 1,
  },
  linkUnderlineHidden: {
    opacity: 0,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 26,
    flexWrap: 'wrap',
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 999,
    padding: 3,
  },
  languageButton: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  languageText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: colors.textSecondary,
  },
  contentNarrow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  rightRowNarrow: {
    marginTop: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  linksRowNarrow: {
    flexWrap: 'wrap',
    flex: 1,
  },
  controlsRowNarrow: {
    marginLeft: 0,
    marginTop: 6,
  },
});

export default HeaderNav;
