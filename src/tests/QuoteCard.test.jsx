import { render, screen } from "@testing-library/react";
import QuoteCard from "../components/habits/QuoteCard";
import * as quoteUtils from "../utils/quotes";

describe("QuoteCard", () => {
  test("displays the quote of the day", () => {
    const mockQuote =
      "Discipline is the bridge between goals and accomplishment.";
    vi.spyOn(quoteUtils, "getQuoteOfTheDay").mockReturnValue(mockQuote);

    render(<QuoteCard />);
    expect(screen.getByText(mockQuote)).toBeInTheDocument();
  });
});
