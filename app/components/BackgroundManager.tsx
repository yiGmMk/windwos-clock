'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Position {
  x: number;
  y: number;
}

interface ClockPositions {
  [key: string]: Position;
}

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
  const [positions, setPositions] = useState<ClockPositions>({});
  const [isAdjusting, setIsAdjusting] = useState(false);

  // 加载位置配置
  useEffect(() => {
    fetch('/config/clock-positions.json')
      .then(res => res.json())
      .then(data => setPositions(data))
      .catch(err => console.error('Failed to load clock positions:', err));
  }, []);

  const nextBackground = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const savePositions = useCallback(async () => {
    try {
      const response = await fetch('/api/save-positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(positions)
      });
      if (response.ok) {
        alert('位置已保存！');
      }
    } catch (err) {
      console.error('Failed to save positions:', err);
      alert('保存失败！');
    }
  }, [positions]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isAdjusting) return;

    const currentPosition = positions[backgrounds[currentBg]] || { x: 50, y: 50 };
    const step = e.shiftKey ? 10 : 1;
    const newPosition = { ...currentPosition };

    switch (e.key) {
      case 'ArrowUp':
        newPosition.y = Math.max(0, currentPosition.y - step);
        break;
      case 'ArrowDown':
        newPosition.y = Math.min(100, currentPosition.y + step);
        break;
      case 'ArrowLeft':
        newPosition.x = Math.max(0, currentPosition.x - step);
        break;
      case 'ArrowRight':
        newPosition.x = Math.min(100, currentPosition.x + step);
        break;
      case 's':
        if (e.ctrlKey) {
          e.preventDefault();
          savePositions();
          // 打印所有位置
          console.table(positions);
        }
        break;
    }

    // 实时打印当前背景的位置
    console.log(`当前背景 ${backgrounds[currentBg]}: x=${newPosition.x}, y=${newPosition.y}`);

    setPositions(prev => ({
      ...prev,
      [backgrounds[currentBg]]: newPosition
    }));
  }, [isAdjusting, currentBg, positions, savePositions]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const currentPosition = positions[backgrounds[currentBg]] || { x: 50, y: 50 };

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
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => setIsAdjusting(!isAdjusting)}
          className={`px-4 py-2 rounded-md ${
            isAdjusting ? 'bg-red-500/50 hover:bg-red-500/70' : 'bg-white/50 hover:bg-white/70'
          }`}
        >
          {isAdjusting ? '完成调整' : '调整位置'}
        </button>
        <button
          onClick={nextBackground}
          className="bg-white/50 hover:bg-white/70 px-4 py-2 rounded-md"
        >
          切换背景
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          left: `${currentPosition.x}%`,
          top: `${currentPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {children}
      </div>
    </div>
  );
}; 