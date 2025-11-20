import React, { useEffect } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import TikTokVideo from './TikTokVideo';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function SocialHighlights() {
  const { t } = useLanguage();

  useEffect(() => {
    // Centralized TikTok Script Loading
    const loadTikTokScript = () => {
      if (document.getElementById('tiktok-embed-script')) {
        if (window.tiktok && window.tiktok.embed) {
          window.tiktok.embed.load();
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.tiktok && window.tiktok.embed) {
          window.tiktok.embed.load();
        }
      };
      document.body.appendChild(script);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadTikTokScript();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{ 
      padding: '2rem 2rem 8rem 2rem', 
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
        marginBottom: '3rem',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        textAlign: 'center'
      }}>
        {t('social.title')}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Instagram Row */}
        <div id="instagram">
          <div style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono)', marginBottom: '2rem', fontSize: '1.2rem', letterSpacing: '2px' }}>{t('social.instagram')}</div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            gap: '2rem'
          }}>
            {[
              "https://www.instagram.com/p/DQ7kNH8DM70/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
              "https://www.instagram.com/p/DOOfvbbjJS7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
              "https://www.instagram.com/p/C_qshc1IV9S/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            ].map((url, i) => (
              <motion.div
                key={`insta-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ width: '328px', maxWidth: '100%' }}
              >
                <InstagramEmbed url={url} width={328} captioned />
              </motion.div>
            ))}
          </div>
        </div>

        {/* TikTok Row */}
        <div id="tiktok">
          <div style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono)', marginBottom: '2rem', fontSize: '1.2rem', letterSpacing: '2px' }}>{t('social.tiktok')}</div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            gap: '2rem'
          }}>
            {[
              { id: "7570033460123946262", url: "https://www.tiktok.com/@omixdjoficial/video/7570033460123946262" },
              { id: "7421201519594179873", url: "https://www.tiktok.com/@omixdjoficial/video/7421201519594179873" },
              { id: "7437187971436039456", url: "https://www.tiktok.com/@omixdjoficial/video/7437187971436039456" }
            ].map((video, i) => (
              <motion.div
                key={`tiktok-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                style={{ width: '325px', maxWidth: '100%' }}
              >
                <TikTokVideo url={video.url} videoId={video.id} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
