import { Cursor, ProgressBar } from './_components/Chrome';
import Nav from './_components/Nav';
import Hero from './_components/Hero';
import Marquee from './_components/Marquee';
import Services from './_components/Services';
import HowItWorks from './_components/HowItWorks';
import AppShowcase from './_components/AppShowcase';
import Drivers from './_components/Drivers';
import Quote from './_components/Quote';
import Coverage from './_components/Coverage';
import DownloadCTA from './_components/DownloadCTA';
import Footer from './_components/Footer';

export default function Page() {
  return (
    <>
      <ProgressBar />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <HowItWorks />
        <AppShowcase />
        <Drivers />
        <Quote />
        <Coverage />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
