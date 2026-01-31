export type PublicRideStatus =
  | 'requested'
  | 'driver_offered'
  | 'driver_on_route'
  | 'driver_on_way'
  | 'driver_arrived'
  | 'in_progress'
  | 'pending_payment'
  | 'pending_rating'
  | 'completed'
  | 'canceled'
  | string; // fallback seguro por si aparecen estados nuevos

export interface PublicRideLocation {
  latitude: number;
  longitude: number;
  [key: string]: any;
}

export interface PublicRideTrackingRide {
  rideId: string;
  source: 'active' | 'completed';
  status: PublicRideStatus | null;
  serviceType: string | null;
  origin: any | null;
  destination: any | null;
  extraDestination: any | null;
  finalDestination: any | null;
  vehicleLocation: PublicRideLocation | null;
   driverId: string | null;
   driverInfo: any | null;
   vehicleHeading: number | null;
  estimatedDistance: number | null;
  estimatedDuration: number | null;
  estimatedPrice: number | null;
  progress: number | null;
  hasTracking: boolean;
}

export interface PublicRideTrackingResponse {
  success: boolean;
  ride?: PublicRideTrackingRide;
  error?: string;
  code?: string;
}

export interface FetchPublicRideTrackingOptions {
  /**
   * Base URL de las Cloud Functions HTTP, por ejemplo:
   * https://us-central1-tu-proyecto.cloudfunctions.net
   * Si no se especifica, se usa NEXT_PUBLIC_FUNCTIONS_BASE_URL
   */
  baseUrl?: string;
}

function getBaseUrl(override?: string): string {
  const fromOverride = override?.trim();
  if (fromOverride) return fromOverride.replace(/\/$/, '');

  const fromEnv = (process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL || '').trim();
  if (!fromEnv) {
    throw new Error(
      'NEXT_PUBLIC_FUNCTIONS_BASE_URL no está configurada. Define esta variable de entorno con la URL base de tus Cloud Functions.',
    );
  }

  return fromEnv.replace(/\/$/, '');
}

/**
 * Llama al endpoint HTTP getPublicRideTracking en Firebase Functions.
 * No requiere autenticación; solo usa el rideId y devuelve datos públicos del viaje.
 */
export async function fetchPublicRideTracking(
  rideId: string,
  options: FetchPublicRideTrackingOptions = {},
): Promise<PublicRideTrackingResponse> {
  const trimmedId = rideId.trim();
  if (!trimmedId) {
    throw new Error('rideId es requerido para obtener el tracking público');
  }

  const baseUrl = getBaseUrl(options.baseUrl);
  const url = `${baseUrl}/getPublicRideTracking`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rideId: trimmedId }),
  });

  let json: any;
  try {
    json = await res.json();
  } catch (error) {
    throw new Error(`Respuesta inválida del servidor getPublicRideTracking: ${String(error)}`);
  }

  if (!res.ok) {
    const message = typeof json?.error === 'string' ? json.error : `Error HTTP ${res.status}`;
    const code = typeof json?.code === 'string' ? json.code : undefined;
    throw new Error(code ? `${code}: ${message}` : message);
  }

  const response: PublicRideTrackingResponse = {
    success: !!json?.success,
    ride: json?.ride ?? undefined,
    error: json?.error ?? undefined,
    code: json?.code ?? undefined,
  };

  return response;
}
