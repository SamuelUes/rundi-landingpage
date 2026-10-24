'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';

/**
 * Equivalente de `[data-magnet]` del mockup:
 * el elemento sigue sutilmente al cursor (dx*.18, dy*.28) con spring.
 */
export function Magnet({
  children,
  className,
  href = '#',
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      className={className}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  );
}
