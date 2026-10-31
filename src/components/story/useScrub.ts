'use client';

import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Progreso de scroll ligado a una sección, suavizado con spring
 * (equivalente a ScrollTrigger `scrub: 0.5`).
 *
 * `offset` por defecto `['start start','end end']`: 0 cuando el top de la
 * sección toca el top del viewport (inicio del pin sticky), 1 cuando su
 * bottom sale por el bottom (fin del pin).
 *
 * Cuando se usa el offset por defecto (escena con pin sticky) el progreso
 * se NORMALIZA al rango pineado — (altura sección − 100vh) / altura — para
 * que los tramos de contenido duren lo mismo y el último ~24% del scroll
 * sea solo la salida del pin.
 *
 * Con `prefers-reduced-motion` devuelve el progreso sin suavizar y
 * `reduced=true` para que las escenas desactiven parallax/transforms.
 */
export function useScrub(ref: RefObject<HTMLElement>, offset?: any) {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset ?? ['start start', 'end end'],
  });

  // Fracción del scroll en la que el sticky permanece pineado.
  const [pinEnd, setPinEnd] = useState(1);
  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const h = el.offsetHeight;
      setPinEnd(Math.max(0.2, (h - window.innerHeight) / h));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [ref]);

  const pinned = useTransform(scrollYProgress, [0, pinEnd], [0, 1], {
    clamp: true,
  });
  const base = offset ? scrollYProgress : pinned;
  const smooth = useSpring(base, { stiffness: 110, damping: 26, mass: 0.5 });

  return { progress: reduced ? base : smooth, raw: scrollYProgress, reduced };
}
