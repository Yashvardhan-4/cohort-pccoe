import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const LIGHT_SPIDERMANS = [
  '/assets/light1-CvHQPJnb.svg',
  '/assets/light2-DZU-zL4x.svg',
  '/assets/light3-DmlwySnG.svg',
  '/assets/light4-CuApzg25.svg',
  '/assets/light5-9VBmO5dA.svg',
  '/assets/light6-DLVScAd6.svg',
];

const DARK_SPIDERMANS = [
  '/assets/dark1-BZ1HA7yb.svg',
  '/assets/dark2-BYC7ZlfK.png',
  '/assets/dark3-QsL2CcWP.svg',
  '/assets/dark4-DqvLaxtE.svg',
  '/assets/dark5-DxY4dtIz.png',
  '/assets/dark6-D8XR4DWk.png',
];

const POSITIONS = [
  { top: '16%', left: '45px', width: 'w-14 sm:w-16' }, // Shifted away from navbar to upper-left body
  { top: '38%', right: '0px', width: 'w-12 sm:w-14' }, // Spider-Man Mask peeking on right edge
  { top: '56%', left: '35px', width: 'w-16 sm:w-20' }, // Crawling Spiderman on left
  { top: '82%', left: '45px', width: 'w-20 sm:w-24' }, // SPIDER-MAN red graffiti text
  { bottom: '35px', right: '90px', width: 'w-14 sm:w-16' }, // Crouched Spiderman on bottom right
  { top: '68%', right: '35px', width: 'w-14 sm:w-16' }, // Shifted away from top-right navbar to middle-right
];

export const SpidermanOverlay = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const spidermanImages = useMemo(
    () => (theme === 'dark' ? DARK_SPIDERMANS : LIGHT_SPIDERMANS),
    [theme]
  );

  const spideyItems = useMemo(() => {
    return POSITIONS.map((pos, idx) => {
      const animationDelay = `${(idx * 0.7).toFixed(1)}s`;
      return {
        id: idx,
        src: spidermanImages[idx % spidermanImages.length],
        animationDelay,
        ...pos,
      };
    });
  }, [spidermanImages, location.pathname]);

  return (
    <div className="spiderman-overlay-container pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {spideyItems.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            animationDelay: item.animationDelay,
          }}
        >
          <img
            src={item.src}
            alt={`Spider-Man ${item.id + 1}`}
            className={`${item.width} h-auto object-contain filter drop-shadow-lg select-none pointer-events-none`}
            onError={(e) => {
              e.target.src = `/b${(item.id % 6) + 1}_moeeg9.png`;
            }}
          />
        </div>
      ))}
    </div>
  );
};
