import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'dark' | 'light';
  className?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  maxWidth = 'lg',
  tone = 'dark',
  className = '',
  children,
}: SectionHeaderProps) {
  const widthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
  };

  const subtitleColor = tone === 'light' ? 'text-secondary/80' : 'text-gray-600';

  return (
    <header className={`${centered ? 'text-center' : ''} ${widthMap[maxWidth]} ${centered ? 'mx-auto' : ''} ${className}`}>
      <h2 className="font-display tracking-[0.2em] text-3xl sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm sm:text-base ${subtitleColor}`} style={{ marginTop: 'var(--space-md)' }}>
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}
