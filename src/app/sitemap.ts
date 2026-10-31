import type { MetadataRoute } from 'next';
import { SITE_URL } from './_lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/tracking', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/galeria', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
