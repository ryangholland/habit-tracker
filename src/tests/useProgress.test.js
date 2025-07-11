import { renderHook } from "@testing-library/react";
import { useProgress } from "../hooks/useProgress";

describe("useProgress", () => {
  const today = new Date().toISOString().slice(0, 10);

  test("returns 0 progress when no habits", () => {
    const { result } = renderHook(() => useProgress([]));
    expect(result.current).toEqual({ completed: 0, total: 0, progress: 0 });
  });

  test("calculates correct progress values", () => {
    const habits = [
      { history: { [today]: true } },
      { history: { [today]: false } },
      { history: { [today]: true } },
    ];

    const { result } = renderHook(() => useProgress(habits));

    expect(result.current).toEqual({
      completed: 2,
      total: 3,
      progress: 67,
    });
  });

  test("rounds down when needed", () => {
    const habits = [
      { history: { [today]: true } },
      { history: { [today]: false } },
    ];

    const { result } = renderHook(() => useProgress(habits));

    expect(result.current.progress).toBe(50);
  });
});
