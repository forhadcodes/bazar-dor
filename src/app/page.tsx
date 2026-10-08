interface IProduct {
  id: string;
  name: string;
  today: number;
  change: {
    dir: "up" | "down";
    value: number;
  };
}

import HeroBanner from "@/components/HeroBanner";
import Marquee from "@/components/Marquee";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products?category=chal");
  const products = await res.json();
  const todayPriceHike = products.filter((product: IProduct) => product.change.dir === "up").length;
  console.log(todayPriceHike);

  return (
    <div className="bg-[#f4f7f5] min-h-screen">
      <Marquee />
      <HeroBanner />
      
      <div>
        {todayPriceHike}
      </div>
    </div>
  );
}
