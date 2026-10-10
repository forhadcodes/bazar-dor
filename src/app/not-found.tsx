import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">পেজটি খুঁজে পাওয়া যায়নি!</h2>
      <p className="text-sm text-gray-500 mb-6">
        দুঃখিত, আপনি যে লিংকটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে বা ভুল টাইপ করা হয়েছে।
      </p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-[#047857] hover:bg-[#065f46] text-white text-sm font-medium rounded-lg transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
