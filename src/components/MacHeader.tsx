
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

  const handleContactClick = () => {
    window.open('mailto:shouryarathi2006@gmail.com', '_blank');
  };

  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/1-zjEnc-WDt9Fo58QCz9d2aLp_tsfSgAs/view?usp=sharing', '_blank');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 text-sm font-medium text-gray-800 z-50">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Apple size={14} className="text-gray-800" />
        <span className="font-semibold">Shourya Rathi's Portfolio</span>
        <span 
          className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
          onClick={handleContactClick}
        >
          Contact
        </span>
        <span 
          className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
          onClick={handleResumeClick}
        >
          Resume
        </span>
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
