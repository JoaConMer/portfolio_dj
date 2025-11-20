import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function LatestSession() {
  const { t } = useLanguage();

  return (
    <section style={{ 
      padding: '2rem 2rem', 
      maxWidth: '1400px', 
      margin: '0 auto', 
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
        style={{ textAlign: 'center' }}
      >
        <h3 style={{ 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--secondary-color)', 
          marginBottom: '3rem',
          fontSize: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          {t('session.title')}
        </h3>

        <div style={{ 
          background: 'rgba(0,0,0,0.6)', 
          padding: '2rem', 
          borderRadius: '16px',
          border: '1px solid #333',
          backdropFilter: 'blur(5px)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%', /* 16:9 */
            height: 0,
            overflow: 'hidden',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <iframe 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              src="https://www.youtube.com/embed/xOHRZkyMx7w?si=jqK0lFxgIB2GFe1k" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
