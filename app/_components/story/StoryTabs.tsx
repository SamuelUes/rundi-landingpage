'use client';

import Image from 'next/image';
import { useMotionValueEvent } from 'framer-motion';
import { BellRing, HandCoins, Radar } from 'lucide-react';
import { useRef, useState } from 'react';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';
import { useScrub } from './useScrub';

const DIR = '/assets/images/opt/media-app';
const ITEMS = [
  { icon: Radar, screen: 'iphonedriverhomescreen' },
  { icon: BellRing, screen: 'iphonedriverhomerequest' },
  { icon: HandCoins, screen: 'iphonerideoffer2' },
];

/**
 * Escena 2 — teléfono fijo (sticky) con tabs: el progreso del scroll se
 * divide en 3 tramos; cada tramo activa un tab, hace crossfade de la
 * pantalla y cambia el texto lateral. Los tabs también son clicables.
 */
export default function StoryTabs() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].tabs;
  const ref = useRef<HTMLElement>(null);
  const { progress, reduced } = useScrub(ref);
  const [idx, setIdx] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    if (reduced) return;
    setIdx(Math.min(ITEMS.length - 1, Math.max(0, Math.floor(v * ITEMS.length))));
  });

  const goto = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const p = (i + 0.5) / ITEMS.length;
    window.scrollTo({
      top: top + (el.offsetHeight - window.innerHeight) * p,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section ref={ref} className="st-scene st-tabs">
      <div className="st-stage stt-stage">
        <div className="stt-left">
          <span className="stt-kicker">{c.kicker}</span>
          <div className="stt-tabs" role="tablist">
            {ITEMS.map((it, i) => {
              const Icon = it.icon;
              return (
                <button
                  key={it.screen}
                  role="tab"
                  aria-selected={idx === i}
                  className={`stt-tab${idx === i ? ' on' : ''}`}
                  onClick={() => goto(i)}
                >
                  <Icon strokeWidth={1.8} />
                  <span className="t">{c.items[i].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="stt-phone">
          {ITEMS.map((it, i) => (
            <Image
              key={it.screen}
              src={`${DIR}/${it.screen}.webp`}
              alt={c.items[i].title}
              width={437}
              height={888}
              sizes="(max-width: 1020px) 52vw, 250px"
              className={idx === i ? 'on' : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        <div className="stt-texts">
          {ITEMS.map((it, i) => (
            <div key={i} className={`stt-text${idx === i ? ' on' : ''}`}>
              <h3>{c.items[i].title}</h3>
              <p>{c.items[i].desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
