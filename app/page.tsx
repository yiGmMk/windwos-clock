'use client'

import { useState, useEffect } from 'react';
import { BackgroundManager } from './components/BackgroundManager';
import { Clock } from './components/Clock';

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BackgroundManager>
      <Clock time={time} width={300} height={300} />
    </BackgroundManager>
  );
}

