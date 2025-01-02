'use client'

import { useEffect, useRef, useCallback } from 'react';

interface ClockProps {
  time: Date;
  width?: number;
  height?: number;
}

export const Clock: React.FC<ClockProps> = ({ 
  time, 
  width = 300, 
  height = 300 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawClock = useCallback((ctx: CanvasRenderingContext2D) => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // 绘制时针
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    const hourAngle = (hours + minutes / 60) * (Math.PI * 2 / 12) - Math.PI / 2;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(hourAngle) * (width * 0.2),
      centerY + Math.sin(hourAngle) * (width * 0.2)
    );
    ctx.stroke();

    // 绘制分针
    ctx.beginPath();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 4;
    const minuteAngle = minutes * (Math.PI * 2 / 60) - Math.PI / 2;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(minuteAngle) * (width * 0.3),
      centerY + Math.sin(minuteAngle) * (width * 0.3)
    );
    ctx.stroke();

    // 绘制秒针
    ctx.beginPath();
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    const secondAngle = seconds * (Math.PI * 2 / 60) - Math.PI / 2;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(secondAngle) * (width * 0.35),
      centerY + Math.sin(secondAngle) * (width * 0.35)
    );
    ctx.stroke();

    // 绘制中心点
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [time, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const animate = () => {
      drawClock(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [time, width, height, drawClock]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Clock;

