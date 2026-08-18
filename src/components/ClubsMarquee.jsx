import React from 'react';
import { Link } from 'react-router-dom';

const CLUBS = [
  { name: 'ISR', logo: '/isr_t30d9a.png', username: 'isr' },
  { name: 'NSS', logo: '/nss_r18fhh.png', username: 'nss' },
  { name: 'Art Circle', logo: '/art-circle_zchjwh.png', username: 'artcircle' },
  { name: 'OWASP', logo: '/owasp_rulccu.png', username: 'owasp' },
  { name: 'GDGC', logo: '/gdgc_euo0ky.png', username: 'gdgc' },
  { name: 'ACM', logo: '/acm_dhgbaa.png', username: 'acm' },
  { name: 'LFDT', logo: '/lfdt_t6ejia.png', username: 'lfdt' },
  { name: 'IOT Club', logo: '/iot_qf6c9i.png', username: 'iot' },
  { name: 'AIMSA', logo: '/aimsa_s6tcz4.png', username: 'aimsa' },
  { name: 'GeeksforGeeks', logo: '/gfg_t7bvy4.png', username: 'gfg' },
];

export const ClubsMarquee = () => {
  return (
    <div className="w-full overflow-hidden relative py-4 select-none flex">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex animate-marquee shrink-0 items-center gap-10">
        {[...CLUBS, ...CLUBS].map((club, idx) => (
          <Link
            key={`track1-${club.username}-${idx}`}
            to={`/dashboard/communities/${club.username}`}
            className="flex items-center gap-3 group shrink-0 opacity-85 hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform">
              <img
                src={club.logo}
                alt={club.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/cohort-logo.png';
                }}
              />
            </div>
            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white font-secondary whitespace-nowrap">
              {club.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex animate-marquee shrink-0 items-center gap-10" aria-hidden="true">
        {[...CLUBS, ...CLUBS].map((club, idx) => (
          <Link
            key={`track2-${club.username}-${idx}`}
            to={`/dashboard/communities/${club.username}`}
            className="flex items-center gap-3 group shrink-0 opacity-85 hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform">
              <img
                src={club.logo}
                alt={club.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/cohort-logo.png';
                }}
              />
            </div>
            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white font-secondary whitespace-nowrap">
              {club.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
