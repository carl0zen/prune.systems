import { CopyButton } from '@/components/copy-button';

interface PromptBlockProps {
  title: string;
  description?: string;
  prompt: string;
}

export function PromptBlock({
  title,
  description,
  prompt,
}: PromptBlockProps) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-white/90">
            {title}
          </span>
          {description && (
            <span className="text-xs text-white/40">
              {description}
            </span>
          )}
        </div>
        <CopyButton text={prompt} />
      </div>
      <pre className="p-5 text-sm font-mono text-white/60 whitespace-pre-wrap leading-relaxed">
        {prompt}
      </pre>
    </div>
  );
}
