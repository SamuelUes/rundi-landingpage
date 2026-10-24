'use client';

import PageShell from '../_components/PageShell';
import { Reveal } from '../_components/Reveal';
import { useThemeLanguage, type LanguageCode } from '../../theme/ThemeContext';

const CAMP = '/assets/images/campaña2';

type Tile = { cls: string; src: string; art: boolean; title: string; text: string };

type GalleryCopy = {
  folio: string;
  titleA: string;
  titleB: string;
  lede: string;
  strip: [string, string, string];
  tiles: { title: string; text: string }[];
};

const copy: Record<LanguageCode, GalleryCopy> = {
  es: {
    folio: 'Archivo',
    titleA: 'La ciudad, ',
    titleB: 'en movimiento.',
    lede: 'Arte, campañas y Rundi en la vida real: salidas de noche, universidad, trabajo y familia. Un mismo conductor designado para cada escenario.',
    strip: ['Serie — Campaña 02', 'Managua · 2024–26', '07 piezas'],
    tiles: [
      { title: 'El conductor llega', text: 'Campaña — la app en contexto real' },
      { title: 'Noches que terminan bien', text: 'Tu conductor te espera a la salida' },
      { title: 'De la U a casa', text: 'Traslados seguros para estudiantes' },
      { title: 'Planes con amigos', text: 'Todos llegan; nadie maneja cansado' },
      { title: 'Rundi en la calle', text: 'Pasajero y viaje activo — Managua' },
      { title: 'Días de trabajo', text: 'Movilidad confiable para tu agenda' },
      { title: 'Para toda la familia', text: 'Viajes tranquilos para todos' },
    ],
  },
  en: {
    folio: 'Archive',
    titleA: 'The city, ',
    titleB: 'in motion.',
    lede: 'Art, campaigns and Rundi in real life: nights out, campus, work and family. One designated driver for every scenario.',
    strip: ['Series — Campaign 02', 'Managua · 2024–26', '07 pieces'],
    tiles: [
      { title: 'The driver arrives', text: 'Campaign — the app in real context' },
      { title: 'Nights that end well', text: 'Your driver is waiting outside' },
      { title: 'Campus to home', text: 'Safe rides for students' },
      { title: 'Plans with friends', text: 'Everyone gets home; nobody drives tired' },
      { title: 'Rundi on the street', text: 'Rider and active trip — Managua' },
      { title: 'Work days', text: 'Reliable mobility for your schedule' },
      { title: 'For the whole family', text: 'Calm rides for everyone' },
    ],
  },
  zh: {
    folio: '视觉档案',
    titleA: '行进中的',
    titleB: '城市。',
    lede: '艺术、活动与真实生活中的 Rundi：夜晚出行、校园、工作与家庭，每个场景都有指定司机。',
    strip: ['系列 — 活动 02', '马那瓜 · 2024–26', '07 件'],
    tiles: [
      { title: '司机到达', text: '活动视觉 — 真实场景中的应用' },
      { title: '安心夜归', text: '司机在出口等你' },
      { title: '从校园到家', text: '为学生提供安全接送' },
      { title: '朋友聚会', text: '人人平安到家，无人疲劳驾驶' },
      { title: '街头 Rundi', text: '乘客与进行中的行程 — 马那瓜' },
      { title: '工作日', text: '为你的日程提供可靠出行' },
      { title: '全家适用', text: '人人安心出行' },
    ],
  },
};

const TILES: Omit<Tile, 'title' | 'text'>[] = [
  { cls: 'g-1', src: `${CAMP}/Hero.jpeg`, art: false },
  { cls: 'g-2', src: `${CAMP}/promo_1.png`, art: true },
  { cls: 'g-3', src: `${CAMP}/promo_2.png`, art: true },
  { cls: 'g-4', src: `${CAMP}/promo_3.png`, art: true },
  { cls: 'g-5', src: `${CAMP}/outside.jpeg`, art: false },
  { cls: 'g-6', src: `${CAMP}/promo_4.png`, art: true },
  { cls: 'g-7', src: `${CAMP}/promo_5.png`, art: true },
];

export default function GaleriaPage() {
  const { language } = useThemeLanguage();
  const c = copy[language];

  return (
    <PageShell
      folio={c.folio}
      title={
        <>
          {c.titleA}
          <em className="hl hl-gold">{c.titleB}</em>
        </>
      }
      lede={c.lede}
    >
      <div className="meta-strip">
        <b>{c.strip[0]}</b>
        <span className="sep" />
        <span>{c.strip[1]}</span>
        <span className="sep" />
        <span>{c.strip[2]}</span>
      </div>

      <div className="gal-grid">
        {TILES.map((t, i) => (
          <Reveal key={t.cls} className={`gtile ${t.cls}${t.art ? ' art' : ''}`} delay={i % 3}>
            <span className="gidx">IMG—{String(i + 1).padStart(2, '0')}</span>
            <img src={t.src} alt={c.tiles[i].title} />
            <figcaption>
              <span>
                <b>{c.tiles[i].title}</b>
                <span>{c.tiles[i].text}</span>
              </span>
              <span className="gn">
                {String(i + 1).padStart(2, '0')} / 07
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
