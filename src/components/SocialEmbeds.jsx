import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LazyIframe from './LazyIframe';

export default function SocialEmbeds() {
  const { t } = useLanguage();

  return (
    <section style={{ 
      padding: '2rem 2rem 6rem 2rem', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      position: 'relative', 
      zIndex: 10,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h3 style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--secondary-color)',
        marginBottom: '2rem',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        textAlign: 'center'
      }}>
        {t('music.title')}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '100%', margin: '0 auto', width: '100%' }}>

        {/* SoundCloud */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            width: '100%'
          }}
        >
          <LazyIframe
            width="100%"
            height="450"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/omix-dj-edits&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            style={{ borderRadius: '12px', width: '100%', height: '450px' }}
          />
        </motion.div>

      </div>
    </section>
  );
}

