
import React from 'react';

const AuroraBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0c] text-white">
      {/* Moving Blobs */}
      <div 
        className="aurora-blob w-[500px] h-[500px] bg-indigo-600 top-[-100px] left-[-100px]" 
        style={{ animation: 'aurora-1 20s infinite alternate ease-in-out' }}
      />
      <div 
        className="aurora-blob w-[600px] h-[600px] bg-purple-700 bottom-[-150px] right-[-100px]" 
        style={{ animation: 'aurora-2 25s infinite alternate-reverse ease-in-out' }}
      />
      <div 
        className="aurora-blob w-[400px] h-[400px] bg-cyan-500 top-[20%] right-[10%]" 
        style={{ animation: 'aurora-1 30s infinite alternate ease-in-out' }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;
