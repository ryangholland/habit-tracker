import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IconButton from "../components/common/IconButton";
import { FaCog } from "react-icons/fa";

test("renders icon button with label and handles click", async () => {
  const handleClick = vi.fn();

  render(
    <IconButton
      label="Edit Habit"
      icon={FaCog}
      className="test-class"
      onClick={handleClick}
    />
  );

  const button = screen.getByRole("button", { name: /edit habit/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("test-class");

  await userEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
