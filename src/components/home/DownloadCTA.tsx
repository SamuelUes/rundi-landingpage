'use client';

import Image from 'next/image';
import { Reveal } from './Reveal';
import { Magnet } from './Magnet';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';
import { STORE } from '../_lib/site';

const APPLE = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);
const PLAY = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.6 1.8L13.7 12 3.6 22.2c-.37-.2-.6-.57-.6-1.02V2.82c0-.45.23-.82.6-1.02zm11.75 8.55L4.4 1.4l12.8 7.3-1.85 1.65zm1.85 1.65l-1.85 1.65L4.4 22.6l12.8-7.3c.5-.28.5-1.02 0-1.3z" />
  </svg>
);

export default function DownloadCTA() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].cta;

  return (
    <section className="sec-pad" id="descargar" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="cta-panel">
          <Image
            className="ghost"
            src="/assets/images/opt/rundi-mark.webp"
            alt=""
            aria-hidden="true"
            width={320}
            height={320}
          />
          <div>
            <div className="folio">
              <span className="num">07</span> {c.folio}
            </div>
            <h2 className="h-display" style={{ marginTop: 24 }}>
              {c.t1}
              <br />
              <em>{c.tEm}</em>
              {c.t2}
            </h2>
            <p>{c.p}</p>
            <div className="store-row">
              <Magnet
                className="store-btn"
                href={STORE.ios}
                ariaLabel={`${c.sm1} App Store`}
              >
                {APPLE}
                <span>
                  <span className="sm">{c.sm1}</span>
                  <span className="lg">App Store</span>
                </span>
              </Magnet>
              <Magnet
                className="store-btn"
                href={STORE.android}
                ariaLabel={`${c.sm2} Google Play`}
              >
                {PLAY}
                <span>
                  <span className="sm">{c.sm2}</span>
                  <span className="lg">Google Play</span>
                </span>
              </Magnet>
            </div>
          </div>
          <div className="cta-card">
            <div className="qr-row">
              <div className="qr">
                <Image src="/assets/images/opt/rundi-icon.webp" alt="Rundi" width={256} height={205} />
              </div>
              <div>
                <h3>{c.qrH}</h3>
                <p>{c.qrP}</p>
              </div>
            </div>
            <div className="alt">
              {c.altPre}
              <a href={STORE.get} target="_blank" rel="noopener noreferrer">
                rundi.app/get
              </a>
              {c.altPost}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
