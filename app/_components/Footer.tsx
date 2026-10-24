'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';
import ShareLinks from './ShareLinks';

export default function Footer() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].footer;

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href="/" aria-label="Rundi — inicio">
              <Image src="/assets/images/opt/rundi-mark.webp" alt="Rundi" width={320} height={320} />
              <span className="brand-name">Rundi</span>
            </Link>
            <p>{c.tagline}</p>
            <ShareLinks />
          </div>
          {c.cols.map((col: any) => (
            <div className="foot-col" key={col.h}>
              <span className="foot-h">{col.h}</span>
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
