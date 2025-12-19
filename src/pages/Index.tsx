import React, { useState } from 'react';
import DraggableFolder from '@/components/DraggableFolder';
import MacHeader from '@/components/MacHeader';
import MacWindow from '@/components/MacWindow';
import MacDock from '@/components/MacDock';
import ProjectSidebar from '@/components/ProjectSidebar';
import ProjectDetail from '@/components/ProjectDetail';
import AboutMeWindow from '@/components/AboutMeWindow';

const Index = () => {
  const [folders] = useState([
    { id: 'resume', name: 'Resume.pdf', x: 80, y: 120, type: 'file' as const },
    { id: 'about', name: 'About Me', x: 80, y: 240, type: 'folder' as const },
    { id: 'project1', name: 'AbsolutMess', x: 80, y: 360, type: 'folder' as const },
    { id: 'project2', name: 'Simplingo', x: 80, y: 480, type: 'folder' as const },
    { id: 'project3', name: 'Leafpress', x: 200, y: 120, type: 'folder' as const },
    { id: 'project4', name: 'Amazon', x: 200, y: 240, type: 'folder' as const },
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
    } else if (folderId === 'resume') {
      window.open('https://drive.google.com/file/d/1-zjEnc-WDt9Fo58QCz9d2aLp_tsfSgAs/view?usp=sharing', '_blank');
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
    const titles: Record<string, string> = {
      project1: 'AbsolutMess',
      project2: 'Simplingo', 
      project3: 'Leafpress',
      project4: 'Amazon'
    };
    return titles[windowId] || windowId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Mac Header Bar */}
      <MacHeader />
      
      {/* Welcome Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-5xl font-light text-gray-700">
          welcome to my <span className="font-semibold italic">portfolio</span>.
        </h1>
      </div>
      
      {/* Desktop Icons */}
      {folders.map((item) => (
        <DraggableFolder
          key={item.id}
          id={item.id}
          name={item.name}
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
          subtitle="Project Details"
          onClose={handleCloseWindow}
        >
          <ProjectSidebar 
            activeProject={activeSection}
            onSectionClick={setActiveSection}
          />
          <ProjectDetail projectId={openWindow} />
        </MacWindow>
      )}

      {/* About Me Window */}
      {showAboutMe && (
        <AboutMeWindow 
          onClose={handleCloseAboutMe}
          onMusicStateChange={() => {}}
        />
      )}
    </div>
  );
};

export default Index;
