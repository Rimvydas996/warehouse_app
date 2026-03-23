import { useState, type FormEvent } from "react";
import { Add, ExpandLess } from "@mui/icons-material";
import type { IProductFormErrors } from "../../../../types/models/IProductForm";
import { validateProductForm } from "../../../../utils/productValidators/productValidators";
import { apiCreateProduct } from "../../../../services/api/warehouseApi";
import IProduct from "../../../../types/models/IProduct";
import { PRODUCT_LOCATIONS } from "../../../../utils/productLocations/productLocations";

interface AddProductFormProps {
    onProductCreated: (product: IProduct) => void;
}

/**
 * Form for adding a new product with inline validation feedback.
 */
export default function AddProductForm({ onProductCreated }: AddProductFormProps) {
    const [open, setOpen] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<IProductFormErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNewProduct = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const { errors, values } = validateProductForm(formData);
        setFieldErrors(errors);

        if (Object.keys(errors).length) return;

        setIsSubmitting(true);

        try {
            const created = await apiCreateProduct(values);
            onProductCreated(created);
            form.reset();
            setOpen(false);
            setFieldErrors({});
        } catch (err) {
            console.error("Failed to create product", err);
            setFormError("Failed to create product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const panelId = "add-product-form-panel";

    return (
        <div className="mb-6">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={panelId}
                className="
          flex items-center gap-2
          bg-amber-200 border border-amber-300
          text-amber-900
          px-4 py-2
          rounded-lg
          hover:bg-amber-300 hover:shadow-md
          transition-all duration-200
        "
            >
                {open ? <ExpandLess /> : <Add />}
                {open ? "Close form" : "Add product"}
            </button>

            <div
                id={panelId}
                className={
                    "overflow-hidden transition-all duration-300 ease-in-out" +
                    (open ? " max-h-[700px] opacity-100 mt-4" : " max-h-0 opacity-0")
                }
            >
                <form
                    onSubmit={handleNewProduct}
                    className="
            bg-white p-4 md:p-6
            rounded-xl shadow-md border border-amber-200
            grid grid-cols-1 md:grid-cols-4 gap-3
          "
                >
                    <div className="md:col-span-4">
                        <label htmlFor="product-title" className="block text-amber-900 text-sm font-medium">
                            Product title
                        </label>
                        <input
                            id="product-title"
                            name="title"
                            type="text"
                            placeholder="Product title"
                            required
                            aria-invalid={Boolean(fieldErrors.title)}
                            aria-describedby={fieldErrors.title ? "product-title-error" : undefined}
                            className={
                                "mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400" +
                                (fieldErrors.title ? "border-red-500" : "border-amber-300")
                            }
                        />
                        {fieldErrors.title && (
                            <p id="product-title-error" role="alert" className="text-red-500 text-sm mt-1">
                                {fieldErrors.title}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-4">
                        <label htmlFor="product-quantity" className="block text-amber-900 text-sm font-medium">
                            Quantity
                        </label>
                        <input
                            id="product-quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            placeholder="Quantity"
                            required
                            aria-invalid={Boolean(fieldErrors.quantity)}
                            aria-describedby={fieldErrors.quantity ? "product-quantity-error" : undefined}
                            className={
                                " mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400" +
                                (fieldErrors.quantity ? "border-red-500" : "border-amber-300")
                            }
                        />
                        {fieldErrors.quantity && (
                            <p id="product-quantity-error" role="alert" className="text-red-500 text-sm mt-1">
                                {fieldErrors.quantity}
                            </p>
                        )}
                    </div>

                    <fieldset
                        className="md:col-span-4"
                        aria-describedby={fieldErrors.supplyStatus ? "supply-status-error" : undefined}
                    >
                        <legend className="text-amber-900 text-sm font-medium">Supply status</legend>
                        <div className="flex items-center gap-4 px-2 mt-2">
                            <label
                                htmlFor="supply-status-in"
                                className="flex items-center gap-2 text-amber-900 text-sm"
                            >
                                <input
                                    id="supply-status-in"
                                    name="supplyStatus"
                                    value="true"
                                    type="radio"
                                    required
                                    className="accent-amber-500"
                                />
                                In stock
                            </label>
                            <label
                                htmlFor="supply-status-out"
                                className="flex items-center gap-2 text-amber-900 text-sm"
                            >
                                <input
                                    id="supply-status-out"
                                    name="supplyStatus"
                                    value="false"
                                    type="radio"
                                    required
                                    className="accent-amber-500"
                                />
                                Out of stock
                            </label>
                        </div>
                        {fieldErrors.supplyStatus && (
                            <p id="supply-status-error" role="alert" className="text-red-500 text-sm mt-2">
                                {fieldErrors.supplyStatus}
                            </p>
                        )}
                    </fieldset>

                    <div className="md:col-span-4">
                        <label htmlFor="storage-location" className="block text-amber-900 text-sm font-medium">
                            Storage location
                        </label>
                        <select
                            id="storage-location"
                            name="storageLocation"
                            defaultValue=""
                            required
                            aria-invalid={Boolean(fieldErrors.storageLocation)}
                            aria-describedby={fieldErrors.storageLocation ? "storage-location-error" : undefined}
                            className={
                                "mt-1 px-3 py-2 border rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" +
                                (fieldErrors.storageLocation ? "border-red-500" : "border-amber-300")
                            }
                        >
                            <option value="" disabled>
                                Select location
                            </option>
                            {PRODUCT_LOCATIONS.map((location) => (
                                <option key={location.value} value={location.value}>
                                    {location.label}
                                </option>
                            ))}
                        </select>
                        {fieldErrors.storageLocation && (
                            <p id="storage-location-error" role="alert" className="text-red-500 text-sm mt-1">
                                {fieldErrors.storageLocation}
                            </p>
                        )}
                    </div>

                    {formError && (
                        <div className="md:col-span-4 text-sm text-red-600" role="alert" aria-live="polite">
                            {formError}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="
              md:col-span-4 bg-amber-200 border border-amber-300
              text-amber-900 rounded-lg py-2 font-medium
              hover:bg-amber-300 hover:shadow-md
              transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
            "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
