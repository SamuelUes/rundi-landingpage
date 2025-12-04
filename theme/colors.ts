export const lightColors = {
  background: '#f5f2f2ff',
  surface: '#ffffffff',
  card: '#ffffffff',
  gold: '#D4AF37',
  goldDark: '#b38f2c',
  goldLight: '#c9aa4fff',
  text: '#111827',
  textSecondary: '#4b5563',
  border: '#e5e7eb',
  accentBlue: '#2196F3',
  accentRed: '#F44336',
  accentGreen: '#4CAF50',
} as const;

export const darkColors = {
  background: '#111827',
  surface: '#111827',
  card: '#a2c9f0ff ',
  gold: '#D4AF37',
  goldDark: '#b38f2c',
  goldLight: '#f1d37a',
  text: '#F9FAFB',
  textSecondary: '#ffffffff',
  border: '#1F2937',
  accentBlue: '#60A5FA',
  accentRed: '#F87171',
  accentGreen: '#4ADE80',
} as const;

// Alias para no romper los imports existentes (por defecto seguimos en modo claro)
export const colors = lightColors;

export type ThemeName = 'light' | 'dark';

export const getColorsForTheme = (theme: ThemeName) =>
  theme === 'dark' ? darkColors : lightColors;
