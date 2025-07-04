
import React, { useEffect, useState } from 'react';

const EyeTrackingCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      const newTrailPoint = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrail(prev => {
        const newTrail = [newTrailPoint, ...prev];
        return newTrail.slice(0, 15); // Keep only last 15 points
      });
    };

    const handleMouseLeave = () => {
      setTrail([]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Eye-tracking effect for elements
  useEffect(() => {
    const elements = document.querySelectorAll('[data-eye-track]');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = cursorPosition.x - centerX;
      const deltaY = cursorPosition.y - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 200) {
        const intensity = (200 - distance) / 200;
        const moveX = (deltaX / distance) * intensity * 10;
        const moveY = (deltaY / distance) * intensity * 10;
        
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.1})`;
        (element as HTMLElement).style.filter = `brightness(${1 + intensity * 0.3})`;
      } else {
        (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
        (element as HTMLElement).style.filter = 'brightness(1)';
      }
    });
  }, [cursorPosition]);

  return (
    <>
      {/* Custom cursor */}
      <div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full border-2 border-cyan-400 bg-cyan-400/20 backdrop-blur-sm transition-all duration-75"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
        }}
      />
      
      {/* Cursor trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-40 w-2 h-2 rounded-full bg-purple-400/40 transition-all duration-300"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (trail.length - index) / trail.length * 0.6,
            transform: `scale(${(trail.length - index) / trail.length})`,
          }}
        />
      ))}
      
      {/* Glow effect around cursor */}
      <div
        className="fixed pointer-events-none z-30 w-32 h-32 rounded-full opacity-20 transition-all duration-200"
        style={{
          left: cursorPosition.x - 64,
          top: cursorPosition.y - 64,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
        }}
      />
    </>
  );
};

export default EyeTrackingCursor;
