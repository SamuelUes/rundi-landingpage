export interface EstimateRidePriceInput {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  extraStop?: { lat: number; lng: number } | null;
  distanceMeters: number;
  durationSeconds: number;
  vehicleType: 'car' | 'moto' | 'designated';
}

/**
 * Pide la tarifa estimada a la Cloud Function pública de precios.
 * El nombre del endpoint se puede sobreescribir con
 * NEXT_PUBLIC_PRICE_ESTIMATE_PATH (default: 'calculateRidePriceHttp').
 *
 * Devuelve null si el endpoint no existe o responde con error — el caller
 * debe tener una tarifa de respaldo.
 */
export async function estimateRidePrice(
  input: EstimateRidePriceInput,
): Promise<number | null> {
  const base = (process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL || '').trim().replace(/\/$/, '');
  if (!base) return null;

  const endpoint = (process.env.NEXT_PUBLIC_PRICE_ESTIMATE_PATH || 'calculateRidePriceHttp')
    .trim()
    .replace(/^\//, '');

  // Contrato de calculateRidePriceHttp (app-rundi/functions):
  // { distanceInMeters, durationInSeconds, vehicleType: 'car'|'motorcycle',
  //   rideType: 'normal'|'designated_driver', originLat, originLng, extraStops }
  const body = {
    distanceInMeters: input.distanceMeters,
    durationInSeconds: input.durationSeconds,
    vehicleType: input.vehicleType === 'moto' ? 'motorcycle' : 'car',
    rideType: input.vehicleType === 'designated' ? 'designated_driver' : 'normal',
    originLat: input.origin.lat,
    originLng: input.origin.lng,
    extraStops: input.extraStop ? 1 : 0,
  };

  try {
    const res = await fetch(`${base}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const p =
      json?.finalPrice ??
      json?.price ??
      json?.estimatedPrice ??
      json?.data?.price ??
      json?.data?.finalPrice ??
      json?.fare;
    const n = typeof p === 'string' ? parseFloat(p) : p;
    return typeof n === 'number' && isFinite(n) && n > 0 ? Math.round(n) : null;
  } catch {
    return null;
  }
}
