import React, { useState, useRef, useCallback } from 'react';
import AudioPlayer from './AudioPlayer';

interface DraggableWindowProps {
  children: React.ReactNode;
  title: string;
  initialX: number;
  initialY: number;
  width: string;
  height: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  zIndex?: number;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  children,
  title,
  initialX,
  initialY,
  width,
  height,
  onClose,
  showCloseButton = false,
  zIndex = 40
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 will-change-transform ${isDragging ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width,
        height,
        zIndex: isDragging ? 100 : zIndex
      }}
    >
      <div 
        className="bg-gray-200 px-4 py-2 flex items-center justify-between border-b cursor-move hover:bg-gray-250 transition-colors select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex space-x-2">
          {showCloseButton && onClose && (
            <button 
              onClick={onClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            />
          )}
          {!showCloseButton && (
            <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors" />
          )}
          <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
          <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
        </div>
        <span className="text-sm text-gray-700 select-none font-medium">{title}</span>
        <div></div>
      </div>
      {children}
    </div>
  );
};

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="w-full h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {isInView && (
        <img 
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${className || ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

interface AboutMeWindowProps {
  onClose: () => void;
}

const AboutMeWindow: React.FC<AboutMeWindowProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-7xl max-h-6xl p-6">
        {/* Photo Window - Better positioned */}
        <DraggableWindow
          title="IMG_portrait.heic"
          initialX={100}
          initialY={80}
          width="300px"
          height="360px"
          onClose={onClose}
          showCloseButton={true}
          zIndex={45}
        >
          <LazyImage 
            src="/lovable-uploads/d01cbfd4-0036-4825-81e6-50c02419de8a.png"
            alt="Shourya at the beach"
            className="hover:scale-105 transition-transform duration-300"
          />
        </DraggableWindow>

        {/* About Me Text Window - Repositioned for better spacing */}
        <DraggableWindow
          title="aboutme.txt"
          initialX={450}
          initialY={120}
          width="400px"
          height="340px"
          zIndex={42}
        >
          <div className="p-4 h-full overflow-y-auto text-sm text-gray-800 leading-relaxed hover:bg-gray-50 transition-colors">
            <p className="mb-4">
              Hi! I'm Shourya, a passionate computer science student with a sharp eye for innovation and a dedication to pushing the boundaries of technology.
            </p>
            <p className="mb-4">
              I am an Honors Bachelor of Science student in Computer Science at the University of Utah, with a Minor in Robotics and Mathematics. Currently engaged in cutting-edge research with the Science Research Initiative (SRI) team and interning as an AI Intern at Nihilent, I bring a strong blend of academic excellence, technical depth and real-world experience.
            </p>
            <p>
              My educational path is supported by scholarships and innovation certificates, including recognition from the School of Mining & Mineral Resources, the Health Science Design program and Machine Learning from Stanford.
            </p>
          </div>
        </DraggableWindow>

        {/* Additional Photo Window - Better positioned */}
        <DraggableWindow
          title="IMG_lifestyle.heic"
          initialX={900}
          initialY={100}
          width="280px"
          height="320px"
          zIndex={43}
        >
          <LazyImage 
            src="/lovable-uploads/0e070f02-49d7-44df-85d5-4679302c51e2.png"
            alt="Shourya at Palace of Fine Arts"
            className="hover:scale-105 transition-transform duration-300"
          />
        </DraggableWindow>

        {/* Music Player - Repositioned to avoid congestion */}
        <DraggableWindow
          title="Music Player"
          initialX={650}
          initialY={480}
          width="320px"
          height="160px"
          zIndex={41}
        >
          <div className="p-4">
            <AudioPlayer
              audioSrc="/counting-stars.mp3"
              title="Counting Stars"
              artist="OneRepublic"
            />
          </div>
        </DraggableWindow>
      </div>
    </div>
  );
};

export default AboutMeWindow;
