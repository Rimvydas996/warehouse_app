import type { ReactNode } from "react";

interface ProductsPageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function ProductsPageLayout({ title, children }: ProductsPageLayoutProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold theme-label mb-4 md:mb-8 text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
