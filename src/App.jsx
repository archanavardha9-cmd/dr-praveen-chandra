// App.jsx – Root application with routing and bright clinical loader
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Treatments = lazy(() => import('./pages/Treatments/Treatments'));
const Media = lazy(() => import('./pages/Media/Media'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '72vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F6F9FC',
        flexDirection: 'column',
        gap: '1rem',
        paddingTop: 'var(--header-height)',
      }}
    >
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#005B94" fillOpacity="0.1" />
        <path
          d="M12 34h10l5-12 7 22 6-15 4 5h8"
          stroke="#005B94"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ fontSize: '0.88rem', color: '#5A738C', fontWeight: 500 }}>
        Loading clinical section…
      </span>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: 'var(--header-height)' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
