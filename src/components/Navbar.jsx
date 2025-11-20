import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const links = [
    { name: t('nav.bio'), id: 'bio' },
    { name: t('nav.session'), id: 'session' },
    { 
      name: t('nav.social'), 
      id: 'highlights',
      dropdown: [
        { name: t('social.instagram'), id: 'instagram' },
        { name: t('social.tiktok'), id: 'tiktok' }
      ]
    },
    { name: t('nav.music'), id: 'music' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  if (isMobile) {
    return (
      <>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 101,
            background: 'rgba(0,0,0,0.7)',
            border: '2px solid var(--accent-color)',
            color: 'var(--accent-color)',
            padding: '0.75rem',
            borderRadius: '8px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            fontSize: '1.5rem',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? '×' : '☰'}
        </motion.button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '300px',
                background: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(10px)',
                zIndex: 100,
                padding: '5rem 2rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                borderLeft: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <LanguageSwitcher />
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
              
              {links.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={() => !link.dropdown && scrollToSection(link.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      padding: '0.5rem 0',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}
                  >
                    {link.name}
                  </button>
                  {link.dropdown && (
                    <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                      {link.dropdown.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#888',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            padding: '0.5rem 0',
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'color 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                          onMouseLeave={(e) => e.target.style.color = '#888'}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 100,
        display: 'flex',
        gap: '1rem',
        background: 'rgba(0,0,0,0.5)',
        padding: '0.5rem 1.5rem',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        alignItems: 'center'
      }}
    >
      <LanguageSwitcher />
      <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
      
      {links.map((link) => (
        <div 
          key={link.name} 
          style={{ position: 'relative' }}
          onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
          onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
        >
          <button
            onClick={() => !link.dropdown && scrollToSection(link.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '0.5rem',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
            onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            {link.name}
            {link.dropdown && <span style={{ fontSize: '0.7rem' }}>▼</span>}
          </button>

          <AnimatePresence>
            {link.dropdown && activeDropdown === link.name && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '0.5rem',
                  background: 'rgba(0,0,0,0.9)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  minWidth: '150px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {link.dropdown.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(63, 174, 112, 0.1)';
                      e.target.style.color = 'var(--accent-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#fff';
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.nav>
  );
}
