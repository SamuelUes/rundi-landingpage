import type { MetadataRoute } from 'next';
import { SITE_NAME } from './_lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rundi — Movilidad nicaragüense',
    short_name: SITE_NAME,
    description:
      'Viajes con conductor verificado, conductor designado, multi-destino y seguimiento en tiempo real. Ya en Managua, Nicaragua.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'es',
    background_color: '#0A0C10',
    theme_color: '#0A0C10',
    categories: ['travel', 'navigation', 'lifestyle'],
    icons: [
      { src: '/assets/images/rundi_mark.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/images/rundi_mark.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/assets/images/rundi_mark.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
