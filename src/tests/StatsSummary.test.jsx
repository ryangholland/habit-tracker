import { renderWithProviders } from "./utils/renderWithProviders";
import StatsSummary from "../components/stats/StatsSummary";
import { screen } from "@testing-library/react";

describe("StatsSummary", () => {
  test("renders all the summary sections", () => {
    renderWithProviders(<StatsSummary />, { isGuest: true });

    expect(screen.getByText(/most completed habit/i)).toBeInTheDocument();
    expect(screen.getByText(/longest streak/i)).toBeInTheDocument();
    expect(screen.getByText(/longest active streak/i)).toBeInTheDocument();
    expect(
      screen.getByText(/average daily completion rate/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/total habit completions/i)).toBeInTheDocument();
  });
});
