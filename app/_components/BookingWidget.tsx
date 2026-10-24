'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

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

export default function BookingWidget() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].book;
  const [sel, setSel] = useState('car');
  const [state, setState] = useState<'idle' | 'calc' | 'done'>('idle');
  const [dots, setDots] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // "Calculando…" con puntos animados (~1.3s)
  useEffect(() => {
    if (state !== 'calc') return;
    timer.current = setInterval(() => setDots((d) => d + 1), 260);
    const end = setTimeout(() => {
      if (timer.current) clearInterval(timer.current);
      setState('done');
    }, 1300);
    return () => {
      if (timer.current) clearInterval(timer.current);
      clearTimeout(end);
    };
  }, [state]);

  const vehicle = VEHICLES.find((v) => v.key === sel)!;
  const fareText =
    state === 'done'
      ? `≈ ${vehicle.fare} · 12 ${c.min}`
      : state === 'calc'
        ? `${c.calc}${'.'.repeat(1 + (dots % 3))}`
        : c.idle;

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
        <label className="rin">
          <img src="/assets/images/icons/origin_marker/origin_marker.png" alt="" />
          <span className="rin-t">
            <b>{c.originB}</b>
            <i>{c.originI}</i>
          </span>
        </label>
        <label className="rin">
          <img
            src="/assets/images/icons/select-extra-destination/selectextradestination.png"
            alt=""
          />
          <span className="rin-t dim">
            <b>{c.extraB}</b>
            <i>{c.extraI}</i>
          </span>
        </label>
        <label className="rin">
          <img
            src="/assets/images/icons/select-final-destination/selectfinaldestination.png"
            alt=""
          />
          <span className="rin-t dim">
            <b>{c.destB}</b>
            <i>{c.destI}</i>
          </span>
        </label>
      </div>
      <div className="veh-row">
        {VEHICLES.map((v) => (
          <button
            key={v.key}
            className={clsx('veh', v.v && 'v', sel === v.key && 'sel')}
            type="button"
            onClick={() => setSel(v.key)}
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
        className={clsx('book-cta', state === 'done' && 'done')}
        type="button"
        onClick={() => state === 'idle' && setState('calc')}
      >
        <span>{fareText}</span>
        <span className="arr">{state === 'done' ? '✓' : '→'}</span>
      </button>
      <div className="book-note">
        {c.notePre}
        <a href="#como">{c.noteLink}</a>
      </div>
    </div>
  );
}
