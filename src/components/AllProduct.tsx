import { IProduct } from "@/products";
import ProductCard from "./ProductCard";

export default function AllProduct({ products }: { products: IProduct[] }) {
  return (
    <section className="space-y-4">
      <div className="border-t border-gray-200/60 pt-6">
        <h2 className="text-base font-extrabold text-gray-900 tracking-wide">
          সব পণ্য
        </h2>
        <p className="text-[11px] text-gray-400 mt-0.5 font-normal">
          আজকের বাজারে সব পণ্যের তালিকা
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}