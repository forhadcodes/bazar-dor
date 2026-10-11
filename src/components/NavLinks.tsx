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
    <div className="mx-auto flex max-w-6xl flex-row flex-nowrap items-center gap-1 overflow-x-auto px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:flex-wrap md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* 🏠 Add Home Link here */}
      <Link
        href="/"
        className="btn btn-ghost btn-sm sm:btn-md shrink-0 whitespace-nowrap rounded-xl font-bold text-base-content/80 hover:bg-base-200"
      >
        🏠 হোম
      </Link>

      {/* Dynamic Category Links */}
      {navs.map((n, i) => (
        <Link
          key={i}
          href={`/category/${n.slug}`}
          className="btn btn-ghost btn-sm sm:btn-md shrink-0 whitespace-nowrap rounded-xl font-bold text-base-content/80 hover:bg-base-200"
        >
          {n.icon} {n.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;