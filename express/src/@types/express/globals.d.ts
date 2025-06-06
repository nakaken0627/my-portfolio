import "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      type: "company" | "user";
    }
  }
}
