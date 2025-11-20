import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onEnter }) {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      pointerEvents: 'none' // Allow clicks to pass through to 3D scene if needed, but button needs pointer-events: auto
    }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(0.6)' // Darken video slightly for text readability
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      <motion.img
        src="/logo.png"
        alt="OMIX logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          maxWidth: 'min(80vw, 500px)', // Adjust max width as needed
          height: 'auto',
          display: 'block',
          margin: '0 auto 2rem auto', // Center the image and add bottom margin
          filter: 'drop-shadow(0 0 20px rgba(63, 174, 112, 0.3))' // Similar effect to text-shadow
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          fontFamily: 'var(--font-main)',
          fontSize: '1.2rem',
          letterSpacing: '0.2em',
          marginBottom: '4rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}
      >
        {t('hero.welcome')}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-color)', color: '#000' }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        style={{
          pointerEvents: 'auto',
          padding: '1rem 3rem',
          fontSize: '1rem',
          fontFamily: 'var(--font-mono)',
          background: 'transparent',
          border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        {t('hero.enter')}
      </motion.button>
    </section>
  );
}
