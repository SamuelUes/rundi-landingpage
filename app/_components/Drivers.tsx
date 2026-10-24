'use client';

import { Check } from 'lucide-react';
import { Hl, Reveal } from './Reveal';
import { Magnet } from './Magnet';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const PROTOS = '/assets/images-old/prototipe_phones';

export default function Drivers() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].drivers;

  return (
    <section className="drive sec-pad" id="conducir">
      <div className="wrap drive-inner">
        <div>
          <Reveal className="folio">
            <span className="num">04</span> {c.folio}
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
                  <b>{p.b}</b>
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
          <div className="earn-chip">
            <div className="ev">C$ 3,850</div>
            <div className="et">{c.chip}</div>
          </div>
          <div className="phone phone-1">
            <img src={`${PROTOS}/driverhome_prototipe.png`} alt={c.alt1} />
          </div>
          <div className="phone phone-2">
            <img src={`${PROTOS}/available_prototipe.png`} alt={c.alt2} />
          </div>
          <span className="phone-label pl-1">{c.pl1}</span>
          <span className="phone-label pl-2">{c.pl2}</span>
        </Reveal>
      </div>
    </section>
  );
}
