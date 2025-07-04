
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

  return (
    <>
      {/* Simple custom cursor - no eye tracking effects */}
      <div
        className="fixed pointer-events-none z-50 w-4 h-4 rounded-full border border-cyan-400 bg-cyan-400/20 transition-all duration-100"
        style={{
          left: cursorPosition.x - 8,
          top: cursorPosition.y - 8,
        }}
      />
    </>
  );
};

export default EyeTrackingCursor;
