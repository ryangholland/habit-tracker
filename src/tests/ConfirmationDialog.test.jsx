import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { vi } from "vitest";

describe("ConfirmationDialog", () => {
  const baseProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Test Title",
    message: "Are you sure?",
    confirmLabel: "Yes, do it",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders title and message", () => {
    render(<ConfirmationDialog {...baseProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Yes, do it")).toBeInTheDocument();
  });

  test("calls onClose when Cancel button is clicked", () => {
    render(<ConfirmationDialog {...baseProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  test("calls onConfirm when Confirm button is clicked", () => {
    render(<ConfirmationDialog {...baseProps} />);
    fireEvent.click(screen.getByText("Yes, do it"));
    expect(baseProps.onConfirm).toHaveBeenCalled();
  });

  test("does not render when isOpen is false", () => {
    render(<ConfirmationDialog {...baseProps} isOpen={false} />);
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });
});
