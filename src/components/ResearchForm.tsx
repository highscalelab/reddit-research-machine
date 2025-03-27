
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search } from "lucide-react";
import Loading from './Loading';
import MarkdownRenderer from './MarkdownRenderer';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
      <form onSubmit={handleSubmit} className="space-y-6 mb-10">
        <div className="flex flex-col gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Enter a research topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="pl-4 pr-10 py-3 h-12 text-base md:text-lg transition-all duration-200 focus-visible:ring-reddit border-reddit/20 focus-visible:border-reddit/40 shadow-sm"
                disabled={isLoading}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-6 bg-reddit hover:bg-reddit-dark text-white font-medium text-base transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Research
            </Button>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Source:</p>
            <RadioGroup 
              value={selectedWebhook} 
              onValueChange={(value) => setSelectedWebhook(value as keyof typeof WEBHOOKS)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="test" id="test" className="text-reddit" />
                <Label htmlFor="test" className="text-sm cursor-pointer">Test</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aiagents" id="aiagents" className="text-reddit" />
                <Label htmlFor="aiagents" className="text-sm cursor-pointer">AIagents.menu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aiagentsTest" id="aiagentsTest" className="text-reddit" />
                <Label htmlFor="aiagentsTest" className="text-sm cursor-pointer">AIagents.menu test</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </form>

      {isLoading && <Loading />}
      
      {errorDetails && (
        <Alert variant="destructive" className="mb-8 animate-fade-in">
          <AlertTitle className="text-base font-semibold">Research Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="text-sm whitespace-pre-wrap">{errorDetails}</p>
            <p className="mt-2 text-sm">Try checking your network connection or contact the administrator if the problem persists.</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
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
