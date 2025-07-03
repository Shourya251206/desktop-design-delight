
import React, { useState, useRef, useCallback } from 'react';

const StickyNoteComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 24, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const noteRef = useRef<HTMLDivElement>(null);

  const todoItems = [
    { text: 'Land my dream ML job', completed: false },
    { text: 'Move to the US', completed: true, strikethrough: true },
    { text: 'Build that banger Spotify playlist', completed: false },
    { text: 'Travel some place new every year', completed: false },
    { text: 'Learn tennis and get really good at it', completed: true, strikethrough: true }
  ];

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
      ref={noteRef}
      className={`absolute z-30 cursor-move transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-2xl will-change-transform ${isDragging ? 'z-50 scale-105 shadow-2xl' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        className="bg-yellow-200 p-4 shadow-lg transform rotate-[-1.5deg] border-b-4 border-yellow-300 hover:bg-yellow-100 transition-all duration-300 select-none"
        style={{
          width: '220px',
          fontFamily: 'Comic Sans MS, cursive, sans-serif'
        }}
      >
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
          <h3 className="text-sm font-bold text-gray-800">To Do:</h3>
        </div>
        <ul className="space-y-2">
          {todoItems.map((item, index) => (
            <li key={index} className="flex items-start text-xs text-gray-700 hover:bg-yellow-50 hover:bg-opacity-50 rounded px-1 py-0.5 transition-all duration-200 cursor-pointer hover:scale-105 group">
              <span className="mr-2 text-gray-500 group-hover:text-gray-700 transition-colors">•</span>
              <span className={`transition-all duration-200 ${
                item.strikethrough 
                  ? 'line-through text-gray-500 decoration-red-500 decoration-2' 
                  : item.completed 
                    ? 'line-through text-gray-500' 
                    : 'hover:text-gray-900 hover:font-medium group-hover:translate-x-1'
              }`}>
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
