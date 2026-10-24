import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { motion } from 'framer-motion';
import {
  CarFront,
  CreditCard,
  MessageSquare,
  Radar,
  Route,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

// El arte de campaña es line-art sobre blanco: se enmarca en "prints" crema
// para que se lea como pieza editorial sobre el fondo oscuro.
const ART_PRINT_BG = '#F4EFE3';

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  campaignAsset?: any;
};

const features: Feature[] = [
  {
    icon: ShieldCheck,
    campaignAsset: require('../assets/images/campaña2/ride_3.png'),
    title: 'Seguridad primero',
    description: 'Conductores verificados, documentos revisados y botón SOS integrado.',
  },
  {
    icon: CarFront,
    campaignAsset: require('../assets/images/campaña2/designed_driver.png'),
    title: 'Conductor designado',
    description: 'Viaja con un conductor designado para volver seguro con tu vehiculo.',
  },
  {
    icon: Radar,
    campaignAsset: require('../assets/images/campaña2/realtime.png'),
    title: 'Tiempo real',
    description: 'Ubicación en vivo, estado del viaje y notificaciones push.',
  },
  {
    icon: CreditCard,
    campaignAsset: require('../assets/images/campaña2/safe_pay.png'),
    title: 'Pagos flexibles',
    description: 'Efectivo o tarjeta con integración a bancos locales, pensado para Nicaragua.',
  },
  {
    icon: Route,
    title: 'Multi-destino inteligente',
    description: 'Define origen, destino extra y destino final en un solo flujo.',
  },
  {
    icon: MessageSquare,
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
  ridersLabel: string;
  driversLabel: string;
  items: FeatureText[];
};

const featuresCopy: Record<LanguageCode, FeaturesCopy> = {
  es: {
    headerTitle: 'Pensada para la realidad de Nicaragua',
    headerSubtitle: 'Una plataforma diseñada para usuarios y conductores nicaragüenses.',
    prototypeTitle: 'Diseñado para ti.',
    prototypeSubtitle: 'Diseñado para usuarios y para conductores',
    ridersLabel: 'Usuarios',
    driversLabel: 'Conductores',
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
    ridersLabel: 'Riders',
    driversLabel: 'Drivers',
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
    ridersLabel: '乘客',
    driversLabel: '司机',
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
const clientPhone = require('../assets/images-old/prototipe_phones/clienthome_prototipe.png');
const driverPhone = require('../assets/images-old/prototipe_phones/driverhome_prototipe.png');

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

  const clientPhoneSource: any = toImageSource(clientPhone as any);
  const driverPhoneSource: any = toImageSource(driverPhone as any);

  const primaryFeatures = features.slice(0, 4);
  const secondaryFeatures = features.slice(4);

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
      <View style={[styles.band, { backgroundColor: themeColors.background }]}>
        <View style={styles.row}>
          <View style={styles.featuresColumn}>
            <View style={styles.grid}>
              {primaryFeatures.map((feature, index) => {
                const text = copy.items[index];
                return (
                  <Reveal
                    key={feature.title}
                    delay={index * 0.07}
                    style={{
                      flexBasis: isNarrow ? '100%' : '48%',
                      flexGrow: 1,
                      marginBottom: 20,
                    }}
                  >
                    <motion.div
                      whileHover={{ y: -6, borderColor: themeColors.goldBorder }}
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      style={{
                        height: '100%',
                        border: `1px solid ${themeColors.border}`,
                        borderRadius: 20,
                        overflow: 'hidden',
                      }}
                    >
                      <View style={[styles.card, { backgroundColor: themeColors.card }]}>
                        <Text style={styles.cardIndex}>0{index + 1}</Text>
                        <View style={styles.cardTopRow}>
                          <View
                            style={[
                              styles.iconChip,
                              {
                                backgroundColor: themeColors.goldSoft,
                                borderColor: themeColors.goldBorder,
                              },
                            ]}
                          >
                            <feature.icon
                              size={22}
                              color={themeColors.gold}
                              strokeWidth={2}
                            />
                          </View>
                          <View style={styles.cardTextColumn}>
                            <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                              {text.title}
                            </Text>
                            <Text
                              style={[styles.cardDescription, { color: themeColors.textSecondary }]}
                            >
                              {text.description}
                            </Text>
                          </View>
                        </View>
                        {feature.campaignAsset && (
                          <View style={styles.cardImageBottom}>
                            <View
                              style={[
                                styles.cardImageFrame,
                                {
                                  backgroundColor: ART_PRINT_BG,
                                  borderColor: themeColors.goldBorder,
                                },
                              ]}
                            >
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                                style={{ width: '100%', height: '100%' }}
                              >
                                <Image
                                  source={toImageSource(feature.campaignAsset) as any}
                                  style={styles.cardCampaignImage as any}
                                  resizeMode="contain"
                                />
                              </motion.div>
                            </View>
                          </View>
                        )}
                      </View>
                    </motion.div>
                  </Reveal>
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
                <Reveal
                  key={feature.title}
                  delay={index * 0.08}
                  style={{ marginBottom: 16 }}
                >
                  <motion.div
                    whileHover={{ y: -4, borderColor: themeColors.goldBorder }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    style={{
                      border: `1px solid ${themeColors.border}`,
                      borderRadius: 18,
                      overflow: 'hidden',
                    }}
                  >
                    <View
                      style={[
                        styles.secondaryCard,
                        {
                          backgroundColor: themeColors.card,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.iconChip,
                          styles.iconChipSmall,
                          {
                            backgroundColor: themeColors.goldSoft,
                            borderColor: themeColors.goldBorder,
                          },
                        ]}
                      >
                        <feature.icon
                          size={18}
                          color={themeColors.gold}
                          strokeWidth={2}
                        />
                      </View>
                      <View style={styles.secondaryTextColumn}>
                        <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                          {text.title}
                        </Text>
                        <Text
                          style={[styles.cardDescription, { color: themeColors.textSecondary }]}
                        >
                          {text.description}
                        </Text>
                      </View>
                    </View>
                  </motion.div>
                </Reveal>
              );
            })}
          </View>

          <View style={styles.PrototypeColumn}>
            <Reveal style={{ width: '100%' }} delay={0.1}>
              <View
                style={[
                  styles.PrototypeCard,
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
                <View style={styles.phonesStage}>
                  <div style={phonesRingStyle} />
                  <div style={phonesGlowStyle} />
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ flexBasis: '47%', maxWidth: 176, marginRight: -22, zIndex: 2, display: 'flex' }}
                  >
                    <motion.div
                      initial={{ rotate: -5 }}
                      whileHover={{ rotate: 0, y: -8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      style={phoneFrameStyle}
                    >
                      <Image
                        source={clientPhoneSource}
                        style={styles.phoneScreen as any}
                        resizeMode="cover"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                    style={{ flexBasis: '47%', maxWidth: 176, zIndex: 1, display: 'flex' }}
                  >
                    <motion.div
                      initial={{ rotate: 5 }}
                      whileHover={{ rotate: 0, y: -8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      style={phoneFrameStyle}
                    >
                      <Image
                        source={driverPhoneSource}
                        style={styles.phoneScreen as any}
                        resizeMode="cover"
                      />
                    </motion.div>
                  </motion.div>
                </View>
                <View style={styles.phoneLabelsRow}>
                  <Text style={[styles.phoneLabel, { color: themeColors.textSecondary }]}>
                    {copy.ridersLabel}
                  </Text>
                  <Text style={[styles.phoneLabel, { color: themeColors.textSecondary }]}>
                    {copy.driversLabel}
                  </Text>
                </View>
              </View>
            </Reveal>
          </View>
        </View>
      </View>
    </View>
  );
};

const phoneFrameStyle: React.CSSProperties = {
  width: '100%',
  aspectRatio: '1200 / 2364',
  backgroundColor: '#0B0D10',
  borderRadius: 26,
  padding: 6,
  border: '1px solid rgba(212, 175, 55, 0.32)',
  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.55)',
  position: 'relative',
  overflow: 'hidden',
};

const phonesRingStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 320,
  height: 320,
  marginTop: -160,
  marginLeft: -160,
  borderRadius: 160,
  border: '1px solid rgba(212, 175, 55, 0.16)',
  pointerEvents: 'none',
};

const phonesGlowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12%',
  left: '8%',
  right: '8%',
  bottom: '12%',
  background: 'radial-gradient(closest-side, rgba(212, 175, 55, 0.2), transparent)',
  filter: 'blur(22px)',
  pointerEvents: 'none',
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
    width: '100%',
  },
  band: {
    marginTop: 12,
    paddingVertical: 16,
  },
  featuresColumn: {
    flex: 3,
    minWidth: 320,
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
    justifyContent: 'space-between',
  },
  card: {
    height: '100%',
    backgroundColor: colors.card,
    paddingVertical: 22,
    paddingHorizontal: 22,
    position: 'relative',
  },
  cardIndex: {
    position: 'absolute',
    top: 12,
    right: 18,
    fontSize: 34,
    fontWeight: '800',
    fontFamily: typography.fontDisplay,
    color: 'rgba(212, 175, 55, 0.14)',
    letterSpacing: -1,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconChip: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconChipSmall: {
    width: 44,
    height: 44,
    borderRadius: 13,
  },
  cardTextColumn: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: typography.fontDisplay,
    letterSpacing: -0.2,
    color: colors.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  cardImageBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cardImageFrame: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardCampaignImage: {
    width: '100%',
    height: '100%',
  },
  secondaryColumn: {
    flex: 1,
    minWidth: 320,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  secondaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  secondaryTextColumn: {
    flex: 1,
    marginLeft: 12,
  },
  PrototypeCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: colors.border,
  },
  PrototypeTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: typography.fontDisplay,
    letterSpacing: -0.5,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  PrototypeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  phonesStage: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 6,
  },
  phoneLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  phoneLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default FeaturesSection;
