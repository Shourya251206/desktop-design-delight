
import React from 'react';
import { Wifi, Battery, Search, Volume2 } from 'lucide-react';

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

  // Enhanced Apple logo SVG
  const AppleLogo = () => (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      className="text-black hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform"
    >
      <path 
        fill="currentColor" 
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  );

  return (
    <div className="fixed top-0 left-0 right-0 h-7 glass-effect border-b border-border flex items-center justify-between px-4 text-sm font-medium text-foreground z-50 hover-glow">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="hover:bg-primary/10 px-1 py-1 rounded hover-scale">
          <AppleLogo />
        </div>
        <span className="font-semibold gradient-text">Shourya Rathi's Portfolio</span>
        <span 
          className="hover:bg-primary/10 px-2 py-1 rounded cursor-pointer hover-scale text-muted-foreground hover:text-primary"
          onClick={handleContactClick}
        >
          Contact
        </span>
        <span 
          className="hover:bg-secondary/10 px-2 py-1 rounded cursor-pointer hover-scale text-muted-foreground hover:text-secondary"
          onClick={handleResumeClick}
        >
          Resume
        </span>
      </div>
      
      {/* Right side */}
      <div className="flex items-center space-x-3">
        <Battery size={14} className="text-muted-foreground hover:text-accent hover-scale cursor-pointer" />
        <Wifi size={14} className="text-muted-foreground hover:text-primary hover-scale cursor-pointer" />
        <Volume2 size={14} className="text-muted-foreground hover:text-secondary hover-scale cursor-pointer" />
        <Search size={14} className="text-muted-foreground hover:text-accent hover-scale cursor-pointer" />
        <span className="text-xs text-muted-foreground hover:text-primary hover-scale cursor-pointer">{currentTime}</span>
      </div>
    </div>
  );
};

export default MacHeader;
