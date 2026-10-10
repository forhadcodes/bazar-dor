"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast"; // 1. Imported toast

interface Ierror {
    message: string;
}
interface IUser {
    name: string;
    email: string;
    image?: string;
}
const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  // 2. Updated handleSignOut to trigger toast
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("You are Logged Out", {
              duration: 4000,
              position: "top-center",
            });
          },
        },
      });
    } catch (error) {
      // Fallback toast if your auth client does not support fetchOptions configuration parameters directly
      console.error("Sign out error:", error);
      toast.error((error as Ierror).message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <Link href="/profile">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                <img
                  alt="User Avatar"
                  src={
                    (user as IUser)?.image ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                />
              </div>
            </div>
          </Link>
          <h3>{(user as IUser)?.name}</h3>
          <button onClick={handleSignOut} className="btn btn-success">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Note: Standardized routes to match lower-case hyphen style used previously */}
          <Link
            href="/signIn"
            className="btn btn-ghost btn-sm sm:btn-md font-bold text-base-content/80 rounded-xl hover:bg-base-200 flex items-center justify-center"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signUp"
            className="btn btn-success btn-sm sm:btn-md font-extrabold text-white rounded-xl px-5 shadow-md shadow-success/20 hover:shadow-lg hover:shadow-success/30 transition-all duration-200 flex items-center justify-center"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
