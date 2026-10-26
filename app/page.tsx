import { Cursor, ProgressBar } from './_components/Chrome';
import Nav from './_components/Nav';
import Hero from './_components/Hero';
import Marquee from './_components/Marquee';
import Services from './_components/Services';
import HowItWorks from './_components/HowItWorks';
import ScheduledTrips from './_components/ScheduledTrips';
import AppShowcase from './_components/AppShowcase';
import AppStory from './_components/story/AppStory';
import Drivers from './_components/Drivers';
import Quote from './_components/Quote';
import Coverage from './_components/Coverage';
import DownloadCTA from './_components/DownloadCTA';
import Footer from './_components/Footer';
import { JsonLd } from './_components/JsonLd';
import { CONTACT, SITE_NAME, SITE_URL, STORE } from './_lib/site';

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/rundi_mark.png`,
    image: `${SITE_URL}/assets/images/rundi_mark.png`,
    description:
      'Plataforma nicaragüense de movilidad: viajes con conductor verificado, conductor designado, multi-destino y seguimiento en tiempo real.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Managua',
      addressCountry: 'NI',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      contactType: 'customer support',
      availableLanguage: ['es', 'en'],
      areaServed: 'NI',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'es',
    publisher: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    url: SITE_URL,
    operatingSystem: ['iOS', 'Android'],
    applicationCategory: 'TravelApplication',
    inLanguage: 'es',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Conductor designado',
      'Viajes programados',
      'Viajes multi-destino',
      'Seguimiento en tiempo real',
      'Pagos flexibles',
      'Botón SOS',
    ],
    installUrl: STORE.get,
    author: { '@id': `${SITE_URL}/#organization` },
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={structuredData} />
      <ProgressBar />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <HowItWorks />
        <ScheduledTrips />
        <AppShowcase />
        <AppStory />
        <Drivers />
        <Quote />
        <Coverage />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
