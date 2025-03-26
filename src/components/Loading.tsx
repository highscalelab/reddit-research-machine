
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-8">
      <div className="flex space-x-2">
        {[1, 2, 3].map((_, index) => (
          <div 
            key={index}
            className="h-3 w-3 rounded-full bg-reddit"
            style={{
              animation: 'pulse-subtle 1.5s ease-in-out infinite',
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
