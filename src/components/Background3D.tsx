
import React, { useEffect, useRef, useState } from 'react';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [robotImage, setRobotImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    // Load the robot image
    const img = new Image();
    img.onload = () => {
      setRobotImage(img);
    };
    img.src = '/lovable-uploads/39a25931-6768-4e67-a1c0-5b6ab1e1c06a.png';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !robotImage) return;

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
      x: canvas.width * 0.15, // Left side positioning
      y: canvas.height * 0.25, // Top area positioning
      scale: 0.8,
      rotation: 0,
      bobOffset: 0,
      time: 0,
      baseY: canvas.height * 0.25
    };

    // Mouse click detection
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if click is near robot (accounting for image size)
      const robotWidth = 200 * robot.scale;
      const robotHeight = 300 * robot.scale;
      
      if (x >= robot.x - robotWidth/2 && x <= robot.x + robotWidth/2 &&
          y >= robot.y - robotHeight/2 && y <= robot.y + robotHeight/2) {
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

    // Draw robot using the uploaded image
    const drawRobot = () => {
      ctx.save();
      
      // Apply transformations for movement
      ctx.translate(robot.x, robot.y + Math.sin(robot.bobOffset) * 8);
      ctx.scale(robot.scale, robot.scale);
      ctx.rotate(Math.sin(robot.time * 0.5) * 0.02); // Subtle swaying
      
      // Add glow effect when clicked
      if (isClicked) {
        ctx.shadowColor = '#00bfff';
        ctx.shadowBlur = 30;
        ctx.filter = 'brightness(1.2)';
      }
      
      // Draw the robot image
      const imgWidth = 200;
      const imgHeight = 300;
      
      ctx.drawImage(
        robotImage,
        -imgWidth / 2,
        -imgHeight / 2,
        imgWidth,
        imgHeight
      );
      
      // Add subtle floating animation effect
      if (isClicked) {
        // Add extra glow rings
        ctx.beginPath();
        ctx.arc(0, 0, 120 + Math.sin(robot.time * 8) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 191, 255, 0.3)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, 140 + Math.sin(robot.time * 6) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 191, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      ctx.restore();
    };

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update robot animation
      robot.time += 0.02;
      robot.bobOffset += 0.03;
      
      // Scale effect when clicked with more dramatic movement
      if (isClicked) {
        robot.scale = 0.8 + Math.sin(robot.time * 12) * 0.1;
        robot.y = robot.baseY + Math.sin(robot.time * 8) * 15;
      } else {
        robot.scale = 0.8 + Math.sin(robot.time * 0.8) * 0.02;
        robot.y = robot.baseY;
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
  }, [isClicked, robotImage]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-10 cursor-pointer"
      style={{ opacity: 0.9 }}
    />
  );
};

export default Background3D;
