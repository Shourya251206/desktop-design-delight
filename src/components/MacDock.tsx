
import React from 'react';
import { Folder, Globe, Mail, MessageCircle, Calendar, Camera, Music, Settings, AppWindow } from 'lucide-react';

const MacDock: React.FC = () => {
  const handleSpotifyClick = () => {
    // Open Spotify with a favorite song
    const spotifyUrl = 'https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh'; // Example: Never Gonna Give You Up
    window.open(spotifyUrl, '_blank');
  };

  const dockApps = [
    { name: 'Finder', icon: Folder, color: 'text-blue-500', onClick: () => {} },
    { name: 'Safari', icon: Globe, color: 'text-blue-600', onClick: () => {} },
    { name: 'Mail', icon: Mail, color: 'text-blue-500', onClick: () => {} },
    { name: 'Messages', icon: MessageCircle, color: 'text-green-500', onClick: () => {} },
    { name: 'Calendar', icon: Calendar, color: 'text-red-500', onClick: () => {} },
    { name: 'Photos', icon: Camera, color: 'text-yellow-500', onClick: () => {} },
    { name: 'Spotify', icon: Music, color: 'text-green-600', onClick: handleSpotifyClick },
    { name: 'App Store', icon: AppWindow, color: 'text-blue-500', onClick: () => {} },
    { name: 'System Preferences', icon: Settings, color: 'text-gray-600', onClick: () => {} },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-2">
          {dockApps.map((app, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-white bg-opacity-80 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm"
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
