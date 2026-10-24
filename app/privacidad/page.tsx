import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo protegemos tus datos en Rundi: qué recopilamos, cómo lo usamos y cuáles son tus derechos.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return <LegalPage doc="privacy" />;
}
