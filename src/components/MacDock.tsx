import React from 'react';
import { Folder, Globe, Mail, MessageCircle, Calendar, Camera, Music, Settings } from 'lucide-react';

const MacDock: React.FC = () => {
  const dockApps = [
    { name: 'Finder', icon: Folder, onClick: () => window.open('https://icloud.com', '_blank') },
    { name: 'Safari', icon: Globe, onClick: () => window.open('https://google.com', '_blank') },
    { name: 'Mail', icon: Mail, onClick: () => window.open('mailto:shouryarathi2006@gmail.com', '_blank') },
    { name: 'Messages', icon: MessageCircle, onClick: () => window.open('https://messages.google.com/web', '_blank') },
    { name: 'Calendar', icon: Calendar, onClick: () => window.open('https://calendar.google.com', '_blank') },
    { name: 'Photos', icon: Camera, onClick: () => window.open('https://photos.google.com', '_blank') },
    { name: 'Spotify', icon: Music, onClick: () => window.open('https://open.spotify.com', '_blank') },
    { name: 'Settings', icon: Settings, onClick: () => window.open('https://support.apple.com', '_blank') },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl px-3 py-2 border border-white/50 shadow-lg">
        <div className="flex items-center space-x-1">
          {dockApps.map((app, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              title={app.name}
              onClick={app.onClick}
            >
              <app.icon size={24} className="text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MacDock;
