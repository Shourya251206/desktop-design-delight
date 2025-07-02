
import React from 'react';

const StickyNoteComponent: React.FC = () => {
  const todoItems = [
    'Update portfolio design',
    'Add new project',
    'Write about section',
    'Optimize for mobile',
    'Add contact form'
  ];

  return (
    <div className="absolute top-8 left-8 z-20">
      <div 
        className="bg-yellow-200 p-4 shadow-lg transform rotate-[-2deg] border-b-4 border-yellow-300"
        style={{
          width: '200px',
          fontFamily: 'Comic Sans MS, cursive, sans-serif'
        }}
      >
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
          <h3 className="text-sm font-bold text-gray-800">To-Do List</h3>
        </div>
        <ul className="space-y-2">
          {todoItems.map((item, index) => (
            <li key={index} className="flex items-start text-xs text-gray-700">
              <span className="mr-2 text-gray-500">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 text-xs text-gray-500 italic">
          - Remember to save!
        </div>
      </div>
    </div>
  );
};

export default StickyNoteComponent;
