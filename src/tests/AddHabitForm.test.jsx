import { screen, fireEvent, waitFor } from "@testing-library/react";
import AddHabitForm from "../components/habits/AddHabitForm";
import { renderWithProviders } from "./utils/renderWithProviders";

vi.mock("../supabaseClient");

describe("AddHabitForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("adds a new habit in guest mode and updates localStorage", () => {
    renderWithProviders(<AddHabitForm />, { isGuest: true });

    const input = screen.getByPlaceholderText(/add a habit/i);
    fireEvent.change(input, { target: { value: "Read" } });
    fireEvent.submit(input);

    expect(input).toHaveValue("");

    const stored = JSON.parse(localStorage.getItem("guest_habits"));
    expect(stored.some((h) => h.name === "Read")).toBe(true);
  });

  test("adds a new habit in Supabase mode", async () => {
    renderWithProviders(<AddHabitForm />, {
      isGuest: false,
      user: { id: "user-1" },
    });

    const input = await screen.findByPlaceholderText(/add a habit/i);
    fireEvent.change(input, { target: { value: "Workout" } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  test("does not add habit if input is empty", () => {
    renderWithProviders(<AddHabitForm />, { isGuest: true });

    const input = screen.getByPlaceholderText(/add a habit/i);

    const before =
      JSON.parse(localStorage.getItem("guest_habits"))?.length || 0;

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(input);

    const after = JSON.parse(localStorage.getItem("guest_habits"))?.length || 0;

    expect(after).toBe(before);
  });
});
