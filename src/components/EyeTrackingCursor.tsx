
import React, { useEffect, useState } from 'react';

const EyeTrackingCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Eye-tracking effect for elements (simplified)
  useEffect(() => {
    const elements = document.querySelectorAll('[data-eye-track]');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = cursorPosition.x - centerX;
      const deltaY = cursorPosition.y - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 150) {
        const intensity = (150 - distance) / 150;
        const moveX = (deltaX / distance) * intensity * 5;
        const moveY = (deltaY / distance) * intensity * 5;
        
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.05})`;
      } else {
        (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
      }
    });
  }, [cursorPosition]);

  return (
    <>
      {/* Simple custom cursor - no trail or glow */}
      <div
        className="fixed pointer-events-none z-50 w-4 h-4 rounded-full border border-cyan-400 bg-cyan-400/10 transition-all duration-100"
        style={{
          left: cursorPosition.x - 8,
          top: cursorPosition.y - 8,
        }}
      />
    </>
  );
};

export default EyeTrackingCursor;
