import React from 'react';
import { motion } from 'framer-motion';

export default function AudioPlayer({ isPlaying, togglePlay, currentTrack, volume, setVolume }) {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--accent-color)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={togglePlay}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--accent-color)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
            {currentTrack ? currentTrack.title : 'No Track Selected'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>
            {currentTrack ? currentTrack.artist : 'Unknown Artist'}
          </p>
        </div>
      </div>

      {/* Simulated Visualizer */}
      <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '30px' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: isPlaying ? [10, Math.random() * 30, 10] : 5,
              backgroundColor: isPlaying ? 'var(--accent-color)' : '#333'
            }}
            transition={{ 
              duration: 0.2, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: i * 0.05 
            }}
            style={{ width: '4px', borderRadius: '2px' }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.8rem' }}>VOL</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ accentColor: 'var(--accent-color)' }}
        />
      </div>
    </motion.div>
  );
}
