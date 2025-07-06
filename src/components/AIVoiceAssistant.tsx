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

  // Personal data about you
  const personalData = {
    name: "Shourya Rathi",
    profession: "Software Developer/Engineer",
    skills: ["React", "TypeScript", "JavaScript", "Python", "Machine Learning", "AI", "Web Development", "Full Stack Development"],
    projects: [
      {
        name: "AbsolutMess",
        description: "A comprehensive project management and organization tool",
        technologies: ["React", "TypeScript", "Node.js"]
      },
      {
        name: "Simplingo", 
        description: "An innovative language learning application with interactive features",
        technologies: ["React", "AI/ML", "Natural Language Processing"]
      },
      {
        name: "Leafpress",
        description: "Modern content management system with advanced features",
        technologies: ["React", "TypeScript", "Backend APIs"]
      },
      {
        name: "Amazon Project",
        description: "E-commerce related project with scalable architecture",
        technologies: ["Full Stack", "Database Management", "API Integration"]
      }
    ],
    education: "Computer Science background with focus on AI and Machine Learning",
    experience: "Full Stack Developer with expertise in modern web technologies",
    interests: ["Robotics", "Mathematics", "Machine Learning", "Artificial Intelligence", "Web Development"],
    contact: "shouryarathi2006@gmail.com",
    location: "Available for remote and on-site opportunities"
  };

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
        
        // Check for navigation commands first
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
          setResponse('Hello! I\'m Shourya\'s AI assistant. Ask me anything about his work, skills, or projects!');
        } else {
          // Process personal queries
          await processPersonalQuery(command);
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

  const processPersonalQuery = async (query: string) => {
    try {
      let aiResponse = '';
      
      // Personal data queries
      if (query.includes('skills') || query.includes('what can') || query.includes('technologies')) {
        aiResponse = `Shourya specializes in ${personalData.skills.join(', ')}. He has strong expertise in full-stack development with a focus on modern web technologies and AI/ML applications.`;
      } else if (query.includes('projects') || query.includes('work') || query.includes('portfolio')) {
        aiResponse = `Shourya has worked on several impressive projects: ${personalData.projects.map(p => `${p.name} - ${p.description}`).join('; ')}. Each project showcases different aspects of his development skills.`;
      } else if (query.includes('education') || query.includes('background') || query.includes('study')) {
        aiResponse = `Shourya has ${personalData.education} and works as a ${personalData.profession}. He's passionate about ${personalData.interests.join(', ')}.`;
      } else if (query.includes('contact') || query.includes('reach') || query.includes('email')) {
        aiResponse = `You can reach Shourya at ${personalData.contact}. He's ${personalData.location}.`;
      } else if (query.includes('experience') || query.includes('professional')) {
        aiResponse = `Shourya is a ${personalData.experience} with hands-on experience in building scalable applications and working with cutting-edge technologies.`;
      } else if (query.includes('interests') || query.includes('passionate') || query.includes('hobby')) {
        aiResponse = `Shourya is passionate about ${personalData.interests.join(', ')}. He combines his technical skills with these interests in his projects.`;
      } else if (query.includes('name') || query.includes('who are you') || query.includes('introduce')) {
        aiResponse = `I'm ${personalData.name}'s AI assistant! Shourya is a ${personalData.profession} specializing in ${personalData.skills.slice(0, 3).join(', ')} and more. Feel free to ask me anything about his work!`;
      } 
      // Generic responses for non-personal queries
      else if (query.includes('weather')) {
        aiResponse = 'I can only provide information about Shourya Rathi and his work. For weather updates, please check your weather app or ask a general AI assistant.';
      } else if (query.includes('cricket') || query.includes('sports') || query.includes('score')) {
        aiResponse = 'I\'m specialized in answering questions about Shourya\'s professional background and projects. For sports updates, please use a sports app or general search.';
      } else if (query.includes('news') || query.includes('current events')) {
        aiResponse = 'I focus on Shourya\'s portfolio and professional information. For current news, please check a news website or general AI assistant.';
      } else if (query.includes('time') || query.includes('date')) {
        aiResponse = 'I\'m here to help with questions about Shourya\'s work and background. For current time and date, please check your device.';
      } else {
        aiResponse = `I heard "${query}". I'm Shourya's personal AI assistant and I can tell you about his skills, projects, experience, and background. Try asking about his projects, technical skills, or professional experience!`;
      }
      
      setResponse(aiResponse);
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.7;
        speechSynthesis.speak(utterance);
      }
      
    } catch (error) {
      console.error('AI processing error:', error);
      setResponse('Sorry, I had trouble processing that request. Please try asking about Shourya\'s skills, projects, or experience.');
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
      {/* Siri-like design */}
      <div className="relative">
        {/* Outer glow ring when listening */}
        {isListening && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-spin opacity-60" 
               style={{ padding: '3px', animation: 'spin 3s linear infinite' }}>
            <div className="rounded-full bg-white h-full w-full"></div>
          </div>
        )}
        
        {/* Main Siri button */}
        <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-4 shadow-xl border-2 transition-all duration-300 ${
          isListening 
            ? 'border-blue-400 shadow-blue-400/30 shadow-2xl scale-110' 
            : 'border-gray-300 hover:border-gray-400 hover:shadow-lg hover:scale-105'
        }`}>
          <button
            onClick={toggleListening}
            className={`transition-all duration-300 pointer-events-auto relative ${
              isListening 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
            title={isListening ? 'Tap to stop - AI Assistant Active' : 'Tap to speak with AI Assistant'}
          >
            {isListening ? <Mic size={28} /> : <MicOff size={28} />}
            {isProcessing && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
            )}
          </button>
        </div>

        {/* Animated waves when listening */}
        {isListening && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30"></div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping opacity-10" style={{ animationDelay: '1s' }}></div>
          </div>
        )}
      </div>
      
      {/* Response bubble - Siri style */}
      {(lastCommand || response) && (
        <div className="mt-4 bg-white/95 text-black text-sm px-6 py-3 rounded-3xl backdrop-blur-sm max-w-sm border border-gray-200 shadow-2xl">
          {lastCommand && (
            <div className="text-blue-600 mb-2 font-medium flex items-center">
              <Volume2 size={14} className="inline mr-2" />
              "{lastCommand}"
            </div>
          )}
          {response && (
            <div className="text-gray-800 leading-relaxed">
              {response}
            </div>
          )}
        </div>
      )}
      
      {/* Status indicator */}
      {isListening && (
        <div className="mt-3 text-center">
          <div className="text-blue-600 text-sm font-medium flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Listening...</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAssistant;
