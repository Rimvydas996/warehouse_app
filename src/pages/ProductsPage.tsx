import { useEffect, useState } from "react";
import { apiGetAll } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProductInterface from "../model/ProductInterface";

export default function PrductsPage() {
  // const [products, setProducts] = useState<Promise<ProductInterface[]>>(() => Promise.resolve([]));
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken();
    apiGetAll(token).then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ul className="w-full space-y-2">
        {products.map((product, key) => (
          <li
            className="grid grid-cols-4 gap-4 items-center w-full p-3 bg-amber-100 rounded-lg"
            key={key}
          >
            <span className="text-lg col-span-2 text-left">{product.title}</span>
            <span className="text-lg text-left ">likutis: {product.quantity}</span>
            <div className="flex gap-2 ">
              <button
                className="bg-amber-200 px-4 py-2 border-2 border-amber-900 rounded-xl hover:bg-amber-300"
                type="button"
              >
                Edit
              </button>
              <button
                className="bg-amber-200 px-4 py-2 border-2 border-amber-900 rounded-xl hover:bg-amber-300"
                type="button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
