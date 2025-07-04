
import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface AIVoiceAssistantProps {
  onCommand: (command: string) => void;
}

const AIVoiceAssistant: React.FC<AIVoiceAssistantProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Personal data about the user
  const personalData = `
    Name: [Your Name]
    Profession: Software Developer/Engineer
    Skills: React, TypeScript, JavaScript, Python, Machine Learning, AI
    Projects: 
    - AbsolutMess: [Project description]
    - Simplingo: Language learning application
    - Leafpress: [Project description] 
    - Amazon: E-commerce related project
    
    Education: [Your education background]
    Experience: [Your work experience]
    Interests: Robotics, Mathematics, Machine Learning, AI
    
    Contact: [Your contact information]
    Location: [Your location]
  `;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = async (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        setLastCommand(command);
        setIsProcessing(true);
        
        // Process voice commands
        if (command.includes('open project') || command.includes('show project')) {
          const projectNumber = command.match(/\d+/)?.[0];
          if (projectNumber) {
            onCommand(`project${projectNumber}`);
            setResponse(`Opening Project ${projectNumber}`);
          }
        } else if (command.includes('about') || command.includes('about me')) {
          onCommand('about');
          setResponse('Opening About Me section');
        } else if (command.includes('resume') || command.includes('cv')) {
          onCommand('resume');
          setResponse('Opening Resume');
        } else if (command.includes('close') || command.includes('exit')) {
          onCommand('close');
          setResponse('Closing current window');
        } else if (command.includes('hello') || command.includes('hi')) {
          onCommand('greeting');
          setResponse('Hello! How can I help you today?');
        } else {
          // Use AI to process the query
          await processWithAI(command);
        }
        
        setIsProcessing(false);
      };

      recognitionInstance.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [onCommand, isListening]);

  const processWithAI = async (query: string) => {
    try {
      // For now, we'll create intelligent responses based on the query
      // In a real implementation, you would integrate with OpenAI API or similar
      let aiResponse = '';
      
      if (query.includes('skills') || query.includes('what can you do')) {
        aiResponse = 'I specialize in React, TypeScript, Machine Learning, and AI. I have experience building web applications and working with modern technologies.';
      } else if (query.includes('projects') || query.includes('work')) {
        aiResponse = 'I have worked on several projects including AbsolutMess, Simplingo language learning app, Leafpress, and Amazon-related projects. Each showcases different aspects of my development skills.';
      } else if (query.includes('education') || query.includes('background')) {
        aiResponse = 'I have a strong background in software development with focus on modern web technologies and AI/ML applications.';
      } else if (query.includes('contact') || query.includes('reach')) {
        aiResponse = 'You can find my contact information in my resume or about section. Feel free to reach out for collaboration opportunities.';
      } else if (query.includes('weather') || query.includes('time')) {
        aiResponse = 'I can help you with information about my portfolio and projects. For current weather or time, please check your device settings.';
      } else {
        aiResponse = `I heard "${query}". I can help you navigate my portfolio, tell you about my projects, skills, and experience. Try asking about my projects, skills, or say "open project 1" to explore my work.`;
      }
      
      setResponse(aiResponse);
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }
      
    } catch (error) {
      console.error('AI processing error:', error);
      setResponse('Sorry, I had trouble processing that request. Please try again.');
    }
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setResponse('');
    }
  };

  if (!recognition) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/80 backdrop-blur-md rounded-full p-4 shadow-lg border border-cyan-400/30">
        <button
          onClick={toggleListening}
          className={`transition-all duration-300 pointer-events-auto relative ${
            isListening 
              ? 'text-cyan-400 animate-pulse' 
              : 'text-gray-400 hover:text-cyan-400'
          }`}
          title={isListening ? 'Stop listening - AI Assistant Active' : 'Start AI Voice Assistant'}
        >
          {isListening ? <Mic size={24} /> : <MicOff size={24} />}
          {isProcessing && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          )}
        </button>
      </div>
      
      {(lastCommand || response) && (
        <div className="mt-3 bg-black/90 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-sm max-w-xs">
          {lastCommand && (
            <div className="text-cyan-400 mb-1">
              <Volume2 size={12} className="inline mr-1" />
              "{lastCommand}"
            </div>
          )}
          {response && (
            <div className="text-gray-200">
              {response}
            </div>
          )}
        </div>
      )}
      
      {isListening && (
        <div className="mt-2 text-center">
          <div className="text-cyan-400 text-xs animate-pulse">
            🎤 AI Assistant Listening...
          </div>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAssistant;
