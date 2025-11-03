import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
}

// Header padrão para seções - títulos e subtítulos
export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  maxWidth = 'lg',
  className = '',
  children,
}: SectionHeaderProps) {
  const widthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
  };

  return (
    <header className={`${centered ? 'text-center' : ''} ${widthMap[maxWidth]} ${centered ? 'mx-auto' : ''} ${className}`}>
      <h2 className="font-display tracking-[0.2em] text-3xl sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-600" style={{ marginTop: 'var(--space-md)' }}>
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}
