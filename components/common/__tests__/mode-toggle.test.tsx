import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModeToggle } from "../mode-toggle";

const setTheme = jest.fn();
jest.mock("next-themes", () => ({
  useTheme: () => ({ setTheme }),
}));

describe("ModeToggle", () => {
  it("changes theme when menu items are clicked", async () => {
    render(<ModeToggle />);
    const user = userEvent.setup();
    const trigger = screen.getByRole("button", { name: /toggle theme/i });

    await user.click(trigger);
    await user.click(screen.getByText(/Light|라이트/));
    expect(setTheme).toHaveBeenCalledWith("light");
    setTheme.mockClear();

    await user.click(trigger);
    await user.click(screen.getByText(/Dark|다크/));
    expect(setTheme).toHaveBeenCalledWith("dark");
    setTheme.mockClear();

    await user.click(trigger);
    await user.click(screen.getByText(/System|시스템/));
    expect(setTheme).toHaveBeenCalledWith("system");
  });
});
