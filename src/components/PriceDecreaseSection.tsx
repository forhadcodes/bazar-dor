import { IProduct } from "@/products";
import ProductCard from "./ProductCard";

export default function PriceDecreaseSection({ products }: { products: IProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-emerald-600 text-xs">▼</span>
        <h2 className="text-base font-extrabold text-gray-900 tracking-wide">
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}