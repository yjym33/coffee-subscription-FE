import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminSubscriptions from "@/app/admin/subscriptions/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/admin/subscriptions",
}));

describe("AdminSubscriptions", () => {
  it("renders header and filters", () => {
    render(<AdminSubscriptions />);
    expect(screen.getAllByText(/Subscriptions|구독/i)[0]).toBeInTheDocument();
    expect(screen.getByTestId("subscriptions-search")).toBeInTheDocument();
  });

  it("filters by status", () => {
    render(<AdminSubscriptions />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "active" } });
  });
});
