import { useAuth } from "../context/AuthContext";
import ProductsPageLayout from "../components/features/products/ProductsPageLayout/ProductsPageLayout";
import RefillSection from "../components/features/products/RefillSection/RefillSection";
import useProductsPage from "../hooks/products/useProductsPage";

export default function RefillNeededPage() {
  const { user, isReady, updateUser } = useAuth();
  const { refillItems, refillCount, isLoading } = useProductsPage({ user, isReady, updateUser });

  return (
    <ProductsPageLayout title="Refill Needed" refillCount={refillCount}>
      <RefillSection isLoading={isLoading} items={refillItems} count={refillCount} />
    </ProductsPageLayout>
  );
}
