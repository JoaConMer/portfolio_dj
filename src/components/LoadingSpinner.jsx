import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      width: '100%'
    }}>
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(63, 174, 112, 0.2)',
          borderTop: '3px solid var(--accent-color)',
          borderRadius: '50%'
        }}
      />
    </div>
  );
}
