import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';

interface AvailabilitySectionProps {
  scrollY?: any;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ scrollY }) => {
  return (
    <View style={styles.root}>
      <SectionHeader
        title="Construida para ti"
        subtitle="Toda la experiencia está optimizada para las ciudades y necesidades de Nicaragua."
        align="center"
      />

      <View style={styles.card}>
        <Text style={styles.tag}>Cobertura</Text>
        <Text style={styles.title}>Disponible solo en Nicaragua</Text>
        <Text style={styles.text}>
          Rundi está diseñada exclusivamente para operar en Nicaragua, adaptando todos los metodos y funcionalidades.
        </Text>
        <Text style={styles.cities}>
          Foco en Managua y principales ciudades, expandiéndose progresivamente.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: layout.horizontalPadding,
    marginBottom: layout.sectionVerticalPadding,
  },
  card: {
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: colors.surface,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  tag: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '600',
    color: colors.goldLight,
    marginBottom: 6,
  },
  title: {
    fontSize: typography.sectionTitle,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  cities: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});

export default AvailabilitySection;
