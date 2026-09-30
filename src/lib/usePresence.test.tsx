import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePresence } from "./usePresence";

function Box({ open }: { open: boolean }) {
  const { rendered, state, onTransitionEnd } = usePresence(open);
  if (!rendered) return null;
  return <div data-testid="box" data-state={state} onTransitionEnd={onTransitionEnd} />;
}

describe("usePresence", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders nothing while closed", () => {
    render(<Box open={false} />);

    expect(screen.queryByTestId("box")).not.toBeInTheDocument();
  });

  it("renders open content right away", () => {
    const { rerender } = render(<Box open={false} />);

    rerender(<Box open />);

    expect(screen.getByTestId("box")).toHaveAttribute("data-state", "open");
  });

  it("keeps closing content until its transition ends", () => {
    const { rerender } = render(<Box open />);

    rerender(<Box open={false} />);
    const box = screen.getByTestId("box");
    expect(box).toHaveAttribute("data-state", "closed");

    fireEvent.transitionEnd(box);
    expect(screen.queryByTestId("box")).not.toBeInTheDocument();
  });

  it("removes closing content even without a transition event", () => {
    const { rerender } = render(<Box open />);

    rerender(<Box open={false} />);
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.queryByTestId("box")).not.toBeInTheDocument();
  });

  it("stays open when reopened during the exit", () => {
    const { rerender } = render(<Box open />);

    rerender(<Box open={false} />);
    rerender(<Box open />);
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.getByTestId("box")).toHaveAttribute("data-state", "open");
  });
});
