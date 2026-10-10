export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full p-4">
      {/* সুন্দর স্পিনার অ্যানিমেশন */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#047857] rounded-full animate-spin"></div>
      
      {/* নিচে ছোট একটি লেখা */}
      <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">
        অনুগ্রহ করে অপেক্ষা করুন...
      </p>
    </div>
  );
}
