import { renderHook } from "@testing-library/react";
import { useToggleHabitStatus } from "../hooks/useToggleHabitStatus";
import { vi } from "vitest";
import { supabase } from "../supabaseClient";

// mock Supabase methods
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }), // ✅ FIXED
    update: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ error: null }),
  },
}));

describe("useToggleHabitStatus", () => {
  const isoDate = "2025-07-03";
  const mockHabits = [
    {
      id: "abc",
      completedToday: false,
      history: { [isoDate]: false },
    },
  ];
  const setHabits = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("toggles habit in guest mode and updates localStorage", async () => {
    const { result } = renderHook(() =>
      useToggleHabitStatus({
        habits: mockHabits,
        setHabits,
        isGuest: true,
      })
    );

    await result.current("abc", isoDate);

    expect(setHabits).toHaveBeenCalled();
    const updated = JSON.parse(localStorage.getItem("guest_habits"));
    expect(updated).toBeTruthy();
  });

  test("inserts new habit history in Supabase when none exists", async () => {
    const { result } = renderHook(() =>
      useToggleHabitStatus({
        habits: mockHabits,
        setHabits,
        isGuest: false,
      })
    );

    await result.current("abc", isoDate);

    expect(supabase.insert).toHaveBeenCalled();
    expect(setHabits).toHaveBeenCalled();
  });
});
