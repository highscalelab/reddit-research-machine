
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <div className={cn("markdown-content prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
