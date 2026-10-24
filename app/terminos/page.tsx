import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Términos de uso',
  description: 'Términos y condiciones de uso de la plataforma Rundi en Nicaragua.',
  alternates: { canonical: '/terminos' },
};

export default function TerminosPage() {
  return <LegalPage doc="terms" />;
}
