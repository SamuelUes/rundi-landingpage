import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

const year = new Date().getFullYear();

type FooterCopy = {
  main: string;
  disclaimer: string;
  techLine: string;
  copy: string;
};

const footerCopy: Record<LanguageCode, FooterCopy> = {
  es: {
    main: 'Movilidad segura y conductor designado para Nicaragua.',
    disclaimer: 'Servicio disponible únicamente en Nicaragua.',
    techLine: 'Construido con React Native, Firebase, Supabase, Bancos Locales y más.',
    copy: 'Todos los derechos reservados.',
  },
  en: {
    main: 'Safe mobility and designated driver service for Nicaragua.',
    disclaimer: 'Service available only in Nicaragua.',
    techLine: 'Built with React Native, Firebase, Supabase, local banks and more.',
    copy: 'All rights reserved.',
  },
  zh: {
    main: '为尼加拉瓜提供安全出行与指定司机服务。',
    disclaimer: '目前服务仅在尼加拉瓜提供。',
    techLine: '基于 React Native、Firebase、Supabase、本地银行等技术构建。',
    copy: '保留所有权利。',
  },
};

const Footer: React.FC = () => {
  const { colors: themeColors, language } = useThemeLanguage();
  const { width } = useWindowDimensions();
  const isNarrow = width < 768;
  const copy = footerCopy[language];
  return (
    <View
      style={[
        styles.root,
        { borderTopColor: themeColors.border, backgroundColor: themeColors.background },
      ]}
    >
      <View style={[styles.container, isNarrow && styles.containerNarrow]}>
        <View style={[styles.left, isNarrow && styles.leftNarrow]}>
          <Text style={[styles.brand, { color: themeColors.gold }]}>Rundi</Text>
          <Text style={[styles.text, { color: themeColors.textSecondary }]}>{copy.main}</Text>
          <Text style={[styles.disclaimer, { color: themeColors.textSecondary }]}>{copy.disclaimer}</Text>
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
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: layout.horizontalPadding,
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
  },
  containerNarrow: {
    flexDirection: 'column',
  },
  left: {
    flex: 1,
    minWidth: 240,
    marginBottom: 10,
    paddingRight: 16,
  },
  leftNarrow: {
    paddingRight: 0,
  },
  right: {
    flex: 1,
    minWidth: 240,
  },
  rightNarrow: {
    marginTop: 8,
  },
  brand: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gold,
    marginBottom: 4,
  },
  text: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  techLine: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  copy: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});

export default Footer;
