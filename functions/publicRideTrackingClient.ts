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
  // Cuando el acceso es por código de seguimiento, el backend no expone el rideId real
  rideId: string | null;
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

/**
 * Error tipado del endpoint getPublicRideTracking. `code` trae el código de
 * error del backend (p. ej. 'invalid-code', 'code-expired', 'not-found').
 */
export class PublicRideTrackingError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, options: { code?: string; status?: number } = {}) {
    super(message);
    this.name = 'PublicRideTrackingError';
    this.code = options.code;
    this.status = options.status;
  }
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
 * Llama al endpoint HTTP getPublicRideTracking en Firebase Functions usando un
 * código de seguimiento (rideTrackingCodes en Realtime DB). No requiere
 * autenticación; el código resuelve el viaje internamente sin exponer el rideId.
 */
export async function fetchPublicRideTracking(
  code: string,
  options: FetchPublicRideTrackingOptions = {},
): Promise<PublicRideTrackingResponse> {
  const trimmedCode = code.trim().toUpperCase();
  if (!trimmedCode) {
    throw new PublicRideTrackingError(
      'El código de seguimiento es requerido para obtener el tracking público',
      { code: 'invalid-argument' },
    );
  }

  const baseUrl = getBaseUrl(options.baseUrl);
  const url = `${baseUrl}/getPublicRideTracking`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: trimmedCode }),
  });

  let json: any;
  try {
    json = await res.json();
  } catch (error) {
    throw new PublicRideTrackingError(
      `Respuesta inválida del servidor getPublicRideTracking: ${String(error)}`,
    );
  }

  if (!res.ok) {
    const message = typeof json?.error === 'string' ? json.error : `Error HTTP ${res.status}`;
    const code = typeof json?.code === 'string' ? json.code : undefined;
    throw new PublicRideTrackingError(message, { code, status: res.status });
  }

  const response: PublicRideTrackingResponse = {
    success: !!json?.success,
    ride: json?.ride ?? undefined,
    error: json?.error ?? undefined,
    code: json?.code ?? undefined,
  };

  return response;
}
