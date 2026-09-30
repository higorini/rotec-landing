import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FAQSection from "./FAQSection";
import { FAQ_ITEMS } from "./faq.data";

describe("FAQSection", () => {
  it("starts with the first item open and the others collapsed", () => {
    render(<FAQSection />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(FAQ_ITEMS.length);
    expect(buttons[0]).toHaveTextContent("Desentupimento");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    buttons.slice(1).forEach((button) => expect(button).toHaveAttribute("aria-expanded", "false"));
  });

  it("keeps the open item open when clicked again", () => {
    render(<FAQSection />);
    const [first] = screen.getAllByRole("button");

    fireEvent.click(first);

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-disabled", "true");
  });

  it("keeps exactly one item open", () => {
    render(<FAQSection />);
    const [first, second, third] = screen.getAllByRole("button");

    fireEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(third);
    expect(second).toHaveAttribute("aria-expanded", "false");
    expect(third).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("button").filter((button) => button.getAttribute("aria-expanded") === "true")).toHaveLength(1);
  });
});
