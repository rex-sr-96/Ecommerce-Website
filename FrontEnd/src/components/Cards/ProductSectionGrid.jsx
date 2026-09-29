import React from "react";
import SectionHeader from "../Common/SectionHeader";
import ProductCard from "../Common/ProductCard";

const ProductSectionGrid = ({
  badge,
  title,
  subtitle,
  products = [],
  actionText,
  onAction,
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
}) => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge={badge}
          title={title}
          subtitle={subtitle}
          actionText={actionText}
          onAction={onAction}
        />

        {products.length > 0 ? (
          <div className={`grid gap-6 ${gridCols}`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            No products available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSectionGrid;
