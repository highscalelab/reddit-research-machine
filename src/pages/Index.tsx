
import React from 'react';
import ResearchForm from '@/components/ResearchForm';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-12 px-4 md:py-20">
        <header className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-reddit flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-transform duration-300 hover:scale-105">
              R
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
            Reddit Research Machine
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance text-lg md:text-xl">
            Enter any topic to get comprehensive research results from Reddit communities
          </p>
        </header>

        <main className="pb-16 max-w-4xl mx-auto">
          <ResearchForm />
        </main>

        <footer className="text-center text-gray-400 text-sm mt-auto pt-8 border-t border-gray-100">
          <p className="py-3">Powered by n8n automations</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
