import React from 'react';

export default function TikTokVideo({ url, videoId }) {
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
      <blockquote 
        className="tiktok-embed" 
        cite={url} 
        data-video-id={videoId} 
        style={{ maxWidth: '325px', minWidth: '325px' }} 
      >
        <section>
          <a target="_blank" title={`@omixdjoficial`} href={url}>
            {url}
          </a>
        </section>
      </blockquote>
    </div>
  );
}
