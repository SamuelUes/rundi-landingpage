'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ROUTE = 'M60,190 C220,90 340,230 500,140 C660,50 780,190 945,90';
const IC = '/assets/images/icons';

export default function HowItWorks() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].how;

  return (
    <section className="how sec-pad" id="como">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="folio">
            <span className="num">02</span> {c.folio}
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h-display sec-title">
              {c.t1}
              <br />
              {c.t2pre}
              <em>{c.t2em}</em>
              {c.t2post}
            </h2>
          </Reveal>
        </div>

        <div className="steps">
          <svg className="route-svg" viewBox="0 0 1000 260" preserveAspectRatio="none">
            <path className="dash" d={ROUTE} />
            {/* la ruta se dibuja al entrar en viewport (progress-path del mockup) */}
            <motion.path
              className="progress-path"
              d={ROUTE}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
            />
            <image x="44" y="174" width="32" height="32" href={`${IC}/origin_marker/origin_marker.png`} />
            <image
              x="484"
              y="86"
              width="32"
              height="54"
              href={`${IC}/select-extra-destination/selectextradestination.png`}
            />
            <image
              x="929"
              y="36"
              width="32"
              height="54"
              href={`${IC}/select-final-destination/selectfinaldestination.png`}
            />
          </svg>

          {c.steps.map((s: any, i: number) => (
            <Reveal key={i} className="step" delay={i}>
              <span className="tag">{s.tag}</span>
              <div className="snum">{String(i + 1).padStart(2, '0')}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
