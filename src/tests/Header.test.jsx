import { screen } from "@testing-library/react";
import Header from "../layouts/Header";
import { renderWithProviders } from "./utils/renderWithProviders";

describe("Header", () => {
  test("renders app title", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("Daily Habit Tracker")).toBeInTheDocument();
  });

  test("renders user avatar button", () => {
    renderWithProviders(<Header />);
    const buttons = screen.getAllByRole("button", { hidden: true });
    expect(buttons.length).toBeGreaterThan(0);
  });
});
