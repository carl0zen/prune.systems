interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
