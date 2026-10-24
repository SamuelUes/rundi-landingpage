'use client';

import { animate, motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import BookingWidget from './BookingWidget';
import { Hl } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Contador animado (ease 1-(1-p)³ ~ 1.6s, formato es-NI). */
function Stat({ value, dec = 0, suffix, label }: { value: number; dec?: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const [txt, setTxt] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setTxt(dec ? v.toFixed(dec) : Math.round(v).toLocaleString('es-NI')),
    });
    return () => controls.stop();
  }, [inView, value, dec]);

  return (
    <div className="stat" ref={ref}>
      <div className="n">
        <span>{txt}</span>
        {suffix && <sup>{suffix}</sup>}
      </div>
      <div className="t">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].hero;
  const heroRef = useRef<HTMLElement>(null);
  // Parallax sutil sobre la foto de fondo (misma amplitud que el mockup: ±14/±9px)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18 });
  const sy = useSpring(py, { stiffness: 55, damping: 18 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width - 0.5) * -14);
    py.set(((e.clientY - r.top) / r.height - 0.5) * -9);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="hero" id="top" ref={heroRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div className="hero-bg" style={{ x: sx, y: sy }}>
        <Image
          src="/assets/images/opt/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
        />
      </motion.div>
      <div className="hero-scrim"></div>
      <div className="hero-bloom"></div>
      <div className="hero-bloom v"></div>

      <div className="wrap hero-inner">
        <div className="hero-col">
          <motion.span className="eyebrow" {...line(0)}>
            <span className="dot"></span>
            {c.eyebrow}
          </motion.span>
          <h1 className="h-display">
            <motion.span className="l" {...line(0.08)}>
              {c.l1}
            </motion.span>
            <motion.span className="l" {...line(0.16)}>
              {c.l2}
            </motion.span>
            <motion.span className="l" {...line(0.24)}>
              <Hl variant="gold">{c.l3}</Hl>
            </motion.span>
          </h1>
          <motion.p className="hero-sub" {...line(0.32)}>
            {c.subPre}
            <span className="b">{c.subStrong}</span>
            {c.subPost}
          </motion.p>
          <motion.div {...line(0.4)}>
            <BookingWidget />
          </motion.div>
          <motion.div className="hero-meta" {...line(0.48)}>
            <Stat value={1200} suffix="+" label={c.stats[0]} />
            <Stat value={350} suffix="+" label={c.stats[1]} />
            <Stat value={4.9} dec={1} label={c.stats[2]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
