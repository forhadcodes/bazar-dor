import Link from "next/link";

interface INavLinks {
  id: string;   
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();
  const navs: INavLinks[] = data;
  console.log(navs);

  return (
    <div className="mx-auto flex max-w-6xl items-center px-4 py-3 flex-col sm:flex-row gap-2 sm:gap-4">
      {/* 🏠 Add Home Link here */}
      <Link
        href="/"
        className="btn btn-ghost btn-sm sm:btn-md font-bold text-base-content/80 rounded-xl hover:bg-base-200"
      >
        🏠 হোম
      </Link>

      {/* Dynamic Category Links */}
      {navs.map((n, i) => (
        <Link
          key={i}
          href={`/category/${n.slug}`}
          className="btn btn-ghost btn-sm sm:btn-md font-bold text-base-content/80 rounded-xl hover:bg-base-200"
        >
          {n.icon} {n.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
