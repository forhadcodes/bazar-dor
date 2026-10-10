"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    
    // loading স্টেটটি হ্যান্ডেল করার জন্য যুক্ত করা হলো
    const [loading, setLoading] = useState(false);

    // ইনপুট ফিল্ডগুলোর জন্য সাধারণ Tailwind ডিজাইন ভেরিয়েবল
    const inputClass = "w-full px-3 py-2 border rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#047857]";

    console.log(user);

    // React.FormEvent ব্যবহার করে টাইপ ফিক্স করা হয়েছে
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;

        console.log({ name, image });

        try {
            // Better Auth-এর সঠিক আপডেটের নিয়ম
            await authClient.updateUser({
                name: name,
                image: image || undefined,
            });
            alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            console.error("আপডেট ব্যর্থ হয়েছে:", error);
            alert("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            {/* প্রোফাইল ডিসপ্লে সেকশন */}
            <div className="flex flex-col items-center gap-2 mb-6">
                <Link href="/profile">
                    <div className="avatar">
                        <div className="w-24 h-24 rounded-full ring-2 ring-[#047857] ring-offset-2 overflow-hidden">
                            <img
                                alt="User Avatar"
                                src={
                                    user?.image ||
                                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                }
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </Link>
                <h3 className="text-lg font-bold text-gray-800">{user?.name || "ইউজার নেম"}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            {/* প্রোফাইল আপডেট ফর্ম */}
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
                <div>
                    <label className="block text-xs font-semibold text-[#1f2937] mb-1">নাম</label>
                    <input 
                        type="text" 
                        name="name" 
                        defaultValue={user?.name || ""} 
                        placeholder="আপনার নাম লিখুন" 
                        required 
                        className={inputClass} 
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#1f2937] mb-1">ইমেইল</label>
                    <input 
                        type="email" 
                        name="email" 
                        defaultValue={user?.email || ""} 
                        disabled 
                        placeholder="you@example.com" 
                        className={`${inputClass} bg-gray-100 cursor-not-allowed`} 
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#1f2937] mb-1">প্রোফাইল ছবি (URL)</label>
                    <input 
                        type="url" 
                        name="image" 
                        defaultValue={user?.image || ""} 
                        placeholder="https://example.com/avatar.jpg" 
                        className={inputClass} 
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#047857] hover:bg-[#065f46] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg shadow-sm transition-colors text-center"
                >
                    {loading ? "অপেক্ষা করুন..." : "আপডেট করুন"}
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
