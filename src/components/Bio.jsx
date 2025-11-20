import React, { useState } from 'react';
import { motion } from 'framer-motion';
import djAvatar from '../assets/dj_avatar.png';
import { useLanguage } from '../context/LanguageContext';

export default function Bio() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Carousel images from public/img folder
  const carouselImages = [
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/8.jpg",
    "/img/9.jpg"
  ];

  return (
    <section style={{ 
      padding: '1rem 1rem', 
      maxWidth: '1200px', 
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


        <h2 style={{ 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--accent-color)', 
          marginBottom: '1.5rem',
          fontSize: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          {t('bio.title')}
        </h2>

        {/* Unified Container: Image + Text (Top) / Gallery (Bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: 'rgba(0,0,0,0.6)', 
            padding: '1.5rem', 
            borderRadius: '16px',
            border: '1px solid #333',
            backdropFilter: 'blur(5px)',
            marginBottom: '2rem',
            textAlign: 'left'
          }}
        >
          {/* Top Row: Image (Left) + Text (Right) */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'stretch', 
            gap: '3rem', 
            marginBottom: '3rem'
          }}>
            {/* Image */}
            <div style={{
              flex: '0 0 350px',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <video 
                src="/dj_video.webm" 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: '#eee', 
                marginBottom: '1.5rem' 
              }}>
                {t('bio.p1')}
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: '#ccc',
                marginBottom: '1.5rem'
              }}>
                {t('bio.p2')}
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: '#ccc',
                fontWeight: 'bold'
              }}>
                {t('bio.p3')}
              </p>
            </div>
          </div>

          {/* Music Styles - Need for Speed Style */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-mono)', 
              color: '#888', 
              marginBottom: '1rem', 
              fontSize: '1rem', 
              letterSpacing: '2px',
              textAlign: 'center'
            }}>
              {t('GENEROS MUSICALES')}
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                { id: 'REGGAETON', val: 100 },
                { id: 'COMERCIAL', val: 90 },
                { id: 'OLD SCHOOL', val: 75 },
                { id: 'TECHNO', val: 80 },
                { id: 'URBAN', val: 80 },
                { id: 'POP', val: 80 }
              ].map((style, index) => (
                <div key={style.id} style={{ textAlign: 'left' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    fontWeight: 'bold'
                  }}>
                    <span>{t(`${style.id}`)}</span>
                    <span style={{ color: 'var(--accent-color)', textShadow: '0 0 5px rgba(63, 174, 112, 0.5)' }}>{style.val}%</span>
                  </div>
                  
                  {/* Bar Container */}
                  <div style={{ 
                    height: '12px', 
                    background: 'rgba(255,255,255,0.1)', 
                    transform: 'skewX(-20deg)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {/* Fill */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${style.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-color) 0%, #2d8a56 100%)',
                        boxShadow: '0 0 15px var(--accent-color)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Gallery */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-mono)', 
              color: '#888', 
              marginBottom: '1rem', 
              fontSize: '1rem', 
              letterSpacing: '2px',
              textAlign: 'center'
            }}>
              {t('bio.gallery')}
            </h3>
            
            <motion.div 
              style={{ 
                display: 'flex', 
                gap: '1rem',
                width: 'max-content'
              }}
              animate={{ x: [0, -1000] }} // Adjust based on content width, or better use percentage if possible, but px is safer for loop
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate images for infinite loop effect */}
              {[...carouselImages, ...carouselImages, ...carouselImages].map((img, index) => (
                <motion.div
                  key={index}
                  style={{ 
                    minWidth: '250px', 
                    height: '150px', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>

      </motion.div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            padding: '2rem'
          }}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Enlarged view"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 0 50px rgba(63, 174, 112, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid var(--accent-color)',
              color: 'var(--accent-color)',
              fontSize: '2rem',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--accent-color)';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.7)';
              e.target.style.color = 'var(--accent-color)';
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </section>
  );
}
