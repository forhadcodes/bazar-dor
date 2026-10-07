import Link from "next/link";

const NavLinks = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
    const data = await res.json();
    const navs = data;
    console.log(navs);


    return (
        <div>
            {navs.map((n, i) => <Link key={i} href={`/category/${n.slug}`} className="btn btn-ghost btn-sm sm:btn-md font-bold text-base-content/80 rounded-xl hover:bg-base-200"> {n.icon}{n.nameBn}</Link>)}
        </div>
    );
};

export default NavLinks;