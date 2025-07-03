import { renderWithProviders } from "./utils/renderWithProviders";
import HabitItem from "../components/habits/HabitItem";
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

// Mock router and delete dialog
vi.mock("react-router-dom", async (mod) => {
  const actual = await mod();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../hooks/useDeleteDialog", () => ({
  useDeleteDialog: vi.fn(),
}));

describe("HabitItem", () => {
  const toggleHabitStatus = vi.fn();
  const habit = {
    id: "abc123",
    name: "Stretch",
    completedToday: false,
  };

  const openDeleteDialog = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useDeleteDialog.mockReturnValue({ openDeleteDialog });
  });

  test("renders habit name and checkbox", () => {
    renderWithProviders(
      <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
    );

    expect(screen.getByText("Stretch")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2); // outer + inner
  });

  test("calls toggleHabitStatus when clicked on outer wrapper", () => {
    renderWithProviders(
      <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
    );

    const wrapperCheckbox = screen.getByText("Stretch").closest('[role="checkbox"]');
    fireEvent.click(wrapperCheckbox);

    expect(toggleHabitStatus).toHaveBeenCalledWith("abc123");
  });

  test("calls toggleHabitStatus on spacebar key press", () => {
    renderWithProviders(
      <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
    );

    const wrapperCheckbox = screen.getByText("Stretch").closest('[role="checkbox"]');
    wrapperCheckbox.focus();
    fireEvent.keyDown(wrapperCheckbox, { key: " " });

    expect(toggleHabitStatus).toHaveBeenCalledWith("abc123");
  });

  test("does NOT call toggleHabitStatus when clicking Edit or Delete icons", () => {
    renderWithProviders(
      <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
    );

    fireEvent.click(screen.getByLabelText(/edit habit/i));
    fireEvent.click(screen.getByLabelText(/delete habit/i));

    expect(toggleHabitStatus).not.toHaveBeenCalled();
  });

  test("calls navigate on Edit icon click", () => {
    renderWithProviders(
      <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
    );

    fireEvent.click(screen.getByLabelText(/edit habit/i));
    expect(mockNavigate).toHaveBeenCalledWith("/settings?habitId=abc123");
  });

  test("calls openDeleteDialog on Delete icon click", () => {
    renderWithProviders(
      <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
    );

    fireEvent.click(screen.getByLabelText(/delete habit/i));
    expect(openDeleteDialog).toHaveBeenCalledWith(habit);
  });
});
