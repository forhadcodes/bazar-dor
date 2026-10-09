import ProductGrid from "./ProductGrid";

interface Ip {
  id?: string | number;
  _id?: string | number;
  slug?: string;
  nameBn?: string;
  name?: string;
  category?: string;
  category_slug?: string;
  categoryId?: string | number;
  category_id?: string | number;
  unit?: string;
  today?: string | number;
  price?: string | number;
  change?: {
    pct?: string | number;
  };
}

// ২. নরমাল ফিল্টারিং বা ম্যাপ করার পর যে স্ট্রাকচার তৈরি হবে তার ইন্টারফেস
interface Lp {
  id: string | number;
  name: string;
  unit: string;
  price: number;
  change: number;
}
const CATEGORY_META: Record<string, { name: string; icon: string }> = {
  chal: { name: "চাল", icon: "🍚" },
  dal: { name: "ডাল", icon: "🫘" },
  tel: { name: "তেল", icon: "🛢️" },
  sobji: { name: "সবজি", icon: "🥬" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🍗" },
  "dim-dui": { name: "ডিম-দুধ", icon: "🥛" }, // 👈 'dim' থেকে 'dim-dui' করা হলো
  mosla: { name: "মসলা", icon: "🌶️" }, // 👈 'moshla' থেকে 'mosla' করা হলো
};

// আপনার মূল API Base লিংক
const API_BASE = "https://api.abcz.workers.dev/api/bazardor";

const toBn = (n: number, digits = 0) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

// ২. আপনার JSON ডেটার ফিল্ডের নাম অনুযায়ী নরমালাইজ ফাংশনটি সাজানো হয়েছে
function normalize(p: Ip) {
  return {
    id: p.id ?? p._id ?? p.slug,
    name: p.nameBn ?? p.name ?? "", // 👈 JSON-এ 'nameBn' আছে
    unit:
      p.unit === "kg"
        ? "কেজি"
        : p.unit === "litre"
          ? "লিটার"
          : (p.unit ?? "কেজি"),
    price: Number(p.today ?? p.price ?? 0), // 👈 আজকের বাজারদর 'today' ফিল্ডে আছে
    change: Number(p.change?.pct ?? 0), // 👈 পার্সেন্টেজ 'change.pct' অবজেক্টে আছে
  };
}

const CategoryProducts = async ({params}: {params: Promise<{ categoryId: string }>;}) => {
  const { categoryId } = await params;
  const meta = CATEGORY_META[categoryId] ?? { name: categoryId, icon: "🛒" };

  // ডাইনামিক প্রোডাক্ট কুয়েরি URL গঠন
  const url = `${API_BASE}/products?category=${encodeURIComponent(categoryId)}`;
  const res = await fetch(url, { cache: "no-store" });
  const raw = res.ok ? await res.json() : [];

  const list: Lp[] = Array.isArray(raw)
    ? raw
    : (raw.products ?? raw.data ?? raw.items ?? []);

  // API যদি কোনো কারণে সব ডেটা একসাথে দেয়, তবে ফ্রন্টএন্ড লেভেলে নিখুঁত ফিল্টারিং
  const filtered = list.filter((p) => {
    const c = p.category ?? p.category_slug ?? p.categoryId ?? p.category_id;
    return (
      c !== undefined && String(c).toLowerCase() === categoryId.toLowerCase()
    );
  });

  const products = filtered.map(normalize);

  console.log(
    "[bazardor]",
    url,
    res.status,
    "raw items:",
    list.length,
    "shown:",
    products.length,
  );

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      {/* Category header */}
      <header className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <span className="text-4xl">{meta.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{meta.name}</h1>
          <p className="text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      <ProductGrid products={products} icon={meta.icon} />
    </main>
  );
};

export default CategoryProducts;
