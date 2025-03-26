
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loading from './Loading';
import MarkdownRenderer from './MarkdownRenderer';

const WEBHOOK_URL = "https://automations.highscalelab.com/webhook-test/88b52e1f-64bb-4148-95e3-6cae9dfc2aab";

const ResearchForm: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast.error("Please enter a research topic");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.text();
      setResults(prev => [data, ...prev]);
      toast.success("Research completed successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to complete research. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Enter a research topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-grow text-base transition-all duration-200 focus-visible:ring-reddit border-reddit/20 focus-visible:border-reddit/40"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-reddit hover:bg-reddit-dark text-white transition-colors duration-300"
          >
            Research
          </Button>
        </div>
      </form>

      {isLoading && <Loading />}

      <div className="space-y-6">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="result-card animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <MarkdownRenderer content={result} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchForm;
