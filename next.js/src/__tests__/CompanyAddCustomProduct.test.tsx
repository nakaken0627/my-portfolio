import { AddCustomProduct } from "@/app/company/products/components/AddCustomProduct/AddCustomProduct";
import { useFetchCompanyProducts } from "@/hooks/company/useFetchCompanyProducts";
import { useFetchUsers } from "@/hooks/company/useFetchUsers";
import { usePostCustomProducts } from "@/hooks/company/usePostCustomProducts";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

jest.mock("@/hooks/company/useFetchCompanyProducts", () => ({
  useFetchCompanyProducts: jest.fn(),
}));
jest.mock("@/hooks/company/useFetchUsers", () => ({
  useFetchUsers: jest.fn(),
}));
jest.mock("@/hooks/company/usePostCustomProducts", () => ({
  usePostCustomProducts: jest.fn(),
}));

const mockProducts = [
  {
    id: 1,
    name: "テスト商品A",
    modelNumber: "MODEL-A-001",
    price: 1000,
    description: "テスト商品Aの説明",
  },
  {
    id: 2,
    name: "テスト商品B",
    modelNumber: "MODEL-B-001",
    price: 2000,
    description: "テスト商品Bの説明",
  },
];

const mockUsers = [
  { id: 101, name: "テストユーザーA" },
  { id: 102, name: "テストユーザーB" },
];

describe("Test CompanyAddCustomProduct.test", () => {
  const mockTrigger = jest.fn();

  beforeEach(() => {
    (useFetchCompanyProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      isErrorProducts: false,
      isLoadingProducts: false,
    });
    (useFetchUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      isErrorUsers: false,
      isLoadingUsers: false,
    });
    (usePostCustomProducts as jest.Mock).mockReturnValue({
      trigger: mockTrigger,
    });

    mockTrigger.mockClear();
  });

  test("商品ID選択で関連情報を自動入力", async () => {
    render(<AddCustomProduct />);

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "商品ID" }));
    fireEvent.click(await screen.findByText("1-テスト商品A"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "商品名" })).toHaveValue(
        "テスト商品A",
      );
      expect(screen.getByRole("textbox", { name: "型番" })).toHaveValue(
        "MODEL-A-001",
      );
      expect(screen.getByRole("spinbutton", { name: "個別単価" })).toHaveValue(
        1000,
      );
      expect(screen.getByRole("textbox", { name: "説明" })).toHaveValue(
        "テスト商品Aの説明",
      );
    });
  });

  test("ユーザーIDを検索して、関連情報を表示", async () => {
    render(<AddCustomProduct />);

    fireEvent.change(screen.getByRole("spinbutton", { name: "ユーザーID" }), {
      target: { value: "101" },
    });

    await waitFor(() => {
      expect(
        screen.queryByText("ユーザー名 : テストユーザーA"),
      ).toBeInTheDocument();
    });
  });

  test("個別商品の登録", async () => {
    mockTrigger.mockResolvedValue(true);

    render(<AddCustomProduct />);

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "商品ID" }));
    fireEvent.click(await screen.findByText("1-テスト商品A"));
    fireEvent.change(screen.getByRole("spinbutton", { name: "ユーザーID" }), {
      target: { value: "101" },
    });

    act(() => {
      fireEvent.change(screen.getByRole("textbox", { name: "商品名" }), {
        target: { value: "テスト商品A-1" },
      });
      fireEvent.change(screen.getByRole("textbox", { name: "型番" }), {
        target: { value: "MODEL-A-001-C1" },
      });
      fireEvent.change(screen.getByRole("spinbutton", { name: "個別単価" }), {
        target: { value: "1200" },
      });
      fireEvent.change(screen.getByLabelText("適用開始日"), {
        target: { value: "2025-06-01" },
      });
      fireEvent.change(screen.getByLabelText("適用終了日"), {
        target: { value: "2025-06-30" },
      });

      fireEvent.change(screen.getByRole("textbox", { name: "説明" }), {
        target: { value: "カスタム品の説明" },
      });
      fireEvent.click(screen.getByRole("button", { name: "登録" }));
    });

    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith({
        productId: 1,
        userId: 101,
        modelNumber: "MODEL-A-001-C1",
        productName: "テスト商品A-1",
        price: 1200,
        description: "カスタム品の説明",
        startDate: "2025-06-01",
        endDate: "2025-06-30",
      });
    });
  });
});
