import type { Metadata } from 'next';
import { JsonLd } from '../_components/JsonLd';
import { SITE_URL } from '../_lib/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Hablemos — soporte, prensa, alianzas y escritorios de conductores de Rundi en Managua, Nicaragua. Respondemos rápido, en tu idioma.',
  alternates: { canonical: '/contacto' },
};

// Espeja las FAQ visibles en la página (versión en español, el idioma por defecto).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo solicito un viaje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ingresá tu destino en la pantalla principal, confirmá la ubicación en el mapa y seleccioná "Confirmar Viaje". Un conductor cercano recibirá tu solicitud.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es conductor designado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un conductor designado maneja tu vehículo. Ideal si tomaste alcohol o no podés usar tu carro. El conductor llega en moto y maneja tu auto de regreso a casa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo cancelo un viaje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podés cancelar desde la pantalla de confirmación antes de que el conductor llegue. Después de 5 minutos puede aplicar un cargo de cancelación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo califico mi viaje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Al finalizar el viaje recibirás una notificación para calificar. También podés hacerlo desde el historial de viajes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué métodos de pago aceptan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aceptamos tarjetas de crédito/débito y efectivo. Podés gestionar tus métodos de pago en tu perfil dentro de la app.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo me convierto en conductor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Registrate como conductor, subí tus documentos (licencia, circulación, seguro) y esperá la aprobación. Recibirás un email cuando estés activo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo compartir mi viaje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, durante el viaje podés compartir un enlace de tracking en tiempo real con familiares o amigos para que vean tu ubicación.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${SITE_URL}/contacto` },
  ],
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd]} />
      {children}
    </>
  );
}
