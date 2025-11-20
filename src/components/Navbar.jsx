import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { t } = useLanguage();

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
      setActiveDropdown(null); // Close dropdown after click
    }
  };

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

          {/* Dropdown Menu */}
          <AnimatePresence>
            {link.dropdown && activeDropdown === link.name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  minWidth: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {link.dropdown.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ccc',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: '0.5rem',
                      width: '100%',
                      transition: 'all 0.2s ease',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--accent-color)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#ccc';
                      e.target.style.background = 'transparent';
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
