import React, { useState } from 'react';
import DraggableFolder from '@/components/DraggableFolder';
import StickyNoteComponent from '@/components/StickyNoteComponent';
import MacHeader from '@/components/MacHeader';
import MacDock from '@/components/MacDock';
import MacWindow from '@/components/MacWindow';
import ProjectSidebar from '@/components/ProjectSidebar';
import ProjectDetail from '@/components/ProjectDetail';
import AboutMeWindow from '@/components/AboutMeWindow';
import Background3D from '@/components/Background3D';
import HolographicElements from '@/components/HolographicElements';
import AIVoiceAssistant from '@/components/AIVoiceAssistant';
import EyeTrackingCursor from '@/components/EyeTrackingCursor';
import DynamicColorScheme from '@/components/DynamicColorScheme';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

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

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    if (command === 'greeting') {
      // Could add a greeting animation or sound
      return;
    }
    
    if (command === 'close') {
      setOpenWindow(null);
      setShowAboutMe(false);
      return;
    }
    
    handleFolderClick(command);
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Dynamic Color Scheme Controller */}
      <DynamicColorScheme isPlaying={isPlaying} currentTime={currentTime} />
      
      {/* AI Voice Assistant - center bottom */}
      <AIVoiceAssistant onCommand={handleVoiceCommand} />
      
      {/* Simplified Eye Tracking Cursor */}
      <EyeTrackingCursor />
      
      {/* 3D Background - subtle */}
      <Background3D />
      
      {/* Holographic Effects - reduced */}
      <HolographicElements />
      
      {/* Mac Header Bar */}
      <MacHeader />
      
      {/* Sticky Note */}
      <StickyNoteComponent />
      
      {/* Welcome Text - updated for dark theme */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1 className="text-5xl font-light text-white leading-tight group cursor-pointer">
          <span 
            className="transition-all duration-500 hover:text-cyan-400 hover:scale-110 inline-block hover:rotate-2"
            style={{ color: 'var(--dynamic-primary, #06b6d4)' }}
          >
            welcome
          </span>{' '}
          <span 
            className="transition-all duration-500 hover:text-purple-400 hover:scale-110 inline-block hover:-rotate-1"
            style={{ color: 'var(--dynamic-secondary, #8b5cf6)' }}
          >
            to
          </span>{' '}
          <span 
            className="transition-all duration-500 hover:text-green-400 hover:scale-110 inline-block hover:rotate-1"
            style={{ color: 'var(--dynamic-accent, #10b981)' }}
          >
            my
          </span>{' '}
          <span 
            className="font-serif font-normal italic text-6xl text-white transition-all duration-700 hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-cyan-400 hover:via-purple-400 hover:to-blue-400 hover:scale-125 inline-block hover:rotate-3"
          >
            portfolio
          </span>
          <span 
            className="text-gray-400 transition-all duration-300 hover:text-cyan-400 hover:scale-150 inline-block"
          >
            .
          </span>
        </h1>
      </div>
      
      {/* Desktop Icons */}
      {folders.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <DraggableFolder
            id={item.id}
            name={item.name}
            subtitle={item.subtitle}
            type={item.type}
            initialX={item.x}
            initialY={item.y}
            onClick={handleFolderClick}
          />
        </div>
      ))}
      
      {/* Mac Dock */}
      <MacDock />

      {/* Project Window */}
      {openWindow && (
        <div className="pointer-events-auto">
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
        </div>
      )}

      {/* About Me Windows */}
      {showAboutMe && (
        <div className="pointer-events-auto">
          <AboutMeWindow 
            onClose={handleCloseAboutMe}
            onMusicStateChange={(playing, time) => {
              setIsPlaying(playing);
              setCurrentTime(time);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
