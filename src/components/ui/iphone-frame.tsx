
import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-80 h-[600px] bg-black rounded-[40px] p-3 shadow-2xl relative ${className}`}>
      {/* iPhone notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-10"></div>
      
      <div className="w-full h-full bg-white rounded-[36px] overflow-hidden relative">
        {/* Status Bar */}
        <div className="h-6 bg-gray-100 flex items-center justify-between px-6">
          <div className="text-xs font-medium">9:41</div>
          <div className="flex space-x-1">
            <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-4 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {children}

        {/* Navigation Bar - iPhone style */}
        <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-center space-x-12">
          <button className="p-2 text-gray-600">←</button>
          <button className="p-2 text-gray-600 text-xl">⦿</button>
          <button className="p-2 text-gray-600">≡</button>
        </div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
