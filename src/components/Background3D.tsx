
import React, { useEffect, useRef } from 'react';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Math, ML, and Robotics symbols
    const symbols = [
      // Math symbols
      { char: 'Σ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.01 },
      { char: '∫', x: 0, y: 0, z: 0, rotation: 0, speed: 0.008 },
      { char: '∂', x: 0, y: 0, z: 0, rotation: 0, speed: 0.012 },
      { char: 'π', x: 0, y: 0, z: 0, rotation: 0, speed: 0.009 },
      { char: '∞', x: 0, y: 0, z: 0, rotation: 0, speed: 0.007 },
      { char: '∇', x: 0, y: 0, z: 0, rotation: 0, speed: 0.011 },
      { char: 'λ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.010 },
      { char: 'Φ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.006 },
      { char: '∈', x: 0, y: 0, z: 0, rotation: 0, speed: 0.013 },
      { char: '∀', x: 0, y: 0, z: 0, rotation: 0, speed: 0.008 },
      // ML symbols
      { char: 'θ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.009 },
      { char: 'α', x: 0, y: 0, z: 0, rotation: 0, speed: 0.011 },
      { char: 'β', x: 0, y: 0, z: 0, rotation: 0, speed: 0.007 },
      { char: 'γ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.012 },
      { char: 'ε', x: 0, y: 0, z: 0, rotation: 0, speed: 0.008 },
      // Robotics symbols
      { char: '⚙', x: 0, y: 0, z: 0, rotation: 0, speed: 0.015 },
      { char: '🤖', x: 0, y: 0, z: 0, rotation: 0, speed: 0.005 },
      { char: '⚡', x: 0, y: 0, z: 0, rotation: 0, speed: 0.014 },
    ];

    // Initialize positions
    symbols.forEach((symbol, i) => {
      symbol.x = (Math.random() - 0.5) * canvas.width;
      symbol.y = (Math.random() - 0.5) * canvas.height;
      symbol.z = Math.random() * 1000 + 100;
    });

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      symbols.forEach((symbol) => {
        // Update rotation and position
        symbol.rotation += symbol.speed;
        symbol.z -= 0.3; // Slower movement

        // Reset if too close
        if (symbol.z <= 0) {
          symbol.z = 1000;
          symbol.x = (Math.random() - 0.5) * canvas.width;
          symbol.y = (Math.random() - 0.5) * canvas.height;
        }

        // 3D projection
        const scale = 200 / symbol.z;
        const x2d = symbol.x * scale + canvas.width / 2;
        const y2d = symbol.y * scale + canvas.height / 2;

        // Only draw if within canvas bounds
        if (x2d > -50 && x2d < canvas.width + 50 && y2d > -50 && y2d < canvas.height + 50) {
          ctx.save();
          ctx.translate(x2d, y2d);
          ctx.rotate(symbol.rotation);
          
          // Calculate opacity based on distance - more subtle
          const opacity = Math.max(0.05, Math.min(0.15, 1 - symbol.z / 1000));
          
          // Black color for white background
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.font = `${Math.max(8, scale * 25)}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(symbol.char, 0, 0);
          
          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default Background3D;
