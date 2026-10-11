const Footer = () => {
  const year = new Date().toLocaleDateString("bn-BD", { year: "numeric" });

  return (
    <footer className="w-full bg-white border-t border-[#e5e7eb] mt-1">
      <div className="mx-auto max-w-6xl px-2 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-center md:text-left">
        <p className="text-xs text-[#4b5563]">
          © {year}{" "}
          <span className="font-bold text-[#047857]">বাজার দর</span>। সর্বস্বত্ব
          সংরক্ষিত।
        </p>
        <p className="text-xs text-[#9ca3af]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;