'use client';

import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

/** Barra de progreso de scroll: degradado oro→violeta, scaleX por scrollYProgress. */
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 26, mass: 0.4 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

/**
 * Cursor custom: punto 14px con ring oro que crece a 44px sobre
 * interactivos. mix-blend difference / multiply según tema (CSS).
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: globalThis.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      el.style.opacity = '1';
    };
    const over = (e: globalThis.MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest?.('a,button,.bcard,.city-row');
      el.classList.toggle('big', Boolean(interactive));
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  return <motion.div ref={ref} className="cursor" style={{ x: sx, y: sy }} />;
}
