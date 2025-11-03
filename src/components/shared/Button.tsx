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

  const sizeMap = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    rounded-[var(--radius-xl)]
    font-semibold
    transition
    focus-visible:outline-2
    focus-visible:outline-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantMap[variant]}
    ${sizeMap[size]}
    ${loading ? 'opacity-70 pointer-events-none' : ''}
    ${className}
  `;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (asLink) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
