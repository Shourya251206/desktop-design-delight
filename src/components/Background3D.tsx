
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
      if (distance < 100) {
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

    // Draw cute robot
    const drawRobot = () => {
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.scale(robot.scale, robot.scale);
      
      // Add subtle rotation and bobbing
      ctx.rotate(robot.rotation * 0.1);
      ctx.translate(0, Math.sin(robot.bobOffset) * 5);

      // Robot shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.ellipse(0, 80, 60, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Robot body (main torso)
      const gradient = ctx.createLinearGradient(-40, -60, 40, 60);
      gradient.addColorStop(0, '#f0f8ff');
      gradient.addColorStop(0.5, '#e6f3ff');
      gradient.addColorStop(1, '#d1e9ff');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-40, -20, 80, 80, 15);
      ctx.fill();
      ctx.stroke();

      // Robot head
      const headGradient = ctx.createRadialGradient(0, -50, 10, 0, -50, 35);
      headGradient.addColorStop(0, '#ffffff');
      headGradient.addColorStop(1, '#e6f3ff');
      
      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.roundRect(-35, -85, 70, 50, 20);
      ctx.fill();
      ctx.stroke();

      // Robot eyes with glow effect
      const eyeGlow = isClicked ? 1 : robot.eyeGlow;
      
      // Left eye
      ctx.fillStyle = `rgba(0, 150, 255, ${0.3 + eyeGlow * 0.7})`;
      ctx.beginPath();
      ctx.arc(-15, -65, 8 + eyeGlow * 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#0096ff';
      ctx.beginPath();
      ctx.arc(-15, -65, 6, 0, Math.PI * 2);
      ctx.fill();

      // Right eye
      ctx.fillStyle = `rgba(0, 150, 255, ${0.3 + eyeGlow * 0.7})`;
      ctx.beginPath();
      ctx.arc(15, -65, 8 + eyeGlow * 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#0096ff';
      ctx.beginPath();
      ctx.arc(15, -65, 6, 0, Math.PI * 2);
      ctx.fill();

      // Robot antenna
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -85);
      ctx.lineTo(0, -100);
      ctx.stroke();

      // Antenna light
      ctx.fillStyle = isClicked ? '#ff4444' : '#44ff44';
      ctx.beginPath();
      ctx.arc(0, -105, 4, 0, Math.PI * 2);
      ctx.fill();

      // Robot arms
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      
      // Left arm
      ctx.beginPath();
      ctx.moveTo(-40, -10);
      ctx.lineTo(-65, -5);
      ctx.lineTo(-70, 10);
      ctx.stroke();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(40, -10);
      ctx.lineTo(65, -5);
      ctx.lineTo(70, 10);
      ctx.stroke();

      // Robot legs
      ctx.beginPath();
      ctx.moveTo(-20, 60);
      ctx.lineTo(-20, 85);
      ctx.moveTo(20, 60);
      ctx.lineTo(20, 85);
      ctx.stroke();

      // Robot feet
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(-25, 90, 15, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(25, 90, 15, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Chest panel
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.roundRect(-25, -5, 50, 30, 5);
      ctx.fill();

      // Chest buttons
      const colors = ['#ff4444', '#44ff44', '#4444ff'];
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(-15 + i * 15, 10, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update robot animation
      robot.time += 0.02;
      robot.bobOffset += 0.03;
      robot.rotation = Math.sin(robot.time) * 0.1;
      robot.eyeGlow = (Math.sin(robot.time * 2) + 1) * 0.5;
      
      // Scale effect when clicked
      if (isClicked) {
        robot.scale = 1 + Math.sin(robot.time * 8) * 0.1;
      } else {
        robot.scale = 1 + Math.sin(robot.time) * 0.05;
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
