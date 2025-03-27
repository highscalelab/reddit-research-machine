
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-10 animate-fade-in">
      <div className="flex space-x-3">
        {[1, 2, 3].map((_, index) => (
          <div 
            key={index}
            className="h-4 w-4 rounded-full bg-reddit/80"
            style={{
              animation: 'pulse-subtle 1.5s ease-in-out infinite',
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
      </div>
      <p className="absolute -bottom-2 text-sm text-gray-500 font-medium">Researching...</p>
    </div>
  );
};

export default Loading;
