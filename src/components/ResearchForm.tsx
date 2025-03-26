
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loading from './Loading';
import MarkdownRenderer from './MarkdownRenderer';

const WEBHOOKS = {
  test: "https://automations.highscalelab.com/webhook-test/88b52e1f-64bb-4148-95e3-6cae9dfc2aab",
  aiagents: "https://lab.aiagents.menu/webhook/88b52e1f-64bb-4148-95e3-6cae9dfc2aab",
  aiagentsTest: "https://lab.aiagents.menu/webhook-test/88b52e1f-64bb-4148-95e3-6cae9dfc2aab"
};

const ResearchForm: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [selectedWebhook, setSelectedWebhook] = useState<keyof typeof WEBHOOKS>("test");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast.error("Please enter a research topic");
      return;
    }

    setIsLoading(true);
    setErrorDetails(null);
    
    const webhookUrl = WEBHOOKS[selectedWebhook];
    
    try {
      console.log(`Sending request to webhook (${selectedWebhook}):`, webhookUrl);
      console.log("Request payload:", { topic });
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
      }
      
      const data = await response.text();
      console.log("Response data received, length:", data.length);
      
      if (!data || data.trim() === '') {
        throw new Error("Received empty response from the server");
      }
      
      setResults(prev => [data, ...prev]);
      toast.success("Research completed successfully!");
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorDetails(errorMessage);
      toast.error("Failed to complete research. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col gap-3">
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
          
          <div className="flex justify-end">
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-600">Source:</span>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="webhook"
                  checked={selectedWebhook === "test"}
                  onChange={() => setSelectedWebhook("test")}
                  className="text-reddit"
                />
                <span>Test</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="webhook"
                  checked={selectedWebhook === "aiagents"}
                  onChange={() => setSelectedWebhook("aiagents")}
                  className="text-reddit"
                />
                <span>AIagents.menu</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="webhook"
                  checked={selectedWebhook === "aiagentsTest"}
                  onChange={() => setSelectedWebhook("aiagentsTest")}
                  className="text-reddit"
                />
                <span>AIagents.menu test</span>
              </label>
            </div>
          </div>
        </div>
      </form>

      {isLoading && <Loading />}
      
      {errorDetails && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-md text-red-700">
          <h3 className="font-semibold mb-1">Error Details:</h3>
          <p className="text-sm whitespace-pre-wrap">{errorDetails}</p>
          <p className="mt-2 text-sm">Try checking your network connection or contact the n8n administrator if the problem persists.</p>
        </div>
      )}

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
