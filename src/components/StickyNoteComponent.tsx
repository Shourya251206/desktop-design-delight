import React, { useState, useRef } from 'react';

const StickyNoteComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 24, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const noteRef = useRef<HTMLDivElement>(null);

  const todoItems = [
    { text: 'Land my dream ML job', completed: false },
    { text: 'Build that banger Spotify playlist', completed: false },
    { text: 'Travel some place new every year', completed: false },
    { text: 'Learn tennis and get really good at it', completed: false }
  ];

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
      ref={noteRef}
      className={`absolute z-30 cursor-move ${isDragging ? 'z-50' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        className="bg-yellow-200 p-4 shadow-lg transform rotate-[-1.5deg] border-b-4 border-yellow-300"
        style={{
          width: '220px',
          fontFamily: 'Comic Sans MS, cursive, sans-serif'
        }}
      >
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
          <h3 className="text-sm font-bold text-gray-800">To Do:</h3>
        </div>
        <ul className="space-y-2">
          {todoItems.map((item, index) => (
            <li key={index} className="flex items-start text-xs text-gray-700">
              <span className="mr-2 text-gray-500">•</span>
              <span className={item.completed ? 'line-through text-gray-500' : ''}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StickyNoteComponent;
