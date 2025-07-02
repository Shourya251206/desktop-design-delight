
import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const projectData = {
    project1: {
      title: 'AbsolutMess',
      subtitle: 'Visual Design & UI',
      description: 'A comprehensive design system and user interface project focused on creating intuitive user experiences.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
      status: 'Full case study.fig',
      links: [
        { name: 'Live Demo', url: '#', icon: Globe },
        { name: 'GitHub', url: '#', icon: Github },
      ]
    },
    project2: {
      title: 'Simplingo',
      subtitle: 'Language Learning App',
      description: 'A modern language learning application with gamification elements and progressive learning paths.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      status: 'In Development',
      links: [
        { name: 'Live Demo', url: '#', icon: Globe },
        { name: 'GitHub', url: '#', icon: Github },
      ]
    },
    project3: {
      title: 'Leafpress',
      subtitle: 'Content Management System',
      description: 'A lightweight, fast content management system built for modern web applications.',
      technologies: ['Next.js', 'MongoDB', 'GraphQL', 'Vercel'],
      status: 'Completed',
      links: [
        { name: 'Live Demo', url: '#', icon: Globe },
        { name: 'GitHub', url: '#', icon: Github },
      ]
    },
    project4: {
      title: 'Amazon Clone',
      subtitle: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, payment processing, and order management.',
      technologies: ['React', 'Stripe', 'Firebase', 'Material-UI'],
      status: 'Completed',
      links: [
        { name: 'Live Demo', url: '#', icon: Globe },
        { name: 'GitHub', url: '#', icon: Github },
      ]
    }
  };

  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return <div className="p-8">Project not found</div>;
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{project.subtitle}</p>
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {project.status}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Links</h2>
          <div className="flex space-x-4">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <link.icon size={16} />
                <span>{link.name}</span>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Showcase</h2>
          <div className="bg-white rounded border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
            <p className="text-gray-500">Project screenshots and demos would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
