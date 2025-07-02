
import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface MacWindowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const MacWindow: React.FC<MacWindowProps> = ({ title, subtitle, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-4/5 h-4/5 max-w-6xl max-h-4xl overflow-hidden">
        {/* Window Header */}
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              />
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">{title}</h2>
              {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
            </div>
          </div>
        </div>
        
        {/* Window Content */}
        <div className="flex h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MacWindow;
