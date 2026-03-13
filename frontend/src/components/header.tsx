"use client";

import { IAuthContext, useAuth } from "@/context/authContext";
// import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "./ui/theme-toggle";
import LogOutButton from "./logout-button";
import LoginButton from "./login-button";
import VerifyBanner from "./verify-banner";
import { Home } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { isAuth, isVerified } = useAuth() as Pick<
    IAuthContext,
    "isAuth" | "isVerified"
  >;

  return (
    <div>
      <div className="w-full h-14 px-6 flex items-center justify-between border-b bg-card">
        {/* LEFT */}
        <div className="flex items-center">
          {/* Optional: logo / title here
           */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="" />
          </Link>
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
      {!isVerified && isAuth && <VerifyBanner />}
    </div>
  );
};
export default Header;
