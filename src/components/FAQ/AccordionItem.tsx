"use client";

import type { FaqItem } from "./faq.data";

type Props = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

export default function AccordionItem({ item, open, onToggle }: Props) {
  return (
    <div className="rounded-2xl border shadow-[var(--shadow-soft)] bg-white">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="font-title font-bold text-xl sm:text-2xl">
          {item.title}
        </span>
        <span
          aria-hidden
          className={`rounded-full border w-7 h-7 grid place-items-center transition ${
            open ? "rotate-90" : ""
          }`}
        >
          ❯
        </span>
      </button>


      <div
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            <ol className="list-decimal ml-5 space-y-1 text-sm sm:text-base">
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
