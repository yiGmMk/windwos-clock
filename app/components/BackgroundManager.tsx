'use client'

import { useState } from 'react';
import Image from 'next/image';

const backgrounds = [
  '/backgrounds/bg1-16-9.jpg',
  '/backgrounds/bg2-16-9.jpg',
  '/backgrounds/bg3-16-9.jpg',
  '/backgrounds/bg4-16-9.jpg',
];

interface BackgroundManagerProps {
  children: React.ReactNode;
}

export const BackgroundManager: React.FC<BackgroundManagerProps> = ({ children }) => {
  const [currentBg, setCurrentBg] = useState(0);

  const nextBackground = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <Image
        src={backgrounds[currentBg]}
        alt="背景"
        fill
        priority
        quality={100}
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '100%',
        }}
      />
      <button
        onClick={nextBackground}
        className="absolute top-4 right-4 bg-white/50 hover:bg-white/70 px-4 py-2 rounded-md z-10"
      >
        切换背景
      </button>
      {children}
    </div>
  );
}; 