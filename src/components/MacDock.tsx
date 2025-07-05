
import React from 'react';
import { Folder, Globe, Mail, MessageCircle, Calendar, Camera, Music, Settings, AppWindow } from 'lucide-react';

const MacDock: React.FC = () => {
  const dockApps = [
    { 
      name: 'Finder', 
      icon: Folder, 
      color: 'text-black', 
      onClick: () => window.open('https://icloud.com', '_blank')
    },
    { 
      name: 'Safari', 
      icon: Globe, 
      color: 'text-black', 
      onClick: () => window.open('https://google.com', '_blank')
    },
    { 
      name: 'Mail', 
      icon: Mail, 
      color: 'text-black', 
      onClick: () => window.open('mailto:shouryarathi2006@gmail.com', '_blank')
    },
    { 
      name: 'Messages', 
      icon: MessageCircle, 
      color: 'text-black', 
      onClick: () => window.open('https://messages.google.com/web', '_blank')
    },
    { 
      name: 'Calendar', 
      icon: Calendar, 
      color: 'text-black', 
      onClick: () => window.open('https://calendar.google.com', '_blank')
    },
    { 
      name: 'Photos', 
      icon: Camera, 
      color: 'text-black', 
      onClick: () => window.open('https://photos.google.com', '_blank')
    },
    { 
      name: 'Spotify', 
      icon: Music, 
      color: 'text-black', 
      onClick: () => window.open('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh', '_blank')
    },
    { 
      name: 'App Store', 
      icon: AppWindow, 
      color: 'text-black', 
      onClick: () => window.open('https://apps.apple.com', '_blank')
    },
    { 
      name: 'System Preferences', 
      icon: Settings, 
      color: 'text-black', 
      onClick: () => window.open('https://support.apple.com/guide/mac-help', '_blank')
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          {dockApps.map((app, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-white bg-opacity-90 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm border border-gray-100"
              title={app.name}
              onClick={app.onClick}
            >
              <app.icon size={24} className={app.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MacDock;
