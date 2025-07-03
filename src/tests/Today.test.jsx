import { renderWithProviders } from "./utils/renderWithProviders";
import Today from "../pages/Today";
import { screen } from "@testing-library/react";

describe("Today Page (Guest Mode)", () => {
  test("renders the current date", () => {
    renderWithProviders(<Today />, { isGuest: true });

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    expect(screen.getByText(today)).toBeInTheDocument();
  });

  test("renders the Add Habit input", () => {
    renderWithProviders(<Today />, { isGuest: true });

    expect(screen.getByPlaceholderText(/add a habit/i)).toBeInTheDocument();
  });

  test("renders a motivational quote", () => {
    renderWithProviders(<Today />, { isGuest: true });

    const quote = screen.getByText((text, node) => {
      return (
        node?.tagName.toLowerCase() === "p" &&
        text.length > 20 &&
        node.className.includes("italic")
      );
    });

    expect(quote).toBeInTheDocument();
  });
});
