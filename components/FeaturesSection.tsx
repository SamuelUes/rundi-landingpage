import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import SectionHeader from './SectionHeader';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';

type Feature = {
  title: string;
  description: string;
  icon?: string;
  iconAsset?: any;
};

const features: Feature[] = [
  {
    iconAsset: require('../assets/images/icons/utils/safe_shield.png'),
    title: 'Seguridad primero',
    description: 'Conductores verificados, documentos revisados y botón SOS integrado.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/car_safed.png'),
    title: 'Conductor designado',
    description: 'Viaja con un conductor designado para volver seguro con tu vehiculo.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/map.png'),
    title: 'Multi-destino inteligente',
    description: 'Define origen, destino extra y destino final en un solo flujo.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/card_cash.png'),
    title: 'Pagos flexibles',
    description: 'Efectivo o tarjeta con integración a a bancos locales, pensado para Nicaragua.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/realtime.png'),
    title: 'Tiempo real',
    description: 'Ubicación en vivo, estado del viaje y notificaciones push.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/sms.png'),
    title: 'Registro por SMS',
    description: 'Validación de teléfono con SMS para mayor seguridad desde el día uno.',
  },
];

const HomePreviewProto = require('../assets/images/prototipe_phones/clienthome_prototipe.png');
const DriverPreviewPhot = require('../assets/images/prototipe_phones/driverhome_prototipe.png');

const toImageSource = (asset: any): any => {
  if (!asset) return asset;
  const maybe = (asset as any).default ?? asset;
  if (typeof maybe === 'string') return { uri: maybe };
  if ((maybe as any).src) return { uri: (maybe as any).src };
  return maybe;
};

interface FeaturesSectionProps {
  scrollY?: any;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ scrollY }) => {
  const HomePreviewSource: any = toImageSource(HomePreviewProto as any);
  const DriverPreviewSource: any = toImageSource(DriverPreviewPhot as any);

  const [hoveredSlot, setHoveredSlot] = useState<'client' | 'driver' | null>(null);

  return (
    <View style={styles.root}>
      <SectionHeader
        title="Pensada para la realidad de Nicaragua"
        subtitle="Una plataforma diseñada para usuarios y conductores nicaragüenses."
        align="center"
      />

      <View style={styles.row}>
        <View style={styles.featuresColumn}>
          <View style={styles.grid}>
            {features.map((feature, index) => (
              <View
                key={feature.title}
                style={[styles.card, index % 2 === 0 && styles.cardLeft]}
              >
                <View style={styles.cardHeaderRow}>
                  <View /*style={styles.iconWrapper}*/ >
                    {feature.iconAsset ? (
                      <Image
                        source={toImageSource(feature.iconAsset) as any}
                        style={styles.featureIconImage as any}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.icon}>{feature.icon}</Text>
                    )}
                  </View>
                </View>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.PrototypeColumn}>
          <View style={styles.PrototypeCard}>
            <Text style={styles.PrototypeTitle}>Diseñado para ti.</Text>
            <Text style={styles.PrototypeSubtitle}>Diseñado para usuarios y para conductores</Text>
            <View style={styles.ImageWrapper}>
              <Pressable
                onHoverIn={() => setHoveredSlot('client')}
                onHoverOut={() => {
                  setHoveredSlot((prev) => (prev === 'client' ? null : prev));
                }}
                style={[styles.imageSlot, hoveredSlot === 'client' && styles.imageSlotExpanded]}
              >
                <Image
                  source={HomePreviewSource}
                  style={styles.ClientPrototypeImage as any}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable
                onHoverIn={() => setHoveredSlot('driver')}
                onHoverOut={() => {
                  setHoveredSlot((prev) => (prev === 'driver' ? null : prev));
                }}
                style={[styles.imageSlot, hoveredSlot === 'driver' && styles.imageSlotExpanded]}
              >
                <Image
                  source={DriverPreviewSource}
                  style={styles.DriverPrototypeImage as any}
                  resizeMode="contain"
                />
              </Pressable>
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
    marginBottom: layout.sectionVerticalPadding,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
  },
  featuresColumn: {
    flex: 2,
    minWidth: 260,
    marginRight: 16,
  },
  PrototypeColumn: {
    flex: 2,
    minWidth: 320,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    maxWidth: 260,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  cardLeft: {
    marginRight: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrapper: {
    width: 102,
    height: 42,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginBottom: 4,
  },
  featureIconImage: {
    width: 42,
    height: 42,
  },
  icon: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  PrototypeCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  PrototypeTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 1,
  },
  PrototypeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  ImageWrapper: {
    width: '100%',
    marginTop: 16,
    borderRadius: 18,
    overflow: 'hidden',
    height: 400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  imageSlot: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSlotExpanded: {
    flex: 2,
  },
  ClientPrototypeImage: {
    width: '100%',
    height: '100%',
  },
  DriverPrototypeImage: {
    width: '100%',
    height: '100%',
  },
});

export default FeaturesSection;
