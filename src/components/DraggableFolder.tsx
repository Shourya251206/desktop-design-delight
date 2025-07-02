
import React, { useState, useRef } from 'react';
import { Folder } from 'lucide-react';

interface DraggableFolderProps {
  id: string;
  name: string;
  initialX: number;
  initialY: number;
}

const DraggableFolder: React.FC<DraggableFolderProps> = ({ 
  id, 
  name, 
  initialX, 
  initialY 
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const folderRef = useRef<HTMLDivElement>(null);

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
      ref={folderRef}
      className={`absolute flex flex-col items-center cursor-pointer select-none ${
        isDragging ? 'z-50' : 'z-10'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-2 rounded-lg hover:bg-blue-100 hover:bg-opacity-50 transition-colors">
        <Folder 
          size={64} 
          className="text-blue-500 drop-shadow-sm" 
          fill="currentColor" 
        />
      </div>
      <span className="text-sm text-gray-800 bg-white bg-opacity-80 px-2 py-1 rounded shadow-sm mt-1 text-center max-w-20 break-words">
        {name}
      </span>
    </div>
  );
};

export default DraggableFolder;
