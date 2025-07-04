
import React, { useEffect, useRef } from 'react';

const HolographicElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const elements = containerRef.current.querySelectorAll('.holographic-element');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      elements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const intensity = (index + 1) * 0.5;
        const rotateX = (mouseY - 0.5) * intensity * 20;
        const rotateY = (mouseX - 0.5) * intensity * 20;
        const translateZ = Math.sin(Date.now() * 0.001 + index) * 10;
        
        htmlElement.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(${translateZ}px)
          scale(${1 + Math.sin(Date.now() * 0.002 + index) * 0.1})
        `;
        
        // Holographic color shift
        const hue = (Date.now() * 0.1 + index * 30) % 360;
        htmlElement.style.filter = `hue-rotate(${hue}deg) saturate(1.5) brightness(1.2)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="holographic-element absolute w-20 h-20 rounded-full opacity-30 mix-blend-screen"
          style={{
            background: `linear-gradient(45deg, #ff00ff, #00ffff, #ffff00)`,
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animation: `float ${3 + i}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`geo-${i}`}
          className="holographic-element absolute opacity-20"
          style={{
            right: `${10 + i * 20}%`,
            top: `${20 + i * 25}%`,
            transform: `rotate(${i * 45}deg)`,
          }}
        >
          <div className="w-16 h-16 border-2 border-cyan-400 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm" />
        </div>
      ))}
    </div>
  );
};

export default HolographicElements;
