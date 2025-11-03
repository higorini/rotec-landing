interface CloseButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

// Botão fechar padrão
export default function CloseButton({
  onClick,
  label = 'Fechar',
  className = '',
}: CloseButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`rounded-full border w-9 h-9 grid place-items-center hover:bg-gray-100 transition ${className}`}
    >
      ✕
    </button>
  );
}
