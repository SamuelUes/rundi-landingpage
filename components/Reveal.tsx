import React from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
};

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 24, style }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
