import { useEffect, useState, type TransitionEvent } from "react";

const EXIT_FALLBACK_MS = 1000;

export function usePresence(open: boolean) {
  const [rendered, setRendered] = useState(open);

  if (open && !rendered) {
    setRendered(true);
  }

  useEffect(() => {
    if (open || !rendered) return;
    const timer = setTimeout(() => setRendered(false), EXIT_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [open, rendered]);

  const onTransitionEnd = (event: TransitionEvent) => {
    if (!open && event.target === event.currentTarget) setRendered(false);
  };

  return {
    rendered,
    state: open ? ("open" as const) : ("closed" as const),
    onTransitionEnd,
  };
}
