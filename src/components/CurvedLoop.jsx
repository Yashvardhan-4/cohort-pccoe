import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CurvedLoop = () => {
  const textPathRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    let offset = 0;
    let animFrame;

    const animate = () => {
      offset -= 0.07; // smooth continuous 360-degree rotation
      if (offset <= -50) {
        offset = 0;
      }
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offset}%`);
      }
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="relative w-full py-12 overflow-hidden flex items-center justify-center select-none pointer-events-none">
      <div className="w-full max-w-[1360px] h-48 sm:h-56 flex items-center justify-center relative">
        <svg
          viewBox="0 0 1400 280"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Convex curve: Sides high (y=40), center low/bottom (y=230) */}
            <path
              id="curvePathConvex"
              d="M 10,40 Q 700,230 1390,40"
              fill="transparent"
            />
            <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor={isLight ? '#71717A' : '#71717A'}
                stopOpacity={isLight ? '0.3' : '0.25'}
              />
              <stop
                offset="25%"
                stopColor={isLight ? '#3F3F46' : '#A1A1AA'}
                stopOpacity={isLight ? '0.85' : '0.75'}
              />
              <stop
                offset="50%"
                stopColor={isLight ? '#18181B' : '#E4E4E7'}
                stopOpacity={isLight ? '0.98' : '0.95'}
              />
              <stop
                offset="75%"
                stopColor={isLight ? '#3F3F46' : '#A1A1AA'}
                stopOpacity={isLight ? '0.85' : '0.75'}
              />
              <stop
                offset="100%"
                stopColor={isLight ? '#71717A' : '#71717A'}
                stopOpacity={isLight ? '0.3' : '0.25'}
              />
            </linearGradient>
          </defs>

          <text className="font-black tracking-[0.28em] text-[52px] sm:text-[64px] md:text-[72px] fill-[url(#textGrad)] uppercase font-secondary">
            <textPath
              ref={textPathRef}
              href="#curvePathConvex"
              startOffset="0%"
            >
              ✦ DISCOVER ✦ NAVIGATE ✦ COHORT ✦ CONNECT ✦ DISCOVER ✦ NAVIGATE ✦ COHORT ✦ CONNECT ✦
            </textPath>
          </text>
        </svg>

        {/* Ambient depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
      </div>
    </div>
  );
};
