
import React, { useState, useRef } from 'react';

interface DraggableWindowProps {
  children: React.ReactNode;
  title: string;
  initialX: number;
  initialY: number;
  width: string;
  height: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  children,
  title,
  initialX,
  initialY,
  width,
  height,
  onClose,
  showCloseButton = false
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-3xl ${isDragging ? 'z-50 scale-105' : 'z-40'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width,
        height
      }}
    >
      <div 
        className="bg-gray-200 px-4 py-2 flex items-center justify-between border-b cursor-move hover:bg-gray-300 transition-colors"
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
        <span className="text-sm text-gray-700 select-none">{title}</span>
        <div></div>
      </div>
      {children}
    </div>
  );
};

interface AboutMeWindowProps {
  onClose: () => void;
}

const AboutMeWindow: React.FC<AboutMeWindowProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-7xl max-h-6xl p-4">
        {/* Photo Window */}
        <DraggableWindow
          title="IMG_portrait.heic"
          initialX={64}
          initialY={64}
          width="320px"
          height="384px"
          onClose={onClose}
          showCloseButton={true}
        >
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <img 
              src="/lovable-uploads/d01cbfd4-0036-4825-81e6-50c02419de8a.png"
              alt="Shourya at the beach"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </DraggableWindow>

        {/* About Me Text Window */}
        <DraggableWindow
          title="aboutme.txt"
          initialX={384}
          initialY={128}
          width="384px"
          height="320px"
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

        {/* Additional Photo Window */}
        <DraggableWindow
          title="IMG_lifestyle.heic"
          initialX={800}
          initialY={80}
          width="288px"
          height="320px"
        >
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <img 
              src="/lovable-uploads/0e070f02-49d7-44df-85d5-4679302c51e2.png"
              alt="Shourya at Palace of Fine Arts"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </DraggableWindow>

        {/* Spotify Player */}
        <DraggableWindow
          title="Spotify"
          initialX={600}
          initialY={450}
          width="320px"
          height="128px"
        >
          <div className="p-4 flex items-center space-x-4 bg-gradient-to-r from-green-800 to-green-600">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Blinding Lights</h3>
              <p className="text-green-200 text-xs">The Weeknd</p>
              <div className="flex items-center space-x-2 mt-2">
                <button 
                  onClick={() => window.open('https://open.spotify.com/track/0VjIjW4GlULA3wGRX8G7YU', '_blank')}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-1"></div>
                </button>
                <div className="flex-1 bg-gray-600 h-1 rounded-full">
                  <div className="bg-white h-1 rounded-full w-1/3 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </DraggableWindow>
      </div>
    </div>
  );
};

export default AboutMeWindow;
