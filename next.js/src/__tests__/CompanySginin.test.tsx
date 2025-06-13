import { SigninForm } from "@/app/auth/user-signin/components/SigninForm";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation");

describe("Test CompanySignin", () => {
  test("render from with 1 button", async () => {
    render(<SigninForm />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });
});
