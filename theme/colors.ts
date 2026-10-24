/**
 * RUNDI · Paleta del sistema editorial (rundi-mockup.html)
 * Oro = marca/premium · Violeta = acción/designado/en-vivo.
 * Mantener las keys: las screens legacy (RNW) las consumen.
 */

export const darkColors = {
  background: '#0A0C10',
  surface: '#0E1118',
  card: '#131826',
  elevated: '#141926',
  gold: '#D4AF37',
  goldDark: '#A8842A',
  goldLight: '#F1D37A',
  goldSelect: '#14100A',
  goldSoft: 'rgba(212, 175, 55, 0.13)',
  goldBorder: 'rgba(212, 175, 55, 0.18)',
  cream: '#F4EFE3',
  text: '#F5F2E9',
  textSecondary: '#A49B8A',
  textMuted: '#6E6A5F',
  border: 'rgba(245, 242, 233, 0.08)',
  violet: '#9B87FF',
  violet2: '#C4B5FD',
  violetDeep: '#6D4ED8',
  violetSoft: 'rgba(155, 135, 255, 0.13)',
  violetLine: 'rgba(155, 135, 255, 0.34)',
  violetGlow: 'rgba(155, 135, 255, 0.17)',
  onViolet: '#F7F4FF',
  accentBlue: '#60A5FA',
  accentRed: '#F87171',
  accentGreen: '#4ADE80',
} as const;

export const lightColors = {
  background: '#F5F1E8',
  surface: '#EDE7D8',
  card: '#FFFFFF',
  elevated: '#FCFAF3',
  gold: '#A8842A',
  goldDark: '#7A5F18',
  goldLight: '#8A6A1C',
  goldSelect: '#14100A',
  goldSoft: 'rgba(168, 132, 42, 0.10)',
  goldBorder: 'rgba(168, 132, 42, 0.32)',
  cream: '#F4EFE3',
  text: '#221B11',
  textSecondary: '#6E6455',
  textMuted: '#9C9280',
  border: 'rgba(34, 27, 17, 0.10)',
  violet: '#6E44D9',
  violet2: '#7B53E0',
  violetDeep: '#5533B8',
  violetSoft: 'rgba(110, 68, 217, 0.10)',
  violetLine: 'rgba(110, 68, 217, 0.32)',
  violetGlow: 'rgba(110, 68, 217, 0.13)',
  onViolet: '#F7F4FF',
  accentBlue: '#2196F3',
  accentRed: '#F44336',
  accentGreen: '#4CAF50',
} as const;

export const gradients = {
  gold: 'linear-gradient(135deg, #F1D37A 0%, #D4AF37 55%, #A8842A 100%)',
  goldHairline:
    'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.55), transparent)',
  violet: 'linear-gradient(135deg, var(--violet-2), var(--violet) 55%, var(--violet-deep))',
} as const;

// Alias para no romper los imports existentes (por defecto seguimos en modo claro)
export const colors = darkColors;

export type ThemeName = 'light' | 'dark';

export const getColorsForTheme = (theme: ThemeName) =>
  theme === 'dark' ? darkColors : lightColors;
