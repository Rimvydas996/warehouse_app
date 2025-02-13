import React, { useEffect, useState } from "react";
import { apiGetAll } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProductInterface from "../model/ProductInterface";

export default function PrductsPage() {
  const [products, setProducts] = useState<Promise<ProductInterface[]>>(() => Promise.resolve([]));
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken();
    const data: Promise<ProductInterface[]> = apiGetAll(token);
    setProducts(data);
    console.log("token", token);
    console.log("data", data);
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
