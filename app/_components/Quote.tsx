'use client';

import { Hl, Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

export default function Quote() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].quote;

  return (
    <section className="quote">
      <div className="wrap">
        <Reveal>
          <span className="qmark">“</span>
          <blockquote>
            {c.pre}
            <em>{c.em}</em>
            {c.mid}
            <br />
            <Hl variant="violet">{c.hl}</Hl>
            {c.post}
          </blockquote>
          <cite>{c.cite}</cite>
        </Reveal>
      </div>
    </section>
  );
}
