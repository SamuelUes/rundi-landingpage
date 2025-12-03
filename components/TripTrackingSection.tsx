'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SectionHeader from './SectionHeader';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { fetchPublicRideTracking, PublicRideTrackingRide } from '../../functions';
import TrackingDynamicMap from './TrackingDynamicMap';

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

const statusLabels: Record<TripStatus, string> = {
  driver_on_way: 'Conductor en camino',
  driver_arrived: 'Conductor ha llegado',
  in_progress: 'Viaje en curso',
  pending_payment: 'Pendiente de pago',
  completed: 'Completado',
  canceled: 'Cancelado',
};

const progressOrder: TripStatus[] = [
  'driver_on_way',
  'driver_arrived',
  'in_progress',
  'pending_payment',
  'completed',
];

interface TripTrackingSectionProps {
  scrollY?: any;
}

const TripTrackingSection: React.FC<TripTrackingSectionProps> = ({ scrollY }) => {
  const [rideId, setRideId] = useState('');
  const [currentStatus, setCurrentStatus] = useState<TripStatus | null>(null);
  const [apiRide, setApiRide] = useState<PublicRideTrackingRide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchRideData = async (id: string) => {
    const trimmedId = id.trim();
    if (!trimmedId) return;
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const response = await fetchPublicRideTracking(trimmedId);

      if (response.success && response.ride) {
        setApiRide(response.ride);
        const mappedStatus = mapRemoteStatusToTripStatus(response.ride.status ?? null);
        setCurrentStatus(mappedStatus);
      } else {
        setApiRide(null);
        setCurrentStatus(null);
        setError(response.error || 'No se pudo obtener la información del viaje.');
      }
    } catch (err: any) {
      setApiRide(null);
      setCurrentStatus(null);
      setError(typeof err?.message === 'string' ? err.message : 'Error obteniendo la información del viaje.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewTrip = async () => {
    const trimmedId = rideId.trim();
    if (!trimmedId) {
      return;
    }

    // Si no estamos en la pantalla dedicada de tracking, navegar allí con el rideId
    if (pathname !== '/tracking') {
      router.push(`/tracking?rideId=${encodeURIComponent(trimmedId)}`);
      return;
    }

    await fetchRideData(trimmedId);
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

  // Si estamos en la pantalla /tracking, leer rideId del querystring y cargar el viaje automáticamente
  useEffect(() => {
    if (pathname !== '/tracking') return;
    const fromQuery = searchParams?.get('rideId');
    const trimmed = (fromQuery || '').trim();

    if (!trimmed) return;
    if (trimmed === rideId) return;

    setRideId(trimmed);
    fetchRideData(trimmed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  const originLabel = getLocationLabel(apiRide?.origin, 'Origen');
  const extraLabel = getLocationLabel(apiRide?.extraDestination, 'Destino extra');
  const finalLabel = getLocationLabel(
    apiRide?.finalDestination || apiRide?.destination,
    'Destino final',
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

        <View style={styles.overlayGradient} />

        <View style={styles.overlayCardContainer}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayLabel}>ID del viaje</Text>
            <TextInput
              value={rideId}
              onChangeText={setRideId}
              placeholder="Pegá aquí el ID del viaje"
              placeholderTextColor={colors.textSecondary}
              style={styles.overlayInput}
            />

            <View style={styles.overlayButtonsRow}>
              <TouchableOpacity
                style={styles.overlayPrimaryButton}
                activeOpacity={0.85}
                onPress={handleViewTrip}
              >
                <Text style={styles.overlayPrimaryButtonText}>{loading ? 'Cargando…' : 'Ver viaje'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.overlaySecondaryButton}
                activeOpacity={0.85}
                onPress={handleSimulateNext}
              >
                <Text style={styles.overlaySecondaryButtonText}>Simular</Text>
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

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
                      ? `${estimatedDurationMinutes} min (${estimatedDistanceKm.toFixed(1)} km)`
                      : 'Progreso del viaje'}
                  </Text>
                  <Text style={styles.routeTimeSub}>
                    {apiRide?.hasTracking
                      ? 'Ruta en tiempo real usando la ubicación del vehículo.'
                      : 'Mostrando un progreso estimado del viaje.'}
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
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <SectionHeader
        title="Sigue tu viaje en tiempo real"
        subtitle="Ingresa el ID de tu viaje para ver la ruta, la ubicación del vehículo y los puntos de origen y destinos."
        align="center"
      />

      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.label}>ID del viaje</Text>
          <TextInput
            value={rideId}
            onChangeText={setRideId}
            placeholder="-Oc65hcWJrBzY2EnrwVO"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={handleViewTrip}
            >
              <Text style={styles.primaryButtonText}>{loading ? 'Cargando…' : 'Ver viaje'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={handleSimulateNext}
            >
              <Text style={styles.secondaryButtonText}>Simular progreso</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.helperText}>
            Esta sección se conectará con los datos reales de la app para mostrar el recorrido del viaje, la ubicación del
            vehículo y los puntos de origen, destino extra y destino final.
          </Text>

          {error && (
            <Text style={styles.errorText}>
              {error}
            </Text>
          )}

          {currentStatus && (
            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>Estado del viaje:</Text>
              <Text
                style={[
                  styles.statusText,
                  currentStatus === 'canceled' && styles.statusCanceled,
                  currentStatus === 'completed' && styles.statusCompleted,
                ]}
              >
                {currentStatus ? statusLabels[currentStatus as TripStatus] : ''}
              </Text>

              {apiRide && typeof apiRide.progress === 'number' && (
                <Text style={styles.progressText}>
                  Progreso estimado: {Math.round(Math.min(Math.max(apiRide.progress, 0), 100))}%
                </Text>
              )}

              {currentStatus !== 'completed' && currentStatus !== 'canceled' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelSimulated}
                  activeOpacity={0.85}
                >
                  <Text style={styles.cancelButtonText}>Simular cancelación</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
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
  fullscreenRoot: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.background,
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
    backgroundColor: 'rgba(10,10,14,0.95)',
    borderWidth: 1,
    borderColor: colors.border,
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
    paddingRight: 16,
    marginBottom: 24,
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
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: 10,
    fontSize: 13,
  },
  overlayLabel: {
    fontSize: 13,
    color: colors.text,
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
    borderColor: colors.gold,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  overlaySecondaryButtonText: {
    color: colors.text,
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
    color: colors.textSecondary,
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryButton: {
    borderColor: colors.gold,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 8,
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
  statusBox: {
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
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
    color: colors.text,
    marginBottom: 2,
  },
  routeTimeSub: {
    fontSize: 11,
    color: colors.textSecondary,
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
    color: colors.textSecondary,
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
