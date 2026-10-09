"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link"; // 1. Imported Link component

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src={
                  user?.image ||
                  ("https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" as string)
                }
              />
            </div>
          </div>
          <h3>{user?.name}</h3>
          <button onClick={handleSignOut} className="btn btn-success">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* 2. Added Link for Sign In */}
          <Link
            href="/signIn"
            className="btn btn-ghost btn-sm sm:btn-md font-bold text-base-content/80 rounded-xl hover:bg-base-200 flex items-center justify-center"
          >
            সাইন ইন
          </Link>

          {/* 3. Added Link for Sign Up */}
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
