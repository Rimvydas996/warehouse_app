import { useEffect, useState } from "react";
import { apiGetAll } from "../api/api";
import ProductInterface from "../model/ProductInterface";
import { ExpandLess, MoreVert } from "@mui/icons-material";

export default function ProductsPage() {
  const [input, setInput] = useState<string>("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [more, setMore] = useState<boolean>(false);

  useEffect(() => {
    apiGetAll().then((data) => {
      setProducts(data);
    });
  }, []);

  const HandleMore = () => {
    setMore(!more);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInput = () => {
    console.log("Input value:", input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1
          className="
          text-3xl font-bold text-amber-900 
          mb-8 text-center
        "
        >
          Product Management
        </h1>

        <ul className="w-full space-y-4">
          {products.map((product, key) => (
            <li
              key={key}
              className="
                bg-white p-4 rounded-xl
                shadow-md hover:shadow-lg
                transition-all duration-200
                border border-amber-200
                grid grid-cols-4 gap-4 items-center
              "
            >
              <span className="text-lg font-medium col-span-2 text-amber-900">{product.title}</span>
              <span className="text-lg text-amber-800">Stock: {product.quantity}</span>
              <div className="flex justify-end gap-2">
                {!more ? (
                  <button
                    onClick={HandleMore}
                    className="
                      bg-amber-200 p-2
                      rounded-lg border border-amber-300
                      hover:bg-amber-300 hover:shadow-md
                      transition-all duration-200
                      text-amber-900
                    "
                    type="button"
                  >
                    <MoreVert className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="adjust quantity"
                      className="px-2 py-1 border border-amber-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={handleInput}
                      className="
                        bg-amber-200 px-3 py-1
                        rounded-lg border border-amber-300
                        hover:bg-amber-300 hover:shadow-md
                        transition-all duration-200
                        text-amber-900
                      "
                    >
                      adjust
                    </button>
                    <button
                      onClick={HandleMore}
                      className="
                        bg-amber-200 p-1
                        border-2 border-amber-900 rounded-lg
                        hover:bg-amber-300
                        transition-all duration-200
                      "
                      type="button"
                    >
                      <ExpandLess className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
