'use client';

import React, { useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { colors } from '../theme/colors';
import type { PublicRideTrackingRide } from '../functions/publicRideTrackingClient';
import { ensureVehicleIconUri, extractVehicleTypeFromInfo } from '../utils/vehicleIcons';
import originMarkerPng from '../assets/icons/origin_marker/origin_marker_2x.png';
import multipleLocationPng from '../assets/icons/multiplelocationmarker/multiplelocationmarker_2x.png';
import finalDestinationPng from '../assets/icons/select-final-destination/selectfinaldestination_2x.png';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface LatLng {
  lat: number;
  lng: number;
}

interface TrackingDynamicMapProps {
  ride: PublicRideTrackingRide | null;
}

type MarkerKind = 'origin' | 'extra' | 'final' | 'vehicle';

const DEFAULT_CENTER: LatLng = {
  // Managua aproximado
  lat: 12.136389,
  lng: -86.251389,
};

function getLatLngFromLocation(location: any | null | undefined): LatLng | null {
  if (!location || typeof location !== 'object') return null;

  const anyLoc = location as any;

  const lat =
    typeof anyLoc.latitude === 'number'
      ? anyLoc.latitude
      : typeof anyLoc.lat === 'number'
      ? anyLoc.lat
      : typeof anyLoc.location?.lat === 'number'
      ? anyLoc.location.lat
      : null;

  const lng =
    typeof anyLoc.longitude === 'number'
      ? anyLoc.longitude
      : typeof anyLoc.lng === 'number'
      ? anyLoc.lng
      : typeof anyLoc.location?.lng === 'number'
      ? anyLoc.location.lng
      : null;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return null;
  }

  return { lat, lng };
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const TrackingDynamicMap: React.FC<TrackingDynamicMapProps> = ({ ride }) => {
  const hasApiKey = GOOGLE_MAPS_API_KEY.trim().length > 0;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'rundi-tracking-map',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const originIconUrl = (originMarkerPng as any).src || (originMarkerPng as any);
  const multiIconUrl = (multipleLocationPng as any).src || (multipleLocationPng as any);
  const finalIconUrl = (finalDestinationPng as any).src || (finalDestinationPng as any);

  const inferredVehicleType = ride
    ? extractVehicleTypeFromInfo(ride.driverInfo ?? {}) || ride.serviceType || null
    : null;

  const vehicleIconUrl = ensureVehicleIconUri(inferredVehicleType) ?? multiIconUrl;

  const iconByType: Record<MarkerKind, string | undefined> = {
    origin: originIconUrl,
    extra: multiIconUrl,
    final: finalIconUrl,
    vehicle: vehicleIconUrl,
  };

  const { center, markers, path } = useMemo(() => {
    if (!ride) {
      return {
        center: DEFAULT_CENTER,
        markers: [] as { position: LatLng; type: MarkerKind }[],
        path: [] as LatLng[],
      };
    }

    const origin = getLatLngFromLocation(ride.origin);
    const extra = getLatLngFromLocation(ride.extraDestination);
    const finalDest = getLatLngFromLocation(ride.finalDestination || ride.destination);
    const vehicle = ride.vehicleLocation
      ? { lat: ride.vehicleLocation.latitude, lng: ride.vehicleLocation.longitude }
      : null;

    const candidates: LatLng[] = [];
    if (vehicle) candidates.push(vehicle);
    if (origin) candidates.push(origin);
    if (finalDest) candidates.push(finalDest);
    if (extra) candidates.push(extra);

    const centerPoint = candidates[0] || DEFAULT_CENTER;

    const markersList: { position: LatLng; type: MarkerKind }[] = [];
    if (origin) markersList.push({ position: origin, type: 'origin' });
    if (extra) markersList.push({ position: extra, type: 'extra' });
    if (finalDest) markersList.push({ position: finalDest, type: 'final' });
    if (vehicle) markersList.push({ position: vehicle, type: 'vehicle' });

    const pathPoints: LatLng[] = [];
    if (origin) pathPoints.push(origin);
    if (extra) pathPoints.push(extra);
    if (finalDest) pathPoints.push(finalDest);

    return {
      center: centerPoint,
      markers: markersList,
      path: pathPoints,
    };
  }, [ride]);

  if (!hasApiKey) {
    return <View style={styles.fallback} />;
  }

  if (loadError) {
    return <View style={styles.fallback} />;
  }

  if (!isLoaded) {
    return (
      <View style={styles.loaderWrapper}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        styles: [],
        backgroundColor: '#050608',
      }}
    >
      {path.length >= 2 && (
        <Polyline
          path={path}
          options={{
            strokeColor: '#FDD835',
            strokeOpacity: 1,
            strokeWeight: 5,
          }}
        />
      )}

      {markers.map((m, idx) => (
        <Marker
          key={idx}
          position={m.position}
          icon={iconByType[m.type]}
        />
      ))}
    </GoogleMap>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050608',
  },
  fallback: {
    flex: 1,
    backgroundColor: '#050608',
  },
});

export default TrackingDynamicMap;
