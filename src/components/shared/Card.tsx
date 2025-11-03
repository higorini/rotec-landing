import { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  title?: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'interactive' | 'border';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Card base com suporte a variantes e tamanhos
export default function Card({
  children,
  title,
  icon,
  onClick,
  variant = 'default',
  className = '',
  size = 'md',
}: CardProps) {
  const paddingMap = {
    sm: 'var(--space-md)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
  };

  const variantMap = {
    default: 'bg-white border shadow-[var(--shadow-soft)]',
    interactive: 'bg-secondary border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition cursor-pointer',
    border: 'border-2 shadow-sm',
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`rounded-[var(--radius-xl)] ${variantMap[variant]} ${className}`}
      style={{ padding: paddingMap[size] }}
    >
      {icon && <div style={{ marginBottom: 'var(--space-md)' }}>{icon}</div>}
      {title && <h3 className="font-title font-bold text-lg" style={{ marginBottom: 'var(--space-sm)' }}>{title}</h3>}
      {children}
    </div>
  );
}
