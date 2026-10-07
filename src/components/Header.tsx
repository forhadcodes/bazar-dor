import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* বাম পাশ: লোগো এবং ব্র্যান্ড টেক্সট */}
        <div className="flex items-center gap-3 cursor-pointer group">
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
              প্রতিদিনের বাজারের সঠিক তথ্য
            </p>
          </div>
        </div>

        {/* ডান পাশ: সাইন ইন এবং সাইন আপ বাটন */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm sm:btn-md font-bold text-base-content/80 rounded-xl hover:bg-base-200">
            সাইন ইন
          </button>
          <button className="btn btn-success btn-sm sm:btn-md font-extrabold text-white rounded-xl px-5 shadow-md shadow-success/20 hover:shadow-lg hover:shadow-success/30 transition-all duration-200">
            সাইন আপ
          </button>
        </div>

      </div>
      <NavLinks></NavLinks>
    </header>
  );
};

export default Header;
