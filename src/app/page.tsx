import HeroBanner from "@/components/HeroBanner";
import Marquee from "@/components/Marquee";
import PriceHikeSection from "@/components/PriceHikeSection";
import PriceDecreaseSection from "@/components/PriceDecreaseSection";
import AllProduct from "@/components/AllProduct";
import { IProduct } from "@/products";

export default async function ProductsDashboard() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    cache: "no-store",
  });
  const data: IProduct[] = await res.json();

  // Prothom 6 ta product matro
  const increasedProducts = data
    .filter((p) => p.change.dir === "up")
    .slice(0, 6);

  const decreasedProducts = data
    .filter((p) => p.change.dir === "down")
    .slice(0, 6);

  return (
    <div className="bg-[#f4f7f5] min-h-screen">
      <Marquee />
      <HeroBanner />

      <div className="py-8 font-sans">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <PriceHikeSection products={increasedProducts} />
          <PriceDecreaseSection products={decreasedProducts} />
          <AllProduct products={data} />
        </div>
      </div>
    </div>
  );
}