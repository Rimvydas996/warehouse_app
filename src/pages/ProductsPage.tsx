import React, { useEffect, useState } from "react";
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
    <div>
      <ul>
        {products.map((product, key) => (
          <li key={key}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
