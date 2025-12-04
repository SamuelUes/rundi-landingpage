import type { Metadata } from 'next';
import { ThemeLanguageProvider } from '../theme/ThemeContext';

export const metadata: Metadata = {
  title: 'Rundi',
  description: 'Rundi - Movilidad segura y conductor designado para Nicaragua',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeLanguageProvider>{children}</ThemeLanguageProvider>
      </body>
    </html>
  );
}
