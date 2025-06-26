import { SignupForm } from "@/app/auth-pages/company-signup/components/SignupForm/SignupForm";
import { useCompanySignup } from "@/hooks/company/useCompanySignup";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { mockAlert, mockPush } from "jest.setup";

jest.mock("@/hooks/company/useCompanySignup", () => ({
  useCompanySignup: jest.fn(),
}));

describe("Test CompanySignup", () => {
  const mockTrigger = jest.fn();

  const fillAndSubmitForm = (
    name: string,
    password: string,
    confirmedPassword: string,
  ) => {
    act(() => {
      fireEvent.change(screen.getByLabelText("企業ID"), {
        target: { value: name },
      });
      fireEvent.change(screen.getByLabelText("パスワード"), {
        target: { value: password },
      });
      fireEvent.change(screen.getByLabelText("パスワード（確認用）"), {
        target: { value: confirmedPassword },
      });
      fireEvent.click(screen.getByRole("button", { name: "登録" }));
    });
  };

  beforeEach(() => {
    (useCompanySignup as jest.Mock).mockReturnValue({
      trigger: mockTrigger,
    });
    mockTrigger.mockClear();
  });

  test("新規登録時に/company/inboxにリダイレクト", async () => {
    mockTrigger.mockResolvedValue(true);

    render(<SignupForm />);

    fillAndSubmitForm("test_company", "test_password", "test_password");

    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith({
        name: "test_company",
        password: "test_password",
        confirmedPassword: "test_password",
      });
    });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/company/inbox");
    });
  });

  test("新規登録時に重複エラー発生に伴いアラート表示", async () => {
    const errorMessage = "企業IDはすでに登録されています";
    mockTrigger.mockRejectedValue({ info: { message: errorMessage } });

    render(<SignupForm />);

    fillAndSubmitForm("existing_company", "test_password", "test_password");

    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith({
        name: "existing_company",
        password: "test_password",
        confirmedPassword: "test_password",
      });
      expect(mockPush).not.toHaveBeenCalledWith();
      expect(mockAlert).toHaveBeenCalledWith(errorMessage);
    });
  });

  test("バリデーションエラーの確認（未入力）", async () => {
    render(<SignupForm />);

    fillAndSubmitForm("", "", "");

    await waitFor(() => {
      expect(screen.getByText("企業IDの入力は必須です")).toBeInTheDocument();
      expect(
        screen.getByText("パスワードの入力は必須です"),
      ).toBeInTheDocument();
    });
  });

  test("バリデーションエラーの確認（パスワードの不一致）", async () => {
    render(<SignupForm />);

    fillAndSubmitForm("test_company", "test_password", "different_password");

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
    });
  });
});
