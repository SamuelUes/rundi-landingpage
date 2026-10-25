'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { GoogleMap, OverlayView, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const CITIES = [
  { name: 'Managua', live: true },
  { name: 'León', live: false },
  { name: 'Granada', live: false },
  { name: 'Masaya', live: false },
];

const ROUTE = 'M95,300 C160,270 190,220 205,165 S260,95 315,82';

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
// Mismo id/librerías que BookingWidget: el script de Google se carga una sola vez.
const MAP_LIBS: any = ['places'];

type LatLng = { lat: number; lng: number };

// Recorrido de demostración dentro de Managua: conductor → solicitud → destino
const DRIVER_START: LatLng = { lat: 12.1049, lng: -86.2613 };
const PICKUP: LatLng = { lat: 12.1334, lng: -86.268 };
const DEST: LatLng = { lat: 12.1549, lng: -86.2389 };
const MGUA_CENTER: LatLng = { lat: 12.1364, lng: -86.2514 };

const ICONS = {
  car: '/assets/images/opt/ic-car.webp',
  request: '/assets/images/opt/ic-requests.webp',
  origin: '/assets/images/opt/ic-origin.webp',
  final: '/assets/images/opt/ic-final.webp',
};

// Estilo oscuro (variante "night" recortada a la paleta del sitio)
const DARK_STYLES: any[] = [
  { elementType: 'geometry', stylers: [{ color: '#10141d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#10141d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8f98' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#c9c2ae' }],
  },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#14231c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1c2331' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#121724' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#7d8590' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2b3244' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#a8ad95' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b1524' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#40536b' }] },
];

// Claro: mapa normal de Google, solo sin ruido de POIs/transit
const LIGHT_STYLES: any[] = [
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

type Phase = 'toPickup' | 'pickupHold' | 'trip' | 'arrived';

function distMeters(a: LatLng, b: LatLng) {
  const toR = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toR;
  const dLng = (b.lng - a.lng) * toR * Math.cos(((a.lat + b.lat) / 2) * toR);
  return Math.hypot(dLat, dLng) * 6371000;
}

function cumDistances(path: LatLng[]) {
  const cum = [0];
  for (let i = 1; i < path.length; i++) cum.push(cum[i - 1] + distMeters(path[i - 1], path[i]));
  return cum;
}

function headingBetween(a: LatLng, b: LatLng) {
  return (Math.atan2(b.lng - a.lng, b.lat - a.lat) * 180) / Math.PI;
}

function pointAt(path: LatLng[], cum: number[], d: number) {
  const n = path.length;
  if (d <= 0) return { ...path[0], heading: headingBetween(path[0], path[1] ?? path[0]) };
  if (d >= cum[n - 1])
    return { ...path[n - 1], heading: headingBetween(path[n - 2] ?? path[n - 1], path[n - 1]) };
  let i = 1;
  while (cum[i] < d) i++;
  const t = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
  const a = path[i - 1];
  const b = path[i];
  return {
    lat: a.lat + (b.lat - a.lat) * t,
    lng: a.lng + (b.lng - a.lng) * t,
    heading: headingBetween(a, b),
  };
}

// Prefijo de la ruta hasta la distancia d (para la polyline "recorrida")
function pathUntil(path: LatLng[], cum: number[], d: number) {
  if (d <= 0) return [path[0]];
  let i = 1;
  while (i < cum.length && cum[i] < d) i++;
  const p = pointAt(path, cum, d);
  return [...path.slice(0, i), { lat: p.lat, lng: p.lng }];
}

function PinMarker({
  pos,
  icon,
  tag,
  tear = false,
  delay = '0s',
}: {
  pos: LatLng;
  icon: string;
  tag: string;
  tear?: boolean;
  delay?: string;
}) {
  return (
    <OverlayView position={pos} mapPaneName="overlayMouseTarget">
      <div
        className={`pin mapbox-pin${tear ? ' tear' : ''}`}
        style={{ ['--pd' as any]: delay }}
      >
        <Image
          className={`pimg ${tear ? 'tear' : 'round'}`}
          src={icon}
          alt=""
          width={96}
          height={tear ? 171 : 96}
        />
        <span className="p-tag">{tag}</span>
      </div>
    </OverlayView>
  );
}

// Mockup SVG original: se muestra si no hay API key o falla la carga del JS API.
function MockupMap({ pinO, pinD }: { pinO: string; pinD: string }) {
  return (
    <>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="rs0" />
            <stop offset="1" className="rs1" />
          </linearGradient>
        </defs>
        <g className="mgrid" strokeWidth="1" fill="none">
          <path d="M0,80 H400 M0,160 H400 M0,240 H400 M0,320 H400" />
          <path d="M80,0 V400 M160,0 V400 M240,0 V400 M320,0 V400" />
        </g>
        <g className="mroad" strokeWidth="1.6" fill="none">
          <path d="M-20,260 C80,240 140,300 220,250 S360,180 420,200" />
          <path d="M60,-20 C90,80 40,180 110,260 S190,380 170,420" />
          <path d="M-20,120 C100,140 200,60 320,110 S400,140 420,120" />
        </g>
        <path
          className="map-route"
          d={ROUTE}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="8 7"
        />
        <path
          className="mlake"
          d="M-30,380 C60,340 140,395 220,365 S340,350 430,395 L430,430 L-30,430 Z"
        />
        <g>
          <g transform="rotate(90)">
            <image x="-8" y="-14" width="16" height="28" href={ICONS.car} />
          </g>
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={ROUTE} />
        </g>
      </svg>
      <div className="pin" style={{ left: '24%', top: '75%' }}>
        <Image className="pimg round" src={ICONS.origin} alt="" width={96} height={96} />
        <span className="p-tag">{pinO}</span>
      </div>
      <div className="pin tear" style={{ left: '79%', top: '20%' }}>
        <Image className="pimg tear" src={ICONS.final} alt="" width={46} height={81} />
        <span className="p-tag">{pinD}</span>
      </div>
    </>
  );
}

export default function Coverage() {
  const { language, theme, colors } = useThemeLanguage();
  const c = landingCopy[language].coverage;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'rundi-tracking-map',
    googleMapsApiKey: MAPS_KEY,
    libraries: MAP_LIBS,
  });

  const [legA, setLegA] = useState<LatLng[]>([]); // conductor → solicitud
  const [legB, setLegB] = useState<LatLng[]>([]); // solicitud → destino
  const [phase, setPhase] = useState<Phase>('toPickup');
  const [car, setCar] = useState({ ...DRIVER_START, heading: 0, d: 0 });

  // Rutas reales por calles vía DirectionsService (fallback: línea recta)
  useEffect(() => {
    if (!isLoaded) return;
    const g = (window as any).google;
    const straightA = [DRIVER_START, PICKUP];
    const straightB = [PICKUP, DEST];
    if (!g?.maps?.DirectionsService) {
      setLegA(straightA);
      setLegB(straightB);
      return;
    }
    const svc = new g.maps.DirectionsService();
    const route = (origin: LatLng, destination: LatLng) =>
      new Promise<LatLng[]>((resolve) => {
        svc.route(
          { origin, destination, travelMode: g.maps.TravelMode.DRIVING },
          (result: any, status: any) => {
            const pts = result?.routes?.[0]?.overview_path;
            resolve(
              status === 'OK' && pts?.length
                ? pts.map((p: any) => ({ lat: p.lat(), lng: p.lng() }))
                : [origin, destination],
            );
          },
        );
      });
    let cancelled = false;
    Promise.all([route(DRIVER_START, PICKUP), route(PICKUP, DEST)]).then(([a, b]) => {
      if (cancelled) return;
      setLegA([DRIVER_START, ...a, PICKUP]);
      setLegB([PICKUP, ...b, DEST]);
    });
    return () => {
      cancelled = true;
    };
  }, [isLoaded]);

  const cumB = useMemo(() => (legB.length ? cumDistances(legB) : [0]), [legB]);

  // Loop: carro → solicitud (3.2s) → pausa → viaje (6.8s) → pausa → reinicia
  useEffect(() => {
    if (!legA.length || !legB.length) return;
    const cumA = cumDistances(legA);
    const totalB = cumB[cumB.length - 1];

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      const end = pointAt(legB, cumB, totalB);
      setPhase('arrived');
      setCar({ lat: end.lat, lng: end.lng, heading: end.heading, d: totalB });
      return;
    }

    const DUR_A = 7200;
    const HOLD = 1000;
    const DUR_B = 8800;
    const ARRIVE = 2400;
    const TOTAL = DUR_A + HOLD + DUR_B + ARRIVE;
    const totalA = cumA[cumA.length - 1];

    let raf = 0;
    let t0 = performance.now();
    let lastPhase: Phase | '' = '';
    const step = (now: number) => {
      const t = (now - t0) % TOTAL;
      let p: Phase;
      let leg: LatLng[];
      let cum: number[];
      let total: number;
      let frac: number;
      if (t < DUR_A) {
        p = 'toPickup';
        leg = legA;
        cum = cumA;
        total = totalA;
        frac = t / DUR_A;
      } else if (t < DUR_A + HOLD) {
        p = 'pickupHold';
        leg = legB;
        cum = cumB;
        total = totalB;
        frac = 0;
      } else if (t < DUR_A + HOLD + DUR_B) {
        p = 'trip';
        leg = legB;
        cum = cumB;
        total = totalB;
        frac = (t - DUR_A - HOLD) / DUR_B;
      } else {
        p = 'arrived';
        leg = legB;
        cum = cumB;
        total = totalB;
        frac = 1;
      }
      const d = frac * total;
      const pt = pointAt(leg, cum, d);
      if (p !== lastPhase) {
        lastPhase = p;
        setPhase(p);
      }
      setCar({ lat: pt.lat, lng: pt.lng, heading: pt.heading, d });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [legA, legB, cumB]);

  const showTrip = phase !== 'toPickup';
  const traveled =
    showTrip && legB.length ? pathUntil(legB, cumB, phase === 'pickupHold' ? 0 : car.d) : null;

  const hasMap = !!MAPS_KEY.trim() && !loadError;
  const dashed = (color: string) => ({
    strokeOpacity: 0,
    icons: [
      {
        icon: { path: 'M 0,-1 0 1', strokeOpacity: 0.9, strokeColor: color, scale: 3 },
        offset: '0',
        repeat: '15px',
      },
    ],
  });

  return (
    <section className="sec-pad" id="cobertura">
      <div className="wrap coverage-inner">
        <Reveal className="mapbox">
          {hasMap && isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              center={MGUA_CENTER}
              zoom={13}
              onLoad={(map) => {
                const g = (window as any).google;
                const bounds = new g.maps.LatLngBounds();
                [DRIVER_START, PICKUP, DEST].forEach((p) => bounds.extend(p));
                map.fitBounds(bounds, { top: 72, bottom: 72, left: 56, right: 56 });
              }}
              options={{
                disableDefaultUI: true,
                gestureHandling: 'none',
                clickableIcons: false,
                styles: theme === 'dark' ? DARK_STYLES : LIGHT_STYLES,
                backgroundColor: theme === 'dark' ? '#0a0c10' : '#e8e4d8',
              }}
            >
              {/* ruta pendiente: punteada violeta; recorrida: dorada sólida */}
              {phase === 'toPickup' && legA.length > 1 && (
                <Polyline path={legA} options={dashed(colors.violet)} />
              )}
              {showTrip && legB.length > 1 && (
                <>
                  <Polyline path={legB} options={dashed(colors.violet)} />
                  {traveled && traveled.length > 1 && (
                    <Polyline
                      path={traveled}
                      options={{
                        strokeColor: colors.gold,
                        strokeOpacity: 1,
                        strokeWeight: 4,
                        zIndex: 2,
                      }}
                    />
                  )}
                </>
              )}

              {phase === 'toPickup' ? (
                <PinMarker pos={PICKUP} icon={ICONS.request} tag={c.pinR} />
              ) : (
                <>
                  <PinMarker pos={PICKUP} icon={ICONS.origin} tag={c.pinO} />
                  <PinMarker pos={DEST} icon={ICONS.final} tag={c.pinD} tear delay="0.8s" />
                </>
              )}

              <OverlayView position={car} mapPaneName="overlayMouseTarget" zIndex={3}>
                <div
                  className="mapcar"
                  style={{ transform: `translate(-50%,-50%) rotate(${car.heading}deg)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICONS.car} alt="" />
                </div>
              </OverlayView>
            </GoogleMap>
          ) : hasMap ? (
            <div className="mapbox-load" />
          ) : (
            <MockupMap pinO={c.pinO} pinD={c.pinD} />
          )}
          <span className="map-cap">MGUA · 12.11°N — 86.23°W</span>
          <span className="map-compass">N↑</span>
        </Reveal>

        <div>
          <Reveal className="folio">
            <span className="num">06</span> {c.folio}
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h-display sec-title">
              {c.t1}
              <em>{c.tEm}</em>.<br />
              {c.t2}
            </h2>
          </Reveal>
          <div style={{ marginTop: 38 }}>
            {CITIES.map((city, i) => (
              <Reveal key={city.name} className="city-row" delay={i}>
                <span className="c">{city.name}</span>
                <span className={`s ${city.live ? 'live' : 'soon'}`}>
                  {city.live ? c.live : c.soon}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
