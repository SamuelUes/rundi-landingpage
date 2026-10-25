'use client';

import { useEffect, useMemo, useState } from 'react';
import { BellRing, Check } from 'lucide-react';
import { Reveal } from './Reveal';
import { useThemeLanguage } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const LOCALE: Record<string, string> = { es: 'es-NI', en: 'en-US', zh: 'zh-CN' };

export default function ScheduledTrips() {
  const { language } = useThemeLanguage();
  const c = landingCopy[language].sched;

  // Reloj en vivo del tablero; solo tras mount para no romper hidratación.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const clock = now
    ? now.toLocaleTimeString(LOCALE[language] ?? 'es-NI', { hour12: false })
    : '--:--:--';
  // Semana lun→dom (coincide con `days` del copy)
  const todayIdx = now ? (now.getDay() + 6) % 7 : -1;
  // Números del día de cada celda de la semana en curso
  const weekNums = useMemo(() => {
    if (!now) return null;
    const start = new Date(now);
    start.setDate(now.getDate() - todayIdx);
    return c.days.map((_: string, i: number) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.getDate();
    });
  }, [now, todayIdx, c.days]);

  return (
    <section className="sched sec-pad" id="programados">
      <div className="wrap sched-inner">
        <div>
          <Reveal className="folio">
            <span className="num">03</span> {c.folio}
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h-display sec-title">
              <em className="hl hl-gold">{c.t1}</em> {c.t1_2}
              <br />
              {c.t2pre}
              <em>{c.t2em}</em>
              {c.t2post}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="sec-lede">{c.lede}</p>
          </Reveal>
          <ul className="drive-perks">
            {c.perks.map((p: any) => (
              <li key={p.b}>
                <span className="pcheck">
                  <Check size={12} strokeWidth={3} />
                </span>
                <div>
                  <span className="b">{p.b}</span>
                  <span>{p.s}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="sched-board" delay={2}>
          <div className="sb-head">
            <span className="sb-title">{c.boardT}</span>
            <span className="sb-clock">
              <i className="dot" />
              {clock}
            </span>
          </div>
          <div className="sb-week" aria-hidden="true">
            {c.days.map((d: string, i: number) => (
              <span
                key={i}
                className={`sb-day${c.daysOn.includes(i) ? ' on' : ''}${i === todayIdx ? ' today' : ''}`}
              >
                <span className="dl">{d}</span>
                <span className="dn">{weekNums ? weekNums[i] : ''}</span>
                <i className="dp" />
              </span>
            ))}
          </div>
          <ul className="sb-list">
            {c.trips.map((t: any, i: number) => (
              <Reveal
                as="li"
                key={`${t.t}-${t.d}`}
                className={`sb-row${t.next ? ' next' : ''}`}
                delay={i + 1}
              >
                {t.next && <span className="sb-flag">{c.next}</span>}
                <div className="sb-when">
                  <span className="t">{t.t}</span>
                  <span className="d">{t.d}</span>
                </div>
                <div className="sb-route">
                  <span className="r">
                    {t.from}
                    <em>→</em>
                    {t.to}
                  </span>
                  <span className="m">{t.meta}</span>
                </div>
                <span className={`sb-s ${t.k}`}>{t.s}</span>
              </Reveal>
            ))}
          </ul>
          <div className="sb-foot">
            <BellRing />
            <span>{c.foot}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
