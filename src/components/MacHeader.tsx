
import React from 'react';
import { Apple, Wifi, Battery, Search, Volume2 } from 'lucide-react';

const MacHeader: React.FC = () => {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 text-sm font-medium text-gray-800 z-50">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Apple size={14} className="text-gray-800" />
        <span className="font-semibold">Inika Jhamvar's Portfolio</span>
        <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Contact</span>
        <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Resume</span>
      </div>
      
      {/* Right side */}
      <div className="flex items-center space-x-3">
        <Battery size={14} />
        <Wifi size={14} />
        <Volume2 size={14} />
        <Search size={14} />
        <span className="text-xs">{currentTime}</span>
      </div>
    </div>
  );
};

export default MacHeader;
