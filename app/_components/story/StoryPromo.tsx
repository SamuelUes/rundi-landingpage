'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';

/**
 * Escena 4 — tarjeta promocional: bloque ancho con marca centrada,
 * titular + descripción a la izquierda y botón "conocer más".
 */
export default function StoryPromo() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].promo;

  return (
    <section className="st-scene st-promo">
      <Reveal>
        <div className="stp-card">
          <Image
            className="stp-logo"
            src="/assets/images/rundi_mark.png"
            alt="Rundi"
            width={88}
            height={88}
          />
          <div className="stp-main">
            <h3 className="stp-title h-display">{c.title}</h3>
            <p className="stp-desc">{c.desc}</p>
          </div>
          <a className="btn btn-ghost stp-cta" href="/#descargar">
            {c.cta}
            <ArrowRight className="arr" size={16} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
