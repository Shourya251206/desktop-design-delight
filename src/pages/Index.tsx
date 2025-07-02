
import React, { useState } from 'react';
import DraggableFolder from '@/components/DraggableFolder';
import StickyNoteComponent from '@/components/StickyNoteComponent';
import MacHeader from '@/components/MacHeader';
import MacDock from '@/components/MacDock';
import MacWindow from '@/components/MacWindow';
import ProjectSidebar from '@/components/ProjectSidebar';
import ProjectDetail from '@/components/ProjectDetail';
import AboutMeWindow from '@/components/AboutMeWindow';

const Index = () => {
  const [folders] = useState([
    { id: 'resume', name: 'Resume.pdf', x: 150, y: 400, type: 'file' as const },
    { id: 'about', name: 'About Me', x: 280, y: 500, type: 'folder' as const },
    { id: 'project1', name: 'Project 01', subtitle: '(AbsolutMess)', x: 1250, y: 240, type: 'folder' as const },
    { id: 'project2', name: 'Project 02', subtitle: '(Simplingo)', x: 1310, y: 130, type: 'folder' as const },
    { id: 'project3', name: 'Project 03', subtitle: '(Leafpress)', x: 1310, y: 350, type: 'folder' as const },
    { id: 'project4', name: 'Project 04', subtitle: '(Amazon)', x: 1230, y: 450, type: 'folder' as const },
    { id: 'trash', name: "Don't Look", x: 1370, y: 500, type: 'trash' as const },
  ]);

  const [openWindow, setOpenWindow] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showAboutMe, setShowAboutMe] = useState(false);

  const handleFolderClick = (folderId: string) => {
    if (folderId.startsWith('project')) {
      setOpenWindow(folderId);
      setActiveSection(folderId);
    } else if (folderId === 'about') {
      setShowAboutMe(true);
    }
  };

  const handleCloseWindow = () => {
    setOpenWindow(null);
    setActiveSection('');
  };

  const handleCloseAboutMe = () => {
    setShowAboutMe(false);
  };

  const getWindowTitle = (windowId: string) => {
    const titles = {
      project1: 'AbsolutMess (Project 01)',
      project2: 'Simplingo (Project 02)', 
      project3: 'Leafpress (Project 03)',
      project4: 'Amazon (Project 04)'
    };
    return titles[windowId as keyof typeof titles] || windowId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 relative overflow-hidden" 
         style={{
           backgroundImage: `
             linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)
           `,
           backgroundSize: '24px 24px'
         }}>
      
      {/* Mac Header Bar */}
      <MacHeader />
      
      {/* Sticky Note */}
      <StickyNoteComponent />
      
      {/* Welcome Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl font-light text-gray-700 leading-tight">
          welcome to my{' '}
          <span className="font-serif font-normal italic text-6xl text-black">portfolio</span>
          <span className="text-gray-600">.</span>
        </h1>
      </div>
      
      {/* Desktop Icons */}
      {folders.map((item) => (
        <DraggableFolder
          key={item.id}
          id={item.id}
          name={item.name}
          subtitle={item.subtitle}
          type={item.type}
          initialX={item.x}
          initialY={item.y}
          onClick={handleFolderClick}
        />
      ))}
      
      {/* Mac Dock */}
      <MacDock />

      {/* Project Window */}
      {openWindow && (
        <MacWindow
          title={getWindowTitle(openWindow)}
          subtitle="Visual Design & UI"
          onClose={handleCloseWindow}
        >
          <ProjectSidebar 
            activeProject={activeSection}
            onSectionClick={setActiveSection}
          />
          <ProjectDetail projectId={openWindow} />
        </MacWindow>
      )}

      {/* About Me Windows */}
      {showAboutMe && (
        <AboutMeWindow onClose={handleCloseAboutMe} />
      )}
    </div>
  );
};

export default Index;
