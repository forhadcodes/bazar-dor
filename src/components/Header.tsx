import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' });
  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">

        {/* বাম পাশ: লোগো এবং ব্র্যান্ড টেক্সট */}
        <Link href="/" className="group flex min-w-0 cursor-pointer items-center gap-2 sm:gap-3">
          <div className="avatar shrink-0 rounded-2xl bg-success/10 p-1.5 transition-transform duration-300 group-hover:scale-105 sm:p-2">
            <Image
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              height={36}
              width={36}
              src="/logo-icon.png"
              alt="Logo"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
              বাজার দর
            </h1>
            <p className="mt-0.5 truncate text-[10px] font-semibold text-base-content/50 sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        <UserInfo />

      </div>
      <NavLinks />
    </header>
  );
};

export default Header;