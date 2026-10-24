'use client';

import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import type { PublicRideTrackingRide } from '../../functions/publicRideTrackingClient';
import { ensureVehicleIconUri, extractVehicleTypeFromInfo } from '../../utils/vehicleIcons';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const ORIGIN_ICON = '/assets/images/icons/origin_marker/origin_marker.png';
const EXTRA_ICON = '/assets/images/icons/select-extra-destination/selectextradestination.png';
const FINAL_ICON = '/assets/images/icons/select-final-destination/selectfinaldestination.png';
const FALLBACK_VEHICLE_ICON = '/assets/images/icons/requests_pin/requests_pin2x.png';

interface LatLng {
  lat: number;
  lng: number;
}

type MarkerKind = 'origin' | 'extra' | 'final' | 'vehicle';

const DEFAULT_CENTER: LatLng = { lat: 12.136389, lng: -86.251389 }; // Managua

export function getLatLngFromLocation(location: any): LatLng | null {
  if (!location || typeof location !== 'object') return null;
  const loc = location as any;
  const lat =
    typeof loc.latitude === 'number'
      ? loc.latitude
      : typeof loc.lat === 'number'
      ? loc.lat
      : typeof loc.location?.lat === 'number'
      ? loc.location.lat
      : null;
  const lng =
    typeof loc.longitude === 'number'
      ? loc.longitude
      : typeof loc.lng === 'number'
      ? loc.lng
      : typeof loc.location?.lng === 'number'
      ? loc.location.lng
      : null;
  return typeof lat === 'number' && typeof lng === 'number' ? { lat, lng } : null;
}

export default function TrackingMap({ ride }: { ride: PublicRideTrackingRide | null }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'rundi-tracking-map',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const inferredVehicleType = ride
    ? extractVehicleTypeFromInfo(ride.driverInfo ?? {}) || ride.serviceType || null
    : null;
  const vehicleIconUrl = ensureVehicleIconUri(inferredVehicleType) ?? FALLBACK_VEHICLE_ICON;

  const iconByType: Record<MarkerKind, string> = {
    origin: ORIGIN_ICON,
    extra: EXTRA_ICON,
    final: FINAL_ICON,
    vehicle: vehicleIconUrl,
  };

  const { center, markers, origin, extra, finalDest } = useMemo(() => {
    if (!ride) {
      return { center: DEFAULT_CENTER, markers: [], origin: null, extra: null, finalDest: null } as {
        center: LatLng;
        markers: { position: LatLng; type: MarkerKind }[];
        origin: LatLng | null;
        extra: LatLng | null;
        finalDest: LatLng | null;
      };
    }
    const origin = getLatLngFromLocation(ride.origin);
    const extra = getLatLngFromLocation(ride.extraDestination);
    const finalDest = getLatLngFromLocation(ride.finalDestination || ride.destination);
    const vehicle = ride.vehicleLocation
      ? { lat: ride.vehicleLocation.latitude, lng: ride.vehicleLocation.longitude }
      : null;
    const candidates = [vehicle, origin, finalDest, extra].filter(Boolean) as LatLng[];
    const markersList: { position: LatLng; type: MarkerKind }[] = [];
    if (origin) markersList.push({ position: origin, type: 'origin' });
    if (extra) markersList.push({ position: extra, type: 'extra' });
    if (finalDest) markersList.push({ position: finalDest, type: 'final' });
    if (vehicle) markersList.push({ position: vehicle, type: 'vehicle' });
    return { center: candidates[0] || DEFAULT_CENTER, markers: markersList, origin, extra, finalDest };
  }, [ride]);

  const [routePath, setRoutePath] = useState<LatLng[]>([]);

  useEffect(() => {
    const simplePath: LatLng[] = [];
    if (origin) simplePath.push(origin);
    if (extra) simplePath.push(extra);
    if (finalDest) simplePath.push(finalDest);

    if (!origin || !finalDest || !isLoaded || typeof window === 'undefined') {
      setRoutePath(simplePath);
      return;
    }
    const g = (window as any).google;
    if (!g?.maps?.DirectionsService) {
      setRoutePath(simplePath);
      return;
    }
    let cancelled = false;
    const directionsService = new g.maps.DirectionsService();
    const request: any = { origin, destination: finalDest, travelMode: g.maps.TravelMode.DRIVING };
    if (extra) request.waypoints = [{ location: extra, stopover: true }];
    directionsService.route(request, (result: any, status: any) => {
      if (cancelled) return;
      if (status === 'OK' && result?.routes?.[0]?.overview_path?.length) {
        setRoutePath(
          result.routes[0].overview_path.map((p: any) => ({ lat: p.lat(), lng: p.lng() })),
        );
      } else {
        setRoutePath(simplePath);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [origin, extra, finalDest, isLoaded]);

  if (!GOOGLE_MAPS_API_KEY.trim() || loadError) {
    return <div className="loader">Mapa no disponible</div>;
  }
  if (!isLoaded) {
    return <div className="loader">Cargando mapa…</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      zoom={14}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        backgroundColor: '#050608',
        gestureHandling: 'greedy',
      }}
    >
      {routePath.length >= 2 && (
        <Polyline
          path={routePath}
          options={{ strokeColor: '#D4AF37', strokeOpacity: 1, strokeWeight: 5 }}
        />
      )}
      {markers.map((m, i) => (
        <Marker key={i} position={m.position} icon={iconByType[m.type]} />
      ))}
    </GoogleMap>
  );
}
