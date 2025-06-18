import "@testing-library/jest-dom";

export const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

export const mockAlert = jest.fn();
window.alert = mockAlert;
