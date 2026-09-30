import "@testing-library/jest-dom/vitest";
import { createElement, type ImgHTMLAttributes } from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

const NEXT_IMAGE_PROPS = ["fill", "priority", "unoptimized"];

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown>) =>
    createElement(
      "img",
      Object.fromEntries(Object.entries(props).filter(([key]) => !NEXT_IMAGE_PROPS.includes(key)))
    ),
}));

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});
