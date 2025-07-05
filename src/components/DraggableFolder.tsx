
import React, { useState, useRef } from 'react';
import { Folder, File, Trash2 } from 'lucide-react';

interface DraggableFolderProps {
  id: string;
  name: string;
  subtitle?: string;
  type: 'folder' | 'file' | 'trash';
  initialX: number;
  initialY: number;
  onClick?: (id: string) => void;
}

const DraggableFolder: React.FC<DraggableFolderProps> = ({ 
  id, 
  name, 
  subtitle,
  type,
  initialX, 
  initialY,
  onClick
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const folderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setHasMoved(true);
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // If the mouse didn't move much, treat it as a click
    if (!hasMoved && onClick) {
      onClick(id);
    }
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
  }, [isDragging, dragStart, hasMoved]);

  const getIcon = () => {
    switch (type) {
      case 'file':
        return <File size={48} className="text-black drop-shadow-sm" fill="currentColor" />;
      case 'trash':
        return <Trash2 size={48} className="text-black drop-shadow-sm" />;
      default:
        return <Folder size={48} className="text-black drop-shadow-sm" fill="currentColor" />;
    }
  };

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
      <div className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-50 transition-colors">
        {getIcon()}
      </div>
      <div className="text-center">
        <span className="text-xs text-black bg-white bg-opacity-80 px-2 py-1 rounded shadow-sm block max-w-24 break-words border border-gray-200">
          {name}
        </span>
        {subtitle && (
          <span className="text-xs text-gray-700 bg-white bg-opacity-70 px-1 rounded shadow-sm block max-w-24 break-words mt-1 border border-gray-200">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default DraggableFolder;
