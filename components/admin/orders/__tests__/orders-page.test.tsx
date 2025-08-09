import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminOrders from "@/app/admin/orders/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/admin/orders",
}));

describe("AdminOrders", () => {
  it("renders header and filters", () => {
    render(<AdminOrders />);
    expect(screen.getAllByText(/Orders|주문/i)[0]).toBeInTheDocument();
    expect(screen.getByTestId("orders-search")).toBeInTheDocument();
  });

  it("updates status via select", () => {
    render(<AdminOrders />);
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThan(0);
    fireEvent.change(selects[0], { target: { value: "shipped" } });
  });
});
