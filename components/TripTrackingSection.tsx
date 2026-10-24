'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, useWindowDimensions, Alert} from 'react-native';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Hash, Play } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors, gradients } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import {
  fetchPublicRideTracking,
  PublicRideTrackingError,
  type PublicRideTrackingRide,
} from '../functions/publicRideTrackingClient';
import TrackingDynamicMap from './TrackingDynamicMap';
import { useThemeLanguage } from '../theme/ThemeContext';
import type { LanguageCode } from '../theme/ThemeContext';

type TripStatus =
  | 'driver_on_way'
  | 'driver_arrived'
  | 'in_progress'
  | 'pending_payment'
  | 'completed'
  | 'canceled';

function mapRemoteStatusToTripStatus(status: string | null | undefined): TripStatus | null {
  if (!status) return null;
  const normalized = status.toLowerCase();

  switch (normalized) {
    // estados iniciales: todavía no hay viaje en ruta, pero lo tratamos como "en camino"
    case 'requested':
    case 'driver_offered':
    case 'accepted':
    case 'driver_on_way':
    case 'driver_on_route':
      return 'driver_on_way';
    case 'driver_arrived':
      return 'driver_arrived';
    case 'in_progress':
      return 'in_progress';
    case 'pending_payment':
    case 'pending_rating':
      return 'pending_payment';
    // rating_completed se considera viaje completado
    case 'rating_completed':
    case 'completed':
      return 'completed';
    case 'canceled':
      return 'canceled';
    default:
      return null;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const originMarkerIcon = require('../assets/icons/origin_marker/origin_marker.png');
const extraDestinationIcon = require('../assets/icons/multiplelocationmarker/multiplelocationmarker.png');
const finalDestinationIcon = require('../assets/icons/desti_locationmarker/desti_locationmarker.png');
const vehicleSedanIcon = require('../assets/icons/vehicles/sedan_V2/Icon_sedan.png');
const percentIcon = require('../assets/icons/porcent_icon/porcent_icon.png');

interface LatLng {
  lat: number;
  lng: number;
}

function getLatLngFromLocation(location: any | null | undefined): LatLng | null {
  if (!location || typeof location !== 'object') return null;

  const lat =
    typeof (location as any).latitude === 'number'
      ? (location as any).latitude
      : typeof (location as any).lat === 'number'
      ? (location as any).lat
      : typeof (location as any).location?.lat === 'number'
      ? (location as any).location.lat
      : null;

  const lng =
    typeof (location as any).longitude === 'number'
      ? (location as any).longitude
      : typeof (location as any).lng === 'number'
      ? (location as any).lng
      : typeof (location as any).location?.lng === 'number'
      ? (location as any).location.lng
      : null;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return null;
  }

  return { lat, lng };
}

function buildStaticMapUrl(ride: PublicRideTrackingRide | null): string | null {
  const apiKey = (GOOGLE_MAPS_API_KEY || '').trim();

  if (!ride || !apiKey) {
    return null;
  }

  const origin = getLatLngFromLocation(ride.origin);
  const extra = getLatLngFromLocation(ride.extraDestination);
  const finalDest = getLatLngFromLocation(ride.finalDestination || ride.destination);
  const vehicle =
    ride.vehicleLocation &&
    typeof ride.vehicleLocation.latitude === 'number' &&
    typeof ride.vehicleLocation.longitude === 'number'
      ? { lat: ride.vehicleLocation.latitude, lng: ride.vehicleLocation.longitude }
      : null;

  const center = vehicle || origin || finalDest || extra;

  if (!center) {
    return null;
  }

  const params: string[] = [];
  params.push('size=640x360');
  params.push('scale=2');
  params.push('maptype=roadmap');
  params.push(`center=${center.lat},${center.lng}`);
  params.push('zoom=14');

  const markers: string[] = [];

  if (origin) {
    markers.push(`color:0x4FC3F7|label:O|${origin.lat},${origin.lng}`);
  }
  if (extra) {
    markers.push(`color:0xFBC02D|label:E|${extra.lat},${extra.lng}`);
  }
  if (finalDest) {
    markers.push(`color:0x66BB6A|label:D|${finalDest.lat},${finalDest.lng}`);
  }
  if (vehicle) {
    markers.push(`color:0xFFFFFF|label:V|${vehicle.lat},${vehicle.lng}`);
  }

  markers.forEach((m) => {
    params.push(`markers=${encodeURIComponent(m)}`);
  });

  params.push(`key=${encodeURIComponent(apiKey)}`);

  return `https://maps.googleapis.com/maps/api/staticmap?${params.join('&')}`;
}

function getLocationLabel(location: any | null | undefined, fallback: string): string {
  if (!location || typeof location !== 'object') return fallback;

  const anyLocation = location as any;
  const candidates: Array<unknown> = [
    anyLocation.title,
    anyLocation.name,
    anyLocation.label,
    anyLocation.address,
    anyLocation.formattedAddress,
    anyLocation.description,
  ];

  const first = candidates.find((value) => typeof value === 'string' && value.trim().length > 0) as
    | string
    | undefined;

  return first || fallback;
}

type TrackingCopy = {
  sectionTitle: string;
  sectionSubtitle: string;
  inputLabel: string;
  inlinePlaceholder: string;
  overlayPlaceholder: string;
  viewButtonIdle: string;
  viewButtonLoading: string;
  simulateShort: string;
  simulateProgress: string;
  helperText: string;
  statusLabel: string;
  estimatedProgressPrefix: string;
  cancelSimulation: string;
  routeProgressTitle: string;
  routeRealtime: string;
  routeEstimated: string;
  timeUnit: string;
  distanceUnit: string;
  originFallback: string;
  extraFallback: string;
  finalFallback: string;
  errorFetch: string;
  errorUnexpected: string;
  errorInvalidCode: string;
  errorExpiredCode: string;
  errorNotFound: string;
  canceledMessage: string;
};

const statusLabelsByLanguage: Record<LanguageCode, Record<TripStatus, string>> = {
  es: {
    driver_on_way: 'Conductor en camino',
    driver_arrived: 'Conductor ha llegado',
    in_progress: 'Viaje en curso',
    pending_payment: 'Pendiente de pago',
    completed: 'Completado',
    canceled: 'Cancelado',
  },
  en: {
    driver_on_way: 'Driver on the way',
    driver_arrived: 'Driver has arrived',
    in_progress: 'Trip in progress',
    pending_payment: 'Pending payment',
    completed: 'Completed',
    canceled: 'Canceled',
  },
  zh: {
    driver_on_way: '司机在路上',
    driver_arrived: '司机已到达',
    in_progress: '行程进行中',
    pending_payment: '待支付',
    completed: '已完成',
    canceled: '已取消',
  },
};

const trackingCopy: Record<LanguageCode, TrackingCopy> = {
  es: {
    sectionTitle: 'Sigue tu viaje en tiempo real',
    sectionSubtitle:
      'Ingresa el código de seguimiento que recibiste para ver la ruta, la ubicación del vehículo y los puntos de origen y destinos.',
    inputLabel: 'Código de seguimiento',
    inlinePlaceholder: 'ABC23456',
    overlayPlaceholder: 'Pegá aquí tu código de seguimiento',
    viewButtonIdle: 'Ver viaje',
    viewButtonLoading: 'Cargando…',
    simulateShort: 'Simular',
    simulateProgress: 'Simular progreso',
    helperText:
      'El código de seguimiento lo genera la app Rundi cuando un pasajero o conductor comparte su viaje. Tiene 8 caracteres y expira después de unas horas.',
    statusLabel: 'Estado del viaje:',
    estimatedProgressPrefix: 'Progreso estimado',
    cancelSimulation: 'Simular cancelación',
    routeProgressTitle: 'Progreso del viaje',
    routeRealtime: 'Ruta en tiempo real usando la ubicación del vehículo.',
    routeEstimated: 'Mostrando un progreso estimado del viaje.',
    timeUnit: 'min',
    distanceUnit: 'km',
    originFallback: 'Origen',
    extraFallback: 'Destino extra',
    finalFallback: 'Destino final',
    errorFetch: 'No se pudo obtener la información del viaje.',
    errorUnexpected: 'Error obteniendo la información del viaje.',
    errorInvalidCode: 'Código de seguimiento inválido. Revisá que esté bien escrito.',
    errorExpiredCode: 'Este código de seguimiento expiró. Pedí uno nuevo a quien lo compartió.',
    errorNotFound: 'No encontramos un viaje para este código.',
    canceledMessage: 'Este viaje ha sido cancelado.',
  },
  en: {
    sectionTitle: 'Track your trip in real time',
    sectionSubtitle:
      'Enter the tracking code you received to see the route, vehicle location and origin/destination points.',
    inputLabel: 'Tracking code',
    inlinePlaceholder: 'ABC23456',
    overlayPlaceholder: 'Paste your tracking code here',
    viewButtonIdle: 'View trip',
    viewButtonLoading: 'Loading…',
    simulateShort: 'Simulate',
    simulateProgress: 'Simulate progress',
    helperText:
      'The tracking code is generated by the Rundi app when a passenger or driver shares their trip. It has 8 characters and expires after a few hours.',
    statusLabel: 'Trip status:',
    estimatedProgressPrefix: 'Estimated progress',
    cancelSimulation: 'Simulate cancellation',
    routeProgressTitle: 'Trip progress',
    routeRealtime: 'Real-time route using the vehicle location.',
    routeEstimated: 'Showing an estimated trip progress.',
    timeUnit: 'min',
    distanceUnit: 'km',
    originFallback: 'Origin',
    extraFallback: 'Extra stop',
    finalFallback: 'Final destination',
    errorFetch: 'Could not get trip information.',
    errorUnexpected: 'Error fetching trip information.',
    errorInvalidCode: 'Invalid tracking code. Check it and try again.',
    errorExpiredCode: 'This tracking code has expired. Ask for a new one.',
    errorNotFound: 'No trip was found for this code.',
    canceledMessage: 'This trip has been canceled.',
  },
  zh: {
    sectionTitle: '实时查看你的行程',
    sectionSubtitle: '输入你收到的追踪代码，即可查看路线、车辆位置以及起点和各个目的地。',
    inputLabel: '追踪代码',
    inlinePlaceholder: 'ABC23456',
    overlayPlaceholder: '在这里粘贴追踪代码',
    viewButtonIdle: '查看行程',
    viewButtonLoading: '加载中…',
    simulateShort: '模拟',
    simulateProgress: '模拟进度',
    helperText:
      '追踪代码由 Rundi 应用在乘客或司机分享行程时生成，共 8 个字符，数小时后过期。',
    statusLabel: '行程状态：',
    estimatedProgressPrefix: '预估进度',
    cancelSimulation: '模拟取消',
    routeProgressTitle: '行程进度',
    routeRealtime: '基于车辆实时位置展示路线。',
    routeEstimated: '当前显示的是预估行程进度。',
    timeUnit: '分钟',
    distanceUnit: '公里',
    originFallback: '起点',
    extraFallback: '途经点',
    finalFallback: '终点',
    errorFetch: '无法获取行程信息。',
    errorUnexpected: '获取行程信息时出错。',
    errorInvalidCode: '追踪代码无效，请检查后重试。',
    errorExpiredCode: '该追踪代码已过期，请索取新代码。',
    errorNotFound: '未找到与此代码关联的行程。',
    canceledMessage: '此行程已被取消。',
  },
};

const progressOrder: TripStatus[] = [
  'driver_on_way',
  'driver_arrived',
  'in_progress',
  'pending_payment',
  'completed',
  'canceled',
];

/**
 * Traduce los códigos de error del endpoint getPublicRideTracking a mensajes
 * localizados. Para códigos desconocidos usa el mensaje del backend o el genérico.
 */
function getTrackingErrorMessage(
  code: string | undefined,
  backendMessage: string | undefined,
  copy: TrackingCopy,
): string {
  switch (code) {
    case 'invalid-code':
    case 'invalid-argument':
      return copy.errorInvalidCode;
    case 'code-expired':
      return copy.errorExpiredCode;
    case 'not-found':
      return copy.errorNotFound;
    default:
      return backendMessage || copy.errorFetch;
  }
}

interface TripTrackingSectionProps {
  scrollY?: any;
}

const TripTrackingSection: React.FC<TripTrackingSectionProps> = ({ scrollY }) => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 900;

  const [trackingCode, setTrackingCode] = useState('');
  const [currentStatus, setCurrentStatus] = useState<TripStatus | null>(null);
  const [apiRide, setApiRide] = useState<PublicRideTrackingRide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language, colors: themeColors } = useThemeLanguage();
  const copy = trackingCopy[language];
  const statusLabels = statusLabelsByLanguage[language];

  const fetchRideData = async (code: string) => {
    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode) return;
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const response = await fetchPublicRideTracking(trimmedCode);

      if (response.success && response.ride) {
        setApiRide(response.ride);
        const mappedStatus = mapRemoteStatusToTripStatus(response.ride.status ?? null);
        setCurrentStatus(mappedStatus);
      } else {
        setApiRide(null);
        setCurrentStatus(null);
        setError(getTrackingErrorMessage(response.code, response.error, copy));
      }
    } catch (err: any) {
      setApiRide(null);
      setCurrentStatus(null);
      if (err instanceof PublicRideTrackingError) {
        setError(getTrackingErrorMessage(err.code, err.message, copy));
      } else {
        setError(typeof err?.message === 'string' ? err.message : copy.errorUnexpected);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewTrip = async () => {
    const trimmedCode = trackingCode.trim().toUpperCase();
    if (!trimmedCode) {
      return;
    }

    // Si no estamos en la pantalla dedicada de tracking, navegar allí con el código
    if (pathname !== '/tracking') {
      router.push(`/tracking?code=${encodeURIComponent(trimmedCode)}`);
      return;
    }

    await fetchRideData(trimmedCode);
  };

  const handleSimulateNext = () => {
    if (loading) {
      return;
    }

    if (!currentStatus || currentStatus === 'canceled') {
      setCurrentStatus('driver_on_way');
      return;
    }

    const index = progressOrder.indexOf(currentStatus);

    if (index === -1) {
      setCurrentStatus('driver_on_way');
    } else if (index < progressOrder.length - 1) {
      setCurrentStatus(progressOrder[index + 1]);
    }
  };

  const handleCancelSimulated = () => {
    if (currentStatus) {
      setCurrentStatus('canceled');
    }
  };

  const currentIndex = currentStatus ? progressOrder.indexOf(currentStatus) : -1;
  const progressFraction =
    apiRide && typeof apiRide.progress === 'number'
      ? Math.min(Math.max(apiRide.progress, 0), 100) / 100
      : currentIndex >= 0
      ? (currentIndex + 1) / progressOrder.length
      : 0;

  // Alertar cuando el viaje se complete o se cancele
  useEffect(() => {
    if (!currentStatus) return;

    if (currentStatus === 'completed' || currentStatus === 'canceled') {
      const message = statusLabels[currentStatus];
      Alert.alert('Estado del viaje', message);
    }
  }, [currentStatus, statusLabels]);

  // Si estamos en la pantalla /tracking, leer el código del querystring y cargar el viaje automáticamente
  useEffect(() => {
    if (pathname !== '/tracking') return;
    const fromQuery = (searchParams?.get('code') || '').trim().toUpperCase();

    if (!fromQuery) return;
    if (fromQuery === trackingCode) return;

    setTrackingCode(fromQuery);
    fetchRideData(fromQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  const originLabel = getLocationLabel(apiRide?.origin, copy.originFallback);
  const extraLabel = getLocationLabel(apiRide?.extraDestination, copy.extraFallback);
  const finalLabel = getLocationLabel(
    apiRide?.finalDestination || apiRide?.destination,
    copy.finalFallback,
  );

  const estimatedDistanceKm =
    typeof apiRide?.estimatedDistance === 'number' ? apiRide.estimatedDistance / 1000 : null;
  const estimatedDurationMinutes =
    typeof apiRide?.estimatedDuration === 'number'
      ? Math.round(apiRide.estimatedDuration / 60)
      : null;

  const isDedicatedTracking = pathname === '/tracking';

  if (isDedicatedTracking) {
    return (
      <View style={styles.fullscreenRoot}>
        <View style={styles.fullscreenMapWrapper}>
          <TrackingDynamicMap ride={apiRide} />
        </View>

        <View style={styles.overlayGradient} pointerEvents="none" />

        <View style={styles.overlayCardContainer} pointerEvents="box-none">
          <View style={styles.overlayCard}>
            <Text style={styles.overlayLabel}>{copy.inputLabel}</Text>
            <TextInput
              value={trackingCode}
              onChangeText={(text) => setTrackingCode(text.toUpperCase())}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder={copy.overlayPlaceholder}
              placeholderTextColor={colors.textSecondary}
              style={styles.overlayInput}
            />

            <View style={styles.overlayButtonsRow}>
              <TouchableOpacity
                style={styles.overlayPrimaryButton}
                activeOpacity={0.85}
                onPress={handleViewTrip}
              >
                <Text style={styles.overlayPrimaryButtonText}>
                  {loading ? copy.viewButtonLoading : copy.viewButtonIdle}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.overlaySecondaryButton}
                activeOpacity={0.85}
                onPress={handleSimulateNext}
              >
                <Text style={styles.overlaySecondaryButtonText}>{copy.simulateShort}</Text>
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
            {currentStatus === 'canceled' ? (
              <View style={styles.canceledMessageBox}>
                <Text style={styles.canceledMessage}>{copy.canceledMessage}</Text>
              </View>
            ) : (
              <>
                <View style={styles.overlayStopsRow}>
                  <View style={styles.overlayStopItem}>
                    <Image
                      source={originMarkerIcon}
                      style={styles.overlayStopIcon as any}
                      resizeMode="contain"
                    />
                    <Text style={styles.overlayStopLabel} numberOfLines={1}>
                      {originLabel}
                    </Text>
                  </View>

                  <View style={styles.overlayStopItem}>
                    <Image
                      source={extraDestinationIcon}
                      style={styles.overlayStopIcon as any}
                      resizeMode="contain"
                    />
                    <Text style={styles.overlayStopLabel} numberOfLines={1}>
                      {extraLabel}
                    </Text>
                  </View>

                  <View style={styles.overlayStopItem}>
                    <Image
                      source={finalDestinationIcon}
                      style={styles.overlayStopIcon as any}
                      resizeMode="contain"
                    />
                    <Text style={styles.overlayStopLabel} numberOfLines={1}>
                      {finalLabel}
                    </Text>
                  </View>
                </View>

                <View style={styles.routeInfoBox}>
                  <View style={styles.routeTimeRow}>
                    <Image source={percentIcon} style={styles.percentIcon} resizeMode="contain" />
                    <View style={styles.routeTimeTextContainer}>
                      <Text style={styles.routeTimeMain}>
                        {estimatedDurationMinutes != null && estimatedDistanceKm != null
                          ? `${estimatedDurationMinutes} ${copy.timeUnit} (${estimatedDistanceKm.toFixed(1)} ${copy.distanceUnit})`
                          : copy.routeProgressTitle}
                      </Text>
                      <Text style={styles.routeTimeSub}>
                        {apiRide?.hasTracking ? copy.routeRealtime : copy.routeEstimated}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.progressWrapper}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progressFraction * 100}%` }]} />
                  </View>

                  <View style={styles.progressLabelsRow}>
                    {progressOrder.map((status) => {
                      const isActive = currentStatus === status;

                      return (
                        <Text
                          key={status}
                          style={[styles.progressLabel, isActive && styles.progressLabelActive]}
                        >
                          {statusLabels[status]}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: themeColors.background }]}>
      <SectionHeader
        title={copy.sectionTitle}
        subtitle={copy.sectionSubtitle}
        align="center"
      />

      <View style={[styles.container, isNarrow && styles.containerNarrow]}>
        <Reveal style={{ flex: 1, minWidth: 280, display: 'flex' }}>
        <View
          style={[
            styles.left,
            isNarrow && styles.leftNarrow,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}
        >
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>{copy.inputLabel}</Text>
          <View style={styles.inputWrap}>
            <View style={styles.inputIconWrap}>
              <Hash size={15} color={themeColors.textSecondary} strokeWidth={2.2} />
            </View>
            <TextInput
              value={trackingCode}
              onChangeText={(text) => setTrackingCode(text.toUpperCase())}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder={copy.inlinePlaceholder}
              placeholderTextColor={themeColors.textSecondary}
              style={[
                styles.input,
                {
                  color: themeColors.text,
                  borderColor: themeColors.border,
                  backgroundColor: themeColors.surface,
                },
              ]}
            />
          </View>

          <View style={styles.buttonsRow}>
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              style={{ marginRight: 8, marginBottom: 8, display: 'flex' }}
            >
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundImage: gradients.gold } as any]}
                activeOpacity={0.85}
                onPress={handleViewTrip}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? copy.viewButtonLoading : copy.viewButtonIdle}
                </Text>
                <ArrowRight size={14} color="#000" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              style={{ marginBottom: 8, display: 'flex' }}
            >
              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: themeColors.goldBorder }]}
                activeOpacity={0.85}
                onPress={handleSimulateNext}
              >
                <Play size={12} color={themeColors.gold} style={{ marginRight: 6 }} />
                <Text style={[styles.secondaryButtonText, { color: themeColors.text }]}>
                  {copy.simulateProgress}
                </Text>
              </TouchableOpacity>
            </motion.div>
          </View>

          <Text style={[styles.helperText, { color: themeColors.textSecondary }]}>{copy.helperText}</Text>

          {error && (
            <Text style={styles.errorText}>
              {error}
            </Text>
          )}

          {currentStatus && (
            <View
              style={[
                styles.statusBox,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}
            >
              <Text style={[styles.statusLabel, { color: themeColors.textSecondary }]}>
                {copy.statusLabel}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  { color: themeColors.gold },
                  currentStatus === 'canceled' && styles.statusCanceled,
                  currentStatus === 'completed' && styles.statusCompleted,
                ]}
              >
                {currentStatus ? statusLabels[currentStatus as TripStatus] : ''}
              </Text>

              {currentStatus !== 'canceled' &&
                apiRide &&
                typeof apiRide.progress === 'number' && (
                  <Text style={[styles.progressText, { color: themeColors.textSecondary }]}>
                    {copy.estimatedProgressPrefix}:{' '}
                    {Math.round(Math.min(Math.max(apiRide.progress, 0), 100))}%
                  </Text>
                )}

              {currentStatus !== 'completed' && currentStatus !== 'canceled' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelSimulated}
                  activeOpacity={0.85}
                >
                  <Text style={styles.cancelButtonText}>{copy.cancelSimulation}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        </Reveal>
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
  fullscreenRoot: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  fullscreenMapWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  overlayCardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.horizontalPadding,
  },
  overlayCard: {
    alignSelf: 'flex-start',
    maxWidth: 420,
    minWidth: 280,
    borderRadius: 24,
    backgroundColor: 'rgba(10,10,14,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.6)',
    padding: 18,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: layout.contentMaxWidth,
  },
  left: {
    flex: 1,
    minWidth: 280,
    maxWidth: 620,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 24,
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
  },
  containerNarrow: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  leftNarrow: {
    paddingHorizontal: 16,
  },
  right: {
    flex: 1,
    minWidth: 280,
  },
  label: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 6,
  },
  inputWrap: {
    position: 'relative',
    marginBottom: 10,
  },
  inputIconWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingLeft: 36,
    paddingVertical: 11,
    color: colors.text,
    backgroundColor: colors.surface,
    fontSize: 14,
    letterSpacing: 1.5,
  },
  overlayLabel: {
    fontSize: 13,
    color: '#F9FAFB',
    marginBottom: 6,
  },
  overlayInput: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: 12,
    fontSize: 13,
  },
  overlayButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  overlayPrimaryButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
    marginRight: 8,
  },
  overlayPrimaryButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
  overlaySecondaryButton: {
    borderColor: colors.goldLight,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  overlaySecondaryButtonText: {
    color: '#F9FAFB',
    fontWeight: '600',
    fontSize: 12,
  },
  overlayStopsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  overlayStopItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  overlayStopIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  overlayStopLabel: {
    flex: 1,
    fontSize: 11,
    color: '#E5E7EB',
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryButton: {
    borderColor: colors.gold,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 13,
  },
  helperText: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: typography.small,
    color: colors.accentRed,
    marginBottom: 10,
  },
  canceledMessageBox: {
    marginTop: 8,
    marginBottom: 4,
  },
  canceledMessage: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accentRed,
  },
  statusBox: {
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gold,
    marginBottom: 6,
  },
  statusCanceled: {
    color: colors.accentRed,
  },
  statusCompleted: {
    color: colors.accentGreen,
  },
  progressText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(244,67,54,0.15)',
  },
  cancelButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accentRed,
  },
  mapCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  mapHeader: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mapHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  mapHeaderSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  mapBody: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  mapPreviewWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#050608',
    marginBottom: 12,
  },
  mapPreviewInner: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#050608',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  mapVehicleBadgeContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    alignItems: 'center',
  },
  mapVehicleBadge: {
    width: 54,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapVehicleImage: {
    width: 40,
    height: 24,
  },
  stopsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stopColumn: {
    alignItems: 'center',
    flex: 1,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  stopIconImage: {
    width: 26,
    height: 26,
    marginBottom: 4,
  },
  stopOrigin: {
    backgroundColor: colors.accentBlue,
  },
  stopExtra: {
    backgroundColor: colors.gold,
  },
  stopFinal: {
    backgroundColor: colors.accentGreen,
  },
  stopLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  routeLine: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  vehicleText: {
    fontSize: 16,
  },
  vehicleHint: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
    flexWrap: 'wrap',
  },
  routeInfoBox: {
    marginTop: 4,
    marginBottom: 6,
  },
  routeTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  routeTimeTextContainer: {
    flex: 1,
  },
  routeTimeMain: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 2,
  },
  routeTimeSub: {
    fontSize: 11,
    color: '#E5E7EB',
  },
  progressWrapper: {
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.gold,
  },
  progressLabelsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  progressLabel: {
    fontSize: 10,
    color: '#E5E7EB',
    marginRight: 10,
    marginBottom: 4,
  },
  progressLabelActive: {
    color: colors.goldLight,
    fontWeight: '600',
  },
  mapFooter: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  mapFooterText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});

export default TripTrackingSection;
