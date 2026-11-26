// App.jsx – Root application with routing
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Treatments = lazy(() => import('./pages/Treatments/Treatments'));
const Media = lazy(() => import('./pages/Media/Media'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Page loader
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      <div style={{ fontSize: '3rem', animation: 'heartbeat 1s ease-in-out infinite' }}>🫀</div>
      <div style={{
        width: '200px',
        height: '3px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #c9a84c, #e8c97e)',
          borderRadius: '999px',
          animation: 'shimmer 1.5s ease-in-out infinite',
          backgroundSize: '200% auto',
        }} />
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
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
