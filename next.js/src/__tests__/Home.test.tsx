import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  test("ホームに描画", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Top Panel",
    });
    expect(heading).toBeInTheDocument();
  });
});
