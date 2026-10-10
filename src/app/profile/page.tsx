"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [imgError, setImgError] = useState(false);

    const inputClass =
        "w-full px-3 py-2 border border-[#e5e7eb] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#047857]";

    // Login kora na thakle sign-in page-e pathano
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/sign-in");
        }
    }, [isPending, session, router]);

    // Image URL change hole error flag reset
    useEffect(() => {
        setImgError(false);
    }, [user?.image]);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") || "").trim();
        const image = String(formData.get("image") || "").trim();

        if (!name) {
            toast.error("নাম খালি রাখা যাবে না।", { position: "top-center" });
            setLoading(false);
            return;
        }

        try {
            const { error } = await authClient.updateUser({
                name,
                image: image || null,
            });

            if (error) {
                console.error("আপডেট ব্যর্থ হয়েছে:", error);
                toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।", {
                    position: "top-center",
                });
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", {
                duration: 4000,
                position: "top-center",
            });
            setShow(false); // সফল হলে ফর্ম লুকিয়ে যাবে
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("সার্ভারের সাথে সংযোগ করা যাচ্ছে না।", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    // Session load hocche
    if (isPending || !user) {
        return (
            <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-2" />
                <div className="h-3 w-48 bg-gray-100 rounded mx-auto" />
            </div>
        );
    }

    const initial = (user.name || "U").charAt(0).toUpperCase();
    const showImage = user.image && !imgError;

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            {/* প্রোফাইল ডিসপ্লে সেকশন */}
            <div className="flex flex-col items-center gap-2 mb-6">
                <div className="w-24 h-24 rounded-full ring-2 ring-[#047857] ring-offset-2 overflow-hidden bg-[#ecfdf5] flex items-center justify-center">
                    {showImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            alt="User Avatar"
                            src={user.image as string}
                            referrerPolicy="no-referrer"
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-3xl font-bold text-[#047857]">{initial}</span>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{user.name || "ইউজার নেম"}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>

                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="mt-1 px-4 py-1.5 text-xs font-medium text-[#047857] border border-[#047857] rounded-lg hover:bg-[#047857] hover:text-white transition-colors"
                >
                    {show ? "বন্ধ করুন" : "প্রোফাইল এডিট করুন"}
                </button>
            </div>

            {/* প্রোফাইল আপডেট ফর্ম */}
            {show && (
                <form className="space-y-4" onSubmit={handleUpdateProfile}>
                    <div>
                        <label className="block text-xs font-semibold text-[#1f2937] mb-1">নাম</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user.name || ""}
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
                            defaultValue={user.email || ""}
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
                            defaultValue={user.image || ""}
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
            )}
        </div>
    );
};

export default ProfilePage;