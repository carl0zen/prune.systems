import { CopyButton } from '@/components/copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language,
  filename,
  showCopy = true,
}: CodeBlockProps) {
  const hasHeader = filename || showCopy;

  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
      {hasHeader && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {filename && (
              <span className="text-xs font-mono text-white/30">
                {filename}
              </span>
            )}
            {language && !filename && (
              <span className="text-xs font-mono text-white/30">
                {language}
              </span>
            )}
          </div>
          {showCopy && <CopyButton text={code} />}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-sm text-white/80 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
