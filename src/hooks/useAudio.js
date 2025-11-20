import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

export default function useAudio(tracks = []) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef(null);

  useEffect(() => {
    if (tracks.length === 0) return;

    soundRef.current = new Howl({
      src: [tracks[currentTrackIndex].src],
      html5: true,
      volume: volume,
      onend: () => {
        playNext();
      }
    });

    if (isPlaying) {
      soundRef.current.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return {
    isPlaying,
    currentTrack: tracks[currentTrackIndex],
    togglePlay,
    playNext,
    playPrev,
    volume,
    setVolume
  };
}
