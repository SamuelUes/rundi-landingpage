'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { lightColors, darkColors, type ThemeName } from './colors';

export type LanguageCode = 'es' | 'en' | 'zh';

type Palette = typeof darkColors;

export type ThemeLanguageContextValue = {
  theme: ThemeName;
  setTheme: (value: ThemeName) => void;
  toggleTheme: () => void;
  language: LanguageCode;
  setLanguage: (value: LanguageCode) => void;
  colors: Palette;
};

const ThemeLanguageContext = createContext<ThemeLanguageContextValue | undefined>(undefined);

const THEME_KEY = 'rundi-theme';
const LANG_KEY = 'rundi_lang';

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('dark');
  const [language, setLanguageState] = useState<LanguageCode>('es');

  // Init: el script inline de app/layout.tsx ya fijó data-theme antes del paint;
  // aquí solo sincronizamos el estado de React con ese valor.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const current = document.documentElement.dataset.theme;
    if (current === 'light' || current === 'dark') {
      setThemeState(current);
    } else {
      const stored = window.localStorage.getItem(THEME_KEY);
      const next: ThemeName =
        stored === 'light' || stored === 'dark'
          ? stored
          : window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
      setThemeState(next);
    }
    const storedLang = window.localStorage.getItem(LANG_KEY);
    if (storedLang === 'es' || storedLang === 'en' || storedLang === 'zh') {
      setLanguageState(storedLang);
    }
  }, []);

  // La primera escritura en DOM/localStorage ya la hizo el script inline del
  // layout (y el init de arriba solo lee). Estos effects solo escriben cuando
  // el valor cambia tras el mount; de lo contrario, el estado inicial ('dark')
  // pisaría el tema guardado antes de que el init lo leyera — y en StrictMode
  // la segunda pasada del init ya leería el valor corrupto.
  const didSyncTheme = useRef(false);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!didSyncTheme.current) {
      didSyncTheme.current = true;
      return;
    }
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const didSyncLang = useRef(false);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!didSyncLang.current) {
      didSyncLang.current = true;
      return;
    }
    window.localStorage.setItem(LANG_KEY, language);
    document.documentElement.setAttribute(
      'lang',
      language === 'es' ? 'es' : language === 'en' ? 'en' : 'zh',
    );
  }, [language]);

  const value: ThemeLanguageContextValue = {
    theme,
    setTheme: (value) => setThemeState(value),
    toggleTheme: () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    language,
    setLanguage: (value) => setLanguageState(value),
    colors: (theme === 'dark' ? darkColors : lightColors) as Palette,
  };

  return <ThemeLanguageContext.Provider value={value}>{children}</ThemeLanguageContext.Provider>;
};

export const useThemeLanguage = (): ThemeLanguageContextValue => {
  const value = useContext(ThemeLanguageContext);
  if (!value) {
    throw new Error('useThemeLanguage debe usarse dentro de ThemeLanguageProvider');
  }
  return value;
};

export const useTheme = useThemeLanguage;
