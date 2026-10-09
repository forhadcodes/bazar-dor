"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string | number;
  name: string;
  unit: string;
  price: number;
  change: number;
};

const toBn = (n: number, digits = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const SORTS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
  { value: "rise", label: "সবচেয়ে বেশি বেড়েছে" },
  { value: "fall", label: "সবচেয়ে বেশি কমেছে" },
];

function ChangeBadge({ change }: { change: number }) {
  if (change > 0)
    return (
      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
        ▲ {toBn(change, 1)}%
      </span>
    );
  if (change < 0)
    return (
      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
        ▼ {toBn(Math.abs(change), 1)}%
      </span>
    );
  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
      — {toBn(0, 1)}%
    </span>
  );
}

export default function ProductGrid({  products,  icon,}: {  products: Product[];  icon: string;}) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rise":
        return list.sort((a, b) => b.change - a.change);
      case "fall":
        return list.sort((a, b) => a.change - b.change);
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <>
      {/* Sort bar */}
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-gray-500">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Cards */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-xs text-gray-500">প্রতি {p.unit}</p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <p className="text-xl font-bold text-gray-900">
                    {toBn(p.price)} <span className="text-sm font-medium">টাকা</span>
                  </p>
                </div>
                <ChangeBadge change={p.change} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
