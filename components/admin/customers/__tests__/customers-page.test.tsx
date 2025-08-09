import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminCustomers from "@/app/admin/customers/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/admin/customers",
}));

describe("AdminCustomers", () => {
  it("renders header and filters", () => {
    render(<AdminCustomers />);
    expect(screen.getAllByText(/Customers|고객/i)[0]).toBeInTheDocument();
    expect(screen.getByTestId("customers-search")).toBeInTheDocument();
  });

  it("filters table by search input", () => {
    render(<AdminCustomers />);
    const input = screen.getByTestId("customers-search");
    fireEvent.change(input, { target: { value: "김민수" } });
    expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
  });
});
