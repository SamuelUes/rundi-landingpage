'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Loader2, LocateFixed, X } from 'lucide-react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';
import { estimateRidePrice } from '../../functions/estimateRidePriceClient';

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const MAP_LIBS: any = ['places'];

// Sesgo de sugerencias/autocompletado al área metropolitana de Managua
const MANAGUA_BOUNDS = { north: 12.22, south: 12.02, east: -86.16, west: -86.38 };

type Pt = { lat: number; lng: number; label: string };
type PtsKey = 'o' | 'e' | 'd';

const VEHICLES = [
  {
    key: 'car',
    fare: 'C$ 95 – 130',
    img: '/assets/images/icons/Convertible_Car_Sedan/Convertible_Car_Sedan.png',
    v: false,
  },
  {
    key: 'moto',
    fare: 'C$ 55 – 80',
    img: '/assets/images/icons/moto/moto_icon.png',
    v: false,
  },
  {
    key: 'designado',
    fare: 'C$ 150 – 200',
    img: '/assets/images/icons/utils/car_safed.png',
    v: true,
  },
];

// Tarifa de respaldo (C$) — se usa si la Cloud Function de precios no responde.
// Ajustar a las tarifas reales de la app.
const FARES: Record<string, { base: number; km: number; min: number }> = {
  car: { base: 45, km: 26, min: 3 },
  moto: { base: 28, km: 16, min: 2.2 },
  designado: { base: 70, km: 32, min: 3.5 },
};

function localEstimate(key: string, meters: number, secs: number): number {
  const f = FARES[key] ?? FARES.car;
  return Math.max(Math.round((f.base + (meters / 1000) * f.km + (secs / 60) * f.min) / 5) * 5, f.base);
}

function geocodeText(text: string): Promise<Pt | null> {
  return new Promise((resolve) => {
    const g = (window as any).google;
    if (!g?.maps?.Geocoder || !text.trim()) return resolve(null);
    new g.maps.Geocoder().geocode(
      { address: `${text}, Managua, Nicaragua`, bounds: MANAGUA_BOUNDS, region: 'ni' },
      (res: any, st: any) => {
        const r = st === 'OK' ? res?.[0] : null;
        const loc = r?.geometry?.location;
        resolve(loc ? { lat: loc.lat(), lng: loc.lng(), label: r.formatted_address } : null);
      },
    );
  });
}

function routeMetrics(
  o: Pt,
  d: Pt,
  extra: Pt | null,
): Promise<{ meters: number; secs: number } | null> {
  return new Promise((resolve) => {
    const g = (window as any).google;
    if (!g?.maps?.DirectionsService) return resolve(null);
    new g.maps.DirectionsService().route(
      {
        origin: { lat: o.lat, lng: o.lng },
        destination: { lat: d.lat, lng: d.lng },
        travelMode: g.maps.TravelMode.DRIVING,
        ...(extra ? { waypoints: [{ location: { lat: extra.lat, lng: extra.lng }, stopover: true }] } : {}),
      },
      (res: any, st: any) => {
        if (st !== 'OK' || !res?.routes?.[0]?.legs?.length) return resolve(null);
        const legs = res.routes[0].legs;
        resolve({
          meters: legs.reduce((a: number, l: any) => a + (l.distance?.value ?? 0), 0),
          secs: legs.reduce((a: number, l: any) => a + (l.duration?.value ?? 0), 0),
        });
      },
    );
  });
}

export default function BookingWidget() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].book;
  const [sel, setSel] = useState('car');
  const [phase, setPhase] = useState<'idle' | 'calc' | 'done'>('idle');
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<{ price: number; km: number; min: number; live: boolean } | null>(null);
  const [dots, setDots] = useState(0);
  const [locating, setLocating] = useState(false);
  const [hasExtra, setHasExtra] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const busy = useRef(false);
  const pts = useRef<Record<PtsKey, Pt | null>>({ o: null, e: null, d: null });
  const metricsRef = useRef<{ meters: number; secs: number } | null>(null);
  const inO = useRef<HTMLInputElement>(null);
  const inE = useRef<HTMLInputElement>(null);
  const inD = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'rundi-tracking-map',
    googleMapsApiKey: MAPS_KEY,
    libraries: MAP_LIBS,
  });

  // Autocompletado de Places sobre los 3 inputs
  useEffect(() => {
    if (!isLoaded) return;
    const g = (window as any).google;
    if (!g?.maps?.places?.Autocomplete) return;
    const opts = {
      bounds: MANAGUA_BOUNDS,
      componentRestrictions: { country: 'ni' },
      fields: ['geometry', 'name', 'formatted_address'],
    };
    ([[inO, 'o'], [inE, 'e'], [inD, 'd']] as const).forEach(([ref, key]) => {
      if (!ref.current) return;
      const ac = new g.maps.places.Autocomplete(ref.current, opts);
      ac.addListener('place_changed', () => {
        const p = ac.getPlace();
        const loc = p?.geometry?.location;
        pts.current[key] = loc
          ? { lat: loc.lat(), lng: loc.lng(), label: p.name || p.formatted_address || '' }
          : null;
      });
    });
  }, [isLoaded]);

  // puntos animados mientras calcula
  useEffect(() => {
    if (phase !== 'calc') return;
    timer.current = setInterval(() => setDots((d) => d + 1), 260);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [phase]);

  async function priceFor(key: string, meters: number, secs: number) {
    const o = pts.current.o;
    const d = pts.current.d;
    if (!o || !d) return { price: localEstimate(key, meters, secs), live: false };
    const remote = await estimateRidePrice({
      origin: { lat: o.lat, lng: o.lng },
      destination: { lat: d.lat, lng: d.lng },
      extraStop: pts.current.e ? { lat: pts.current.e.lat, lng: pts.current.e.lng } : null,
      distanceMeters: meters,
      durationSeconds: secs,
      vehicleType: key === 'designado' ? 'designated' : (key as 'car' | 'moto'),
    });
    return remote != null ? { price: remote, live: true } : { price: localEstimate(key, meters, secs), live: false };
  }

  // Geolocalización real + reverse geocode → rellena el origen
  function useMyLocation() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setErr(c.geoErr);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const done = (label: string) => {
          pts.current.o = { lat, lng, label };
          if (inO.current) inO.current.value = label;
          if (phase !== 'idle') {
            setPhase('idle');
            setResult(null);
            metricsRef.current = null;
          }
          setLocating(false);
          setErr(null);
        };
        const g = (window as any).google;
        if (g?.maps?.Geocoder) {
          new g.maps.Geocoder().geocode({ location: { lat, lng } }, (res: any, st: any) => {
            done(
              st === 'OK' && res?.[0]
                ? res[0].formatted_address
                : `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
            );
          });
        } else {
          done(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        }
      },
      () => {
        setLocating(false);
        setErr(c.geoErr);
      },
      { timeout: 9000, maximumAge: 60000 },
    );
  }

  function clearExtra() {
    if (inE.current) inE.current.value = '';
    pts.current.e = null;
    setHasExtra(false);
    if (phase !== 'idle') {
      setPhase('idle');
      setResult(null);
      metricsRef.current = null;
    }
  }

  async function calc(vehicle = sel) {
    if (busy.current) return;
    setErr(null);
    const oTxt = inO.current?.value ?? '';
    const eTxt = inE.current?.value ?? '';
    const dTxt = inD.current?.value ?? '';
    if ((!pts.current.o && !oTxt.trim()) || (!pts.current.d && !dTxt.trim())) {
      setErr(c.needPoints);
      return;
    }
    setPhase('calc');
    busy.current = true;

    const [o, d, e] = await Promise.all([
      pts.current.o ?? geocodeText(oTxt),
      pts.current.d ?? geocodeText(dTxt),
      pts.current.e ?? (eTxt.trim() ? geocodeText(eTxt) : Promise.resolve(null)),
    ]);
    if (!o || !d) {
      busy.current = false;
      setPhase('idle');
      setErr(c.needPoints);
      return;
    }
    pts.current = { o, e, d };

    const m = await routeMetrics(o, d, e);
    if (!m) {
      busy.current = false;
      setPhase('idle');
      setErr(c.errRoute);
      return;
    }
    metricsRef.current = m;

    const { price, live } = await priceFor(vehicle, m.meters, m.secs);
    busy.current = false;
    setResult({ price, km: m.meters / 1000, min: m.secs / 60, live });
    setPhase('done');
  }

  // Si ya hay resultado y cambia el vehículo, recalcula la tarifa con la misma ruta
  function pickVehicle(key: string) {
    setSel(key);
    const m = metricsRef.current;
    if (phase !== 'done' || !m) return;
    setResult((r) => (r ? { ...r, price: localEstimate(key, m.meters, m.secs), live: false } : r));
    priceFor(key, m.meters, m.secs).then(({ price, live }) =>
      setResult((r) => (r ? { ...r, price, live } : r)),
    );
  }

  const fareText =
    phase === 'done' && result
      ? `≈ C$${result.price}`
      : phase === 'calc'
        ? `${c.calc}${'.'.repeat(1 + (dots % 3))}`
        : c.idle;

  const input = (
    ref: React.RefObject<HTMLInputElement | null>,
    key: PtsKey,
    label: string,
    ph: string,
    dim = false,
    addon?: React.ReactNode,
  ) => (
    <label className="rin">
      <img
        src={
          key === 'o'
            ? '/assets/images/icons/origin_marker/origin_marker.png'
            : key === 'e'
              ? '/assets/images/icons/select-extra-destination/selectextradestination.png'
              : '/assets/images/icons/select-final-destination/selectfinaldestination.png'
        }
        alt=""
      />
      <span className={clsx('rin-t', dim && 'dim')}>
        <b>{label}</b>
        <input
          ref={ref}
          type="text"
          placeholder={ph}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => {
            pts.current[key] = null;
            if (key === 'e') setHasExtra(!!e.currentTarget.value);
            if (phase !== 'idle') {
              setPhase('idle');
              setResult(null);
              metricsRef.current = null;
            }
            setErr(null);
          }}
        />
      </span>
      {addon}
    </label>
  );

  return (
    <div className="book-card">
      <div className="book-top">
        <span className="book-title">{c.title}</span>
        <span className="book-now">
          <img src="/assets/images/icons/requests_pin/requests_pin2x.png" alt="" />
          {c.now}
        </span>
      </div>
      <div className="route-inputs">
        <span className="route-line" aria-hidden="true"></span>
        {input(
          inO,
          'o',
          c.originB,
          c.originI,
          false,
          <button
            key="gps"
            type="button"
            className={clsx('rin-gps', locating && 'on')}
            onClick={useMyLocation}
            aria-label={c.locate}
            title={c.locate}
          >
            {locating ? <Loader2 size={15} className="spin" /> : <LocateFixed size={15} />}
          </button>,
        )}
        {input(
          inE,
          'e',
          c.extraB,
          c.extraI,
          true,
          hasExtra ? (
            <button
              key="x"
              type="button"
              className="rin-gps"
              onClick={clearExtra}
              aria-label={c.clear}
              title={c.clear}
            >
              <X size={14} />
            </button>
          ) : undefined,
        )}
        {input(inD, 'd', c.destB, c.destI, true)}
      </div>
      <div className="veh-row">
        {VEHICLES.map((v) => (
          <button
            key={v.key}
            className={clsx('veh', v.v && 'v', sel === v.key && 'sel')}
            type="button"
            onClick={() => pickVehicle(v.key)}
          >
            <img src={v.img} alt="" />
            <span>
              <b>{c.vehLabels[v.key as 'car' | 'moto' | 'designado']}</b>
              <i>{c.vehSubs[v.key as 'car' | 'moto' | 'designado']}</i>
            </span>
          </button>
        ))}
      </div>
      <button
        className={clsx('book-cta', phase === 'done' && 'done')}
        type="button"
        aria-busy={phase === 'calc'}
        onClick={() => phase !== 'calc' && calc()}
      >
        <span>{fareText}</span>
        <span className="arr">{phase === 'done' ? '✓' : '→'}</span>
      </button>
      {phase === 'done' && result && (
        <div className="book-meta">
          <b>
            {result.km.toFixed(1)} {c.km} · {Math.round(result.min)} {c.min}
          </b>
          <span>{result.live ? `${c.approx} ` : c.approx}</span>
        </div>
      )}
      {err && <div className="book-err">{err}</div>}
      <div className="book-note">
        {c.notePre}
        <a href="#como">{c.noteLink}</a>
      </div>
    </div>
  );
}
