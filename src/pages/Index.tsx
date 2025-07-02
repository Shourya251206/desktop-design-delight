
import React, { useState } from 'react';
import { Folder, StickyNote } from 'lucide-react';
import DraggableFolder from '@/components/DraggableFolder';
import StickyNoteComponent from '@/components/StickyNoteComponent';

const Index = () => {
  const [folders] = useState([
    { id: 'about', name: 'About Me', x: 100, y: 200 },
    { id: 'project1', name: 'Project 01', x: 250, y: 200 },
    { id: 'project2', name: 'Project 02', x: 400, y: 200 },
    { id: 'project3', name: 'Project 03', x: 550, y: 200 },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden" 
         style={{
           backgroundImage: `
             linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
           `,
           backgroundSize: '20px 20px'
         }}>
      
      {/* Sticky Note */}
      <StickyNoteComponent />
      
      {/* Welcome Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-light text-gray-800">
          welcome to my{' '}
          <span className="font-serif font-normal">portfolio</span>
          <span className="text-gray-600">.</span>
        </h1>
      </div>
      
      {/* Draggable Folders */}
      {folders.map((folder) => (
        <DraggableFolder
          key={folder.id}
          id={folder.id}
          name={folder.name}
          initialX={folder.x}
          initialY={folder.y}
        />
      ))}
    </div>
  );
};

export default Index;
