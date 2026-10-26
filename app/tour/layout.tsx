import type { Metadata } from 'next';
import { JsonLd } from '../_components/JsonLd';
import { SITE_URL } from '../_lib/site';

export const metadata: Metadata = {
  title: 'Tour de la app',
  description:
    'Recorrido narrativo por la app de Rundi: pedí un viaje en 4 pasos, mirá el lado conductor y seguí la ciudad en movimiento.',
  alternates: { canonical: '/tour' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Tour de la app', item: `${SITE_URL}/tour` },
  ],
};

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
