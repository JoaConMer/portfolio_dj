import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const FlagES = () => (
  <svg width="24" height="18" viewBox="0 0 640 480">
    <path fill="#aa151b" d="M0 0h640v480H0z"/>
    <path fill="#f1bf00" d="M0 120h640v240H0z"/>
  </svg>
);

const FlagGB = () => (
  <svg width="24" height="18" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="M424 294L640 454v-52L494 294h-70zm-28-48l244-184V0H572L396 132v114zm-104 0L48 0H0v10l176 132h116zM0 480h50l176-132v-54L0 480z"/>
    <path fill="#FFF" d="M280 0h80v480h-80z"/>
    <path fill="#FFF" d="M0 200h640v80H0z"/>
    <path fill="#C8102E" d="M300 0h40v480h-40z"/>
    <path fill="#C8102E" d="M0 220h640v40H0z"/>
  </svg>
);

const FlagCA = () => (
  <svg width="24" height="18" viewBox="0 0 640 480">
    <path fill="#f1bf00" d="M0 0h640v480H0z"/>
    <path fill="#aa151b" d="M0 53.3h640v53.3H0zm0 106.7h640v53.3H0zm0 106.7h640v53.3H0zm0 106.7h640v53.3H0z"/>
  </svg>
);

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'es', icon: <FlagES />, label: 'Español' },
    { code: 'en', icon: <FlagGB />, label: 'English' },
    { code: 'ca', icon: <FlagCA />, label: 'Català' }
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLanguage(lang.code)}
          title={lang.label}
          style={{
            background: 'transparent',
            border: language === lang.code ? '2px solid var(--accent-color)' : '2px solid transparent',
            padding: '2px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: language === lang.code ? 1 : 0.7,
            transition: 'all 0.3s ease'
          }}
        >
          {lang.icon}
        </motion.button>
      ))}
    </div>
  );
}
