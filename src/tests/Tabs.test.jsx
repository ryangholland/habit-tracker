import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Tabs from "./Tabs";

test("renders navigation links for Today, Stats, and Settings", () => {
  render(
    <MemoryRouter>
      <Tabs />
    </MemoryRouter>
  );

  expect(screen.getByText("Today")).toBeInTheDocument();
  expect(screen.getByText("Stats")).toBeInTheDocument();
  expect(screen.getByText("Settings")).toBeInTheDocument();
});

test("highlights active link", () => {
  render(
    <MemoryRouter initialEntries={["/stats"]}>
      <Tabs />
    </MemoryRouter>
  );

  const statsTab = screen.getByText("Stats");
  expect(statsTab).toHaveClass("text-white");
});
