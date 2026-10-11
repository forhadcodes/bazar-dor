"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

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
      console.error("Sign out error:", error);
      toast.error((error as Ierror).message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/profile" className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-10">
                <img
                  alt="User Avatar"
                  className="object-cover"
                  src={
                    (user as IUser)?.image ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                />
              </div>
            </div>
            <h3 className="hidden max-w-[120px] truncate text-sm font-semibold md:block lg:max-w-[160px]">
              {(user as IUser)?.name}
            </h3>
          </Link>
          <button
            onClick={handleSignOut}
            className="btn btn-success btn-sm sm:btn-md whitespace-nowrap rounded-xl text-white"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/signIn"
            className="btn btn-ghost btn-sm sm:btn-md flex items-center justify-center whitespace-nowrap rounded-xl px-2 font-bold text-base-content/80 hover:bg-base-200 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signUp"
            className="btn btn-success btn-sm sm:btn-md flex items-center justify-center whitespace-nowrap rounded-xl px-3 font-extrabold text-white shadow-md shadow-success/20 transition-all duration-200 hover:shadow-lg hover:shadow-success/30 sm:px-5"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;