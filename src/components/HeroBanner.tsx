import Image from 'next/image';

const HeroBanner = () => {
      const date = new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' });

    return (
        <div>
            <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 gap-8">
          {/* Left Column Text Content */}
          <div className="flex-1 space-y-4 max-w-2xl">
            <span className="inline-block bg-[#e2f3e8] text-[#1e5e3a] text-xs font-semibold px-3 py-1.5 rounded-full">
              {date}
            </span>
            <h1 className="text-3xl md:text-[38px] font-extrabold text-[#111827] leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-[#4b5563] text-sm md:text-base leading-relaxed tracking-wide font-normal">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#সব-পণ্য"
              className="inline-block bg-[#008753] hover:bg-[#007044] text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Right Column Hero Graphic */}
          <div className="flex justify-center items-center w-full max-w-[280px] md:max-w-[320px]">
            <Image
              className="w-full h-auto object-contain"
              height={320}
              width={320}
              src="/bazar-hero.png"
              alt="hero img"
              priority
            />
          </div>
        </div>
      </div>
        </div>
    );
};

export default HeroBanner;