import React, { useEffect, useState, useRef } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import TikTokVideo from './TikTokVideo';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function SocialHighlights() {
  const { t } = useLanguage();
  const [shouldLoadTikTok, setShouldLoadTikTok] = useState(false);
  const tiktokSectionRef = useRef(null);

  useEffect(() => {
    // Only load TikTok script when the TikTok section is near viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadTikTok) {
            setShouldLoadTikTok(true);
          }
        });
      },
      {
        rootMargin: '300px' // Start loading 300px before visible
      }
    );

    if (tiktokSectionRef.current) {
      observer.observe(tiktokSectionRef.current);
    }

    return () => {
      if (tiktokSectionRef.current) {
        observer.unobserve(tiktokSectionRef.current);
      }
    };
  }, [shouldLoadTikTok]);

  useEffect(() => {
    if (!shouldLoadTikTok) return;

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
  }, [shouldLoadTikTok]);

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
              <LazyInstagramEmbed key={`insta-${i}`} url={url} index={i} />
            ))}
          </div>
        </div>

        {/* TikTok Row */}
        <div id="tiktok" ref={tiktokSectionRef}>
          <div style={{ textAlign: 'center', color: '#888', fontFamily: 'var(--font-mono)', marginBottom: '2rem', fontSize: '1.2rem', letterSpacing: '2px' }}>{t('social.tiktok')}</div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            gap: '2rem'
          }}>
            {shouldLoadTikTok && [
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
            {!shouldLoadTikTok && (
              <div style={{ 
                width: '100%', 
                minHeight: '200px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                color: '#888',
                fontFamily: 'var(--font-mono)'
              }}>
                Loading TikTok videos...
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

// Lazy Instagram Embed Component
function LazyInstagramEmbed({ url, index }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const embedRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
          }
        });
      },
      {
        rootMargin: '200px' // Start loading 200px before visible
      }
    );

    if (embedRef.current) {
      observer.observe(embedRef.current);
    }

    return () => {
      if (embedRef.current) {
        observer.unobserve(embedRef.current);
      }
    };
  }, [shouldLoad]);

  return (
    <motion.div
      ref={embedRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ width: '328px', maxWidth: '100%', minHeight: '400px' }}
    >
      {shouldLoad ? (
        <InstagramEmbed url={url} width={328} captioned />
      ) : (
        <div style={{
          width: '328px',
          height: '400px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#888',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem'
        }}>
          Loading Instagram...
        </div>
      )}
    </motion.div>
  );
}

