"use client";

import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { FAQ_ITEMS } from "./faq.data";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="faq"
      className="relative mx-[calc(50%-50vw)] w-screen bg-padrao text-complementary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex justify-center">
          <header className="text-center max-w-3xl mx-auto reading-box">
            <h2 className="font-display tracking-[0.2em] text-3xl sm:text-4xl reading-title">
              COMO FUNCIONA
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Clique para ver o passo a passo de cada serviço.
            </p>
          </header>
        </div>

        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto grid gap-4 sm:gap-6">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
