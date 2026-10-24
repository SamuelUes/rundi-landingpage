'use client';

import Image from 'next/image';
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

export default function Coverage() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].coverage;
  return (
    <section className="sec-pad" id="cobertura">
      <div className="wrap coverage-inner">
        <Reveal className="mapbox">
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" className="rs0" />
                <stop offset="1" className="rs1" />
              </linearGradient>
            </defs>
            {/* street grid */}
            <g className="mgrid" strokeWidth="1" fill="none">
              <path d="M0,80 H400 M0,160 H400 M0,240 H400 M0,320 H400" />
              <path d="M80,0 V400 M160,0 V400 M240,0 V400 M320,0 V400" />
            </g>
            <g className="mroad" strokeWidth="1.6" fill="none">
              <path d="M-20,260 C80,240 140,300 220,250 S360,180 420,200" />
              <path d="M60,-20 C90,80 40,180 110,260 S190,380 170,420" />
              <path d="M-20,120 C100,140 200,60 320,110 S400,140 420,120" />
            </g>
            {/* ruta oro→violeta */}
            <path
              className="map-route"
              d={ROUTE}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="8 7"
            />
            {/* lago */}
            <path
              className="mlake"
              d="M-30,380 C60,340 140,395 220,365 S340,350 430,395 L430,430 L-30,430 Z"
            />
            {/* carro circulando la ruta (SMIL igual que el mockup) */}
            <g>
              <g transform="rotate(90)">
                <image
                  x="-14"
                  y="-24"
                  width="28"
                  height="48"
                  href="/assets/images/opt/ic-car.webp"
                />
              </g>
              <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={ROUTE} />
            </g>
          </svg>
          <div className="pin" style={{ left: '24%', top: '75%' }}>
            <Image
              className="pimg round"
              src="/assets/images/opt/ic-origin.webp"
              alt=""
              width={96}
              height={96}
            />
            <span className="p-tag">{c.pinO}</span>
          </div>
          <div className="pin tear" style={{ left: '79%', top: '20%' }}>
            <Image
              className="pimg tear"
              src="/assets/images/opt/ic-final.webp"
              alt=""
              width={96}
              height={171}
            />
            <span className="p-tag">{c.pinD}</span>
          </div>
          <span className="map-cap">MGUA · 12.11°N — 86.23°W</span>
          <span className="map-compass">N↑</span>
        </Reveal>

        <div>
          <Reveal className="folio">
            <span className="num">05</span> {c.folio}
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
