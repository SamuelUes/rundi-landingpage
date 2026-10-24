import type { Metadata } from 'next';
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google';
import { ThemeLanguageProvider } from '../theme/ThemeContext';
import './globals.css';

const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex' });

export const metadata: Metadata = {
  title: 'Rundi — Tu ciudad, tu conductor · Managua',
  description:
    'Rundi — la plataforma nicaragüense de viajes. Conductor designado, viajes multi-destino y seguridad en tiempo real. Ya en Managua.',
  icons: {
    icon: '/assets/images/rundi_mark.png',
  },
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
