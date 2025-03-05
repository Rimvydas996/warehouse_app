import { useEffect, useState } from "react";
import { apiGetAll } from "../api/warehoseApi";
import ProductInterface from "../model/ProductInterface";
import { ExpandLess, MoreVert } from "@mui/icons-material";

export default function ProductsPage() {
  const [input, setInput] = useState<string>("");
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    apiGetAll().then((data) => {
      setProducts(data);
    });
  }, []);

  const HandleMore = (key: number) => {
    setExpanded(expanded === key ? null : key);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInput = () => {
    setInput("");
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4 md:mb-8 text-center">
          Product Management
        </h1>

        <ul className="w-full space-y-3 md:space-y-4">
          {products.map((product, key) => (
            <li
              key={key}
              className="
                bg-white p-3 md:p-4 rounded-xl
                shadow-md hover:shadow-lg
                transition-all duration-200
                border border-amber-200
                grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 items-center
              "
            >
              <span className="text-base md:text-lg text-left font-medium col-span-2 text-amber-900">
                {product.title}
              </span>
              <span className="text-base md:text-lg text-left text-amber-800 col-span-1">
                Stock: {product.quantity}
              </span>
              <div className="flex justify-end col-span-1">
                {expanded !== key ? (
                  <button
                    onClick={() => HandleMore(key)}
                    className="
                      bg-amber-200 p-1.5 md:p-2
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
                  <button
                    onClick={() => HandleMore(key)}
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
                )}
              </div>
              {expanded === key && (
                <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row gap-2 md:justify-end mt-2 md:mt-0">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="adjust quantity"
                    className="w-full md:w-auto px-2 py-1 border border-amber-300 rounded"
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
                      w-full md:w-auto
                    "
                  >
                    adjust
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
