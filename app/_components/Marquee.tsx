'use client';

import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

/** Marquee infinito: el track se duplica para el loop -50%. */
export default function Marquee() {
  const { language } = useThemeLanguage();
  const items = landingCopy[language].marquee as string[];

  const row = (ariaHidden: boolean) => (
    <>
      {items.map((item, i) =>
        i % 2 === 0 ? (
          <div className="mq-item" key={`${item}-${ariaHidden}`}>
            <em>{item}</em>
            <img src="/assets/images/rundi_mark.png" alt="" />
          </div>
        ) : (
          <div className="mq-item" key={`${item}-${ariaHidden}`}>
            {item} <img src="/assets/images/rundi_mark.png" alt="" />
          </div>
        ),
      )}
    </>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
