import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('infoomixdj@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=infoomixdj@gmail.com', '_blank');
  };

  return (
    <section style={{ 
      padding: '4rem 2rem', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 style={{ 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--accent-color)', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '0 0 10px rgba(63, 174, 112, 0.3)'
        }}>
          {t('contact.booking_title')}
        </h2>
        
        <p style={{ 
          color: '#ccc', 
          fontSize: '1.2rem', 
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.6'
        }}>
          {t('contact.booking_desc')}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Instagram', url: 'https://instagram.com/omixdjoficial', icon: '📸', label: '@omixdjoficial' },
            { 
              name: 'Email', 
              url: 'mailto:infoomixdj@gmail.com', 
              icon: '✉️', 
              label: copied ? '¡Copiado al portapapeles!' : (t('contact.send') + ' Email'),
              isEmail: true
            }
          ].map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              onClick={link.isEmail ? handleEmailClick : undefined}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-color)', boxShadow: '0 0 20px rgba(63, 174, 112, 0.2)' }}
              style={{ 
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>{link.icon}</span>
              <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{link.name}</span>
              <span style={{ fontSize: '0.9rem', color: link.isEmail && copied ? 'var(--accent-color)' : '#888' }}>{link.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
