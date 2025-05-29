import { renderHook } from "@testing-library/react";
import { useProgress } from "./useProgress";

test("calculates progress correctly", () => {
  const habits = [
    { completedToday: true },
    { completedToday: false },
    { completedToday: true },
  ];

  const { result } = renderHook(() => useProgress(habits));

  expect(result.current).toEqual({
    completed: 2,
    total: 3,
    progress: 67,
  });
});
