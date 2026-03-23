import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AddProductForm from "./AddProductForm";
import { apiCreateProduct } from "../../../../services/api/warehouseApi";

vi.mock("../../../../services/api/warehouseApi", () => ({
  apiCreateProduct: vi.fn(),
}));

describe("AddProductForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the toggle button and expands the form", () => {
    render(<AddProductForm onProductCreated={vi.fn()} />);

    const toggle = screen.getByRole("button", { name: /add product/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText(/product title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/refill threshold/i)).toBeInTheDocument();
    expect(screen.getByText(/supply status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/storage location/i)).toBeInTheDocument();
  });

  it("shows validation messages on submit when required fields are missing", () => {
    render(<AddProductForm onProductCreated={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));
    const submitButton = screen.getByRole("button", { name: /save product/i });
    fireEvent.submit(submitButton.closest("form") as HTMLFormElement);

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Quantity must be a positive number")).toBeInTheDocument();
    expect(screen.getByText("Supply status must be selected")).toBeInTheDocument();
    expect(screen.getByText("Storage location must be selected")).toBeInTheDocument();
  });

  it("submits valid values and clears errors", async () => {
    const onProductCreated = vi.fn();
    vi.mocked(apiCreateProduct).mockResolvedValueOnce({
      _id: "1",
      title: "Milk",
      quantity: 3,
      supplyStatus: true,
      storageLocation: "warehouse-a",
      refillThreshold: 2,
    });

    render(<AddProductForm onProductCreated={onProductCreated} />);

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    fireEvent.change(screen.getByLabelText(/product title/i), {
      target: { value: "Milk" },
    });
    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/refill threshold/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByLabelText(/in stock/i));
    fireEvent.change(screen.getByLabelText(/storage location/i), {
      target: { value: "warehouse-a" },
    });

    const submitButton = screen.getByRole("button", { name: /save product/i });
    fireEvent.submit(submitButton.closest("form") as HTMLFormElement);

    await waitFor(() => {
      expect(apiCreateProduct).toHaveBeenCalled();
      expect(onProductCreated).toHaveBeenCalled();
    });
    expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
  });
});
