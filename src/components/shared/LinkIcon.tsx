import Image from 'next/image';
import { ReactNode } from 'react';

interface LinkIconProps {
  href: string;
  icon?: ReactNode;
  iconSrc?: string;
  label: string;
  title?: string;
  className?: string;
}

// Link com ícone (lucide ou imagem)
export default function LinkIcon({
  href,
  icon,
  iconSrc,
  label,
  title,
  className = '',
}: LinkIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={title || label}
      className={`flex items-center gap-2 hover:opacity-80 transition ${className}`}
    >
      {icon && <span className="h-5 w-5">{icon}</span>}
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={label}
          width={20}
          height={20}
          className="h-5 w-5"
        />
      )}
      {label}
    </a>
  );
}
