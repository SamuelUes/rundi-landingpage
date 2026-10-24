'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Equivalente de `.reveal` + `data-delay` del mockup:
 * fade + translateY(30px→0) al entrar en viewport, una sola vez.
 * `delay` va en pasos de 80ms (data-delay 1–6).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.9, delay: delay * 0.08, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** `<em>` con highlight box estilo inDrive. */
export function Hl({
  variant,
  children,
}: {
  variant: 'gold' | 'violet';
  children: ReactNode;
}) {
  return <em className={`hl hl-${variant}`}>{children}</em>;
}
