import React, { useState, lazy, Suspense } from 'react';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import LoadingSpinner from './components/LoadingSpinner';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import FloatingBookingBtn from './components/FloatingBookingBtn';

// Lazy load heavy components
const Bio = lazy(() => import('./components/Bio'));
const LatestSession = lazy(() => import('./components/LatestSession'));
const SocialEmbeds = lazy(() => import('./components/SocialEmbeds'));
const SocialHighlights = lazy(() => import('./components/SocialHighlights'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [entered, setEntered] = useState(() => {
    return localStorage.getItem('hasEntered') === 'true';
  });

  const handleEnter = () => {
    setEntered(true);
    localStorage.setItem('hasEntered', 'true');
  };

  const handleBack = () => {
    setEntered(false);
    localStorage.setItem('hasEntered', 'false');
  };

  return (
    <main style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflowX: 'hidden', overflowY: entered ? 'auto' : 'hidden' }}>
      <Scene3D />
      
      {!entered ? (
        <Hero onEnter={handleEnter} />
      ) : (
        <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          {/* Navigation */}
          <Navbar />
          
          {/* Floating Booking Button */}
          <FloatingBookingBtn />

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleBack}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: 100,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid var(--accent-color)',
              color: 'var(--accent-color)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              backdropFilter: 'blur(5px)'
            }}
          >
            ← VOLVER
          </motion.button>

          <Suspense fallback={<LoadingSpinner />}>
            <div id="bio">
              <Bio />
            </div>
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <div id="session">
              <LatestSession />
            </div>
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <div id="highlights">
              <SocialHighlights />
            </div>
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <div id="music">
              <SocialEmbeds />
            </div>
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <div id="contact">
              <Contact />
            </div>
          </Suspense>
        </div>
      )}
    </main>
  );
}

export default App;

