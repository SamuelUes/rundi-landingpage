import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout } from '../theme/layout';
import { useThemeLanguage } from '../theme/ThemeContext';
import Reveal from './Reveal';

type Props = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

const SectionHeader: React.FC<Props> = ({ title, subtitle, align = 'left' }) => {
  const isCenter = align === 'center';
  const { colors: themeColors } = useThemeLanguage();

  return (
    <Reveal style={styles.reveal} y={16}>
      <View style={[styles.container, isCenter && styles.center]}>
        <View style={[styles.motif, isCenter ? styles.motifCenter : styles.motifLeft]}>
          <View style={[styles.motifDot, { backgroundColor: themeColors.gold }]} />
          <View style={[styles.motifLine, { backgroundColor: themeColors.goldBorder }]} />
          <View style={[styles.motifDot, { backgroundColor: themeColors.gold }]} />
        </View>
        <Text style={[styles.title, { color: themeColors.text }, isCenter && styles.titleCenter]}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              { color: themeColors.textSecondary },
              isCenter && styles.subtitleCenter,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Reveal>
  );
};

const styles = StyleSheet.create({
  reveal: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    marginBottom: 20,
  },
  center: {
    alignItems: 'center',
  },
  motif: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  motifCenter: {
    justifyContent: 'center',
  },
  motifLeft: {
    justifyContent: 'flex-start',
  },
  motifDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  motifLine: {
    width: 34,
    height: 1.5,
    marginHorizontal: 6,
  },
  title: {
    fontSize: typography.sectionTitle,
    fontWeight: '700',
    fontFamily: typography.fontDisplay,
    letterSpacing: -0.4,
    color: colors.text,
    marginBottom: 8,
  },
  titleCenter: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sectionSubtitle,
    lineHeight: 22,
    maxWidth: 660,
    color: colors.textSecondary,
  },
  subtitleCenter: {
    textAlign: 'center',
  },
});

export default SectionHeader;
