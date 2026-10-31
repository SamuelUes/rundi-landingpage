import type { ReactNode } from 'react';
import { Cursor, ProgressBar } from './Chrome';
import Nav from './Nav';
import Footer from './Footer';
import { Reveal } from './Reveal';

/**
 * Marco compartido de las subpáginas: chrome (cursor + barra de progreso),
 * nav con menú, encabezado editorial (folio + título display) y footer.
 */
export default function PageShell({
  folio,
  title,
  lede,
  children,
}: {
  folio: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <ProgressBar />
      <Cursor />
      <Nav />
      <main>
        <header className="page-head">
          <div className="wrap" style={{ position: 'relative' }}>
            <Reveal className="folio">
              <span className="num">RND</span> {folio}
            </Reveal>
            <Reveal delay={1}>
              <h1 className="h-display sec-title">{title}</h1>
            </Reveal>
            {lede ? (
              <Reveal delay={2}>
                <p className="sec-lede">{lede}</p>
              </Reveal>
            ) : null}
          </div>
        </header>
        <div className="page-body">
          <div className="wrap">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
