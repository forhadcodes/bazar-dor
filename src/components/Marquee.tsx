import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface IHeading {
    "id": number;
    "nameBn": string;
    "categoryNameBn": string;
    "categoryIcon": string;
    "unit": string;
    "today": number;
    "yesterday": number;
    "lastWeek": number;
    "lastMonth": number;
    "change": {
      "dir": "up" | "down" | "flat";
      "pct": number;
    }
}

const Marquee = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data = await res.json();
    const heading: IHeading[] = data;

    return (
        <div className="w-full bg-base-100/85 backdrop-blur-md py-1 border-y border-gray-100">
            <MarqueeText direction="right" duration={30} pauseOnHover={true}>
                <div className="flex items-center whitespace-nowrap gap-8 pr-8">
                    {heading.map((h) => (
                        <Link href={`/products/${h.id}`} key={h.id} className="flex items-center text-[13px] text-[#4a4a4a]">
                            <span className="mr-1.5 opacity-80">{h.categoryIcon}</span>
                            <span className="font-medium">
                                {h.nameBn} {h.today} টাকা/{h.unit === "kg" ? "কেজি" : "লিটার"}
                            </span>
                            <span className={`ml-1.5 flex items-center text-[11px] font-bold ${h.change.dir === "up" ? "text-[#d91b7e]" : "text-[#2e7d32]"}`}>
                                <span className="mr-0.5 text-[9px]">{h.change.dir === "up" ? "▲" : "▼"}</span>
                                {h.change.pct}%
                            </span>
                        </Link>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;