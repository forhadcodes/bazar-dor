'use client'; 

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import toast from 'react-hot-toast'; // 2. Import toast

const SignInPage = () => {
  const router = useRouter(); // Initialize router
  const [loading, setLoading] = useState(false);

  const inputClass = "w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] focus:border-transparent transition-all";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {email: string; password: string};
    const email = user.email;
    const password = user.password;
   
    try {
      const { data, error } = await authClient.signIn.email({ email, password, callbackURL: "/" });
      
      if (data) {
        console.log("Sign-in successful:", data);
        
        // 3. Trigger success toast notification
        toast.success("Successfully Sign In!", {
          duration: 4000,
          position: "top-center",
        });
        
        router.push("/"); // Redirect to home page
        return;
      }
      
      if (error) {
        console.error("Sign-in error details:", error);
        
        // 4. Trigger error toast if authentication fails
        toast.error((error as { message: string }).message || "ইমেইল বা পাসওয়ারড ভুল হয়েছে।", {
          position: "top-center",
        });
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("সার্ভারের সাথে সংযোগ করা যাচ্ছে না।", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-[#1f2937] mb-1">সাইন ইন</h1>
          <p className="text-xs text-[#4b5563]">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#e5e7eb] p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">ইমেইল</label>
              <input type="email" name="email" placeholder="you@example.com" required className={inputClass} />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-[#1f2937] mb-1">পাসওয়ার্ড</label>
              <input type="password" name="password" placeholder="কমপক্ষে ৮ অক্ষর" required minLength={8} className={inputClass} />
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-2.5 bg-[#047857] hover:bg-[#065f46] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg shadow-sm transition-colors text-center"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>
          
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#f3f4f6]"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] text-[#9ca3af] uppercase tracking-wider">অথবা</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3 mb-5">
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
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Github দিয়ে চালিয়ে যান</span>
            </button>
          </div>
          
          <div className="text-center text-xs text-[#4b5563]">
            অ্যাকাউন্ট নেই? <a href="/sign-up" className="text-[#059669] hover:underline font-semibold">নতুন অ্যাকাউন্ট তৈরি করুন</a>
          </div>
        </div>
        
        <div className="text-center mt-5">
          <a href="/" className="text-xs text-[#6b7280] hover:text-[#374151] transition-colors">← হোম পেজে ফিরে যান</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;