'use client';

import Image from 'next/image';
import { motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';
import { useScrub } from './useScrub';

const DIR = '/assets/images/opt/media-app';

/**
 * Escena 6 — dos teléfonos superpuestos moviéndose a distinta velocidad
 * (parallax por progreso de entrada/salida de la sección).
 */
export default function StoryParallax() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].parallax;
  const ref = useRef<HTMLElement>(null);
  const { progress, reduced } = useScrub(ref, ['start end', 'end start']);

  const y1 = useTransform(progress, [0, 1], [90, -70]);
  const y2 = useTransform(progress, [0, 1], [-40, 80]);

  return (
    <section ref={ref} className="st-scene st-cover-item st-parallax">
      <div className="stx-grid">
        <div className="stx-copy">
          <span className="stt-kicker">{c.kicker}</span>
          <h3 className="stx-title h-display">{c.title}</h3>
        </div>

        <div className="stx-phones">
          <motion.div className="stx-p stx-p1" style={reduced ? undefined : { y: y1 }}>
            <Image
              src={`${DIR}/iphonesearchride.webp`}
              alt={c.title}
              width={437}
              height={888}
              sizes="(max-width: 1020px) 40vw, 220px"
              loading="lazy"
            />
          </motion.div>
          <motion.div className="stx-p stx-p2" style={reduced ? undefined : { y: y2 }}>
            <Image
              src={`${DIR}/iphonerideofferscreen.webp`}
              alt=""
              width={437}
              height={888}
              sizes="(max-width: 1020px) 36vw, 200px"
              loading="lazy"
            />
          </motion.div>
        </div>

        <p className="stx-desc">{c.desc}</p>
      </div>
    </section>
  );
}
