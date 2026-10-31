'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import { Hl, Reveal } from './Reveal';
import { Magnet } from './Magnet';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const OPT = '/assets/images/opt';

export default function Drivers() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].drivers;

  return (
    <section className="drive sec-pad" id="conducir">
      <div className="wrap drive-inner">
        <div>
          <Reveal className="folio">
            <span className="num">05</span> {c.folio}
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h-display sec-title">
              {c.t1}
              <br />
              <Hl variant="gold">{c.tHl}</Hl>
              {c.t2}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="sec-lede">{c.lede}</p>
          </Reveal>
          <ul className="drive-perks">
            {c.perks.map((p: any) => (
              <li key={p.b}>
                <span className="pcheck">
                  <Check size={12} strokeWidth={3} />
                </span>
                <div>
                  <span className="b">{p.b}</span>
                  <span>{p.s}</span>
                </div>
              </li>
            ))}
          </ul>
          <Reveal delay={4}>
            <Magnet className="btn btn-gold" href="#descargar">
              {c.cta} <span className="arr">→</span>
            </Magnet>
          </Reveal>
        </div>
        <Reveal className="phones drive-phones" delay={2}>
          <div className="ring"></div>
          <div className="phone-unit pu-1">
            <div className="phone">
              <Image src={`${OPT}/media-app/iphonedriverhomerequest.png`} alt={c.alt1} width={437} height={888} sizes="(max-width:1020px) 46vw, 248px" loading="lazy" />
            </div>
            <span className="phone-label">{c.pl1}</span>
          </div>
          <div className="phone-unit pu-2">
            <div className="phone">
              <Image src={`${OPT}/media-app/iphoneavailablescreen.png`} alt={c.alt2} width={437} height={888} sizes="(max-width:1020px) 46vw, 248px" loading="lazy" />
            </div>
            <span className="phone-label">{c.pl2}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
