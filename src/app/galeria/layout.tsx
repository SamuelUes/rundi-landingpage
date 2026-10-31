import type { Metadata } from 'next';
import { JsonLd } from '../_components/JsonLd';
import { SITE_URL } from '../_lib/site';

export const metadata: Metadata = {
  title: 'Galería',
  description:
    'Arte, campañas y Rundi en la vida real: salidas de noche, universidad, trabajo y familia en Managua, Nicaragua.',
  alternates: { canonical: '/galeria' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Galería', item: `${SITE_URL}/galeria` },
  ],
};

export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
