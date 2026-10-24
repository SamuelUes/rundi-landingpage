import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Términos — Rundi',
  description: 'Términos y condiciones de uso de Rundi.',
};

export default function TerminosPage() {
  return <LegalPage doc="terms" />;
}
