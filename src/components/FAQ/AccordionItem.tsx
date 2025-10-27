"use client";

import { useEffect, useRef, useState } from "react";
import type { FaqItem } from "./faq.data";

type Props = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

export default function AccordionItem({ item, open, onToggle }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    
    const content = el.querySelector("[data-acc-content]") as HTMLElement | null;
    setHeight(content ? content.offsetHeight : 0);
  }, [open]);

  return (
    <div className="rounded-2xl border shadow-[var(--shadow-soft)] bg-white">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="font-title font-bold text-xl sm:text-2xl">
          {open ? "▾" : "▸"} {item.title}
        </span>
        <span
          aria-hidden
          className={`rounded-full border w-7 h-7 grid place-items-center transition ${
            open ? "rotate-180" : ""
          }`}
        >
          ❯
        </span>
      </button>

      
      <div
        ref={panelRef}
        style={{ height: open ? height : 0 }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div data-acc-content className="px-5 pb-5">
          <ol className="list-decimal ml-5 space-y-1 text-sm sm:text-base">
            {item.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
