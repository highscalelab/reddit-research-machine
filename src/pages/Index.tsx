
import React from 'react';
import ResearchForm from '@/components/ResearchForm';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-10 px-4 md:py-16">
        <header className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-reddit flex items-center justify-center text-white font-bold text-xl shadow-lg">
              R
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Reddit Research Machine
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            Enter any topic to get comprehensive research results from Reddit communities
          </p>
        </header>

        <main className="pb-16">
          <ResearchForm />
        </main>

        <footer className="text-center text-gray-400 text-sm mt-auto pt-8 border-t border-gray-100">
          <p>Powered by n8n automations</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
