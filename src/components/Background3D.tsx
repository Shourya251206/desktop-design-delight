
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

    // Single prominent 3D figure - a mathematical integral symbol
    const prominentFigure = {
      char: '∫',
      x: canvas.width * 0.15, // Position on left side
      y: canvas.height * 0.5, // Center vertically
      rotation: 0,
      scale: 1,
      opacity: 0.15,
      rotationSpeed: 0.005,
      pulseSpeed: 0.02,
      time: 0
    };

    // Smaller background symbols
    const backgroundSymbols = [
      { char: 'Σ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.008 },
      { char: '∂', x: 0, y: 0, z: 0, rotation: 0, speed: 0.010 },
      { char: 'π', x: 0, y: 0, z: 0, rotation: 0, speed: 0.007 },
      { char: '∞', x: 0, y: 0, z: 0, rotation: 0, speed: 0.009 },
      { char: '∇', x: 0, y: 0, z: 0, rotation: 0, speed: 0.011 },
      { char: 'λ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.008 },
      { char: 'Φ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.006 },
      { char: 'θ', x: 0, y: 0, z: 0, rotation: 0, speed: 0.009 },
      { char: 'α', x: 0, y: 0, z: 0, rotation: 0, speed: 0.010 },
      { char: 'β', x: 0, y: 0, z: 0, rotation: 0, speed: 0.007 },
      { char: '⚙', x: 0, y: 0, z: 0, rotation: 0, speed: 0.012 },
      { char: '⚡', x: 0, y: 0, z: 0, rotation: 0, speed: 0.014 },
    ];

    // Initialize positions for background symbols
    backgroundSymbols.forEach((symbol, i) => {
      symbol.x = (Math.random() - 0.5) * canvas.width;
      symbol.y = (Math.random() - 0.5) * canvas.height;
      symbol.z = Math.random() * 800 + 200;
    });

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw prominent figure
      prominentFigure.time += prominentFigure.pulseSpeed;
      prominentFigure.rotation += prominentFigure.rotationSpeed;
      prominentFigure.scale = 1 + Math.sin(prominentFigure.time) * 0.1; // Gentle pulsing

      ctx.save();
      ctx.translate(prominentFigure.x, prominentFigure.y);
      ctx.rotate(prominentFigure.rotation);
      ctx.scale(prominentFigure.scale, prominentFigure.scale);
      
      ctx.fillStyle = `rgba(0, 0, 0, ${prominentFigure.opacity})`;
      ctx.font = '200px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(prominentFigure.char, 0, 0);
      
      ctx.restore();

      // Update and draw background symbols
      backgroundSymbols.forEach((symbol) => {
        symbol.rotation += symbol.speed;
        symbol.z -= 0.2;

        if (symbol.z <= 0) {
          symbol.z = 800;
          symbol.x = (Math.random() - 0.5) * canvas.width;
          symbol.y = (Math.random() - 0.5) * canvas.height;
        }

        const scale = 150 / symbol.z;
        const x2d = symbol.x * scale + canvas.width / 2;
        const y2d = symbol.y * scale + canvas.height / 2;

        if (x2d > -50 && x2d < canvas.width + 50 && y2d > -50 && y2d < canvas.height + 50) {
          ctx.save();
          ctx.translate(x2d, y2d);
          ctx.rotate(symbol.rotation);
          
          const opacity = Math.max(0.03, Math.min(0.08, 1 - symbol.z / 800));
          
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.font = `${Math.max(12, scale * 30)}px serif`;
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
      style={{ opacity: 0.8 }}
    />
  );
};

export default Background3D;
