
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <div className={cn("markdown-content prose prose-neutral dark:prose-invert max-w-none p-8 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg", className)}>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
