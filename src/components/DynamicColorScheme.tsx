
import React, { useEffect, useState } from 'react';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface DynamicColorSchemeProps {
  isPlaying?: boolean;
  currentTime?: number;
}

const DynamicColorScheme: React.FC<DynamicColorSchemeProps> = ({ isPlaying = false, currentTime = 0 }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    primary: '#3b82f6',
    secondary: '#8b5cf6', 
    accent: '#06b6d4',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  });

  // Time-based color schemes
  const getTimeBasedColors = (): ColorScheme => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) {
      // Morning - warm, energetic
      return {
        primary: '#f59e0b',
        secondary: '#ef4444',
        accent: '#f97316',
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      };
    } else if (hour >= 12 && hour < 18) {
      // Afternoon - bright, professional  
      return {
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#10b981',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      };
    } else if (hour >= 18 && hour < 22) {
      // Evening - warm, cozy
      return {
        primary: '#f97316',
        secondary: '#dc2626',
        accent: '#7c3aed',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      };
    } else {
      // Night - cool, mysterious
      return {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      };
    }
  };

  // Music-reactive colors
  const getMusicReactiveColors = (time: number): ColorScheme => {
    const beatIntensity = Math.sin(time * 0.01) * 0.5 + 0.5;
    const hue1 = (time * 0.5) % 360;
    const hue2 = (time * 0.7 + 120) % 360;
    const hue3 = (time * 0.3 + 240) % 360;
    
    return {
      primary: `hsl(${hue1}, ${70 + beatIntensity * 30}%, ${50 + beatIntensity * 20}%)`,
      secondary: `hsl(${hue2}, ${60 + beatIntensity * 40}%, ${45 + beatIntensity * 25}%)`,
      accent: `hsl(${hue3}, ${80 + beatIntensity * 20}%, ${55 + beatIntensity * 15}%)`,
      background: `linear-gradient(135deg, hsl(${hue1}, 60%, 70%) 0%, hsl(${hue2}, 50%, 60%) 100%)`,
    };
  };

  useEffect(() => {
    const updateColors = () => {
      if (isPlaying) {
        setColorScheme(getMusicReactiveColors(currentTime * 1000));
      } else {
        setColorScheme(getTimeBasedColors());
      }
    };

    updateColors();
    const interval = setInterval(updateColors, isPlaying ? 100 : 60000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  // Apply colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-primary', colorScheme.primary);
    root.style.setProperty('--dynamic-secondary', colorScheme.secondary);
    root.style.setProperty('--dynamic-accent', colorScheme.accent);
    root.style.setProperty('--dynamic-background', colorScheme.background);
  }, [colorScheme]);

  return (
    <div className="fixed top-4 left-4 z-50 opacity-80">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 text-xs text-white">
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colorScheme.primary }}
          />
          <span>{isPlaying ? 'Music Mode' : 'Time Mode'}</span>
        </div>
      </div>
    </div>
  );
};

export default DynamicColorScheme;
