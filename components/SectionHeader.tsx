import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout } from '../theme/layout';

type Props = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

const SectionHeader: React.FC<Props> = ({ title, subtitle, align = 'left' }) => {
  const isCenter = align === 'center';

  return (
    <View style={[styles.container, isCenter && styles.center]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
