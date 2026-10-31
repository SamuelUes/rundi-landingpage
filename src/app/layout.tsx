import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google';
import { ThemeLanguageProvider } from '../theme/ThemeContext';
import { SITE_URL, SITE_NAME } from './_lib/site';
import './globals.css';

const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex' });

const DESCRIPTION =
  'Rundi es la plataforma nicaragüense de movilidad: viajes con conductor verificado, conductor designado, multi-destino, pagos flexibles y seguimiento en tiempo real. Ya en Managua.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rundi — Tu ciudad, tu conductor · Managua',
    template: '%s — Rundi',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Rundi',
    'conductor designado',
    'conductor designado Managua',
    'transporte Managua',
    'viajes Nicaragua',
    'app de movilidad Nicaragua',
    'taxi Managua',
    'designated driver Nicaragua',
    'rideshare Managua',
    'Rundi app',
  ],
  authors: [{ name: 'Rundi', url: SITE_URL }],
  creator: 'Rundi',
  publisher: 'Rundi',
  category: 'travel',
  alternates: { canonical: '/' },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: 'es_NI',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: SITE_NAME,
    title: 'Rundi — Tu ciudad, tu conductor · Managua',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rundi — Tu ciudad, tu conductor · Managua',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F1E8' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0C10' },
  ],
};

// Fija data-theme antes del primer paint para evitar flash de tema.
const themeInit = `try{var t=localStorage.getItem('rundi-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${instrument.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <ThemeLanguageProvider>{children}</ThemeLanguageProvider>
      </body>
    </html>
  );
}
