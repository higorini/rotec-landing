'use client';

import { useEffect, useId, ReactNode } from 'react';
import { usePresence } from '@/lib/usePresence';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
}: ModalProps) {
  const titleId = useId();
  const { rendered, state, onTransitionEnd } = usePresence(open);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!rendered) return null;

  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
  };

  return (
    <div
      className="motion-backdrop fixed inset-0 z-[var(--z-modal)] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      data-state={state}
      onTransitionEnd={onTransitionEnd}
      inert={state === 'closed'}
      aria-hidden={state === 'closed' || undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      onClick={() => closeOnBackdrop && onClose()}
    >
      <article
        data-state={state}
        className={`motion-pop max-h-[90svh] w-full ${sizeMap[size]} rounded-[var(--radius-xl)] bg-secondary text-complementary shadow-[var(--shadow-hover)] overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <header className="flex items-center justify-between gap-4 border-b border-gray-200" style={{ padding: 'var(--space-lg)' }}>
            {title && (
              <h3 id={titleId} className="font-title text-xl sm:text-2xl font-bold">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                aria-label="Fechar"
                onClick={onClose}
                className="shrink-0 rounded-full border w-9 h-9 grid place-items-center hover:bg-gray-100 transition"
              >
                ✕
              </button>
            )}
          </header>
        )}
        <div style={{ padding: 'var(--space-lg)' }}>{children}</div>
      </article>
    </div>
  );
}
