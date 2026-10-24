'use client';

import { Hl, Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const IC = '/assets/images/icons';
const CAMP = '/assets/images/campaña2';

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
            <img className="bicon" src={`${IC}/utils/car_safed.png`} alt="" />
            <div className="split">
              <div className="b-a-copy">
                <div className="b-a-top">
                  <span className="hl hl-gold" style={{ fontSize: '1.5rem' }}>{c.flag}</span>
                  <span className="idx">RND—01</span>
                </div>
                <h3>{c.fH}</h3>
                <p>
                  {c.fP1}
                  <b>{c.fPB}</b>
                  {c.fP2}
                </p>
                <div className="des-toggle">
                  <img src={`${IC}/Convertible_Car_Sedan/Convertible_Car_Sedan.png`} alt="" />
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
                  <img src={`${CAMP}/dessignated-home.png`} alt={c.fAlt} />
                  <figcaption>{c.fCap}</figcaption>
                </figure>
              </div>
            </div>
          </Reveal>

          <Reveal className="bcard b-b" delay={1}>
            <img className="bicon" src={`${IC}/utils/safe_shield.png`} alt="" />
            <span className="idx">RND—02</span>
            <h3>{c.cards[0].h}</h3>
            <p>{c.cards[0].p}</p>
            <figure className="artframe">
              <img src={`${CAMP}/safe_ride.png`} alt={c.cards[0].alt} />
            </figure>
          </Reveal>

          <Reveal className="bcard b-c" delay={2}>
            <img className="bicon" src={`${IC}/utils/card_cash.png`} alt="" />
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
            <img className="bicon" src={`${IC}/utils/realtime.png`} alt="" />
            <span className="idx">RND—04</span>
            <h3>{c.cards[2].h}</h3>
            <p>{c.cards[2].p}</p>
            <figure className="artframe">
              <img src={`${CAMP}/realtime.png`} alt={c.cards[2].alt} />
            </figure>
          </Reveal>

          <Reveal className="bcard b-e" delay={1}>
            <img className="bicon" src={`${IC}/utils/map.png`} alt="" />
            <span className="idx">RND—05</span>
            <h3>{c.cards[3].h}</h3>
            <p>{c.cards[3].p}</p>
            <figure className="artframe">
              <img src={`${CAMP}/moto_ride.png`} alt={c.cards[3].alt} />
            </figure>
          </Reveal>

          <Reveal className="bcard b-f" delay={2}>
            <img className="bicon" src={`${IC}/utils/sms.png`} alt="" />
            <span className="idx">RND—06</span>
            <h3>{c.cards[4].h}</h3>
            <p>{c.cards[4].p}</p>
            <figure className="artframe">
              <img src={`${CAMP}/safe_confidence.png`} alt={c.cards[4].alt} />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
