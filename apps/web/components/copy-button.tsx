'use client';

import { useState, useCallback } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy text to clipboard');
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`
        text-xs font-mono px-3 py-1.5 rounded border transition-colors
        ${copied
          ? 'text-accent border-accent/30 bg-accent/10'
          : 'text-white/40 border-white/10 hover:text-white/60 hover:border-white/20 hover:bg-white/[0.03]'
        }
        ${className}
      `}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
