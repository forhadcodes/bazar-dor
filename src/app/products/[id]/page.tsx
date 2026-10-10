import Link from "next/link";
import { notFound } from "next/navigation";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: IMarket[];
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    cache: "no-store",
  });
  const products: IProduct[] = await res.json();

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    notFound();
  }

  const unit = unitBn[product.unit] || product.unit;
  const changeColor =
    product.change.dir === "up"
      ? "text-[#d91b7e]"
      : product.change.dir === "down"
      ? "text-[#2e7d32]"
      : "text-[#6b7280]";
  const changeIcon =
    product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "–";

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans antialiased p-4">
      <div className="w-full max-w-[720px] mx-auto">
        <Link
          href="/"
          className="text-xs text-[#6b7280] hover:text-[#374151] transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mt-4 bg-white rounded-xl border border-[#e5e7eb] p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{product.image}</span>
            <div>
              <h1 className="text-2xl font-bold text-[#1f2937]">{product.nameBn}</h1>
              <p className="text-xs text-[#4b5563]">
                {product.categoryIcon} {product.categoryNameBn}
              </p>
            </div>
          </div>

          <div className="flex items-end gap-2 mb-6">
            <span className="text-3xl font-bold text-[#047857]">{product.today} টাকা</span>
            <span className="text-sm text-[#4b5563] mb-1">/ {unit}</span>
            <span className={`ml-2 mb-1 text-sm font-bold ${changeColor}`}>
              {changeIcon} {Math.abs(product.change.pct)}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {history.map((h) => (
              <div
                key={h.label}
                className="border border-[#e5e7eb] rounded-lg p-3 text-center"
              >
                <p className="text-[11px] text-[#6b7280] mb-1">{h.label}</p>
                <p className="text-sm font-semibold text-[#1f2937]">{h.value} টাকা</p>
              </div>
            ))}
          </div>

          <h2 className="text-sm font-semibold text-[#1f2937] mb-2">
            বাজারভিত্তিক দাম (টাকা/{unit})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[#6b7280] border-b border-[#e5e7eb]">
                  <th className="py-2 pr-3 font-medium">বাজার</th>
                  <th className="py-2 pr-3 font-medium">বিভাগ</th>
                  <th className="py-2 pr-3 font-medium">সর্বনিম্ন</th>
                  <th className="py-2 font-medium">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr key={i} className="border-b border-[#f3f4f6] text-[#374151]">
                    <td className="py-2 pr-3">{m.market}</td>
                    <td className="py-2 pr-3">{m.division}</td>
                    <td className="py-2 pr-3">{m.min}</td>
                    <td className="py-2">{m.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;