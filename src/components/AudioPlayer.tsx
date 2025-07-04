
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  artist: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, title, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 rounded-lg shadow-xl">
      <audio ref={audioRef} src={audioSrc} />
      
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-md"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-gray-300 text-xs">{artist}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <button className="text-gray-400 hover:text-white transition-colors">
          <SkipBack size={16} />
        </button>
        <button 
          onClick={togglePlay}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        >
          {isPlaying ? <Pause size={16} className="text-gray-900" /> : <Play size={16} className="text-gray-900 ml-0.5" />}
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <SkipForward size={16} />
        </button>
        <div className="flex-1 mx-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercentage}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progressPercentage}%, #4b5563 ${progressPercentage}%, #4b5563 100%)`
            }}
          />
        </div>
        <span className="text-xs text-gray-400 min-w-[35px]">
          {formatTime(currentTime)}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Volume2 size={14} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
