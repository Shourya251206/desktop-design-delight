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

  // Comprehensive personal data about Shourya Rathi
  const personalData = {
    fullBio: "Shourya Rathi is an ambitious and multidisciplinary undergraduate student majoring in Computer Science with minors in Robotics and Mathematics at the University of Utah, starting in Fall 2025 as a transfer student. He is deeply passionate about artificial intelligence, machine learning, robotics, and their applications across domains such as energy, healthcare, finance, and human-computer interaction. With a strong foundation in Python, C++, Java, SQL, and emerging platforms like ROS, TensorFlow, PyTorch, and OpenAI APIs, Shourya has already amassed a broad spectrum of real-world experience. He worked as an AI Intern at Nihilent, where he deployed an AI-powered code conversion tool using OpenAI and Code Llama, integrated SAP Joule into iOS tools, and containerized backend systems with Docker, significantly improving developer efficiency and deployment time. He was selected for competitive job shadow programs at IBM and Wells Fargo, where he explored enterprise backend systems, modeled sentiment analysis for financial applications, and presented insights in agile settings. Shourya also conducted undergraduate research under an AI professor, leading a 10-member team to build AI-augmented mixed reality visualizations that improved rendering efficiency by 35%. His project portfolio includes a multi-stage e-commerce recommender system built with hybrid ML models, a bimanual robot trained with reinforcement learning in simulated environments, and a zero-shot indoor navigation system using GPT + CLIP for smart homes. Beyond tech, Shourya has shown leadership and teaching ability as a private math and physics tutor, mentoring over 50 students across four years and designing reusable learning systems for coaching centers. He has been awarded scholarships and certificates for innovation and academic excellence, including the School of Mining & Mineral Resources scholarship and the Health Science Design Innovation certificate. Shourya is highly driven to pursue research opportunities that fuse intelligent systems, robotics, and real-world problem-solving, with a long-term vision of joining a top-tier graduate program in AI and contributing to impactful technologies on a global scale. He is proactive, self-taught in many tools, committed to continuous learning, and eager to collaborate with leading researchers across domains.",
    
    name: "Shourya Rathi",
    education: {
      university: "University of Utah",
      major: "Computer Science",
      minors: ["Robotics", "Mathematics"],
      startDate: "Fall 2025",
      status: "Transfer student"
    },
    
    skills: {
      programming: ["Python", "C++", "Java", "SQL"],
      platforms: ["ROS", "TensorFlow", "PyTorch", "OpenAI APIs", "Docker"],
      domains: ["AI", "Machine Learning", "Robotics", "Web Development"]
    },
    
    workExperience: [
      {
        role: "AI Intern",
        company: "Nihilent",
        achievements: [
          "Deployed AI-powered code conversion tool using OpenAI and Code Llama",
          "Integrated SAP Joule into iOS tools",
          "Containerized backend systems with Docker",
          "Significantly improved developer efficiency and deployment time"
        ]
      },
      {
        role: "Job Shadow Participant",
        companies: ["IBM", "Wells Fargo"],
        activities: [
          "Explored enterprise backend systems",
          "Modeled sentiment analysis for financial applications", 
          "Presented insights in agile settings"
        ]
      }
    ],
    
    research: {
      role: "Undergraduate Research Lead",
      project: "AI-augmented mixed reality visualizations",
      teamSize: "10 members",
      achievement: "Improved rendering efficiency by 35%"
    },
    
    projects: [
      {
        name: "Multi-stage E-commerce Recommender System",
        description: "Built with hybrid ML models",
        technologies: ["Machine Learning", "Hybrid Models"]
      },
      {
        name: "Bimanual Robot",
        description: "Trained with reinforcement learning in simulated environments",
        technologies: ["Robotics", "Reinforcement Learning", "Simulation"]
      },
      {
        name: "Zero-shot Indoor Navigation System", 
        description: "Using GPT + CLIP for smart homes",
        technologies: ["GPT", "CLIP", "Computer Vision", "Smart Home Tech"]
      },
      {
        name: "AbsolutMess",
        description: "Project management and organization tool",
        technologies: ["React", "TypeScript", "Full Stack"]
      },
      {
        name: "Simplingo",
        description: "Language learning application",
        technologies: ["React", "AI/ML", "NLP"]
      },
      {
        name: "Leafpress",
        description: "Content management system",
        technologies: ["React", "TypeScript", "Backend APIs"]
      }
    ],
    
    teaching: {
      role: "Private Math and Physics Tutor",
      students: "Over 50 students",
      duration: "Four years",
      achievements: "Designed reusable learning systems for coaching centers"
    },
    
    awards: [
      "School of Mining & Mineral Resources scholarship",
      "Health Science Design Innovation certificate"
    ],
    
    interests: ["Energy", "Healthcare", "Finance", "Human-Computer Interaction"],
    goals: "Pursue research opportunities that fuse intelligent systems, robotics, and real-world problem-solving, with a long-term vision of joining a top-tier graduate program in AI",
    contact: "shouryarathi2006@gmail.com"
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
      
      // Education queries
      if (query.includes('education') || query.includes('university') || query.includes('college') || query.includes('study') || query.includes('degree')) {
        aiResponse = `Shourya is majoring in Computer Science with minors in Robotics and Mathematics at the University of Utah, starting Fall 2025 as a transfer student.`;
      }
      // Skills and programming queries
      else if (query.includes('skills') || query.includes('programming') || query.includes('technologies') || query.includes('what can')) {
        aiResponse = `Shourya has strong programming skills in ${personalData.skills.programming.join(', ')} and works with platforms like ${personalData.skills.platforms.join(', ')}. He specializes in ${personalData.skills.domains.join(', ')}.`;
      }
      // Work experience queries
      else if (query.includes('work') || query.includes('experience') || query.includes('job') || query.includes('intern') || query.includes('nihilent')) {
        aiResponse = `Shourya worked as an AI Intern at Nihilent where he deployed AI-powered code conversion tools, integrated SAP Joule into iOS tools, and containerized backend systems with Docker. He also participated in job shadow programs at IBM and Wells Fargo, working on enterprise systems and sentiment analysis.`;
      }
      // Research queries
      else if (query.includes('research') || query.includes('mixed reality') || query.includes('team lead')) {
        aiResponse = `Shourya conducted undergraduate research leading a 10-member team to build AI-augmented mixed reality visualizations that improved rendering efficiency by 35%.`;
      }
      // Projects queries
      else if (query.includes('projects') || query.includes('portfolio') || query.includes('built') || query.includes('developed')) {
        const projectNames = personalData.projects.map(p => p.name).join(', ');
        aiResponse = `Shourya has built impressive projects including: ${projectNames}. Notable ones are a multi-stage e-commerce recommender system with hybrid ML models, a bimanual robot trained with reinforcement learning, and a zero-shot indoor navigation system using GPT + CLIP for smart homes.`;
      }
      // Teaching queries
      else if (query.includes('teaching') || query.includes('tutor') || query.includes('mentor') || query.includes('students')) {
        aiResponse = `Shourya has been a private math and physics tutor for four years, mentoring over 50 students and designing reusable learning systems for coaching centers.`;
      }
      // Awards queries
      else if (query.includes('awards') || query.includes('scholarship') || query.includes('certificate') || query.includes('achievement')) {
        aiResponse = `Shourya has received the School of Mining & Mineral Resources scholarship and the Health Science Design Innovation certificate for his academic excellence and innovation.`;
      }
      // Goals and future queries
      else if (query.includes('goals') || query.includes('future') || query.includes('graduate') || query.includes('vision') || query.includes('plans')) {
        aiResponse = `Shourya is highly driven to pursue research opportunities that fuse intelligent systems, robotics, and real-world problem-solving, with a long-term vision of joining a top-tier graduate program in AI and contributing to impactful technologies on a global scale.`;
      }
      // Contact queries
      else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
        aiResponse = `You can contact Shourya at ${personalData.contact}.`;
      }
      // Interest and passion queries
      else if (query.includes('interests') || query.includes('passionate') || query.includes('domains') || query.includes('applications')) {
        aiResponse = `Shourya is passionate about AI, ML, and robotics applications across domains like ${personalData.interests.join(', ')}. He's particularly interested in human-computer interaction and intelligent systems.`;
      }
      // Name and introduction queries
      else if (query.includes('name') || query.includes('who are you') || query.includes('introduce') || query.includes('tell me about')) {
        aiResponse = `I'm ${personalData.name}'s AI assistant! Shourya is an ambitious Computer Science student with minors in Robotics and Mathematics, passionate about AI, ML, and robotics. He has hands-on experience as an AI intern, research leader, and has built impressive projects combining AI with real-world applications.`;
      }
      // Specific project queries
      else if (query.includes('absolutmess') || query.includes('simplingo') || query.includes('leafpress')) {
        const project = personalData.projects.find(p => 
          query.includes(p.name.toLowerCase()) || 
          query.toLowerCase().includes(p.name.toLowerCase())
        );
        if (project) {
          aiResponse = `${project.name} is ${project.description} built using ${project.technologies.join(', ')}.`;
        } else {
          aiResponse = "I can tell you about Shourya's projects: AbsolutMess, Simplingo, Leafpress, and his AI/ML projects like the e-commerce recommender system and bimanual robot.";
        }
      }
      // Generic rejection for non-personal queries
      else if (query.includes('weather') || query.includes('time') || query.includes('date') || query.includes('news') || 
               query.includes('sports') || query.includes('cricket') || query.includes('movie') || query.includes('music') ||
               query.includes('cook') || query.includes('recipe') || query.includes('travel') || query.includes('stock') ||
               query.includes('politics') || query.includes('history') || query.includes('geography')) {
        aiResponse = "I can't answer that question. I'm specifically designed to answer questions about Shourya Rathi's education, work experience, projects, skills, and professional background only.";
      }
      // Default response for unclear queries
      else {
        aiResponse = `I heard "${query}". I can only answer questions about Shourya Rathi's education, work experience, research, projects, skills, teaching experience, awards, and professional goals. Please ask me something specific about Shourya's background!`;
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
      setResponse("I can't answer that question. I'm specifically designed to answer questions about Shourya Rathi only.");
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
