
import React from 'react';

interface AboutMeWindowProps {
  onClose: () => void;
}

const AboutMeWindow: React.FC<AboutMeWindowProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-7xl max-h-6xl p-4">
        {/* Photo Window */}
        <div className="absolute top-16 left-16 w-80 h-96 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gray-200 px-4 py-2 flex items-center justify-between border-b">
            <div className="flex space-x-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              />
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
            </div>
            <span className="text-sm text-gray-700">IMG_portrait.heic</span>
            <div></div>
          </div>
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* About Me Text Window */}
        <div className="absolute top-32 left-96 w-96 h-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gray-200 px-4 py-2 flex items-center justify-between border-b">
            <div className="flex space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors" />
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
            </div>
            <span className="text-sm text-gray-700">aboutme.txt</span>
            <div></div>
          </div>
          <div className="p-4 h-full overflow-y-auto text-sm text-gray-800 leading-relaxed">
            <p className="mb-4">
              Hi! I'm Shourya, a passionate computer science student with a sharp eye for innovation and a dedication to pushing the boundaries of technology.
            </p>
            <p className="mb-4">
              I am an Honors Bachelor of Science student in Computer Science at the University of Utah, with a Minor in Robotics and Mathematics. Currently engaged in cutting-edge research with the Science Research Initiative (SRI) team and interning as an AI Intern at Nihilent, I bring a strong blend of academic excellence, technical depth and real-world experience.
            </p>
            <p>
              My educational path is supported by scholarships and innovation certificates, including recognition from the School of Mining & Mineral Resources, the Health Science Design program and Machine Learning from Stanford.
            </p>
          </div>
        </div>

        {/* Additional Photo Window */}
        <div className="absolute top-20 right-32 w-72 h-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gray-200 px-4 py-2 flex items-center justify-between border-b">
            <div className="flex space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors" />
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
            </div>
            <span className="text-sm text-gray-700">IMG_lifestyle.heic</span>
            <div></div>
          </div>
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=350&h=400&fit=crop"
              alt="Lifestyle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Spotify Player */}
        <div className="absolute bottom-32 right-16 w-80 h-32 bg-gradient-to-r from-green-800 to-green-600 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-black bg-opacity-20 px-4 py-2 flex items-center justify-between border-b border-green-700">
            <div className="flex space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors" />
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
            </div>
            <span className="text-sm text-white">Spotify</span>
            <div></div>
          </div>
          <div className="p-4 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Blinding Lights</h3>
              <p className="text-green-200 text-xs">The Weeknd</p>
              <div className="flex items-center space-x-2 mt-2">
                <button 
                  onClick={() => window.open('https://open.spotify.com/track/0VjIjW4GlULA3wGRX8G7YU', '_blank')}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-1"></div>
                </button>
                <div className="flex-1 bg-gray-600 h-1 rounded-full">
                  <div className="bg-white h-1 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeWindow;
