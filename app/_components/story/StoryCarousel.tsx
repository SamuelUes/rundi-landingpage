'use client';

import Image from 'next/image';
import { motion, useTransform } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';
import { useScrub } from './useScrub';

const DIR = '/assets/images/opt/media-app';
const SCREENS = [
  'iphoneladingscreen',
  'iphonesearchride',
  'iphonedriverhomescreen',
  'iphoneavailablescreen',
  'iphonedriverhomerequest',
  'iphonerideoffer2',
];

/**
 * Escena 1 — carrusel horizontal: fila de pantallas con borde degradado
 * que se desplaza a la izquierda ligada al scroll vertical (pin sticky).
 */
export default function StoryCarousel() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].carousel;
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useScrub(ref);

  // Distancia real a recorrer: ancho del track menos el viewport.
  const [dist, setDist] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDist(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const x = useTransform(progress, [0, 1], [0, -dist]);

  return (
    <section ref={ref} className="st-scene st-carousel" aria-label={c.pill}>
      <div ref={stageRef} className="st-stage stc-stage">
        <motion.div
          ref={trackRef}
          className="stc-track"
          style={reduced ? undefined : { x }}
        >
          {SCREENS.map((s, i) => (
            <figure key={s} className="stc-card">
              <Image
                src={`${DIR}/${s}.webp`}
                alt={c.alts[i]}
                width={437}
                height={888}
                sizes="(max-width: 1020px) 44vw, 230px"
                loading={i < 3 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </motion.div>
        <span className="stc-pill">{c.pill}</span>
      </div>
    </section>
  );
}
