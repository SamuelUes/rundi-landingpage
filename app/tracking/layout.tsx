import type { Metadata } from 'next';
import { JsonLd } from '../_components/JsonLd';
import { SITE_URL } from '../_lib/site';

export const metadata: Metadata = {
  title: 'Seguimiento de viaje',
  description:
    'Seguí tu viaje Rundi en tiempo real: ruta, ubicación del vehículo, origen y destino con tu código de seguimiento.',
  alternates: { canonical: '/tracking' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Tracking', item: `${SITE_URL}/tracking` },
  ],
};

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
