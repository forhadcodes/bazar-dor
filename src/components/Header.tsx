import Image from "next/image";
import Link from "next/link"; // 1. Imported Link component
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' });
  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* বাম পাশ: লোগো এবং ব্র্যান্ড টেক্সট */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group"> 
          {/* Wrapped Logo with Link to take you back Home when clicked */}
          <div className="avatar rounded-2xl bg-success/10 p-2 transition-transform duration-300 group-hover:scale-105">
            <Image
              className="h-9 w-9 object-contain"
              height={36}
              width={36}
              src="/logo-icon.png"
              alt="Logo"
            />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-success to-emerald-600">
              বাজার দর
            </h1>
            <p className="text-xs font-semibold text-base-content/50 mt-0.5">
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
