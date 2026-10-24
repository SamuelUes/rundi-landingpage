'use client';

import { Hl, Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

export default function AppShowcase() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].show;

  return (
    <section className="sec-pad" id="app">
      <div className="wrap showcase-inner">
        <Reveal className="outside-shot">
          <figure className="photo-plate">
            <img src="/assets/images/campaña2/outside.jpeg" alt={c.alt} />
            <figcaption className="shot-cap">{c.cap}</figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal className="folio">
            <span className="num">03</span> {c.folio}
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h-display sec-title">
              <Hl variant="gold">{c.tHl1}</Hl>
              {c.tMid}
              <Hl variant="violet">{c.tHl2}</Hl>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="sec-lede">{c.lede}</p>
          </Reveal>
          <ul className="show-list">
            {c.features.map((f: any, i: number) => (
              <li key={f.n}>
                <span className="n">{f.n}</span>
                <div>
                  <b>{f.b}</b>
                  <span>{f.s}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
