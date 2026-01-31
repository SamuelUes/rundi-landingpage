'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightColors, darkColors, type ThemeName } from './colors';

export type LanguageCode = 'es' | 'en' | 'zh';

type Palette = typeof lightColors;

export type ThemeLanguageContextValue = {
  theme: ThemeName;
  setTheme: (value: ThemeName) => void;
  language: LanguageCode;
  setLanguage: (value: LanguageCode) => void;
  colors: Palette;
};

const ThemeLanguageContext = createContext<ThemeLanguageContextValue | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('light');
  const [language, setLanguageState] = useState<LanguageCode>('es');

  // Carga inicial desde localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = window.localStorage.getItem('rundi_theme');
    const storedLang = window.localStorage.getItem('rundi_lang');

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
    }
    if (storedLang === 'es' || storedLang === 'en' || storedLang === 'zh') {
      setLanguageState(storedLang);
    }
  }, []);

  // Sincroniza tema con <html> y localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return;
    window.localStorage.setItem('rundi_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sincroniza idioma con <html lang> y localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return;
    window.localStorage.setItem('rundi_lang', language);
    const htmlLang = language === 'es' ? 'es' : language === 'en' ? 'en' : 'zh';
    document.documentElement.setAttribute('lang', htmlLang);
  }, [language]);

  const value: ThemeLanguageContextValue = {
    theme,
    setTheme: (value) => setThemeState(value),
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
