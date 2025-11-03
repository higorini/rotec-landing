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
  const sizeMap = {
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-6',
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
      className={`rounded-[var(--radius-xl)] ${variantMap[variant]} ${sizeMap[size]} ${className}`}
    >
      {icon && <div className="mb-3">{icon}</div>}
      {title && <h3 className="font-title font-bold text-lg mb-2">{title}</h3>}
      {children}
    </div>
  );
}
