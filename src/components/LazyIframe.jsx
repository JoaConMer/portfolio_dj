import React, { useState, useEffect, useRef } from 'react';

export default function LazyIframe({ src, title, style, allow, allowFullScreen, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true);
          }
        });
      },
      {
        rootMargin: '200px' // Start loading 200px before the iframe is visible
      }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, [isLoaded]);

  return (
    <div ref={iframeRef} style={{ position: 'relative', ...style }}>
      {isLoaded ? (
        <iframe
          src={src}
          title={title}
          allow={allow}
          allowFullScreen={allowFullScreen}
          style={style}
          {...props}
        />
      ) : (
        <div style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.3)',
          color: '#888',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}
