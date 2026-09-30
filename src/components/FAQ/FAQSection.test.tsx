import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FAQSection from "./FAQSection";
import { FAQ_ITEMS } from "./faq.data";

describe("FAQSection", () => {
  it("renders one collapsed item per FAQ entry", () => {
    render(<FAQSection />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(FAQ_ITEMS.length);
    buttons.forEach((button) => expect(button).toHaveAttribute("aria-expanded", "false"));
  });

  it("keeps only one item open at a time", () => {
    render(<FAQSection />);
    const [first, second] = screen.getAllByRole("button");

    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });
});
