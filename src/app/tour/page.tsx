import { Cursor, ProgressBar } from '../_components/Chrome';
import Nav from '../_components/Nav';
import Footer from '../_components/Footer';
import AppStory from '../_components/story/AppStory';

/**
 * /tour — la App Story completa (las 7 escenas), standalone.
 * Sin PageShell: el tour es full-bleed y su primera escena hace de hero.
 */
export default function TourPage() {
  return (
    <>
      <ProgressBar />
      <Cursor />
      <Nav />
      <main>
        <AppStory full />
      </main>
      <Footer />
    </>
  );
}
