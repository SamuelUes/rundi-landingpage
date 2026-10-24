/**
 * RUNDI · Tipografía del sistema editorial
 * Satoshi = display · Instrument Sans = cuerpo/UI · IBM Plex Mono = metadata.
 * En web las familias se cargan por next/font + Fontshare (ver app/globals.css
 * y las CSS vars --font-instrument / --font-plex en app/layout.tsx).
 */
export const typography = {
  heroTitle: 52,
  heroSubtitle: 17,
  sectionTitle: 38,
  sectionSubtitle: 15,
  body: 17,
  small: 13,
  fontDisplay: "'Satoshi', var(--font-instrument), 'Helvetica Neue', Arial, sans-serif",
  fontBody: "'Instrument Sans', var(--font-instrument), system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', var(--font-plex), ui-monospace, monospace",
};
