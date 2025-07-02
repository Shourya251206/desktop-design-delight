
import React from 'react';
import { Folder, FileText, User, Trash } from 'lucide-react';

interface ProjectSidebarProps {
  activeProject: string;
  onSectionClick: (section: string) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ activeProject, onSectionClick }) => {
  const sections = [
    { id: 'work', name: 'Work', icon: Folder },
    { id: 'about', name: 'About Me', icon: User },
    { id: 'resume', name: 'Resume', icon: FileText },
    { id: 'trash', name: 'Trash', icon: Trash },
  ];

  const projects = [
    { id: 'project1', name: 'Project 01' },
    { id: 'project2', name: 'Project 02' },
    { id: 'project3', name: 'Project 03' },
    { id: 'project4', name: 'Project 04' },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Section Header
        </h3>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded"
              >
                <section.icon size={16} />
                <span>{section.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Section Header
        </h3>
        <ul className="space-y-1">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                onClick={() => onSectionClick(project.id)}
                className={`w-full flex items-center space-x-2 px-2 py-1 text-sm rounded ${
                  activeProject === project.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Folder size={16} />
                <span>{project.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectSidebar;
