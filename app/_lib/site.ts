/**
 * Configuración pública del sitio — URLs canónicas, tiendas y contacto.
 * Las URLs de las stores se pueden sobreescribir con env vars sin tocar código:
 *   NEXT_PUBLIC_APP_STORE_URL / NEXT_PUBLIC_PLAY_STORE_URL
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rundiapp.com').replace(/\/$/, '');
export const SITE_NAME = 'Rundi';
export const SITE_LOCALE = 'es_NI';

export const STORE = {
  ios: (process.env.NEXT_PUBLIC_APP_STORE_URL || 'https://rundi.app/get').trim(),
  android: (process.env.NEXT_PUBLIC_PLAY_STORE_URL || 'https://rundi.app/get').trim(),
  get: 'https://rundi.app/get',
};

export const CONTACT = {
  email: 'soporte@rundiapp.com',
  phone: '+50512345678',
  whatsapp: 'https://wa.me/50512345678',
};

export const SHARE_TEXT =
  'Rundi — la plataforma nicaragüense de movilidad. Conductor designado, viajes seguros y seguimiento en tiempo real. Ya en Managua.';

/** Enlaces de intención para compartir la landing en redes sociales. */
export const shareLinks = () => {
  const url = encodeURIComponent(SITE_URL);
  const text = encodeURIComponent(SHARE_TEXT);
  return [
    {
      key: 'whatsapp',
      label: 'Compartir por WhatsApp',
      href: `https://wa.me/?text=${text}%20${url}`,
    },
    {
      key: 'x',
      label: 'Compartir en X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    },
    {
      key: 'facebook',
      label: 'Compartir en Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      key: 'linkedin',
      label: 'Compartir en LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
  ];
};
