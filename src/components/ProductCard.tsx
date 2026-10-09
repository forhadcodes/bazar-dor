import { IProduct } from "@/products";

const unitLabel = (unit: string) =>
  unit === "kg" ? "কেজি" : unit === "litre" ? "লিটার" : "ডজন";

export default function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const badgeBg = isUp
    ? "bg-red-50 text-red-600"
    : isDown
    ? "bg-emerald-50 text-emerald-600"
    : "bg-gray-50 text-gray-400";
  const indicatorIcon = isUp ? "▲" : isDown ? "▼" : "•";

  return (
    <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-200">
      {/* Top Info */}
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 text-xl bg-gray-50 rounded-xl">
          {product.categoryIcon}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-800 leading-snug">
            {product.nameBn}
          </h4>
          <span className="text-[11px] text-gray-400 font-normal">
            প্রতি {unitLabel(product.unit)}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between mt-4 pt-1">
        <div>
          <span className="text-[11px] text-gray-400 block mb-0.5">
            আজকের দাম
          </span>
          <span className="text-[15px] font-extrabold text-gray-900">
            {product.today} টাকা
          </span>
        </div>

        {product.change.pct !== 0 && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${badgeBg}`}
          >
            <span className="text-[9px]">{indicatorIcon}</span>
            <span>{Math.abs(product.change.pct)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}