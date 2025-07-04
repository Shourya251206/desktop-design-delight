
import React, { useEffect, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceRecognitionProps {
  onCommand: (command: string) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [lastCommand, setLastCommand] = useState<string>('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        setLastCommand(command);
        
        // Process voice commands
        if (command.includes('open project') || command.includes('show project')) {
          const projectNumber = command.match(/\d+/)?.[0];
          if (projectNumber) {
            onCommand(`project${projectNumber}`);
          }
        } else if (command.includes('about') || command.includes('about me')) {
          onCommand('about');
        } else if (command.includes('resume') || command.includes('cv')) {
          onCommand('resume');
        } else if (command.includes('close') || command.includes('exit')) {
          onCommand('close');
        } else if (command.includes('hello') || command.includes('hi')) {
          onCommand('greeting');
        }
      };

      recognitionInstance.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start(); // Restart if still listening
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [onCommand, isListening]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  if (!recognition) {
    return null; // Speech recognition not supported
  }

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/20">
        <button
          onClick={toggleListening}
          className={`transition-all duration-300 pointer-events-auto ${
            isListening 
              ? 'text-red-400 animate-pulse' 
              : 'text-gray-400 hover:text-white'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice control'}
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
      </div>
      
      {lastCommand && (
        <div className="mt-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm text-center">
          "{lastCommand}"
        </div>
      )}
    </div>
  );
};

export default VoiceRecognition;
