import { useEffect, useState } from "react";
import { apiGetAll, apiChangeQuantity } from "../api/warehoseApi";
import ProductInterface from "../model/ProductInterface";
import { ExpandLess, MoreVert } from "@mui/icons-material";

export default function ProductsPage() {
    // State to store all products fetched from backend
    const [products, setProducts] = useState<ProductInterface[]>([]);
    // State to keep track of which product row is expanded
    const [expanded, setExpanded] = useState<number | null>(null);
    // State for input fields, keyed by product ID (allows separate input per product)
    const [inputs, setInputs] = useState<Record<string, string>>({});

    // Fetch products on component mount
    useEffect(() => {
        apiGetAll()
            .then((data) => setProducts(Array.isArray(data) ? data : [])) // safe fallback
            .catch((err) => {
                console.error("Failed to fetch products:", err);
                setProducts([]); // prevent app crash if API fails
            });
    }, []);

    // Toggle expanded/collapsed state for a product row
    const handleMore = (key: number) => {
        setExpanded(expanded === key ? null : key);
    };

    // Update input state for a specific product
    const handleInputChange = (id: string, value: string) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    // Adjust quantity for a product using backend API
    const handleAdjustQuantity = async (id: string) => {
        const quantity = Number(inputs[id]);
        if (isNaN(quantity) || quantity === 0) return; // basic validation

        try {
            const updatedProduct = await apiChangeQuantity(id, quantity);
            // Update local state to reflect new quantity without re-fetching all products
            setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, quantity: updatedProduct.quantity } : p)));
            // Clear input for this product
            setInputs((prev) => ({ ...prev, [id]: "" }));
        } catch (err) {
            console.error("Failed to adjust quantity", err);
        }
    };

    return (
        <div className="rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4 md:mb-8 text-center">
                    Product Management
                </h1>

                {/* Render product list */}
                <ul className="w-full space-y-3 md:space-y-4">
                    {products.map((product, key) => (
                        <li
                            key={product._id} // use stable ID for list key
                            className="
                                bg-white p-3 md:p-4 rounded-xl
                                shadow-md hover:shadow-lg
                                transition-all duration-200
                                border border-amber-200
                                grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 items-center
                            "
                        >
                            {/* Product title */}
                            <span className="text-base md:text-lg text-left font-medium col-span-2 text-amber-900">
                                {product.title}
                            </span>

                            {/* Current stock */}
                            <span className="text-base md:text-lg text-left text-amber-800 col-span-1">
                                Stock: {product.quantity}
                            </span>

                            {/* Expand/collapse button */}
                            <div className="flex justify-end col-span-1">
                                {expanded !== key ? (
                                    <button
                                        onClick={() => handleMore(key)}
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
                                        onClick={() => handleMore(key)}
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

                            {/* Quantity input and adjust button (shown when expanded) */}
                            {expanded === key && (
                                <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row gap-2 md:justify-end mt-2 md:mt-0">
                                    <input
                                        type="text"
                                        value={inputs[product._id] || ""} // each product has separate input
                                        onChange={(e) => handleInputChange(product._id, e.target.value)}
                                        placeholder="Add or remove units"
                                        className="w-full md:w-auto px-2 py-1 border border-amber-300 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleAdjustQuantity(product._id)}
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
