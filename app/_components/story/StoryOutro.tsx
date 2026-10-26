'use client';

import Image from 'next/image';
import { motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';
import { useScrub } from './useScrub';

/**
 * Escena 7 — foto a ancho completo con captions en las esquinas.
 * No es sticky: al entrar cubre la escena sticky anterior (efecto capas)
 * y luego se va con el flujo normal.
 */
export default function StoryOutro() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].outro;
  const ref = useRef<HTMLElement>(null);
  const { progress, reduced } = useScrub(ref, ['start end', 'end start']);

  const scale = useTransform(progress, [0, 1], [1.14, 1]);
  const y = useTransform(progress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} className="st-scene st-outro">
      <motion.div className="sto-media" style={reduced ? undefined : { scale, y }}>
        <Image
          src="/assets/images/opt/hero.webp"
          alt={c.alt}
          fill
          sizes="100vw"
          loading="lazy"
        />
      </motion.div>
      <span className="sto-cap a">{c.capA}</span>
      <span className="sto-cap b">{c.capB}</span>
    </section>
  );
}
