"use client";

import { IAuthContext, useAuth } from "@/context/authContext";
// import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "./ui/theme-toggle";
import LogOutButton from "./logout-button";
import LoginButton from "./login-button";

const Header = () => {
  const { isAuth } = useAuth() as Pick<IAuthContext, "isAuth">;

  return (
    <div className="w-full h-14 px-6 flex items-center justify-between border-b bg-card">
      {/* LEFT */}
      <div className="flex items-center">
        {/* Optional: logo / title here */}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {isAuth ? (
          <LogOutButton />
        ) : (
          <div className="flex gap-4">
            <LoginButton />
          </div>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
export default Header;
