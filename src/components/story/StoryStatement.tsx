'use client';

import { Reveal } from '../Reveal';
import { useThemeLanguage } from '../../../theme/ThemeContext';
import { storyCopy } from './storyCopy';

/**
 * Escena 5 — titular gigante a pantalla casi completa (dentro del
 * cover-stack: queda fija y la escena siguiente la cubre).
 */
export default function StoryStatement() {
  const { language } = useThemeLanguage();
  const c = storyCopy[language].statement;

  return (
    <section className="st-scene st-cover-item st-state">
      <div className="sts-inner">
        <Reveal>
          <h2 className="sts-big h-display">{c.big}</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="sts-sub">{c.sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
