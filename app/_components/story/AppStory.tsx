'use client';

import StoryCarousel from './StoryCarousel';
import StoryTabs from './StoryTabs';
import StoryFeature from './StoryFeature';
import StoryPromo from './StoryPromo';
import StoryStatement from './StoryStatement';
import StoryParallax from './StoryParallax';
import StoryOutro from './StoryOutro';

/**
 * App Story — tour narrativo de la app ligado al scroll (estilo página de
 * producto OnePlus). Autocontenido: se puede montar como sección de la
 * landing, como cuerpo completo de una página (/tour) o reemplazo de
 * /galeria.
 *
 * `full` = false → selección reducida para la home (la que quedó tras
 * comentar escenas en la versión original); `full` = true → las 7 escenas.
 *
 * Escenas 1–4 fluyen normal; 5–7 viven en `.st-cover`, donde cada una es
 * sticky y la siguiente la cubre (efecto capas del video de referencia).
 */
export default function AppStory({ full = false }: { full?: boolean }) {
  return (
    <div className="story" id="tour">
      {full && <StoryCarousel />}
      {full && <StoryTabs />}
      <StoryFeature />
      {full && <StoryPromo />}
      <div className="st-cover">
        <StoryStatement />
        <StoryParallax />
        {full && <StoryOutro />}
      </div>
    </div>
  );
}
