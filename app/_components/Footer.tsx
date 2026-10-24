'use client';

import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

export default function Footer() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].footer;

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="brand" href="#top">
              <img src="/assets/images/rundi_mark.png" alt="Rundi" />
              <span className="brand-name">Rundi</span>
            </a>
            <p>{c.tagline}</p>
          </div>
          {c.cols.map((col: any) => (
            <div className="foot-col" key={col.h}>
              <h5>{col.h}</h5>
              {col.links.map((l: any) => (
                <a key={l.t} href={l.href}>
                  {l.t}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-word">RUNDI</div>
        <div className="foot-base">
          <span>{c.base}</span>
          <span>{c.edition}</span>
        </div>
      </div>
    </footer>
  );
}
