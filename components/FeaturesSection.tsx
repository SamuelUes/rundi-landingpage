import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native';
import SectionHeader from './SectionHeader';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

type Feature = {
  title: string;
  description: string;
  icon?: string;
  iconAsset?: any;
  campaignAsset?: any;
};

const features: Feature[] = [
  {
    iconAsset: require('../assets/images/icons/utils/safe_shield.png'),
    campaignAsset: require('../assets/images/campaña2/ride_3.png'),
    title: 'Seguridad primero',
    description: 'Conductores verificados, documentos revisados y botón SOS integrado.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/car_safed.png'),
    campaignAsset: require('../assets/images/campaña2/designed_driver.png'),
    title: 'Conductor designado',
    description: 'Viaja con un conductor designado para volver seguro con tu vehiculo.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/realtime.png'),
    campaignAsset: require('../assets/images/campaña2/realtime.png'),
    title: 'Tiempo real',
    description: 'Ubicación en vivo, estado del viaje y notificaciones push.',
  },
    {
    iconAsset: require('../assets/images/icons/utils/card_cash.png'),
    campaignAsset: require('../assets/images/campaña2/safe_pay.png'),
    title: 'Pagos flexibles',
    description: 'Efectivo o tarjeta con integración a a bancos locales, pensado para Nicaragua.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/map.png'),
    //campaignAsset: require('../assets/images/campaña/moto_ride_1.png'),
    title: 'Multi-destino inteligente',
    description: 'Define origen, destino extra y destino final en un solo flujo.',
  },
  {
    iconAsset: require('../assets/images/icons/utils/sms.png'),
    //campaignAsset: require('../assets/images/campaña/moto_ride_2.png'),
    title: 'Registro por SMS',
    description: 'Validación de teléfono con SMS para mayor seguridad desde el día uno.',
  },
];

type FeatureText = {
  title: string;
  description: string;
};

type FeaturesCopy = {
  headerTitle: string;
  headerSubtitle: string;
  prototypeTitle: string;
  prototypeSubtitle: string;
  items: FeatureText[];
};

const featuresCopy: Record<LanguageCode, FeaturesCopy> = {
  es: {
    headerTitle: 'Pensada para la realidad de Nicaragua',
    headerSubtitle: 'Una plataforma diseñada para usuarios y conductores nicaragüenses.',
    prototypeTitle: 'Diseñado para ti.',
    prototypeSubtitle: 'Diseñado para usuarios y para conductores',
    items: [
      {
        title: 'Seguridad primero',
        description: 'Conductores verificados, documentos revisados y botón SOS integrado.',
      },
      {
        title: 'Conductor designado',
        description: 'Viaja con un conductor designado para volver seguro con tu vehiculo.',
      },
      {
        title: 'Tiempo real',
        description: 'Ubicación en vivo, estado del viaje y notificaciones push.',
      },
      {
        title: 'Pagos flexibles',
        description: 'Efectivo o tarjeta con integración a bancos locales, pensado para Nicaragua.',
      },
      {
        title: 'Multi-destino inteligente',
        description: 'Define origen, destino extra y destino final en un solo flujo.',
      },
      {
        title: 'Registro por SMS',
        description: 'Validación de teléfono con SMS para mayor seguridad desde el día uno.',
      },
    ],
  },
  en: {
    headerTitle: 'Designed for the reality of Nicaragua',
    headerSubtitle: 'A platform built for Nicaraguan riders and drivers.',
    prototypeTitle: 'Designed for you.',
    prototypeSubtitle: 'Designed for riders and for drivers',
    items: [
      {
        title: 'Safety first',
        description: 'Verified drivers, reviewed documents and integrated SOS button.',
      },
      {
        title: 'Designated driver',
        description: 'Ride with a designated driver to get home safely with your vehicle.',
      },
      {
        title: 'Real time',
        description: 'Live location, trip status and push notifications.',
      },
      {
        title: 'Flexible payments',
        description: 'Cash or card with integration to local banks, built for Nicaragua.',
      },
      {
        title: 'Smart multi-destination',
        description: 'Set origin, extra stop and final destination in a single flow.',
      },
      {
        title: 'SMS signup',
        description: 'Phone validation with SMS for more security from day one.',
      },
    ],
  },
  zh: {
    headerTitle: '为尼加拉瓜的真实出行场景而设计',
    headerSubtitle: '一款为乘客和司机量身打造的平台。',
    prototypeTitle: '为你而生。',
    prototypeSubtitle: '同时为乘客与司机优化的体验',
    items: [
      {
        title: '安全优先',
        description: '司机资料审核、文件验证，并集成 SOS 按钮。',
      },
      {
        title: '指定司机',
        description: '指定司机送你回家，你与车辆都更安全。',
      },
      {
        title: '实时状态',
        description: '实时位置、行程状态与推送通知。',
      },
      {
        title: '灵活支付',
        description: '支持现金或银行卡，并与本地银行集成。',
      },
      {
        title: '智能多目的地',
        description: '一次设置起点、额外停靠点和最终目的地。',
      },
      {
        title: '短信注册',
        description: '通过短信验证手机号，从第一天起就更安全。',
      },
    ],
  },
};
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
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;

  const HomePreviewSource: any = toImageSource(HomePreviewProto as any);
  const DriverPreviewSource: any = toImageSource(DriverPreviewPhot as any);

  const primaryFeatures = features.slice(0, 4);
  const secondaryFeatures = features.slice(4);

  const [hoveredSlot, setHoveredSlot] = useState<'client' | 'driver' | null>(null);
  const { theme, language, colors: themeColors } = useThemeLanguage();
  const isDark = theme === 'dark';
  const copy = featuresCopy[language];

  return (
    <View style={[styles.root, { backgroundColor: themeColors.background }]}>
      <SectionHeader
        title={copy.headerTitle}
        subtitle={copy.headerSubtitle}
        align="center"
      />
      <View style={[styles.band, isDark && styles.bandDark, { backgroundColor: themeColors.background }]}>
        <View style={styles.row}>
          <View style={styles.featuresColumn}>
            <View style={styles.grid}>
              {primaryFeatures.map((feature, index) => {
                const text = copy.items[index];
                return (
                  <View
                    key={feature.title}
                    style={[
                      styles.card,
                      index % 2 === 0 && styles.cardLeft,
                      isDark && styles.cardDark,
                      isNarrow && styles.cardNarrow,
                      {
                        backgroundColor: themeColors.card,
                        borderColor: themeColors.border,
                      },
                    ]}
                  >
                    <View style={[styles.cardInnerRow, isNarrow && styles.cardInnerRowNarrow]}>
                      <View style={[styles.cardTextColumn, isNarrow && styles.cardTextColumnNarrow]}>
                        <View style={styles.cardHeaderRow}>
                          <View /*style={styles.iconWrapper}*/>
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
                        <Text style={[styles.cardTitle, { color: themeColors.text }]}>{text.title}</Text>
                        <Text
                          style={[styles.cardDescription, { color: themeColors.textSecondary }]}
                        >
                          {text.description}
                        </Text>
                      </View>
                      {feature.campaignAsset && (
                        <View
                          style={[
                            styles.cardImageColumn,
                            isNarrow && styles.cardImageColumnNarrow,
                          ]}
                        >
                          <View style={[styles.cardImageFrame, { backgroundColor: themeColors.card }]}>
                            <Image
                              source={toImageSource(feature.campaignAsset) as any}
                              style={styles.cardCampaignImage as any}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.secondaryColumn}>
            {secondaryFeatures.map((feature, index) => {
              const text = copy.items[index + primaryFeatures.length];
              return (
                <View
                  key={feature.title}
                  style={[
                    styles.secondaryCard,
                    isDark && styles.cardDark,
                    {
                      backgroundColor: themeColors.card,
                      borderColor: themeColors.border,
                    },
                  ]}
                >
                  <View style={styles.cardInnerRow}>
                    <View style={styles.cardTextColumn}>
                      <View style={styles.cardHeaderRow}>
                        <View /*style={styles.iconWrapper}*/>
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
                      <Text style={[styles.cardTitle, { color: themeColors.text }]}>{text.title}</Text>
                      <Text
                        style={[styles.cardDescription, { color: themeColors.textSecondary }]}
                      >
                        {text.description}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.PrototypeColumn}>
            <View
              style={[
                styles.PrototypeCard,
                isDark && styles.cardDark,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Text style={[styles.PrototypeTitle, { color: themeColors.text }]}>
                {copy.prototypeTitle}
              </Text>
              <Text style={[styles.PrototypeSubtitle, { color: themeColors.textSecondary }]}>
                {copy.prototypeSubtitle}
              </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: layout.horizontalPadding,
    marginBottom: layout.sectionVerticalPadding,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
  },
  band: {
    marginTop: 8,
    paddingVertical: 16,
  },
  bandDark: {
    backgroundColor: colors.background,
  },
  featuresColumn: {
    flex: 3,
    minWidth: 320,
    marginRight: 2,
  },
  PrototypeColumn: {
    flex: 1,
    minWidth: 320,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 20,
    minHeight: 210,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardNarrow: {
    minHeight: 0,
    marginHorizontal: 10,
    paddingVertical: 18,
  },
  cardDark: {
    // Suaviza la transición entre fondo oscuro y card clara
    borderColor: colors.border,
    backgroundColor: colors.background,
    shadowColor: '#020617',
    shadowOpacity: 0.32,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 32 },
    elevation: 18,
  },
  secondaryColumn: {
    flex: 1,
    minWidth: 320,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  secondaryCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 20,
    minHeight: 210,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLeft: {
    marginRight: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInnerRowNarrow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardTextColumn: {
    flex: 1,
    paddingRight: 8,
  },
  cardTextColumnNarrow: {
    marginBottom: 8,
  },
  cardImageColumn: {
    width: 180,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardImageColumnNarrow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  cardImageFrame: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  cardCampaignImage: {
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
    width: 42,
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
    paddingVertical: 12,
    paddingHorizontal: 85,
    borderWidth: 1,
    borderColor: colors.border,
  },
  PrototypeTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  PrototypeSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  ImageWrapper: {
    width: '100%',
    marginTop: 1,
    borderRadius: 18,
    overflow: 'hidden',
    height: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
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
