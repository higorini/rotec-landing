import { ReactNode } from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  loading?: boolean;
  asLink?: boolean;
  href?: string;
}

// Botão com variantes e tamanhos
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  asLink = false,
  href = '#',
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantMap = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-secondary text-primary border hover:bg-gray-100',
    outline: 'border border-white text-white hover:bg-white/10',
    ghost: 'text-primary hover:opacity-70',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const baseClasses = `
    rounded-[var(--radius-xl)]
    font-semibold
    transition
    focus-visible:outline-2
    focus-visible:outline-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantMap[variant]}
    ${sizeClasses[size]}
    ${loading ? 'opacity-70 pointer-events-none' : ''}
    ${className}
  `;

  const paddingStyle = {
    sm: { padding: 'var(--space-sm) var(--space-md)' },
    md: { padding: 'var(--space-md) var(--space-lg)' },
    lg: { padding: 'calc(var(--space-md) + 0.25rem) calc(var(--space-lg) + 0.5rem)' },
  } as const;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (asLink) {
    return (
      <a href={href} className={baseClasses} style={paddingStyle[size]}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      style={paddingStyle[size]}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
