type ProductsTab = "products" | "manage" | "refill";

interface ProductsTabsProps {
  activeTab: ProductsTab;
  onChange: (tab: ProductsTab) => void;
  showManage: boolean;
  refillCount: number;
}

export default function ProductsTabs({
  activeTab,
  onChange,
  showManage,
  refillCount,
}: ProductsTabsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-6">
      <button
        type="button"
        onClick={() => onChange("products")}
        className={`theme-tab px-4 py-2 rounded-lg border transition-all duration-200 ${
          activeTab === "products" ? "theme-tab-active" : ""
        }`}
      >
        Products
      </button>
      <button
        type="button"
        onClick={() => onChange("refill")}
        className={`theme-tab px-4 py-2 rounded-lg border transition-all duration-200 ${
          activeTab === "refill" ? "theme-tab-active" : ""
        }`}
      >
        <span className="inline-flex items-center gap-2">
          Refill Needed
          {refillCount > 0 && (
            <span className="text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
              {refillCount}
            </span>
          )}
        </span>
      </button>
      {showManage && (
        <button
          type="button"
          onClick={() => onChange("manage")}
          className={`theme-tab px-4 py-2 rounded-lg border transition-all duration-200 ${
            activeTab === "manage" ? "theme-tab-active" : ""
          }`}
        >
          Manage Warehouse
        </button>
      )}
    </div>
  );
}
