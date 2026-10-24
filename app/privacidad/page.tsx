import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacidad — Rundi',
  description: 'Cómo protegemos tus datos en Rundi.',
};

export default function PrivacidadPage() {
  return <LegalPage doc="privacy" />;
}
