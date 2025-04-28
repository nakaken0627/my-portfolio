import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/cart-context";

type ProductProps = {
  product_name: string;
  id: number;
  model_number: string;
  price: number;
  description: string;
  company_name: string;
  priority: boolean;
};

export const ProductCard = ({
  id,
  product_name,
  description,
  company_name,
  price,
  model_number,
  priority = false, //1件目のみtrueで受け取るためデフォルトはfalse
}: ProductProps) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return;
  }

  const { addProduct } = cartContext;

  return (
    <div key={id} className="group relative border border-b-amber-800">
      <Image
        alt="product"
        src="/images/sample.jpg"
        width={400}
        height={400}
        priority={priority}
        className="aspect-square w-full rounded-md bg-blue-50 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <div>
              <span aria-hidden="true" className="absolute inset-0" />
              {product_name}
            </div>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{model_number}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <p className="mt-1 text-sm text-gray-500">{company_name}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ¥{Math.round(price).toLocaleString()}
        </p>
        <button className="relative z-10" onClick={() => addProduct(id)}>
          カートに追加
        </button>
      </div>
    </div>
  );
};
