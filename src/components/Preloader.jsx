import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onLoadingComplete }) => {
  const { theme } = useTheme();
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  const darkVideo = 'https://res.cloudinary.com/dgd5sfnrq/video/upload/v1771391874/coh-loader-dark_nhdslp.mp4';
  const lightVideo = 'https://res.cloudinary.com/dgd5sfnrq/video/upload/v1771391872/coh-loader-light_pmzlpg.mp4';
  const videoSrc = theme === 'light' ? lightVideo : darkVideo;

  const handleFinish = () => {
    setIsFading(true);
    setTimeout(() => {
      onLoadingComplete?.();
    }, 400);
  };

  useEffect(() => {
    // Attempt auto play
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {});
    }

    // Auto complete safety timeout
    const timer = setTimeout(() => {
      handleFinish();
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${
            theme === 'light' ? 'bg-white' : 'bg-black'
          }`}
        >
          {/* Pure Clean Video Container */}
          <div className="relative w-full h-full max-w-2xl max-h-[85vh] flex items-center justify-center p-4">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              onEnded={handleFinish}
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </div>

          {/* Minimal Skip Button in top right */}
          <button
            onClick={handleFinish}
            className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground bg-card/60 backdrop-blur-md border border-border/50 transition-all cursor-pointer z-20"
          >
            Skip ➔
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
