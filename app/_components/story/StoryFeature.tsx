'use client';

import Image from 'next/image';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';
import { useScrub } from './useScrub';

const DIR = '/assets/images/opt/media-app/iphonesearchinstep1_and_3_others';
const SCREENS = [
  'iphonesearchinstep1',
  'iphonesearchinstep2',
  'iphonesearchinstep3',
  'iphonesearchinstep4',
];

/**
 * Escena 3 — titular grande a la izquierda, teléfono al centro con
 * crossfade + parallax, y a la derecha los 4 pasos para pedir un viaje
 * que se alternan por tramo de scroll (con indicador de progreso).
 */
export default function StoryFeature() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].feature;
  const ref = useRef<HTMLElement>(null);
  const { progress, reduced } = useScrub(ref);
  const [idx, setIdx] = useState(0);
  const n = SCREENS.length;

  useMotionValueEvent(progress, 'change', (v) => {
    if (reduced) return;
    setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const y = useTransform(progress, [0, 1], [44, -44]);

  return (
    <section ref={ref} className="st-scene st-feature">
      <div className="st-stage stf-stage">
        <div className="stf-copy">
          <span className="stt-kicker">{c.kicker}</span>
          <h3 className="stf-head h-display">
            {c.headA} <em>{c.headB}</em>
          </h3>
          <div className="stf-progress" aria-hidden="true">
            <span className="cnt">
              <b>{c.steps[idx].k}</b> / {String(n).padStart(2, '0')}
            </span>
            <span className="segs">
              {SCREENS.map((s, i) => (
                <i key={s} className={`seg${idx === i ? ' on' : idx > i ? ' done' : ''}`} />
              ))}
            </span>
          </div>
        </div>

        <motion.div className="stf-phone" style={reduced ? undefined : { y }}>
          {SCREENS.map((s, i) => (
            <Image
              key={s}
              src={`${DIR}/${s}.webp`}
              alt={c.steps[i].title}
              width={437}
              height={888}
              sizes="(max-width: 1020px) 50vw, 240px"
              className={idx === i ? 'on' : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </motion.div>

        <div className="stf-blocks">
          {c.steps.map((s: any, i: number) => (
            <div key={s.k} className={`stf-block${idx === i ? ' on' : ''}`}>
              <span className="k">{s.k}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
