import React, { useState, useRef } from 'react';
import { Folder, FileText, Trash2 } from 'lucide-react';

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
        return <FileText size={40} className="text-gray-500" />;
      case 'trash':
        return <Trash2 size={40} className="text-gray-400" />;
      default:
        return <Folder size={40} className="text-blue-500" fill="#3B82F6" />;
    }
  };

  return (
    <div
      ref={folderRef}
      className={`absolute flex flex-col items-center cursor-pointer select-none ${isDragging ? 'z-50' : 'z-10'}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-2 rounded-lg hover:bg-black/5 transition-colors">
        {getIcon()}
      </div>
      <span className="text-xs text-gray-700 font-medium text-center max-w-20 mt-1">
        {name}
      </span>
    </div>
  );
};

export default DraggableFolder;
