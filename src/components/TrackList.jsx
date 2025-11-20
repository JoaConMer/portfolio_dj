import React from 'react';
import { motion } from 'framer-motion';

export default function TrackList({ tracks, onPlay, currentTrack }) {
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--accent-color)', 
          marginBottom: '2rem',
          fontSize: '2rem',
          textTransform: 'uppercase'
        }}
      >
        Latest Mixes
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {tracks.map((track, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            onClick={() => onPlay(index)}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid #333',
              padding: '1.5rem',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'border-color 0.3s ease',
              borderColor: currentTrack === track ? 'var(--accent-color)' : '#333'
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '200px', 
              background: '#222', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#555',
              fontFamily: 'var(--font-mono)'
            }}>
              [COVER ART]
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{track.title}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{track.artist}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
