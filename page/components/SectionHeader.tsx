import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout } from '../theme/layout';
import { useThemeLanguage } from '../theme/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

const SectionHeader: React.FC<Props> = ({ title, subtitle, align = 'left' }) => {
  const isCenter = align === 'center';
  const { colors: themeColors } = useThemeLanguage();

  return (
    <View style={[styles.container, isCenter && styles.center]}>
      <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    marginBottom: 16,
  },
  center: {
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sectionTitle,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: typography.sectionSubtitle,
    color: colors.textSecondary,
  },
});

export default SectionHeader;
