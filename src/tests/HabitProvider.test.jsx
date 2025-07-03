import { renderWithProviders } from "./utils/renderWithProviders";
import { HabitContext } from "../context/HabitContext";
import { screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import { supabase } from "../supabaseClient";

vi.mock("../supabaseClient", async () => {
  const actual = await vi.importActual("../supabaseClient");
  return {
    ...actual,
    supabase: {
      ...actual.supabase,
      auth: {
        getSession: vi.fn(),
        onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
    },
  };
});

describe("HabitProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loads default habits in guest mode", async () => {
    renderWithProviders(
      <HabitContext.Consumer>
        {({ habits }) => (
          <div>
            {habits.map((h) => (
              <div key={h.id}>{h.name}</div>
            ))}
          </div>
        )}
      </HabitContext.Consumer>,
      { isGuest: true }
    );

    await waitFor(() => {
      expect(screen.getByText("Drink Water")).toBeInTheDocument();
      expect(screen.getByText("Stretch")).toBeInTheDocument();
      expect(screen.getByText("Read")).toBeInTheDocument();
    });
  });

  test("clears habits if no user is logged in", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({
      data: { session: null },
    });

    renderWithProviders(
      <HabitContext.Consumer>
        {({ habits }) => <div>Count: {habits.length}</div>}
      </HabitContext.Consumer>,
      { isGuest: false, user: null }
    );

    await waitFor(() => {
      expect(screen.getByText("Count: 0")).toBeInTheDocument();
    });
  });
});
