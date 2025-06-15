import { UserProductWithCustom } from "@/types/user";

export const mockProducts: UserProductWithCustom[] = [
  {
    id: 1,
    name: "ProductA",
    price: 100,
    companyName: "",
    modelNumber: "",
    description: "",
    custom: [
      {
        id: 101,
        name: "ProductA-1",
        price: 110,
        modelNumber: "",
        description: "",
        startDate: "",
        endDate: "",
      },
      {
        id: 102,
        name: "ProductA-2",
        price: 120,
        modelNumber: "",
        description: "",
        startDate: "",
        endDate: "",
      },
    ],
  },
  {
    id: 2,
    name: "ProductB",
    price: 200,
    custom: [],
    companyName: "",
    modelNumber: "",
    description: "",
  },
];
