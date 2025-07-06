
import React, { useEffect, useRef, useState } from 'react';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClicked, setIsClicked] = useState(false);

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

    // Robot properties
    const robot = {
      x: canvas.width * 0.15,
      y: canvas.height * 0.5,
      scale: 1,
      rotation: 0,
      bobOffset: 0,
      glowIntensity: 0.3,
      eyeGlow: 0,
      time: 0
    };

    // Mouse click detection
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if click is near robot
      const distance = Math.sqrt((x - robot.x) ** 2 + (y - robot.y) ** 2);
      if (distance < 120) {
        setIsClicked(true);
        
        // Text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance("Hey! I am Shourya's assistant");
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          speechSynthesis.speak(utterance);
        }
        
        // Reset after animation
        setTimeout(() => setIsClicked(false), 2000);
      }
    };

    canvas.addEventListener('click', handleClick);

    // Draw robot based on uploaded image design
    const drawRobot = () => {
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.scale(robot.scale, robot.scale);
      
      // Add subtle rotation and bobbing
      ctx.rotate(robot.rotation * 0.05);
      ctx.translate(0, Math.sin(robot.bobOffset) * 3);

      // Robot shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 90, 70, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Main robot body (rounded rectangle, white/light gray)
      const bodyGradient = ctx.createLinearGradient(-50, -40, 50, 70);
      bodyGradient.addColorStop(0, '#ffffff');
      bodyGradient.addColorStop(0.3, '#f8f9fa');
      bodyGradient.addColorStop(1, '#e9ecef');
      
      ctx.fillStyle = bodyGradient;
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-50, -30, 100, 100, 25);
      ctx.fill();
      ctx.stroke();

      // Robot head (smaller rounded rectangle on top)
      const headGradient = ctx.createRadialGradient(0, -60, 5, 0, -60, 40);
      headGradient.addColorStop(0, '#ffffff');
      headGradient.addColorStop(1, '#f1f3f4');
      
      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.roundRect(-40, -100, 80, 60, 20);
      ctx.fill();
      ctx.stroke();

      // Large circular eyes (main feature from the image)
      const eyeGlow = isClicked ? 1 : robot.eyeGlow;
      
      // Left eye - large circular design
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-20, -75, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Left eye inner circle (blue/cyan)
      ctx.fillStyle = `rgba(0, 150, 255, ${0.8 + eyeGlow * 0.2})`;
      ctx.beginPath();
      ctx.arc(-20, -75, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Left eye pupil
      ctx.fillStyle = isClicked ? '#ff4444' : '#0066cc';
      ctx.beginPath();
      ctx.arc(-20, -75, 6, 0, Math.PI * 2);
      ctx.fill();

      // Right eye - large circular design
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(20, -75, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right eye inner circle (blue/cyan)
      ctx.fillStyle = `rgba(0, 150, 255, ${0.8 + eyeGlow * 0.2})`;
      ctx.beginPath();
      ctx.arc(20, -75, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Right eye pupil
      ctx.fillStyle = isClicked ? '#ff4444' : '#0066cc';
      ctx.beginPath();
      ctx.arc(20, -75, 6, 0, Math.PI * 2);
      ctx.fill();

      // Robot mouth/speaker grille (horizontal lines)
      ctx.strokeStyle = '#666666';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(-15, -55 + i * 4);
        ctx.lineTo(15, -55 + i * 4);
        ctx.stroke();
      }

      // Side panels/ears (small rectangles on sides of head)
      ctx.fillStyle = '#e9ecef';
      ctx.beginPath();
      ctx.roundRect(-50, -85, 8, 25, 4);
      ctx.fill();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.roundRect(42, -85, 8, 25, 4);
      ctx.fill();
      ctx.stroke();

      // Body panel details (chest area)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.roundRect(-35, -10, 70, 40, 8);
      ctx.fill();

      // Control buttons on chest (3 circular buttons)
      const buttonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = buttonColors[i];
        ctx.beginPath();
        ctx.arc(-20 + i * 20, 10, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Button highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(-20 + i * 20 - 2, 10 - 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Arms (simple cylindrical design)
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      
      // Left arm
      ctx.beginPath();
      ctx.moveTo(-50, -15);
      ctx.lineTo(-75, -10);
      ctx.lineTo(-80, 15);
      ctx.stroke();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(50, -15);
      ctx.lineTo(75, -10);
      ctx.lineTo(80, 15);
      ctx.stroke();

      // Arm joints (small circles)
      ctx.fillStyle = '#666666';
      ctx.beginPath();
      ctx.arc(-75, -10, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(75, -10, 5, 0, Math.PI * 2);
      ctx.fill();

      // Legs (from body bottom)
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(-25, 70);
      ctx.lineTo(-25, 100);
      ctx.moveTo(25, 70);
      ctx.lineTo(25, 100);
      ctx.stroke();

      // Feet (oval shapes)
      ctx.fillStyle = '#333333';
      ctx.beginPath();
      ctx.ellipse(-30, 105, 20, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(30, 105, 20, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Top antenna/sensor
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -100);
      ctx.lineTo(0, -120);
      ctx.stroke();

      // Antenna tip (glowing dot)
      ctx.fillStyle = isClicked ? '#ff4444' : '#44ff44';
      ctx.beginPath();
      ctx.arc(0, -125, 5, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect around antenna when active
      if (isClicked) {
        ctx.fillStyle = 'rgba(255, 68, 68, 0.3)';
        ctx.beginPath();
        ctx.arc(0, -125, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update robot animation
      robot.time += 0.015;
      robot.bobOffset += 0.025;
      robot.rotation = Math.sin(robot.time) * 0.08;
      robot.eyeGlow = (Math.sin(robot.time * 3) + 1) * 0.5;
      
      // Scale effect when clicked
      if (isClicked) {
        robot.scale = 1 + Math.sin(robot.time * 10) * 0.08;
      } else {
        robot.scale = 1 + Math.sin(robot.time * 0.8) * 0.03;
      }

      drawRobot();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [isClicked]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-10 cursor-pointer"
      style={{ opacity: 0.9 }}
    />
  );
};

export default Background3D;
