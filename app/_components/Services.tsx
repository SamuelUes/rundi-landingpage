'use client';

import Image from 'next/image';
import { Hl, Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const OPT = '/assets/images/opt';

export default function Services() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].services;

  return (
    <section className="sec-pad" id="servicios">
      <div className="wrap">
        <div className="sec-head row">
          <div>
            <Reveal className="folio">
              <span className="num">01</span> {c.folio}
            </Reveal>
            <Reveal delay={1}>
              <h2 className="h-display sec-title">
                {c.tA}
                <Hl variant="violet">{c.tB}</Hl>
                {c.tC}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="sec-lede">{c.lede}</p>
          </Reveal>
        </div>

        <div className="bento">
          {/* flagship */}
          <Reveal className="bcard b-a">
            <Image
              className="bicon"
              src={`${OPT}/ic-car-safed.webp`}
              alt=""
              width={128}
              height={128}
              sizes="64px"
            />
            <div className="split">
              <div className="b-a-copy">
                <div className="b-a-top">
                  <span className="hl hl-gold" style={{ fontSize: '1.5rem' }}>{c.flag}</span>
                  <span className="idx">RND—01</span>
                </div>
                <h3>{c.fH}</h3>
                <p>
                  {c.fP1}
                  <span className="b">{c.fPB}</span>
                  {c.fP2}
                </p>
                <div className="des-toggle">
                  <Image src={`${OPT}/ic-car.webp`} alt="" width={96} height={180} />
                  {c.fToggle}
                  <span className="dtg">
                    <i></i>
                  </span>
                </div>
                <ul className="des-steps">
                  {c.fSteps.map((s: string, i: number) => (
                    <li key={i}>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="b-a-media">
                <figure className="b-a-shot">
                  <Image
                    src={`${OPT}/dessignated-home.webp`}
                    alt={c.fAlt}
                    width={400}
                    height={570}
                    sizes="(max-width: 768px) 90vw, 100%"
                    loading="lazy"
                  />
                  <figcaption>{c.fCap}</figcaption>
                </figure>
              </div>
            </div>
          </Reveal>

          <Reveal className="bcard b-b" delay={1}>
            <Image
              className="bicon"
              src={`${OPT}/ic-shield.webp`}
              alt=""
              width={128}
              height={128}
              sizes="64px"
            />
            <span className="idx">RND—02</span>
            <h3>{c.cards[0].h}</h3>
            <p>{c.cards[0].p}</p>
            <figure className="artframe">
              <Image
                src={`${OPT}/safe-ride.webp`}
                alt={c.cards[0].alt}
                width={700}
                height={607}
                sizes="(max-width: 768px) 90vw, 40vw"
                loading="lazy"
              />
            </figure>
          </Reveal>

          <Reveal className="bcard b-c" delay={2}>
            <Image
              className="bicon"
              src={`${OPT}/ic-card-cash.webp`}
              alt=""
              width={128}
              height={104}
              sizes="64px"
            />
            <div>
              <span className="idx">RND—03</span>
              <h3>{c.cards[1].h}</h3>
              <p>{c.cards[1].p}</p>
            </div>
            <ul className="list">
              {c.cards[1].list.map((l: string) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="bcard b-d">
            <Image
              className="bicon"
              src={`${OPT}/ic-realtime.webp`}
              alt=""
              width={128}
              height={128}
              sizes="64px"
            />
            <span className="idx">RND—04</span>
            <h3>{c.cards[2].h}</h3>
            <p>{c.cards[2].p}</p>
            <figure className="artframe">
              <Image
                src={`${OPT}/realtime.webp`}
                alt={c.cards[2].alt}
                width={700}
                height={754}
                sizes="(max-width: 768px) 90vw, 40vw"
                loading="lazy"
              />
            </figure>
          </Reveal>

          <Reveal className="bcard b-e" delay={1}>
            <Image
              className="bicon"
              src={`${OPT}/ic-map.webp`}
              alt=""
              width={128}
              height={128}
              sizes="64px"
            />
            <span className="idx">RND—05</span>
            <h3>{c.cards[3].h}</h3>
            <p>{c.cards[3].p}</p>
            <figure className="artframe">
              <Image
                src={`${OPT}/moto-ride.webp`}
                alt={c.cards[3].alt}
                width={760}
                height={613}
                sizes="(max-width: 768px) 90vw, 40vw"
                loading="lazy"
              />
            </figure>
          </Reveal>

          <Reveal className="bcard b-f" delay={2}>
            <Image
              className="bicon"
              src={`${OPT}/ic-sms.webp`}
              alt=""
              width={128}
              height={98}
              sizes="64px"
            />
            <span className="idx">RND—06</span>
            <h3>{c.cards[4].h}</h3>
            <p>{c.cards[4].p}</p>
            <figure className="artframe">
              <Image
                src={`${OPT}/safe-confidence.webp`}
                alt={c.cards[4].alt}
                width={760}
                height={680}
                sizes="(max-width: 768px) 90vw, 40vw"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
