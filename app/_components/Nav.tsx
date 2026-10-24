'use client';

import { Globe, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useThemeLanguage, type LanguageCode } from '../../theme/ThemeContext';
import { landingCopy } from './landingCopy';

const LANG_ORDER: LanguageCode[] = ['es', 'en', 'zh'];
const LANG_LABEL: Record<LanguageCode, string> = { es: 'ES', en: 'EN', zh: '中文' };

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, language, setLanguage } = useThemeLanguage();
  const c = landingCopy[language].nav;
  const navRef = useRef<HTMLElement>(null);

  // Bloquea el scroll del fondo mientras el menú está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cierra con Escape o click fuera del header
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: globalThis.MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <header className={`nav${open ? ' menu-open' : ''}`} ref={navRef}>
      <div className="wrap nav-inner">
        <a className="brand" href="/" aria-label="Rundi — inicio">
          <Image
            src="/assets/images/opt/rundi-logo.webp"
            alt="Rundi"
            width={384}
            height={328}
            priority
          />
        </a>
        <div className="nav-actions">
          <button
            className="lang-btn"
            type="button"
            aria-label="Cambiar idioma"
            onClick={() =>
              setLanguage(LANG_ORDER[(LANG_ORDER.indexOf(language) + 1) % LANG_ORDER.length])
            }
          >
            <Globe size={14} />
            <span>{LANG_LABEL[language]}</span>
          </button>
          <button
            className="theme-btn"
            type="button"
            aria-label="Cambiar tema"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Sun /> : <Moon />}
          </button>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="menuPanel"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
          >
            <span className="menu-ico">
              <span></span>
              <span></span>
            </span>
            <span>{open ? c.close : c.menu}</span>
          </button>
          <a href="#descargar" className="nav-cta">
            {c.download}
          </a>
        </div>
      </div>
      <div className="menu-panel" id="menuPanel">
        <div className="menu-card">
          <Image
            className="menu-mark"
            src="/assets/images/opt/rundi-mark.webp"
            alt=""
            aria-hidden="true"
            width={320}
            height={320}
          />
          <div>
            <span className="menu-h">{c.navH}</span>
            <nav className="menu-main">
              {c.links.map((l: any) => (
                <a key={l.n} href={l.href} onClick={() => setOpen(false)}>
                  <em>{l.n}</em>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="menu-side menu-pages">
            <span className="menu-h">{c.pagesH}</span>
            {c.pages.map((item: any) => (
              <a key={item.b} href={item.href} onClick={() => setOpen(false)}>
                <span className="b">{item.b}</span>
                <span>{item.s}</span>
              </a>
            ))}
          </div>

          <div className="menu-side">
            <span className="menu-h">{c.whyH}</span>
            {c.side.map((item: any) => (
              <a key={item.b} href={item.href} onClick={() => setOpen(false)}>
                <span className="b">{item.b}</span>
                <span>{item.s}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
