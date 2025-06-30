import { SignoutFunc } from "@/components/navigation/company/SignoutFunc";
import { API_BASE_URL } from "@/lib/api";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockPush } from "jest.setup";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("Test CompanySignout", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("ログアウト成功時にログイン画面にリダイレクト", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<SignoutFunc />);

    fireEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/auth/company/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/auth-pages/company-signin");
    });
  });
});
