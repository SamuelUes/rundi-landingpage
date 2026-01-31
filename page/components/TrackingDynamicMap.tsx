'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { colors } from '../theme/colors';
import type { PublicRideTrackingRide } from '../functions/publicRideTrackingClient';
import { ensureVehicleIconUri, extractVehicleTypeFromInfo } from '../utils/vehicleIcons';
import originMarkerPng from '../assets/icons/origin_marker/origin_marker.png';
import multipleLocationPng from '../assets/icons/multiplelocationmarker/multiplelocationmarker.png';
import finalDestinationPng from '../assets/icons/select-final-destination/selectfinaldestination.png';

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

  const { center, markers, origin, extra, finalDest } = useMemo(() => {
    if (!ride) {
      return {
        center: DEFAULT_CENTER,
        markers: [] as { position: LatLng; type: MarkerKind }[],
        origin: null as LatLng | null,
        extra: null as LatLng | null,
        finalDest: null as LatLng | null,
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

    return {
      center: centerPoint,
      markers: markersList,
      origin,
      extra,
      finalDest,
    };
  }, [ride]);

  const [routePath, setRoutePath] = useState<LatLng[]>([]);

  useEffect(() => {
    // Ruta simple como único fallback (líneas rectas entre puntos conocidos)
    const simplePath: LatLng[] = [];
    if (origin) simplePath.push(origin);
    if (extra) simplePath.push(extra);
    if (finalDest) simplePath.push(finalDest);

    // Si faltan origen o destino final, solo mostramos la ruta simple (si existe)
    if (!origin || !finalDest) {
      setRoutePath(simplePath);
      return;
    }

    // Si el mapa aún no está cargado o estamos en SSR, usamos también la ruta simple
    if (!isLoaded || typeof window === 'undefined') {
      setRoutePath(simplePath);
      return;
    }

    const g = (window as any).google;
    if (!g?.maps || !g.maps.DirectionsService) {
      setRoutePath(simplePath);
      return;
    }

    let cancelled = false;
    const directionsService = new g.maps.DirectionsService();

    const request: any = {
      origin,
      destination: finalDest,
      travelMode: g.maps.TravelMode.DRIVING,
    };

    if (extra) {
      request.waypoints = [{ location: extra, stopover: true }];
    }

    directionsService.route(request, (result: any, status: any) => {
      if (cancelled) return;

      if (status === 'OK' && result?.routes?.[0]?.overview_path?.length) {
        const overviewPath = result.routes[0].overview_path;
        const decoded: LatLng[] = overviewPath.map((p: any) => ({
          lat: p.lat(),
          lng: p.lng(),
        }));
        // Sobrescribimos siempre con la ruta de Directions para que solo exista una
        setRoutePath(decoded);
      } else {
        // Si Directions falla, usamos solo la ruta simple
        setRoutePath(simplePath);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [origin, extra, finalDest, isLoaded]);

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
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [],
        backgroundColor: '#050608',
        gestureHandling: 'greedy',
      }}
    >
      {routePath.length >= 2 && (
        <Polyline
          path={routePath}
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
