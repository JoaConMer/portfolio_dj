import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingBookingBtn() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Hide button if contact section is visible in viewport
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 100,
            background: 'var(--accent-color)',
            color: '#000',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '50px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(63, 174, 112, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          <span>📅</span>
          {t('booking_float')}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
