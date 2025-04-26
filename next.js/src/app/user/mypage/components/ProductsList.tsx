"use client";

import { useEffect, useState } from "react";

import { ProductCard } from "./ProductCard";

type Product = {
  product_name: string;
  id: number;
  model_number: string;
  price: number;
  description: string;
  company_name: string;
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3001/api/user/productlist", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log("データを取得できませんでした");
    }
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-amber-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          商品一覧
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              product_name={product.product_name}
              description={product.description}
              company_name={product.company_name}
              price={product.price}
              model_number={product.model_number}
              priority={index === 0} //LCP改善のため1件目をプリロードの対象にする。（全件だとパフォーマンスが低下するため、1件目のみtrueとする）
            />
          ))}
        </div>
      </div>
    </div>
  );
}
