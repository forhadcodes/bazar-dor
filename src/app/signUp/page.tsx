'use client';

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast"; // 1. Imported toast package

const SignUpPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password.length < 8) {
      setErrorMsg("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("পাসওয়ার্ড দুটি মেলেনি! দয়া করে আবার চেক করুন।");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        callbackURL: "/",
      });

      if (error) {
        // Updated logging configuration to prevent getting an empty object {} in your console
        console.error("Sign-up error details:", error);
        setErrorMsg(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
        return;
      }

      if (data) {
        // 2. Trigger success toast notification
        toast.success("Successfully signed up!", {
          duration: 4000,
          position: "top-center",
        });
        
        router.push("/");
      }
    } catch (err) {
      console.error("Unexpected error details:", err);
      setErrorMsg("সার্ভারের সাথে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

    const inputClass =
    "w-full px-3 py-2 text-xs border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#059669] placeholder-[#9ca3af] transition-colors";
// Social sign-in handler 
  const handleSocial = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      
    });
      console.log(data)
  };

  const handleSocialGithub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      
    });
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center font-sans antialiased p-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1f2937] mb-1">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-xs text-[#4b5563]">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#e5e7eb] p-6">
          {errorMsg && (
            <div className="mb-4 p-3 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">নাম</label>
              <input type="text" name="name" placeholder="আপনার নাম লিখুন" required className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">ইমেইল</label>
              <input type="email" name="email" placeholder="you@example.com" required className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">প্রোফাইল ছবি (URL)</label>
              <input type="url" name="image" placeholder="https://example.com/avatar.jpg" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">পাসওয়ার্ড</label>
              <input type="password" name="password" placeholder="কমপক্ষে ৮ অক্ষর" required minLength={8} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input type="password" name="confirmPassword" placeholder="আবার লিখুন" required className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#047857] hover:bg-[#065f46] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg shadow-sm transition-colors text-center"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#f3f4f6]"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] text-[#9ca3af] uppercase tracking-wider">অথবা</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={handleSocial}
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#e5e7eb] rounded-lg text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button 
              type="button"
              onClick={handleSocialGithub}
              
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#e5e7eb] rounded-lg text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          
        </div>

        <div className="text-center mt-5">
          <a href="/signIn" className="text-xs text-[#6b7280] hover:text-[#374151] transition-colors">← হোম পেজে ফিরে যান</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
