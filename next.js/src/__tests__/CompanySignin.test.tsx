import { SigninForm } from "@/app/auth/company-signin/components/SigninForm/SigninForm";
import { useCompanySignin } from "@/hooks/company/useCompanySignin";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { mockAlert, mockPush } from "jest.setup";

jest.mock("@/hooks/company/useCompanySignin", () => ({
  useCompanySignin: jest.fn(),
}));

describe("Test CompanySignin", () => {
  const fillAndSubmitForm = (username: string, password: string) => {
    act(() => {
      fireEvent.change(screen.getByLabelText("企業ID"), {
        target: { value: username },
      });
      fireEvent.change(screen.getByLabelText("パスワード"), {
        target: { value: password },
      });
      fireEvent.click(screen.getByRole("button", { name: "ログイン" }));
    });
  };

  const mockTrigger = jest.fn();

  beforeEach(() => {
    (useCompanySignin as jest.Mock).mockReturnValue({
      trigger: mockTrigger,
    });

    mockPush.mockClear();
    mockTrigger.mockClear();
  });

  test('ログイン成功時に"/company/inbox"にリダイレクト', async () => {
    mockTrigger.mockResolvedValue(true);

    render(<SigninForm />);

    fillAndSubmitForm("test_company", "test_password");

    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith({
        username: "test_company",
        password: "test_password",
      });
    });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/company/inbox");
    });
  });

  test("ログイン失敗時にアラート表示", async () => {
    const errorMessage = "ログインができませんでした";
    mockTrigger.mockRejectedValue({ info: { message: errorMessage } });

    render(<SigninForm />);

    fillAndSubmitForm("invalid_company", "invalid_password");

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(errorMessage);
    });
  });
});
